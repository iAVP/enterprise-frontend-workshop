# Architecture in Practice: Decisions Behind Enterprise Frontend Systems

> **Status:** Published on [Hashnode](https://enterprise-frontend-workshop.hashnode.dev/architecture-in-practice-decisions-behind-enterprise-frontend-systems).

This article opens the theoretical thread of the Enterprise Frontend Workshop. It explores real architectural dilemmas and why different projects arrive at different solutions. The next step is to translate these ideas into the technical organization of an NX workspace.

## Architecture Before Technology

When a new project begins, it is easy to become absorbed in choosing technologies. Which frontend framework should be used? How should the frontend communicate with the backend? What project structure will make development comfortable while allowing the application to evolve? Should reuse be designed in from the beginning, or should the team focus first on delivering the requirements?

These questions tend to arrive one after another as the team tries to work out where to start. But technology choices rarely exist in isolation. They have to account for systems already in use, the people who depend on them, and changes that may become necessary a year or several years later.

At the beginning, everything can seem straightforward. The requirements are known, the main user journey is clear, and the timeline and constraints are understood. The team can choose a framework, create an application, and start building. Enterprise products, however, rarely remain exactly as they were originally conceived. Requirements evolve, other teams become involved, additional applications appear, and the ways people interact with the product change. Sometimes the new solution must integrate with systems that have existed for many years and are still doing their job.

At some point, the task turns out to be more than building a new application. The application has to fit into an existing environment, preserve working processes, account for the team's experience, and leave room for future development.

That is when it becomes clear that choosing a technology is only part of the work. It is just as important to decide what can remain as it is, what must be connected, and what consequences today's choices may have for later stages of the project.

Architecture is more than the structure of source code or a way of splitting an application into modules. It determines how parts of a system interact, which decisions can change independently, where responsibilities begin and end, and how expensive future changes are likely to be.

Architecture also does not exist separately from the organization the software serves. The same technical solution may work well in one project and poorly in another. Much depends on the problems to be solved, the systems already in place, the team's experience, and what happens if the original assumptions change.

Before discussing specific tools, it is therefore useful to understand where architectural decisions come from. Why do we sometimes have to combine technologies that appear incompatible at first? Why might one product contain several frontend frameworks? Why can a decision that initially feels convenient require a serious rethink a few years later? And why is the simplest technical solution not always the most economical one for an organization?

The answers are best found not in abstract rules, but in situations that actually arise when enterprise systems are built and maintained.

## When New Functionality Should Not Disrupt How People Work

Consider a common situation.

An organization has been using SharePoint for years. For its employees, it is a familiar working environment: they work with spreadsheets and documents, access data, perform routine operations, and follow established processes. They know where information is stored and how to get their work done. They do not have to think about the system's internals every day; they simply use it to handle everyday tasks.

At some point, the organization needs a mobile application for iOS and Android. The application should provide additional capabilities, work with corporate data, and support the required user journeys.

The existing employee workflow, however, should not change. People continue working in SharePoint as before. They should not have to move to another system, retrain, or reorganize their routines just because a new application has been built elsewhere. The mobile app can offer an additional way to interact with the corporate system without disrupting the familiar environment of people who do not need it.

At first glance, this may look like a purely technical task: build an interface, retrieve data, connect to corporate infrastructure, and configure notifications. But before choosing the technologies, the team has to decide how to add new capabilities without disturbing what already works.

One alternative would be to build a new system, migrate the data, and gradually change the existing processes. Sometimes that is necessary. If the old platform no longer meets business needs, replacing it may be justified. But if the existing environment is still doing its job, a reasonable question arises: does it really have to be replaced just to give users additional capabilities?

Such a transition would involve more than development. It would require data migration, employee training, changes to working procedures, and time for people to adapt. The organization has already invested in the current infrastructure, and employees are accustomed to the way it works.

In this case, the more important goal was not to replace the familiar environment, but to extend the existing system so that people could continue working without unnecessary disruption.

The implementation was far from trivial. The solution combined SharePoint, Microsoft Azure services, Azure WebJobs, and Firebase. Each component had its own role: the existing corporate environment remained in use for working with data, cloud mechanisms handled the necessary background operations and event processing, and Firebase was used to send push notifications to mobile applications.

The result was a system that combined technologies from different platforms. Viewed only through the lens of technological uniformity, one might ask why everything was not built on a single stack and according to one consistent pattern.

But the diversity was not introduced for its own sake. It reflected the project's real constraints. The existing infrastructure was already doing useful work, the mobile application needed additional capabilities, and users did not need to change their familiar way of working with the system.

Each component addressed a particular need, while the architecture connected them into one functioning solution.

This does not mean that combining platforms is always better than using a single system. Integration takes time, knowledge, and ongoing maintenance. Sometimes the number of connections between services grows so large that replacing part of the infrastructure becomes more economical. That conclusion, however, should follow from an assessment of the actual situation—not from an assumption that uniformity is inherently the main sign of good architecture.

In this example, the economic benefit had several sources. There was no need to disrupt employees' everyday work, rebuild functionality already provided by the existing infrastructure, or move every process to a new system just to introduce a mobile app. Development could focus on the capabilities that were actually missing.

Keeping the familiar environment also reduced organizational costs associated with changing workflows. Even if a new system is technically more convenient, moving to it can require considerable effort from people who rely on software to do their jobs every day.

The complex implementation therefore solved a relatively simple problem from the user's perspective: the system gained new capabilities while everyday work continued in the familiar way.

For employees, success was not measured by the number of integrations or by how unusual the technology stack looked. What mattered was that their work did not stop or become harder, even though new functionality had been added behind the scenes.

This example shows why an architectural decision cannot be judged solely by counting technologies, components, or integrations. We need to understand what they do, why those interaction patterns were chosen, and what would change if a different approach were used.

Sometimes architecture becomes simpler by reducing the number of components. In other cases, several technologies make it possible to preserve working systems and avoid much more expensive changes.

The important thing is to understand why a particular option fits the organization and what consequences it creates—not only today, but also in the future.

## When One Product Evolves Across Several Frontend Frameworks

A similar situation can arise within the frontend product itself, even when the issue is not corporate infrastructure but applications developed by different teams.

Imagine a large system whose main application is written in Angular. It has existed for several years, contains many features and integrations, and its team understands how it works. Over time, a development model has formed around it, useful solutions have accumulated, and dependencies on other parts of the product have emerged.

Then a new functional area is built with React. Some time later, another team starts a separate part of the product in Vue. In parallel, a mobile application becomes necessary, and Ionic or React Native is considered.

The product now contains different frontend frameworks.

Why does this happen? There can be many reasons. Applications may have been developed at different times, by different teams, and for different user journeys. Teams may have different experience. A new part of the product may have grown out of an existing application that already used a particular stack. An organization may also bring together several products, each with its own history and technical constraints.

This situation does not automatically mean that someone made a mistake at the beginning. Technological diversity often emerges as a consequence of business growth, changing requirements, and new needs.

Of course, if a product is just starting, all its applications have similar requirements, and one team is building them, using a single framework is often sensible. It makes UI components easier to reuse, reduces the number of tools, and simplifies developer onboarding. Shared conventions are also easier to maintain when applications follow similar patterns.

But suppose the applications already exist, are actively used, and contain a substantial amount of functionality. Bringing everything onto one framework is no longer a matter of changing a few dependencies. It becomes a migration program that may consume significant resources.

If the main Angular application is stable and meets business needs, rewriting it in React means rebuilding interfaces, retesting business journeys, preserving integrations, and verifying that the new version behaves like the old one. Even if development goes well, the team spends time restoring existing capabilities instead of delivering new ones.

There are also costs for testing, the transition period, training, and fixing regressions. If the old and new versions have to be supported at the same time, the expense grows further.

Before deciding to standardize on one technology, the team should therefore ask: what specific problem is this change supposed to solve?

If maintaining several frameworks genuinely impedes product development, creates substantial costs, or prevents effective sharing of common components, moving to one platform may be justified. But if the applications continue to do their jobs and their differences do not create critical problems, rewriting them may be an unjustifiably expensive way to achieve uniformity.

A different task then emerges: preserve the ability to evolve applications built with different technologies without letting the product become a collection of independent systems that solve the same problems in incompatible ways.

This requires distinguishing two concepts: technological uniformity and architectural consistency.

Several applications can use different frameworks while following common rules for organizing the system. They may have their own entry points, UI construction techniques, and build mechanisms, while still sharing selected parts of their functionality.

For example, different applications may use the same data models, share contracts for backend communication, and run the same data-processing algorithms. If these parts do not depend on a particular UI framework, they can be organized so that they do not need to be implemented separately for every application.

That does not mean trying to share absolutely everything. An Angular component does not become usable in React simply because both applications use TypeScript. A service built on Angular mechanisms is not automatically framework-independent either. Different technologies have their own models for component interaction, state management, and UI construction.

Shared code should therefore be limited to parts that genuinely solve the same problem and can exist independently of a specific application's framework. UI-specific code and technology-dependent mechanisms can remain specific to their respective frameworks.

This approach makes it possible to preserve existing applications, make use of the experience accumulated by the teams, and continue developing the product together.

Technological diversity then stops being an automatic sign of chaos. It becomes a characteristic of the system that can be managed when responsibilities and interaction rules are explicit.

Of course, multiple frameworks introduce costs. Teams have to maintain different tools, account for differences between technology environments, and sometimes build separate versions of UI components. The goal is not simply to preserve freedom of choice, but to understand when that freedom creates real value.

Architecture does not mean allowing every technology without restriction. It helps determine where differences are justified, where a common approach is needed, and which decisions will let the product evolve without constantly reworking applications that already work.

## When a Convenient Configuration Mechanism Needs to Be Reconsidered

Another example concerns application configuration. It shows how an architectural decision can be reasonable when first introduced, yet require reconsideration later as the project changes and the mechanism begins to be used in ways its designers did not intend.

In 2017, a long-running project based on Angular 2 began. There was a need to change certain settings without recompiling the application. An external JSON configuration file hosted on a web server was introduced for that purpose.

For the original requirement, this was convenient. When a public setting needs to change, rebuilding and releasing the entire application is not always desirable. External configuration separates selected settings from the main code and allows them to change independently of a release.

The original intention was not to store sensitive data in this configuration. The mechanism was meant for a defined set of settings and solved a specific problem.

But the project continued to evolve. Requirements changed, developers moved between tasks, and existing solutions remained in use. Gradually, the JSON configuration began to be used more broadly than intended, and sensitive data started appearing in it.

A convenient mechanism had ended up being used for a purpose it was not designed to serve.

The problem was not that JSON is inherently a bad configuration format. The problem was that data that should not be available to a client-application user was being placed in a publicly accessible file.

Once this was identified, the unsafe practice had to stop and the configuration approach had to change. Using the mechanism in that way was prohibited, and a different organization of configuration became a required decision despite the conflict this caused.

The general idea of shared configuration remained useful. Common parameters still needed to be defined in one place, with overrides for particular environments. What changed was not the principle of centralized configuration management, but its implementation and the constraints on how it could be used.

It is important not to conclude that TypeScript automatically provides security. If sensitive data is included in a client-side bundle, it does not become protected because it was written in TypeScript, minified, or obfuscated. Secrets must be stored and used on a protected side; the client application should receive only values that are safe to expose to its users.

Why does this example matter architecturally?

It shows the difference between the original intention and the life of a solution inside a long-running project. When it was created, the mechanism met the requirement. Later, it began to be used differently, changing the assessment of whether that approach was acceptable.

In enterprise development, it is impossible to assume that every decision will be used only under the conditions that existed when it was introduced. A project may evolve for years. People, requirements, and code usage patterns change. It is therefore important not only to create a convenient mechanism, but also to define the boundaries within which its use remains acceptable.

Sometimes those boundaries can be established through documentation and team agreements. In other cases, the approach itself must change to make undesirable use less likely. And when security is involved, convenience and familiarity are not enough reasons to keep using an unsafe solution.

This case also shows that architectural responsibility is not limited to technical implementation. Sometimes it requires organizational decisions, explaining why they are necessary, and changing established practices.

Architecture, in this sense, is not an attempt to preserve the original design at any cost. It is the willingness to revisit decisions as circumstances change and to keep the system aligned with current requirements.

## When Different Technologies Come Together to Solve One Problem

The situations discussed so far show that architectural decisions can arise for different reasons. Sometimes a familiar working environment must be preserved. Sometimes several applications need to evolve across different frontend frameworks. Sometimes a convenient mechanism must be reconsidered because security requirements have changed.

A broader question remains: how should we assess solutions that appear technically complex or inconsistent at first?

Suppose one option is to build the system on a single platform, but doing so requires replacing existing components, hiring additional specialists, and changing established processes. Another option uses several technologies, each responsible for a specific task, but requires the team to manage their interactions.

Which option is better?

Without context, there is no way to answer. If multiple technologies create complex dependencies, require scarce expertise, and increase maintenance costs, a single platform may be preferable. But if existing systems continue to work and migration would be expensive without bringing significant benefits to users, preserving the current solution may be more reasonable.

The same applies to frontend framework choices. A single framework can simplify development and maintenance. Yet rewriting several large applications solely for uniformity can consume resources that would be better spent improving functionality.

The economic impact of an architectural decision has many components. It includes not only implementation time, but also maintenance, staff training, use of existing infrastructure, change risk, and the effect on users' everyday work.

Architecture is therefore more closely connected to economics than it may initially appear. It determines not only how software is structured, but also how much effort an organization will spend developing it over time.

There is no universal rule that can identify the right option for every situation in advance. The decision depends on requirements, constraints, and the consequences of each alternative.

Sometimes a more complex technical arrangement is economically preferable because it preserves working infrastructure. Sometimes standardization really does reduce costs. Sometimes shared functionality should be extracted; in other cases, two independent implementations are simpler.

In practice, it is more useful to compare real options than to look for a diagram that appears flawless: what must change, what can remain, who will maintain the solution, and what price the organization will pay for each path.

## Why Architecture Must Be Preserved as the Product Evolves

Even well-considered initial decisions do not guarantee that a system will retain its shape as it grows.

Development consists of many small changes. Each task requires a solution that meets the requirements within the available time. Sometimes it is easier for a developer to use a neighboring module directly than to find or create an appropriate shared library. Sometimes duplicating a small piece of code appears faster than changing the existing structure.

An individual shortcut may be justified. But when such shortcuts accumulate, the boundaries between parts of the system begin to blur. Libraries acquire dependencies on applications, shared logic becomes mixed with framework-specific code, and a change in one place unexpectedly affects another.

The system becomes more difficult not necessarily because it contains more code, but because developers find it harder to understand the consequences of a change.

Architectural agreements therefore need to be more than written down; they must be maintained during development. The team should understand why particular boundaries exist, which dependencies are allowed, and when existing decisions should be reconsidered.

Some of this work happens through architectural discussions, the involvement of experienced developers, and code review. Other rules can be encoded so that unwanted dependencies are detected automatically.

This is especially important in large products with multiple applications and many libraries evolving at once. Without clear rules, a shared codebase can gradually become a collection of projects that happen to sit next to each other but are connected in arbitrary ways.

Automated checks do not replace architectural thinking. They cannot decide on their own which business capabilities should be grouped together, whether one framework should be used, or where the boundary between two responsibilities belongs. But they can help preserve decisions that have already been made and catch some violations before they become part of the main codebase.

Architecture is therefore not only an initial design. It is also the ability to maintain a coherent system as it evolves, revisit outdated decisions in time, and keep the product manageable.

## From Architectural Thinking to Project Organization

All the examples share one pattern: architectural decisions arise from the need to reconcile different aspects of a product.

In one case, mobile functionality must be added while preserving employees' familiar environment and the existing infrastructure. In another, several frontend applications need to evolve across different frameworks without rewriting a working product just to achieve uniformity. In a third, a convenient configuration mechanism must be reconsidered after its use changes and a security issue emerges.

Every case requires attention not only to code, but also to users, existing systems, the team's experience, the cost of change, and the product's future.

That is why architecture starts with understanding the problem and its constraints, not with choosing a tool. First, we need to identify which parts of the system must interact, which decisions can evolve independently, and which dependencies may cause problems later. Only then does it make sense to choose how code should be organized and how applications should communicate.

As a product grows, this approach becomes particularly important. When several applications, shared libraries, and technology environments coexist, it is no longer enough to agree on the structure of each project separately. The team needs to maintain a shared view of the system and ensure that local changes do not undermine its architectural boundaries.

This is where tools that organize multiple applications and libraries within one development workspace become useful. They help manage relationships between projects and maintain established rules.

But tools do not make architectural decisions for the team. They do not know why combining frameworks is justified in one product, why an existing system should be preserved, or which configuration values must remain shared. Those decisions come from understanding the actual problem and the consequences of the available alternatives.

Before moving to specific tools and project structures, it is therefore important to understand the reasoning behind architectural decisions: which problems we are trying to solve, why some approaches fit better than others, and which principles should remain valid regardless of the technologies used.

The point of architecture is not to make every part of a system identical. It is to understand why the parts are structured as they are, which differences are justified, and what must be protected from accidental change as the product continues to grow.

Only then does it make sense to explore how those decisions can be expressed in the project structure and maintained throughout the product's lifecycle.
