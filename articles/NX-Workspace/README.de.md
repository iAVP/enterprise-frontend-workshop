# NX Workspace: Von der Architektur zu den Werkzeugen

## Was ist NX und wozu dient es?

NX ist eine Sammlung von Werkzeugen zur Entwicklung, zum Build und zur Wartung von Anwendungen und Bibliotheken. Der größte Vorteil liegt für mich nicht nur darin, mehrere Projekte in einem Repository abzulegen, sondern auch darin, ihre Zusammenarbeit zu steuern und architektonische Grenzen durchzusetzen.

## Monorepositories und NX Workspace

Im Laufe der Entwicklung einer Anwendung können weitere Anwendungen und Bibliotheken hinzukommen, die häufig gemeinsamen Code verwenden. Ein möglicher Ansatz ist ein Monorepository, in dem die Projekte gemeinsam gespeichert werden, aber jeweils ihren eigenen Zweck behalten.

Ein Repository allein reicht jedoch nicht aus. Wir müssen die Projektstruktur, die Zusammenarbeit der Projekte und die zulässigen Abhängigkeiten festlegen. Ein NX Workspace stellt dafür den Arbeitsbereich und die Werkzeuge zur Projektverwaltung bereit.

NX legt die Architektur nicht für uns fest. Die Struktur des Workspace sollte die Architektur der Lösung widerspiegeln, während Abhängigkeitsregeln helfen, sie bei der Weiterentwicklung zu erhalten.

## Erfahrungen mit NX

Meine erste umfangreiche Erfahrung mit NX stammt aus einem großen Angular-Projekt, das 2017 begonnen wurde und bis heute weiterlebt. Zu diesem Zeitpunkt befanden sich zwei Anwendungen und ungefähr zehn Bibliotheken in einem gemeinsamen Workspace. Mit zunehmender Größe wurde es immer schwieriger, die Abhängigkeiten zwischen ihnen zu verstehen und zu kontrollieren. Besonders problematisch waren zyklische Abhängigkeiten: Sie manuell zu finden und aufzulösen, war nicht einfach.

Einer der ersten Schritte bestand darin, die Projektkonfiguration aufzuteilen. Anstelle einer großen `angular.json` gab es separate `project.json`-Dateien für die einzelnen Projekte. Das beschreibt die Arbeit am früheren Projekt und nicht die Initialisierung des neuen Workspace, um den es in diesem Artikel geht.

Der wichtigste Vorteil waren jedoch die Module-Boundaries-Regeln. Damit ließ sich festlegen, welche Bibliotheken voneinander abhängig sein durften. Tags kennzeichneten dabei die Zugehörigkeit zu bestimmten Gruppen und fachlichen Bereichen.

Diese Regeln waren nicht länger nur Vereinbarungen zwischen Entwicklern: ESLint prüfte sie bei der Codeanalyse, und Verstöße gegen konfigurierte Einschränkungen konnten den Build fehlschlagen lassen. Dadurch ließen sich Abhängigkeiten leichter kontrollieren, zyklische Verbindungen vermeiden und die Architektur bei der Weiterentwicklung des Projekts erhalten.

## Einen NX Workspace initialisieren

Bevor wir die erste Angular-Anwendung erstellen, bereiten wir das Repository vor.

Das Repository `enterprise-frontend-workshop` enthält bereits Artikel, Dokumentation und Architekturprinzipien. Deshalb haben wir uns entschieden, NX direkt in das bestehende Repository zu integrieren, anstatt für das praktische Beispiel ein separates Repository anzulegen. So können wir die Anwendung gemeinsam mit der Dokumentation weiterentwickeln und die gesamte Historie in einem Git-Repository behalten.

Zur Initialisierung führen wir folgenden Befehl aus:

```bash
npx nx@latest init
```

Damit startet der interaktive Einrichtungsprozess von NX. Das Installationsprogramm bietet nacheinander mehrere Optionen an, über die wir jeweils entscheiden müssen.

### Installationsmethode auswählen

Zuerst fragt NX, wie es in das Projekt eingebunden werden soll. Wir wählen `package.json installation`, also die Installation über das bestehende npm-Projekt.

NX wird dadurch dem vorhandenen Repository hinzugefügt, anstatt ein neues Projekt in einem separaten Verzeichnis anzulegen.

### Einrichtungsmodus auswählen

Anschließend bietet das Installationsprogramm eine minimale oder eine geführte Einrichtung an. Wir wählen `Guided`.

