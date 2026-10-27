# Publikations-Roadmap

Dieses Dokument beschreibt die geplante technische Artikelserie für den Enterprise Frontend Workshop.

Die Artikel begleiten die Weiterentwicklung einer Beispielanwendung für persönliche Finanzen (Personal Finance). Jede Etappe führt ein technisches oder architektonisches Konzept ein, zeigt dessen praktische Anwendung und erläutert die damit verbundenen Abwägungen.

Die Roadmap beschreibt geplante Inhalte. Ein Artikel darf erst dann als veröffentlicht markiert werden, wenn er tatsächlich verfügbar ist.

## 1. Redaktionelle Prinzipien

Die Serie folgt mehreren Prinzipien:

- **Eine kontinuierlich weiterentwickelte Anwendung:** Die architektonische Entwicklung wird anhand eines zusammenhängenden Beispiels gezeigt, nicht anhand unverbundener Demos.
- **Architektur von Anfang an:** Das Projekt wird direkt als NX-Workspace angelegt, statt zunächst mit einer einfachen Angular-Anwendung zu beginnen und später zu migrieren.
- **Praxisorientiertes Engineering:** Technische Konzepte werden mit konkreten Implementierungsentscheidungen verknüpft.
- **Explizite Abwägungen:** Es wird nicht nur erklärt, wie eine Lösung funktioniert, sondern auch, warum sie geeignet ist und wo ihre Grenzen liegen.
- **KI als übergreifendes Thema:** AI-assisted und agentic Engineering werden behandelt, wenn sie den Entwicklungsprozess sinnvoll verbessern.
- **Englisch als maßgebliche Sprache:** Die primären technischen Artikel und die Code-Dokumentation werden auf Englisch gepflegt.
- **Lokalisierte Kommunikation:** Ausgewählte Themen werden für ein russisch- und ein deutschsprachiges Publikum angepasst.

## 2. Beispielanwendung

Als Beispiel dient eine Personal-Finance-Anwendung, die sich im Laufe der Serie schrittweise weiterentwickelt.

Geplante Funktionsbereiche:

- Verwaltung von Einnahmen und Ausgaben.
- Kategorien und Budgets.
- Finanzübersichten.
- Eingabevalidierung und Fehlerbehandlung.
- Datenimport und -export.
- Backend-Integration.

Die Anwendung bietet einen praktischen Kontext für die Architekturdiskussion. Funktionen werden implementiert, wenn sie das Thema eines Artikels unterstützen, nicht nur, damit die Anwendung vollständig wirkt.

## Veröffentlichungsregister und maßgebliche Quelle

Dieser Abschnitt dokumentiert die tatsächliche Veröffentlichungshistorie. Sie ist von der unten beschriebenen geplanten Lernreihenfolge zu unterscheiden.

