# NX Workspace: From Architecture to Tools

## What Is NX and Why Use It?

NX is a set of tools for developing, building, and maintaining applications and libraries. For me, its main advantage is not simply the ability to keep several projects in one repository, but the tools it provides to manage how those projects interact and to enforce architectural boundaries.

## Monorepos and NX Workspace

As an application evolves, other applications and libraries may appear alongside it, often sharing code. One approach is to use a monorepo, where projects are stored together while retaining their individual purposes.

A repository alone, however, is not enough. We need to define the project structure, how projects interact, and which dependencies are allowed. An NX Workspace provides the workspace and project-management tools to do this.

NX does not define the architecture for us. The workspace structure should reflect the architecture of the solution, while dependency rules help preserve it as the project evolves.

## Experience Using NX

My first substantial experience with NX came from a large Angular project that started in 2017 and is still running today. By that point, the workspace contained two applications and around ten libraries. As it grew, understanding and controlling the dependencies between them became increasingly difficult. Circular dependencies were especially troublesome: finding them and sorting them out manually was not easy.

One of the first steps was to split the project configuration. Instead of one large `angular.json`, each project had its own `project.json`. This describes the experience with the earlier project, not the initialization of the new workspace covered in this article.

The main benefit, though, came from Module Boundaries rules. They made it possible to define which libraries were allowed to depend on one another, using tags to identify their groups and functional areas.

These rules became more than agreements between developers: ESLint checked them during code analysis, and violating configured constraints could fail the build. This made it easier to control dependencies, prevent circular relationships, and maintain the architecture as the project evolved.

## Initializing an NX Workspace

Before creating the first Angular application, let's prepare the repository.

The `enterprise-frontend-workshop` repository already contains articles, documentation, and architectural principles. Rather than creating a separate repository for the practical example, we decided to add NX directly to the existing one. This lets us evolve the application alongside its documentation and keep the history in a single Git repository.

To initialize NX, run:

```bash
npx nx@latest init
```

This starts an interactive NX setup process. The installer presents several options, and we need to make a decision at each step.

### Choosing the Installation Method

First, NX asks how it should be added to the project. We choose `package.json installation`, which installs NX through the existing npm project.

NX is added to the current repository rather than creating a new project in a separate directory.

### Choosing the Setup Mode

Next, the installer offers a minimal setup or a guided one. We choose `Guided`.

This mode walks us through the available settings so we can make decisions step by step.

### Configuring Additional Features

The installer then asks about AI agents. We choose `none`, because integrating AI tools is outside the scope of this stage.

Next comes NX Cloud, which provides remote caching and distributed task execution. We choose `Skip for now`. These capabilities are not required to get the workspace started, and we can revisit them when there is a concrete need.

Finally, the installer asks whether we agree to share usage data with the NX team. We choose `No`, and the installer confirms that analytics are disabled.

### Initialization Results

The installer finishes with `Done!` and provides documentation about adding NX to an existing project.

The following configuration files appear in the repository root:

- `nx.json` — the initial global NX configuration. At this point, it contains a JSON Schema reference and the setting that disables analytics.
- `package.json` — the npm project manifest and the `nx` dependency at version `24.0.1`.
- `package-lock.json` — the locked npm dependency tree.
- `.gitignore` — rules for excluding local IDE settings, NX cache data, and the `node_modules` directory.

The `.nx/` and `node_modules/` directories also appear. The first stores local NX data; the second contains installed npm packages.

At this point, we have a minimal NX configuration. The repository does not yet contain an Angular application or our own libraries.

Adding NX prepares the infrastructure; it does not automatically create the application's architecture. The project structure and dependency rules will take shape as the solution evolves.

The changes are kept in a separate Git branch, `NX-Workspace`, on GitHub. This allows the practical implementation to evolve separately from the repository's main branch.

## Creating the Angular Application

With the NX Workspace initialized, the next step is to create the first application.

The goal is not just to generate an Angular app. We will evolve Personal Finance incrementally and observe how its architecture changes as new requirements emerge. For now, we need a minimal but complete foundation: an application and the configuration required for development, testing, and code-quality checks.

### Why Angular?

Angular is the framework chosen for this example. It is the main frontend framework in my work, and it provides a useful basis for demonstrating how an enterprise application can be organized and evolved.

We are not going to create a complex architecture with numerous libraries and abstractions upfront. At this stage, there is no business functionality that would justify those decisions. First, we will establish a working foundation, verify the tooling, and introduce architectural elements when they become necessary.

### Generating the Application

We use the NX Angular generator to create the application. First, inspect the available options:

```bash
npx nx g @nx/angular:application --help
```

