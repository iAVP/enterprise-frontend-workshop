# TypeScript and Architectural Thinking: From C# Principles to Enterprise Frontend Development

## Architecture Before Language

Moving from C# to TypeScript does not mean starting your engineering journey from scratch. The syntax, tools, and platform characteristics may change, but the habit of defining contracts, evaluating responsibilities, and considering the consequences of technical decisions remains valuable.

At the same time, ready-made solutions should not be transferred mechanically from one technological environment to another. It is important to understand the capabilities of the language itself and how its constructs help express a particular solution.

This became especially clear when I had to learn Kotlin for the Android part of a personal mobile application. An AI agent helped me understand the syntax and APIs, but its suggestions still required engineering judgment. This experience illustrates why knowledge of a language and an understanding of the problem being solved must complement each other.

## JavaScript, TypeScript, and the Cost of Dynamic Typing

JavaScript is a full-fledged programming language. It has objects, classes, prototype inheritance, modules, getters and setters, as well as mechanisms for encapsulation. Modern JavaScript also supports private class fields through the `#field` syntax. Therefore, it would be incorrect to claim that JavaScript has no object-oriented programming capabilities or no means of controlling access to state.

The problem often encountered in large JavaScript applications lies elsewhere: the language itself does not require developers to formally describe object structures and contracts between application components.

Consider a typical function:

```js
function calculateTotal(transaction) {
  return transaction.amount * transaction.type;
}
```

The function assumes that it will receive an object with the `amount` and `type` fields. However, this expectation is not expressed anywhere. If the calling code passes an object with a differently named property, a string instead of a number, or an object with an entirely different structure, the problem will only be discovered at runtime — and not necessarily where the error originated.

In a small script, this may not matter much. In a large system where data passes through components, services, facades, forms, storage layers, and APIs, implicit conventions gradually turn into technical debt.

### Problems Caused by the Absence of Formal Contracts

**1. Implicit data structures.**  
The shape of an object exists only in team agreements or in the function author's mind. One module expects `userId`, another passes `id`, and a third uses `userID`. As long as everyone remembers the agreement, the code works. As the system evolves, however, these inconsistencies become a source of errors.

**2. Errors are detected at runtime.**  
JavaScript does not verify in advance that a function has received an object with the expected structure. An error may only appear in a particular user scenario, sometimes long after the code change that introduced it.

**3. Refactoring becomes riskier.**  
Renaming a property or changing a function signature can affect many places. Modern IDEs can analyze JavaScript, and JSDoc and TypeScript's JavaScript checking can improve the situation. However, without consistent type descriptions, tools have a harder time reliably identifying all relationships and checking the compatibility of changes.

**4. Object structures may become inconsistent.**  
In dynamic code, objects are often created and extended in different places. Developers have to determine which fields exist at each stage and which of them are mandatory. The more implicit variations there are, the harder the code becomes to understand and maintain.

**5. Contracts and responsibilities remain hidden.**  
If a public method accepts an arbitrary object and returns an arbitrary result, its purpose and constraints have to be reconstructed from the implementation or documentation. The code itself does not always make clear what the module actually promises to its consumers.

Getters and setters do not solve this problem. They allow us to control the reading and modification of specific object properties and execute additional logic when those properties are accessed. But on their own, they do not define the types of public method arguments, the structure of the model being passed, or the compatibility of contracts between independent modules.

### What TypeScript Changes

TypeScript adds a static type system to JavaScript. It allows us to describe expected data structures, function signatures, permitted values, and contracts between modules, and then check them before the application runs.

```ts
interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
}

function calculateTotal(transaction: Transaction): number {
  return transaction.amount * transaction.type;
}
```

The function's contract is now expressed directly in the code. Developers and the IDE can see which fields are required and which value types are expected. Incompatible usage can be detected during type checking, before the application is started.

This significantly changes everyday development:

- The IDE can provide more accurate suggestions for properties and methods of available objects.
- Go to Definition and Find Usages become more reliable.
- Renaming properties and methods is accompanied by checks of the affected code.
- Public module API signatures become easier to understand.
- Contract changes reveal the places that need to be adapted more quickly.

TypeScript does not eliminate technical debt automatically. It provides tools that help us avoid creating a significant part of it and detect inconsistencies between system components earlier.

There is also an important limitation: TypeScript types primarily exist at compile time and are erased when JavaScript is generated. They do not automatically validate data received from HTTP APIs, localStorage, IndexedDB, or user input. Runtime validation is required at such boundaries.

In our Workshop, this can be seen in the `StorageFacadeService` example: data read from IndexedDB is initially treated as `unknown`, then checked by the `isTransactionCollection` and `isTransaction` type guard functions. Only after validation is it used as a `Transaction[]` collection. This is a good example of how static typing and runtime checks complement each other.

## TypeScript and JavaScript: Two Sides of Modern Development

Today, TypeScript is becoming the preferred tool for developing modern frontend applications, especially in enterprise projects.

The reason is not merely the availability of static typing. The main advantage of TypeScript is the ability to describe an application's structure, define explicit contracts between modules, and verify the correctness of many decisions during development. This makes refactoring more predictable and the maintenance of large projects significantly easier.

TypeScript allows us to think about an application's architecture before its code is executed.

However, moving to TypeScript does not mean that developers no longer need to know JavaScript.

TypeScript is built on top of JavaScript. Its type system primarily operates during development and code checking. During compilation, type information is usually removed, and the result is ordinary JavaScript. JavaScript determines the application's behavior at runtime.

