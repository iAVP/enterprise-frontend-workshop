# The Road to Architecture: Architektur vor Technologien

## Architektur vor Technologien

### Was bleibt bestehen, während sich alles andere verändert?

In der Softwareentwicklung verändern sich Technologien deutlich schneller als die Architektur der Systeme, auf denen sie basieren. Neue Frameworks, Build-Tools und Bibliotheken kommen hinzu; Geschäftsanforderungen, Prozesse und Teamstrukturen entwickeln sich weiter. Trotzdem bleiben grundlegende Architekturentscheidungen oft über Jahre hinweg bestehen: die Aufteilung von Verantwortlichkeiten, Modulgrenzen und Regeln für Abhängigkeiten.

**Architektur bestimmt nicht nur, wie ein System heute aufgebaut ist, sondern auch, wie einfach wir es morgen verändern können.** Deshalb sollte eine Diskussion über Architektur nicht mit der Wahl eines Frameworks beginnen, sondern mit der Frage, welche Probleme wir lösen und welche Entscheidungen langfristig Bestand haben sollen.

## Architektur ist mehr als Technologie

Stellen wir uns vor, eine Organisation entwickelt mehrere Frontend-Anwendungen: eine für Desktop-Computer, eine für mobile Geräte. Sie können unterschiedliche Oberflächen, Build-Konfigurationen, Tests und Deployment-Prozesse benötigen. Ein Teil der Funktionalität kann dennoch gemeinsam sein – etwa Datenmodelle, typisierte Schnittstellenverträge oder Geschäftsregeln.

Die Architekturfrage lautet: Wie organisieren wir gemeinsam genutzte Funktionalität, ohne die Anwendungen zu stark voneinander abhängig zu machen? Dafür müssen wir Verantwortlichkeiten abgrenzen, Regeln für die Zusammenarbeit festlegen und entscheiden, welche Änderungen mehrere Anwendungen betreffen und welche lokal bleiben sollen.

Architektur liegt an der Schnittstelle mehrerer Bereiche:

- **Technologien** bestimmen verfügbare Werkzeuge und technische Einschränkungen.
- **Das Geschäft** definiert Anforderungen an Funktionalität, Termine und Produktentwicklung.
- **Finanzen** setzen den Rahmen für Entwicklung, Wartung und Veränderungen.
- **Teams** bringen Wissen, Erfahrung und Arbeitsweisen ein.
- **Entwicklungsprozesse** bestimmen, wie Software erstellt, geprüft und ausgeliefert wird.
- **Architektur** verbindet diese Faktoren zu einem zusammenhängenden System von Entscheidungen.

Gute Architektur lässt sich daher nicht allein an modernen Technologien oder elegantem Code messen. Entscheidend ist, ob die Struktur zu den Aufgaben der Organisation passt und die Weiterentwicklung ermöglicht, ohne die Kosten für Änderungen unnötig zu erhöhen.

## Warum lebt Architektur länger als Technologie?

Eine Bibliothek kann ersetzt, ein Build-Werkzeug aktualisiert oder eine neue Plattform unterstützt werden, ohne dass die Architektur des gesamten Systems geändert werden muss. Gibt es beispielsweise eine klare Grenze zwischen Geschäftslogik und der konkreten Technologie für die Backend-Kommunikation, kann eine Bibliothek innerhalb des zuständigen Moduls ausgetauscht werden. Der Rest des Systems arbeitet weiterhin nach denselben Regeln.

Sind Abhängigkeiten dagegen unkontrolliert und Implementierungsdetails über die Anwendung verteilt, kann eine kleine technische Änderung zahlreiche scheinbar unabhängige Komponenten betreffen. Gute Architektur macht Änderungen nicht kostenlos, hilft aber, ihre Auswirkungen einzugrenzen.

Architektur darf zugleich kein Dogma sein. Wenn sich Geschäftsmodell, Produktanforderungen, Organisationsstruktur oder Umfang des Systems wesentlich verändern, können auch Architekturentscheidungen überprüft werden müssen.

**Architektur sollte sich ändern, wenn es dafür wesentliche Gründe gibt – nicht allein deshalb, weil eine neue technologische Möglichkeit verfügbar ist.**

