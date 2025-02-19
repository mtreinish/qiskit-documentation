---
title: Qiskit IBM Provider release notes
description: Changes made to Qiskit IBM Provider
in_page_toc_max_heading_level: 2
---

# Release Notes

<span id="release-notes-0-7-0" />

<span id="id1" />

## 0.7.0

<span id="release-notes-0-7-0-new-features" />

### New Features

*   Added support for using session. The syntax here is slightly different than that in `qiskit-ibm-runtime`, but the functionality is similar. Here is an example using session as a context manager:

    ```python
    with backend.open_session() as session:
      job = backend.run(ReferenceCircuits.bell())
    ```

    And here is an example of session not as a context manager:

    ```python
    backend = IBMProvider().get_backend("ibmq_qasm_simulator")
    backend.open_session()
    job = backend.run(circ)
    backend.cancel_session()
    ```

<span id="release-notes-0-7-0-bug-fixes" />

### Bug Fixes

*   Replace `coupling_map.reduce(nodes)` with `coupling_map.graph.subgraph(nodes)` to apply DD on a disjoint coupling map. See discussion in [https://github.com/Qiskit/qiskit-terra/pull/9710](https://github.com/Qiskit/qiskit-terra/pull/9710)

*   `IBMProvider.get_backend()` returns the backend with its default options. At the end of this example,

    ```python
    backend1 = provider.get_backend("xxx")
    backend1.options.shots = 100
    backend2 = provider.get_backend("xxx")
    ```

    `backend2.options.shots` has the default value (4000). `backend1.options.shots` also has the default value, because backend1 and backend2 are the same instance.

<span id="release-notes-0-6-3" />

<span id="id2" />

## 0.6.3

<span id="release-notes-0-6-3-new-features" />

<span id="id3" />

### New Features

*   Added a new property, [`usage_estimation()`](qiskit_ibm_provider.job.IBMCircuitJob#usage_estimation "qiskit_ibm_provider.job.IBMCircuitJob.usage_estimation") that returns the estimated running time, `quantum_seconds`. Quantum time represents the time that the QPU complex is occupied exclusively by the job.

<span id="release-notes-0-6-3-upgrade-notes" />

### Upgrade Notes

*   Job error messages now include the error code. Error codes can be found in [https://quantum-computing.ibm.com/lab/docs/iql/manage/errors](https://quantum-computing.ibm.com/lab/docs/iql/manage/errors).

*   For each qubit, add the ability to select one of two different sets of spacings between dynamical decoupling pulses, based on the input coupling map.

<span id="release-notes-0-6-3-bug-fixes" />

<span id="id4" />

### Bug Fixes

*   Fixes a bug in the function `jobs()`. Refer to [#586](https://github.com/Qiskit/qiskit-ibm-provider/issues/586) for more details.

*   A transpilation error will no longer occur when attempting to transpile a circuit containing a conditional [`IGate`](/api/qiskit/qiskit.circuit.library.IGate "(in Qiskit v0.44)") with Qiskit 0.44.

*   2pi wrapping cannot be applied on a parameterized global phase. Use the DAGCircuit `global_phase` setter to wrap the phase for floats only.

*   Staggered inter-pulse spacings allow the user to disable certain interactions between neighboring qubits by Refer to #539 \<[https://github.com/Qiskit/qiskit-ibm-provider/issues/539](https://github.com/Qiskit/qiskit-ibm-provider/issues/539)> for more details

<span id="release-notes-0-6-2" />

<span id="id6" />

## 0.6.2

<span id="release-notes-0-6-2-new-features" />

<span id="id7" />

### New Features

*   Raise an exception if the number of circuits passed to IBMBackend.run() exceeds IBMBackend.\_max\_circuits.

*   Support has been added to select the Qiskit runtime image to invoke the program with for testing purposes with the `image` option to `backend.run`, eg., `backend.run(circuits, image="test-image")`

<span id="release-notes-0-6-2-bug-fixes" />

<span id="id8" />

### Bug Fixes

*   Fixes an issue where submitting a large job failed due to a write operation timeout.

<span id="release-notes-0-6-1" />

<span id="id9" />

## 0.6.1

<span id="release-notes-0-6-1-new-features" />

<span id="id10" />

### New Features

*   When retrieving a job with [`retrieve_job()`](qiskit_ibm_provider.IBMBackendService#retrieve_job "qiskit_ibm_provider.IBMBackendService.retrieve_job") the `params` will no longer be returned from the API. They will instead be loaded lazily when they are actually needed.

*   In ‘time\_per\_step’, if ‘time\_per\_step\_local’ is None, print None, rather than converting with ‘utc\_to\_local’, because this resulted in a bug.

<span id="release-notes-0-6-1-upgrade-notes" />

<span id="id11" />

### Upgrade Notes

*   Added error message if the circuit contains more qubits than supported on the backend. Previously, this validation was done on the server side.

<span id="release-notes-0-6-1-bug-fixes" />

<span id="id12" />

### Bug Fixes

*   Fixed infinite recursion when attempting to deepcopy an IBMBackend.

*   Fixed an issue where circuit metadata was not being serialized correctly resulting in a type error.

*   A bug that the backend target generation fails with an error in some edge cases is fixed. See Qiskit/qiskit-ibm-provider/#650 for more details.

<span id="release-notes-0-6-0" />

<span id="id13" />

## 0.6.0

<span id="release-notes-0-6-0-new-features" />

<span id="id14" />

### New Features

*   In [`run()`](qiskit_ibm_provider.IBMBackend#run "qiskit_ibm_provider.IBMBackend.run"), added a check to whether the input circuits are actually dynamic. Issue a warning if the user specifies `dynamic=False`, while the circuits are actually dynamic.

*   Python 3.11 is now supported.

<span id="release-notes-0-6-0-deprecation-notes" />

### Deprecation Notes

*   Removed support for input circuit as Schedule to IBMBackend.run(). Use `pulse gates` instead. See [tutorial](https://qiskit.org/documentation/tutorials/circuits_advanced/05_pulse_gates.html) on how to use pulse gates.

<span id="release-notes-0-6-0-bug-fixes" />

<span id="id15" />

### Bug Fixes

*   Fix mapping for qubit registers when padding for fast-path cases, after transpiling. This mapping is required due to qiskit-terra #9332 \<[https://github.com/Qiskit/qiskit-terra/issues/9332](https://github.com/Qiskit/qiskit-terra/issues/9332)>

*   Fixed a bug where the backend target `qubit_properties` were not being decoded correctly.

*   Allow for users to retrieve all backends even if one of the backends has a missing configuration. The backend without a configuration will not be returned.

<span id="release-notes-0-5-3" />

<span id="id16" />

## 0.5.3

<span id="release-notes-0-5-3-upgrade-notes" />

<span id="id17" />

### Upgrade Notes

*   If the `dynamic` parameter is set to `True` in [`run()`](qiskit_ibm_provider.IBMBackend#run "qiskit_ibm_provider.IBMBackend.run") and the backend being used does not support dymamic circuits, a warning will be raised.

*   When constructing a backend [`qiskit.transpiler.Target`](/api/qiskit/qiskit.transpiler.Target "(in Qiskit v0.44)"), faulty qubits and gates from the backend configuration will be filtered out.

<span id="release-notes-0-5-3-bug-fixes" />

<span id="id18" />

### Bug Fixes

*   Match the adjustment of measurements for devices with odd short gate lengths.

*   Fixed a bug where [`status()`](qiskit_ibm_provider.IBMBackend#status "qiskit_ibm_provider.IBMBackend.status") was not returning pending jobs.

*   An unnecessary call to [`refresh()`](qiskit_ibm_provider.job.IBMCircuitJob#refresh "qiskit_ibm_provider.job.IBMCircuitJob.refresh") has been removed from [`status()`](qiskit_ibm_provider.job.IBMCircuitJob#status "qiskit_ibm_provider.job.IBMCircuitJob.status"). Circuits and other job attributes were being re-fetched unnecessarily, causing slow job retrieval times.

*   The dynamic circuit odd cycle delay has been bumped from 1 cycle to 4 cycles to address hardware limitations.

<span id="release-notes-0-5-2" />

<span id="id19" />

## 0.5.2

<span id="release-notes-0-5-2-new-features" />

<span id="id20" />

### New Features

*   [`run()`](qiskit_ibm_provider.IBMBackend#run "qiskit_ibm_provider.IBMBackend.run") now checks if the input circuits use a faulty qubit or a faulty edge.

<span id="release-notes-0-5-2-bug-fixes" />

<span id="id21" />

### Bug Fixes

*   Fixed an issue where instances were not being set when backend configurations were loaded in [`get_backend()`](qiskit_ibm_provider.IBMProvider#get_backend "qiskit_ibm_provider.IBMProvider.get_backend") and [`backends()`](qiskit_ibm_provider.IBMProvider#backends "qiskit_ibm_provider.IBMProvider.backends").

<span id="release-notes-0-5-1" />

<span id="id22" />

## 0.5.1

<span id="release-notes-0-5-1-upgrade-notes" />

<span id="id23" />

### Upgrade Notes

*   Backend configurations are no longer loaded when [`IBMProvider`](qiskit_ibm_provider.IBMProvider "qiskit_ibm_provider.IBMProvider") is initialized. Instead, the configuration is only loaded and cached during [`get_backend()`](qiskit_ibm_provider.IBMProvider#get_backend "qiskit_ibm_provider.IBMProvider.get_backend") and [`backends()`](qiskit_ibm_provider.IBMProvider#backends "qiskit_ibm_provider.IBMProvider.backends").

<span id="release-notes-0-5-0" />

<span id="id24" />

## 0.5.0

<span id="release-notes-0-5-0-new-features" />

<span id="id25" />

### New Features

*   Added the method [`target_history()`](qiskit_ibm_provider.IBMBackend#target_history "qiskit_ibm_provider.IBMBackend.target_history"). This method is similar to [`target()`](qiskit_ibm_provider.IBMBackend#target "qiskit_ibm_provider.IBMBackend.target"). The difference is that the new method enables the user to pass a datetime parameter, to retrieve historical data from the backend.

<span id="release-notes-0-5-0-upgrade-notes" />

<span id="id26" />

### Upgrade Notes

*   There will now be a warning if a boolean is passed in for the `init_circuit` parameter in [`run()`](qiskit_ibm_provider.IBMBackend#run "qiskit_ibm_provider.IBMBackend.run").

<span id="release-notes-0-5-0-bug-fixes" />

<span id="id27" />

### Bug Fixes

*   Removed additional decomposition of `BlueprintCircuit`s in the JSON encoder. This was introduced as a bugfix, but has since been fixed. Still doing the decomposition led to possible problems if the decomposed circuit was not in the correct basis set of the backend anymore.

<span id="release-notes-0-4-0" />

<span id="id28" />

## 0.4.0

<span id="release-notes-0-4-0-bug-fixes" />

<span id="id29" />

### Bug Fixes

*   `ECRGate` and `CZGate` mappings have been added to the `Target` constructor to fix a tranpile bug.

<span id="release-notes-0-3-0" />

<span id="id30" />

## 0.3.0

<span id="release-notes-0-3-0-new-features" />

<span id="id31" />

### New Features

*   Support has been added for applying scheduling and dynamical decoupling for circuits with new format control flow (including nested control-flow).

    ```python
    from qiskit.circuit import ClassicalRegister, QuantumCircuit, QuantumRegister
    from qiskit.circuit.library import XGate
    from qiskit.transpiler.passmanager import PassManager

    from qiskit_ibm_provider.transpiler.passes.scheduling import DynamicCircuitInstructionDurations
    from qiskit_ibm_provider.transpiler.passes.scheduling import ALAPScheduleAnalysis
    from qiskit_ibm_provider.transpiler.passes.scheduling import PadDynamicalDecoupling
    from qiskit.providers.fake_provider import FakeJakarta

    backend = FakeJakarta()

    durations = DynamicCircuitInstructionDurations.from_backend(backend)

    qc = QuantumCircuit(2, 2)
    with qc.if_test((0, 1)):
        qc.x(0)
        qc.measure(0, 1)
        with qc.if_test((1, 1)):
          qc.measure(1, 1)

    dd_sequence = [XGate(), XGate()]

    pm = PassManager(
      [
          ALAPScheduleAnalysis(durations),
          PadDynamicalDecoupling(durations, dd_sequence),
      ]
    )

    qc_dd = pm.run(qc)
    ```

<span id="release-notes-0-3-0-upgrade-notes" />

<span id="id32" />

### Upgrade Notes

*   Scheduling support for `c_if` has been removed. Please run the pass [`qiskit.transpiler.passes.ConvertConditionsToIfOps`](/api/qiskit/qiskit.transpiler.passes.ConvertConditionsToIfOps "(in Qiskit v0.44)") on your circuit before scheduling to convert all old format `c_if` statements to new format `if_test` control-flow that may be scheduled.

    ```python
    from qiskit.circuit import ClassicalRegister, QuantumCircuit, QuantumRegister
    from qiskit.transpiler.passes import ConvertConditionsToIfOps
    from qiskit.transpiler.passmanager import PassManager


    from qiskit_ibm_provider.transpiler.passes.scheduling import DynamicCircuitInstructionDurations
    from qiskit_ibm_provider.transpiler.passes.scheduling import ALAPScheduleAnalysis
    from qiskit_ibm_provider.transpiler.passes.scheduling import PadDynamicalDecoupling
    from qiskit.providers.fake_provider import FakeJakarta

    backend = FakeJakarta()

    durations = DynamicCircuitInstructionDurations.from_backend(backend)


    qc = QuantumCircuit(1, 1)
    qc.x(0).c_if(0, 1)

    pm = PassManager(
      [
          ConvertConditionsToIfOps(),
          ALAPScheduleAnalysis(durations),
          PadDelay(),
      ]
    )

    qc_dd = pm.run(qc)
    ```

*   The [`IBMBackend`](qiskit_ibm_provider.IBMBackend "qiskit_ibm_provider.IBMBackend") now returns the `ibm_dynamic_circuits` translation stage as its plugin translation stage. This will automatically add custom transformations when calling the transpiler that are tuned for IBM quantum hardware.

*   If an instance is passed in when initializing [`IBMProvider`](qiskit_ibm_provider.IBMProvider "qiskit_ibm_provider.IBMProvider"), the instance will be used for filtering backends and jobs in [`backends()`](qiskit_ibm_provider.IBMBackendService#backends "qiskit_ibm_provider.IBMBackendService.backends") and [`jobs()`](qiskit_ibm_provider.IBMBackendService#jobs "qiskit_ibm_provider.IBMBackendService.jobs").

<span id="release-notes-0-3-0-bug-fixes" />

<span id="id33" />

### Bug Fixes

*   [`jobs()`](qiskit_ibm_provider.IBMBackendService#jobs "qiskit_ibm_provider.IBMBackendService.jobs") and [`retrieve_job()`](qiskit_ibm_provider.IBMBackendService#retrieve_job "qiskit_ibm_provider.IBMBackendService.retrieve_job") now only retrieve jobs that are run with the `circuit-runner` or `qasm3-runner` programs. Jobs run from `qiskit-ibm-runtime` will not be retrievable because their results are in an unsupported format.

<span id="release-notes-0-2-1" />

<span id="id34" />

## 0.2.1

<span id="release-notes-0-2-1-bug-fixes" />

<span id="id35" />

### Bug Fixes

*   Fixed a bug where users could not initialize [`IBMProvider`](qiskit_ibm_provider.IBMProvider "qiskit_ibm_provider.IBMProvider") if they were in a h/g/p without any backends.

<span id="release-notes-0-2-0" />

<span id="id36" />

## 0.2.0

<span id="release-notes-0-2-0-new-features" />

<span id="id37" />

### New Features

*   The meth:\~qiskit\_ibm\_provider.IBMProvider.instances was added to list all the available instances in a provider instance.

*   A new transpiler pass ``qiskit_ibm_provider.transpiler.passes.basis.ConvertIdToDelay was added which converts an :class:`qiskit.circuit.library.IGate`` to [`qiskit.circuit.Delay`](/api/qiskit/qiskit.circuit.Delay "(in Qiskit v0.44)"). This was added to the default transpiler plugin `qiskit_ibm_provider.transpiler.plugin.IBMTranslationPlugin`.

<span id="release-notes-0-2-0-upgrade-notes" />

<span id="id38" />

### Upgrade Notes

*   Users can now retrieve jobs run from the previous provider, `qiskit-ibmq-provider` with [`retrieve_job()`](qiskit_ibm_provider.IBMBackendService#retrieve_job "qiskit_ibm_provider.IBMBackendService.retrieve_job"). There is also a new `legacy` parameter in [`jobs()`](qiskit_ibm_provider.IBMBackendService#jobs "qiskit_ibm_provider.IBMBackendService.jobs") for retrieving these jobs in bulk.

<span id="release-notes-0-2-0-bug-fixes" />

<span id="id39" />

### Bug Fixes

*   A bug was fixed in `qiskit.transpiler.passes.scheduling.LAPScheduleAnalysis` which was caused by an bad interaction between duration-less gates such as `rz` and `barrier`.

*   A bug was fixed where conditional [`qiskit.circuit.library.IGate`](/api/qiskit/qiskit.circuit.library.IGate "(in Qiskit v0.44)") were being converted to unconditional [`qiskit.circuit.Delay`](/api/qiskit/qiskit.circuit.Delay "(in Qiskit v0.44)") operations rather than conditional operations.

*   Fixed an issue where filtering by instance with [`jobs()`](qiskit_ibm_provider.IBMBackendService#jobs "qiskit_ibm_provider.IBMBackendService.jobs") was not working correctly.

*   Filtering backends with the parameter `input_allowed` in [`backends()`](qiskit_ibm_provider.IBMBackendService#backends "qiskit_ibm_provider.IBMBackendService.backends") has been removed because it is no longer in use and not supported by the runtime api.

<span id="release-notes-0-1-0" />

<span id="id40" />

## 0.1.0

<span id="release-notes-0-1-0-prelude" />

### Prelude

A [`transpiler`](ibm_transpiler#module-qiskit_ibm_provider.transpiler "qiskit_ibm_provider.transpiler") module has been added. It will contain routines that are specific to IBM hardware backends and which consequently can not be placed directly within Qiskit Terra.

qiskit-ibm-provider is a new Python API client for accessing the quantum systems and simulators at IBM Quantum. This new package is built upon the work already done in qiskit.providers.ibmq.backend module in the qiskit-ibmq-provider package and replaces it going forward. The backend module in qiskit-ibmq-provider package is now deprecated. Please take a look at the mirgraion guide [here](https://github.com/Qiskit/qiskit-ibm-provider/blob/main/docs/tutorials/Migration_Guide_from_qiskit-ibmq-provider.ipynb). qiskit-ibm-provider is not included as part of Qiskit meta package and thereby you have to install it separately using `pip install qiskit-ibm-provider`.

<span id="release-notes-0-1-0-new-features" />

<span id="id41" />

### New Features

*   A scheduling analysis pass, [`ASAPScheduleAnalysis`](qiskit_ibm_provider.transpiler.passes.scheduling.ASAPScheduleAnalysis "qiskit_ibm_provider.transpiler.passes.scheduling.ASAPScheduleAnalysis") has been added for Qiskit dynamic circuit (OpenQASM 3) backends. This is capable of handling scheduling for deterministic regions of a quantum circuit and may combined with a padding pass such as [`PadDelay`](qiskit_ibm_provider.transpiler.passes.scheduling.PadDelay "qiskit_ibm_provider.transpiler.passes.scheduling.PadDelay") to pad schedulable sections of a circuit with delays.

    For an example see the [`scheduling`](qiskit_ibm_provider.transpiler.passes.scheduling#module-qiskit_ibm_provider.transpiler.passes.scheduling "qiskit_ibm_provider.transpiler.passes.scheduling") module’s documentation.

*   A dynamical decoupling pass has been added for IBM Quantum dynamic circuit backends [`PadDynamicalDecoupling`](qiskit_ibm_provider.transpiler.passes.scheduling.PadDynamicalDecoupling "qiskit_ibm_provider.transpiler.passes.scheduling.PadDynamicalDecoupling") to pad schedulable sections of a circuit with dynamical decoupling sequences. It relies on having run the [`ASAPScheduleAnalysis`](qiskit_ibm_provider.transpiler.passes.scheduling.ASAPScheduleAnalysis "qiskit_ibm_provider.transpiler.passes.scheduling.ASAPScheduleAnalysis") or [`ALAPScheduleAnalysis`](qiskit_ibm_provider.transpiler.passes.scheduling.ALAPScheduleAnalysis "qiskit_ibm_provider.transpiler.passes.scheduling.ALAPScheduleAnalysis") analysis prior to the padding sequence.

    For an example see the [`scheduling`](qiskit_ibm_provider.transpiler.passes.scheduling#module-qiskit_ibm_provider.transpiler.passes.scheduling "qiskit_ibm_provider.transpiler.passes.scheduling") module’s documentation.

*   Measurements no longer interrupt scheduling regions on dynamic circuit backends using the [`ASAPScheduleAnalysis`](qiskit_ibm_provider.transpiler.passes.scheduling.ASAPScheduleAnalysis "qiskit_ibm_provider.transpiler.passes.scheduling.ASAPScheduleAnalysis")

*   Measurements and resets now merged topologically when scheduling [`ASAPScheduleAnalysis`](qiskit_ibm_provider.transpiler.passes.scheduling.ASAPScheduleAnalysis "qiskit_ibm_provider.transpiler.passes.scheduling.ASAPScheduleAnalysis")

*   The module `` transpiler` `` has been added.

    Primarily, it will contain all specialized Qiskit routines for running applications on IBM’s next-generation quantum devices that support dynamic capabilities such as control-flow(feedforward) and classical compute.

*   Python 3.10 is now supported.

*   You can now use the `dynamic_circuits` parameter in `qiskit_ibm_provider.ibm_backend_service.IBMBackendService.backends()` to find backends that support dynamic circuits.

*   It is now possible to select the Qiskit runtime program ID to use for [`run()`](qiskit_ibm_provider.IBMBackend#run "qiskit_ibm_provider.IBMBackend.run") through the input argument `program_id`.

<span id="release-notes-0-1-0-upgrade-notes" />

<span id="id42" />

### Upgrade Notes

*   The `IBMQ` global variable which was an instance of the `IBMQFactory` has been removed. `IBMQFactory` and `AccountProvider` classes have been removed and the functionality provided by these two classes have been combined and refactored in the new `IBMProvider` class. This class will provide a simplified interface as shown below and serve as the entrypoint going forward.

    [`save_account()`](qiskit_ibm_provider.IBMProvider#save_account "qiskit_ibm_provider.IBMProvider.save_account") - Save your account to disk for future use and optionally set a default instance (hub/group/project) to be used when loading your account.

    `IBMProvider()` - Load account using saved credentials.

    [`saved_accounts()`](qiskit_ibm_provider.IBMProvider#saved_accounts "qiskit_ibm_provider.IBMProvider.saved_accounts") - View the accounts saved to disk.

    [`delete_account()`](qiskit_ibm_provider.IBMProvider#delete_account "qiskit_ibm_provider.IBMProvider.delete_account") - Delete the saved account from disk.

    `IBMProvider(token="<insert_api_token>")` - Enable your account in the current session.

    [`active_account()`](qiskit_ibm_provider.IBMProvider#active_account "qiskit_ibm_provider.IBMProvider.active_account") - List the account currently active in the session.

    Use the examples below to migrate your existing code:

    *   Load Account using Saved Credentials

        Before:

        ```python
        from qiskit import IBMQ
        IBMQ.save_account(token='MY_API_TOKEN')
        provider = IBMQ.load_account() # loads saved account from disk
        ```

        After:

        ```python
        from qiskit_ibm_provider import IBMProvider
        IBMProvider.save_account(token='MY_API_TOKEN')
        provider = IBMProvider() # loads saved account from disk
        ```

    *   Load Account using Environment Variables

        Before:

        ```python
        # export QE_TOKEN='MY_API_TOKEN' (bash command)

        from qiskit import IBMQ
        provider = IBMQ.load_account() # loads account from env variables
        ```

        After:

        ```python
        # export QISKIT_IBM_TOKEN='MY_API_TOKEN' (bash command)

        from qiskit_ibm_provider import IBMProvider
        provider = IBMProvider() # loads account from env variables
        ```

    *   Saved Account

        Before:

        ```python
        from qiskit import IBMQ
        IBMQ.stored_account() # get saved account from qiskitrc file
        ```

        After:

        ```python
        from qiskit_ibm_provider import IBMProvider
        IBMProvider.saved_accounts() # get saved accounts from qiskit-ibm.json file
        ```

    *   Delete Account

        Before:

        ```python
        from qiskit import IBMQ
        IBMQ.delete_account() # delete saved account from qiskitrc file
        ```

        After:

        ```python
        from qiskit_ibm_provider import IBMProvider
        IBMProvider.delete_account() # delete saved account from saved credentials
        ```

    *   Enable Account

        Before:

        ```python
        from qiskit import IBMQ
        provider = IBMQ.enable_account(token='MY_API_TOKEN') # enable account for current session
        ```

        After:

        ```python
        from qiskit_ibm_provider import IBMProvider
        provider = IBMProvider(token='MY_API_TOKEN') # enable account for current session
        ```

    *   Active Account

        Before:

        ```python
        from qiskit import IBMQ
        provider = IBMQ.load_account() # load saved account
        IBMQ.active_account() # check active account
        ```

        After:

        ```python
        from qiskit_ibm_provider import IBMProvider
        provider = IBMProvider() # load saved account
        provider.active_account() # check active account
        ```

*   [`IBMBackend`](qiskit_ibm_provider.IBMBackend "qiskit_ibm_provider.IBMBackend") class now implements the [`qiskit.providers.BackendV2`](/api/qiskit/qiskit.providers.BackendV2 "(in Qiskit v0.44)") interface and provides flatter access to the configuration of a backend, for example:

    ```python
    # BackendV1:
    backend.configuration().n_qubits

    # BackendV2:
    backend.num_qubits
    ```

    Only breaking change when compared to BackendV1 is backend.name is now an attribute instead of a method.

    Refer to the [`IBMBackend`](qiskit_ibm_provider.IBMBackend "qiskit_ibm_provider.IBMBackend") class doc string for a list of all available attributes.

*   It is now optional to specify a hub/group/project upfront when connecting to the IBM Quantum account. The hub/group/project is selected in the following order.

    > *   hub/group/project if passed via `instance` parameter when calling [`get_backend()`](qiskit_ibm_provider.IBMProvider#get_backend "qiskit_ibm_provider.IBMProvider.get_backend")
    > *   hub/group/project if passed via `instance` parameter when initializing [`IBMProvider`](qiskit_ibm_provider.IBMProvider "qiskit_ibm_provider.IBMProvider")
    > *   the default set previously via [`save_account()`](qiskit_ibm_provider.IBMProvider#save_account "qiskit_ibm_provider.IBMProvider.save_account")
    > *   a premium hub/group/project in your account
    > *   open access hub/group/project

*   You can now use [`run()`](qiskit_ibm_provider.IBMBackend#run "qiskit_ibm_provider.IBMBackend.run") to submit a long list of circuits/schedules like you would for a single circuit/schedule. If the number of circuits/schedules exceeds the backend limit, [`run()`](qiskit_ibm_provider.IBMBackend#run "qiskit_ibm_provider.IBMBackend.run") will automatically divide the list into multiple sub-jobs and return a single [`IBMCompositeJob`](qiskit_ibm_provider.job.IBMCompositeJob "qiskit_ibm_provider.job.IBMCompositeJob") instance. You can use this `IBMCompositeJob` instance the same way you used `IBMJob` before. For example, you can use [`status()`](qiskit_ibm_provider.job.IBMCompositeJob#status "qiskit_ibm_provider.job.IBMCompositeJob.status") to get job status, [`result()`](qiskit_ibm_provider.job.IBMCompositeJob#result "qiskit_ibm_provider.job.IBMCompositeJob.result") to get job result, and [`cancel()`](qiskit_ibm_provider.job.IBMCompositeJob#cancel "qiskit_ibm_provider.job.IBMCompositeJob.cancel") to cancel the job. You can also use the `job()` and [`jobs()`](qiskit_ibm_provider.IBMBackendService#jobs "qiskit_ibm_provider.IBMBackendService.jobs") methods to retrieve a single `IBMCompositeJob` (by passing its job ID) or multiple jobs.

    [`IBMCompositeJob`](qiskit_ibm_provider.job.IBMCompositeJob "qiskit_ibm_provider.job.IBMCompositeJob") also has a [`rerun_failed()`](qiskit_ibm_provider.job.IBMCompositeJob#rerun_failed "qiskit_ibm_provider.job.IBMCompositeJob.rerun_failed") method that will re-run any failed or cancelled sub jobs and a [`report()`](qiskit_ibm_provider.job.IBMCompositeJob#report "qiskit_ibm_provider.job.IBMCompositeJob.report") method that returns a report on current sub-job statuses.

    This feature replaces the `IBMQJobManager` class in `qiskit-ibmq-provider`, which is the predecessor of `qiskit-ibm-provider`.

    > Before:
    >
    > ```python
    > from qiskit.providers.ibmq.managed import IBMQJobManager
    >
    > job_manager = IBMQJobManager()
    > job_set = job_manager.run(long_list_of_circuits, backend=backend)
    > results = job_set.results()
    > ```
    >
    > After:
    >
    > ```python
    > job = backend.run(long_list_of_circuits)
    > result = job.result()
    > ```

*   The dynamic circuits scheduling class (`DynamicCircuitScheduleAnalysis`) has been renamed to [`ASAPScheduleAnalysis`](qiskit_ibm_provider.transpiler.passes.scheduling.ASAPScheduleAnalysis "qiskit_ibm_provider.transpiler.passes.scheduling.ASAPScheduleAnalysis").

*   [`run()`](qiskit_ibm_provider.IBMBackend#run "qiskit_ibm_provider.IBMBackend.run") has been updated so circuits with `id` instructions that are replaced with `delay` instructions do not mutate the original circuit.

*   Floats can now be used when setting the number of `shots` in [`run()`](qiskit_ibm_provider.IBMBackend#run "qiskit_ibm_provider.IBMBackend.run"). Now instead of having to type larger values like 100000 you can just do 1e5.

*   Scheduling has been updated to reflect dynamic circuit backends. Measurements no longer interrupt scheduling. ALAP scheduling has now been implemented in [`ALAPScheduleAnalysis`](qiskit_ibm_provider.transpiler.passes.scheduling.ALAPScheduleAnalysis "qiskit_ibm_provider.transpiler.passes.scheduling.ALAPScheduleAnalysis") and should be the standard scheduling policy that is used.

*   A custom instruction durations class has been added for dynamic circuit backends [`DynamicCircuitInstructionDurations`](qiskit_ibm_provider.transpiler.passes.scheduling.DynamicCircuitInstructionDurations "qiskit_ibm_provider.transpiler.passes.scheduling.DynamicCircuitInstructionDurations").

    Currently it only patches the durations of measurement instructions.

    This should be used temporarily while we port legacy backends to dynamic circuit backends.

*   [`run()`](qiskit_ibm_provider.IBMBackend#run "qiskit_ibm_provider.IBMBackend.run") has been updated to give a warning if the backend selected is paused.

*   Methods [`jobs()`](qiskit_ibm_provider.IBMProvider#jobs "qiskit_ibm_provider.IBMProvider.jobs"), `job()`, `job_ids()`, and `my_reservations()` have been added to [`IBMProvider`](qiskit_ibm_provider.IBMProvider "qiskit_ibm_provider.IBMProvider") so they can all be directly accessible from the provider.

*   qiskit.providers.ibmq.IBMQBackend.retrieve\_job() and qiskit.providers.ibmq.IBMQBackend.jobs() have been removed. The IBMBackendService methods `job()` and [`jobs()`](qiskit_ibm_provider.IBMBackendService#jobs "qiskit_ibm_provider.IBMBackendService.jobs") can be used instead.

*   Passing a [`QasmQobj`](/api/qiskit/qiskit.qobj.QasmQobj "(in Qiskit v0.44)") and [`PulseQobj`](/api/qiskit/qiskit.qobj.PulseQobj "(in Qiskit v0.44)") in the [`run()`](qiskit_ibm_provider.IBMBackend#run "qiskit_ibm_provider.IBMBackend.run") method has been removed. [`QuantumCircuit`](/api/qiskit/qiskit.circuit.QuantumCircuit "(in Qiskit v0.44)") and [`Schedule`](/api/qiskit/qiskit.pulse.Schedule "(in Qiskit v0.44)") should now be used instead.

*   The db\_filter parameter has been removed from [`jobs()`](qiskit_ibm_provider.IBMBackendService#jobs "qiskit_ibm_provider.IBMBackendService.jobs") due to low adoption.

*   The deprecated qiskit.providers.ibmq.IBMQDeprecatedBackendService has now been removed. Backends can still be returned with [`backends()`](qiskit_ibm_provider.IBMBackendService#backends "qiskit_ibm_provider.IBMBackendService.backends") method.

*   Job share level is no longer supported due to low adoption and the corresponding interface has been removed. This means you can no longer pass share\_level when creating a job. The qiskit.providers.ibmq.job.IBMQJob.share\_level method to get a job’s share level has also been removed.

*   The deprecated `timeout` keyword in [`backends()`](qiskit_ibm_provider.IBMBackendService#backends "qiskit_ibm_provider.IBMBackendService.backends") method has now been removed.

*   When instantiating [`IBMProvider`](qiskit_ibm_provider.IBMProvider "qiskit_ibm_provider.IBMProvider") and the h/g/p is not specified, users can see the auto-selected h/g/p with [`active_account()`](qiskit_ibm_provider.IBMProvider#active_account "qiskit_ibm_provider.IBMProvider.active_account")

*   The default number of `shots` (represents the number of repetitions of each circuit, for sampling) in [`run()`](qiskit_ibm_provider.IBMBackend#run "qiskit_ibm_provider.IBMBackend.run"), has been increased from 1024 to 4000.

<span id="release-notes-0-1-0-deprecation-notes" />

<span id="id43" />

### Deprecation Notes

*   The reservations, job\_limit, and remaining\_jobs\_count methods have been removed from [`IBMBackend`](qiskit_ibm_provider.IBMBackend "qiskit_ibm_provider.IBMBackend"). The BackendJobLimit and BackendReservation classes have also been removed.

<span id="release-notes-0-1-0-bug-fixes" />

<span id="id44" />

### Bug Fixes

*   When `dynamic=True`, [`run()`](qiskit_ibm_provider.IBMBackend#run "qiskit_ibm_provider.IBMBackend.run") now submits the `shots` argument correctly.

*   A warning log message when loading an invalid backend has had the core message switched to a debug log message as certain backends were causing issues for all users upon loading the provider. Now a much less verbose message is emitted.

