# Architectural Principles

This document defines the architectural principles guiding the Enterprise Frontend Workshop.

It describes intended engineering practices and architectural constraints. It does not imply that the application, NX workspace, or any specific library has already been implemented.

## 1. Architecture from Day One

The project will use an NX workspace from its initial implementation.

The workspace will organize applications and reusable libraries under `apps/` and `libs/`. Individual projects will have their own project configuration.

The architecture will evolve incrementally as the application grows. Complexity should be introduced only when it solves a real problem.

Principles:

- Establish a coherent workspace structure from the beginning.
- Keep project configuration explicit.
- Avoid premature abstractions and speculative libraries.
- Introduce architectural constraints as the project structure develops.
- Prefer deliberate evolution over large-scale restructuring.

## 2. Explicit Module Boundaries

Modules and libraries should have clear responsibilities and explicit dependency directions.

NX and ESLint boundary rules will be used to make architectural constraints visible and enforceable.

The goal is to prevent accidental coupling, preserve modularity, and support independent development of functional areas.

Principles:

- Define library responsibilities before introducing cross-library dependencies.
- Use project tags and `@nx/enforce-module-boundaries` where appropriate.
- Restrict dependencies according to architectural intent.
- Avoid unrestricted shared libraries that become dumping grounds.
- Keep shared functionality small, intentional, and well-defined.

Architectural boundaries should solve actual dependency and ownership problems rather than exist solely to satisfy a diagram.

## 3. Domain-Driven Design and Responsibility Separation

Domain-Driven Design (DDD) provides a vocabulary for organizing software around business capabilities and domain concepts.

In the frontend, this means separating responsibilities and making functional boundaries explicit. It does not mean mechanically reproducing every backend DDD pattern in the UI.

The workshop will explore the practical application of DDD concepts in an NX-based frontend.

Principles:

- Organize code around meaningful functional responsibilities.
- Keep business concepts distinct from technical infrastructure.
- Make dependencies between functional areas explicit.
- Avoid unnecessary layers and abstractions.
- Use ubiquitous language where it improves communication and code clarity.

## 4. Separation of UI, State, and Data Access

UI components should primarily present state, collect user input, and coordinate interactions.

State handling and data access should be encapsulated in services with clear responsibilities.

The intended approach distinguishes several responsibilities:

- **UI components:** render state, collect user input, and handle presentation-level interactions. This applies to ordinary feature components as well as reusable shared components.
- **Facades:** expose the state and operations a component needs, encapsulating application or UI logic behind an explicit interface.
- **Use cases:** coordinate application operations when additional orchestration is justified.
- **Data access:** communicate with backend APIs and transform transport data where needed.
- **Shared base functionality:** provide narrowly scoped technical utilities with explicit contracts.

Components should generally inject the facade responsible for their functional area instead of implementing business or application logic themselves. They bind to exposed state and invoke facade operations in response to user interactions. Presentation-specific logic can remain in the component, but business rules and workflows should live in the appropriate facade or application service.

These are responsibility categories, not a requirement to create a library for every category. The actual structure will depend on the application and its complexity.

## 5. Encapsulated State Management

Angular Signals will be the primary mechanism for synchronous reactive state in the Angular frontend.

The workshop will explore `signal`, `computed`, and `effect`, including their appropriate use and limitations.

Principles:

- Encapsulate state within the component, service, or facade that owns it.
- Expose only the state and operations consumers actually need.
- Use `computed` for derived state.
- Use `effect` for appropriate side effects, not as a substitute for ordinary data flow.
- Avoid unnecessary global state and hidden coupling.
- Evaluate centralized state management according to actual application needs rather than treating it as a universal default.

RxJS remains relevant for asynchronous streams, cancellation, composition, and other stream-oriented problems. Angular HTTP Observables can be consumed directly or converted to Signals when that better fits the consuming code.

The objective is not to eliminate RxJS. It is to choose the appropriate state and asynchronous programming model for each responsibility.

## 6. Reuse Through Explicit Contracts

Reusable components and libraries should provide clear, stable contracts.