## Architektur als wirtschaftliche Entscheidung

Jede technische Entscheidung wird unter wirtschaftlichen Bedingungen getroffen: Budgets sind begrenzt, Termine müssen eingehalten werden, und Teams müssen sowohl bestehende Systeme pflegen als auch neue Funktionen entwickeln.

Eine Organisation hat beispielsweise bereits ein Team mit Erfahrung in Angular und möchte eine mobile Anwendung erstellen. Ein Wechsel zu einem anderen Framework kann neue Schulungen oder zusätzliche Fachkräfte erfordern. Eine Alternative wäre, Angular beizubehalten und Ionic für die mobile Entwicklung zu verwenden. Dann kann das Team vorhandenes Wissen nutzen und muss zusätzlich die Ionic-Komponenten, das SDK und die Besonderheiten mobiler Plattformen erlernen.

Beide Varianten können sinnvoll sein. Entscheidend sind Anforderungen, Plattformen, verfügbare Kompetenzen, Entwicklungsgeschwindigkeit und Wartungskosten.

**Eine gute Architekturentscheidung ist nicht zwangsläufig die modernste. Sie ist eine Entscheidung, die zu den Anforderungen des Systems und zu den Bedingungen seiner Entwicklung und Wartung passt.**

## Eine Organisation – unterschiedliche Anwendungen und Technologie-Stacks

In einer Organisation kann ein Team Angular verwenden, ein zweites Vue und ein drittes React. Das kann historisch gewachsen sein, auf unterschiedliche Produktanforderungen zurückgehen oder aus der Zusammenführung von Teams und Produkten entstehen.

Nicht immer ist es sinnvoll, alle Projekte sofort auf ein Framework umzustellen. Eine Migration kostet Zeit und Geld und schafft zusätzliche Risiken. Wichtiger ist zu bestimmen, welche Teile des Systems tatsächlich gemeinsam genutzt werden sollen.

Mehrere Anwendungen können gemeinsame TypeScript-Modelle, typisierte Verträge, Datenverarbeitungsalgorithmen oder Geschäftsregeln verwenden, die nicht von einem bestimmten Frontend-Framework abhängen. Solche Teile lassen sich als unabhängige Bibliotheken organisieren.

Dabei müssen Technologiegrenzen klar bleiben: Eine Bibliothek, die Angular Dependency Injection, React Hooks oder die Vue Composition API verwendet, hängt bereits vom jeweiligen Ökosystem ab. TypeScript allein macht sie nicht frameworkunabhängig.

**Das Ziel ist, die gemeinsame Weiterentwicklung unterschiedlicher Anwendungen zu ermöglichen, ihre Eigenständigkeit dort zu bewahren, wo sie gebraucht wird, und Funktionalität dort wiederzuverwenden, wo es sinnvoll ist.**

## Eine gemeinsame Codebasis bedeutet nicht gemeinsame Prozesse

Auch Anwendungen mit demselben Framework müssen nicht dieselbe Struktur, Konfiguration oder denselben Lebenszyklus haben. Eine Desktop-Anwendung kann eigene Build-, Test- und Deployment-Anforderungen besitzen; eine mobile Anwendung muss Gerätefunktionen und die Anforderungen der jeweiligen Vertriebsplattform berücksichtigen.

Jede Anwendung kann eigene Teams, Konfigurationsdateien und Skripte haben, während bestimmte Geschäftslogik gemeinsam bleibt. Beispielsweise können beide Anwendungen dieselben Facades verwenden, die eine einheitliche Schnittstelle für den Datenzugriff bereitstellen und die Kommunikation mit Backend-Services kapseln.

Entscheidend ist, klar festzulegen, wo die Verantwortung des gemeinsamen Codes endet und die Verantwortung der jeweiligen Anwendung beginnt. Die gemeinsame Codebasis sollte nicht erzwingen, dass alle Projekte dieselben Entwicklungsprozesse verwenden.

## Wenn Backend und Frontend ganz anders zusammenspielen als erwartet

