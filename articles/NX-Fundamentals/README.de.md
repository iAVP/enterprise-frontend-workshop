# NX Fundamentals — Aufbau eines NX Workspace

**Status:** In Arbeit. Dieser Artikel setzt [NX Workspace — von der Architektur zu den Werkzeugen](../NX-Workspace/README.de.md) fort: Wir bereiten das architektonische Grundgerüst des Workspace vor, bevor wir die fachliche Implementierung beginnen. Damit lernen wir erste Ansätze kennen, die auch in DDD verwendet werden; Domain-Driven Design und seine Prinzipien behandeln wir jedoch separat in einem anderen Artikel. Den Workspace und die Angular-Anwendung erstellen wir nicht erneut.

## NX-Workspace-Konzepte und Projektorganisation

Der vorherige Artikel hat erklärt, warum ein NX Workspace sinnvoll ist und wie darin eine Angular-Anwendung mit einem separaten E2E-Projekt erstellt wird. Diesen Schritt betrachten wir als abgeschlossen und arbeiten mit dem bestehenden Workspace weiter.

Für die weitere Arbeit müssen drei Begriffe unterschieden werden:

- **Workspace** — die Arbeitsumgebung und ihre gemeinsame Konfiguration.
- **Project** — eine von NX erkennbare Einheit, etwa eine Anwendung, eine Bibliothek oder ein E2E-Projekt.
- **Target** — eine benannte Aufgabe eines Projekts, beispielsweise Build, Start oder Test.

In diesem Repository sind `personal-finance` und `personal-finance-e2e` zwei eigenständige NX-Projekte mit unterschiedlichen Verantwortlichkeiten und verfügbaren Aufgaben. Welche Targets vorhanden sind, hängt von der Konfiguration und den Plugins ab. Es ist daher nicht davon auszugehen, dass jedes Projekt dieselben Targets `build`, `test` und `lint` besitzt.