That is why understanding closures, prototype inheritance, the `this` context, the Event Loop, Promise, asynchronous execution, and the module system remains essential. TypeScript helps us describe and constrain the structure of our code, but it does not change the fundamental mechanisms of JavaScript.

This becomes especially important when we consider different frameworks and runtime environments.

Modern frontend technologies such as Angular, Vue.js, and Next.js fully support TypeScript. Therefore, within our Workshop, we can use it as the primary development language regardless of which framework or architectural approach we explore.

However, not every part of a software system has to be written in TypeScript.

When working with cloud infrastructure, configuration, automation, small scripts, and integrations, we may well encounter plain JavaScript. In some tools and cloud services, it remains the standard or the simplest way to implement the required functionality.

Therefore, knowledge of JavaScript is necessary not only to understand what TypeScript compiles into, but also to work effectively with the entire modern development ecosystem.

The way TypeScript is executed is also changing.

Traditionally, TypeScript development required a step that transformed `.ts` files into JavaScript before the application could run. Today, some server-side runtimes, such as Node.js, Deno, and Bun, allow TypeScript to be executed directly without first generating JavaScript files.

However, it is important to understand the difference: automatically stripping or transforming TypeScript syntax does not mean that full type checking has taken place. These are separate processes.

The situation in browsers remains different: browsers execute JavaScript. Frontend applications therefore still go through a TypeScript-to-JavaScript transformation as part of the build or development process.

WebAssembly deserves separate attention.

WebAssembly is not a programming language; it is a binary instruction format and execution environment. The standard TypeScript compiler does not translate ordinary TypeScript code directly into WebAssembly.

There is a separate language called AssemblyScript. It uses syntax similar to TypeScript and allows a restricted subset of the language to be compiled into WebAssembly. However, AssemblyScript is not ordinary TypeScript, and existing TypeScript code cannot simply be passed to its compiler without adaptation.

For our further architectural journey, the conclusion is straightforward:

**TypeScript will become our primary application development language, but JavaScript will remain the foundation that we need to understand in order to work with the entire modern frontend and backend ecosystem.**

These are not competing technologies, but two interconnected tools, each of which has its place in modern development.

## OOP in TypeScript: Familiar Principles, Different Ways of Expressing Them

TypeScript supports familiar object-oriented constructs: classes, interfaces, inheritance, access modifiers, and abstract classes. But the important thing is not simply to transfer C# syntax into the frontend. It is to use these tools where they genuinely help manage complexity.

### Encapsulation

Encapsulation is not just about the `private` modifier. Its purpose is to hide internal state and provide a clear way to interact with an object.

In TypeScript, the `public`, `protected`, and `private` modifiers help describe access to class members. However, ordinary TypeScript `private` is a type-system restriction, not full runtime protection. If privacy is required at the JavaScript runtime level, the `#field` private field syntax is available.

In one of the Workshop examples, a service's internal state is kept behind a private Signal, while a read-only representation is exposed to consumers. The important point here is the access restriction provided by TypeScript itself; the Facade structure and interaction with Signals are discussed in detail in [Article #7](https://enterprise-frontend-workshop.hashnode.dev/angular-in-depth-part-2-the-evolution-of-angular-and-a-developer-s-architectural-thinking#4-practical-implementation-facades-and-signals-without-effect).

### Abstraction and Contracts

An interface allows us to describe what an object must provide without tying the consumer to a specific implementation. This is particularly useful at module boundaries and when working with external dependencies.

For example, the `Transaction` model in `libs/shared/definitions` describes the structure of a transaction. Facades, UI components, and other parts of the application can use it without duplicating their own versions of the same model.

In TypeScript, interfaces and type aliases are used to describe contracts at compile time. Unlike classes, they do not create runtime objects and cannot validate incoming external data by themselves.

### Inheritance and Composition

Inheritance allows us to establish relationships between types and reuse behavior. However, deep class hierarchies often make a system harder to change: the behavior of a base class affects all its descendants, and understanding the final implementation becomes more difficult.

Composition is often a more flexible option. Instead of creating a long inheritance chain, an object receives the dependencies it needs and delegates individual responsibilities to them.

In frontend development, this naturally works together with dependency injection: an object receives the dependencies it needs and delegates individual operations to them.

### Polymorphism

Polymorphism is useful when different implementations can be used through a common contract. Consumers need to know which operations are available, not how a particular implementation performs them.

In TypeScript, this is often expressed through interfaces and structural typing: an object satisfies a contract if it provides the required properties and methods. It does not necessarily have to inherit from a common base class.

The key is not to create abstractions merely for the sake of having them. If a system has only one implementation and there is no real reason to separate the contract from the implementation, an additional interface may only make the code more complicated.

## SOLID and Clean Code: Not a Set of Rules, but a Way to Manage Complexity

SOLID consists of five principles that help us build systems that are easier to change and extend. They are not tied to C# and are equally applicable to TypeScript development.

- **Single Responsibility Principle (SRP).** A module should have one primary reason to change. A component renders the UI, a facade coordinates a use case and its state, and the data access layer is responsible for interacting with storage.
- **Open/Closed Principle (OCP).** A system should be designed so that typical extensions do not require constant changes to already working code. Contracts, composition, and separate implementations can help achieve this.
- **Liskov Substitution Principle (LSP).** An implementation must preserve the expectations defined by its base type or contract. If substituting another implementation breaks consumer behavior, the contract has been designed incorrectly.
- **Interface Segregation Principle (ISP).** Consumers should not be forced to depend on methods they do not need. Small contracts are often better than one universal interface.
- **Dependency Inversion Principle (DIP).** High-level logic should not depend on infrastructure details. Dependencies should be directed through boundaries and contracts so that implementations can be changed independently.

