# NX Fundamentals: NX-Grundlagen für einen Enterprise-Frontend-Workspace

## Zweck und Bezug zu den bisherigen Artikeln

Dieser Artikel baut auf [NX Workspace](../NX-Workspace/README.de.md) auf. Die Initialisierung von NX, das Generieren der Angular-Anwendung und die ersten Build-, Test- und Lint-Prüfungen dürfen nicht erneut erklärt werden; diese Schritte sind bereits im vorherigen Artikel dokumentiert.

## Vorläufiger Plan

- Die tatsächliche Workspace- und Projektstruktur nach dem Implementierungsschritt `NX-Workspace+1` untersuchen.
- Erklären, wie NX-Projekte, Targets, Konfigurationsdateien und der Projektgraph zusammenhängen.
- Den nächsten Architektur-Schritt erst nach Prüfung des tatsächlichen Repository-Zustands behandeln.
- Klar zwischen bereits implementierten und nur vorgeschlagenen Elementen unterscheiden.
- Wesentliche technische Aussagen mit Links zur offiziellen NX-Dokumentation belegen.

## Implementierungsbasis

Vor dem Schreiben den Abschnitt [Implementierungsstatus und Umfang](../NX-Workspace/README.de.md#implementierungsstatus-und-umfang) lesen. Aktuell enthält das Repository einen funktionierenden NX Workspace, eine minimale Angular-Anwendung und ein End-to-End-Testprojekt. Business-Bibliotheken, Domänengrenzen, Projekt-Tags und die Durchsetzung von Module Boundaries sind noch nicht implementiert.

## Regel für den Entwurf

Vor neuen Befehlen oder Aussagen über vorhandene Implementierung die entsprechende Branch und die Dateien prüfen. Bereits im Artikel NX Workspace beschriebene Schritte nicht wiederholen.