Dokumentation: [NX-Projektkonfiguration](https://nx.dev/reference/project-configuration).

### Die Hilfsverzeichnisse `.angular/` und `.nx/`

Neben `apps/`, `libs/` und Konfigurationsdateien können nach der Installation von Abhängigkeiten und der Ausführung von Werkzeugen Hilfsverzeichnisse im Workspace entstehen. Sie enthalten Cache-Dateien, Zwischendaten oder lokale Informationen, die von Entwicklungswerkzeugen benötigt werden, gehören aber normalerweise nicht zum Quellcode des Projekts.

**`.angular/` enthält Hilfsdaten der Angular CLI.** Dazu kann ein Build-Cache gehören, mit dem Ergebnisse wiederverwendet und spätere Läufe beschleunigt werden. Der Inhalt hängt von der Version der Angular CLI und der Projektkonfiguration ab. Das Verzeichnis kann normalerweise gelöscht werden: Bei der nächsten Ausführung erstellen die Werkzeuge die benötigten Daten erneut. Das Leeren des Caches kann den ersten anschließenden Lauf verlangsamen, sollte aber keinen Anwendungscode entfernen.

**`.nx/` enthält Hilfsdaten von NX.** In unserer `.gitignore` sind die folgenden Unterverzeichnisse ausdrücklich ausgeschlossen:

- `.nx/cache` — Cache der NX-Task-Ergebnisse. Wenn sich die Eingaben einer Aufgabe nicht geändert haben, kann NX ein früheres Ergebnis wiederverwenden, statt die Aufgabe erneut auszuführen.
- `.nx/workspace-data` — lokale Workspace-Daten, die NX für seine Arbeit und die Projektanalyse verwendet.
- `.nx/migrate-runs` — Daten zu NX-Migrationsläufen.

Diese Verzeichnisse werden von Git ausgeschlossen, weil sie generierte oder lokale Daten enthalten, die nicht erforderlich sind, um den Quellcode auf einem anderen Rechner wiederherzustellen. Ihr Inhalt kann sich zwischen Entwicklern und Umgebungen unterscheiden; bei Bedarf lässt sich der Cache neu erstellen. Diese Hilfsdaten dürfen nicht mit NX-Konfigurationsdateien wie `nx.json`, `project.json` und `tsconfig.base.json` verwechselt werden: Die Konfiguration bestimmt das Projektverhalten und gehört ins Repository.

Die `.gitignore` im Repository-Stamm schließt außerdem Folgendes aus:

- `.idea/` — Einstellungen und Metadaten der IDEs WebStorm/IntelliJ, die häufig vom jeweiligen Rechner oder den persönlichen Vorlieben abhängen;
- `node_modules/` — installierte Abhängigkeiten, die anhand der Paketmanifestdateien und der Lockdatei des Paketmanagers wiederhergestellt werden;
- `dist/` — Build-Ergebnisse, die durch einen erneuten Build erzeugt werden können;
- `__screenshots__/` — lokal erzeugte Screenshots, die in diesem Projekt nicht als Quelldateien gelten.

Der Zweck von `.gitignore` ist nicht, beliebige unbequeme Dateien zu verbergen, sondern generierte Artefakte und lokale Daten aus der Versionshistorie herauszuhalten. Quellcode, Einstellungen, die Lockdatei und alle weiteren Dateien, die für reproduzierbare Teamarbeit erforderlich sind, müssen weiterhin versioniert werden.

Weitere Informationen: [Angular-CLI-Cache](https://angular.dev/cli/cache) und [NX-Task-Caching](https://nx.dev/features/cache-task-results).

## `apps/` und `libs/` organisieren: common und shared

In dieser Phase erstellen wir keine Sammlung abstrakter Bibliotheken „für später“. Stattdessen legen wir die minimale Struktur fest, die die weitere Entwicklung von Personal Finance leiten soll. Dazu müssen wir nicht nur vereinbaren, wo Anwendungen und Bibliotheken liegen, sondern auch, welchen Zweck gemeinsame Ressourcen und NX-Projekttags haben.

### `apps/` für Anwendungen und `common/` für Workspace-Ressourcen

Im Verzeichnis `apps/` liegen eigenständige Anwendungen und die dazugehörigen Testprojekte. Unsere zentrale Angular-Anwendung trägt den NX-Projektnamen `personal-finance`. Das separate E2E-Projekt `personal-finance-e2e` überprüft Benutzerszenarien im Browser. Es handelt sich um zwei verschiedene NX-Projekte, die jedoch zum selben Produkt gehören.

Das Verzeichnis `common/` liegt **im Stammverzeichnis des Workspace**, auf derselben Ebene wie `apps/` und `libs/`. Es gehört nicht zur Anwendung und darf nicht unter `apps/personal-finance/` abgelegt werden. Dort speichern wir gemeinsame Ressourcen, die über die Anwendungskonfiguration eingebunden werden.

Zielstruktur:

```text
common/
├── styles/
│   └── common.scss
└── environments/
    ├── common.ts
    ├── environment.dev.ts
    ├── environment.test.ts
    └── environment.prod.ts
apps/
├── personal-finance/
│   ├── project.json
│   └── src/
│       └── app/
└── personal-finance-e2e/
```

Gemeinsame Styles liegen in `common/styles/common.scss` und werden getrennt von den Styles der Anwendung eingebunden. In `apps/personal-finance/project.json` wird zuerst `apps/personal-finance/src/styles.scss` und danach `common/styles/common.scss` angegeben. So bleibt die Trennung erhalten: Die erste Datei ist für anwendungsspezifische Styles zuständig, die zweite für workspaceweite Styles. Das Verzeichnis `common` liegt im Workspace-Stamm.

Für die Hauptanwendung müssen drei Umgebungsmodi vorgesehen werden: `dev`, `test` und `prod`. Die entsprechenden Dateien werden unter `common/environments/` angelegt. Diese Anforderung gilt für die Anwendung, nicht für das E2E-Projekt. Die Auswahl der Datei muss ausdrücklich in den Targets/Konfigurationen der Anwendung eingerichtet und mit den verwendeten Angular-/NX-Versionen abgestimmt werden.

Die Datei `common/environments/common.ts` exportiert eine gemeinsame Konstante:

```typescript
export const COMMON = {};
```

Jede Environment-Datei importiert diese Konstante und exportiert sie über die Eigenschaft `common`; die üblichen Umgebungseigenschaften bleiben erhalten:

```typescript
import { COMMON } from './common';

export const environment = {
  production: false,
  common: COMMON,
};
```

Dies veranschaulicht die Form der Konfiguration und ist nicht der vollständige Inhalt aller drei Dateien. Die Werte der Standardattribute müssen zur jeweiligen Umgebung passen. Für `dev`, `test` und `prod` sind separate Dateien mit passenden Werten anzulegen; außerdem muss die Dateiauswahl für Start und Build konfiguriert werden.

Die Dokumentation des Codes ist verpflichtend: **Alle Klassen sowie alle ihre öffentlichen oder geschützten Methoden und Eigenschaften müssen auf Englisch dokumentiert werden.** Kommentare sollen den Zweck einer Klasse oder eines Members erklären und nicht lediglich dessen Namen wiederholen.

### `common/` erstellen und gemeinsame Ressourcen einbinden

Wir verschieben nun Ressourcen in den Workspace-Stamm, die über die Anwendungskonfiguration eingebunden werden sollen, statt innerhalb der Anwendung gespeichert zu bleiben. Alle folgenden Befehle werden im Repository-Stamm ausgeführt.

Zuerst erstellen wir die Verzeichnisse:

```bash
mkdir -p common/styles common/assets common/environments
```

Die Datei `apps/personal-finance/src/styles.scss` bleibt an ihrem Platz: Sie enthält die Styles der Anwendung selbst. Für die gemeinsamen Workspace-Styles erstellen wir eine separate Datei:

```bash
mkdir -p common/styles
 touch common/styles/common.scss
```

Falls gemeinsame Regeln bereits existieren, verschieben Sie sie nach `common/styles/common.scss`, ohne die Stylesheet-Datei der Anwendung zu verschieben oder umzubenennen.

Derzeit befindet sich nur eine Datei in `apps/personal-finance/public/`: `favicon.ico`. Wir verschieben sie direkt nach `common/assets/`. Das Favicon ist eine gemeinsame Workspace-Ressource und kann künftig von mehreren Anwendungen verwendet werden.

```bash
mv apps/personal-finance/public/favicon.ico common/assets/favicon.ico
rmdir apps/personal-finance/public
```

Suchen Sie in `apps/personal-finance/src/index.html` das vorhandene Element `<link rel="icon" ...>` und ändern Sie dessen `href` auf den Pfad zur Ressource im Website-Stamm:

```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

Wenn das ursprüngliche Element weitere Attribute besitzt, behalten Sie diese bei und ändern Sie nur `href`. Da `common/assets/` im Folgenden so konfiguriert wird, dass die Dateien im Stamm des Build-Ausgabeverzeichnisses veröffentlicht werden, bleibt `favicon.ico` unter `/favicon.ico` erreichbar.

Die resultierende Struktur der gemeinsamen Ressourcen:

```text
common/
├── assets/
│   └── favicon.ico         # Shared workspace favicon
├── styles/
│   └── common.scss         # Shared workspace styles
└── environments/
    ├── common.ts           # Values shared by all environments
    ├── environment.dev.ts
    ├── environment.test.ts
    └── environment.prod.ts
```

Das Verzeichnis `common/assets/` enthält statische Ressourcen, die über `assets` in der `project.json` der Anwendung eingebunden werden. Es ist keine TypeScript-Bibliothek: Angular kopiert diese Dateien in das Build-Ergebnis, und die Anwendung kann sie über URLs aufrufen. Das gemeinsame `favicon.ico` liegt im Stamm von `common/assets/` und wird unter `/favicon.ico` veröffentlicht; der Link in `index.html` muss auf diesen Pfad verweisen.

#### Umgebungskonfigurationen erstellen

Wir erstellen das gemeinsame Objekt und drei Environment-Dateien. Das gemeinsame Objekt bleibt vorerst absichtlich leer: Hier sollen später nur Einstellungen ergänzt werden, die tatsächlich für alle Modi gelten.

`common/environments/common.ts`:

```typescript
export const COMMON = {};
```

`common/environments/environment.dev.ts`:

```typescript
import { COMMON } from './common';

export const environment = {
  production: false,
  common: COMMON,
};
```

`common/environments/environment.test.ts`:

```typescript
import { COMMON } from './common';

export const environment = {
  production: false,
  common: COMMON,
};
```

`common/environments/environment.prod.ts`:

```typescript
import { COMMON } from './common';

export const environment = {
  production: true,
  common: COMMON,
};
```

Diese Beispiele legen eine einheitliche Konfigurationsform fest. Einstellungen, die sich zwischen Umgebungen unterscheiden, können später zu `common` hinzugefügt werden. Geheimnisse gehören jedoch nicht hierher: Alles, was in ein Frontend-Build gelangt, ist für den Browserbenutzer zugänglich.

In diesem Ansatz dient `environment.prod.ts` als Basisdatei, die von der Anwendung importiert wird. Die Konfigurationen `development` und `test` ersetzen sie über `fileReplacements` durch die jeweilige Datei. Daher sollte der Anwendungscode `environment` aus `common/environments/environment.prod` importieren, anstatt an jeder Verwendungsstelle manuell eine Datei auszuwählen.

#### `apps/personal-finance/project.json` aktualisieren

Pfade zu Styles und statischen Ressourcen beziehen sich auf den Workspace-Stamm. Konfigurieren Sie `assets` und `styles` unter `build.options` wie folgt. Die Styles der Anwendung und die gemeinsamen Styles werden als getrennte Einträge und in genau dieser Reihenfolge eingebunden:

```json
"assets": [
  {
    "glob": "**/*",
    "input": "common/assets",
    "output": "/"
  }
],
"styles": [
  "apps/personal-finance/src/styles.scss",
  "common/styles/common.scss"
]
```

`output: "/"` bedeutet, dass Dateien aus `common/assets/` im Stamm der Website veröffentlicht werden. Beispielsweise ist `common/assets/images/logo.svg` unter `/images/logo.svg` erreichbar, so als läge die Datei unter `apps/personal-finance/public/images/logo.svg`.

Fügen Sie nun die Umgebungen zu `build.configurations` hinzu. Die vorhandenen Einstellungen für `production` und `development` müssen erhalten bleiben und um `fileReplacements` ergänzt werden. Fügen Sie außerdem die Konfiguration `test` hinzu:

```json
"configurations": {
  "production": {
    "fileReplacements": [],
    "budgets": [
      {
        "type": "initial",
        "maximumWarning": "500kb",
        "maximumError": "1mb"
      },
      {
        "type": "anyComponentStyle",
        "maximumWarning": "4kb",
        "maximumError": "8kb"
      }
    ],
    "outputHashing": "all"
  },
  "development": {
    "fileReplacements": [
      {
        "replace": "common/environments/environment.prod.ts",
        "with": "common/environments/environment.dev.ts"
      }
    ],
    "optimization": false,
    "extractLicenses": false,
    "sourceMap": true
  },
  "test": {
    "fileReplacements": [
      {
        "replace": "common/environments/environment.prod.ts",
        "with": "common/environments/environment.test.ts"
      }
    ],
    "optimization": false,
    "extractLicenses": false,
    "sourceMap": true
  }
}
```

Im Production-Modus ist kein Austausch erforderlich, da die Basisdatei bereits `environment.prod.ts` heißt. Das leere Array `fileReplacements` kann weggelassen werden; es dient hier nur der Veranschaulichung. Wenn Sie den Ausschnitt in eine vorhandene Datei einfügen, legen Sie keinen zweiten Schlüssel `configurations` an und entfernen Sie keine anderen aktuellen Projekteinstellungen.

Damit `nx serve personal-finance --configuration=test` die neue Konfiguration verwendet, ergänzen Sie das folgende Element im Target `serve`:

```json
"test": {
  "buildTarget": "personal-finance:build:test"
}
```

Die vorhandenen Konfigurationen `development` und `production` bleiben unverändert. Anschließend können die Varianten explizit gestartet werden:

```bash
npx nx build personal-finance --configuration=development
npx nx build personal-finance --configuration=test
npx nx build personal-finance --configuration=production

npx nx serve personal-finance --configuration=development
npx nx serve personal-finance --configuration=test
npx nx serve personal-finance --configuration=production
```

Dies sind Build-Konfigurationen der Anwendung. Das Target `test`, das Unit-Tests ausführt, ist eine separate Aufgabe und wird nicht automatisch zur Umgebung `build:test`. Die Konfiguration des Test-Runners muss bei Bedarf entsprechend dem verwendeten Executor abgestimmt werden.

Prüfen Sie die resultierende Konfiguration und die Builds:

```bash
npx nx show project personal-finance
npx nx build personal-finance --configuration=development
npx nx build personal-finance --configuration=test
npx nx build personal-finance --configuration=production
```

#### Die Anwendung mit `serve` starten

Nach dem Verschieben der Ressourcen prüfen Sie nicht nur den Build, sondern auch die Anwendung im Browser. Führen Sie im Workspace-Stamm Folgendes aus:

```bash
npx nx serve personal-finance
```

Standardmäßig verwendet das Target `serve` die Konfiguration `development`. Öffnen Sie nach erfolgreichem Start die im Terminal angezeigte Adresse (in der aktuellen Konfiguration üblicherweise [http://localhost:4200](http://localhost:4200)).

Geben Sie die gewünschte Umgebung ausdrücklich an, wenn Sie eine bestimmte Konfiguration prüfen möchten:

```bash
npx nx serve personal-finance --configuration=development
npx nx serve personal-finance --configuration=test
npx nx serve personal-finance --configuration=production
```

Stellen Sie sicher, dass die Anwendung ohne Fehler lädt, globale Styles angewendet werden und das Favicon angezeigt wird. Prüfen Sie in den Browser-Entwicklertools, ob eine Anfrage an `/favicon.ico` erfolgreich beantwortet wird. Beenden Sie den lokalen Server mit `Ctrl+C` im Terminal.

Dokumentation: [Angular-Workspace-Konfiguration — Assets, Styles und File-Replacements](https://angular.dev/reference/configs/workspace-config), [Angular Build](https://angular.dev/cli/build) und [NX-Projektkonfiguration](https://nx.dev/docs/reference/project-configuration).

### `libs/shared/`: Gemeinsame Bibliotheken mit klaren Verantwortlichkeiten

Unter `libs/` liegen eigenständige NX-Bibliotheken. In dieser Phase verwenden wir `libs/shared` für Bibliotheken, die von mehreren Anwendungsteilen genutzt werden sollen und, wo möglich, unabhängige Grenzen gegenüber Frameworks bewahren.

Die erste Auswahl umfasst vier Bibliotheken:

```text
libs/
└── shared/
    ├── facades/
    ├── dal/
    ├── base/
    └── definitions/
        ├── abstracts/   # Abstract TypeScript classes
        └── classes/     # Regular classes
```

Dies sind vier eigenständige NX-Projekte und nicht einfach vier Codeverzeichnisse. Jedes Projekt benötigt eine eigene Konfiguration und ausdrücklich definierte Tags. Die vorab angelegten Bibliotheken markieren erwartete Verantwortungsgrenzen, bedeuten aber nicht, dass wir jede Bibliothek sofort mit zahlreichen Klassen füllen müssen. Zunächst erstellen wir die erforderliche Struktur und minimale Einstiegspunkte; die Implementierung ergänzen wir, sobald Anforderungen entstehen.

#### Bibliotheken mit NX-Befehlen generieren

Erstellen Sie die vier Bibliotheken vom Workspace-Stamm aus. In diesem Projekt verwenden wir den Generator `@nx/js:lib`: Er eignet sich für gemeinsame TypeScript-Bibliotheken, die keine Angular-Komponenten oder andere frameworkspezifische Elemente benötigen. `npx nx g` ist die Kurzform von `npx nx generate`.

Während der Generierung fragt NX möglicherweise, welchen Bundler es für den Bibliotheks-Build verwenden soll. In dieser Phase wählen wir **`none`**: Solange wir das Architekturgrundgerüst erstellen und Abhängigkeiten konfigurieren, benötigen wir keine separate Build-Konfiguration für jede interne Bibliothek. Dies ist eine bewusste Vereinfachung und keine Aussage, dass ein Bundler niemals erforderlich sein wird. Falls wir später eine Bibliothek als eigenständiges Paket veröffentlichen oder separat bauen müssen, können wir die Entscheidung anhand des Lieferformats und der Projektanforderungen überprüfen.

**Bundler und Test-Runner sind unterschiedliche Werkzeuge.** Die Auswahl von `none` beim Build der Bibliothek bedeutet nicht, dass auf Tests verzichtet wird. Für Unit-Tests planen wir **Vitest**, sofern die ausgewählte NX-Version und der Generator die benötigte Konfiguration unterstützen. Fragt der Generator separat nach einem Test-Runner, wählen Sie Vitest. Gibt es diese Frage nicht, richten Sie Tests in einem separaten Schritt ein und prüfen Sie die erzeugten Targets und Konfigurationsdateien. Gehen Sie nicht davon aus, dass Vitest allein durch eine erfolgreiche Bibliotheksgenerierung automatisch eingerichtet wurde.

Führen Sie die Befehle nacheinander aus und prüfen Sie nach jeder Generierung die erzeugte `project.json`:

```bash
npx nx g @nx/js:lib libs/shared/facades --tags="level:shared,tag:facades"
npx nx g @nx/js:lib libs/shared/dal --tags="level:shared,tag:dal"
npx nx g @nx/js:lib libs/shared/base --tags="level:shared,tag:base"
npx nx g @nx/js:lib libs/shared/definitions --tags="level:shared,tag:definitions"
```

Wenn die verwendete Generatorversion zusätzliche Parameter abfragt, wählen Sie Einstellungen, die zum aktuellen Workspace passen, und gleichen Sie das Ergebnis mit den folgenden Regeln ab. Die Befehle veranschaulichen die gewünschte Struktur, ersetzen aber nicht die Prüfung der erzeugten Dateien.

Jedes Projekt benötigt:
- einen erwarteten NX-Projektnamen, der dem Bibliotheksnamen entspricht;
- die Tags `level:shared` und `tag:<project-name>`;
- einen öffentlichen Einstiegspunkt `src/index.ts` für `facades`, `dal` und `base`;
- einen Alias in der zentralen `tsconfig.base.json`, der den Repository-Konventionen entspricht.

Für `definitions` verwenden wir ausschließlich kategoriespezifische öffentliche Einstiegspunkte: `libs/shared/definitions/src/lib/<category>/index.ts`. In dieser Architektur darf es **keine gemeinsame Datei `libs/shared/definitions/src/index.ts`** geben. Dadurch lassen sich einzelne Kategorien über separate Aliase importieren, ohne ein einziges Barrel für alle Definitionen anzulegen.

Erstellen Sie sieben Kategorien samt `index.ts` vom Repository-Stamm aus:

```bash
#!/usr/bin/env bash
set -euo pipefail

base="libs/shared/definitions/src/lib"
categories=(constants abstracts classes enums types interfaces records)

for category in "${categories[@]}"; do
  mkdir -p "${base}/${category}"
  cat > "${base}/${category}/index.ts" <<EOF
/**
 * Public exports for shared ${category}.
 * Add explicit exports when files are introduced.
 */
export {};
EOF
done
```

Das Skript erstellt nur die Kategorie-Einstiegspunkte. Sobald echte Dateien in einer Kategorie vorhanden sind, ersetzen Sie `export {}` durch explizite Exporte existierender Dateien, zum Beispiel `export * from './account.type';`. Verwenden Sie nicht `export * from './';`: Dieser Pfad verweist auf dasselbe Verzeichnis zurück und kann eine zyklische Referenz erzeugen.

Der Generator `@nx/js:lib` kann außerdem die Startdateien `definitions.ts` und `definitions.spec.ts` erstellen. In dieser Architektur werden sie nicht benötigt: Anstelle eines einzigen Startmoduls verwenden wir Kategorien mit separaten `index.ts`-Dateien. Löschen Sie beide generierten Dateien vollständig. Falls der Generator sie im Standardverzeichnis `src/lib/` abgelegt hat, führen Sie im Workspace-Stamm Folgendes aus:

```bash
rm -f libs/shared/definitions/src/lib/definitions.ts
rm -f libs/shared/definitions/src/lib/definitions.spec.ts
```

Falls Ihre Generatorversion diese Dateien an einem anderen Ort erstellt hat, entfernen Sie die generierten Dateien `definitions.ts` und `definitions.spec.ts` innerhalb des Projekts `libs/shared/definitions/` an ihrem tatsächlichen Speicherort. Löschen Sie nicht die Kategorie-Dateien `src/lib/<category>/index.ts`: Sie sind die öffentlichen Einstiegspunkte.

Prüfen Sie, ob sieben Kategorie-Einstiegspunkte existieren und kein gemeinsamer Einstiegspunkt vorhanden ist:

```bash
find libs/shared/definitions/src/lib -maxdepth 2 -type f -name 'index.ts' -print
test ! -f libs/shared/definitions/src/index.ts
```

Unter Windows verwenden Sie Git Bash oder WSL, um dieses Bash-Skript auszuführen. Die Kategorie-Aliase in `tsconfig.base.json` müssen auf `libs/shared/definitions/src/lib/<category>/index.ts` verweisen:

- `@workshop:def:consts` → `libs/shared/definitions/src/lib/constants/index.ts`
- `@workshop:def:abstracts` → `libs/shared/definitions/src/lib/abstracts/index.ts`
- `@workshop:def:classes` → `libs/shared/definitions/src/lib/classes/index.ts`
- `@workshop:def:enums` → `libs/shared/definitions/src/lib/enums/index.ts`
- `@workshop:def:types` → `libs/shared/definitions/src/lib/types/index.ts`
- `@workshop:def:interfaces` → `libs/shared/definitions/src/lib/interfaces/index.ts`
- `@workshop:def:records` → `libs/shared/definitions/src/lib/records/index.ts`

Prüfen Sie nach der Generierung die erkannten Projekte und den Graphen:

```bash
npx nx show projects
npx nx graph
```

Der Generator kann Konfigurationen aktualisieren und Dateien hinzufügen, kennt aber nicht alle architektonischen Konventionen dieses Repositorys. Prüfen Sie daher die Namen und Tags in jeder `project.json`, stellen Sie sicher, dass die Aliase auf vorhandene Dateien verweisen, und fahren Sie erst dann mit der Implementierung fort. Importgrenzen werden separat in der zentralen ESLint-Konfiguration mit `@nx/enforce-module-boundaries` festgelegt.

**`facades` — Anwendungsdienste und API-Fassaden.** Hier liegen Dienste, über die die Anwendung mit APIs interagiert und Anwendungsoperationen nutzt. Eine Fassade kann Aufrufe koordinieren und einen komfortablen Vertrag für Verbraucher bereitstellen, darf aber keine UI-Logik enthalten, die für ein bestimmtes Frontend-Framework spezifisch ist. Beispielsweise gehören eine Angular-Komponente, ihr Template, UI-Zustand oder Darstellungscode nicht allein deshalb in die gemeinsame Fassadenbibliothek, weil mehrere Ansichten sie verwenden.

**`dal` — Data Access Layer.** Diese Bibliothek ist für den Zugriff auf Daten aus verschiedenen Quellen zuständig: Backend-APIs sowie weitere externe oder interne Quellen. Hier werden die technischen Mechanismen für das Lesen und Speichern von Daten, die Transformation von Quellantworten und die entsprechenden technischen Verträge gebündelt. Der Datenzugriff muss von der UI getrennt werden; Transportlogik sollte nicht in Komponenten dupliziert werden. Die genaue Abhängigkeitsrichtung zwischen `facades` und `dal` ist beim Entwurf der Verträge gesondert festzulegen, damit keine Zyklen entstehen.

**`base` — gemeinsame grundlegende Funktionalität.** Hier liegen grundlegende Fähigkeiten, die in der gesamten Anwendung benötigt werden und keiner einzelnen Funktion zugeordnet sind. Ein Beispiel sind gemeinsame Hilfsfunktionen für die Internationalisierung von Texten. Verschieben Sie nicht beliebigen Code hierher, nur weil er „gemeinsam“ ist: Die Verantwortung dieser Bibliothek muss klein und nachvollziehbar bleiben.

**`definitions` — gemeinsame Definitionen und Verträge.** Dazu gehören Konstanten, Typen, Enums, Records, Interfaces, Vertragstypen der Fassaden sowie Funktionen, die unabhängig von UI und Frameworks sind. Das Verzeichnis `abstracts/` ist für abstrakte TypeScript-Klassen vorgesehen, `classes/` für gewöhnliche Klassen. Die Bibliothek soll Definitionen und Basisklassen bereitstellen, die von mehreren Projekten benötigt werden, und nicht zum Ablageort für die Implementierung sämtlicher Dienste werden. Vertragsdefinitionen können sowohl von Fassaden als auch von Datenzugriffsschichten verwendet werden. Daher muss die Bibliothek grundlegend bleiben und darf nicht von höherliegenden Bibliotheken abhängen.

Das Wort „gemeinsam“ allein ist kein ausreichender Grund, Code in eine Bibliothek auszulagern. Bei der Auswahl müssen die gebündelte Verantwortung, die Verbraucher und die erlaubten Abhängigkeiten klar sein. Gehört eine Funktion zu einer bestimmten Ansicht oder einem bestimmten Feature, sollte sie nicht allein zur Wiederverwendung nach `libs/shared` verschoben werden.

### Verbindliche NX-Projekttags

Damit der NX-Graph und spätere Regeln für Architekturgrenzen auf Konventionen aufbauen können, muss jedes Projekt Tags in seiner `project.json` besitzen. Das Verzeichnis auf der Festplatte vergibt keine Tags von selbst: Prüfen Sie beim Anlegen eines Projekts die tatsächliche Konfiguration.

**Jedes Anwendungsprojekt und sein zugehöriges E2E-Projekt** benötigen den gemeinsamen Tag `level:app` sowie einen individuellen Tag `app:<project-name>`. Der Name stammt aus dem Feld `name` derselben `project.json`. Für die Anwendung `personal-finance` sieht das beispielsweise so aus:

```json
{
  "name": "personal-finance",
  "projectType": "application",
  "tags": ["level:app", "app:personal-finance"]
}
```

Für das separate E2E-Projekt `personal-finance-e2e` lauten die Tags `["level:app", "app:personal-finance-e2e"]`. Der gemeinsame Tag `level:app` ermöglicht Regeln für Projekte auf Anwendungsebene sowohl auf die Anwendung als auch auf das E2E-Projekt anzuwenden; `app:<project-name>` unterscheidet sie voneinander.

**Jede Bibliothek innerhalb von `libs/shared`** muss zwei Tags besitzen:

- `level:shared` — zeigt an, dass das Projekt zur gemeinsamen Ebene gehört;
- `tag:<library-name>` — ein individueller Tag, dessen Name mit dem Feld `name` in `project.json` übereinstimmt.

Das Projekt der Bibliothek `facades` muss beispielsweise Folgendes enthalten:

```json
{
  "name": "facades",
  "projectType": "library",
  "tags": ["level:shared", "tag:facades"]
}
```

Dasselbe Prinzip gilt für `dal`, `base` und `definitions`: Jede Bibliothek behält `level:shared` und erhält zusätzlich den individuellen Tag `tag:dal`, `tag:base` beziehungsweise `tag:definitions`. Weitere Tags sind möglich, sofern sie ausdrücklich vereinbarten Architekturregeln entsprechen.

Tags klassifizieren Projekte zunächst nur. Sie verhindern unerwünschte Abhängigkeiten nicht automatisch. Erlaubte Import-Richtungen und ihre Begründung werden im nächsten Abschnitt definiert. Damit die Einschränkungen tatsächlich greifen, müssen sie in ESLint mit der NX-Regel `@nx/enforce-module-boundaries` konfiguriert werden.

Damit speichert `common/` im Workspace-Stamm gemeinsame Ressourcen auf Workspace-Ebene, während `libs/shared/*` eigenständige Bibliotheken mit klaren Verantwortlichkeiten und Tags enthält. Diese Trennung ermöglicht die Weiterentwicklung der Struktur, ohne Anwendungsressourcen, UI-Logik und gemeinsame technische Verträge zu vermischen.

## NX Module Boundaries: Regeln für Abhängigkeiten

Tags beschreiben die Rolle eines NX-Projekts; **Module Boundaries** schränken dagegen die Abhängigkeitsrichtungen zwischen Projekten ein. Das Ziel ist nicht, Importe komplizierter zu machen, sondern Architekturgrenzen zu bewahren: Die Anwendung soll Fassaden nicht umgehen und nicht direkt auf die Datenschicht zugreifen; grundlegende Bibliotheken dürfen nicht von anwendungsnahen Bibliotheken abhängen.

In unserem Workspace gelten folgende Regeln:

| Quellprojekt | Erlaubte Dependency-Tags | Begründung |
| --- | --- | --- |
| `level:app` | `tag:facades`, `tag:definitions`, `tag:base` | Die Anwendung verwendet Anwendungsfassaden, gemeinsame Verträge und grundlegende Funktionen, greift aber nicht direkt auf die DAL zu. |
| `tag:facades` | `tag:dal`, `tag:base`, `tag:definitions` | Fassaden koordinieren Anwendungsoperationen, verwenden den Datenzugriff und stützen sich auf gemeinsame Verträge und grundlegende Funktionalität. |
| `tag:definitions` | Nur `tag:base` | Definitionen bleiben eine niedrig liegende Schicht. Sie dürfen weder Fassaden noch Datenzugriff kennen. |
| `tag:dal` | `tag:base`, `tag:definitions` | Die Datenschicht darf gemeinsame Verträge und Hilfsfunktionen verwenden, aber nicht von der Anwendungsorchestrierung abhängen. |
| `tag:base` | Keine Workspace-Projekte | `base` ist vollständig isoliert: Es importiert keine anderen Workspace-Projekte, weder bestehende noch zukünftige. |

Warum ist das wichtig?

- **Die Anwendung hängt von Fassaden ab, nicht von der Implementierung der Datenspeicherung.** Andernfalls kennen Komponenten und Anwendung Details der APIs und Datenquellen, und Änderungen an der Implementierung betreffen zu viel Code.
- **Fassaden koordinieren Interaktionsabläufe.** Sie können auf die DAL zugreifen und Operationen zusammenführen, während sie Details der Datenquellen vor Verbrauchern verbergen.
- **Definitions dürfen keine Anwendungsschichten nach sich ziehen.** Sonst verlieren gemeinsame Typen und Verträge ihre Rolle als stabile Grundlage; zirkuläre Abhängigkeiten können entstehen und Wiederverwendung wird schwieriger.
- **Die DAL hängt von Verträgen und grundlegenden Werkzeugen ab, nicht von Fassaden.** So bleibt die technische Datenschicht unabhängig davon, wer ihre Methoden aufruft und warum.
- **Base bleibt eine vollständig isolierte Grundlage.** `base` darf kein anderes Workspace-Projekt importieren — weder `definitions`, `dal`, `facades`, Anwendungen noch zukünftige Projekte. Diese Regel ist bewusst streng: Das Fundament darf keine externen Verträge, Fachdomaindetails oder Anwendungsmechanismen hineinziehen. Benötigt eine Funktion eine Abhängigkeit zu einem anderen Projekt, gehört sie in eine andere Schicht; die Einschränkung soll nicht abgeschwächt werden.

Die Einschränkungen werden in der zentralen `eslint.config.mts` mit der NX-Regel `@nx/enforce-module-boundaries` und dem Array `depConstraints` konfiguriert: Für jedes `sourceTag` wird eine erlaubte Liste `onlyDependOnLibsWithTags` angegeben. Unzulässige Abhängigkeiten sollten zu einem Lint-Fehler führen. Nach dem Hinzufügen oder Umbenennen eines Projekts sind seine Tags zu prüfen und Lint auszuführen, damit NX-Graph und Regeln es wie erwartet klassifizieren.

### Einheitliche Erweiterung für ESLint-Konfigurationen: `.mts`

In diesem Workspace verwenden wir die Erweiterung `.mts` für alle drei ESLint-Flat-Konfigurationsdateien: die zentrale Konfiguration sowie die Konfigurationen der Anwendung und des E2E-Projekts. Die Erweiterung `.mts` kennzeichnet ein TypeScript-Modul im ES-Modules-Format und passt zu Konfigurationen wie `vitest.config.mts`. Es handelt sich um eine Konvention für das Dateiformat; allein das Umbenennen ändert keine Lint-Regeln.

ESLint 9 benötigt im normalen Node.js-Modus das Paket `jiti`, um eine TypeScript-Konfiguration mit der Endung `.mts` zu laden. Installieren Sie es als Dev-Abhängigkeit:

```bash
npm install --save-dev jiti
```

Benennen Sie alle drei Dateien um, damit Referenzen und Konventionen konsistent bleiben:

```bash
git mv eslint.config.mjs eslint.config.mts
git mv apps/personal-finance/eslint.config.mjs apps/personal-finance/eslint.config.mts
git mv apps/personal-finance-e2e/eslint.config.mjs apps/personal-finance-e2e/eslint.config.mts
```

Aktualisieren Sie in beiden Projektkonfigurationen den Import der zentralen Konfiguration. In `apps/personal-finance/eslint.config.mts` und `apps/personal-finance-e2e/eslint.config.mts` muss er auf `../../eslint.config.mts` verweisen:

```typescript
import baseConfig from "../../eslint.config.mts";
```

Alle übrigen Regeln und Importe bleiben unverändert. Prüfen Sie nach dem Umbenennen, ob die Konfigurationen geladen werden und die Lint-Targets funktionieren:

```bash
npx nx lint personal-finance
npx nx lint personal-finance-e2e
```

Führen Sie den zweiten Befehl aus, wenn für das E2E-Projekt ein `lint`-Target konfiguriert ist. Falls ESLint meldet, dass die Konfiguration nicht gefunden oder geladen werden kann, prüfen Sie Dateinamen, relative Importpfade und ob `jiti` in `package.json` und der Lockdatei vorhanden ist. Wenn im gesamten Workspace `.mts` verwendet werden soll, dürfen nicht einige Konfigurationen bei `.mjs` verbleiben.

Der Tag `app:<project-name>` identifiziert ein bestimmtes anwendungsbezogenes Projekt und ersetzt nicht den gemeinsamen Tag `level:app`. Das E2E-Projekt erhält `level:app` zur Klassifizierung auf Workspace-Ebene; seine Testkonfiguration bleibt jedoch von den Runtime-Environment-Einstellungen der Anwendung getrennt.

Dokumentation: [Module Boundaries erzwingen](https://nx.dev/features/enforce-module-boundaries).

## Shared-Bibliotheken und TypeScript-Path-Aliase erstellen

Beim Erstellen jeder Bibliothek unter `libs/shared/` müssen nicht nur das NX-Projekt und die erforderlichen Tags eingerichtet werden, sondern auch ein öffentlicher Alias in der zentralen `tsconfig.base.json` registriert werden. So kann die öffentliche API der Bibliothek über einen stabilen Namen statt über lange relative Pfade importiert werden.

Für `facades`, `dal` und `base` werden separate Aliase im Format `@workshop:<library-name>` verwendet, die jeweils auf das eigene `src/index.ts` der Bibliothek verweisen. Für `definitions` gibt es kein gemeinsames `src/index.ts`: Jede Kategorie besitzt eine eigene `index.ts` unter `libs/shared/definitions/src/lib/<category>/`, und importiert wird über einen separaten Alias `@workshop:def:<category>`. Falls der Bibliotheksgenerator `libs/shared/definitions/src/index.ts` angelegt hat, löschen Sie diese Datei: Die öffentliche API von `definitions` ist über separate Kategorie-Einstiegspunkte organisiert, daher wird kein gemeinsames Barrel benötigt. Die `index.ts`-Dateien innerhalb der Kategorien bleiben bestehen.

```json
{
  "compilerOptions": {
    "paths": {
      "@workshop:facades": ["./libs/shared/facades/src/index.ts"],
      "@workshop:dal": ["./libs/shared/dal/src/index.ts"],
      "@workshop:base": ["./libs/shared/base/src/index.ts"],
      "@workshop:def:consts": ["./libs/shared/definitions/src/lib/constants/index.ts"],
      "@workshop:def:abstracts": ["./libs/shared/definitions/src/lib/abstracts/index.ts"],
      "@workshop:def:classes": ["./libs/shared/definitions/src/lib/classes/index.ts"],
      "@workshop:def:enums": ["./libs/shared/definitions/src/lib/enums/index.ts"],
      "@workshop:def:types": ["./libs/shared/definitions/src/lib/types/index.ts"],
      "@workshop:def:interfaces": ["./libs/shared/definitions/src/lib/interfaces/index.ts"],
      "@workshop:def:records": ["./libs/shared/definitions/src/lib/records/index.ts"],
      "base": ["./libs/shared/base/src/index.ts"],
      "dal": ["./libs/shared/dal/src/index.ts"],
      "facades": ["./libs/shared/facades/src/index.ts"]
    }
  }
}
```

Jeder Kategorie-Alias muss auf den öffentlichen Einstiegspunkt `src/lib/<category>/index.ts` zeigen. Die Bibliothek `definitions` hat keine gemeinsame `src/index.ts`; der Verbrauchercode verwendet die konkreten Aliase `@workshop:def:<category>`. Beim Hinzufügen einer Kategorie legen Sie ihr Verzeichnis und die `index.ts` an, ergänzen einen Alias in `tsconfig.base.json` und exportieren nur die für Verbraucher vorgesehene API.

Solange die Kategorien leer sind, behalten Sie in jeder Kategorie-`index.ts` einen vorläufigen, kompilierbaren Stub. Verwenden Sie nicht `export * from './';`: Dieser Pfad verweist auf dasselbe Verzeichnis und kann eine zyklische Referenz erzeugen.

Für `libs/shared/definitions/src/lib/types/index.ts`:

```typescript
/**
 * Public exports for shared type definitions.
 * Add exports here when types are introduced.
 */
export {};
```

Verwenden Sie für die übrigen Kategorien dasselbe Muster und passen Sie den Kommentar an:
- `constants/index.ts` — shared constants;
- `abstracts/index.ts` — shared abstract classes;
- `classes/index.ts` — shared classes;
- `enums/index.ts` — shared enums;
- `types/index.ts` — shared type definitions;
- `interfaces/index.ts` — shared interfaces;
- `records/index.ts` — shared records.

Sobald reale Dateien in einer Kategorie vorhanden sind, ersetzen Sie den vorläufigen Stub durch explizite Exporte existierender Dateien, zum Beispiel `export * from './account.type';`.

**Wichtig:** In der Bibliothek `definitions` darf es keine gemeinsame Datei `libs/shared/definitions/src/index.ts` geben. Löschen Sie sie, falls der NX-Generator sie erstellt hat. Diese Regel betrifft nur den Einstiegspunkt der Bibliothek selbst; die Kategorie-`index.ts`-Dateien unter `src/lib/<category>/` werden benötigt und müssen erhalten bleiben.

Da in diesem Workspace `baseUrl` nicht gesetzt ist, beginnen alle Pfadwerte in `paths` mit `./`; andernfalls kann TypeScript den Fehler `TS5090` melden.

Beispielimporte:

```typescript
import { SomeType } from '@workshop:def:types';
import { SomeConstant } from '@workshop:def:consts';
```

Importieren Sie keine internen Dateien einer anderen Bibliothek über relative Pfade: Verbraucher sollen deren öffentliche API verwenden. Path-Aliase sorgen für bequeme und stabile Pfade, **ersetzen aber keine** Module Boundaries und verhindern für sich genommen keine unzulässigen Abhängigkeiten.

## Projektkonfiguration und Targets

NX muss wissen, welche Projekte zum Workspace gehören und welche Operationen für sie verfügbar sind. Diese Informationen ergeben sich aus der Projektkonfiguration und den installierten Werkzeugen. Je nach eingesetzten Plugins können einige Targets ausdrücklich in Konfigurationsdateien definiert sein, während andere anhand der Projekteinstellungen automatisch erkannt werden.

Ein **Target** ist eine benannte Aufgabe, die für ein Projekt ausgeführt werden kann. Ein Projekt kann beispielsweise Targets für Build, Start, Tests oder Code-Style-Prüfungen bereitstellen. Es ist nicht davon auszugehen, dass jedes Projekt dieselbe Menge an Targets besitzt: Das hängt vom Zweck und von der Konfiguration des Projekts ab.

Die aufgelöste Konfiguration eines konkreten Projekts lässt sich mit NX anzeigen:

```bash
npx nx show project personal-finance
```

Der Befehl zeigt, wie NX das Projekt `personal-finance` erkennt, einschließlich der verfügbaren Targets. Das ist hilfreicher, als nur aus Dateinamen zu schließen oder bei jedem Projekt automatisch `build`, `test` und `lint` zu erwarten.

Die Workspace-Konfiguration und die Konfiguration einzelner Projekte dürfen nicht verwechselt werden. Die Datei `nx.json` enthält Einstellungen für den Workspace und das allgemeine Verhalten von NX. Die Projektkonfiguration beschreibt ein konkretes Projekt und seine Aufgaben. Sie kann in `project.json` stehen oder durch die von Plugins verwendeten Mechanismen zur Konfigurationserkennung bereitgestellt werden.

Damit wird die Konfiguration zu einer Schnittstelle zwischen Projekt und Entwicklungswerkzeugen. Entwickler und CI können daraus entnehmen, welche Aktionen verfügbar sind; NX verwendet sie, um deren Ausführung zu koordinieren.

Dokumentation: [NX-Workspace-Konfiguration](https://nx.dev/reference/nx-json) und [NX-Projektkonfiguration](https://nx.dev/reference/project-configuration).

## Wie NX Projekte erkennt und Aufgaben ausführt

Wenn das Repository wächst, ist es sinnvoll, zunächst herauszufinden, welche Projekte NX tatsächlich erkennt, statt eine Liste manuell zu pflegen. Führen Sie dazu Folgendes aus:

```bash
npx nx show projects
```

Der Befehl listet die Projekte auf, die NX im aktuellen Workspace erkannt hat. Das ist ein guter Ausgangspunkt, um ein Repository kennenzulernen oder nach Konfigurationsänderungen zu prüfen. Die Verzeichnisstruktur erklärt die Organisation des Codes; die NX-Projektliste zeigt dagegen, mit welchen Einheiten NX tatsächlich arbeiten kann.

Sobald der Projektname bekannt ist, kann seine Konfiguration separat angezeigt werden:

```bash
npx nx show project personal-finance
```

Aufgaben werden über den Projektnamen und das Target gestartet. Die allgemeine Form lautet:

```bash
npx nx run personal-finance:build
```

Hier ist `personal-finance` der Projektname und `build` das Target. Der Befehl funktioniert nur, wenn dieses Target für das Projekt existiert und konfiguriert ist. Prüfen Sie daher zuerst die verfügbare Konfiguration und starten Sie anschließend die benötigte Aufgabe.

Dieser Ansatz skaliert mit dem Repository: Wenn ein Projekt die entsprechende Aufgabe über NX bereitstellt, müssen nicht alle Details eines bestimmten Bundlers oder Testwerkzeugs bekannt sein. NX ersetzt die Werkzeuge selbst jedoch nicht, sondern koordiniert ihre Ausführung anhand der Konfiguration und der installierten Plugins.

## Anwendung starten, bauen, testen und linten

In der täglichen Entwicklung werden verschiedene Prüfungen eingesetzt, weil jede eine andere Frage beantwortet:

- **Anwendung starten** ermöglicht die Überprüfung während der Entwicklung.
- **Build** prüft, ob sich das Projekt mit der aktuellen Konfiguration bauen lässt.
- **Unit-Tests** prüfen einzelne Verhaltensbestandteile.
- **Lint** erkennt Probleme mit statischen Analyse-Regeln und Code-Stil.
- **E2E-Tests** prüfen Benutzerszenarien über die Anwendung und ihre Umgebung.

NX bietet eine einheitliche Möglichkeit, diese Aktionen über Projekt-Targets auszuführen. Wenn ein Projekt die entsprechenden Targets konfiguriert hat, können die Befehle beispielsweise so aussehen:

```bash
npx nx run personal-finance:build
npx nx run personal-finance:test
npx nx run personal-finance:lint
```

Dies sind Syntaxbeispiele und keine Behauptung, dass jedes Projekt alle drei Targets besitzt. Die verfügbaren Befehle müssen anhand der tatsächlichen Projektkonfiguration bestimmt werden. Für E2E-Prüfungen wird ein separates Projekt verwendet. Ermitteln Sie daher zuerst dessen genauen Namen und Targets mit `npx nx show projects` und `npx nx show project <project-name>`.

### Praktische npm-Skripte in `package.json` ergänzen

NX-Befehle können direkt über `npx nx` gestartet werden. Häufig ist es jedoch bequemer, häufig verwendeten Operationen kurze Namen in der zentralen `package.json` zu geben. Das schafft einen gemeinsamen Einstiegspunkt für Entwickler und CI: Die Startdetails liegen im Repository und nicht in persönlichen Notizen.

Ergänzen Sie im Stamm-`package.json` ein Objekt `scripts` oder erweitern Sie das vorhandene Objekt, ohne andere Skripte zu entfernen:

```json
{
  "scripts": {
    "serve": "nx serve personal-finance",
    "build": "nx build personal-finance",
    "build:all": "nx run-many -t build",
    "build:prod": "nx build personal-finance --configuration=production",
    "test": "nx run-many -t test",
    "lint": "nx run-many -t lint",
    "nx:graph": "nx graph",
    "affected": "nx affected -t lint test build"
  }
}
```

Bedeutung der Befehle:

- `npm run serve` — startet die Hauptanwendung Personal Finance im Entwicklungsmodus.
- `npm run build` — baut die Anwendung `personal-finance`.
- `npm run build:all` — führt das Target `build` für Projekte aus, in denen es konfiguriert ist; es wird nicht vorausgesetzt, dass jedes Projekt einen Build besitzt.
- `npm run build:prod` — baut die Anwendung mit der Production-Konfiguration.
- `npm test` — führt `test`-Targets für Projekte aus, bei denen sie verfügbar sind.
- `npm run lint` — führt Lint für Projekte aus, für die das entsprechende Target konfiguriert ist.
- `npm run nx:graph` — öffnet die Visualisierung des Projektgraphen.
- `npm run affected` — führt Lint, Tests und Builds für Projekte aus, die NX aufgrund der Änderungen als betroffen einstuft.

Die Skripte `build:all`, `test` und `lint` verwenden `nx run-many`, weil dieselbe Aufgabe über mehrere Projekte hinweg ausgeführt werden soll. Das Skript `build` ist absichtlich auf die Hauptanwendung begrenzt. Wenn nur ein einzelnes Projekt geprüft werden soll, verwenden Sie weiterhin gezielte Befehle wie `npx nx lint personal-finance`.

Der Befehl `affected` hängt vom Git-Vergleichsbereich ab. Stellen Sie bei lokalen Läufen sicher, dass die Basisrevision verfügbar und für die Aufgabe geeignet ist. In CI werden üblicherweise die Basisrevision des Zielbranches und die aktuelle Revision explizit angegeben. Zum Beispiel:

```bash
npx nx affected -t lint test build --base=origin/main --head=HEAD
```

Ersetzen Sie `origin/main`, wenn der Zielbranch in Ihrem Workflow anders heißt. Sie können ein separates npm-Skript mit einem festen Basisbranch ergänzen; vermeiden Sie aber eine feste Vorgabe, wenn lokale und CI-Szenarien unterschiedliche Basen verwenden.

Prüfen Sie nach dem Ergänzen der Skripte, ob ihre Namen zu den tatsächlichen Projekt-Targets passen. Fehlt ein Target, kann NX diese Aufgabe für das entsprechende Projekt nicht ausführen. Prüfen Sie zuerst die Konfiguration mit `npx nx show project <project-name>`.

Der Zweck dieses Abschnitts ist nicht, die Befehlsliste aus dem vorherigen Artikel zu wiederholen. Wichtig ist das NX-Modell: Ein Befehl adressiert ein bestimmtes Projekt und dessen Target; NX führt die entsprechende Aufgabe unter Berücksichtigung von Konfiguration und Abhängigkeiten aus.

Das bietet eine einheitliche Schnittstelle für lokale Entwicklung und Automatisierung. Ein gemeinsamer Befehl garantiert jedoch weder die Qualität der Tests noch korrektes Linting oder vollständige Prüfungen. Zweck und Qualität hängen weiterhin von der Konfiguration und den technischen Entscheidungen des Teams ab.

## Projektgraph und Task-Graph

Mit zunehmendem Umfang des Workspace wird es wichtiger, nicht nur die vorhandenen Projekte, sondern auch ihre Beziehungen zu verstehen. NX erstellt einen **Projektgraphen**, der erkannte Abhängigkeiten zwischen Projekten darstellt. Er lässt sich mit folgendem Befehl öffnen:

```bash
npx nx graph
```

Der Graph hilft dabei, den Workspace zu untersuchen und praktische Fragen zu beantworten: Welche Projekte verwenden diese Bibliothek? Welche Systemteile können von Änderungen an gemeinsamem Code betroffen sein? Ist eine Bibliothek zu einem Abhängigkeitspunkt für einen zu großen Teil der Anwendung geworden?

Der Graph allein entscheidet nicht, ob die Architektur gut ist. Er zeigt erkannte Abhängigkeiten, kann aber nicht automatisch beurteilen, ob eine bestimmte Beziehung im Hinblick auf fachliche Verantwortlichkeiten sinnvoll ist. Dazu braucht es Architekturvereinbarungen und eine Analyse der Gründe für die Zusammenarbeit der Projekte.

Der **Task-Graph** beantwortet eine andere Frage: Welche Operationen müssen ausgeführt werden und in welcher Reihenfolge? Beispielsweise kann eine Aufgabe vom Abschluss einer anderen abhängen. Bei der Planung der Ausführung kann NX Projektbeziehungen und konfigurierte Aufgabenabhängigkeiten berücksichtigen.

Der Projektgraph beschreibt somit Beziehungen zwischen Projekten, der Task-Graph Beziehungen zwischen auszuführenden Operationen. Die Graphen hängen zusammen, sind aber nicht austauschbar.

Der Unterschied ist besonders in großen Repositories wichtig. Eine Änderung an einer gemeinsamen Bibliothek kann mehrere Anwendungen beeinflussen; die Aufgabe einer Anwendung kann wiederum vorbereitende Schritte benötigen. Graphen machen diese Zusammenhänge sichtbar, statt ausschließlich auf das Wissen einzelner Entwickler angewiesen zu sein.

Weitere Informationen: [Den Projektgraphen erkunden](https://nx.dev/features/explore-graph).

## Caching und Affected-Befehle

Mit wachsendem Workspace kann es immer länger dauern, nach jeder Änderung sämtliche Prüfungen erneut auszuführen. NX unterstützt **Task-Caching**: Wenn eine Aufgabe für das Caching konfiguriert ist und ihre Eingaben mit einem zuvor berechneten Ergebnis übereinstimmen, kann NX dieses Ergebnis wiederverwenden, statt die Aufgabe erneut auszuführen.

Caching bedeutet nicht, dass jeder Befehl automatisch schneller wird. Für ein korrektes Ergebnis muss NX alle Daten berücksichtigen, die die Aufgabe beeinflussen: Quelldateien, Konfiguration, Abhängigkeiten und weitere festgelegte Eingaben. Hängt eine Aufgabe von externem Zustand ab oder führt sie Seiteneffekte aus, muss ihre Eignung für Caching separat bewertet werden. Eine unvollständige Beschreibung der Eingaben kann dazu führen, dass ein Ergebnis fälschlich wiederverwendet wird.

Eine weitere Möglichkeit ist, Aufgaben nur für Projekte auszuführen, die von Änderungen betroffen sind. **Affected**-Befehle bestimmen anhand der Änderungen und des Abhängigkeitsgraphen die relevante Projektmenge. Das ist besonders in CI nützlich, wo sämtliche Prüfungen für das ganze Repository teuer sein können.

Die allgemeine Befehlsform lautet:

```bash
npx nx affected -t lint test build --base=<base-revision> --head=<current-revision>
```

Die Werte `<base-revision>` und `<current-revision>` sind Platzhalter und müssen durch echte, für das jeweilige Szenario geeignete Git-Revisionen ersetzt werden. In CI sind dies häufig die Basisrevision des Zielbranches und die geprüfte Revision. Übernehmen Sie nicht blind dasselbe Wertepaar in alle Workflows: Die Basis hängt davon ab, was verglichen werden soll.

Affected-Befehle ersetzen ebenfalls nicht das Verständnis der Abhängigkeiten. Ihre Wirksamkeit hängt davon ab, ob Projekte korrekt erkannt werden und Graph und Task-Konfiguration stimmen. Bevor eine Verkürzung der CI-Laufzeit behauptet wird, muss das Szenario für das Repository konfiguriert und die Wirkung gemessen werden.

Caching und Affected lösen unterschiedliche Aufgaben: Caching verwendet ein Task-Ergebnis bei identischen Eingaben erneut; Affected bestimmt, welche Aufgaben für den geänderten Teil des Workspace betrachtet werden sollten. Zusammen können sie unnötige Arbeit reduzieren, ersetzen aber nicht die korrekte Konfiguration und Überprüfung des Ablaufs.

Dokumentation: [Task-Caching](https://nx.dev/features/cache-task-results) und [Affected-Befehle](https://nx.dev/ci/features/affected).

## Erste Architekturentscheidungen ohne vorschnelle Abstraktionen

NX bietet Mechanismen zur Organisation des Workspace, wählt aber nicht die Architektur für das Team. Verzeichnisstruktur und Abhängigkeitsgraph zeigen, wie der Code technisch organisiert ist; sie beweisen nicht, dass die Verantwortlichkeiten korrekt getrennt wurden.

Vor dem Erstellen einer Bibliothek sollte feststehen, welche stabile Verantwortung sie isolieren und welches Problem eine eigene Grenze lösen soll. Manchmal reicht eine Struktur innerhalb der Anwendung aus; manchmal hilft eine Bibliothek dabei, Abhängigkeiten zu kontrollieren, Code wiederzuverwenden oder einen öffentlichen Vertrag festzulegen. Die Entscheidung sollte davon abhängen, wie sich der Code verändert und wer ihn nutzt, nicht vom Wunsch, vorsorglich bekannte Verzeichnisse wie `domain`, `data-access`, `ui` oder `shared` anzulegen.

Ein praktischer Grundsatz lautet: Zuerst das Problem erkennen, dann die Grenze wählen und erst danach die Regeln mit NX durchsetzen. Tags und `@nx/enforce-module-boundaries` sind nützlich, wenn sie eine bewusste Architekturentscheidung schützen; sie ersetzen diese Entscheidung nicht.

Dokumentation: [Module Boundaries erzwingen](https://nx.dev/features/enforce-module-boundaries).

## Umfang dieser Phase: Das Grundgerüst vorbereiten

In dieser Phase schließe ich üblicherweise die Vorbereitung des Projektgerüsts ab: Workspace, zentrale Shared-Bibliotheken, Namenskonventionen, Path-Aliase und strenge Abhängigkeitsgrenzen. Das schafft eine vorhersehbare Grundlage für die weitere Entwicklung, ist aber noch keine Implementierung der Fachdomaine.

Die strukturelle Aufteilung in Schichten und ausdrückliche Abhängigkeitsregeln überschneiden sich bereits teilweise mit Architekturideen aus Domain-Driven Design. Wir entwerfen hier jedoch weder ein Domänenmodell noch Bounded Contexts, Aggregate oder Domain Events. **DDD wird in einem eigenen folgenden Fachartikel behandelt**, damit die Vorbereitung des technischen Grundgerüsts nicht mit der Modellierung der Fachdomäne vermischt wird.

## Aktueller Implementierungsstand

Dieser Artikel setzt die vorherigen Implementierungsschritte fort:

- Branch `NX-Workspace` — Initialisierung des NX Workspace.
- Branch `NX-Workspace+1` — Erstellung der minimalen Angular-Anwendung und des E2E-Projekts sowie erste Konfiguration der Entwicklungswerkzeuge.

Im aktuellen Workspace gibt es bereits die Personal-Finance-Anwendung und ein separates E2E-Projekt. Wir erstellen sie nicht erneut, sondern nutzen die vorhandene Implementierung, um gemeinsame Ressourcen, Shared-Bibliotheken, Aliase und Abhängigkeitsbeschränkungen zu konfigurieren.

In dieser Phase werden das Domänenmodell und die fachliche Funktionalität noch nicht implementiert. DDD und die Modellierung der Fachdomäne bleiben ein eigenes Thema; hier bereiten wir die technische Grundlage für die weitere Arbeit vor.

Aktuelle NX-Fundamentals-Branches:

- [NX-Fundamentals-Building-an-Enterprise-Frontend-Workspace-from-Scratch](https://github.com/iAVP/enterprise-frontend-workshop/tree/NX-Fundamentals-Building-an-Enterprise-Frontend-Workspace-from-Scratch)
- [NX-Fundamentals-Building-an-Enterprise-Frontend-Workspace-from-Scratch+1](https://github.com/iAVP/enterprise-frontend-workshop/tree/NX-Fundamentals-Building-an-Enterprise-Frontend-Workspace-from-Scratch%2B1)

## Weiterführende Materialien

- [Offizielle NX-Dokumentation](https://nx.dev/)
- [NX-Workspace-Konfiguration](https://nx.dev/reference/nx-json)
- [NX-Projektkonfiguration](https://nx.dev/reference/project-configuration)
- [NX-Projektgraph](https://nx.dev/features/explore-graph)
- [Task-Caching](https://nx.dev/features/cache-task-results)
- [Affected-Befehle](https://nx.dev/ci/features/affected)
- [Regeln für Modulgrenzen](https://nx.dev/features/enforce-module-boundaries)
