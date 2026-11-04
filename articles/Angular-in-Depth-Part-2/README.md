# Angular in Depth — Part 2: The Evolution of Angular and a Developer's Architectural Thinking

## 1. Architectural Thinking Predates Angular

My understanding of software architecture began to take shape long before Angular and modern frontend frameworks existed. Back in the 1990s, when I was working with C++ and Delphi, I was already dealing with problems that today could reasonably be described as architectural.

The technical environment was very different from what we are used to today. We worked on a shared coaxial network with terminators, without modern infrastructure, familiar database systems, or version control. Code was developed collaboratively and eventually assembled into a single project. As a result, organizing the work and agreeing on conventions were just as important in practice as the technical decisions themselves.

The separation of responsibilities between the presentation system and business logic was not planned in advance. It emerged naturally. Some people were more inclined towards frontend development, others less so; many initially moved between the two areas. Gradually, however, it became clear that working on both the presentation system and business logic at the same time was too much. Eventually, several people focused on presentation, while the others continued working on business logic.

The business logic itself was genuinely complex. It was not simply a collection of conditions and calculations. To develop the algorithms, we had to work with mathematics professors. They helped with the mathematical aspects of the problems, including complex calculations and complex numbers, while we implemented those algorithms in software.

Today, this distribution of responsibilities could be described using modern architectural terminology. Back then, however, it was not the result of applying a methodology or choosing a predefined pattern. We arrived at it through practical work: as the system became more complex, specialization became a natural necessity.

What matters to me about this experience is not that we already had a ready-made architectural model. We did not have one in the modern, formal sense. What matters is that practical work gradually revealed the need to separate responsibilities and account for the complexity of interactions between different parts of a large system.

That is why I cannot say that my architectural thinking began with Angular. Angular later gave me new tools, new problems, and new opportunities. But questions of responsibility, development organization, and complexity management had emerged much earlier.

## 2. The Evolution of Angular and Architectural Thinking

### From Desktop Applications to Ionic

My practical journey with Angular began with its early versions, when it was a JavaScript framework. We used it, among other things, in Windows desktop applications involving geolocation and maps, including Google Maps.

Later, management asked us to migrate the existing applications to Android and iOS while preserving the ability to work without a permanent network connection. I proposed this approach and started looking for a suitable framework: building our own solution from scratch would have required too much effort. Eventually, I chose Ionic, which at the time was a suitable option with Angular support.

The roles of the technologies were clearly separated: Ionic provided the UI framework and ready-made interface components, while Angular remained the application's primary framework and handled the rest of the application logic. I liked the fact that Angular already provided many capabilities out of the box. We did not have to reinvent every mechanism for component interaction. In particular, I used a Message Bus to exchange messages between components.

The experience with maps and geolocation carried over into the mobile application as well. I will leave the detailed scenario involving addresses, coordinates, and navigation for a future article about UX, where it will better illustrate the connection between an interface and a real user task.

### A Long-Running Enterprise Project: From Angular 2 to Angular 19

In 2017, I joined a large enterprise project directly as a Frontend Architect. The project started with Angular 2. Over time, I moved to other projects and clients several times, then returned. During the last two or three years, I worked primarily on this project.

During that period, the project went through approximately seven major Angular generation upgrades: from Angular 2 through versions 5, 6, 7, 8, 9, and later releases. While I was away, the project continued to evolve, but sometimes fell two or three versions behind. For example, Angular 11 was already available while the project was still on Angular 7. When I returned, I analyzed the accumulated changes and performed the migration. The actual upgrade of a large project could sometimes be completed in one or two days, but only after the necessary analysis and verification.

Angular 19 was the last version I brought this particular project to. Moving it further to Angular 20 would have required a substantial refactoring of certain parts of the system. This does not mean Angular 20 was inherently unusable. The obstacle was the state of that specific codebase and the limitations that had accumulated in it.

### Parallel Projects: A Different Trajectory

At the same time, there were other long-running projects based on a shared codebase. I remained their architect continuously, participated in their development from beginning to end, and monitored compliance with architectural decisions. These projects also lasted several years, but they did not encounter similar Angular upgrade problems.

It is important that the same development team was involved. Therefore, the difference cannot be explained by team composition. A significant factor was continuous architectural guidance: the rules and boundaries were not left unattended for long periods.

### How the Migration Approach Changed

Before Angular 7–8, I performed migrations mostly manually. Around the Angular 8 period, I started using the official documentation and the Angular Update Guide—an interactive tool that allowed me to select the source and target versions and receive a sequence of steps, preparation recommendations, and required actions.

I used this approach until the second half of 2024. Then AI agents became useful enough to change the workflow. I described the task, the agent made the changes, and I reviewed the result. If the project stopped building or errors appeared, we analyzed the causes together and fixed them.

