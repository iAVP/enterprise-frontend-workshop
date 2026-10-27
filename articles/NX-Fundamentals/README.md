<!-- DRAFT: Fixed theoretical introduction. Do not edit without separate agreement. -->

# NX Fundamentals: Building an Enterprise Frontend Architecture

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

<!-- Existing working outline follows; preserved below. -->

## Workspace Concepts and Project Organization

Explain what NX considers a project, how projects are discovered, and why a workspace is more than a directory containing multiple applications.

## The Roles of `apps/` and `libs/`

Describe the intended distinction between deployable applications and libraries, while avoiding the assumption that every piece of code needs to become a library immediately.

## Project Configuration and Targets

Explain project configuration, inferred targets, and explicit project configuration at a conceptual level. Use the actual configuration in the current repository as the source of examples.

## How NX Discovers and Runs Projects

Show how to inspect the workspace and identify project names and available targets. Keep commands aligned with the checked-in workspace and installed NX version.

## Running, Building, Testing, and Linting Projects

Summarize the task commands already introduced in the previous article, focusing here on the NX project/task model rather than repeating the initial validation transcript.

## Project Graph and Task Graph

Explain the difference between relationships between projects and the tasks NX executes. Include commands and screenshots only after verifying them against the current workspace.

## Caching and Affected Commands

Explain the purpose of task caching and affected-project workflows. Verify the actual configuration and behavior before making claims about cache hits or CI optimization.

## Introducing Architecture Without Premature Abstraction

Connect NX capabilities to architectural decisions. State what the current repository does and does not enforce; do not imply that domain libraries, tags, or module-boundary rules already exist unless they have been implemented.

## Current Implementation Baseline

The preceding NX Workspace article documents these completed stages:

- Branch `NX-Workspace`: initialize the NX workspace.
- Branch `NX-Workspace+1`: generate a minimal Angular application and its E2E project, then check build, unit tests, lint, and Playwright setup.

The current workspace is a starting point, not a finished enterprise architecture. Business features, domain-oriented libraries, project tags, and enforced module boundaries must be introduced deliberately in later stages.

## Further Reading

- [NX documentation](https://nx.dev/)
- [NX workspace configuration](https://nx.dev/reference/nx-json)
- [NX project configuration](https://nx.dev/reference/project-configuration)
- [NX project graph](https://nx.dev/features/explore-graph)
