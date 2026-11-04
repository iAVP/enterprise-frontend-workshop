# Индекс статей

Этот файл — **единственный источник истины для нумерации статей серии** Enterprise Frontend Workshop.

Номер статьи определяется её местом в редакционной последовательности. Он не зависит от даты публикации, порядка обсуждения в чатах, этапов дорожной карты или количества Git-веток.

## Список статей

| № | Статья | Основная Git-ветка | Статус |
|---:|---|---|---|
| 1 | The Road to Architecture | — | Опубликована |
| 2 | NX Workspace: From Architecture to Tooling | — | Опубликована |
| 3 | Architecture in Practice: Decisions Behind Enterprise Frontend Systems | — | Опубликована |
| 4 | NX Fundamentals — Building an Enterprise Frontend Workspace from Scratch | — | Опубликована |
| 5 | Development Tools | — | Опубликована |
| 6 | Angular in Depth | `Angular-in-Depth` | Завершена |
| 7 | Эволюция Angular и архитектурного мышления разработчика | `Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking` | Историческая часть завершена; техническая часть в разработке |
| 8 | TypeScript and Architectural Thinking — From C# Principles to Enterprise Frontend Development | `TypeScript-and-Architectural-Thinking-From-CSharp-Principles-to-Enterprise-Frontend-Development` | Запланирована |

Subtitle для опубликованных материалов ведутся отдельно, чтобы не перегружать индекс: [Article Subtitles](./SUBTITLES.md).

## Статья №7 — этапы реализации

Статья №7 развивается последовательно в нескольких ветках. Суффиксы `+1`, `+2` обозначают этапы одной статьи, а не отдельные статьи.

| Ветка | Назначение | Статус |
|---|---|---|
| `Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking` | Завершённая историческая часть статьи | Завершена |
| `Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking+1` | Практическая реализация Facades и Signals без Effect; формы доходов и расходов — отдельные страницы | В работе |
| `Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking+2` | Следующий этап: Modal Dialogs и обоснованное применение Effect | Создана |

## Статья №8 — TypeScript and Architectural Thinking — From C# Principles to Enterprise Frontend Development

Статья запланирована. Рабочее название и номер утверждены; черновик ещё не начат.

- [Рабочие заметки на русском](TypeScript-and-Architectural-Thinking-From-CSharp-Principles-to-Enterprise-Frontend-Development/notes.ru.md)
- [GitHub-ветка статьи](https://github.com/iAVP/enterprise-frontend-workshop/tree/TypeScript-and-Architectural-Thinking-From-CSharp-Principles-to-Enterprise-Frontend-Development)

## Правила нумерации и Git

1. Перед обсуждением номера статьи сверяться с этим индексом.
2. Не использовать номер этапа дорожной карты как номер статьи.
3. Не выводить номер статьи из названия или суффикса Git-ветки.
4. Если статья развивается в нескольких ветках, сохранять её номер и название; к имени ветки добавлять `+` и номер этапа.
5. Не создавать отдельную статью для очередного этапа реализации, если это продолжение материала той же статьи.
6. После утверждения нового материала добавлять его в этот список и обновлять статус.
7. Реестр публикаций в `README.ru.md` фиксирует фактическую хронологию публикаций. Он не заменяет этот индекс и не определяет номера статей.

**Важно:** статья №7 — это `Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking`. Ветки `+1` и `+2` относятся именно к ней. Не создавать для этих этапов отдельную статью с новым номером.
