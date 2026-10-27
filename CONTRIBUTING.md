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

## Article Index and Publication Status

The files `articles/index.md`, `articles/index.ru.md`, and `articles/index.de.md` are the primary navigation and status records for the article series. They list articles, link to the relevant language versions, and indicate whether each article is planned or published.

- Keep all three indexes in sync when adding, renaming, reorganizing, or publishing an article.
- Mark an article as **Published** only after the publication is live, and include the verified publication URL.
- Treat `articles/README.md`, `articles/README.ru.md`, and `articles/README.de.md` as the editorial roadmap describing planned topics and learning order. They do not replace the indexes as the source of truth for publication status.

## Article Directory and File Naming

Each article must have its own directory directly under `articles/`. Name the directory after the article title, using a readable title slug with words separated by hyphens. Keep the same directory name across all language versions.

Each article directory must contain exactly these three language entry files:

- `README.md` — English version. English is the default language and must not use an `EN` suffix.
- `README.ru.md` — Russian version.
- `README.de.md` — German version.

Do not use names such as `README.en.md`, `article.en.md`, or language-specific alternative filenames. Preserve the language convention consistently for existing and new article directories.

## Article Branching and Versioning

Each article must be developed on a dedicated Git branch whose name corresponds to the article title.

- Use the article title as the branch name, replacing spaces with hyphens and keeping the title wording recognizable. For example, `NX Fundamentals: Building an Enterprise Frontend Workspace from Scratch` becomes `NX-Fundamentals-Building-an-Enterprise-Frontend-Workspace-from-Scratch`.
- If an article requires multiple branches to demonstrate successive implementation stages, append `+` followed by the branch number within that article. For example: `NX-Workspace+1`, `NX-Workspace+2`.
- Each branch represents a distinct stage of the article's practical implementation.
- At the end of the article, include a section listing the relevant branch names and their corresponding GitHub URLs.
- Branch links must point to actual branches in the repository and must be verified before publication.

The purpose of this convention is to let readers navigate the implementation history of each article and inspect the code at each stage.