The generator supports configuration of the bundler, routing, testing, linting, styles, and other options. This lets us establish the project's basic conventions before development begins.

We choose the following settings:

- Application name: `personal-finance`.
- NX plugin: `@nx/angular`.
- Bundler: `esbuild`.
- Routing: enabled.
- Standalone components: enabled.
- Unit tests: `vitest-angular`.
- End-to-end tests: Playwright.
- Static analysis: ESLint.
- Styles: SCSS.
- SSR: disabled.
- Strict mode: enabled.
- Zoneless: enabled.

These choices reflect the goals of the workshop. We need a client-side application that can gradually gain routes and functionality. SSR is not required at this stage. Strict mode helps detect problems early, and SCSS is the chosen stylesheet format.

Zoneless is Angular's mode of change detection without a dependency on Zone.js. We enable it when generating the application rather than introducing the configuration later as a separate migration.

For unit tests, we choose `vitest-angular`. I have not used this tool in my previous work, and a new project gives us an opportunity to try a modern testing stack without having to preserve compatibility with existing infrastructure. This does not mean Jest is inferior or should not be used elsewhere. Vitest is simply the choice for this example, and we will verify it in practice.

For end-to-end testing, we choose Playwright. It can run browser-based tests across different browser engines. ESLint handles static code analysis, while TypeScript checks types. These tools complement one another rather than replacing one another.

Run the generator with the selected options:

```bash
npx nx g @nx/angular:application \
  --name=personal-finance \
  --directory=apps/personal-finance \
  --bundler=esbuild \
  --routing=true \
  --standalone=true \
  --e2eTestRunner=playwright \
  --unitTestRunner=vitest-angular \
  --linter=eslint \
  --style=scss \
  --ssr=false \
  --strict=true \
  --zoneless=true
```

NX creates the application and a separate project for end-to-end tests.

### What Appears in the Workspace?

The main parts of the new project are located in these directories:

```text
apps/
├── personal-finance/
└── personal-finance-e2e/
```

`personal-finance` is the Angular application, containing its source code, routes, styles, and TypeScript configuration.

`personal-finance-e2e` is a separate project for end-to-end tests. It contains the Playwright configuration and the `example.spec.ts` test file.

The generator also updates `package.json`, `package-lock.json`, and `nx.json` with the required dependencies, plugins, and task settings. ESLint configuration is stored in `eslint.config.mjs`. We keep the modern Flat Config generated by the tool.

We will shape the application's architecture gradually, as functionality appears and there is a real need to separate responsibilities between projects and libraries.

### Checking the Generated Projects

First, confirm that NX recognizes both projects:

```bash
npx nx show projects
```

The output lists:

```text
personal-finance-e2e
personal-finance
```

Next, check the build, unit tests, and static analysis:

```bash
npx nx build personal-finance
npx nx test personal-finance
npx nx lint personal-finance
```

All three commands complete successfully. The production build is written to `dist/apps/personal-finance`, the unit test passes, and ESLint reports no violations of the configured rules.

Angular does, however, warn that the styles in the generated `nx-welcome.ts` component are 7.03 KB, exceeding the configured 4 KB budget. We do not increase the budget just to accommodate a template component. After replacing the demo interface with our own, we can check whether the warning remains.

### Checking End-to-End Tests

Run the Playwright tests:

```bash
npx nx e2e personal-finance-e2e
```

The first run fails because Playwright cannot find the browser executables for Chromium, Firefox, and WebKit. The npm package is installed, but the browsers themselves still need to be downloaded.

Install them with:

```bash
npx playwright install
```

After installation, the tests pass in all three browsers.

The `example.spec.ts` test checks that the page heading contains the text `Welcome`:

```typescript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('h1').innerText()).toContain('Welcome');
});
```

This is a demonstration test. It verifies basic browser interaction with the application, not business functionality.

### Results of This Stage

We now have a working NX Workspace with an Angular application and a separate end-to-end test project. The build, unit tests, ESLint, and Playwright all work.

Two details came up during setup: the generated demo component exceeds the configured style budget, and Playwright requires a separate browser installation. We have postponed the first issue until the demo interface is replaced and resolved the second by installing the browsers.

We started with a minimal application, checked the basic infrastructure, and confirmed that the tools work. We can now move on to developing Personal Finance and make architectural decisions as real requirements emerge.

## Implementation Branches

- [NX-Workspace](https://github.com/iAVP/enterprise-frontend-workshop/tree/NX-Workspace) — NX Workspace initialization.
- [NX-Workspace+1](https://github.com/iAVP/enterprise-frontend-workshop/tree/NX-Workspace+1) — adding Angular and creating the first application.
