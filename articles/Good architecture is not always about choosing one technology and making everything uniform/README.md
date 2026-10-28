# NX Fundamentals — Building an Enterprise Frontend Workspace

**Status:** Work in progress. This article continues the published NX Workspace walkthrough. It focuses on understanding and extending the existing workspace; it does not repeat initial setup or application generation.

<!-- DRAFT: Fixed theoretical introduction. Do not edit without separate agreement. -->

# NX Fundamentals — Building an Enterprise Frontend Workspace

## Architecture Before Technology

When developing an enterprise application, it is easy to start by choosing technologies: Angular or React, a monorepo or multiple repositories, a particular build system, or a set of libraries.

It is better, however, to begin with different questions:

- What problems should the product solve?
- Which applications and platforms must we support?
- How will the different parts of the system interact?
- What should be shared, and what should remain independent?
- How will the architecture affect development and maintenance costs?

Technologies help implement an architecture, but they do not define it by themselves.

## Architecture Is More Than Technology

Software architecture concerns more than code structure. It is connected to business requirements, financial constraints, team skills, organizational processes, and the long-term support of a product.

For example, a technically attractive solution may be uneconomical if maintaining it requires hiring specialists who are difficult to find. Conversely, using existing infrastructure can reduce costs and speed up delivery, even when more modern alternatives are technically available.

Architectural decisions should therefore be evaluated in the context of the specific project.

## Why Does Architecture Outlast Technology?

Technologies and tools change faster than a system's core requirements and organizing principles. Architecture is not immutable, however: a substantial change in requirements may require parts of it to be reconsidered.

Good architecture helps limit the impact of such changes. For example, business logic that does not depend on a particular frontend framework may be reused when moving from Angular to React or Vue.

Simply moving code into a separate library is not enough. Real dependencies matter: a library that uses Angular Dependency Injection, React Hooks, or the Vue Composition API remains coupled to the corresponding framework.

The goal is not to eliminate every dependency, but to make dependencies explicit and manageable.

## Architecture as an Economic Decision

Consider an enterprise product that must run on several platforms.

It may include a web application, a desktop client, and mobile applications. They may have different entry points, build processes, startup scenarios, and user-interface requirements. At the same time, some business logic and rules can remain shared.

A shared codebase does not mean that all applications must have the same structure or use the same technology stack. The important task is to identify which parts can genuinely be reused and which require separate solutions.

The same applies to different teams. One team may use Angular, another React or Vue. If shared business logic does not depend on a specific framework, it can evolve and be reused independently of the user interface.

## A Practical Example: A Mobile App and Existing Infrastructure

One project required a mobile application for iOS and Android that integrated with corporate systems already in use.

Rather than replacing familiar tools entirely, part of the solution was built around the existing SharePoint environment. This allowed operators to continue working in a familiar setting without having to learn an additional system unnecessarily.

Azure WebJobs and related services were used to process changes. Firebase was used for push notifications on both mobile platforms, providing a shared notification mechanism without having to build the entire process separately around each platform's specifics.

This does not mean SharePoint, Azure, or Firebase is always the best choice. The point is that architecture should account for existing infrastructure, user habits, available skills, and maintenance costs.

## Architecture Connects Technology, People, and Economics

These examples lead to an important conclusion: architecture should do more than make a system technically functional. It should help manage complexity and preserve flexibility as requirements change.

This requires defining application and library boundaries, dependency rules, and where shared functionality belongs.

This is where NX becomes useful.

## From Architectural Decisions to an NX Workspace

NX is not a tool that automatically creates the right architecture. It does not replace architectural thinking or make business decisions for the team.

Its value is that it helps structure a monorepo, define rules for interactions between projects, and verify architectural constraints.

For example, applications and libraries can be separated, shared code can be identified, permitted dependency directions can be defined, and accidental coupling between independent parts of the system can be prevented.

NX can therefore turn architectural agreements into verifiable rules that apply not only in documentation but also in everyday development.

