# Enterprise Frontend Workshop

Ein praxisorientierter Workshop zur Entwicklung von Enterprise-Frontend-Anwendungen mit Angular, NX, TypeScript, Domain-Driven Design, Microfrontends und KI-gestützter Softwareentwicklung.

Dieses Repository begleitet eine Reihe technischer Artikel über den Entwurf, die Entwicklung und die langfristige Wartbarkeit von Enterprise-Frontend-Anwendungen.

Im Mittelpunkt stehen nicht isolierte Framework-Funktionen, sondern die Frage, wie Architekturentscheidungen Modularität, Kopplung, Wartbarkeit und die langfristige Weiterentwicklung von Softwaresystemen beeinflussen.

## Projektübersicht

Im Rahmen des Workshops wird eine Personal-Finance-Anwendung schrittweise entwickelt. Sie beginnt als Angular-Frontend und wird im weiteren Verlauf zu einer Full-Stack-Lösung mit gemeinsamem Backend und einem zusätzlichen Vue.js-Frontend ausgebaut.

Dieselbe Anwendung dient als durchgängiges Beispiel für die gesamte Artikelserie. Jede Phase baut auf den vorherigen Ergebnissen auf und führt neue Architekturkonzepte ein, sobald sie fachlich oder technisch relevant werden.

### Geplanter Technologie-Stack

- **Workspace und Tooling:** NX, npm, TypeScript
- **Primäres Frontend:** Angular
- **Frontend-Architektur:** Domain-Driven Design (DDD), modulare Libraries, explizite Abhängigkeitsgrenzen und gekapselter State
- **Backend:** Next.js, REST API
- **Zusätzliches Frontend:** Vue.js
- **Komponenteninteroperabilität:** Angular Elements und Web Components
- **UI-Technologien:** Angular Material und eigene UI-Komponenten für Angular sowie Bootstrap für das Vue.js-Frontend
- **Engineering-Praktiken:** Automatisierte Tests, statische Codeanalyse, Qualitätssicherung und KI-gestützte Entwicklung

Der Technologie-Stack wird sich mit dem Projekt weiterentwickeln. Technologien werden dann eingeführt, wenn sie einem konkreten architektonischen oder funktionalen Zweck dienen.

## Architekturprinzipien

### Architektur von Anfang an

NX bildet von Beginn an die Grundlage des Workspaces und wird nicht erst nachträglich als Migrationsschritt eingeführt, wenn die Anwendung bereits gewachsen ist.

Der Workspace folgt den NX-Konventionen: Anwendungen liegen unter `apps/`, wiederverwendbare Libraries unter `libs/`. Jedes Projekt erhält eine eigene Projektkonfiguration.

### Explizite Modulgrenzen

Architekturregeln sollen dort, wo es sinnvoll und praktikabel ist, technisch durchgesetzt werden, anstatt ausschließlich von der Disziplin der Entwickler abhängig zu sein.

NX-Projekt-Tags und Regeln zur Durchsetzung von Modulgrenzen werden eingesetzt, um Abhängigkeiten zu steuern und eine unnötig enge Kopplung zwischen fachlich unabhängigen Bereichen zu verhindern.

Libraries werden dann eingeführt, wenn sie eine sinnvolle architektonische Grenze oder eine tatsächlich benötigte wiederverwendbare Funktionalität schaffen – nicht allein, um eine vorab festgelegte Struktur zu füllen.

### Gekapselter State und klare Verantwortlichkeiten

Der Zustand und das Verhalten der Anwendung müssen klar zugeordneten Komponenten oder Services mit eindeutig definierten Verantwortlichkeiten gehören.

Angular Signals werden dort eingesetzt, wo sie für die Zustandsverwaltung sinnvoll sind. UI-State, fachlicher State und Datenzugriff werden entsprechend ihrer jeweiligen Aufgaben getrennt.

Der Workshop betrachtet unterschiedliche Ansätze für das State Management und ihre jeweiligen Vor- und Nachteile, insbesondere in langlebigen Enterprise-Anwendungen, die von mehreren Entwicklern und Teams weiterentwickelt werden.

### Wartbarkeit vor Abstraktion

Das Ziel ist nicht, die Anzahl der Abstraktionen, Services oder Libraries zu maximieren.

