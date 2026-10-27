<!-- ENTWURF: Festgelegte theoretische Einleitung. Ohne gesonderte Abstimmung nicht bearbeiten. -->

# NX Fundamentals: Architektur für ein Enterprise-Frontend-Projekt aufbauen

## Architektur vor Technologie

Bei der Entwicklung einer Enterprise-Anwendung beginnt man leicht mit der Auswahl von Technologien: Angular oder React, ein Monorepo oder mehrere Repositories, ein bestimmtes Build-System oder eine Sammlung von Bibliotheken.

Sinnvoller ist es, zunächst andere Fragen zu beantworten:

- Welche Probleme soll das Produkt lösen?
- Welche Anwendungen und Plattformen müssen unterstützt werden?
- Wie interagieren die verschiedenen Teile des Systems?
- Was soll gemeinsam genutzt werden und was unabhängig bleiben?
- Wie wirkt sich die Architektur auf Entwicklungs- und Wartungskosten aus?

Technologien helfen dabei, eine Architektur umzusetzen, definieren sie aber nicht von selbst.

## Architektur ist mehr als Technologie

Softwarearchitektur betrifft nicht nur die Code-Struktur. Sie hängt mit Geschäftsanforderungen, finanziellen Rahmenbedingungen, den Fähigkeiten des Teams, organisatorischen Prozessen und der langfristigen Wartung eines Produkts zusammen.

Eine technisch attraktive Lösung kann beispielsweise unwirtschaftlich sein, wenn für ihre Wartung schwer zu findende Spezialisten eingestellt werden müssen. Umgekehrt kann die Nutzung vorhandener Infrastruktur Kosten senken und die Einführung beschleunigen, selbst wenn technisch modernere Alternativen verfügbar sind.

Architekturentscheidungen sollten daher im Kontext des konkreten Projekts bewertet werden.

## Warum lebt Architektur länger als Technologie?

Technologien und Werkzeuge verändern sich schneller als die grundlegenden Anforderungen und Organisationsprinzipien eines Systems. Architektur ist allerdings nicht unveränderlich: Wesentliche Änderungen der Anforderungen können es nötig machen, Teile davon neu zu bewerten.

Eine gute Architektur hilft, die Auswirkungen solcher Änderungen zu begrenzen. Beispielsweise lässt sich Geschäftslogik, die nicht von einem bestimmten Frontend-Framework abhängt, auch bei einem Wechsel von Angular zu React oder Vue wiederverwenden.

Es reicht jedoch nicht, Code einfach in eine separate Bibliothek auszulagern. Die tatsächlichen Abhängigkeiten sind entscheidend: Eine Bibliothek, die Angular Dependency Injection, React Hooks oder die Vue Composition API verwendet, bleibt an das jeweilige Framework gebunden.

Das Ziel ist nicht, jede Abhängigkeit zu beseitigen, sondern sie explizit und beherrschbar zu machen.

## Architektur als wirtschaftliche Entscheidung

Betrachten wir ein Enterprise-Produkt, das auf mehreren Plattformen laufen soll.

Dazu können eine Webanwendung, ein Desktop-Client und mobile Anwendungen gehören. Sie haben möglicherweise unterschiedliche Einstiegspunkte, Build-Prozesse, Startabläufe und Anforderungen an die Benutzeroberfläche. Gleichzeitig können Teile der Geschäftslogik und der Regeln gemeinsam genutzt werden.

Eine gemeinsame Codebasis bedeutet nicht, dass alle Anwendungen dieselbe Struktur oder denselben Technologie-Stack verwenden müssen. Entscheidend ist, zu erkennen, welche Teile tatsächlich wiederverwendbar sind und welche separate Lösungen benötigen.

Dasselbe gilt für unterschiedliche Teams. Ein Team kann Angular einsetzen, ein anderes React oder Vue. Wenn die gemeinsame Geschäftslogik nicht von einem bestimmten Framework abhängt, kann sie unabhängig von der Benutzeroberfläche weiterentwickelt und wiederverwendet werden.