In einem Projekt sollte eine mobile Anwendung für Nutzer entwickelt werden, die bereits mit SharePoint arbeiteten. Sie kannten die vorhandenen Tabellen und Abläufe gut, und es blieb kaum Zeit, ein neues System zu erlernen. Die Lösung sollte deshalb schnell eingeführt werden und die gewohnte Arbeitsweise möglichst wenig verändern.

Anstatt ein separates klassisches Backend von Grund auf zu entwickeln, nutzten wir das vorhandene SharePoint-Ökosystem als Grundlage. Die Daten wurden in miteinander verknüpften SharePoint-Tabellen organisiert. Azure-Services und WebJobs übernahmen einen Teil der serverseitigen Automatisierung und reagierten auf Änderungen an den Daten.

Für die mobile Anwendung kamen Google Cloud und Firebase zum Einsatz, unter anderem für Push-Benachrichtigungen. Services auf der Azure-Seite verknüpften Änderungen in SharePoint mit dem Cloud-Teil, der Benachrichtigungen an mobile Geräte zustellte. Für die Authentifizierung wurden Microsoft-Mechanismen verwendet.

So entstand eine mobile Anwendung für iOS und Android, in der SharePoint einen wesentlichen Teil der Lösung bildete und die serverseitige Logik über mehrere Cloud-Plattformen verteilt war. Auf den ersten Blick wirkt das ungewöhnlich: Daten und ein Teil der Logik liegen in SharePoint und Azure, die mobile Anwendung verwendet Google Cloud und Firebase, und die Authentifizierung basiert auf Microsoft-Werkzeugen.

Es war jedoch eine bewusste Entscheidung, die vorhandenen Kenntnisse der Nutzer, die Expertise des Teams, die Termine und die Notwendigkeit einer schnellen Umsetzung berücksichtigte. Firebase bot einen gemeinsamen Mechanismus für Push-Benachrichtigungen auf iOS und Android. So mussten wir keine separate Infrastruktur aufbauen und waren nicht auf eine zusätzliche Fachkraft mit umfassender Apple-Erfahrung angewiesen.

Das bedeutet nicht, dass eine solche Architektur einem traditionellen Backend grundsätzlich überlegen ist. Sie hat eigene Einschränkungen, Integrationsrisiken und betriebliche Anforderungen. Sie zeigt aber, dass reale Systeme nicht immer in das Lehrbuchschema „Frontend ruft Backend auf, Backend greift auf die Datenbank zu“ passen.

**Manchmal besteht die Architekturaufgabe nicht darin, eine einzige ideale Technologie auszuwählen, sondern darin, bestehende Technologien, das Wissen der Menschen und die Rahmenbedingungen der Organisation sinnvoll zu einem funktionierenden Produkt zu verbinden.**

## Architektur verbindet Technologie, Menschen und Wirtschaftlichkeit

Das Beispiel mit SharePoint, Azure und Firebase zeigt, dass Architekturentscheidungen nicht nur durch technische Vorlieben bestimmt werden. Geschäftsanforderungen, Nutzererfahrung, Teamkompetenzen, Termine und Kosten spielen ebenfalls eine Rolle. Es gibt deshalb selten nur eine einzig richtige Lösung. Entscheidend ist ein Ansatz, der zu den konkreten Projektbedingungen passt und sich langfristig warten lässt.

Mit der Zeit können neue Anwendungen und Bibliotheken hinzukommen, Teams wachsen und Anforderungen sich verändern. Dabei entstehen manchmal unbeabsichtigte Abhängigkeiten: Gemeinsame Module hängen plötzlich von konkreten Anwendungen ab, und Änderungen an einer Stelle wirken sich auf andere Bereiche aus.

Wenn die Zahl der Projekte wächst, reicht es nicht mehr aus, Architekturvereinbarungen allein durch Dokumentation und die Aufmerksamkeit des Teams aufrechtzuerhalten.

## Von Architekturentscheidungen zum NX Workspace

Architekturgrenzen müssen nicht nur definiert, sondern auch im Entwicklungsalltag eingehalten werden. Dafür braucht es eine verständliche Projektstruktur, kontrollierbare Abhängigkeiten und automatisierte Prüfungen.

