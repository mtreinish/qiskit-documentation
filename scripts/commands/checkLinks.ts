// This code is a Qiskit project.
//
// (C) Copyright IBM 2023.
//
// This code is licensed under the Apache License, Version 2.0. You may
// obtain a copy of this license in the LICENSE file in the root directory
// of this source tree or at http://www.apache.org/licenses/LICENSE-2.0.
//
// Any modifications or derivative works of this code must retain this
// copyright notice, and modified files need to carry a notice indicating
// that they have been altered from the originals.

import { globby } from "globby";
import { readFile } from "fs/promises";
import path from "node:path";
import { Link, File } from "../lib/LinkChecker";
import markdownLinkExtractor from "markdown-link-extractor";
import { visit } from "unist-util-visit";
import { unified } from "unified";
import remarkStringify from "remark-stringify";
import { Root } from "remark-mdx";
import rehypeRemark from "rehype-remark";
import rehypeParse from "rehype-parse";
import remarkGfm from "remark-gfm";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

// The links in the files are not searched to see if they are valid.
// The files need a list of links to be ignored, and when an asterisk
// (*) is used as a link, all the links in the file will be ignored.
const FILES_TO_IGNORES: { [id: string]: string[] } = {};

// While these files don't exist in this repository, the link
// checker should assume that they exist in production.
const SYNTHETIC_FILES: string[] = [
  "docs/errors.mdx",
  "docs/api/runtime/tags/programs.mdx",
];

interface Arguments {
  [x: string]: unknown;
  external: boolean;
}

const readArgs = (): Arguments => {
  return yargs(hideBin(process.argv))
    .version(false)
    .option("external", {
      type: "boolean",
      demandOption: false,
      default: false,
      description:
        "Should external links be checked? This slows down the script, but is useful to check.",
    })
    .parseSync();
};

function markdownFromNotebook(source: string): string {
  let markdown = "";
  for (let cell of JSON.parse(source).cells) {
    if (cell.cell_type === "markdown") {
      cell.source.forEach((s: string) => (markdown += s + "\n"));
    }
  }
  return markdown;
}

/**
 * Return a list of File objects with all the files
 * in `filePaths` and a list of Link objects with all
 * the links found in those files.
 */
async function loadFilesAndLinks(
  filePaths: string[],
): Promise<[File[], Link[]]> {
  const fileList: File[] = [];
  const linkList: Link[] = [];

  // Auxiliary Map to avoid link duplications
  const linkMap = new Map<string, string[]>();

  for (let filePath of filePaths) {
    const source = await readFile(filePath, { encoding: "utf8" });
    const markdown =
      path.extname(filePath) === ".ipynb"
        ? markdownFromNotebook(source)
        : source;
    const anchors = markdownLinkExtractor(markdown).anchors;

    // Get the anchors from HTML ids.
    const id_anchors = markdown.match(/(?<=id=")(.*)(?=")/gm);
    if (id_anchors != null) {
      id_anchors.forEach((id) => anchors.push("#" + id));
    }

    fileList.push(new File(filePath, anchors, false));

    if (
      filePath.startsWith("docs/api/qiskit") ||
      filePath.startsWith("docs/api/qiskit-ibm-provider") ||
      filePath.startsWith("docs/api/qiskit-ibm-runtime")
    ) {
      continue;
    }

    if (
      filePath in FILES_TO_IGNORES &&
      FILES_TO_IGNORES[filePath].includes("*")
    ) {
      continue;
    }

    unified()
      .use(rehypeParse)
      .use(remarkGfm)
      .use(rehypeRemark)
      .use(() => {
        return function transform(tree: Root) {
          visit(tree, "text", (TreeNode) => {
            markdownLinkExtractor(String(TreeNode.value)).links.map(
              (url: string) => {
                let link = linkMap.get(url);
                if (link != null) {
                  link.push(filePath);
                } else {
                  linkMap.set(url, [filePath]);
                }
              },
            );
          });
          visit(tree, "link", (TreeNode) => {
            let link = linkMap.get(TreeNode.url);
            if (link != null) {
              link.push(filePath);
            } else {
              linkMap.set(TreeNode.url, [filePath]);
            }
          });
          visit(tree, "image", (TreeNode) => {
            let link = linkMap.get(TreeNode.url);
            if (link != null) {
              link.push(filePath);
            } else {
              linkMap.set(TreeNode.url, [filePath]);
            }
          });
        };
      })
      .use(remarkStringify)
      .process(markdown);
  }

  for (let [link, originFiles] of linkMap) {
    originFiles = originFiles.filter(
      (originFile) =>
        FILES_TO_IGNORES[originFile] == null ||
        !FILES_TO_IGNORES[originFile].includes(link),
    );

    if (originFiles.length > 0) {
      linkList.push(new Link(link, originFiles));
    }
  }

  return [fileList, linkList];
}

async function main() {
  const args = readArgs();

  // Determine what files with links we want to parse
  const pathsWithLinks = await globby("docs/**/*.{ipynb,md,mdx}");

  // Parse the files with links and get a list with all the links
  // in all the files without duplications
  const [docsFiles, linkList] = await loadFilesAndLinks(pathsWithLinks);

  // Define extra files that we don't want to parse
  const otherFiles = [
    ...(await globby("{public,docs}/**/*.{png,jpg,gif,svg}")).map(
      (fp) => new File(fp, [], false),
    ),
    ...SYNTHETIC_FILES.map((fp) => new File(fp, [], true)),
  ];

  // Create an array with all the valid destinations for a link
  const existingFiles = docsFiles.concat(otherFiles);

  // Validate the links
  const results = await Promise.all(
    linkList
      .filter((link) => args.external || !link.isExternal)
      .map((link) => link.checkLink(existingFiles)),
  );

  // Print the results
  let allGood = true;
  results.forEach((linkErrors) => {
    linkErrors.forEach((errorMessage) => {
      console.error(errorMessage);
      allGood = false;
    });
  });

  if (!allGood) {
    console.error("\nSome links appear broken 💔\n");
    process.exit(1);
  }
  console.log("\nNo links appear broken ✅\n");
}

main().then(() => process.exit());