Clean Code complements these principles with everyday practices: meaningful names, small methods with clear responsibilities, no hidden side effects, the minimum necessary complexity, and explicit contracts.

For example, the `addTransaction` method in `TransactionFacadeService` accepts `Omit<Transaction, 'id'>`: the calling code passes the new transaction data without an identifier because the facade creates that identifier itself. This is a small detail, but it makes responsibility explicit and prevents calling code from accidentally overriding a value that should be controlled by the service.

SOLID should not be turned into a mechanical checklist. An abstraction is justified when it separates genuinely different responsibilities or allows an implementation to be changed independently. If it does not solve a concrete problem, it may be premature complexity.



## TypeScript Features That Are Particularly Useful in Practice

TypeScript is interesting not merely because it adds types to variables. Its real value becomes apparent when we start using the type system to design an application's architecture.

Types allow us to define contracts between modules, constrain the valid states of objects, create reusable components and services, and detect incompatible changes before the application is even run.

Let's look at the features that are particularly useful when developing large frontend systems.

### 1. `interface` and `type`: Defining Contracts

Both mechanisms allow us to describe types, but they serve slightly different purposes.

`interface` is traditionally used to describe object structures and contracts between system components.

For example, in our Personal Finance Workshop, a transaction is represented by an interface:

```ts
export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
}
```

Any service or component working with `Transaction` now knows what data structure it can expect.

But what happens if we need to describe a new transaction that has not yet been saved and therefore does not have an identifier?

We could create a separate interface:

```ts
interface NewTransaction {
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
}
```

However, this would duplicate the structure.

It is more convenient to use `type` together with Utility Types, which we will discuss below:

```ts
type NewTransaction = Omit<Transaction, 'id'>;
```

`type` offers broader capabilities for combining types:

```ts
type TransactionId = string;

type TransactionStatus =
  | 'draft'
  | 'saved'
  | 'archived';

type Identifiable = {
  id: string;
};

type Auditable = {
  createdAt: Date;
  updatedAt: Date;
};

type AuditableTransaction =
  Transaction & Auditable;
```

An important difference is that `interface` supports declaration merging — the ability to extend declarations of interfaces with the same name. `type` does not support this, but it allows us to create union types, intersections, and other derived types.

In practice, I use the following approach:

- `interface` when describing an object, model, or public API contract;
- `type` when combining types and creating unions, intersections, and derived types.

This is not a strict language rule, but a useful architectural convention. Consistency within the project is what matters.

### 2. Union Types and Discriminated Unions: Managing Valid States

A Union Type allows us to define that a value can belong to one of several types.

For example, an operation status can have several valid variants:

```ts
type TransactionStatus =
  | 'draft'
  | 'saved'
  | 'archived';
```

A variable can no longer accidentally receive an arbitrary string:

```ts
let status: TransactionStatus = 'draft';

status = 'saved';    // OK
status = 'deleted';  // TypeScript error
```

This is a simple way to restrict the set of permitted values.

Discriminated Unions are even more interesting.

Imagine that the application loads transactions from storage. The operation can be in one of three states:

```ts
type LoadingState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };
```

Each branch has its own structure.

We can now handle the state safely:

```ts
function displayTransactions(
  state: LoadingState<Transaction[]>
): void {
  switch (state.status) {
    case 'loading':
      console.log('Loading transactions...');
      break;

    case 'success':
      console.log(state.data);
      break;

    case 'error':
      console.error(state.message);
      break;
  }
}
```

Notice that TypeScript automatically understands which properties are available in each branch.

The `loading` state has no `data`, the `success` state has `data`, and the `error` state has `message`.

This is called Type Narrowing — narrowing a type based on a check.

Why is this architecturally important?

Instead of several independent flags:

```ts
interface LoadingState {
  isLoading: boolean;
  hasError: boolean;
  data?: Transaction[];
  error?: string;
}
```

we define strictly valid states.

In the first approach, it is entirely possible to end up with a contradictory combination: `isLoading === true`, `hasError === true`, and populated `data` at the same time.

A Discriminated Union makes such combinations impossible at the type-model level.

This is particularly useful when designing the states of Angular components, facades, HTTP operations, and complex user scenarios.

### 3. Generics: Reuse Without Losing Type Information

Generics allow us to create universal functions, classes, interfaces, and services that work with different data types.

Consider a simple function:

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}
```

It can work with arrays of different types:

```ts
const firstNumber = first([10, 20, 30]);
// number | undefined

const firstName = first(['Anna', 'Peter']);
// string | undefined
```

TypeScript does not lose information about the element type.

Without Generics, we would have to create separate functions for numbers, strings, and objects, or use `any` and lose type checking.

In enterprise development, Generics are particularly useful when creating reusable contracts.

For example:

```ts
interface Repository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  save(item: T): Promise<void>;
}
```

The same contract can now be used for different models:

```ts
type TransactionRepository =
  Repository<Transaction>;

type UserRepository =
  Repository<User>;