## What Will We Do in This Article?

We already have an NX Workspace and a basic Angular project. We will not recreate the workspace from scratch; instead, we will continue evolving the existing structure.

We will explore how to organize applications and libraries, where to place shared styles and configuration, how to extract reusable business logic, and how to control dependencies between parts of the system.

We will consider each change not only from a technical perspective, but also in terms of its architectural rationale: what problem it solves, why this approach was chosen, and which limitations must be considered.

The goal is not merely to get a working NX Workspace, but to establish an enterprise frontend structure that can be evolved and maintained consistently.

---

## Workspace Concepts and Project Organization

An Nx workspace is more than a directory containing several applications. It is a development environment in which Nx can discover projects, understand their relationships, and coordinate tasks such as building, testing, and linting.

A **project** is a unit Nx can identify and operate on. It may be an application, a library, or another part of the repository that has its own targets. A project does not have to be a separately deployed application, and it does not automatically need to become a library just because it contains reusable code.

This distinction matters. The workspace is the larger development environment; projects are the units within it; targets describe operations that can be performed on those projects. Keeping these concepts separate makes it easier to understand what Nx is actually coordinating.

In our Personal Finance workspace, the Angular application and its end-to-end test project are already present. We will build on them rather than generate them again. The goal now is to understand how the existing workspace describes and operates on its projects.

