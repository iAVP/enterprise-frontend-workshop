# NX Fundamentals — Grundlagen eines Enterprise-Frontend-Workspace

**Status:** In Arbeit. Dieser Artikel baut auf dem veröffentlichten NX-Workspace-Artikel auf. Er erklärt den bestehenden Workspace und seine Weiterentwicklung, ohne die erstmalige Einrichtung und Anwendungsgenerierung zu wiederholen.

## NX-Workspace-Konzepte und Projektorganisation

Erklären, was NX als Projekt betrachtet, wie Projekte erkannt werden und warum ein Workspace mehr als ein Verzeichnis mit mehreren Anwendungen ist.

## Rollen von apps/ und libs/

Den Unterschied zwischen ausführbaren bzw. auslieferbaren Anwendungen und Bibliotheken erläutern. Nicht den Eindruck erwecken, jeder Code müsse sofort in eine Bibliothek ausgelagert werden.

## Projektkonfiguration und Targets

Projektkonfiguration, inferierte Targets und explizite Konfiguration auf konzeptioneller Ebene erklären. Beispiele müssen aus dem aktuellen Repository stammen.

## Wie NX Projekte findet und Tasks ausführt

Zeigen, wie der Workspace untersucht und wie Projektnamen sowie verfügbare Targets ermittelt werden. Befehle mit der installierten NX-Version und der tatsächlichen Konfiguration abgleichen.

## Projekte starten, bauen, testen und linten

Die bereits eingeführten Befehle mit dem Projekt- und Task-Modell von NX verbinden. Den vollständigen Ablauf der ersten Validierung aus dem vorherigen Artikel nicht wiederholen.

## Projektgraph und Task-Graph

Den Unterschied zwischen Abhängigkeiten zwischen Projekten und den von NX ausgeführten Tasks erklären. Befehle und Abbildungen erst nach einer Prüfung im aktuellen Workspace ergänzen.

## Caching und affected-Befehle

Den Zweck des Task-Cachings und von affected-Workflows erklären. Keine Aussagen über CI-Optimierung oder Cache-Treffer machen, bevor Konfiguration und tatsächliches Verhalten geprüft wurden.

## Architektur einführen, ohne zu früh zu abstrahieren

NX-Funktionen mit Architekturentscheidungen verbinden. Zwischen bereits implementierten Funktionen und späteren Vorhaben unterscheiden: Domänenbibliotheken, Project-Tags und erzwungene Modulgrenzen existieren erst, wenn sie tatsächlich umgesetzt wurden.

## Aktueller Implementierungsstand

Der vorherige Artikel zu NX Workspace dokumentiert zwei Schritte:

- Branch `NX-Workspace`: Initialisierung des NX Workspace.
- Branch `NX-Workspace+1`: Generierung einer minimalen Angular-Anwendung samt E2E-Projekt sowie Prüfungen von Build, Unit-Tests, Lint und Playwright-Einrichtung.

Dies ist ein Ausgangspunkt, keine fertige Enterprise-Architektur. Fachliche Funktionen, domänenorientierte Bibliotheken, Project-Tags und Regeln für Modulgrenzen müssen in späteren Schritten bewusst eingeführt werden.

## Weiterführende Dokumentation

- [Offizielle NX-Dokumentation](https://nx.dev/)
- [NX-Workspace-Konfiguration](https://nx.dev/reference/nx-json)
- [NX-Projektkonfiguration](https://nx.dev/reference/project-configuration)
- [NX-Projektgraph](https://nx.dev/features/explore-graph)
