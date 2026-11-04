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

## 4. Practical Implementation: Facades and Signals Without Effect

The historical part of the article showed why responsibility, controlled dependencies, and the preservation of architectural boundaries matter to me. Now let's move from these principles to a practical implementation.

We will use a Personal Finance application as an example. It allows users to work with income and expenses, display a summary on the Dashboard, and persist user data. Our focus is not the application's complete feature set, but the organization of interaction between the UI, state, API, and local storage.

We will first build the structure around Facade Services and Signals. We will deliberately avoid introducing `effect()`: it is not required by the user workflow we have chosen. We will return to the question of its use later, when the way users interact with forms changes.

### From User Workflow to Architectural Requirements

Let's start with application behavior, not folders and classes.

When the website opens, the application must check the authentication state. To do so, it communicates with the API through the appropriate Facade. If the user is not authenticated, they must be taken to Login. The Dashboard is available only after successful authentication.

After signing in, the user sees the Dashboard with an up-to-date summary of income and expenses. Initially, creating and editing transactions takes place on separate pages. The user opens a page to add or edit income or an expense, saves the data, and returns to the Dashboard.

After returning, the Dashboard must display the current state. The component does not need to know how the data was obtained, where it is stored, or exactly how the request is performed. Its job is to display the state and pass the user's action to the appropriate Facade.

This workflow leads to several basic requirements:

- Components do not communicate with the API directly.
- Components do not work directly with Local Storage, Session Storage, or IndexedDB.
- State and operations are encapsulated in the appropriate Facade Services.
- Low-level data access is separated from the UI.
- State changes are performed through the Facade's public methods.
- The Dashboard's derived values are calculated reactively.
- The architecture remains simple enough and does not introduce abstractions without a practical need.

### Responsibility Boundaries

For this application, it is sufficient to separate several main responsibilities.

**UI components** are responsible for rendering, user input, and local interaction. They receive data through the public interfaces of Facades and call their methods. A component should not independently decide which HTTP endpoint to call, how to transform an API response, or how to write data to IndexedDB.

**API Facade** provides the UI with a clear interface for backend operations. It coordinates data retrieval and updates, manages state related to these operations, and uses lower-level API access services when necessary.

**Storage Facade** encapsulates the application's interaction with local storage. The UI and other parts of the application use its methods and contracts rather than a specific storage mechanism.

**DAL (Data Access Layer)** contains the low-level implementation of data access. IndexedDB initialization, work with object stores and transactions, and technical details of the browser API belong to the DAL. These details must not leak into components or become part of their responsibilities.

In simplified form, the interaction flow looks like this:

```text
UI Component
    |
    v
Feature Facade
    |
    +----> API / Data Service ----> HTTP Client ----> Backend
    |
    +----> Storage Facade --------> DAL ------------> IndexedDB
```

This is a responsibility diagram, not a requirement to create a separate service for every box. If a particular part has no independent responsibility, we should not artificially extract it into a separate abstraction.

For example, a single Storage Facade is sufficient here. A separate IndexedDB Facade is unnecessary: the low-level implementation is already isolated in the DAL, and an additional intermediary does not solve a separate problem.

### A Facade as the Public Boundary of Functionality

A Facade Service is not simply a service into which several methods have been moved from a component. Its primary purpose is to provide a clear and stable interface for working with a particular functionality.

The Dashboard component does not need to know exactly how transactions are loaded, how a backend response is processed, or how summary values are calculated. It should receive ready-to-use state and invoke the required action.