```

The interaction structure remains the same, but the data type is determined by the specific implementation.

Generics are also used in our Workshop's `ModalDialogService`.

The modal mechanism must work with different components, accept different input data, and return results of different types.

Instead of creating a separate service for every dialog, we can use a generic mechanism in which type parameters connect:

- the type of the dynamic component;
- the structure of the data being passed;
- the type of the dialog's closing result.

This allows us to reuse infrastructure without losing type safety in a particular scenario.

The main architectural value of Generics is the ability to reuse an implementation while preserving the specific contracts expected by its consumers.

### 4. Utility Types: Derived Types Without Duplicating Models

TypeScript provides a set of built-in Utility Types that allow us to derive new types from existing ones.

Let's look at four particularly useful constructs.

**`Omit<T, K>`**

Excludes the specified properties.

```ts
type NewTransaction =
  Omit<Transaction, 'id'>;
```

The result is a transaction structure without an identifier.

This is exactly the approach used in `TransactionFacadeService`:

```ts
async addTransaction(
  transaction: Omit<Transaction, 'id'>
): Promise<Transaction> {
  const createdTransaction: Transaction = {
    ...transaction,
    id: crypto.randomUUID()
  };

  // Persist the transaction
  return createdTransaction;
}
```

The calling code should not create the identifier itself. That is the facade's responsibility.

The type therefore directly reflects an architectural decision: the identifier is created inside the service.

**`Pick<T, K>`**

Keeps only the selected properties.

```ts
type TransactionSummary =
  Pick<Transaction, 'id' | 'amount'>;
```

We can now pass a compact representation of a transaction without manually creating a separate model.

This is useful for tables, lists, small information blocks, and APIs that need only part of the original data.

**`Partial<T>`**

Makes all properties optional.

```ts
type TransactionUpdate =
  Partial<Transaction>;
```

This type is convenient for partial update operations:

```ts
function updateTransaction(
  id: string,
  changes: Partial<Transaction>
): void {
  // Update only the provided fields
}
```

However, `Partial` should not be applied automatically to every update operation. If an update requires certain mandatory fields, it is better to describe a separate contract.

**`Record<K, V>`**

Creates an object whose keys correspond to a given type and whose values have a specified type.

For example, we can define labels for each transaction type:

```ts
const transactionLabels:
  Record<TransactionType, string> = {
    [TransactionType.income]: 'Income',
    [TransactionType.expense]: 'Expense'
  };
```

If a new variant is added to `TransactionType`, TypeScript will require us to extend the dictionary.

This is particularly useful for configuration objects, lookup tables, localization, and state presentation.

### Record as a State Transition Table

`Record` can be used not only to store mappings between keys and values. It also allows us to describe state transitions declaratively.

Consider switching the application's theme. The user presses one button, and the selected theme changes in sequence: Light → Dark → System → Light.

First, let's define the valid values and the transition table:

```ts
type Theme = 'light' | 'dark' | 'system';

const next: Record<Theme, Theme> = {
  light: 'dark',
  dark: 'system',
  system: 'light'
};
```

Now let's use an Angular Signal to store the current value:

```ts
readonly theme = signal<Theme>('system');

toggleTheme(): void {
  this.theme.update(current => next[current]);
}
```

The entire switch is reduced to one line: `this.theme.update(current => next[current]);`. The `update` method passes the current value to the callback, while `Record` defines which value should come next.

TypeScript checks that the transition table is complete: a next state must be defined for every `Theme` variant. If a new theme is added, the compiler will require us to extend `next`.

The responsibilities are separated here: the Signal stores reactive state, while `Record` describes the transition rule. No additional `if` or `switch` branches are needed for such a simple scenario.

In a real application, the selected `system` theme usually means that the effective color scheme is determined by the operating system settings. This is a separate concern from storing the user's selection.

Utility Types help avoid model duplication and make derived contracts dependent on the original structure.

### 5. `unknown` and Type Guards: Working Safely with External Data

One of the most important TypeScript principles is not to trust data simply because it came from a particular source.

For example, an HTTP API may return an unexpected object. IndexedDB may contain data from an older version of the application. User input may have a completely different structure.

The `unknown` type exists for such situations.

Unlike `any`, it prevents us from using a value until we have checked its type.

```ts
function processValue(value: unknown): void {
  // value.toUpperCase();
  // TypeScript error

  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  }
}
```

For more complex objects, we can create our own Type Guards.

For example:

```ts
function isTransaction(
  value: unknown
): value is Transaction {
  if (
    typeof value !== 'object' ||
    value === null
  ) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate['id'] === 'string' &&
    typeof candidate['description'] === 'string' &&
    typeof candidate['amount'] === 'number' &&
    typeof candidate['date'] === 'string' &&
    (
      candidate['type'] === TransactionType.income ||
      candidate['type'] === TransactionType.expense
    )
  );
}
```

There are two important things to understand here.

First, `value is Transaction` tells TypeScript the result of the check and allows the type to be narrowed.

Second, the actual validation takes place inside the function. Merely writing `value is Transaction` does not perform any automatic check.

In our Workshop, this principle is used in `StorageFacadeService`: data from IndexedDB is initially treated as `unknown`, then validated, and only after that used as a transaction collection.

This is particularly important at system boundaries.

Static typing protects the application's internal contracts, while runtime validation checks incoming external data. These mechanisms complement each other.

### 6. `as const` and `satisfies`: Precise Configurations

Large applications often contain configuration objects: routes, settings, lookup tables, and sets of constants.

Consider this example:

```ts
const ROUTE = {
  LOGIN: 'login',
  DASHBOARD: 'dashboard',
  ADD_INCOME: 'add-income',
  ADD_EXPENSE: 'add-expense'
} as const;
```

Without `as const`, TypeScript may infer the general type `string` for the values.

With `as const`, the values retain their specific literal types, and the properties become `readonly` at the type-system level.

We can derive the type of a valid route:

```ts
type RoutePath =
  typeof ROUTE[keyof typeof ROUTE];
