# Article Roadmap

This document defines the planned technical publication series for the Enterprise Frontend Workshop.

The articles will follow the evolution of a sample Personal Finance application. Each stage will introduce a technical or architectural concept, demonstrate its practical application, and explain the relevant trade-offs.

The roadmap describes planned content. An article should be marked as published only after it is actually available.

## 1. Editorial Principles

The series follows several principles:

- **One evolving application:** demonstrate architectural evolution through a consistent example rather than unrelated demos.
- **Architecture from day one:** initialize the project as an NX workspace instead of starting with a plain Angular application and migrating later.
- **Practical engineering:** connect technical concepts to concrete implementation decisions.
- **Explicit trade-offs:** explain not only how a solution works, but also why it is appropriate and where it may not be.
- **AI as a cross-cutting topic:** explore AI-assisted and agentic engineering where it meaningfully improves the development workflow.
- **English as the canonical language:** maintain the primary technical articles and code documentation in English.
- **Localized communication:** adapt selected topics for Russian-speaking and German-speaking audiences.

## Article Branching Workflow

Each article is developed on its own Git branch named after the article title, using hyphens instead of spaces. When an article needs multiple implementation stages, append `+` and the branch number for that article, for example `NX-Workspace+1` and `NX-Workspace+2`.

At the bottom of the article, list the relevant branch names and their GitHub URLs. Add links only after the branches exist and their URLs have been verified. This allows readers to inspect the code corresponding to each stage of the article.


## 2. Sample Application

The example project is a Personal Finance application that evolves throughout the series.

Planned functional areas include:

- Income and expense management.
- Categories and budgets.
- Financial summaries.
- Input validation and error handling.
- Data import and export.
- Backend integration.

The application is a practical context for discussing architecture. Features should be implemented when they support the subject of an article, not merely to make the application appear complete.

## Publication Record and Source of Truth

This section records actual publication history. It is distinct from the planned learning sequence below.