A hypothetical Facade interface could look like this:

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionsFacade {
  readonly transactions = /* read-only signal */;
  readonly loading = /* read-only signal */;
  readonly error = /* read-only signal */;

  readonly totalIncome = /* computed signal */;
  readonly totalExpenses = /* computed signal */;
  readonly balance = /* computed signal */;

  load(): void {
    // Coordinate data loading
  }

  createIncome(command: CreateIncomeCommand): void {
    // Create income
  }

  createExpense(command: CreateExpenseCommand): void {
    // Create an expense
  }

  updateTransaction(command: UpdateTransactionCommand): void {
    // Update an existing transaction
  }
}
```

This illustrates a public contract; it is not a complete implementation with specific error handling and HTTP requests. The principle is what matters: the component sees application-level operations, not the technical details of their execution.

It is also important to pay attention to `providedIn: 'root'`. This declaration registers the Facade with Angular's root Injector. As a result, components and services that request `TransactionsFacade` through Dependency Injection receive the same instance by default, created by the root Injector.

This is essential for our scenario: the Dashboard and the modal form must work with the same transaction state. When the form passes a new transaction to the Facade, it updates its Signal, and the Dashboard receives the current value through that same service instance. The components do not need to synchronize separate copies of state or communicate with each other directly.

If, instead, the Facade were registered in the `providers` of each component, Angular would create a separate instance in each corresponding child Injector. The Dashboard and the form could then receive different instances and, consequently, different state. That is why we keep a Facade responsible for shared feature state in the root Injector and do not override it in local `providers` on components or routes.

A Facade may contain frontend-specific logic: preparing data for the UI, preliminary validation of user input, coordinating several requests, and managing loading state. But this does not mean that backend business rules should be moved to the frontend. Server-side business logic and data validation on the backend remain the backend's responsibility.

At the same time, we should not turn one Facade into a universal service for the entire application. Facade boundaries should correspond to clear functional areas. For a small Personal Finance example, there is no need to introduce a complex domain structure in advance, but responsibilities for authentication, transactions, and data storage must remain distinguishable.

### Encapsulating State with Signals

It is convenient to store the Facade's internal state in Writable Signals. Components receive read-only Signals and therefore cannot directly change the Facade's state through `set()` or `update()`.

A simplified example:

```ts
import { computed, signal } from '@angular/core';

export class TransactionsFacade {
  private readonly _transactions = signal<Transaction[]>([]);

  readonly transactions = this._transactions.asReadonly();

  readonly totalIncome = computed(() =>
    this._transactions()
      .filter(item => item.type === 'income')
      .reduce((total, item) => total + item.amount, 0)
  );

  readonly totalExpenses = computed(() =>
    this._transactions()
      .filter(item => item.type === 'expense')
      .reduce((total, item) => total + item.amount, 0)
  );

  readonly balance = computed(
    () => this.totalIncome() - this.totalExpenses()
  );

