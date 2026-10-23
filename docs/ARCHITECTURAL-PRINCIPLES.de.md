# Architekturprinzipien

Dieses Dokument beschreibt die Architekturprinzipien des Enterprise Frontend Workshop.

Es legt die vorgesehenen Engineering-Praktiken und architektonischen Rahmenbedingungen fest. Es bedeutet nicht, dass die Anwendung, der NX-Workspace oder eine bestimmte Bibliothek bereits implementiert wurde.

## 1. Architektur von Anfang an

Das Projekt wird von Beginn der Implementierung an einen NX-Workspace verwenden.

Der Workspace organisiert Anwendungen und wiederverwendbare Bibliotheken unter `apps/` und `libs/`. Jedes Projekt erhält eine eigene Projektkonfiguration.

Die Architektur wird sich schrittweise mit der Anwendung weiterentwickeln. Komplexität sollte nur eingeführt werden, wenn sie ein tatsächliches Problem löst.

Grundsätze:

- Von Anfang an eine konsistente Workspace-Struktur schaffen.
- Projektkonfigurationen explizit halten.
- Verfrühte Abstraktionen und spekulative Bibliotheken vermeiden.
- Architektonische Regeln mit der Entwicklung der Projektstruktur einführen.
- Eine bewusste Weiterentwicklung einer groß angelegten Umstrukturierung vorziehen.

## 2. Explizite Modulgrenzen

Module und Bibliotheken sollten klar definierte Verantwortlichkeiten und explizite Abhängigkeitsrichtungen haben.

NX- und ESLint-Regeln für Modulgrenzen machen architektonische Vorgaben sichtbar und durchsetzbar.

Ziel ist es, unbeabsichtigte Kopplung zu verhindern, Modularität zu erhalten und die unabhängige Entwicklung fachlicher Bereiche zu unterstützen.

Grundsätze:

- Verantwortlichkeiten einer Bibliothek festlegen, bevor Abhängigkeiten zwischen Bibliotheken eingeführt werden.
- Projekt-Tags und `@nx/enforce-module-boundaries` einsetzen, wo es sinnvoll ist.
- Abhängigkeiten entsprechend der Architekturabsicht einschränken.
- Unbeschränkte Shared Libraries vermeiden, die zu Sammelbecken werden.
- Gemeinsame Funktionalität klein, bewusst und klar definiert halten.

Architekturgrenzen sollten tatsächliche Probleme mit Abhängigkeiten oder Zuständigkeiten lösen und nicht nur existieren, um ein Diagramm zu erfüllen.

## 3. Domain-Driven Design und Verantwortungstrennung

Domain-Driven Design (DDD) bietet eine gemeinsame Sprache, um Software anhand fachlicher Fähigkeiten und Domänenkonzepte zu strukturieren.

Im Frontend bedeutet das, Verantwortlichkeiten zu trennen und fachliche Grenzen explizit zu machen. Es bedeutet nicht, jedes DDD-Muster des Backends mechanisch in der UI nachzubilden.

Der Workshop untersucht die praktische Anwendung von DDD-Konzepten in einem NX-basierten Frontend.

Grundsätze:

- Code nach sinnvollen fachlichen Verantwortlichkeiten organisieren.
- Fachliche Konzepte von technischer Infrastruktur unterscheiden.
- Abhängigkeiten zwischen fachlichen Bereichen explizit machen.
- Unnötige Schichten und Abstraktionen vermeiden.
- Eine gemeinsame Fachsprache verwenden, wenn sie Kommunikation und Codeverständlichkeit verbessert.

## 4. Trennung von UI, Zustand und Datenzugriff

UI-Komponenten sollten in erster Linie Zustand darstellen, Benutzereingaben erfassen und Interaktionen koordinieren.

Zustandsverwaltung und Datenzugriff sollten in Services mit klaren Verantwortlichkeiten gekapselt werden.

Der vorgesehene Ansatz unterscheidet mehrere Verantwortlichkeiten:

- **UI-Komponenten:** Zustand darstellen, Benutzereingaben erfassen und präsentationsbezogene Interaktionen behandeln. Das gilt sowohl für gewöhnliche Feature-Komponenten als auch für wiederverwendbare Shared Components.
- **Facades:** Den benötigten Zustand und die erforderlichen Operationen bereitstellen und Anwendungs- oder UI-Logik hinter einer expliziten Schnittstelle kapseln.
- **Use Cases:** Anwendungsoperationen koordinieren, wenn zusätzliche Orchestrierung gerechtfertigt ist.
- **Datenzugriff:** Mit Backend-APIs kommunizieren und bei Bedarf Transportdaten transformieren.
- **Gemeinsame Basisfunktionalität:** Eng umrissene technische Hilfsfunktionen mit expliziten Verträgen bereitstellen.

