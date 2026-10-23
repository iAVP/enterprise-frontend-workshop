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
