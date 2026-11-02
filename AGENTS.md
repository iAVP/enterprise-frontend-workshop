# Repository agent instructions

These rules are mandatory for every contribution. Apply them to new code and when modifying existing code.

## TypeScript structure and definitions

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
- Do not add alternate aliases for the same library or use relative imports to bypass the established public aliases between libraries.
- Application-specific Angular components, directives, pipes, and services remain in their feature libraries, each in its own appropriately named file. Do not declare additional interfaces or types alongside them.
- Every interface property and method must have an English documentation comment.
- Every explicitly declared `protected` or `public` member must have an English documentation comment. Prefer `protected` for component-internal members; use `public` only when the member is intentionally part of a public API.

## Angular conventions

- Do not use `@Input`, `@Output`, `EventEmitter`, or decorator-based input/output declarations. Use signal-based `input()` and `output()`.
- Component-internal properties and methods must use `protected` rather than `public`.
- Keep one Angular definition per TypeScript file.
- Use SCSS for component styles.

## Paths and feature layout

- Avoid duplicated semantic path segments. In particular, never create paths such as `libs/personal-finance/pages/src/lib/pages`.
- Feature page components belong in a singular-purpose folder such as `src/lib/views/<view-name>/`; keep the library name out of the nested folder name.
- Keep feature-specific code inside its feature library and reusable code inside `libs/shared`.

## Mock data

- All mock/demo data must live in the single shared library at `libs/mock`, not inside an application- or feature-specific library.
- The `@workshop:mock` alias must point to `libs/mock/src/index.ts`.
- The mock library has no tests and must not contain Vitest configuration or test targets.
- Other libraries are expected to have tests. Keep their TypeScript test configuration and Vitest configuration in place, including `libs/shared/definitions`.
- Do not embed mock/demo datasets in components, pages, stores, or services. Import them from `@workshop:mock`.

## Quality and workflow

- Preserve the existing Nx project conventions, aliases, and module-boundary constraints.
- When moving files, update all imports and public exports.
- Verify the resulting Git tree and inspect changed files after committing.
- Never claim tests, lint, or builds were run unless they were actually executed. Report any checks that could not be run.