Useful starting points are the official [Nx documentation](https://nx.dev/) and the reference for [project configuration](https://nx.dev/reference/project-configuration).

## The Roles of `../../apps` and `libs/`

A common workspace convention is to place deployable applications under `../../apps` and libraries under `libs/`.

An application usually represents something that can be built, deployed, or run as a product entry point. A library is a unit of code that other projects can depend on. Libraries can help make shared functionality explicit, but they also introduce boundaries that the team must understand and maintain.

These directory names are conventions, not architecture by themselves. Moving code into `libs/` does not make it reusable, independent, or well-designed. If a supposedly shared library depends on a specific application, importing it may create a dependency in the wrong direction. Likewise, extracting a tiny helper into a separate project can add configuration and navigation overhead without providing meaningful value.

A useful rule is to introduce a library when there is a clear reason for a boundary: for example, when functionality has a stable responsibility, needs to be reused by more than one project, or should have its dependencies constrained. Until then, keeping code close to the application that owns it can be the simpler and more honest design.

We will use this principle as the Personal Finance application grows. We will not populate `libs/` simply to make the workspace look more enterprise-like. Each extraction should solve a concrete problem and make the resulting dependencies easier to understand.

See the official Nx guide to [libraries](https://nx.dev/concepts/more-concepts/library-types) for the tool's concepts and options. The architectural decision about whether a particular piece of code deserves its own library remains a project decision.

## Project Configuration and Targets

Nx needs to know which projects exist and which operations are available for them. Project configuration provides that information. Depending on the workspace and plugins in use, configuration may be explicit in project files or inferred from the project's files and tooling.

A **target** names an operation that Nx can run for a project, such as building, testing, linting, or serving it. The exact targets available are determined by the repository's configuration and installed plugins; they should be discovered rather than assumed.

For example, the general command shape is:

```bash
npx nx show project personal-finance
```

This asks Nx to show the configuration it has resolved for the project named `personal-finance`. The output is useful because it reveals the targets Nx currently knows about. If a target is missing, that is a configuration or tooling question to investigate—not a reason to assume that every Nx project must expose the same set of commands.

A project's configuration is therefore more than metadata. It is part of the interface through which developers and automation interact with that project. Keeping it understandable helps a team answer practical questions: What can be run? What inputs does a task use? Which tool is responsible for it? What dependencies must be considered?

For more detail, consult [Nx project configuration](https://nx.dev/reference/project-configuration).

## How Nx Discovers and Runs Projects

Instead of relying on memory or browsing directories manually, ask Nx to show the projects it recognizes:

```bash
npx nx show projects
```

This is a useful first diagnostic when joining an unfamiliar workspace or after changing project configuration. It shows the workspace from Nx's perspective, which may not be identical to a developer's mental model based only on folder names.

Once the project name is known, a target can be invoked using the general pattern:

```bash
npx nx run personal-finance:build
```

The example illustrates the syntax: `project:target`. It is not a claim that every project necessarily has a `build` target; the available targets should be confirmed from the project's resolved configuration. Nx also provides convenient command forms for common targets, but the explicit form makes the relationship between a project and a target easy to see.

This model becomes valuable as the workspace grows. Developers can use a consistent command interface without needing to remember every underlying tool invocation. Nx coordinates the task, while the project's configuration and plugins determine what that task actually does.

## Running, Building, Testing, and Linting Projects

A workspace commonly needs several different checks: build the application, run unit tests, lint source code, and exercise user flows through end-to-end tests. These checks serve different purposes and should not be treated as interchangeable.

- **Build** checks whether the application can be compiled and packaged according to its configuration.
- **Unit tests** validate focused pieces of behavior.
- **Linting** checks source code against configured static rules.
- **End-to-end tests** exercise selected flows through a running application or browser.

Nx gives these operations a consistent project-and-target interface. For example, where the corresponding targets exist, a developer may run:

```bash
npx nx run personal-finance:build
npx nx run personal-finance:test
npx nx run personal-finance:lint
```

The end-to-end project is a separate project, so its name and available targets should be taken from the workspace rather than guessed. The important point is not to memorize a particular list of commands. It is to understand how to discover the operations the workspace actually supports and run the appropriate checks for the change being made.

We have already established the baseline application and its E2E project in the preceding workspace stage. This article focuses on how Nx models and coordinates those projects, not on repeating the original generation walkthrough.

## Project Graph and Task Graph

As soon as one project depends on another, the workspace contains relationships that are not obvious from its directory tree alone. Nx represents project relationships in a **project graph**. It can use this information to help developers understand dependencies and reason about the impact of changes.

Inspect the graph with:

```bash
npx nx graph
```

The graph is useful for exploration, but it is not an architectural verdict. A diagram can show that one project depends on another; it cannot tell us, by itself, whether that dependency is appropriate for the business domain. That requires architectural rules and human judgment.

The **task graph** answers a different question. It describes the tasks Nx needs to execute and their ordering, including tasks that must complete before other tasks can start. A project graph describes relationships between projects; a task graph describes relationships between operations.

This difference is important. If an application depends on a library, building the application may require a task associated with that library to run first, depending on the configuration. The dependency between projects and the dependency between tasks are related, but they are not the same concept.

Nx's [project graph documentation](https://nx.dev/features/explore-graph) explains how to explore the project relationships. Use the graph to ask concrete questions: Which projects depend on this one? Is a shared project becoming a central dependency? Does a change affect more of the workspace than expected?

## Caching and Affected Commands

As a repository grows, repeatedly running the same checks for unchanged inputs can waste time. Nx can cache task results when the task is configured for caching and its inputs match a previously computed result. A cache hit is not magic: Nx needs to know which inputs affect the result, and the task must be configured appropriately.

Caching can reduce repeated work locally and in continuous integration. However, it should not be described as a guarantee that every task will be skipped. Incorrect or incomplete inputs can make a cache unreliable, and tasks with external side effects may not be suitable for ordinary result caching.

Another useful capability is running tasks for projects affected by a change. In a large workspace, the team may not need to run every check against every project for every change. Nx can use the project graph and a comparison with a base revision to determine the relevant set of projects.

The exact command depends on the repository's branch and CI setup. A common command shape is:

```bash
npx nx affected -t lint test build --base=<base-revision> --head=<current-revision>
```

Here, the base and head revisions must be chosen to match the workflow—for example, the target branch and the commit being validated in CI. The command is an example of the affected-task model, not a universal CI configuration that can be copied without adaptation.

Affected execution is most useful when the workspace has meaningful project boundaries and an accurate dependency graph. If project boundaries are unclear, or shared inputs are not represented correctly, the result may be less useful. As with caching, the team must understand the mechanism and validate it in the context of its own repository.

Read more in the official documentation on [task caching](https://nx.dev/features/cache-task-results) and [running tasks for affected projects](https://nx.dev/ci/features/affected).

## Introducing Architecture Without Premature Abstraction

Nx offers capabilities that can support architectural boundaries, but installing Nx does not automatically create a sound architecture. A monorepo can still become tightly coupled if projects import one another without clear rules or if shared libraries gradually become places where unrelated code accumulates.

The first step is to decide which boundaries are meaningful for the product. In a Personal Finance application, possible future boundaries might follow business capabilities or stable technical responsibilities. But those boundaries should emerge from actual requirements and dependencies—not from a desire to create a large number of folders.

Project tags and module-boundary rules can help express and enforce dependency constraints. They are useful when the team has decided which kinds of projects may depend on which others. They should not be added mechanically before the intended dependency model is understood. A rule that does not reflect a real architectural decision only adds configuration and friction.

At the current stage, the workspace is a starting point. We should not imply that domain-oriented libraries, project tags, or enforced module boundaries already exist if they have not yet been implemented. The next architectural step is to identify a real responsibility that merits a boundary, make that boundary explicit, and then decide whether an automated rule would help preserve it.

The same principle applies to separating UI code, application coordination, business rules, and data access. These are useful responsibility categories, not a requirement to create one library for each category on day one. Sometimes a clear internal structure within an application is enough. A library becomes worthwhile when the boundary provides an actual benefit, such as reuse, independent evolution, or a dependency constraint.

For more on enforcing dependency constraints, see the official [module boundary rules](https://nx.dev/features/enforce-module-boundaries). Apply them only after deciding what the rules should protect.

## Current Implementation Baseline

The repository has progressed through two earlier stages:

- `NX-Workspace`: the Nx workspace was initialized.
- `NX-Workspace+1`: a minimal Angular application and its E2E project were generated, and the initial build and testing setup was established.

The current branch builds on that work. It does not need a new workspace, a regenerated application, or another E2E project. Those steps would repeat work rather than explain the next architectural layer.

The current workspace should be treated as a baseline, not as a finished enterprise architecture. As the Personal Finance product acquires real functionality, we can decide which parts should remain within the application, which parts deserve to be extracted, and which dependency rules are valuable enough to enforce.

That sequence is deliberate: first understand the problem and the existing projects, then introduce a boundary when it solves a real problem, and finally use Nx to help make the boundary visible and verifiable.

## Conclusion

Nx is valuable because it provides a shared way to discover projects, run their tasks, inspect dependencies, reuse valid task results, and focus checks on the parts of a workspace affected by a change. These capabilities become increasingly useful as a repository and its team grow.

But Nx is not a substitute for architectural decisions. It cannot decide whether a piece of code belongs in a library, whether two business capabilities should evolve independently, or whether a new abstraction is worth its cost. Those decisions still depend on the product, its constraints, and the people who maintain it.

The practical approach is to start with the workspace that already exists, learn how Nx sees it, and introduce structure incrementally. Every new library or rule should answer a clear question: what problem does this boundary solve, and what complexity does it introduce in return?

The goal is not to make the repository look enterprise-ready. The goal is to make its structure understandable, its dependencies intentional, and its evolution manageable.

## Further Reading

- [Nx documentation](https://nx.dev/)
- [Nx workspace configuration](https://nx.dev/reference/nx-json)
- [Nx project configuration](https://nx.dev/reference/project-configuration)
- [Nx project graph](https://nx.dev/features/explore-graph)
- [Nx task caching](https://nx.dev/features/cache-task-results)
- [Nx affected commands](https://nx.dev/ci/features/affected)
- [Nx module boundary rules](https://nx.dev/features/enforce-module-boundaries)