This was not a fully automated migration: the quality of the result still required verification and sometimes additional work. However, agents significantly reduced the time needed to study changes and perform transformations. Responsibility for analysis, verification, and final decisions remained with me.

I performed the Angular 18 → 19, 19 → 20, and 20 → 21 migrations with active assistance from AI agents. These upgrades belonged to the parallel projects that continued to evolve successfully under my ongoing architectural supervision, not to the long-running project that I brought to Angular 19.

These upgrades also involved Angular Material. In practice, moving to Material 3, including adapting the theme and styles, proved more challenging than upgrading Angular itself.

### Architectural Constraints: The Cost of Losing Control

The history of the long-running project showed me the difference between architectural rules that merely exist and rules whose compliance is actually ensured.

If I had remained the project's architect continuously and supervised its evolution, many problems could probably have been avoided. But during my absences, developers continued solving day-to-day tasks, made local decisions, and gradually moved away from previously established architectural rules. Dependencies were added, boundaries became blurred, and architectural and technical debt accumulated. Eventually, a regular Angular upgrade was no longer enough: moving to Angular 20 would have required substantial refactoring.

In the parallel projects, I continuously supervised architectural decisions and took violations during code reviews quite seriously. The same team was working there, too. The difference was not the people, but the continuity of architectural control.

Later, NX Module Boundaries played an important role. Architectural constraints were no longer just agreements or notes in documentation: they could be enforced technically and checked automatically. NX does not make architectural decisions instead of the architect, but it helps detect and prevent forbidden dependencies.

For me, this is one of the most important practical lessons: architectural rules must not exist only on paper or in the architect's head. If boundaries matter for the long-term evolution of a system, they should be enforced through technical means and checked automatically wherever possible. This is not about restricting developer freedom for the sake of formal order. It is about preventing local decisions from undermining the integrity of the entire system.

### The Evolution of Tools and the Evolution of Thinking

The history of Angular migrations is not simply a story about upgrade mechanisms. The approach evolved from manual work, through official recommendations, to the use of AI agents. But no tool removed the need to analyze changes, verify results, and make technical decisions.

Angular's tools became more sophisticated and automation capabilities expanded. Nevertheless, a project's ability to move forward depended to a large extent on how consistently its architectural constraints were respected.

My experience has shown me that defining architectural rules is not enough: their compliance must be ensured through technical means. The history of a project that moved from Angular 2 to Angular 19 became a clear illustration of this lesson.

## 3. From Component Development to System Design

But as an application grows, this is no longer enough.

Gradually, it becomes clear that an individual component does not exist in isolation. It interacts with other parts of the application, uses data, depends on services, and participates in shared workflows. A decision that seems convenient within one component can affect other parts of the system and make their future evolution more difficult.

This is where the fundamental difference between implementing functionality and designing a system becomes apparent.

### A Locally Correct Decision Is Not Always Correct for the Entire System

Developers usually solve a specific task in a particular context. They need to add functionality, fix a defect, or change interface behavior. Naturally, they try to find the simplest and fastest solution.

The problem arises when a local decision begins to determine how other parts of the application are structured.

For example, a component might retrieve data, perform transformations, manage state, and access storage on its own. In a small part of an application, this can look perfectly reasonable. Everything is nearby, the code is easy to write, and the result is quick to verify.

Over time, however, this approach makes responsibilities unclear. The component starts to know too much about the application's internals. Changing the data storage mechanism may require changes to the UI. Changing one workflow begins to affect others. Duplicated logic gradually diverges across different places.

Each individual decision may have been justified when it was made. But the combined effect can make the system significantly more complex.

That is why design should consider more than whether a particular piece of code solves the immediate task. We also need to understand how that decision will affect the other parts of the application.

### Responsibility Matters More Than File Location

Over time, architecture gradually stopped being a question of which folder a particular file should be placed in.

Correct file placement alone does not mean that an application has a clear structure. We can create numerous folders, services, and abstractions and still retain tight coupling between components and layers.

What matters much more is defining the responsibility of each part of the system and the rules governing how those parts interact.

A component should handle UI concerns and user interaction. State management, data retrieval, storage access, and other responsibilities should have clear boundaries. At the same time, there is no need to create a separate layer for every operation or introduce additional abstractions merely for the sake of architectural purity.

Architecture should help manage complexity, not create it.

That is why I see separation of responsibilities not as mechanical adherence to a particular pattern, but as a way to make a system understandable and predictable for everyone involved in its development.

### Architecture Is Also About Managing Dependencies

Another important step in understanding architecture is realizing that separating code into logical parts is not enough. We must also define how those parts are allowed to interact.

If every component can access every service, retrieve data independently, and use the internal mechanisms of other modules, the project's formal structure will not protect it from coupling.

