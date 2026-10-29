# Editorial Rules for Architecture Article Notes

## Source of truth and workflow
- GitHub is the source of truth for current article files, branches, and publication state. Always fetch the target file and branch before editing.
- Make real repository changes; never report a change as complete until the write succeeds and the resulting file has been fetched and checked.
- Keep article work scoped to branches belonging to that article. Verify branch names and URLs before adding links.
- Do not claim an article is published without evidence of publication.
- For changes that affect multiple language indexes, update and validate all three indexes in the same task.

## Article content
- Articles are full technical texts. Translations must preserve the source's explanations, commands, configuration, code examples, caveats, and official documentation links. Do not silently summarize or omit sections.
- Do not put a table of contents (TOC) inside article README files. Article section navigation belongs in the language indexes.
- Preserve code blocks and executable snippets exactly unless a technical correction is explicitly required. Keep code comments in English where the source rule requires it.
- Verify heading hierarchy, fenced code block counts, URLs, paths, commands, and language consistency before writing.
- Do not conflate similarly named articles such as NX Fundamentals and NX Workspace.

## Index structure
Each article entry in articles/index.md, articles/index.ru.md, and articles/index.de.md must use the same structure. Only the language of headings and link labels may differ:
1. Article title in the index language.
2. Repository materials with links to English, Russian, and German README files.
3. Article contents with links to the section anchors for that language.
4. GitHub branches listing only branches belonging to this article.
Do not add status lines or unrelated branch history inside an article entry. Keep the three indexes structurally aligned.

## Work stages
1. Verify source and target branch state.
2. Prepare or revise the source article.
3. Translate English and German in full from the approved source.
4. Compare translations against the source, especially technical fragments and section coverage.
5. Update all three indexes consistently.
6. Fetch the written files again and validate them.
7. Update the current article passport with verified state, completed checks, and the next step.