Komponenten sollten in der Regel die für ihren Funktionsbereich zuständige Facade injizieren, statt Fach- oder Anwendungslogik selbst zu implementieren. Sie binden sich an den bereitgestellten Zustand und rufen als Reaktion auf Benutzereingaben Facade-Operationen auf. Präsentationsspezifische Logik kann in der Komponente verbleiben; Geschäftsregeln und Workflows gehören jedoch in die passende Facade oder den entsprechenden Anwendungsservice.

Diese Kategorien beschreiben Verantwortlichkeiten. Sie bedeuten nicht, dass für jede Kategorie eine eigene Bibliothek angelegt werden muss. Die konkrete Struktur hängt von der Anwendung und ihrer Komplexität ab.

## 5. Gekapseltes State Management

Angular Signals sind der primäre Mechanismus für synchronen reaktiven Zustand im Angular-Frontend.

Der Workshop behandelt `signal`, `computed` und `effect` einschließlich ihrer sinnvollen Einsatzbereiche und Grenzen.

Grundsätze:

- Zustand in der Komponente, im Service oder in der Facade kapseln, die dafür verantwortlich ist.
- Nur den Zustand und die Operationen bereitstellen, die Verbraucher tatsächlich benötigen.
- `computed` für abgeleiteten Zustand verwenden.
- `effect` für geeignete Seiteneffekte einsetzen, nicht als Ersatz für einen normalen Datenfluss.
- Unnötigen globalen Zustand und versteckte Kopplung vermeiden.
- Zentrales State Management anhand des tatsächlichen Bedarfs bewerten, statt es als universellen Standard zu behandeln.

RxJS bleibt für asynchrone Streams, Abbruch, Komposition und andere streamorientierte Aufgaben relevant. Angular-HTTP-Observables können direkt verwendet oder in Signals umgewandelt werden, wenn das besser zum konsumierenden Code passt.

Ziel ist nicht, RxJS abzuschaffen. Ziel ist es, für jede Verantwortung das passende Modell für Zustand und asynchrone Verarbeitung zu wählen.

## 6. Wiederverwendung durch explizite Verträge

Wiederverwendbare Komponenten und Bibliotheken sollten klare und stabile Verträge anbieten.

Wiederverwendung ist sinnvoll, wenn sie Duplikate reduziert, Verantwortlichkeiten verdeutlicht oder Konsistenz schafft. Sie wird kontraproduktiv, wenn Abstraktionen mehr Komplexität verursachen, als sie beseitigen.

Grundsätze:

- Explizite Inputs, Outputs und Service-Schnittstellen bevorzugen.
- Versteckte Abhängigkeiten zwischen nicht zusammengehörigen Modulen vermeiden.
- Alle UI-Komponenten auf Darstellung und Interaktion fokussieren; Anwendungslogik wird in injizierten Facades oder Services gekapselt.
- Wiederverwendbare Shared-UI-Komponenten frei von fachbereichsspezifischer Geschäftslogik halten.
- Design-Tokens und UI-Konventionen bewusst gemeinsam nutzen.
- Eine Lösung nicht verallgemeinern, bevor mehrere reale Anwendungsfälle dies rechtfertigen.

## 7. Designsysteme und Design-Tokens

Die UI wird Angular Material, Material-3-(M3-)Theming und Design-Tokens als Bestandteile eines wartbaren Frontend-Designsystems untersuchen.

Design-Tokens repräsentieren gemeinsame Designentscheidungen wie Farben, Typografie, Abstände, Radien und weitere visuelle Eigenschaften.

Der Workshop unterscheidet zwischen:

- Quell- und Basis-Tokens.
- Semantischen Tokens, die die Designabsicht ausdrücken.
- Der Verwendung von Design-Tokens auf Komponentenebene.
- Theme-Konfiguration und Anpassung von Komponenten.

Angular Material ist eine Komponentenbibliothek, für sich allein jedoch kein vollständiges Designsystem. Ein konsistentes Designsystem erfordert zusätzlich bewusste Entscheidungen zu Tokens, Semantik, Komponentenverhalten und visueller Konsistenz.

Ziel ist es, einen klaren Vertrag zwischen Designabsicht und Frontend-Implementierung zu schaffen.

## 8. Verträge zwischen Frontend und Backend

Die Beispielanwendung entwickelt sich von einem Angular-Frontend zu einer Fullstack-Architektur weiter, in der Next.js als Backend und REST-APIs eingesetzt werden.