Reuse is valuable when it reduces duplication, clarifies responsibilities, or establishes consistency. It becomes counterproductive when abstractions introduce more complexity than they remove.

Principles:

- Prefer explicit inputs, outputs, and service interfaces.
- Avoid hidden dependencies between unrelated modules.
- Keep all UI components focused on presentation and interaction, with application logic encapsulated in injected facades or services.
- Keep reusable shared UI components free of feature-specific business behavior.
- Share design tokens and UI conventions intentionally.
- Avoid generalizing a solution before multiple real use cases justify it.

## 7. Design Systems and Design Tokens

The UI will explore Angular Material, Material 3 (M3) theming, and design tokens as part of a maintainable frontend design system.

Design tokens represent shared design decisions such as colors, typography, spacing, radii, and other visual properties.

The workshop will distinguish:

- Source and primitive tokens.
- Semantic tokens that communicate design intent.
- Component-level application of design tokens.
- Theme configuration and component customization.

Angular Material is a component library, not a complete design system by itself. A consistent design system also requires deliberate decisions about tokens, semantics, component behavior, and visual consistency.

The objective is to establish a clear contract between design intent and frontend implementation.

## 8. Frontend and Backend Contracts

The sample application will evolve from an Angular frontend toward a fullstack architecture using Next.js as a backend and REST APIs.

The frontend should depend on explicit API contracts rather than backend implementation details.

Principles:

- Keep transport concerns separate from UI components.
- Centralize cross-cutting HTTP behavior where appropriate.
- Handle loading, validation, and error states deliberately.
- Keep API integration aligned with the application's functional boundaries.
- Avoid introducing an additional backend runtime without a clear architectural reason.

Next.js will provide the backend capabilities required by the sample application. Any additional infrastructure must be justified by a concrete requirement.

## 9. Microfrontends and Web Components

The workshop will explore frontend integration using Angular Elements and Web Components, including the integration of selected Angular components into a Vue.js application.

These technologies provide component-level interoperability. They do not automatically make an entire application an independently deployable microfrontend.

The architectural discussion will distinguish:

- Component reuse across framework boundaries.
- Web Component contracts and lifecycle.
- Framework-specific dependencies and runtime costs.
- Independent deployment and integration strategies.
- Shared backend contracts across different frontend frameworks.

The goal is to demonstrate practical interoperability without confusing it with a complete microfrontend architecture.

## 10. AI-Assisted and Agentic Engineering

AI-assisted development is a cross-cutting engineering topic throughout the workshop.

The focus is on improving engineering outcomes, not simply generating code faster.

Relevant practices may include:

- Requirements analysis and task decomposition.
- Specification-driven development.
- Agent-assisted implementation and refactoring.
- Test generation and verification.
- Code review and architecture analysis.
- Context engineering and effective use of coding agents.
- Human oversight, security, and accountability.

The workshop will distinguish AI-assisted software development from Agentic Engineering and from the design of AI agent systems.

Using a coding agent to implement an application feature is not the same as building an agentic AI system into the application itself.

Any AI-generated implementation must remain subject to the same architectural constraints, testing expectations, and quality standards as manually written code.

## 11. Maintainability Over Abstraction

The project prioritizes understandable, testable, and maintainable software.

Principles:

- Prefer simple solutions that satisfy actual requirements.
- Introduce abstractions when they clarify responsibilities or reduce meaningful duplication.
- Avoid unnecessary indirection.
- Make architectural trade-offs explicit.
- Treat testing, code quality, and maintainability as engineering concerns from the beginning.

## 12. Architecture as an Evolving Set of Decisions

These principles guide future implementation and technical publications. They are not a claim that every decision has already been implemented or validated.

As the project evolves, architectural decisions should be documented when they have meaningful consequences for dependencies, maintainability, deployment, or developer workflows.

Significant changes may be recorded as Architecture Decision Records (ADRs) under `docs/adr/` when there is a concrete decision worth preserving.

The architecture should evolve through explicit reasoning, practical implementation, and verification.

---

**Guiding principle:** Build explicit boundaries, encapsulate responsibilities, and introduce complexity only when it creates measurable engineering value.
