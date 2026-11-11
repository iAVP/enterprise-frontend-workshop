# Contribution Guidelines

These guidelines apply to changes made to the Enterprise Frontend Workshop repository.

## Mandatory User Review and Commit Approval

**Never commit or push article content or other repository changes without the user's explicit approval.**

- For every article, show the complete proposed text to the user in the chat before writing or committing it to GitHub.
- Incorporate the user's feedback and show the revised complete text before making repository changes.
- Wait for a clear, explicit confirmation from the user authorizing the commit. A request to draft, review, improve, translate, or prepare content is not commit approval.
- Do not create a commit, push changes, or make other repository mutations before that confirmation.
- The user's approval applies only to the specific content and change they reviewed. If the content changes materially afterward, show the new version and request approval again.
- This approval requirement applies to article drafts and translations, indexes, roadmaps, configuration, and edits to these guidelines themselves.
- The user may explicitly authorize a specific rules-only change and its commit in the same request; that authorization applies to that change only.

## Commit Messages

Commit messages must be human-readable and explain the change clearly.

- Use a descriptive commit title that says what changed and, where useful, why it changed.
- Prefer natural language over short codes, unexplained abbreviations, or vague labels.
- Keep the title concise, but meaningful when read on its own.
- Add a commit body when the title alone cannot explain the context, motivation, or important consequences.
- Use English for commit messages to stay consistent with the repository's canonical language.
- Do not use a commit hash as a substitute for the commit title when describing a change in documentation or conversation. If a hash is useful for navigation, include it only as secondary reference after the descriptive message.

Good examples:

- `Add German article roadmap for localized publication planning`
- `Remove misplaced Russian architecture document from the article roadmap`
- `Clarify facade responsibilities and keep application logic out of UI components`

Avoid examples such as:

- `docs`
- `update file`
- `fix`
- `Commit ede430b`

The goal is for the commit history to communicate the project's evolution without requiring readers to open every diff.

## Code Examples and Cross-Language Consistency

**All code examples in the Workshop must be written in English and must remain identical across every language edition of an article. This is a mandatory editorial rule.**

- Write all source-code comments, string literals, sample values, mock data, labels, messages, expected output, identifiers, and other content inside code examples in English.
- Do not translate, localize, or otherwise adapt code examples when preparing Russian, German, or other language editions.
- Reuse the same canonical code blocks verbatim in every language edition. The code, comments, literal values, formatting, and language identifier must remain identical; only the explanatory prose outside code blocks may be translated.
- If an example contains user-facing text, keep that text in English as well. Explain its meaning in the surrounding localized prose when necessary.
- When an example must differ because of a genuine technical or platform constraint, do not silently localize it. Document the reason and keep the difference to the smallest necessary scope.
- Before publication, compare all language editions and verify that their code blocks match exactly and contain no non-English comments, string literals, sample values, or output.

This rule applies to every article, code sample, configuration fragment, command-line example, test, and translation in the Workshop. It is not optional and takes precedence over language-specific localization of code examples.

## Editorial Continuity and Avoiding Repetition

Every new publication must build on the material already published in the Workshop rather than repeat it.

- Before outlining or writing an article, review the relevant previously published articles and project materials. Identify topics, explanations, examples, and author stories that have already been covered.
- Do not repeat explanations, arguments, or personal stories that have already appeared in earlier publications.
- When a concept has already been explained, briefly refer readers to the earlier article where it was covered, then move on to the new aspect. Do not reproduce the earlier explanation.
- Focus each new publication on new examples, technical observations, practical findings, and architectural conclusions.
- Do not introduce personal or biographical stories merely to create an opening. Use them only when they add genuinely new context or are essential to the article's technical argument.
- Treat this as an editorial review requirement, not as a prohibition on revisiting important concepts. A concept may be revisited when the new article examines a meaningfully different angle, deeper implication, or practical application; make that distinction explicit.
- Before finalizing the outline, compare it with the relevant earlier publications and adjust sections that would otherwise duplicate their content.

The objective is a coherent body of publications in which each article contributes something new while remaining connected to the Workshop's broader architectural narrative.

## Article Branching and Versioning

Each article must be developed on a dedicated Git branch whose name corresponds to the article title.

- Use the article title as the branch name, replacing spaces with hyphens where necessary.
- If an article requires multiple branches to demonstrate successive implementation stages, append `+` followed by the branch number within that article. For example: `NX-Workspace+1`, `NX-Workspace+2`.
- Each branch represents a distinct stage of the article's practical implementation.
- At the end of the article, include a section listing the relevant branch names and their corresponding GitHub URLs.
- Branch links must point to actual branches in the repository and must be verified before publication.

The purpose of this convention is to let readers navigate the implementation history of each article and inspect the code at each stage.

## Reverse Synchronization from Article Branches to main

Reverse synchronization means bringing selected documentation from an article or working branch back into `main`. It is a selective documentation operation, not a branch merge.

**The only files permitted in a reverse synchronization are:**

- `articles/index.md`
- `articles/index.ru.md`
- `articles/index.de.md`
- `articles/SUBTITLES.md`
- `CONTRIBUTING.md`, only when the synchronization rules themselves need to be updated.

**Do not bring any other files from the working branch into `main`.** In particular, this excludes article bodies and translations, article notes and drafts, application source code, tests, screenshots, build or workspace configuration, and other project files. The fact that such files are present in the working branch does not make them eligible for reverse synchronization.

When synchronizing an allowed file:

- Compare the working-branch version with the current `main` version before editing.
- Preserve independent changes already present in `main`; do not blindly replace a whole file when the two versions contain different valid information.
- Reconcile only the relevant navigation, numbering, subtitle, or editorial-rule content.
- Keep the three language indexes structurally equivalent and preserve the agreed publication order.
- Verify article numbering, section anchors, repository paths, publication URLs, and branch links.
- Inspect the final diff and confirm that every changed path is on the allowlist above. If any other path appears, stop and remove it from the reverse-synchronization change.

Never merge the entire working branch into `main` for the purpose of reverse synchronization. Transfer only the explicitly allowed files.

## Strict Task Scope and Change Authorization

**A task authorizes changes only to the explicitly named entities and the behavior directly required to fulfill that task. This is a strict boundary, not a suggestion.**

- Do not modify neighboring or adjacent entities merely because they are nearby, related, convenient, or appear architecturally connected.
- Do not change unrelated services, storage mechanisms, authentication behavior, login persistence, routes, guards, UI behavior, configuration, contracts, or data models unless the user explicitly includes them in the task.
- A request to replace one persistence mechanism for a specific data collection authorizes changes only to that collection's persistence path. It does not authorize changing where credentials, login names, preferences, or other data are stored.
- Do not expand the task, refactor adjacent code, clean up unrelated implementation, or introduce additional features based on assumptions or personal preference.
- If completing the requested task appears to require touching an entity or behavior that the user did not name, stop before making that change. Explain exactly which neighboring entity would be affected, why the change appears necessary, and ask the user for explicit authorization.
- When in doubt about whether a file, service, data key, API, or behavior is within scope, treat it as out of scope and ask first.
- Before committing, inspect the diff and verify that every changed entity is directly within the user's requested scope. Revert or separate any unauthorized collateral changes.
- These restrictions apply to code, tests, documentation, configuration, data migrations, and repository maintenance.

The user defines the task boundary. The contributor or agent must not redefine it.