```

The result is a union:

```ts
type RoutePath =
  | 'login'
  | 'dashboard'
  | 'add-income'
  | 'add-expense';
```

An important clarification: `as const` does not freeze the object at runtime. This restriction belongs to the type system.

Now let's look at `satisfies`.

Suppose we want to describe a route configuration and verify that every route matches the allowed set of values.

```ts
type RouteName =
  | 'login'
  | 'dashboard'
  | 'add-income'
  | 'add-expense';

const routes = {
  LOGIN: 'login',
  DASHBOARD: 'dashboard',
  ADD_INCOME: 'add-income',
  ADD_EXPENSE: 'add-expense'
} satisfies Record<string, RouteName>;
```

`satisfies` checks that the object conforms to the contract while preserving the inferred type of the expression itself.

This differs from an ordinary type annotation, in which the variable receives the declared type as a whole.

In practice, `as const` and `satisfies` can be used together:

```ts
const routes = {
  LOGIN: 'login',
  DASHBOARD: 'dashboard',
  ADD_INCOME: 'add-income',
  ADD_EXPENSE: 'add-expense'
} as const satisfies Record<string, RouteName>;
```

This allows us to preserve exact literal values and verify compliance with the specified contract at the same time.

Our Workshop already uses `as const` for the `ROUTE` object. This is a good example of how routes can be centralized while retaining type precision.

### 7. `enum` or Union Types: Local Types and Shared Contracts

TypeScript offers several ways to describe a limited set of values. The most common comparison in this context is between `enum` and Union Types.

For local frontend logic, a Union Type is often a simple and convenient solution:

```ts
type TransactionStatus =
  | 'draft'
  | 'saved'
  | 'archived';
```

Such a type exists only during TypeScript checking and does not create a separate JavaScript construct.

If we need named values that are also available at runtime, we can use an `enum`:

```ts
export enum TransactionType {
  income = 1,
  expense = -1
}
```

Our Workshop uses a numeric enum. Its values participate in the balance calculation:

```ts
const balance =
  transaction.amount * transaction.type;
```

Income has a positive sign, while an expense has a negative sign.

We can also use an object with `as const`, obtaining both a runtime object and a Union Type based on its values:

```ts
const TransactionStatus = {
  DRAFT: 'draft',
  SAVED: 'saved',
  ARCHIVED: 'archived'
} as const;

type TransactionStatus =
  typeof TransactionStatus[
    keyof typeof TransactionStatus
  ];