Architectural boundaries must therefore define not only responsibilities, but also the permitted direction of dependencies.

This is particularly important in large teams. An architect can explain the rules, present diagrams, and agree on the project structure. But developers make many small decisions every day. If the rules remain mere recommendations, they may gradually stop being followed.

My experience with several long-running projects has shown that architectural agreements must not only be formulated but also enforced technically wherever possible. That is why automated dependency-boundary checks have become an important part of my architectural practice.

### An Architect Designs More Than an Individual Component

As experience grows, the questions we ask when discussing new functionality also change.

Instead of asking, "How do we implement this component?", we start asking different questions:

- What responsibility should it have?
- Where does it get the data it needs?
- Who manages the state?
- Which dependencies does it actually need?
- Which parts of the application will be affected when this functionality changes?
- Does this local decision create problems for the system as a whole?
- Will another developer be able to understand this structure and continue evolving it?

This does not mean that every small task should become a separate architectural investigation. On the contrary, a good architectural approach should help us make decisions without unnecessary complexity.

But the larger the system and the team become, the more important it is to understand the consequences of decisions that may initially seem insignificant.

### From Experience to Deliberate Architecture

Today, I see Angular primarily as a platform that provides tools for building applications. The framework itself does not determine whether the architecture will be successful.

New Angular capabilities can simplify the implementation of certain approaches, but they do not replace an understanding of responsibilities, dependencies, and system boundaries.

The same applies to any other tools. We can use modern state management mechanisms, new APIs, or additional automation tools, but without a clear architectural model they do not guarantee maintainability.

For me, the main result of many years of experience is precisely this change in perspective: moving from implementing individual features to designing the system in which those features must exist and interact.

And this is perhaps the most important change in my professional thinking. Architecture does not begin with choosing a technology or creating a folder structure. It begins with understanding how the system should be organized, who is responsible for what, and which rules will allow it to evolve without losing its integrity.

---

This concludes the historical and analytical part of the article. It shows how practical experience, the evolution of Angular, and work with large teams gradually shaped my approach to frontend system design.

Next, we will move from principles to their practical implementation: Facade Services, Signals, and the organization of interaction between components, state, and the data access layer.

---

## 4. Practical Implementation: Stage +1 — Facades and Signals Without Effect

The historical part of the article explained why responsibility, controlled dependencies, and the preservation of architectural boundaries matter to me. Now let's move from these principles to a practical implementation.

We will use a Personal Finance application as an example. It allows users to work with income and expenses, display a summary on the Dashboard, and persist user data. Our focus is not the application's complete feature set, but the organization of interaction between the UI, state, WebAPI, and local storage.