Entscheidend ist, unnötige Kopplung zu reduzieren, Verantwortlichkeiten klar abzugrenzen und Änderungen in einem Funktionsbereich zu ermöglichen, ohne dadurch vermeidbare Auswirkungen auf andere Bereiche zu verursachen.

### Wiederverwendung durch explizite Verträge

Wiederverwendbare Komponenten und Libraries benötigen klar definierte Verträge.

Die Wiederverwendung von Komponenten über Framework-Grenzen hinweg wird anhand von Web Components untersucht. Dabei wird nicht vorausgesetzt, dass Angular- und Vue.js-Komponenten direkt austauschbar sind.

### KI-gestützte Softwareentwicklung

KI wird im gesamten Workshop als praktisches Engineering-Werkzeug betrachtet, beispielsweise für Codegenerierung, Refactoring, Tests, Code Reviews und Architekturanalysen.

Generierter Code und KI-Empfehlungen müssen anhand der Anforderungen, Architekturprinzipien, Sicherheitsvorgaben und Qualitätsstandards des Projekts überprüft werden.

KI unterstützt technische Entscheidungen, ersetzt jedoch nicht die Verantwortung des Engineers für das Ergebnis.

## Beispielanwendung: Personal Finance

Die Personal-Finance-Anwendung dient als durchgängiges Beispiel für den gesamten Workshop.

Mit der Einführung neuer Architekturkonzepte wird auch die Funktionalität der Anwendung schrittweise erweitert. Mögliche Funktionsbereiche sind:

- Verwaltung von Einnahmen und Ausgaben
- Kategorien und Budgets
- Finanzübersichten und Statistiken
- Import und Export von Finanzdaten
- Datenvalidierung und Fehlerbehandlung
- Backend-Integration

Der Funktionsumfang wächst inkrementell. Neue Funktionen werden ergänzt, wenn sie eine konkrete Implementierung oder eine architektonische Entscheidung veranschaulichen.

## Lern- und Entwicklungsroadmap

Die Themen folgen einer bewusst gewählten Reihenfolge. Jede Phase baut auf den vorherigen auf.

### 1. NX-Grundlagen

- Erstellen eines NX-Workspaces
- Verständnis von Anwendungen und Projekten
- Aufbau und Struktur des Workspaces
- Ausführen von Tasks und Verwendung der NX CLI
- Projektkonfiguration und Abhängigkeitsgraphen

### 2. Angular im Detail

- Komponenten, Templates, Direktiven, Dependency Injection und Services
- Angular Signals: `signal`, `computed` und `effect`
- Gekapselter State und servicebasierte Facades
- HTTP-Kommunikation, Fehlerbehandlung und Interceptors
- Tests und wartbares Komponentendesign
- Theming mit Angular Material und Material 3 (M3)
- Design Tokens und ein konsistentes, wartbares UI-Designsystem

### 3. Domain-Driven Design und Library-Grenzen

- Organisation von Anwendungen und Libraries
- Trennung von UI, Facades/API, Data-Access-Schichten und gemeinsamer Basisfunktionalität
- Organisation von UI-Libraries, gemeinsamen Design Tokens und wiederverwendbaren Komponenten innerhalb eines NX-Workspaces
- Definition zulässiger Abhängigkeitsrichtungen
- Durchsetzung von Modulgrenzen mit NX und ESLint
- Umsetzung von Architekturregeln ohne unnötige Abstraktionen

### 4. Angular-Microfrontends und Web Components

- Verständnis von Angular Elements
- Bereitstellung ausgewählter Angular-Komponenten als Custom Elements
- Definition von Komponentenverträgen und Integrationsgrenzen
- Bewertung der Möglichkeiten und Kompromisse von Microfrontend-Architekturen

### 5. npm-Pakete und Azure DevOps Artifacts

- Paketierung wiederverwendbarer Libraries
- Verwaltung von Paketversionen und Abhängigkeiten
- Veröffentlichung und Verwendung von Paketen
- Einsatz von Azure DevOps Artifacts als privater Paket-Registry

### 6. Backend mit Next.js

- Einführung von Next.js als Backend der Anwendung
- Entwurf von REST-API-Endpunkten
- Validierung, Geschäftsoperationen und Fehlerbehandlung
- Verarbeitung importierter und exportierter Finanzdaten
- Integration einer Datenhaltung und einer Authentifizierung, sofern erforderlich