```

All three options can be appropriate for internal frontend logic. However, when an enumeration becomes part of a contract between the Backend and Frontend, the selection criteria change.

#### When an Enumeration Is Part of a Shared Contract

Suppose the Backend is written in C# and contains the following enumeration:

```csharp
public enum TransactionType
{
    Income = 1,
    Expense = -1
}
```

The Frontend must understand the same names and values:

```ts
export enum TransactionType {
  Income = 1,
  Expense = -1
}
```

If a TypeScript developer declares the corresponding Union Type or Enum independently, the system now contains two separate implementations of the same contract. As long as they match, everything looks fine. But the Backend and Frontend evolve in parallel, and sooner or later synchronization becomes an issue.

For a small system, manual duplication may seem acceptable. Imagine that we have only 10 enumerations, each containing two to five elements. Checking that they match and making small changes is not difficult.

But the same 10 enumerations with 20–50 elements each are a different matter. The volume of duplicated definitions is much larger, and the probability of missing a change or making a mistake during transfer increases.

Now imagine an enterprise system that uses 500 enumerations. At that point, the number of elements in each one becomes less important. Even if each contains only two values, maintaining hundreds of parallel definitions manually is no longer rational. If they contain dozens of values, the scale of the problem only increases.

This is no longer a question of developer convenience. It is a question of architectural governance and system maintenance costs.

#### Reflection and Automatic Generation of TypeScript Contracts

In one enterprise project, we solved this problem at the tooling level. We developed our own TypeScript code generator that used .NET Reflection to analyze server-side types and their metadata.

The generator extracted information from Backend models, including enumerations and their values, and produced the corresponding TypeScript files for the Frontend.

For example, the original C# enumeration:

```csharp
public enum TransactionType
{
    Income = 1,
    Expense = -1
}
```

was automatically converted into TypeScript:

```ts
export enum TransactionType {
  Income = 1,
  Expense = -1
}
```

The Backend remained the single source of truth, while the Frontend received an automatically generated representation of the server contract. We successfully used this custom generator for many years.

The value of this solution was not simply the time saved by avoiding a few lines of code. It eliminated the need to maintain two versions of the same model manually.

In enterprise systems, this approach makes it possible to:

- eliminate manual duplication of shared enumerations;
- reduce the likelihood of contract mismatches;
- centralize the source of truth on the Backend;
- update client-side definitions automatically;
- include generation in the build and CI/CD process.

Generating enumerations is only one possible scenario. The same principle can be applied to DTOs and other elements of API contracts.

#### What Happens When the Backend Changes

Consider a fairly ordinary situation. The Backend team decides to rename several enumeration members. A developer performs a global Replace, compiles the Backend, and the compilation succeeds.

The Backend is ready for deployment.

But how much time will the Frontend developer need to find every use of the old names and manually bring the client code into line with the changes?

In a large system, old names may appear in dozens of components, services, facades, mappers, and other dependencies. The Backend compiler knows nothing about the client code. A successful server-side build does not mean that the change is safe for the entire system.

With automatic generation, the situation is fundamentally different. After the server-side enumeration changes, the generator produces the current TypeScript definition. The TypeScript compiler then helps identify places where the client code still refers to old names.

The problem is therefore detected during Frontend development and build, rather than after the Backend has been deployed and an inconsistency is discovered while integrating the two systems.

#### How AI Changed This Task

With the emergence of AI-assisted development, the nature of such tasks has also changed.

Previously, a significant part of a developer's time was spent on mechanical work: finding all usages of a changed element, checking the context, replacing old names, fixing related sections of code, and making sure nothing had been missed.

Today, an AI agent can significantly speed up this process. Given a contract-change task, it can:

- analyze changes in the Backend model;
- find related TypeScript definitions and their usages;
- identify affected components, services, and other Frontend parts;
- make the necessary changes across multiple files;
- run compilation and tests;
- analyze errors and suggest additional fixes.

As a result, a task that could previously require extensive manual work becomes much more manageable.

However, AI should not replace architectural decisions or infrastructure mechanisms. If a system has no single source of truth and no automatic contract generation, the agent has to reconstruct the correspondence between two independent implementations. It can help find discrepancies, but the duplication itself remains.

It is much more effective to combine both approaches:

1. The Backend remains the source of truth.
2. The generator automatically produces client-side contracts.
3. AI helps analyze the consequences of changes and adapt the code that uses those contracts.
4. The compiler, tests, and CI/CD verify the result.

Automatic generation removes the need to maintain duplicate definitions manually, while AI reduces the effort required to adapt the rest of the application to changes.

For enterprise development, I prefer this approach. Not because automation is always better in itself, but because it eliminates an entire class of recurring human errors and allows the system to scale without a proportional increase in maintenance costs.

There is an important architectural conclusion here: the choice between `enum` and Union Type depends not only on TypeScript syntax. If a set of values belongs to a shared contract with the Backend, we must consider the source of truth and the way models are synchronized. For local Frontend states, a Union Type may be entirely sufficient. For shared server contracts, it is preferable to use a consistent enumeration generated from the Backend model.

### 8. Class vs. Interface: Why a Backend Class Does Not Have to Be a Frontend Class

After enumerations, it is logical to move to the next question: how do we synchronize not only values but also data structures between the Backend and Frontend?

Here we encounter a similar problem, but this time we are dealing with classes and interfaces.

Depending on the project's architecture, communication between the Backend and Frontend can be organized in different ways.

Some projects use GraphQL, where the schema defines the available types and data structures, and client types and operations can be generated from it.

Others use a conventional REST API based on ASP.NET Web API. In this case, we have a standardized way to describe the API — OpenAPI. It can be used to generate interactive documentation, available directly on the Backend through Swagger UI, as well as client code and TypeScript types.

However, in our example, I want to focus on a different approach — generating TypeScript models directly from server-side types using Reflection.

#### Does a Class in the Backend Have to Be a Class in the Frontend?

At first glance, everything seems obvious.

If we have a class in the Backend, then the Frontend should also have a class. If the server uses an interface, the client needs an interface.

But this assumption is not entirely correct.

Consider an ordinary C# model:

```csharp
public class TransactionDto
{
    public Guid Id { get; set; }

    public string Description { get; set; }

    public decimal Amount { get; set; }

    public DateTime Date { get; set; }
}
```

For the Backend, this is a full-fledged class. It can participate in business logic, be used for serialization, be passed between application layers, and have its own methods.

But what does the Frontend actually need?

In most cases, it needs only:

- the type name;
- public properties;
- the types of those properties;
- information about which properties are read-only;
- other characteristics required to describe the contract correctly.

There is no need to transfer server-side implementation, business methods, or internal logic into the browser.

Therefore, it is not necessary to create another class on the Frontend.

An interface is entirely sufficient for the client-side model:

```typescript
export interface TransactionDto {
    readonly id: string;
    description: string;
    amount: number;
    date: string;
}
```

Notice the `readonly` modifier.

If a server property is not intended to be changed after an object is created, this information can also be reflected in the client contract. TypeScript allows us to describe such constraints directly in the interface.

At the same time, remember that `readonly` operates at the TypeScript type-system level and does not by itself make an object immutable at runtime.

#### Why an Interface Is Often the More Appropriate Choice

In TypeScript, an interface describes a contract — the structure an entity must implement.

For transferring data between the Backend and Frontend, this is often exactly what we need.

We are not trying to transfer the implementation of a server-side class. We want the client to know what data structure it will receive from the API and which properties it can use.

Creating a full-fledged class merely to reproduce the server-side construct provides no practical benefit in this situation.

Moreover, it may create the false impression that the Frontend model has the same implementation and behavior as the Backend model.

Of course, there are specific scenarios in which the client genuinely needs a class: for example, when an object must have its own behavior, methods, a constructor, or additional state-management mechanisms.

But that is a separate Frontend responsibility, and I would not recommend mixing it with the automatically generated representation of the server contract.

If the client needs a class, it can be created separately and implement the generated interface:

```typescript
import { TransactionDto } from './transaction.dto';