Das Frontend sollte von expliziten API-Verträgen und nicht von Implementierungsdetails des Backends abhängen.

Grundsätze:

- Transportdetails von UI-Komponenten trennen.
- Übergreifendes HTTP-Verhalten bei Bedarf zentralisieren.
- Lade-, Validierungs- und Fehlerzustände bewusst behandeln.
- Die API-Integration an den fachlichen Grenzen der Anwendung ausrichten.
- Keine zusätzliche Backend-Laufzeit ohne klaren architektonischen Grund einführen.

Next.js stellt die für die Beispielanwendung benötigten Backend-Funktionen bereit. Zusätzliche Infrastruktur muss durch eine konkrete Anforderung gerechtfertigt sein.

## 9. Microfrontends und Web Components

Der Workshop untersucht die Frontend-Integration mit Angular Elements und Web Components, einschließlich der Einbindung ausgewählter Angular-Komponenten in eine Vue.js-Anwendung.

Diese Technologien ermöglichen die Interoperabilität auf Komponentenebene. Sie machen eine gesamte Anwendung nicht automatisch zu einem unabhängig deploybaren Microfrontend.

Die architektonische Betrachtung unterscheidet zwischen:

- Wiederverwendung von Komponenten über Framework-Grenzen hinweg.
- Web-Component-Verträgen und Lebenszyklus.
- Framework-spezifischen Abhängigkeiten und Laufzeitkosten.
- Strategien für unabhängiges Deployment und Integration.
- Gemeinsamen Backend-Verträgen für unterschiedliche Frontend-Frameworks.

Ziel ist es, praktische Interoperabilität zu zeigen, ohne sie mit einer vollständigen Microfrontend-Architektur gleichzusetzen.

## 10. KI-gestütztes und agentisches Engineering

KI-gestützte Entwicklung ist ein durchgängiges Engineering-Thema im gesamten Workshop.

Im Mittelpunkt stehen bessere Engineering-Ergebnisse und nicht allein eine schnellere Codegenerierung.

Mögliche Praktiken sind:

- Anforderungsanalyse und Zerlegung von Aufgaben.
- Spezifikationsgetriebene Entwicklung.
- Agentengestützte Implementierung und Refaktorierung.
- Generierung und Verifikation von Tests.
- Code-Reviews und Architekturanalyse.
- Context Engineering und effektiver Einsatz von Coding Agents.
- Menschliche Kontrolle, Sicherheit und Verantwortlichkeit.

Der Workshop unterscheidet KI-gestützte Softwareentwicklung, Agentic Engineering und die Entwicklung von KI-Agentensystemen.

Einen Coding Agent zur Implementierung eines Anwendungsfeatures einzusetzen, ist nicht dasselbe, wie ein agentisches KI-System als Bestandteil der Anwendung zu entwickeln.

Jede KI-generierte Implementierung muss denselben Architekturvorgaben, Testanforderungen und Qualitätsstandards genügen wie manuell geschriebener Code.

## 11. Wartbarkeit vor Abstraktion

Das Projekt priorisiert verständliche, testbare und wartbare Software.

Grundsätze:

- Einfache Lösungen bevorzugen, die tatsächliche Anforderungen erfüllen.
- Abstraktionen einführen, wenn sie Verantwortlichkeiten verdeutlichen oder relevante Duplikate reduzieren.
- Unnötige Indirektion vermeiden.
- Architektonische Abwägungen explizit machen.
- Tests, Codequalität und Wartbarkeit von Anfang an als Engineering-Aufgaben behandeln.

## 12. Architektur als fortlaufender Entscheidungsprozess

Diese Prinzipien leiten die zukünftige Implementierung und technische Veröffentlichungen. Sie behaupten nicht, dass jede Entscheidung bereits umgesetzt oder validiert wurde.

Wenn sich das Projekt weiterentwickelt, sollten architektonische Entscheidungen dokumentiert werden, sofern sie wesentliche Auswirkungen auf Abhängigkeiten, Wartbarkeit, Deployment oder Entwickler-Workflows haben.

Wichtige Änderungen können als Architecture Decision Records (ADRs) unter `docs/adr/` festgehalten werden, wenn es eine konkrete Entscheidung gibt, die es zu dokumentieren lohnt.

Die Architektur sollte sich durch explizite Begründungen, praktische Implementierung und Überprüfung weiterentwickeln.

---

**Leitprinzip:** Klare Grenzen schaffen, Verantwortlichkeiten kapseln und Komplexität nur dann einführen, wenn sie einen messbaren Engineering-Nutzen bietet.