| Publication order | Article | Status | Publication date | Canonical publication URL |
| --- | --- | --- | --- | --- |
| 1 | [The Road to Architecture](https://enterprise-frontend-workshop.hashnode.dev/the-road-to-architecture) | Published | Not recorded here | [Hashnode](https://enterprise-frontend-workshop.hashnode.dev/the-road-to-architecture) |
| 2 | NX Fundamentals — Building an Enterprise Frontend Workspace from Scratch | Published | Not recorded here | Not recorded here |

**Rules for all project chats and contributors:**

- Use this publication record—not chat order, branch names, or roadmap stage numbers—to determine publication order.
- *The Road to Architecture* is publication 1. NX Fundamentals is publication 2; do not describe the NX article as the first publication.
- Keep actual publication order separate from the planned learning sequence. Roadmap stages are not publication numbers.
- Before answering questions about article history, the next planned article, publication dates, or links, check this file.
- Never infer missing dates or URLs. Mark them as “Not recorded” until verified.
- After publication, update this record with the actual title, date, and canonical URL, and update the roadmap status. Add links to translated and platform-specific versions where known.
- If a chat cannot access this file or information is ambiguous, state that limitation rather than guessing.

## 3. Planned Article Sequence

### Introductory Article — Architecture Before Technology

**Status: Published** — [The Road to Architecture](https://enterprise-frontend-workshop.hashnode.dev/the-road-to-architecture)


**Purpose:** introduce the author's personal view of software architecture and explain why architectural decisions should be considered before implementation begins.

Planned topics:

- Architecture as a set of deliberate decisions, not a specific framework or tool.
- Why it is preferable to establish the main architectural direction before development starts.
- How the cost and impact of architectural changes can grow as a project progresses: before development, during the first third or MVP stage, and around the middle or later stages.
- Architecture as an evolving set of decisions rather than an immutable blueprint.
- Why the following articles focus on the architectural reasoning behind choices, using Angular, Vue, NX, and other technologies as implementation tools.
- How AI can reduce the time needed to learn and use tools, while architectural understanding remains essential for directing and validating the resulting code.

The article presents a personal perspective, not a mandatory architecture or a universal prescription. Readers remain free to make their own choices.

### Theoretical companion — Architecture in Practice

**Status: Draft** — [Architecture in Practice: Decisions Behind Enterprise Frontend Systems](architecture-in-practice.ru.md) (Russian draft)

**Purpose:** develop the architectural reasoning behind real project decisions before moving into technical implementation. This article discusses preserving existing workflows, working across frontend frameworks, revisiting configuration decisions, and weighing technical choices against long-term cost.

This is a recurring editorial pattern for the series: a theoretical article may precede a technical implementation article when the reasoning deserves a separate treatment.

### Stage 1 — NX Fundamentals

**Purpose:** establish the workspace and explain the NX development model.

Planned topics:

- NX workspace concepts and project organization.
- `apps/` and `libs/`.
- Project configuration and basic development workflows.
- Running, building, testing, and linting projects.
- Why NX is used from the beginning.
- Introducing architecture without premature abstraction.

**Expected outcome:** a correctly initialized workspace and the first minimal application project.



### Short companion article — Development Tools

A short, practical comparison will cover three options:

- **WebStorm:** a full-featured IDE with a paid commercial license.
- **Visual Studio Code:** a free, extensible code editor.
- **OpenCode:** a free, open-source AI coding agent that can run in a terminal, desktop app, or IDE extension.

OpenCode can be an alternative when access to VS Code or its extensions is restricted, although access to model providers may still depend on regional availability and network policies. The NX walkthrough itself will remain independent of any specific IDE or editor.

### Stage 2 — Angular in Depth

**Purpose:** establish the Angular application structure and the core frontend programming model.

Planned topics:

- Components, templates, directives, dependency injection, and services.
- Angular Signals: `signal`, `computed`, and `effect`.
- Encapsulated state and service-based facades.
- HTTP communication, error handling, and interceptors.
- Testing and maintainable component design.
- Angular Material and Material 3 theming.
- Design tokens and a consistent UI design system.
- Appropriate use of RxJS for asynchronous and stream-oriented problems.

**Expected outcome:** an Angular frontend with clear component responsibilities and an understandable state model.

### Stage 3 — Domain-Driven Design and Library Boundaries

**Purpose:** evolve the workspace toward explicit functional and architectural boundaries.

Planned topics:

- Applying DDD concepts in frontend development.
- Organizing applications and libraries around responsibilities.
- Separating UI, facades, use cases, and data access where justified.
- Defining dependency directions.
- NX project tags and `@nx/enforce-module-boundaries`.
- Sharing UI components and design tokens.
- Avoiding unnecessary layers and oversized shared libraries.

**Expected outcome:** a modular frontend whose dependencies are deliberate and increasingly enforceable.

### Stage 4 — Angular Microfrontends and Web Components

**Purpose:** explore integration and reuse across frontend boundaries.

Planned topics:

- Microfrontend concepts and deployment considerations.
- Angular Elements and Web Components.
- Component contracts, lifecycle, and framework dependencies.
- The difference between reusable Web Components and independently deployed microfrontends.
- Integration trade-offs and runtime considerations.

**Expected outcome:** a practical understanding of when Web Components help and what additional architecture is required for microfrontends.

### Stage 5 — npm Packages and Azure DevOps Artifacts

**Purpose:** demonstrate controlled distribution and reuse of frontend libraries.

Planned topics:

- Packaging reusable libraries.
- npm package structure and versioning.
- Public and private package distribution.
- Azure DevOps Artifacts feeds.
- Dependency management and package consumption.
- CI/CD considerations for publishing packages.

**Expected outcome:** an understandable package lifecycle for reusable code, without publishing libraries prematurely.

### Stage 6 — Next.js Backend and REST API

**Purpose:** extend the sample application toward a fullstack architecture.

Planned topics:

- Next.js backend capabilities and application structure.
- REST API design and contracts.
- Backend integration with the existing Angular frontend.
- Validation, error handling, and transport boundaries.
- Configuration and environment-specific concerns.
- Testing and deployment considerations.

**Expected outcome:** a documented frontend/backend interaction model for the sample application.

### Stage 7 — Introduction to Vue.js

**Purpose:** introduce Vue.js as an alternative frontend framework using the existing project context.

Planned topics:

- Vue components and reactivity.
- Composition API and composables.
- Component state and service responsibilities.
- Routing and API integration.
- Bootstrap-based UI implementation for comparison with the Angular frontend.
- Differences in programming model and ecosystem.

**Expected outcome:** a Vue frontend foundation with a clear understanding of its core concepts.

### Stage 8 — Vue.js, DDD, and the Existing Backend

**Purpose:** apply explicit architectural boundaries to the Vue frontend while reusing the existing backend.

Planned topics:

- Organizing Vue code around functional responsibilities.
- Composables, application services, and data-access responsibilities.
- Dependency direction and module boundaries.
- Integrating with the existing Next.js REST API.
- Avoiding unnecessary abstractions.
- Comparing architectural decisions across Angular and Vue.

**Expected outcome:** a Vue implementation that uses the existing backend and applies consistent architectural principles.

### Stage 9 — Vue.js with Angular Elements

**Purpose:** demonstrate selected Angular components integrated into a Vue application.

Planned topics:

- Exposing selected Angular components as Web Components.
- Integrating Angular Elements into Vue.
- Defining component contracts and passing data.
- Handling events, lifecycle, styling, and framework-specific dependencies.
- Sharing a backend without coupling the two frontend frameworks.
- Evaluating the benefits and costs of mixed-framework integration.

**Expected outcome:** a concrete example of cross-framework component integration, with explicit limitations and trade-offs.

## 4. Cross-Cutting Series: AI-Assisted and Agentic Engineering

AI-related engineering topics will appear throughout the series when relevant. They do not need to be forced into every article.

Practical tool-specific examples will focus on Claude and GitHub Copilot, the AI tools officially approved for use in the author's company. General engineering principles will remain vendor-neutral, while hands-on workflows will reflect these approved tools.

Potential dedicated topics include:

- AI-assisted requirements analysis and task decomposition.
- Coding agents in implementation and refactoring workflows.
- Context engineering and specification-driven development.
- Agent-assisted testing and code review.
- Verifying generated code against architectural boundaries.
- Human oversight, security, and quality assurance.
- The distinction between Agentic Engineering and building agentic AI systems.

The focus will remain on practical engineering methods, reliable outcomes, and maintainable software.

## 5. Additional Engineering Case Study

A separate article may explore TypeScript, object-oriented design, and the value of encapsulation through a real-world refactoring case.

The intended theme is how a large amount of repetitive or overly complex code can sometimes be replaced by a small, well-defined abstraction.

Before publication, the example must establish:

- The original problem and constraints.
- What the original code actually did.
- What the replacement abstraction encapsulates.
- Why the change is correct and maintainable.
- The relevant trade-offs and limitations.

The article should explain the engineering reasoning rather than rely on a dramatic line-count comparison.

## 6. Publication Workflow

The canonical technical material will be maintained in English.

Selected articles may be adapted for other platforms and audiences:

- **LinkedIn:** professional engineering discussion and announcements linking to the full article.
- **Xing:** professional updates and relevant technical commentary.
- **VK / Around IT:** Russian-language adaptations and community discussion.

Platform-specific posts may differ in length and framing, but should preserve the technical meaning of the original article.

Use `HASHTAGS.md` as the controlled vocabulary for publication hashtags.

## 7. Status and Scope

All articles in this roadmap are planned unless explicitly marked otherwise.

The order represents the intended learning progression, not a commitment to publish on fixed dates.

Articles may be refined, split, combined, or reordered when implementation reveals a more useful way to explain the material.

Do not create placeholder applications, libraries, or code solely to make the roadmap look complete.

---

**Guiding principle:** Each article should leave the reader with a concrete engineering insight, an understandable example, and a clearer view of the trade-offs involved.