### 7. Einführung in Vue.js

- Grundlegende Konzepte von Vue.js
- Komponenten, Reaktivität und Anwendungsstruktur
- Aufbau eines separaten Frontend-Clients

### 8. Vue.js, DDD und ein bestehendes Backend

- Strukturierung einer Vue.js-Anwendung mit klaren fachlichen Grenzen
- Anwendung architektonischer Prinzipien ohne die Übernahme Angular-spezifischer Muster
- Nutzung der bestehenden Next.js-REST-API
- Trennung der Verantwortlichkeiten zwischen Frontend und Backend

### 9. Vue.js mit Angular Elements

- Integration ausgewählter Angular Custom Elements in die Vue.js-Anwendung
- Definition von Verträgen zwischen unabhängig implementierten UI-Komponenten
- Umgang mit Laden, Styling, Lebenszyklen und Versionskompatibilität
- Verständnis der Grenzen und Kompromisse bei der Wiederverwendung über Framework-Grenzen hinweg

## Repository-Struktur

Die Repository-Struktur wird sich zusammen mit der Implementierung weiterentwickeln.

Die angestrebte Struktur auf oberster Ebene sieht folgendermaßen aus:

```text
enterprise-frontend-workshop/
├── apps/                  # Anwendungen im NX-Workspace
├── libs/                  # Wiederverwendbare Libraries mit klaren Grenzen
├── docs/                  # Architekturentscheidungen und technische Dokumentation
├── articles/              # Artikelentwürfe und Veröffentlichungsreferenzen
├── README.md              # Englische Hauptversion
├── README.de.md           # Deutsche Version
├── README.ru.md           # Russische Version
├── HASHTAGS.md            # Kontrolliertes Hashtag-Vokabular für Veröffentlichungen
└── LICENSE                # Wird nach Auswahl einer Lizenz ergänzt
```

Diese Struktur beschreibt den angestrebten Zustand und ist keine Verpflichtung, alle Verzeichnisse sofort anzulegen. Anwendungs- und Library-Verzeichnisse werden ergänzt, wenn der NX-Workspace und die Funktionalität wachsen.

## Technische Veröffentlichungen

Das Repository begleitet eine mehrsprachige Serie technischer Veröffentlichungen.

- **Primäre technische Inhalte:** Englisch
- **Russischsprachige Veröffentlichungen:** Angepasste Artikel und Diskussionen für die Around-IT-Community auf VK
- **Deutschsprachige Veröffentlichungen:** Ausführlichere Fachbeiträge und Artikelankündigungen auf LinkedIn
- **Weitere berufliche Präsenz:** Xing

Die Artikel erläutern den Kontext, die Begründung, die Implementierung, mögliche Alternativen und die jeweiligen Kompromisse hinter den gezeigten Lösungen.

Format und visuelle Gestaltung können je nach Plattform variieren. Die technischen Konzepte und Codebeispiele im Repository bleiben dabei aufeinander abgestimmt.

## Umfang und Status

Dieser Engineering-Workshop ist ein fortlaufendes Projekt.

Die Roadmap beschreibt geplante Arbeiten. Sie bedeutet nicht, dass alle Funktionen, Libraries, Architekturregeln oder Backend-Fähigkeiten bereits implementiert sind.

Architekturentscheidungen werden im Verlauf des Projekts dokumentiert. Dazu gehören die Begründung wichtiger Entscheidungen und die Beschreibung der damit verbundenen Kompromisse.

## Projektziele

Der Workshop soll praxisnahe Ansätze für folgende Themen vermitteln:

- Entwicklung von Enterprise-Frontend-Anwendungen mit klaren Architekturgrenzen
- Kapselung fachlicher Verantwortlichkeiten
- Beherrschung wachsender Komplexität
- Wiederverwendung von Komponenten durch klar definierte Verträge
- Integration von Frontend-Anwendungen mit einem gemeinsamen Backend
- Verantwortungsbewusster Einsatz von KI-Werkzeugen in der Softwareentwicklung

Im Mittelpunkt stehen Engineering-Entscheidungen, die die langfristige Wartbarkeit unterstützen, nicht die isolierte Betrachtung einzelner Framework-Funktionen.