Dieser Modus führt durch die verfügbaren Einstellungen, sodass wir Schritt für Schritt Entscheidungen treffen können.

### Zusätzliche Funktionen konfigurieren

Danach fragt das Installationsprogramm nach AI-Agenten. Wir wählen `none`, da die Integration von AI-Werkzeugen nicht zum aktuellen Ziel gehört.

Als Nächstes geht es um NX Cloud, das Remote-Caching und die verteilte Ausführung von Tasks ermöglicht. Wir wählen `Skip for now`. Für die grundlegende Einrichtung des Workspace sind diese Funktionen nicht erforderlich. Bei konkretem Bedarf können wir später darauf zurückkommen.

Zum Schluss fragt das Installationsprogramm, ob Nutzungsdaten an das NX-Team übermittelt werden dürfen. Wir wählen `No`; anschließend bestätigt das Programm, dass die Analytics deaktiviert sind.

### Ergebnis der Initialisierung

Das Installationsprogramm endet mit der Meldung `Done!` und verweist auf die Dokumentation zur Integration von NX in ein bestehendes Projekt.

Im Stammverzeichnis des Repositorys erscheinen die wichtigsten Konfigurationsdateien:

- `nx.json` — die anfängliche globale NX-Konfiguration. Zu diesem Zeitpunkt enthält sie einen Verweis auf das JSON Schema und die Einstellung zum Deaktivieren der Analytics.
- `package.json` — das npm-Projektmanifest mit der Abhängigkeit `nx` in Version `24.0.1`.
- `package-lock.json` — die festgeschriebene npm-Abhängigkeitsstruktur.
- `.gitignore` — Regeln zum Ausschließen lokaler IDE-Einstellungen, von NX-Cache-Daten und des Verzeichnisses `node_modules`.

Außerdem entstehen die Verzeichnisse `.nx/` und `node_modules/`. Das erste enthält lokale NX-Daten, das zweite die installierten npm-Pakete.

Damit haben wir eine minimale NX-Konfiguration. Eine Angular-Anwendung und eigene Bibliotheken gibt es im Repository zu diesem Zeitpunkt noch nicht.

Die Integration von NX bereitet die Infrastruktur vor, erstellt aber nicht automatisch die Architektur der Anwendung. Die Projektstruktur und die Regeln für ihre Zusammenarbeit werden sich im Laufe der Weiterentwicklung herausbilden.

Die Änderungen werden in einem separaten Git-Branch namens `NX-Workspace` auf GitHub gehalten. So kann sich die praktische Umsetzung unabhängig vom Hauptbranch des Repositorys weiterentwickeln.

## Die Angular-Anwendung erstellen

Nach der Initialisierung des NX Workspace erstellen wir die erste Anwendung.

Unser Ziel ist nicht nur, eine Angular-Anwendung zu generieren. Wir werden Personal Finance schrittweise weiterentwickeln und beobachten, wie sich die Architektur mit neuen Anforderungen verändert. Zunächst benötigen wir daher eine minimale, aber vollständige Grundlage: die Anwendung sowie die Konfiguration für Entwicklung, Tests und Codequalitätsprüfungen.

### Warum Angular?

Für dieses Beispiel haben wir Angular gewählt. Es ist das wichtigste Frontend-Framework in meiner Arbeit und eignet sich gut, um zu zeigen, wie eine Enterprise-Anwendung strukturiert und weiterentwickelt werden kann.

Wir werden nicht im Voraus eine komplexe Architektur mit zahlreichen Bibliotheken und Abstraktionen erstellen. Zu diesem Zeitpunkt gibt es noch keine fachliche Funktionalität, die solche Entscheidungen rechtfertigen würde. Zuerst schaffen wir eine funktionierende Grundlage, prüfen die Werkzeuge und ergänzen Architekturbausteine, sobald sie notwendig werden.

### Die Anwendung generieren

Zum Erstellen der Anwendung verwenden wir den NX-Angular-Generator. Zunächst sehen wir uns die verfügbaren Optionen an:

```bash
npx nx g @nx/angular:application --help
```

Der Generator ermöglicht die Konfiguration von Bundler, Routing, Tests, Linter, Styles und weiteren Einstellungen. So können wir grundlegende Konventionen festlegen, bevor die Entwicklung beginnt.

Wir wählen folgende Einstellungen:

