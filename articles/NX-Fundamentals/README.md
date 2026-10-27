# NX Fundamentals: Building an Enterprise Frontend Workspace from Scratch

> Working outline and implementation notes. This article continues from [NX Workspace: From Architecture to Tools](../NX-Workspace/README.md); it must not repeat the initial setup and Angular generation walkthrough.

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
