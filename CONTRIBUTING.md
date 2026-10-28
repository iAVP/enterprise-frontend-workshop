# Contribution Guidelines

These guidelines apply to changes made to the Enterprise Frontend Workshop repository.

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

## Article Branching and Versioning

Each article must be developed on a dedicated Git branch whose name corresponds to the article title.

- Use the article title as the branch name, replacing spaces with hyphens where necessary.
- If an article requires multiple branches to demonstrate successive implementation stages, append `+` followed by the branch number within that article. For example: `NX-Workspace+1`, `NX-Workspace+2`.
- Each branch represents a distinct stage of the article's practical implementation.
- At the end of the article, include a section listing the relevant branch names and their corresponding GitHub URLs.
- Branch links must point to actual branches in the repository and must be verified before publication.

The purpose of this convention is to let readers navigate the implementation history of each article and inspect the code at each stage.

## Article Languages and Localization

English is the canonical language for the full technical articles. Localized versions must preserve the technical meaning, implementation details, and conclusions of the canonical article.

### German full article

- `README.de.md` is the **complete German translation** of the corresponding article, not a short summary or promotional adaptation.
- Preserve the original article's structure, explanations, technical depth, code examples, commands, links, caveats, and implementation results.
- Do not omit theoretical explanations or shorten sections merely to make the German version more concise.
- German wording may be adapted for natural, idiomatic technical writing, but the substance and level of detail must remain equivalent to the canonical article.
- Where useful, explain technical concepts and engineering trade-offs clearly; do not invent implementation details or results that are not supported by the project.

### LinkedIn and Xing announcements

- LinkedIn and Xing posts are **announcements of the article**, not full translations of it.
- An announcement must be substantial enough to provide useful context on its own. Do not make it extremely short or reduce it to a couple of sentences followed by a link.
- Introduce the problem or motivation, explain the key ideas or engineering decisions, and tell readers what they can learn from the full article.
- Include enough technical substance to make the post worthwhile while leaving the full walkthrough, detailed explanations, and code examples to the article.
- Adapt the framing and wording to the professional audience of each platform, while keeping technical claims consistent with the canonical article.
- Include the article link when it is available and verified.

In short: `README.de.md` contains the complete German article; LinkedIn and Xing contain meaningful, sufficiently detailed German announcements that invite readers to continue to the full article.