  replaceTransactions(items: Transaction[]): void {
    this._transactions.set(items);
  }
}
```

The example demonstrates several principles:

1. The Writable Signal remains a private part of the Facade.
2. A read-only representation of the state is exposed externally.
3. State changes go through a Facade method.
4. Income, expense, and balance totals are not stored as separate copies of data; they are derived from the source state.

A read-only Signal prevents consumers from directly calling `set()` and `update()` through the returned reference. However, this is not deep immutability: Angular does not prevent changes to nested properties of an object obtained through such a Signal. Therefore, state should be updated in a controlled way, preferably by replacing arrays and objects with new values rather than modifying their contents outside the Facade.

### Computed for Derived State, Not Data Loading

`computed()` is suitable for values that are entirely determined by other Signals. In our example, total income, total expenses, and the balance depend on the transaction list. There is no need to store them separately and synchronize them manually.

Computed Signals are evaluated lazily and cache their result until their dependencies change. Angular tracks the Signals read during the computation. Therefore, when the transaction list changes, derived values become stale and are recalculated the next time they are read.

It is important to understand the boundary of `computed()`: it calculates a value from existing state, but it does not load data from a server or restore it from storage.

After a full application reload, in-memory state disappears. Therefore, data must be loaded through the Facade and DAL during application or feature initialization. Once the data has been received, the Facade updates the source Signal, and derived values are recalculated automatically.

### Signals and RxJS Solve Different Problems

The arrival of Signals does not mean that RxJS is no longer needed. These tools solve related, but different, problems.

Signals are well suited to representing the current application state and its derived values. They are convenient to read in templates, use in Facades, and connect to other state through `computed()`.

RxJS remains an important tool for working with asynchronous streams: HTTP interactions, event sequences, request cancellation and combination, stream processing, and other scenarios where Observables and operators are useful.

Angular provides mechanisms for interaction between these models. For example, `toSignal()` allows an Observable to be represented as a Signal, while `toObservable()` exposes a Signal as an Observable. These are integration tools, not a reason to mechanically convert every Observable into a Signal or vice versa.

Within our architecture, a Facade can use RxJS to coordinate an asynchronous operation and then update its internal Signals with the result. The component does not need to know which mechanism was used internally.

### Why Effect Is Not Needed in This Scenario

In the current user workflow, income and expense forms remain separate pages.

The user opens a form, saves a transaction, and returns to the Dashboard. After returning, the Dashboard receives the current state through the Facade. The Facade itself manages data loading and changes, while Signals update dependent views.

There is no need here to copy the value of one Signal into another or start an additional synchronization chain. `computed()` is sufficient for calculated totals, while explicit Facade methods handle loading and saving.

That is why `effect()` is deliberately not used in this part. The current Angular documentation describes Effect primarily as a mechanism for synchronizing reactive state with imperative APIs and external systems. For derived values, `computed()` is recommended instead of copying state through an Effect.

Later, we will change the interaction workflow: forms will become Modal Dialogs, and a concrete task will emerge for which we can separately evaluate whether Effect is necessary. This will demonstrate its use in response to a real architectural need rather than merely to showcase an API.

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

### Summary

This gives us a clear separation of responsibilities:

- UI components display data and pass on user actions.
- Facade Services provide public operations and encapsulate state.
- Signals represent current state and derived values.
- RxJS is used where asynchronous stream processing is required.
- Storage Facade separates the application from the specific local storage mechanism.
- DAL contains the low-level implementation of data access.
- The backend remains the owner of server-side business logic.

We did not introduce separate domains, a universal store, or additional abstraction layers without a need. The architecture grew out of a concrete user workflow and its requirements.

This is the central principle of this approach: do not use Signals or Facades simply because they are available in Angular. Use them where they help make state, responsibilities, and interactions between system parts understandable.

### Official Documentation

- [Angular Signals](https://angular.dev/guide/signals) — Writable Signals, read-only Signals, computed values, and reactive dependencies.
- [RxJS interop with Angular signals](https://angular.dev/guide/signals/rxjs-interop) — interaction between Observables and Signals through `toSignal()` and `toObservable()`.
- [Angular Effects](https://angular.dev/guide/signals/effect) — the purpose of Effect and recommendations for its use.
- [Defining dependency providers](https://angular.dev/guide/di/defining-dependency-providers) — registering services through `providedIn` and Dependency Injection scopes.

[Part +1 branch — Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking+1](https://github.com/iAVP/enterprise-frontend-workshop/tree/Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking+1)

## 5. Facades, Signals, and IndexedDB: Dashboard and Modal Form Interaction

In the previous section, we looked at Facade Services and Signals using separate income and expense pages as an example. Now we will change the user workflow: forms will open in modal dialogs directly from the Dashboard.

This change is about more than how the form is displayed. We need to preserve the separation of responsibilities: the Dashboard controls opening the dialog, the form handles data entry and validation, and the transaction Facade remains the single place responsible for managing the shared collection of transactions.

### From Separate Pages to Modal Dialogs

In the previous version, the user navigated from the Dashboard to a separate page to add income or an expense. Now the user stays on the Dashboard and opens the required form in a Modal Dialog.

The Dashboard is responsible for opening the dialog and receiving its result when it closes. The form itself is responsible for data entry and validation. It should not need to know how the Dashboard updates the transaction list or where the data is stored.

After the form is confirmed, the result is passed to the calling component through the modal dialog API. The Dashboard receives an object containing the transaction data and passes it to the Facade. If the dialog is cancelled, there is no result, so no new transaction is created.

The interaction looks like this:

1. The user clicks Add income or Add expense on the Dashboard.
2. The Dashboard opens the corresponding Modal Dialog and passes it the transaction type.
3. The form collects the description, amount, and date, and validates the entered values.
4. When confirmed, the form returns the transaction data through the Modal Dialog.
5. The Dashboard receives the result and calls the Facade method to add the transaction.
6. The Facade updates the shared state and saves the collection, while the Dashboard automatically displays the new values.

The form does not communicate with the Dashboard directly, and the Dashboard does not manage the form's internal state. Their only connection is the dialog interaction contract.

### The Facade Remains the Single Point of Transaction Management

The transaction Facade provides components with a read-only Signal containing the transaction collection, as well as computed values for the balance, income, and expenses. Changes to the collection are made through the Facade's public methods.

The Facade contains a Writable Signal:

~~~ts
private state = signal<Transaction[]>([]);

readonly transactions = this.state.asReadonly();

readonly balance = computed(() =>
  this.state().reduce(
    (sum, transaction) => sum + transaction.amount * transaction.type,
    0
  )
);
~~~

Components receive only the read-only representation. This preserves control over the state and avoids creating separate copies of the array in the Dashboard and the modal window.

When the Dashboard passes the confirmed data to the Facade, the Facade waits for the initial load to complete, creates an identifier for the new transaction, prepends it to the current collection, and updates the Signal. Components that use this state automatically receive the current values.

It is important to distinguish between two mechanisms:

- `computed()` calculates derived values from existing reactive state;
- explicit Facade methods perform operations that change state or access storage.

The balance, total income, and total expenses remain responsibilities of `computed()`. They should not be copied into separate Signals through an Effect.

### Saving Transactions Without Effect

In the actual Personal Finance implementation, transactions are not saved through `effect()`. The Facade uses an explicit method to add a transaction: after updating the Signal, it passes the new collection to the Storage Facade for persistence.

The sequence can be simplified as follows:

~~~ts
async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
  await this.initialization;

  const newTransaction: Transaction = {
    ...transaction,
    id: crypto.randomUUID()
  };

  const updatedTransactions = [newTransaction, ...this.state()];
  this.state.set(updatedTransactions);
  await this.storageFacade.saveTransactions(updatedTransactions);

  return newTransaction;
}
~~~

There is no background Effect observing changes to the Signal. Updating the state and saving the data are part of one explicitly invoked Facade operation. This makes the sequence clear and avoids introducing an additional synchronization mechanism where it is not needed.

`computed()` is still used only for derived values. In the current implementation, `effect()` is needed neither to calculate the balance nor to persist transactions.

### Why IndexedDB Is Used for Transactions

The application uses IndexedDB to store the collection of income and expenses.

LocalStorage provides a synchronous interface for storing string values. Storing objects usually requires explicit JSON serialization, while reading and parsing are also performed synchronously.

IndexedDB provides asynchronous browser storage for structured data. In the application, the transaction collection is stored as a single value under the key `personal-finance.transactions`. The DAL encapsulates database operations, so the Facade does not depend on the details of the IndexedDB API.

`IndexedDbService` is responsible for opening the `personal-finance` database, creating the `key-value` object store, and reading, writing, and deleting values. The Storage Facade provides a function-oriented interface: the transaction Facade uses it rather than working with IndexedDB directly.

### Migrating Previously Stored Data

The move to IndexedDB takes into account data that may have been stored in LocalStorage by an earlier version of the application.

When a particular key is read for the first time, the service checks IndexedDB first. If the value is not there, it checks LocalStorage for the old value. If one is found, the service parses the JSON and attempts to write the data to IndexedDB. The old value is removed from LocalStorage only after the write to IndexedDB succeeds.

As a result, the existing transaction collection is migrated automatically on first read, without requiring the user to enter it again manually. Migration is performed separately for each key and does not require all data to be transferred in advance when the application starts.

LocalStorage is not removed from the application entirely: it continues to be used to store the user name. Only the storage mechanism for the transaction collection changes. This avoids affecting unrelated data or changing authentication behavior.

The Storage Facade preserves this separation at the application interface level. It uses IndexedDbService for transactions, while continuing to retrieve and save the user name through the existing StorageService. Therefore, migrating the transaction collection does not affect authentication data and does not require moving every LocalStorage value to IndexedDB.

### Restoring State After a Page Reload

After a full Angular application reload, Signals are created again, so the Facade must restore the collection from persistent storage.

During initialization, the Facade asynchronously requests transactions through the Storage Facade. If a saved collection exists, it becomes the new value of the source Signal. If no data exists yet, the Storage Facade returns the demo collection.

When a new transaction is added, the Facade first waits for the initial load to complete. This is important: the new transaction must be added to the already restored collection, not to an empty initial state. The Facade then updates the Signal and saves the updated array through the Storage Facade.

As a result, the user workflow does not depend on whether the page has just been opened or the application has already been running for some time. The persistent data source remains the same, while the UI receives its state through the Facade and Signals.

### Verifying the Implementation

We need to verify more than the visual appearance of a new row on the Dashboard. Displaying data in the current session does not prove that it has actually been persisted.

Verification should cover several separate conditions:

- A new transaction appears on the Dashboard after the dialog is confirmed.
- The data is actually written to IndexedDB under the expected key.
- After a full page reload, the transaction is restored from IndexedDB.
- Cancelling the dialog does not create a new transaction.
- The old collection in LocalStorage is migrated to IndexedDB on first read.
- After a successful migration, the old value is removed from LocalStorage.

These checks cover three independent aspects: the user workflow, reactive state updates, and persistent data storage. Only successful verification of all three confirms that the implementation works as a whole.

The E2E checks separate these scenarios. The modal dialog test verifies that income can be created through the form, that a record exists in IndexedDB, and that the data is restored after a page reload. Cancellation of the dialog with the Escape key is checked separately: closing the form must not add a transaction. The migration test creates an old record in LocalStorage, opens the application, checks that the restored transaction is displayed, verifies the value in IndexedDB, and confirms that the old key is removed after a successful migration.

### Summary

The application now has the following flow of responsibilities:

- Modal Dialog handles form input and validation.
- Dashboard opens the dialog and passes the confirmed result to the Facade.
- The transaction Facade manages the shared state of operations.
- Signals provide reactive updates to the Dashboard.
- `computed()` calculates derived values.
- An explicit Facade method updates the Signal and passes the collection to the Storage Facade for persistence.
- DAL encapsulates the technical work with IndexedDB.
- Storage Facade provides a functional interface for data access.

The components are not directly coupled, and Effect is not used as a replacement for explicit Facade operations. Each mechanism has its own purpose: the Facade manages functionality, Signals represent state, `computed()` calculates derived data, and IndexedDB provides persistent storage for the transaction collection.

### Official Documentation

- [Angular Signals](https://angular.dev/guide/signals) — reactive state, read-only Signals, and computed values.
- [Angular Effects](https://angular.dev/guide/signals/effect) — the purpose of Effect and recommendations for its use.
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) — asynchronous storage of structured data in the browser.
- [IDBDatabase](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase) — opening transactions and working with object stores.

[Part +2 branch — Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking+2](https://github.com/iAVP/enterprise-frontend-workshop/tree/Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking+2)

---

[Enterprise Frontend Workshop repository](https://github.com/iAVP/enterprise-frontend-workshop)
