# NX Fundamentals: Building an Enterprise Frontend Workspace from Scratch

## Purpose and relationship to previous articles

This article continues from [NX Workspace](../NX-Workspace/README.md). It must not repeat NX initialization, Angular application generation, or the first build/test/lint checks already covered there.

## Planned scope

- Read the existing workspace and project structure as it stands after the `NX-Workspace+1` implementation branch.
- Explain how NX projects, targets, configuration files, and the project graph relate to one another.
- Introduce the next concrete architecture step only when supported by the repository's actual state.
- Distinguish what is already implemented from what is only proposed.
- Link to official NX documentation for each significant technical claim.

## Implementation baseline

See [NX Workspace — Implementation Status and Scope](../NX-Workspace/README.md#implementation-status-and-scope) before drafting. The current baseline is a working NX workspace with a minimal Angular application and end-to-end test project. Business libraries, domain boundaries, project tags, and enforced module boundaries are not yet implemented.

## Drafting rule

Before adding commands or claiming an implementation exists, inspect the corresponding branch and files. Do not re-introduce steps already documented in NX Workspace.