## Praxisbeispiel: Mobile Anwendung und vorhandene Infrastruktur

In einem Projekt musste eine mobile Anwendung für iOS und Android entstehen, die in bereits verwendete Unternehmenssysteme integriert war.

Anstatt die vertrauten Werkzeuge vollständig zu ersetzen, wurde ein Teil der Lösung auf der bestehenden SharePoint-Umgebung aufgebaut. So konnten die Mitarbeitenden weiterhin in einer vertrauten Umgebung arbeiten, ohne unnötig ein zusätzliches System erlernen zu müssen.

Zur Verarbeitung von Änderungen kamen Azure WebJobs und zugehörige Dienste zum Einsatz. Für Push-Benachrichtigungen auf beiden mobilen Plattformen wurde Firebase verwendet. Dadurch stand ein gemeinsamer Benachrichtigungsmechanismus zur Verfügung, ohne den gesamten Ablauf für jede Plattform separat aufbauen zu müssen.

Das bedeutet nicht, dass SharePoint, Azure oder Firebase immer die beste Wahl sind. Entscheidend ist vielmehr, dass eine Architektur die vorhandene Infrastruktur, die Gewohnheiten der Anwender, die verfügbaren Kompetenzen und die Wartungskosten berücksichtigt.

## Architektur verbindet Technologie, Menschen und Wirtschaftlichkeit

Aus diesen Beispielen ergibt sich eine wichtige Schlussfolgerung: Architektur soll nicht nur die technische Funktionsfähigkeit eines Systems sicherstellen. Sie soll helfen, Komplexität zu beherrschen und bei veränderten Anforderungen flexibel zu bleiben.

Dazu müssen Grenzen zwischen Anwendungen und Bibliotheken, Abhängigkeitsregeln und die Ablage gemeinsamer Funktionalität festgelegt werden.

Hier wird NX hilfreich.

## Von Architekturentscheidungen zum NX Workspace

NX ist kein Werkzeug, das automatisch die richtige Architektur erstellt. Es ersetzt weder architektonisches Denken noch trifft es geschäftliche Entscheidungen für das Team.

Sein Nutzen besteht darin, ein Monorepo zu strukturieren, Regeln für die Zusammenarbeit zwischen Projekten festzulegen und architektonische Einschränkungen zu überprüfen.

So lassen sich beispielsweise Anwendungen und Bibliotheken trennen, gemeinsam genutzter Code identifizieren, zulässige Abhängigkeitsrichtungen festlegen und unbeabsichtigte Kopplungen zwischen unabhängigen Teilen verhindern.

NX hilft damit, Architekturvereinbarungen in überprüfbare Regeln zu überführen, die nicht nur in der Dokumentation, sondern auch im Entwicklungsalltag gelten.

## Was werden wir in diesem Artikel umsetzen?

Ein NX Workspace und ein grundlegendes Angular-Projekt sind bereits vorhanden. Wir erstellen den Workspace daher nicht erneut von Grund auf, sondern entwickeln die bestehende Struktur weiter.

Wir untersuchen, wie Anwendungen und Bibliotheken organisiert werden, wo gemeinsame Styles und Konfigurationen liegen, wie wiederverwendbare Geschäftslogik herausgelöst und wie Abhängigkeiten zwischen den Systemteilen kontrolliert werden können.

Jede Änderung betrachten wir nicht nur technisch, sondern auch im Hinblick auf ihre architektonische Begründung: Welches Problem löst sie, warum wurde dieser Ansatz gewählt und welche Einschränkungen müssen berücksichtigt werden?

Das Ziel ist nicht nur ein funktionierender NX Workspace, sondern eine Struktur für ein Enterprise-Frontend-Projekt, die sich kontinuierlich weiterentwickeln und warten lässt.

---

<!-- Die bestehende Arbeitsgliederung folgt und bleibt erhalten. -->

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