export class Transaction implements TransactionDto {
    constructor(
        public readonly id: string,
        public description: string,
        public amount: number,
        public date: string
    ) {}
}
```

This way, we preserve the server contract without allowing it to dictate the internal structure of the client-side implementation.

One clarification is important here: a class implements an interface using `implements`, rather than inheriting from it using `extends`. An interface defines a contract, but does not provide an implementation or state that can be inherited.

#### Controlled Generation Through Custom Attributes

In our generator, we went beyond simply converting C# classes into TypeScript interfaces.

Since Reflection allows us to inspect types and their metadata, we used custom attributes to explicitly control the generation rules.

This meant that we were not limited to automatic conversion based on defaults. We could define how a particular server-side model should be represented on the Frontend.

In particular, Custom Attributes allowed us to specify:

1. **The name of the generated type.** If no name was specified, the original name of the server class or enumeration was used.
2. **Whether generation was required.** Not every Backend class should automatically become part of the Frontend.
3. **The type of generated construct.** `class` or `interface`.
4. **The list of required imports.** This allowed the generator to create correct dependencies between generated TypeScript files.
5. **The target directory.** The generator knew which directory should contain the output.
6. **Naming conventions.** For example, PascalCase or another agreed format for class or interface names.

Let's look at how such settings could be represented directly in a C# model. In the following example, the attribute explicitly tells the generator to create a TypeScript interface, set its name and target directory, and include the required imports:

```csharp
[TypeScriptModel(
    Generate = true,
    Name = "TransactionDto",
    Type = TypeScriptType.Interface,
    OutputDirectory = "models",
    Imports = new[] { "TransactionType" },
    NamingConvention = NamingConvention.PascalCase)]
public class TransactionDto
{
    public Guid Id { get; set; }

    public decimal Amount { get; set; }

    public string Description { get; set; }

    public TransactionType Type { get; set; }
}
```

The same principle was used for enumerations. The attribute specifies that the enum must also become part of the client contract:

```csharp
[TypeScriptModel(
    Generate = true,
    Name = "TransactionType",
    Type = TypeScriptType.Enum,
    OutputDirectory = "models",
    NamingConvention = NamingConvention.PascalCase)]
public enum TransactionType
{
    Income = 1,
    Expense = 2
}
```

The generated output consists of the corresponding TypeScript definitions:

```typescript
export enum TransactionType {
  Income = 1,
  Expense = 2
}
```

```typescript
import { TransactionType } from './TransactionType';

