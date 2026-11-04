# Repository agent instructions

These rules are mandatory for every contribution. Apply them to new code and when modifying existing code.

## TypeScript structure and definitions

- `common/environments/common.ts` must expose shared environment entries only through properties of the exported `COMMON` object. Add every new entry inside `COMMON`; do not create standalone exported constants or other independent definitions for these entries. Consumers must access them through `COMMON.<property>`.
- One TypeScript file contains exactly one definition. Do not declare a component class and an interface, type, enum, or another class in the same file.
- Shared contracts and reusable definitions belong in `libs/shared/definitions/src/lib`, separated by kind:
  - constants: `constants/`
  - abstract classes: `abstracts/`
  - classes: `classes/`
  - enums: `enums/`
  - types: `types/`
  - interfaces: `interfaces/`
  - records: `records/`
- Each definition file contains one definition only. Export definitions through the matching `index.ts`.
- All TypeScript path aliases must use the `@workshop:` namespace. Never create short or duplicate aliases without this prefix. Use the established names:
  - `@workshop:facades`, `@workshop:dal`, `@workshop:base`
  - `@workshop:def:consts`, `@workshop:def:abstracts`, `@workshop:def:classes`, `@workshop:def:enums`, `@workshop:def:types`, `@workshop:def:interfaces`, `@workshop:def:records`
  - `@workshop:ui`, `@workshop:mock`, `@workshop:personal-finance:pages`, `@workshop:common`
- Do not add alternate aliases for the same library.
- Use relative imports when referencing files or entry points within the same NX project.
- Use established public TypeScript path aliases only when importing from a different NX project; do not use relative paths to bypass library boundaries.
- Application-specific Angular components, directives, pipes, and services remain in their feature libraries, each in its own appropriately named file. Do not declare additional interfaces or types alongside them.
- Every interface property and method must have an English documentation comment.
- Every explicitly declared `protected` or `public` member must have an English documentation comment. Prefer `protected` for component-internal members; use `public` only when the member is intentionally part of a public API.

## Angular conventions

- Angular service class names must end with `Service` (for example, `TransactionService` or `StorageService`). Angular component class names must end with `Component` (for example, `TransactionListComponent`). Apply these suffixes consistently to all new and modified Angular services and components.
- Do not use `@Input`, `@Output`, `EventEmitter`, or decorator-based input/output declarations. Use signal-based `input()` and `output()`.
- Component-internal properties and methods must use `protected` rather than `public`.
- Keep one Angular definition per TypeScript file.
- Use SCSS for component styles.
- Use the `inject()` function for Angular dependency injection. Do not inject dependencies through constructors; constructor injection is supported by Angular but is not used in this repository.

## Paths and feature layout

- Avoid duplicated semantic path segments. In particular, never create paths such as `libs/personal-finance/pages/src/lib/pages`.
- Feature page components belong in a singular-purpose folder such as `src/lib/views/<view-name>/`; keep the library name out of the nested folder name.
- Keep feature-specific code inside its feature library and reusable code inside `libs/shared`.

## Mock data

- All mock/demo data must live in the single shared library at `libs/mock`, not inside an application- or feature-specific library.
- The `@workshop:mock` alias must point to `libs/mock/src/index.ts`.
- The mock library has no tests and must not contain Vitest configuration or test targets.
- Every NX project except `libs/mock` must contain at least one executable test recognized by its configured test runner. This includes applications and libraries.
- Minimal smoke tests are acceptable initially; they must compile and execute successfully. Expand them with meaningful behavior coverage in the dedicated testing articles.
- Keep TypeScript test configuration and Vitest configuration in place for projects using Vitest, including `libs/shared/definitions`.
- Do not embed mock/demo datasets in components, pages, stores, or services. Import them from `@workshop:mock`.

## Agent entry points

- Keep `CLAUDE.md` as a regular text file containing exactly `@AGENTS.md`, so Claude Code imports these shared instructions. Do not make `CLAUDE.md` a filesystem symlink.

## Quality and workflow

- Preserve the existing Nx project conventions, aliases, and module-boundary constraints.
- When moving files, update all imports and public exports.
- Verify the resulting Git tree and inspect changed files after committing.
- Never claim tests, lint, or builds were run unless they were actually executed. Report any checks that could not be run.

## Formatting and source-file readability

