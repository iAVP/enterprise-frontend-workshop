# Enterprise Frontend Workshop

A practical enterprise frontend engineering workshop covering Angular, NX, TypeScript, domain-driven design, microfrontends, and AI-assisted software engineering.

This repository accompanies a series of technical articles exploring how to design, build, and evolve maintainable enterprise frontend applications.

The goal is not to demonstrate isolated framework features, but to show how architectural decisions affect modularity, coupling, maintainability, and long-term development.

## Project Overview

The workshop follows the development of a Personal Finance application, evolving from an Angular frontend into a fullstack solution with a shared backend and an additional Vue frontend.

The same application serves as a continuous example throughout the series. Each stage builds on previous work and introduces new architectural concepts when they become relevant.

### Planned Technology Stack

- **Workspace and tooling:** NX, npm, TypeScript
- **Primary frontend:** Angular
- **Frontend architecture:** Domain-driven design, modular libraries, explicit dependency boundaries, encapsulated state
- **Backend:** Next.js, REST API
- **Additional frontend:** Vue.js
- **Component interoperability:** Angular Elements and Web Components
- **UI technologies:** Angular UI components and Bootstrap for the Vue frontend
- **Engineering practices:** Automated testing, linting, code quality, and AI-assisted development

The technology stack will evolve as the workshop progresses. Individual technologies will be introduced when they serve a concrete architectural or functional purpose.

## Architectural Principles

### Architecture from Day One

NX is the foundation of the workspace from the beginning, not a migration step introduced after the application has grown.

The workspace will follow NX conventions, with applications under `apps/` and reusable libraries under `libs/`. Individual projects will have explicit project configuration.

### Explicit Module Boundaries

Architecture should be enforced where practical, not left entirely to developer discipline.

NX project tags and module-boundary rules will be used to control dependencies and prevent unrelated parts of the application from becoming tightly coupled.

Libraries will be introduced when they provide a meaningful architectural boundary or reusable capability, rather than being created merely to fill a predefined structure.

### Encapsulated State and Responsibilities

Application state and behavior should have clear ownership.

Angular Signals will be used to implement state where appropriate. UI state, functional state, and data-access responsibilities will be separated according to their purpose.

The workshop will examine different state-management approaches, including their trade-offs in long-lived, multi-developer enterprise applications.

### Maintainability over Abstraction

The objective is not to maximize the number of abstractions, services, or libraries.

The objective is to minimize unnecessary coupling, keep responsibilities clear, and allow changes in one functional area without creating avoidable consequences elsewhere.

### Reuse Through Explicit Contracts

Reusable components and libraries should have well-defined contracts. Cross-framework reuse will be explored through Web Components rather than assuming that Angular and Vue components are directly interchangeable.

### AI-Assisted Engineering

AI will be considered throughout the workshop as a practical engineering tool for activities such as code generation, refactoring, testing, code review, and architectural analysis.

Generated code and recommendations must be evaluated against the requirements, architecture, security constraints, and quality standards of the project. AI supports engineering decisions; it does not replace engineering responsibility.

## The Sample Application: Personal Finance

Personal Finance is the running example used throughout the workshop.

The application will evolve as new architectural concepts are introduced. Potential functional areas include:

- Income and expense management
- Categories and budgets
- Financial summaries and statistics
- Import and export of financial data
- Validation and error handling
- Backend integration

The functional scope will grow incrementally. Features will be added when they help demonstrate a specific implementation or architectural decision.

## Learning Roadmap

The workshop follows a deliberate sequence. Each stage builds on the preceding stages.

### 1. NX Fundamentals

- Creating an NX workspace
- Understanding applications and projects
- Exploring the workspace structure
- Running tasks and using the NX CLI
- Understanding project configuration and dependency graphs

### 2. Angular in Depth

- Components, templates, directives, dependency injection, and services
- Angular Signals: `signal`, `computed`, and `effect`
- Encapsulated state and service-based facades
- HTTP communication, error handling, and interceptors
- Testing and maintainable component design

### 3. Domain-Driven Design and Library Boundaries

- Organizing applications and libraries
- Separating UI, facades/API, data-access layers, and shared base functionality
- Defining dependency directions
- Enforcing module boundaries with NX and ESLint
- Applying architectural rules without unnecessary abstractions

### 4. Angular Microfrontends and Web Components

- Understanding Angular Elements
- Exposing selected Angular components as custom elements
- Defining component contracts and integration boundaries
- Evaluating the trade-offs of microfrontend architectures

### 5. npm Packages and Azure DevOps Artifacts

- Packaging reusable libraries
- Managing package versions and dependencies
- Publishing and consuming packages
- Using Azure DevOps Artifacts as a private package registry

### 6. Next.js Backend

- Introducing Next.js as the backend for the application
- Designing REST API endpoints
- Handling validation, business operations, and errors
- Processing imported and exported financial data
- Integrating persistence and authentication where appropriate

### 7. Introduction to Vue.js

- Core Vue concepts
- Components, reactivity, and application structure
- Building a separate frontend client

### 8. Vue.js, DDD, and an Existing Backend

- Organizing a Vue application around clear functional boundaries
- Applying architectural principles without copying Angular-specific patterns
- Consuming the existing Next.js REST API
- Keeping frontend responsibilities separate from backend responsibilities

### 9. Vue.js with Angular Elements

- Integrating selected Angular custom elements into the Vue application
- Defining contracts between independently implemented UI components
- Managing loading, styling, lifecycle, and version compatibility
- Understanding the limitations and trade-offs of cross-framework reuse

## Repository Structure

The repository will evolve alongside the implementation.

The intended top-level structure is:

```text
enterprise-frontend-workshop/
├── apps/                  # Applications in the NX workspace
├── libs/                  # Reusable libraries with explicit boundaries
├── docs/                  # Architecture decisions and technical documentation
├── articles/               # Article drafts and publication references
├── README.md
├── HASHTAGS.md             # Controlled publication hashtag vocabulary
└── LICENSE                 # To be added after a license is selected
```

This is a target structure, not a requirement to create every directory immediately. Application and library directories will be added as the NX workspace and implementation develop.

## Technical Publications

The repository is intended to accompany a multilingual technical publication series.

- **Primary technical material:** English
- **Russian publications:** Adapted articles and discussions for the Around IT community on VK
- **German publications:** Extended professional posts and article announcements on LinkedIn
- **Additional professional presence:** Xing

The articles will explain the context, rationale, implementation, alternatives, and trade-offs behind the code.

Publication formats and visual presentation may vary by platform, while the technical concepts and repository examples remain consistent.

## Scope and Status

This is an evolving engineering workshop.

The roadmap describes planned work; it does not imply that all features, libraries, architecture rules, or backend capabilities are already implemented.

Architectural decisions will be documented as the project develops, including the reasoning behind important choices and the trade-offs involved.

## Project Goals

The workshop aims to demonstrate practical approaches to:

- Building enterprise frontend applications with explicit architectural boundaries
- Keeping functional responsibilities encapsulated
- Managing complexity as applications grow
- Reusing components through well-defined contracts
- Integrating frontend applications with a shared backend
- Applying AI tools responsibly in software engineering

The emphasis throughout is on engineering decisions that support long-term maintainability rather than on framework features in isolation.