- Anwendungsname: `personal-finance`.
- NX-Plugin: `@nx/angular`.
- Bundler: `esbuild`.
- Routing: aktiviert.
- Standalone Components: aktiviert.
- Unit-Tests: `vitest-angular`.
- End-to-End-Tests: Playwright.
- Statische Analyse: ESLint.
- Styles: SCSS.
- SSR: deaktiviert.
- Strict Mode: aktiviert.
- Zoneless: aktiviert.

Diese Entscheidungen richten sich nach den Zielen des Workshops. Wir benötigen eine clientseitige Anwendung, die schrittweise um Routen und Funktionen erweitert werden kann. SSR ist in dieser Phase nicht erforderlich. Strict Mode hilft, Probleme frühzeitig zu erkennen; SCSS ist das gewählte Format für Stylesheets.

Zoneless ist ein Angular-Modus zur Änderungserkennung ohne Abhängigkeit von Zone.js. Wir aktivieren ihn bereits beim Erstellen der Anwendung, statt die Konfiguration später durch eine separate Migration einzuführen.

Für Unit-Tests wählen wir `vitest-angular`. Dieses Werkzeug habe ich in meiner bisherigen Praxis noch nicht verwendet. Ein neues Projekt bietet die Möglichkeit, einen modernen Test-Stack auszuprobieren, ohne auf bestehende Infrastruktur Rücksicht nehmen zu müssen. Das bedeutet nicht, dass Jest schlechter ist oder in anderen Projekten nicht eingesetzt werden sollte. Für dieses Beispiel wählen wir Vitest und überprüfen die Einrichtung in der Praxis.

Für End-to-End-Tests verwenden wir Playwright. Damit lassen sich browserbasierte Tests mit verschiedenen Browser-Engines ausführen. ESLint übernimmt die statische Codeanalyse, während TypeScript die Typen prüft. Die Werkzeuge ergänzen einander, statt sich gegenseitig zu ersetzen.

Mit den ausgewählten Optionen führen wir den Generator aus:

```bash
npx nx g @nx/angular:application \
  --name=personal-finance \
  --directory=apps/personal-finance \
  --bundler=esbuild \
  --routing=true \
  --standalone=true \
  --e2eTestRunner=playwright \
  --unitTestRunner=vitest-angular \
  --linter=eslint \
  --style=scss \
  --ssr=false \
  --strict=true \
  --zoneless=true
```

NX erstellt die Anwendung und ein separates Projekt für End-to-End-Tests.

### Was kommt im Workspace hinzu?

Die wichtigsten Teile des neuen Projekts liegen in folgenden Verzeichnissen:

```text
apps/
├── personal-finance/
└── personal-finance-e2e/
```

`personal-finance` ist die Angular-Anwendung mit Quellcode, Routen, Styles und TypeScript-Konfiguration.

`personal-finance-e2e` ist ein separates Projekt für End-to-End-Tests. Es enthält die Playwright-Konfiguration und die Testdatei `example.spec.ts`.

Der Generator aktualisiert außerdem `package.json`, `package-lock.json` und `nx.json` und ergänzt die benötigten Abhängigkeiten, Plugins und Task-Einstellungen. Die ESLint-Konfiguration befindet sich in `eslint.config.mjs`. Wir behalten die moderne Flat Config bei, die der Generator erstellt.

Die Architektur der Anwendung entwickeln wir schrittweise weiter, wenn neue Funktionen entstehen und eine Trennung der Verantwortlichkeiten zwischen Projekten und Bibliotheken tatsächlich notwendig wird.

### Die generierten Projekte prüfen

Zunächst prüfen wir, ob NX beide Projekte erkennt:

```bash
npx nx show projects
```

Die Ausgabe enthält:

```text
personal-finance-e2e
personal-finance
```

Anschließend prüfen wir Build, Unit-Tests und statische Analyse:

```bash
npx nx build personal-finance
npx nx test personal-finance
npx nx lint personal-finance
```

Alle drei Befehle werden erfolgreich ausgeführt. Der Production-Build wird unter `dist/apps/personal-finance` abgelegt, der Unit-Test besteht und ESLint meldet keine Verstöße gegen die konfigurierten Regeln.

Angular gibt allerdings eine Warnung aus: Die Styles der generierten Komponente `nx-welcome.ts` sind 7,03 KB groß und überschreiten damit das festgelegte Budget von 4 KB. Wir erhöhen das Budget nicht nur, um die Beispielkomponente beizubehalten. Nachdem wir die Demo-Oberfläche durch unsere eigene ersetzt haben, können wir prüfen, ob die Warnung weiterhin auftritt.

### End-to-End-Tests prüfen

