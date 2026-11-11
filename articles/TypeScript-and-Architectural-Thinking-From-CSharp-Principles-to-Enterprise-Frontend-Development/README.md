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