- Create and modify source files with readable, conventional formatting. Never compress HTML templates, SCSS, or TypeScript into a single line to save space.
- Use a tab character for indentation, with a tab width of 4 columns. Do not use spaces for indentation.
- Preserve meaningful line breaks and indentation that reflect the document structure.
- In HTML templates, put complex elements and their attributes on separate lines when this improves readability. Keep Angular control-flow blocks formatted with spaces, for example `@if (condition) {` and a separately indented body and closing brace.
- In SCSS, put selectors and declarations on separate lines, use a separate line for each declaration, and format nested rules as clearly separated blocks. Keep blank lines between logically distinct nested blocks where useful.
- Apply the same formatting discipline to code examples in articles. Examples must be copyable, readable source code, not minified snippets.
- Do not introduce mixed indentation. Tabs are the required indentation character; spaces may be used only where syntax requires them, such as alignment inside string literals.

## Type safety and enum usage

- When a value is represented by a TypeScript enum, compare and assign enum members rather than string or numeric literals.
- Never replace an enum comparison with a string comparison such as `type === 'income'` or `type === 'expense'`. Use the corresponding member, for example `type === TransactionType.income` or `type === TransactionType.expense`.
- Import the enum from its established definitions alias. Do not duplicate enum values as string unions, magic strings, or local constants.
- Keep route data, component logic, templates, mock data, and documentation consistent with the enum's actual member names and underlying values.
- Before finishing a change, inspect all related templates and TypeScript files for string-based checks or assignments that bypass the enum contract.

## Backward compatibility and regression prevention

- Treat all existing application behavior as a required baseline. A task to add, refactor, or replace one feature does not grant permission to remove, weaken, bypass, or change unrelated existing functionality.
- Before making changes, inspect the current implementation and the relevant history or base branch to identify existing features, route behavior, guards, authentication flows, persistence behavior, navigation, UI actions, and public APIs that must remain intact.
- Make the smallest change that fulfills the requested task. Keep new functionality additive and isolated wherever possible.
- Do not remove or alter an existing feature, route guard, redirect, authentication check, persisted setting, UI action, or user flow unless the user explicitly requests that change. If a requested change appears to require such a modification, explain the impact and ask before proceeding.
- When replacing or restructuring a component, page, service, route configuration, or shared abstraction, first inventory its existing behavior and dependencies. Reimplement or preserve every behavior not explicitly marked for removal.
- Before committing, review the complete diff against the base branch and check specifically for accidental deletions, weakened access control, lost navigation or UI controls, changed persistence semantics, and broken public exports.
- Add or update regression tests for preserved behavior. For route or UI changes, verify the relevant user journeys end to end, including authentication and authorization where applicable.
- Run the relevant existing checks after the change. A passing build or unit test suite alone does not prove that existing user-facing behavior was preserved; run the appropriate integration or E2E tests as well.
- Do not declare a task complete while known regressions remain unresolved. Report any unverified behavior explicitly.

## Strict Task Scope — Mandatory

**Change only the entities and behavior explicitly requested by the user. Never expand the task scope on your own.**

- A request concerning one entity or data collection does not authorize changes to adjacent or related entities.
- Do not alter neighboring services, storage mechanisms, login or credential persistence, authentication, routes, guards, UI behavior, configuration, contracts, or data models unless the user explicitly requests those changes.
- For example, replacing LocalStorage with IndexedDB for the income/expense transaction collection authorizes changing only that collection's persistence path. It does not authorize moving login-name storage or any other unrelated LocalStorage key.
- Do not perform opportunistic refactoring, cleanup, redesign, or feature additions outside the requested scope.
- If a required implementation step appears to affect an entity or behavior not named by the user, stop and ask for explicit approval before touching it. State the exact entity, the proposed change, and why it may be necessary.
- If scope is uncertain, assume the entity is out of scope. Ask rather than infer permission.
- Tests and documentation must also remain within the requested scope. Do not modify unrelated tests or documentation to accommodate an unrequested implementation change.
- Before committing, inspect the complete diff and verify that every modified file and behavior is authorized by the user's request. Remove unauthorized collateral changes.
- This rule overrides convenience, architectural preference, and assumptions about what would be a cleaner implementation.

The user's explicit instructions define the scope. Do not reinterpret or enlarge it.
