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

## NX Project and Library Conventions

Apply these conventions whenever creating or updating NX projects in this workshop. These are repository-level architecture rules, not merely suggestions for the article.

### Workspace-level common resources

- The `common/` directory belongs at the workspace root. It must not be nested inside an application under `apps/`.
- Put shared global styles under `common/styles/` and environment configuration files under `common/environments/`.
- Reference the global stylesheet from the application build configuration in that application's `project.json`; do not treat the stylesheet as application-local source by default.
- The non-E2E application must support `dev`, `test`, and `prod` environment modes, with the corresponding environment files located in `common/environments/`. The E2E project is not required to have these application environment modes.
- `common/environments/common.ts` must export `export const COMMON = {};`. Each environment file must import `COMMON` from `common/environments/common` (using the correct relative path) and expose `common = COMMON` alongside its standard environment properties.
- Public and protected class members (methods and properties), as well as every class, must have English comments. Apply this consistently when creating or changing code.

### Application project tags

- Every application-related NX project, including the main application and its E2E project, must include the shared level tag `level:app` in its `project.json` `tags` array.
- Every application-related project must also include a project-specific tag in the form `app:<application-name>`, using the exact NX project name from `project.json`.
- Use the exact NX project name declared in that project's `project.json` `name` field. For example, the `personal-finance` application uses `"tags": ["level:app", "app:personal-finance"]`.
- Apply both tags to separately configured application-related projects such as E2E projects as well, using their exact project name (for example, `"tags": ["level:app", "app:personal-finance-e2e"]`).

### Shared libraries and required tags

- Create reusable shared libraries under `libs/shared/<library-name>`.
- Every library under `libs/shared` must include the `level:shared` tag in the `project.json` `tags` array.
- Every individual library must also include `tag:<library-name>`, using the exact project name from that library's `project.json` `name` field.
- Therefore, a shared project named `facades` must include both `level:shared` and `tag:facades`, for example: `"tags": ["level:shared", "tag:facades"]`.
- Do not create a library under `libs/shared` without both required tags. Additional tags may be added when an agreed architecture rule requires them.
- When generating libraries with NX, verify the resulting `project.json` explicitly; directory location alone does not apply tags automatically.

### NX module boundaries and allowed imports

Use the following tags to classify projects and enforce allowed dependency directions. Every app-related project must have `level:app`; shared libraries must have `level:shared` plus their library-specific tag.

| Importing project tag | Allowed dependency tags | Rationale |
| --- | --- | --- |
| `level:app` | `tag:facades`, `tag:definitions`, `tag:base` | Applications use application-facing services and stable shared contracts/utilities, but must not bypass facades to call the data-access layer directly. |
| `tag:facades` | `tag:dal`, `tag:base`, `tag:definitions` | Facades orchestrate application operations and may coordinate data access while relying on foundational helpers and contracts. |
| `tag:definitions` | `tag:base` only | Definitions remain foundational; allowing them to depend on facades or data access would invert the dependency direction and risk cycles. |
| `tag:dal` | `tag:base`, `tag:definitions` | Data-access code may use foundational utilities and shared contracts, but must not depend on application orchestration. |
| `tag:base` | No other shared-library tags | Base is the lowest-level shared layer and must not depend on higher-level libraries. |

The `app:<project-name>` tag identifies a specific app-related project; it does not replace `level:app`. The E2E project receives the common app-level tag for classification, but its test tooling and configuration should remain separate from the application's runtime environment setup.

Enforce these rules through the NX `@nx/enforce-module-boundaries` ESLint rule, using `depConstraints` keyed by `sourceTag` and `onlyDependOnLibsWithTags`. Check the actual ESLint configuration before claiming the constraints are enforced: documentation and tags alone do not block imports.

### Shared library TypeScript path aliases

Register a stable alias for each shared library in the root `tsconfig.base.json` under `compilerOptions.paths`. Use the required `@workshop:<library-name>` format and point each alias to the library's public entry point:

```json
{
  "compilerOptions": {
    "paths": {
      "@workshop:facades": ["libs/shared/facades/src/index.ts"],
      "@workshop:dal": ["libs/shared/dal/src/index.ts"],
      "@workshop:base": ["libs/shared/base/src/index.ts"],
      "@workshop:definitions": ["libs/shared/definitions/src/index.ts"]
    }
  }
}
```

Add an alias when each library is created and ensure the target entry-point file exists. Import public APIs through these aliases rather than using relative paths that reach into another library's source tree. Path aliases make imports stable; they do not enforce dependency boundaries by themselves.

### NX module boundaries and allowed imports

Enforce the dependency rules in the root `eslint.config.mjs` using `@nx/enforce-module-boundaries` and `depConstraints`:

- `level:app` may depend on `tag:facades`, `tag:definitions`, and `tag:base`.
- `tag:facades` may depend on `tag:dal`, `tag:base`, and `tag:definitions`.
- `tag:definitions` may depend only on `tag:base`.
- `tag:dal` may depend on `tag:base` and `tag:definitions`.
- `tag:base` may not depend on other workspace projects.

The project-specific `app:<project-name>` tag identifies an app-related project; it does not replace the shared `level:app` tag. All application-related projects, including E2E projects, must have `level:app`.

These restrictions keep application code from bypassing facades, keep the data-access layer independent of orchestration, and preserve `base` as the lowest-level shared library. When changing project tags or adding a library, update and verify the ESLint constraints accordingly.

### Shared library TypeScript path aliases

Register public entry-point aliases in root `tsconfig.base.json` under `compilerOptions.paths`, using the format `@workshop:<library-name>`. The initial aliases are:

- `@workshop:facades` → `libs/shared/facades/src/index.ts`
- `@workshop:dal` → `libs/shared/dal/src/index.ts`
- `@workshop:base` → `libs/shared/base/src/index.ts`
- `@workshop:definitions` → `libs/shared/definitions/src/index.ts`

Add or update the alias when creating, renaming, or moving a library. Ensure the referenced `src/index.ts` exists and exports the public API. Use these aliases instead of reaching into another library's source through relative paths. Aliases improve import stability but do not enforce module boundaries; ESLint does that.

### Shared library responsibilities

The initial planned shared libraries are:

- `facades`: API-facing/application services and service contracts. Keep UI logic that belongs to a specific frontend framework out of this library.
- `dal`: data-access services for retrieving and persisting data from the backend and other sources.
- `base`: foundational functionality intended to be available throughout the application, such as helpers for text internationalization.
- `definitions`: shared constants, facade contracts, types, enums, records, and framework-independent functions; `abstracts` for TypeScript abstract classes; and `classes` for ordinary classes. Keep this library foundational and avoid dependency cycles or dependencies on higher-level features.

Keep these responsibilities distinct. Do not move framework-specific UI behavior into shared libraries simply because multiple parts of the system need related functionality.

## Article Index and Publication Status

The files `articles/index.md`, `articles/index.ru.md`, and `articles/index.de.md` are the primary navigation and status records for the article series. They list articles, link to the relevant language versions, and indicate whether each article is planned or published.

- Keep all three indexes in sync when adding, renaming, reorganizing, or publishing an article.
- Mark an article as **Published** only after the publication is live, and include the verified publication URL.
- Treat `articles/README.md`, `articles/README.ru.md`, and `articles/README.de.md` as the editorial roadmap describing planned topics and learning order. They do not replace the indexes as the source of truth for publication status.

## Table of Contents Placement

Do **not** include a table of contents inside any article text file (`README.md`, `README.ru.md`, or `README.de.md`). Article text is copied to external publishing platforms, some of which do not support or preserve an embedded table of contents.

Keep navigation in the language-specific index files only:
- Each `articles/index.md`, `articles/index.ru.md`, and `articles/index.de.md` starts with a table of contents for all articles.
- Each article entry in those index files contains its own section-level table of contents with links to headings in the corresponding article file.
- The article files themselves begin with the title and article content; omit the article-level TOC from all three language versions.

When preparing or editing an article, remove any existing embedded TOC from all language versions while preserving the title, introduction, section headings, and body text.

## Article Index Entry Format

Every article entry in each language-specific index must follow the same structure. Localize the article title and the table-of-contents labels to the language of that index; keep the language-link labels exactly as specified below.

1. Start each index with a **table of contents listing all articles** in the series, in the agreed publication order.
2. For each article, include:
   1. The article title in the language of the current index.
   2. A nested **Repository materials** subsection containing links to all three language versions, in this order:
      - [englisch](relative-path-to-README.md) — English file: `README.md`
      - [русский](relative-path-to-README.ru.md) — Russian file: `README.ru.md`
      - [deutsch](relative-path-to-README.de.md) — German file: `README.de.md`
   3. A nested **article table of contents** containing links to the article's sections. Use the headings from the corresponding language version and verify that each anchor points to the correct section.
   4. A **GitHub branches** subsection listing the branches relevant to that article, with verified links to the actual branches in the repository. If the article uses multiple implementation stages, list every relevant branch and identify its stage. Do not invent branch names or URLs.

Use this outline for each article entry (translate the structural headings for the index language, but preserve the three language-link labels exactly):

```markdown
## 1. Article title in the index language

### Repository materials
[englisch](path/to/README.md) | [русский](path/to/README.ru.md) | [deutsch](path/to/README.de.md)

### Article contents
- [Section heading](path/to/README.md#section-anchor)
- [Another section](path/to/README.md#another-section)

### GitHub branches
- [Branch name](verified-branch-url)
```

The index-level table of contents at the top must list every article and link to its article entry below. The per-article table of contents is separate: it navigates the sections inside that article. Keep the English, Russian, and German indexes structurally equivalent, with localized article titles and section headings, the same article order, and matching repository and branch destinations.

## Identical Structure Across Language Indexes

The three index files (`articles/index.md`, `articles/index.ru.md`, and `articles/index.de.md`) must use the **same structure**, not merely similar content.

For every index:
- Use the same top-level sections, in the same order: index title and introduction, index-wide table of contents, each article entry in the agreed order, related technical article entry (if present), and editorial rules.
- Give every article entry the same heading hierarchy and the same fields in the same order: status/publication information, repository materials, article contents, and GitHub branches. Publication links may appear before repository materials when they exist, but their placement must be identical across all three indexes.
- Include the same set of articles and related articles in the same order. Localize headings, status text, article titles, and section labels; do not add or omit structural sections in one language.
- List all three repository files in the exact order and with the exact link labels `englisch`, `русский`, `deutsch`.
- Build each article's section-level table of contents from the headings in the corresponding language version of that article. Link to that language's file, and verify every anchor against the actual heading. Do not mix another language's section list into the current index.
- If an article has no text yet, keep the same “Article contents” section and state that headings are not available yet; do not remove the section.
- List only verified branches relevant to the article. If no dedicated branch exists, explicitly say so rather than linking an unrelated branch.
- Before committing, compare all three indexes side by side and verify that their heading hierarchy, article count/order, and required fields match exactly, allowing only localized wording and language-specific article headings to differ.

A difference in language must never result in a different information architecture for the index files.

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