In the first stage, we will build the structure around Facade Services and Signals. We will deliberately avoid introducing \`effect()\`, because it is not required by the user workflow we have chosen. We will return to its use in the next stage, when the way users interact with forms changes.

### From User Workflow to Architectural Requirements

Let's start with application behavior, not folders and classes.

When the website opens, the application must check the authentication state. To do so, it communicates with the WebAPI through the appropriate Facade. If the user is not authenticated, they must be redirected to Login. The Dashboard is available only after successful authentication.

After signing in, the user sees the Dashboard with an up-to-date summary of income and expenses. In the first stage, creating and editing transactions takes place on separate pages. The user opens a page to add or edit income or an expense, saves the data, and returns to the Dashboard.

After returning, the Dashboard must display the current state. The component does not need to know how the data was retrieved, where it is stored, or how the request is performed. Its job is to display the state and pass the user's action to the appropriate Facade.

This workflow leads to several basic requirements:

- Components do not communicate with the WebAPI directly.
- Components do not work directly with Local Storage, Session Storage, or IndexedDB.
- State and operations are encapsulated in the appropriate Facade Services.
- Low-level data access is separated from the UI.
- State changes are performed through the Facade's public methods.
- Dashboard's derived values are calculated reactively.
- The architecture remains simple enough and does not introduce abstractions without a practical need.

### Dependency Injection (DI): Managing Dependencies

Dependency Injection is a design principle in which an object does not create its dependencies itself, but receives them from an external source. This means a class does not need to know how the objects it uses are created or who is responsible for their lifecycle.

Imagine a component that needs an authentication service and a data-loading service. Without DI, the component would have to create those objects itself, know their constructors, and perhaps manually create their entire dependency chains. This would lead to tight coupling: changing how a service is created would also affect its consumers.

DI moves this responsibility to a separate mechanism—the dependency container. In Angular, this role is performed by injectors. They hold information about registered dependencies, create instances when needed, and provide them to consumers.

Angular DI is based on three main concepts:

- **Injection Token** — an identifier Angular uses to locate a value. A class, abstract class, or specially created \`InjectionToken\` object can serve as a token.
- **Provider** — a description of which value should be supplied for a particular token and how to obtain it: by creating a class instance, using an existing value, or calling a factory.
- **Injector** — the mechanism that resolves a dependency request: it finds the corresponding provider, obtains or creates the value, and returns it to the consumer.

The consumer therefore requests a dependency by token, and the Angular Injector resolves that request using the registered provider. The consumer does not need to know which concrete object will be supplied or how it was created.

#### Dependency Tokens

Most often, the service class itself acts as the token in Angular. For example, when a component requests \`AuthFacade\`, Angular uses that class as a token and looks for a provider registered for it.

But a dependency is not always represented by a class. Sometimes we need to inject application configuration, a string value, a function, or an object that does not need a dedicated class. Angular provides \`InjectionToken\` for such cases.

Tokens allow the dependency contract to be separated from its concrete implementation. This is particularly useful when an implementation may change depending on application configuration or the environment.

For now, we will limit ourselves to this overview. Different token types, creating custom \`InjectionToken\` instances, factory providers, multi providers, and practical use cases deserve a separate discussion and will be covered in another article.

#### What It Looks Like in Angular

In modern Angular, a dependency can be obtained using the \`inject()\` function. It accesses the current injection context and requests a value using the corresponding token:

\`\`\`ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionWebApi {
  private readonly http = inject(HttpClient);
}
\`\`\`

Here, \`HttpClient\` acts as the dependency token, and Angular provides the instance registered for it. The class does not create \`HttpClient\` itself or manage its internals.

In this project, we use \`inject()\` to obtain dependencies instead of constructor injection. This gives us a consistent Angular coding style that we will follow in the examples as well.

DI is not limited to services: components, directives, pipes, and other classes supported by Angular DI can receive dependencies. Where a provider is registered and how long the resulting instance exists depend on the injector hierarchy and registration scope. This is directly related to service lifecycle, which we will discuss next.

### Angular Services and Their Lifecycle

Before discussing Facades, Signals, and application state, it is important to understand what Angular calls a service and how long its instances live. Without this, it is impossible to understand why state stored in a Signal inside a service sometimes survives navigation between pages and sometimes disappears.

#### A Service as a Functional Unit and a Service in Angular DI

In an architectural context, a service usually means a class assigned a specific functional responsibility. It may handle data, interact with a WebAPI, manage state, perform calculations, format values, validate input, or coordinate operations.

But it is important to distinguish between two concepts: a functional service as an ordinary TypeScript class and a service whose instance is managed by Angular Dependency Injection. They are not the same thing.

**An ordinary functional class does not need DI merely because it contains logic.** For example, a calculator, formatter, or data transformer can be an ordinary class. If it does not need to receive dependencies from Angular and its lifecycle does not need to be managed by Angular, its instance can be created directly:

\`\`\`ts
export class TransactionCalculator {
  calculateBalance(income: number, expenses: number): number {
    return income - expenses;
  }
}

const calculator = new TransactionCalculator();
const balance = calculator.calculateBalance(1000, 350);
\`\`\`

Here, \`TransactionCalculator\` performs an independent functional task. It is not registered in Angular DI, is not a provider, and does not need \`@Injectable()\`.

**An Angular service obtained through DI is a class whose instance Angular provides to consumers.** For example, when several components or other services need to use the same instance, when the class itself receives dependencies through \`inject()\`, or when the scope of its state should be determined by an application injector, the class is connected to Angular DI.

Two related but different mechanisms are used for this:

- \`@Injectable()\` tells Angular that the class is prepared to participate in DI and allows Angular to generate a factory for its creation. The decorator alone, without \`providedIn\` or registration in \`providers\`, does not determine where the instance will be available.
- **Provider** is a registration that associates a dependency token with a rule for obtaining its value. A provider can point to a class, an existing value, or a factory. It is not a service and does not have to provide a service: DI can also supply configuration, strings, functions, and other values.

In other words, a service is a functional role of a class, while a provider is an instruction to Angular DI about which value to provide for a particular token and how to obtain it. Not every functional service is a provider, and not every provider supplies a service.

If a class needs to receive dependencies through Angular DI, it must be prepared for DI and registered in an appropriate injector. In this project, dependencies inside Angular classes are obtained through \`inject()\`, not constructor injection. If a class does not need DI, we should not add \`@Injectable()\` and a registration merely to give it the formal status of a "service".

Next, we will focus on services managed by Angular DI, because understanding Facades, Signals, and state lifecycle requires knowing where their instances are created and how long they exist.

#### Root Services

The most common option is to register a service in the application's root injector:

\`\`\`ts
import { Injectable, computed, signal } from '@angular/core';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionState {
  private readonly _transactions = signal<readonly Transaction[]>([]);

  readonly transactions = this._transactions.asReadonly();

  readonly transactionCount = computed(
    () => this._transactions().length
  );

  replaceTransactions(transactions: readonly Transaction[]): void {
    this._transactions.set([...transactions]);
  }
}
\`\`\`

The value \`providedIn: 'root'\` registers the service in the root EnvironmentInjector. Within a single application instance, such a service usually exists as a single instance and can be injected into components, other services, and consumers that resolve the dependency through that root injector.

The instance is not necessarily created when the application starts. Angular usually creates it when the service is first requested. Once created, it remains available for as long as the corresponding root injector exists.

That is why root services are often suitable for state that must be shared across different application pages: for example, authentication state, user preferences, or loaded transactions.

There is, however, an important limitation: root defines the lifecycle scope within a running Angular application instance, not persistent data storage. When the page is fully reloaded, the browser creates a new JavaScript environment and a new Angular application. The old service instances and the Signals they contained are destroyed together with the previous application. New instances are created after startup, and their initial state is built again.

In other words, a root service preserves state across ordinary navigation within the application, but it does not survive a full page reload.

#### Services with a Local Scope

Not every service needs to be shared across the entire application. Angular allows providers to be registered at route, component, or directive level. In that case, the instance is available within the corresponding DI scope rather than throughout the application.

For example, a service can be registered in a component's \`providers\`:

\`\`\`ts
import { Component, Injectable, inject, signal } from '@angular/core';

@Injectable()
export class TransactionEditorState {
  private readonly _description = signal('');

  readonly description = this._description.asReadonly();

  setDescription(description: string): void {
    this._description.set(description);
  }
}

@Component({
  selector: 'app-transaction-editor',
  standalone: true,
  providers: [TransactionEditorState],
  template: '<p>{{ state.description() }}</p>'
})
export class TransactionEditorComponent {
  readonly state = inject(TransactionEditorState);
}
\`\`\`

Here, \`TransactionEditorState\` is registered not in the root injector, but in the scope of a specific component. Angular creates a separate instance for each \`TransactionEditorComponent\` instance. Child components can receive the same instance through the DI hierarchy unless they override the corresponding provider.

When the component instance is destroyed, the scope of its provider ends as well. The service and all state stored in its fields and Signals disappear together.

This approach is useful for state that belongs to a specific screen or UI instance: for example, a form draft, temporary editor parameters, or the state of a multi-step workflow.

Providers can also be declared at route level. This allows services for a functional route area to be provided without registering them throughout the application. The lifecycle is determined by the corresponding route EnvironmentInjector; we should not automatically assume that such a service is destroyed on every navigation away from and back to the route.

#### What Does It Mean for a Service to Be Registered as a Provider?

A provider is not a separate kind of service or a base class. It is an instruction for DI that associates a dependency token with a way to obtain the corresponding value: create a class instance, use an existing value, or call a factory.

\`providedIn: 'root'\` is a convenient way to register an injectable class in the root injector. The \`providers\` array in application, route, or component configuration allows explicit registration in the required scope.

If a class is not registered through either \`providedIn\` or the corresponding \`providers\`, Angular cannot inject it as a dependency in that scope. The TypeScript class can still be instantiated manually with \`new\`, but such an instance is no longer managed by Angular DI: the developer must organize its dependencies and lifecycle independently.

Therefore, when we talk about a root service or a service with a local scope, we are not describing different kinds of TypeScript classes. We are describing the provider registration location and the visibility scope of the created instance.

#### What Do Signals Have to Do with This, and Why Does State Disappear?

A Signal is not a service and is not registered as a provider. It is a reactive value container. Its lifecycle is determined by the object that created it and holds a reference to it.

In the previous examples, the Signal is declared as a service field. Therefore, the lifetime of this state is effectively tied to the lifetime of the service instance:

- A Signal inside a root service usually preserves its value during navigation between pages, as long as the application's root injector exists.
- A Signal inside a service registered at component level exists within the lifetime of the corresponding component instance and its DI scope.
- A Signal created directly in a component is tied to that component instance's lifecycle.
- During a full page reload, all instances and Signals from the previous application disappear, regardless of whether they were root or local.

Angular Signals have several main variants that are important to distinguish:

- \`signal()\` creates a Writable Signal—a value that its owner can read and change using \`set()\` and \`update()\`.
- \`asReadonly()\` provides a read-only interface to an existing Writable Signal. It prevents consumers from calling value-changing methods through the returned reference, but does not provide deep immutability for nested objects.
- \`computed()\` creates a read-only Signal whose value is derived from other Signals. It is suitable for derived data and is recalculated automatically when dependencies change.

The terms "root Signal" and "local Signal" are not separate Signal types in Angular. They are not classifications of the API itself. We may use them informally to describe a Signal's lifecycle scope based on where it was created—for example, in a root service or in a service registered at component level.

This is where the answer to why data can disappear lies. A Signal stores its value in JavaScript memory, not on disk or in a browser database. The value is available as long as its owner exists. When the owner or the entire application is destroyed, the corresponding state is destroyed as well.

If data must survive a page reload, it has to be stored separately—for example, on a backend or in browser storage. After the application starts, the data must be read and the Signals' state restored. Neither a root service nor a Signal is a persistent storage mechanism by itself.

Now that we have covered services, providers, DI scopes, and state lifecycle, we can move on to Facades. A Facade is not a special type of Angular service, but an architectural role of a particular service: it provides components with a clear functional boundary and hides the internal implementation.

### Responsibility Boundaries

For this application, it is sufficient to separate several main responsibilities.

**UI components** are responsible for rendering, user input, and local interaction. They receive data through the public interfaces of Facades and call their methods. Components must not communicate with the backend directly or work with browser storage mechanisms themselves. They should not even need to know where the information they use is stored. That information is not merely unnecessary for them—it is dangerous and should be completely off-limits. A component should have as little logic as possible and strive for minimalism, like any W3C HTML tag.

**WebAPI Facade** provides the UI with a clear interface for communicating with the backend. It coordinates data retrieval and updates, manages state related to these operations, and uses lower-level WebAPI access services when necessary.

**Storage Facade** encapsulates the application's interaction with local storage. The UI and other parts of the application use its methods and contracts rather than a specific storage mechanism.

**DAL (Data Access Layer)** contains the low-level implementation of data access. For example, IndexedDB initialization, object stores, transactions, and technical details of the browser API belong to the DAL. These details must not leak into components or become part of their responsibilities.

In simplified form, the interaction flow looks like this:

\`\`\`text
UI Component
    |
    v
Feature Facade
    |
    +----> WebAPI / Data Service ----> HTTP Client ----> Backend
    |
    +----> Storage Facade --------> DAL ------------> IndexedDB
\`\`\`

This is a responsibility diagram, not a requirement to create a separate service for every box. If a particular part has no independent responsibility, we should not artificially extract it into a separate abstraction.

For example, at this stage a single Storage Facade is sufficient. A separate IndexedDB Facade is unnecessary: the low-level implementation is already isolated in the DAL, and an additional intermediary does not solve a separate problem yet.

### A Facade as the Public Boundary of Functionality

A Facade Service is not simply a service into which several methods have been moved from a component. Its primary purpose is to provide a clear and stable interface for working with a particular functionality.

The Dashboard component does not need to know exactly how transactions are loaded, how a backend response is processed, or how summary values are calculated. It should receive ready-to-use state and invoke the required action.

A hypothetical Facade interface could look like this:

\`\`\`ts
import type { Signal } from '@angular/core';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
}

export interface CreateTransactionCommand {
  amount: number;
}

export interface UpdateTransactionCommand {
  id: string;
  amount: number;
}

export interface TransactionFacade {
  readonly transactions: Signal<readonly Transaction[]>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;
  readonly totalIncome: Signal<number>;
  readonly totalExpenses: Signal<number>;
  readonly balance: Signal<number>;

  load(): Promise<void>;
  createIncome(command: CreateTransactionCommand): Promise<void>;
  createExpense(command: CreateTransactionCommand): Promise<void>;
  updateTransaction(command: UpdateTransactionCommand): Promise<void>;
}
\`\`\`

This illustrates a public contract; it is not a complete implementation with specific error handling and HTTP requests. The principle is what matters: the component sees application-level operations, not the technical details of their execution.

A Facade may contain frontend-specific logic: preparing data for the UI, preliminary validation of user input, coordinating several requests, and managing loading state. But this does not mean that backend business rules should be moved to the frontend. Server-side business logic and data validation on the backend remain the backend's responsibility.

At the same time, we should not turn one Facade into a universal service for the entire application. Facade boundaries should correspond to clear functional areas. For a small Personal Finance example, there is no need to introduce a complex domain structure in advance, but responsibilities for authentication, transactions, and data storage must remain distinguishable.

### Encapsulating State with Signals

It is convenient to store the Facade's internal state in Writable Signals. Components receive read-only Signals and therefore cannot directly change the Facade's state through \`set()\` or \`update()\`.

A simplified example:

\`\`\`ts
import { computed, signal } from '@angular/core';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
}

export class TransactionFacade {
  private readonly _transactions = signal<readonly Transaction[]>([]);

  readonly transactions = this._transactions.asReadonly();

  readonly totalIncome = computed(() =>
    this._transactions()
      .filter(transaction => transaction.type === 'income')
      .reduce((total, transaction) => total + transaction.amount, 0)
  );

  readonly totalExpenses = computed(() =>
    this._transactions()
      .filter(transaction => transaction.type === 'expense')
      .reduce((total, transaction) => total + transaction.amount, 0)
  );

  readonly balance = computed(
    () => this.totalIncome() - this.totalExpenses()
  );

  replaceTransactions(transactions: readonly Transaction[]): void {
    this._transactions.set([...transactions]);
  }
}
\`\`\`

The example demonstrates several principles:

1. The Writable Signal remains a private part of the Facade.
2. A read-only representation of the state is exposed externally.
3. State changes go through a Facade method.
4. Income, expenses, and balance totals are not stored as separate copies of data; they are derived from the source state.

A read-only Signal prevents consumers from directly calling \`set()\` and \`update()\` through the returned reference. However, this is not deep immutability: Angular does not prevent changes to nested properties of an object obtained through such a Signal. Therefore, state should be updated in a controlled way, preferably by replacing arrays and objects with new values rather than modifying their contents outside the Facade.

### Computed for Derived State, Not Data Loading

\`computed()\` is suitable for values that are entirely determined by other Signals. In our example, total income, total expenses, and balance depend on the transaction list. There is no need to store them separately and synchronize them manually.

Computed Signals are evaluated lazily and cache their result until their dependencies change. Angular tracks the Signals read during the computation. Therefore, when the transaction list changes, derived values become stale and are recalculated the next time they are read.

It is important to understand the boundary of \`computed()\`: it calculates a value from existing state, but it does not load data from a server or restore it from storage.

After a full application reload, in-memory state disappears. Therefore, data must be loaded through the Facade and DAL during application or feature initialization. Once the data has been received, the Facade updates the source Signal, and derived values are recalculated automatically.

### Signals and RxJS Solve Different Problems

The arrival of Signals does not mean that RxJS is no longer needed. These tools solve related, but different, problems.

Signals are well suited to representing the current application state and its derived values. They are convenient to read in templates, use in Facades, and connect to other state through \`computed()\`.

RxJS remains an important tool for working with asynchronous streams: HTTP interactions, event sequences, request cancellation and combination, stream processing, and other scenarios where Observables and operators are useful.

Angular provides mechanisms for interaction between these models. For example, \`toSignal()\` allows an Observable to be represented as a Signal, while \`toObservable()\` exposes a Signal as an Observable. These are integration tools, not a reason to mechanically convert every Observable into a Signal or vice versa.

In our architecture, a Facade can use RxJS to coordinate an asynchronous operation and then update its internal Signals with the result. The component does not need to know which mechanism was used internally.

### Why We Do Not Need Effect at This Stage

In the current user workflow, income and expense forms remain separate pages.

The user opens a form, saves a transaction, and returns to the Dashboard. After returning, the Dashboard receives the current state through the Facade. The Facade itself manages data loading and changes, while Signals update dependent views.

There is no need here to copy the value of one Signal into another or start an additional synchronization chain. \`computed()\` is sufficient for calculated totals, while explicit Facade methods handle loading and saving.

That is why \`effect()\` is deliberately not used in this part. The current Angular documentation describes Effect primarily as a mechanism for synchronizing reactive state with imperative APIs and external systems. For derived values, \`computed()\` is recommended instead of copying state through an Effect.

In the next stage, we will change the interaction workflow: forms will become Modal Dialogs, and a concrete task will emerge for which we can evaluate whether Effect is necessary. This will demonstrate its use in response to a real architectural need rather than merely to showcase an API.

### State Restoration and Application Lifecycle

It is important to distinguish between two scenarios.

**Ordinary navigation within a running application.** If a Facade Service exists in the appropriate application scope and preserves its state between transitions, the Dashboard can reuse already loaded data. After a transaction changes, the Facade updates the state, and components reading the corresponding Signals receive the current values.

**A full page reload.** The application's memory is recreated. Therefore, data must be restored from an available source: requested from the backend and, if the workflow requires it, read from local storage through the Storage Facade and DAL. We cannot assume that a Signal itself provides persistent storage.

The choice of when to load data and which source is authoritative must be an explicit architectural decision. We should not mix current UI state, an in-memory cache, and persistent storage into one indistinguishable entity.

### Local Component State Is a Valid Exception

Not every piece of state belongs in a Facade Service.

For example, values that belong only to the current form instance—such as the expanded state of a section, a local wizard step, a temporary field value, or whether an additional hint is displayed—can remain inside the component.

A local Signal is perfectly appropriate for such state. Moving it into a shared Facade makes sense only if it genuinely needs to be available outside the component or is part of shared feature state.

Otherwise, the Facade will gradually turn into a store for every UI variable in the application, and its responsibility will become blurred. The goal of encapsulation is not to centralize absolutely everything, but to find the right place for each kind of state.

### Result of Stage +1

After this stage, we have a clear separation of responsibilities:

- UI components display data and pass on user actions.
- Facade Services provide public operations and encapsulate state.
- Signals represent current state and derived values.
- RxJS is used where asynchronous stream processing is required.
- Storage Facade separates the application from the specific local storage mechanism.
- DAL contains the low-level implementation of data access.
- The backend remains the owner of server-side business logic.

We did not introduce separate domains, a universal store, or additional abstraction layers without a need. The architecture grew out of a concrete user workflow and its requirements.

This is the central principle of this stage: do not use Signals or Facades simply because they are available in Angular. Use them where they help make state, responsibilities, and interactions between system parts understandable.

### Official Documentation

- [Angular Signals](https://angular.dev/guide/signals) — Writable Signals, read-only Signals, computed values, and reactive dependencies.
- [RxJS interop with Angular signals](https://angular.dev/guide/signals/rxjs-interop) — interaction between Observables and Signals through \`toSignal()\` and \`toObservable()\`.
- [Angular Effects](https://angular.dev/guide/signals/effect) — the purpose of Effect and recommendations for its use.

### Running the Application and Checks from the IDE npm Panel

All major project commands are available through npm scripts in the root \`package.json\`. This means they can be run not only from a terminal, but also directly from the npm panel in WebStorm or IntelliJ IDEA.

Open the **npm** tool window in the IDE, select the root \`package.json\`, and double-click the required script. The IDE will execute the same command that could be run from the terminal.

The main commands are:

| npm script | Purpose |
|---|---|
| \`serve\` | Start the development application |
| \`build\` | Build the application |
| \`test\` | Run unit tests |
| \`lint\` | Run ESLint checks |
| \`e2e\` | Run all E2E tests in all configured browsers |
| \`e2e:chromium\` | Run E2E tests in Chromium only |
| \`e2e:headed\` | Run browsers in headed mode |
| \`e2e:ui\` | Open the interactive Playwright interface |
| \`e2e:install\` | Install the browsers required by Playwright |

Before running E2E tests for the first time, execute \`e2e:install\`. On Linux, additional Playwright system dependencies may be required; they are installed automatically in CI.

The E2E suite is divided into two scenario files: \`dashboard.spec.ts\` checks Dashboard rendering, the initial set of transactions, transaction creation, form validation, and restoration of saved data after a full page reload; \`auth.spec.ts\` checks required fields, invalid values, form reset, navigation to Dashboard after a locally successful check, persistence of only the user name, and restoration of that name in the Login form.

The Playwright configuration starts the Angular application for the duration of the tests and stops it after they finish. There is no need to run \`serve\` separately before E2E tests.

In the current demo application, the Login form validates the entered values on the client side and navigates the user to the Dashboard after a successful local check. There is no connected backend authentication service or credential verification yet. Therefore, E2E tests verify the form, validation, and navigation, but do not confirm real user authentication.

### Saving the User Name on Login

The next small step is to improve the sign-in workflow. After the form passes local validation, the application saves the user name so that it does not have to be entered again the next time the Login page is opened.

The existing Storage Facade is responsible for persistence. The Auth Facade does not access browser storage directly: it receives the Storage Facade through Angular Dependency Injection and delegates saving and reading the user name to it. The Storage Facade, in turn, uses the DAL, which encapsulates the technical interaction with browser storage.

The storage key is declared centrally in \`CONSTANTS\` as \`CONSTANTS.AUTH_LOGIN.storageKey\`. Therefore, the key name is not duplicated in the Auth Facade, Storage Facade, or components.

When the user clicks OK after the Login fields have passed validation, the page passes the entered user name to the Auth Facade. The Facade saves only the login through the Storage Facade. The password is not stored in \`localStorage\` or in any other persistent application storage. The state of the demo authenticated session continues to be stored separately in \`sessionStorage\`.

When the Login Component is created, the initial value of the Login name field is obtained through the Auth Facade. If no value has been saved previously, the Facade returns an empty string. The Password field remains empty every time the form is opened.

Responsibilities therefore remain separated:

- Login Component handles form rendering, input, and local validation.
- Auth Facade coordinates the authentication workflow and provides the saved user name.
- Storage Facade provides the application with clear operations for reading and saving the login.
- DAL performs the actual work with \`localStorage\`.
- \`CONSTANTS\` contains the single storage key.

This is a convenience feature for the demo, not a secure credential storage mechanism. A saved user name does not verify the user's identity and does not replace backend authentication.

E2E checks now additionally confirm that after clicking OK successfully, only the user name appears in \`localStorage\`, the password is not stored there, and after Logout the Login name field is populated with the saved value. The Password field remains empty.

### Development Branch

The current edition of the article is maintained in the [Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking+1](https://github.com/iAVP/enterprise-frontend-workshop/tree/Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking+1) branch of the [enterprise-frontend-workshop](https://github.com/iAVP/enterprise-frontend-workshop) repository.