export interface TransactionDto {
  id: string;
  amount: number;
  description: string;
  type: TransactionType;
}
```

In this example, attributes act as declarative generator configuration. The developer defines the rules next to the server-side model, and Reflection allows the metadata to be read and a consistent client contract to be generated.

The same principles were applied to enumerations.

In other words, we did not simply read a server-side model and mechanically copy its structure. We created a controlled mapping of Backend models into the Frontend architecture.

These are fundamentally different things.

The Backend could contain dozens or hundreds of classes, but only those marked with the appropriate attributes became part of the client contract.

One server-side model could be represented in TypeScript as an interface, another as a class, and a third might not be generated at all.

This flexibility is particularly important in large enterprise systems, where not every part of the Backend's internal structure should be exposed to the client.

#### The Generator as a Formalized Architectural Agreement

Interestingly, our Custom Attributes did more than solve the generation task.

In essence, they became an additional layer of architectural agreements between the Backend and Frontend.

Developers no longer had to decide from scratch each time how to name a client model, which directory to put it in, which dependencies to import, or whether it should be a class or an interface.

These decisions were already expressed in the metadata of the server-side model.

The same approach is useful when working with AI agents.

If generation rules, attributes, and project conventions are described explicitly, AI can use them as formal instructions. It does not have to guess every time how a server-side model should be represented in client code.

Instead of a vague task such as "create a TypeScript model from a C# class", we have a specific transformation contract.

This reduces the number of arbitrary decisions, makes the result more predictable, and helps maintain a consistent style across large projects.

Ultimately, Reflection, Custom Attributes, and the TypeScript generator become not just technical tools, but part of the project's architectural infrastructure.

**Our goal is not to copy the Backend into the Frontend. Our goal is to map the required server contracts automatically and consistently into the TypeScript constructs that the client architecture actually needs.**

### 9. `async/await` and `Promise`: Typing Asynchronous Operations

Asynchronous execution is an integral part of frontend development.

HTTP requests, IndexedDB, file uploads, and interaction with browser APIs are asynchronous.

It is important to remember that `Promise`, `async`, and `await` belong to JavaScript. TypeScript adds the ability to describe and check the result type.

For example:

```ts
async function loadTransactions():
  Promise<Transaction[]> {
  return storage.getTransactions();
}
```

The signature immediately shows that the function returns a Promise that will resolve to an array of transactions.

Let's consider a sequence of several asynchronous operations:

```ts
async function initializeDashboard(): Promise<void> {
  const transactions =
    await storage.getTransactions();

  const categories =
    await storage.getCategories();

  console.log(transactions, categories);
}
```

The second request will start only after the first one has completed.

If the operations do not depend on each other, they can be executed in parallel:

```ts
async function initializeDashboard(): Promise<void> {
  const [transactions, categories] =
    await Promise.all([
      storage.getTransactions(),
      storage.getCategories()
    ]);

  console.log(transactions, categories);
}
```

`Promise.all` allows us to wait for all operations to complete. TypeScript preserves the type of each result, so we do not have to cast types manually.

It is also important to handle errors correctly:

```ts
async function loadTransactions():
  Promise<Transaction[]> {
  try {
    return await storage.getTransactions();
  } catch (error: unknown) {
    console.error('Failed to load transactions', error);
    throw error;
  }
}
```

In `catch`, the error value is treated as `unknown`. This prevents us from assuming in advance that every error must be an `Error` object.

This approach is particularly important in an architecture where asynchronous operations pass through several layers: a component, a facade, a use case, and the data access layer.

A typed Promise becomes part of the contract between these layers.

### Why This Is More Than a Syntax Reference

TypeScript has far more capabilities than can be covered in a single article. But for an architect, the number of language constructs learned is less important than understanding the problem each one solves.

`interface` and `type` help describe contracts.

Union Types allow us to constrain valid values and states.

Generics provide implementation reuse without losing type information.

Utility Types allow us to create derived models without duplication.

`unknown` and Type Guards help us work safely with external data.

`as const` and `satisfies` allow us to create precise and verifiable configurations.

`enum` and Union Types provide different ways to represent sets of values.

`Promise` and `async/await` allow us to describe asynchronous contracts explicitly.

Together, these features turn TypeScript from a simple addition to JavaScript into a tool for designing software systems.

That is why I see it not merely as a frontend development language, but as a means of embedding architectural agreements directly into the code.

## AI-Assisted Development: A Tool, Not a Replacement for Engineering Judgment

AI agents have noticeably changed developers' everyday work. It is now possible to understand an unfamiliar syntax or library more quickly, obtain an implementation example, study it, and verify it in the context of a project.

But AI does not remove the need to understand the language. Developers must know which constructs exist, where the compiler's capabilities end, which errors may only appear at runtime, and how to verify an application's behavior.

AI may suggest an interface, a service, an abstract class, or a universal factory. The fact that a solution looks convincing and compiles successfully does not mean that it works correctly in every scenario or meets the project's requirements.

That is why I see AI as a tool for accelerating engineering work, not as a replacement for engineering judgment. The more code is generated automatically, the more important it becomes to read it independently, verify assumptions, and evaluate the consequences.

## TypeScript as a Tool for Engineering Thinking

In this article, we have explored TypeScript capabilities that help express contracts, constrain valid states, reuse typed implementations, and work safely with external data. We have also looked at generating client-side contracts from C# and using AI in development.

For me, the main conclusion is that TypeScript is not simply a way to add type checking to JavaScript. When used deliberately, its type system becomes part of the engineering toolkit: it helps formulate expectations more precisely, detect inconsistencies, and make changes safer.

But neither the type system, nor the generator, nor AI makes architectural decisions on behalf of the developer. They provide the means to implement and verify those decisions consistently.

## Architecture, Technologies, and Languages: Everything Is Connected

While working on this article, we have covered a path from TypeScript capabilities and OOP principles to designing contracts between the Backend and Frontend, automatic code generation, and the use of AI in everyday development.

At first glance, these may seem like separate topics. In reality, they are closely connected.

Architecture influences the choice of technologies. The selected technologies determine the available tools and approaches. A programming language defines how architectural decisions can be expressed and imposes its own constraints. New tools, including AI, change the development process itself and make us reconsider familiar workflows.

All of this forms a single system in which one decision inevitably affects another.

That is why an architect's work does not always begin with the question: "How do I write this class correctly?"

Much more often, we have to solve entirely different problems:

- How should responsibilities be divided between system components?
- Where should module boundaries be drawn?
- How can we ensure consistency between Backend and Frontend contracts?
- Which technologies are actually suitable for the problem at hand?
- What should be automated, and what should remain under the developer's control?
- How can we ensure that today's decisions do not become tomorrow's technical constraints?

Only after that does the question arise of how to implement a particular class, interface, or service correctly.

This does not mean that implementation details are unimportant. On the contrary, good architecture must be reflected consistently in the code. If architectural decisions cannot be expressed through clear, maintainable, and technically correct language constructs, the work cannot yet be considered complete.

Language, technologies, and architecture do not exist independently of one another. We cannot choose an architecture while completely ignoring the capabilities of the platform. We cannot use technologies effectively without understanding their limitations. And we cannot consider an architectural decision good if it cannot be implemented and maintained efficiently.

I would therefore formulate the architect's main task as follows:

**Not simply to choose the right technology or write the right code, but to connect architectural principles, language capabilities, and development tools into a coherent system that solves real problems and can evolve.**

And after all that, of course, we still have to write the class correctly. After all, we have to get to it eventually.

## Materials and Source Code

The examples in this article are based on the Enterprise Frontend Workshop codebase, in particular:

- `libs/shared/definitions/src/lib/interfaces/transaction.ts`
- `libs/shared/definitions/src/lib/enums/transaction-type.enum.ts`
- `libs/shared/facades/src/lib/transaction-facade.service.ts`
- `libs/shared/facades/src/lib/storage-facade.service.ts`
- `libs/shared/ui/src/lib/modal-dialog/modal-dialog.service.ts`
- `libs/shared/definitions/src/lib/constants/routes.ts`