Wir starten die Playwright-Tests:

```bash
npx nx e2e personal-finance-e2e
```

Der erste Lauf schlägt fehl, weil Playwright die ausführbaren Browserdateien für Chromium, Firefox und WebKit nicht findet. Das npm-Paket ist installiert, die Browser selbst müssen jedoch separat heruntergeladen werden.

Dazu führen wir folgenden Befehl aus:

```bash
npx playwright install
```

Nach der Installation bestehen die Tests in allen drei Browsern.

Der Test `example.spec.ts` prüft, ob die Seitenüberschrift den Text `Welcome` enthält:

```typescript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('h1').innerText()).toContain('Welcome');
});
```

Das ist ein Demonstrationstest. Er prüft die grundlegende Interaktion mit der Anwendung im Browser, nicht die fachliche Funktionalität.

### Ergebnis dieser Etappe

Wir haben jetzt einen funktionierenden NX Workspace mit einer Angular-Anwendung und einem separaten End-to-End-Testprojekt. Build, Unit-Tests, ESLint und Playwright funktionieren.

Bei der Einrichtung sind zwei Punkte aufgefallen: Die Styles der generierten Demo-Komponente überschreiten das konfigurierte Budget, und Playwright benötigt eine separate Browserinstallation. Das erste Thema verschieben wir, bis die Demo-Oberfläche ersetzt ist; das zweite haben wir durch die Installation der Browser gelöst.

Wir haben mit einer minimalen Anwendung begonnen, die grundlegende Infrastruktur geprüft und sichergestellt, dass die Werkzeuge funktionieren. Jetzt können wir Personal Finance weiterentwickeln und Architekturentscheidungen treffen, sobald konkrete Anforderungen entstehen.

## Implementierungs-Branches

- [NX-Workspace](https://github.com/iAVP/enterprise-frontend-workshop/tree/NX-Workspace) — Initialisierung des NX Workspace.
- [NX-Workspace+1](https://github.com/iAVP/enterprise-frontend-workshop/tree/NX-Workspace+1) — Integration von Angular und Erstellung der ersten Anwendung.

## Weiterführende Dokumentation

Die folgenden offiziellen Ressourcen bieten weitere Informationen zu den Werkzeugen und Konzepten aus diesem Artikel:

- [NX-Dokumentation](https://nx.dev/docs) — das zentrale Dokumentationsportal.
- [NX mit Angular](https://nx.dev/docs/technologies/angular/introduction) — Angular-Anwendungen in einem NX Workspace.
- [Angular-Generatoren](https://nx.dev/docs/technologies/angular/generators) — Optionen zum Generieren von Angular-Anwendungen und Bibliotheken.
- [NX-Projektkonfiguration](https://nx.dev/docs/reference/project-configuration) — Projekte, Targets und Tasks im Workspace.
- [Architekturgrenzen durchsetzen](https://nx.dev/docs/features/enforce-module-boundaries) — Abhängigkeiten zwischen Projekten mit Tags und Lint-Regeln kontrollieren.

## Implementierungsstatus und Umfang

Dieser Artikel beschreibt die ersten beiden Implementierungsschritte des Workshops:

- **Branch `NX-Workspace`:** NX wird mit `npx nx@latest init` zum bestehenden Repository hinzugefügt; ausgewählt werden die Installation über package.json und die geführte Einrichtung; AI-Agenten und NX Cloud werden vorerst übersprungen; Analytics wird deaktiviert.
- **Branch `NX-Workspace+1`:** Die erste Angular-Anwendung und ein separates End-to-End-Testprojekt werden generiert; die erzeugte Projektstruktur wird geprüft; Build, Unit-Tests, ESLint und Playwright werden ausgeführt; die Playwright-Browser werden installiert.
- **Aktueller Stand:** Das Repository enthält einen funktionierenden NX Workspace und eine minimale Angular-Anwendung. Die Personal-Finance-Fachfunktionalität, wiederverwendbare Business-Bibliotheken, Domänengrenzen, Projekt-Tags und die Durchsetzung von Module Boundaries sind noch nicht implementiert.

**Im nächsten Artikel nicht wiederholen:** NX initialisieren, die erste Angular-Anwendung generieren oder die grundlegenden Build-, Test- und Lint-Prüfungen erneut beschreiben. Der nächste NX-Artikel sollte vom bestehenden Stand ausgehen und den nächsten Architektur-Schritt erklären; Befehle sind nur nötig, wenn sie neue Funktionen einführen.