| Veröffentlichungsreihenfolge | Artikel | Status | Veröffentlichungsdatum | Kanonischer Link |
| --- | --- | --- | --- | --- |
| 1 | [The Road to Architecture](https://enterprise-frontend-workshop.hashnode.dev/the-road-to-architecture) | Veröffentlicht | Hier nicht erfasst | [Hashnode](https://enterprise-frontend-workshop.hashnode.dev/the-road-to-architecture) |
| 2 | NX Fundamentals — Building an Enterprise Frontend Workspace from Scratch | Veröffentlicht | Hier nicht erfasst | Nicht erfasst |
| 3 | [Architecture in Practice: Decisions Behind Enterprise Frontend Systems](https://enterprise-frontend-workshop.hashnode.dev/architecture-in-practice-decisions-behind-enterprise-frontend-systems) | Veröffentlicht | 2026-10-27 | [Hashnode](https://enterprise-frontend-workshop.hashnode.dev/architecture-in-practice-decisions-behind-enterprise-frontend-systems) |

**Regeln für alle Projekt-Chats und Mitwirkenden:**

- Die Veröffentlichungsreihenfolge wird anhand dieses Registers bestimmt, nicht anhand der Chat-Reihenfolge, Branch-Namen oder Nummern der Roadmap-Phasen.
- Die erste Veröffentlichung ist *The Road to Architecture*. Der NX-Fundamentals-Artikel ist die zweite Veröffentlichung und darf nicht als erste bezeichnet werden.
- Die tatsächliche Veröffentlichungsreihenfolge muss von der geplanten Lernreihenfolge getrennt bleiben. Roadmap-Phasen sind keine Veröffentlichungsnummern.
- Vor Antworten zur Veröffentlichungshistorie, zum nächsten Artikel, zu Daten oder Links ist diese Datei zu prüfen.
- Fehlende Daten oder URLs dürfen nicht geraten werden. Bis zur Verifizierung steht dort „Hier nicht erfasst“.
- Nach jeder Veröffentlichung sind Titel, Datum und kanonische URL einzutragen sowie der Status in der Roadmap zu aktualisieren. Übersetzungen und plattformspezifische Versionen werden verlinkt, sofern bekannt.
- Wenn ein Chat keinen Zugriff auf diese Datei hat oder Angaben mehrdeutig sind, muss diese Einschränkung benannt werden, statt zu raten.

## 3. Geplante Artikelabfolge

### Einführender Artikel — Architektur vor Technologie

**Status: Veröffentlicht** — [The Road to Architecture](https://enterprise-frontend-workshop.hashnode.dev/the-road-to-architecture)


**Ziel:** Die persönliche Sicht des Autors auf Softwarearchitektur vorstellen und erläutern, warum Architekturentscheidungen möglichst vor Beginn der Implementierung bedacht werden sollten.

Geplante Themen:

- Architektur als Ergebnis bewusster Entscheidungen und nicht als bestimmtes Framework oder Werkzeug.
- Warum die grundlegende architektonische Richtung möglichst vor Entwicklungsbeginn festgelegt werden sollte.
- Wie Aufwand und Auswirkungen architektonischer Änderungen im Projektverlauf wachsen können: vor Entwicklungsbeginn, im ersten Drittel oder während der MVP-Phase sowie in der Mitte und in späteren Phasen.
- Architektur als weiterentwickelbares Set von Entscheidungen statt als unveränderlicher Bauplan.
- Warum die folgenden Artikel vor allem die architektonischen Überlegungen hinter Entscheidungen erklären und Angular, Vue, NX und andere Technologien als Umsetzungswerkzeuge behandeln.
- Wie KI die Einarbeitung in Werkzeuge beschleunigen kann, während Architekturverständnis für die Steuerung und Überprüfung des Ergebnisses wesentlich bleibt.

Der Artikel stellt eine persönliche Perspektive vor, keine verpflichtende Architektur und keine allgemeingültige Vorschrift. Die Leser können ihren eigenen Ansatz wählen.

### Theoretischer Begleitartikel — Architektur in der Praxis

**Status: Veröffentlicht** — [Architecture in Practice: Decisions Behind Enterprise Frontend Systems](https://enterprise-frontend-workshop.hashnode.dev/architecture-in-practice-decisions-behind-enterprise-frontend-systems) (russische und deutsche Fassungen werden in diesem Repository gepflegt).

**Ziel:** die architektonischen Überlegungen hinter realen Projektentscheidungen erläutern, bevor die technische Umsetzung beginnt. Der Artikel behandelt den Erhalt bestehender Arbeitsabläufe, mehrere Frontend-Frameworks, die Neubewertung von Konfigurationsentscheidungen und die langfristigen Kosten technischer Entscheidungen.

Damit wird ein redaktionelles Muster für die Serie festgehalten: Wenn die architektonische Begründung einen eigenen Artikel verdient, kann vor dem technischen Implementierungsartikel ein eigenständiger theoretischer Beitrag erscheinen.

### Phase 1 — NX-Grundlagen

**Ziel:** Den Workspace einrichten und das Entwicklungsmodell von NX erläutern.

Geplante Themen:

- Konzepte des NX-Workspace und Projektorganisation.
- Die Verzeichnisse `apps/` und `libs/`.
- Projektkonfiguration und grundlegende Entwicklungsabläufe.
- Projekte ausführen, bauen, testen und linten.
- Warum NX von Anfang an eingesetzt wird.
- Architektur einführen, ohne vorschnell Abstraktionen zu schaffen.

**Erwartetes Ergebnis:** Ein korrekt initialisierter Workspace und das erste minimale Anwendungsprojekt.



### Kurzer ergänzender Artikel — Entwicklungswerkzeuge

Ein kurzer, praxisorientierter Vergleich behandelt drei Optionen:

- **WebStorm:** eine voll ausgestattete IDE mit kostenpflichtiger Lizenz für die kommerzielle Entwicklung.
- **Visual Studio Code:** ein kostenloser, erweiterbarer Code-Editor.
- **OpenCode:** ein kostenloser Open-Source-KI-Coding-Agent, der im Terminal, als Desktop-App oder über eine IDE-Erweiterung genutzt werden kann.

OpenCode kann eine Alternative sein, wenn der Zugriff auf VS Code oder dessen Erweiterungen eingeschränkt ist. Der Zugriff auf KI-Modelle und Anbieter kann jedoch weiterhin von regionaler Verfügbarkeit und Netzwerkregeln abhängen. Die NX-Anleitung bleibt unabhängig von einer bestimmten IDE oder einem bestimmten Editor.

### Phase 2 — Angular im Detail

**Ziel:** Die Struktur der Angular-Anwendung und das grundlegende Programmiermodell des Frontends etablieren.

Geplante Themen:

- Komponenten, Templates, Direktiven, Dependency Injection und Services.
- Angular Signals: `signal`, `computed` und `effect`.
- Gekapselter Zustand und servicebasierte Facades.
- HTTP-Kommunikation, Fehlerbehandlung und Interceptors.
- Tests und wartbares Komponentendesign.
- Angular Material und Material-3-Theming.
- Design-Tokens und ein konsistentes UI-Designsystem.
- Sinnvoller Einsatz von RxJS für asynchrone und streamorientierte Aufgaben.

**Erwartetes Ergebnis:** Ein Angular-Frontend mit klaren Komponentenverantwortlichkeiten und einem nachvollziehbaren Zustandsmodell.

### Phase 3 — Domain-Driven Design und Bibliotheksgrenzen

**Ziel:** Den Workspace um explizite funktionale und architektonische Grenzen weiterentwickeln.

Geplante Themen:

- Anwendung von DDD-Konzepten in der Frontend-Entwicklung.
- Organisation von Anwendungen und Bibliotheken nach Verantwortlichkeiten.
- Trennung von UI, Facades, Use Cases und Datenzugriff, wo dies gerechtfertigt ist.
- Festlegung der Abhängigkeitsrichtungen.
- NX-Projekt-Tags und `@nx/enforce-module-boundaries`.
- Gemeinsame Nutzung von UI-Komponenten und Design-Tokens.
- Vermeidung unnötiger Schichten und übergroßer Shared Libraries.

**Erwartetes Ergebnis:** Ein modulares Frontend mit bewusst gestalteten und zunehmend durchsetzbaren Abhängigkeiten.

### Phase 4 — Angular-Microfrontends und Web Components

**Ziel:** Integration und Wiederverwendung über Frontend-Grenzen hinweg untersuchen.

Geplante Themen:

- Microfrontend-Konzepte und Deployment-Aspekte.
- Angular Elements und Web Components.
- Komponentenverträge, Lebenszyklus und Framework-Abhängigkeiten.
- Der Unterschied zwischen wiederverwendbaren Web Components und unabhängig deploybaren Microfrontends.
- Integrationsabwägungen und Laufzeitbetrachtungen.

**Erwartetes Ergebnis:** Ein praktisches Verständnis dafür, wann Web Components helfen und welche zusätzliche Architektur Microfrontends erfordern.

### Phase 5 — npm-Packages und Azure DevOps Artifacts

**Ziel:** Kontrollierte Verteilung und Wiederverwendung von Frontend-Bibliotheken zeigen.

Geplante Themen:

- Paketierung wiederverwendbarer Bibliotheken.
- Struktur und Versionierung von npm-Paketen.
- Öffentliche und private Paketverteilung.
- Azure-DevOps-Artifacts-Feeds.
- Abhängigkeitsverwaltung und Verwendung veröffentlichter Pakete.
- CI/CD-Aspekte beim Veröffentlichen von Paketen.

**Erwartetes Ergebnis:** Ein nachvollziehbarer Paketlebenszyklus für wiederverwendbaren Code, ohne Bibliotheken verfrüht zu veröffentlichen.

### Phase 6 — Next.js-Backend und REST API

**Ziel:** Die Beispielanwendung zu einer Fullstack-Architektur erweitern.

Geplante Themen:

- Backend-Funktionen und Anwendungsstruktur von Next.js.
- REST-API-Design und Verträge.
- Integration des Backends in das bestehende Angular-Frontend.
- Validierung, Fehlerbehandlung und Transportgrenzen.
- Konfiguration und umgebungsspezifische Aspekte.
- Tests und Deployment.

**Erwartetes Ergebnis:** Ein dokumentiertes Interaktionsmodell zwischen Frontend und Backend für die Beispielanwendung.

### Phase 7 — Einführung in Vue.js

**Ziel:** Vue.js als alternatives Frontend-Framework im Kontext des bestehenden Projekts vorstellen.

Geplante Themen:

- Vue-Komponenten und Reaktivität.
- Composition API und Composables.
- Komponentenstatus und Service-Verantwortlichkeiten.
- Routing und API-Integration.
- UI-Implementierung mit Bootstrap als Vergleich zum Angular-Frontend.
- Unterschiede im Programmiermodell und Ökosystem.

**Erwartetes Ergebnis:** Eine Grundlage für ein Vue-Frontend und ein klares Verständnis seiner zentralen Konzepte.

### Phase 8 — Vue.js, DDD und das bestehende Backend

**Ziel:** Explizite Architekturgrenzen im Vue-Frontend anwenden und dabei das vorhandene Backend weiterverwenden.

Geplante Themen:

- Organisation des Vue-Codes nach Funktionsbereichen.
- Composables, Anwendungsservices und Verantwortlichkeiten des Datenzugriffs.
- Abhängigkeitsrichtungen und Modulgrenzen.
- Integration der bestehenden Next.js-REST-API.
- Vermeidung unnötiger Abstraktionen.
- Vergleich architektonischer Entscheidungen in Angular und Vue.

**Erwartetes Ergebnis:** Eine Vue-Implementierung, die das vorhandene Backend nutzt und konsistente Architekturprinzipien anwendet.

### Phase 9 — Vue.js mit Angular Elements

**Ziel:** Ausgewählte Angular-Komponenten in eine Vue-Anwendung integrieren.

Geplante Themen:

- Ausgewählte Angular-Komponenten als Web Components bereitstellen.
- Angular Elements in Vue integrieren.
- Komponentenverträge definieren und Daten übergeben.
- Events, Lebenszyklus, Styling und frameworkspezifische Abhängigkeiten behandeln.
- Ein gemeinsames Backend nutzen, ohne die beiden Frontend-Frameworks eng zu koppeln.
- Vorteile und Kosten einer Integration verschiedener Frameworks bewerten.

**Erwartetes Ergebnis:** Ein konkretes Beispiel für frameworkübergreifende Komponentenintegration mit klar benannten Grenzen und Abwägungen.

## 4. Übergreifende Themenreihe: AI-Assisted und Agentic Engineering

KI-bezogene Engineering-Themen werden im Verlauf der Serie aufgegriffen, wenn sie relevant sind. Sie müssen nicht in jeden Artikel künstlich eingebaut werden.

Konkrete Tool-Beispiele konzentrieren sich auf Claude und GitHub Copilot, die im Unternehmen des Autors offiziell zur Nutzung freigegebenen KI-Werkzeuge. Allgemeine Engineering-Prinzipien bleiben anbieterneutral; praktische Anleitungen berücksichtigen diese zugelassenen Werkzeuge.

Mögliche eigenständige Themen:

- KI-gestützte Anforderungsanalyse und Aufgabenzerlegung.
- Coding Agents in Implementierungs- und Refactoring-Workflows.
- Context Engineering und Specification-Driven Development.
- Agentengestütztes Testen und Code Review.
- Überprüfung generierten Codes anhand architektonischer Grenzen.
- Menschliche Aufsicht, Sicherheit und Qualitätssicherung.
- Der Unterschied zwischen Agentic Engineering und der Entwicklung agentischer KI-Systeme.

Im Mittelpunkt stehen praktische Engineering-Methoden, zuverlässige Ergebnisse und wartbare Software.

## 5. Zusätzliche Engineering-Fallstudie

Ein separater Artikel könnte TypeScript, objektorientiertes Design und den Nutzen von Kapselung anhand eines realen Refactoring-Falls untersuchen.

Die zentrale Idee ist zu zeigen, wie viel wiederholter oder unnötig komplexer Code sich manchmal durch eine kleine, klar definierte Abstraktion ersetzen lässt.

Vor der Veröffentlichung muss das Beispiel Folgendes erklären:

- Das ursprüngliche Problem und die Rahmenbedingungen.
- Was der ursprüngliche Code tatsächlich getan hat.
- Welche Verantwortung die neue Abstraktion kapselt.
- Warum die Änderung korrekt und wartbar ist.
- Welche Abwägungen und Grenzen bestehen.

Der Artikel soll die Engineering-Überlegungen vermitteln und sich nicht auf einen spektakulären Vergleich der Zeilenanzahl verlassen.

## 6. Veröffentlichungsprozess

Die maßgeblichen technischen Inhalte werden auf Englisch gepflegt.

Ausgewählte Artikel können für andere Plattformen und Zielgruppen angepasst werden:

- **LinkedIn:** Fachliche Diskussionen und Ankündigungen mit Verweis auf den vollständigen Artikel.
- **Xing:** Berufliche Updates und passende technische Beiträge.
- **VK / Around IT:** Russischsprachige Adaptionen und Diskussionen in der Community.

Beiträge für einzelne Plattformen dürfen sich in Länge und Darstellung unterscheiden, sollen aber die technische Aussage des Originalartikels bewahren.

Für Hashtags in Veröffentlichungen dient `HASHTAGS.md` als kontrolliertes Vokabular.

## 7. Status und Umfang

Alle Artikel dieser Roadmap sind geplant, sofern sie nicht ausdrücklich anders gekennzeichnet sind.

Die Reihenfolge beschreibt den vorgesehenen Lernpfad und ist keine Verpflichtung zu festen Veröffentlichungsterminen.

Wenn sich bei der Implementierung eine bessere Art der Vermittlung ergibt, können Artikel überarbeitet, aufgeteilt, zusammengeführt oder umsortiert werden.

Es sollen keine Platzhalter-Anwendungen, Bibliotheken oder Code erstellt werden, nur damit die Roadmap vollständig aussieht.

---

**Leitprinzip:** Jeder Artikel soll eine konkrete Engineering-Erkenntnis, ein verständliches Beispiel und ein klareres Verständnis der damit verbundenen Abwägungen vermitteln.