Hier kommt NX ins Spiel. NX bietet Werkzeuge, um Anwendungen und Bibliotheken innerhalb eines Workspace zu organisieren, Entwicklungsaufgaben zu verwalten, Abhängigkeiten zu analysieren und architektonische Einschränkungen zu kontrollieren.

NX erzeugt jedoch nicht automatisch eine gute Architektur. Es entscheidet nicht, wie Verantwortlichkeiten aufgeteilt werden sollen oder welche Abhängigkeiten sinnvoll sind. Es hilft aber, getroffene Entscheidungen in der Projektstruktur abzubilden und ihre Einhaltung zu einem Teil des Entwicklungsalltags zu machen.

**Zuerst definieren wir die Architektur. Anschließend verwenden wir NX, um sie in der Struktur des Workspace auszudrücken und die festgelegten Grenzen einzuhalten.**

## Was werden wir in diesem Artikel umsetzen?

Bis hierhin haben wir betrachtet, warum Architektur wichtiger ist als eine bestimmte Auswahl an Technologien, warum eine gemeinsame Codebasis nicht zwangsläufig einen einheitlichen Technologie-Stack voraussetzt und wie Architekturentscheidungen mit der Organisation der Teams sowie mit den Kosten für Entwicklung und Wartung zusammenhängen.

Jetzt wechseln wir von den allgemeinen Prinzipien zur Praxis.

Wir verfügen bereits über einen NX Workspace und ein grundlegendes Angular-Projekt. Deshalb müssen wir den Workspace nicht erneut anlegen, von Grund auf konfigurieren oder bereits behandelte Schritte wiederholen. Stattdessen entwickeln wir das bestehende Projekt weiter und machen aus einem minimalen Ausgangspunkt schrittweise ein besser organisiertes System mit einer bewusst gestalteten Architektur.

Unsere Aufgabe ist es, den Code innerhalb des Workspace so zu organisieren, dass seine Struktur Architekturentscheidungen widerspiegelt und nicht nur der bequemen Ablage von Dateien dient.

Dazu beschäftigen wir uns mit mehreren Fragen:

- **Wie teilen wir Verantwortlichkeiten zwischen Anwendungen und Bibliotheken auf?** Welcher Code gehört zu einer konkreten Anwendung, und welche Funktionalität sollte zur Wiederverwendung ausgelagert werden?
- **Wie organisieren wir gemeinsame Geschäftslogik?** Wie trennen wir sie von Benutzeroberfläche und Infrastrukturdetails, ohne unnötige Abhängigkeiten zu schaffen?
- **Wie gestalten wir Abhängigkeiten zwischen Systemteilen?** Wie bleiben sie verständlich, vorhersehbar und mit den Architekturgrenzen vereinbar?
- **Wie nutzen wir NX, um die gewählte Architektur zu unterstützen?** Welche Mechanismen helfen, Projekte zu organisieren, Abhängigkeiten zu analysieren und unerwünschte Architekturentscheidungen zu verhindern?

Wir werden nicht versuchen, möglichst viele Bibliotheken zu erstellen oder die Struktur um ihrer selbst willen zu verkomplizieren. Die Anzahl der Anwendungen, Bibliotheken und Abstraktionsebenen ist für sich genommen kein Maß für Architekturqualität.

Unser Ziel ist ein vernünftiges Gleichgewicht zwischen Code-Wiederverwendung, der Unabhängigkeit einzelner Systemteile und den Kosten der weiteren Entwicklung.

Architektur soll Entwicklern helfen, reale Aufgaben zu lösen, statt zusätzliche Hindernisse aufzubauen. Ein gut organisierter Workspace macht nachvollziehbar, wo sich eine Funktionalität befindet, wer dafür verantwortlich ist, wovon sie abhängt und welche Folgen Änderungen haben können.

**Deshalb betrachten wir NX nicht einfach als Werkzeug zur Organisation eines Monorepositories, sondern als Mittel, um Architekturentscheidungen in einem bereits bestehenden Projekt umzusetzen und langfristig zu unterstützen.**
