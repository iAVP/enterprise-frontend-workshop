# Angular in Depth — Teil 2: Die Evolution von Angular und des architektonischen Denkens eines Entwicklers

## 1. Architektonisches Denken ist älter als Angular

Mein Verständnis von Softwarearchitektur begann sich lange vor Angular und modernen Frontend-Frameworks zu entwickeln. Bereits in den 1990er-Jahren, als ich mit C++ und Delphi arbeitete, beschäftigte ich mich mit Aufgaben, die man heute durchaus als architektonische Fragestellungen bezeichnen könnte.

Die technische Umgebung unterschied sich damals deutlich von dem, was wir heute gewohnt sind. Wir arbeiteten in einem gemeinsamen Koaxialnetzwerk mit Terminatoren, ohne moderne Infrastruktur, vertraute Datenbanksysteme oder Versionsverwaltung. Der Code wurde gemeinsam entwickelt und schließlich zu einem einzigen Projekt zusammengeführt. Deshalb waren die Organisation der Arbeit und die Abstimmung gemeinsamer Konventionen in der Praxis mindestens ebenso wichtig wie die technischen Entscheidungen selbst.

Die Aufteilung der Aufgaben zwischen Darstellungssystem und Geschäftslogik war nicht im Voraus geplant. Sie entwickelte sich ganz natürlich. Einige waren stärker an der Frontend-Entwicklung interessiert, andere weniger; viele wechselten zunächst zwischen beiden Bereichen. Nach und nach wurde jedoch klar, dass es eine zu große Belastung war, sich gleichzeitig um das Darstellungssystem und die Geschäftslogik zu kümmern. Schließlich konzentrierten sich einige Personen auf die Darstellung, während die anderen an der Geschäftslogik weiterarbeiteten.

Die Geschäftslogik selbst war tatsächlich komplex. Es ging nicht einfach um eine Sammlung von Bedingungen und Berechnungen: Für die Entwicklung der Algorithmen mussten wir mit Mathematikprofessoren zusammenarbeiten. Sie unterstützten uns bei den mathematischen Aspekten der Aufgaben, darunter komplexe Berechnungen und komplexe Zahlen, während wir diese Algorithmen in Software umsetzten.

Heute ließe sich diese Verteilung der Verantwortlichkeiten mit modernen Architekturbegriffen beschreiben. Damals war sie jedoch weder das Ergebnis einer bestimmten Methodik noch die Anwendung eines vorab ausgewählten Musters. Wir kamen durch die praktische Arbeit dazu: Mit zunehmender Komplexität des Systems wurde Spezialisierung zu einer natürlichen Notwendigkeit.

Wichtig ist mir an dieser Erfahrung nicht, dass es damals bereits ein fertiges Architekturmodell gegeben hätte. In der heutigen formalen Form gab es das nicht. Entscheidend ist vielmehr, dass sich in der Praxis allmählich die Notwendigkeit zeigte, Verantwortlichkeiten zu trennen und die Komplexität der Interaktion zwischen den verschiedenen Teilen eines großen Systems zu berücksichtigen.

Deshalb kann ich nicht sagen, dass mein architektonisches Denken erst mit Angular begonnen hat. Angular brachte später neue Werkzeuge, neue Probleme und neue Möglichkeiten mit sich. Die Fragen nach Verantwortung, Organisation der Entwicklung und Komplexitätsmanagement entstanden jedoch viel früher.

## 2. Die Evolution von Angular und des architektonischen Denkens

### Von Desktop-Anwendungen zu Ionic

Mein praktischer Weg mit Angular begann mit den ersten Versionen, als Angular noch ein JavaScript-Framework war. Wir verwendeten es unter anderem in Windows-Desktop-Anwendungen mit Geolokalisierung und Karten, darunter Google Maps.

Später erhielt die Leitung die Aufgabe, die bestehenden Anwendungen auf Android und iOS zu übertragen und gleichzeitig die Möglichkeit zu erhalten, ohne permanente Netzwerkverbindung zu arbeiten. Ich schlug diesen Ansatz vor und suchte nach einem geeigneten Framework: Eine eigene Lösung von Grund auf zu entwickeln, wäre zu aufwendig gewesen. Schließlich entschied ich mich für Ionic, das damals eine passende Lösung mit Angular-Unterstützung war.

Die Rollen der Technologien waren klar getrennt: Ionic stellte das UI-Framework und fertige Oberflächenelemente bereit, während Angular das zentrale Anwendungsframework blieb und die übrige Anwendungslogik übernahm. Mir gefiel, dass Angular bereits viele Funktionen mitbrachte. Wir mussten nicht jeden Mechanismus für die Kommunikation zwischen Komponenten selbst erfinden. Insbesondere verwendete ich einen Message Bus für den Nachrichtenaustausch zwischen Komponenten.

Die Erfahrungen mit Karten und Geolokalisierung flossen auch in den mobilen Teil ein. Das detaillierte Szenario mit Adressen, Koordinaten und Navigation werde ich für einen zukünftigen Artikel über UX aufheben. Dort lässt sich der Zusammenhang zwischen einer Benutzeroberfläche und einer realen Benutzeraufgabe besser darstellen.

### Ein langfristiges Enterprise-Projekt: von Angular 2 bis Angular 19

2017 stieg ich direkt als Frontend Architect in ein großes Enterprise-Projekt ein. Das Projekt begann mit Angular 2. Im Laufe der Zeit wechselte ich mehrmals zu anderen Projekten und Kunden und kehrte anschließend zurück. In den letzten zwei bis drei Jahren arbeitete ich überwiegend an diesem Projekt.

In dieser Zeit durchlief das Projekt ungefähr sieben größere Versionswechsel zwischen den Angular-Generationen: von Angular 2 über die Versionen 5, 6, 7, 8, 9 und die folgenden Releases. Während meiner Abwesenheit wurde das Projekt weiterentwickelt, lag aber zeitweise zwei bis drei Versionen hinter dem aktuellen Stand zurück. Beispielsweise war Angular 11 bereits verfügbar, während das Projekt noch Angular 7 verwendete. Nach meiner Rückkehr analysierte ich die zwischenzeitlichen Änderungen und führte die Migration durch. Das eigentliche Upgrade eines großen Projekts ließ sich manchmal innerhalb von ein bis zwei Tagen durchführen, allerdings erst nach der notwendigen Analyse und Überprüfung.

Angular 19 war die letzte Version, auf die ich genau dieses Projekt gebracht habe. Ein weiterer Wechsel auf Angular 20 hätte eine tiefgreifende Überarbeitung einzelner Systemteile erfordert. Das bedeutet nicht, dass Angular 20 grundsätzlich ungeeignet gewesen wäre. Das Hindernis lag im Zustand der konkreten Codebasis und den darin angesammelten Einschränkungen.

### Parallele Projekte: ein anderer Verlauf

Gleichzeitig gab es weitere langfristige Projekte auf einer gemeinsamen Codebasis. Bei ihnen blieb ich durchgehend Architekt, war von Anfang bis Ende an der Weiterentwicklung beteiligt und achtete auf die Einhaltung der Architekturentscheidungen. Auch diese Projekte liefen mehrere Jahre, hatten aber keine vergleichbaren Probleme bei Angular-Upgrades.

Wichtig ist, dass es sich um dasselbe Entwicklerteam handelte. Der Unterschied lässt sich also nicht mit der Zusammensetzung des Teams erklären. Ein wesentlicher Faktor war die kontinuierliche architektonische Begleitung: Regeln und Grenzen wurden nicht über längere Zeit unbeachtet gelassen.

### Wie sich der Ansatz für Migrationen verändert hat

Bis Angular 7–8 führte ich Migrationen überwiegend manuell durch. Etwa ab der Zeit von Angular 8 begann ich, die offizielle Dokumentation und den Angular Update Guide zu verwenden – ein interaktives Werkzeug, mit dem sich Ausgangs- und Zielversion auswählen ließen und das eine Schrittfolge, Vorbereitungsempfehlungen und notwendige Maßnahmen lieferte.

Diesen Ansatz verwendete ich bis zur zweiten Hälfte des Jahres 2024. Danach wurden AI-Agenten nützlich genug, um den Arbeitsablauf zu verändern. Ich formulierte die Aufgabe, der Agent nahm die Änderungen vor, und ich überprüfte das Ergebnis. Wenn das Projekt nicht mehr gebaut werden konnte oder Fehler auftraten, analysierten wir gemeinsam die Ursachen und behoben sie.

Das war keine vollständig automatische Migration: Die Qualität des Ergebnisses musste weiterhin überprüft werden und erforderte manchmal zusätzliche Nacharbeit. Die Agenten verkürzten jedoch deutlich die Zeit, die zum Verständnis der Änderungen und für die Durchführung der Anpassungen nötig war. Die Verantwortung für Analyse, Überprüfung und endgültige Entscheidungen blieb bei mir.

Die Migrationen von Angular 18 → 19, 19 → 20 und 20 → 21 führte ich bereits mit aktiver Unterstützung von AI-Agenten durch. Diese Upgrades betrafen die parallelen Projekte, die sich unter meiner kontinuierlichen architektonischen Kontrolle erfolgreich weiterentwickelten, und nicht das langfristige Projekt, das ich bis Angular 19 gebracht hatte.

Bei diesen Upgrades war auch Angular Material betroffen. Der Wechsel zu Material 3 einschließlich der Anpassung von Theme und Styles erwies sich in der Praxis als anspruchsvoller als das Upgrade von Angular selbst.

### Architektonische Einschränkungen: der Preis fehlender Kontrolle

Die Geschichte des langfristigen Projekts zeigte mir den Unterschied zwischen Architekturregeln, die lediglich existieren, und Regeln, deren Einhaltung tatsächlich sichergestellt wird.

Wenn ich durchgehend Architekt des Projekts geblieben und seine Entwicklung kontrolliert hätte, wären viele Probleme vermutlich vermeidbar gewesen. Während meiner Abwesenheit lösten die Entwickler jedoch weiterhin ihre täglichen Aufgaben, trafen lokale Entscheidungen und entfernten sich allmählich von den zuvor festgelegten Architekturregeln. Abhängigkeiten kamen hinzu, Grenzen verschwammen, und architektonische sowie technische Schulden häuften sich an. Schließlich reichte ein gewöhnliches Angular-Upgrade nicht mehr aus: Der Wechsel zu Angular 20 hätte eine tiefgreifende Überarbeitung erfordert.

In den parallelen Projekten kontrollierte ich die Architekturentscheidungen kontinuierlich und ging bei Verstößen im Code Review recht konsequent vor. Dort arbeitete dasselbe Team. Der Unterschied lag nicht bei den Menschen, sondern in der Kontinuität der Architekturkontrolle.

Später spielten die NX Module Boundaries eine wichtige Rolle. Architektonische Einschränkungen waren nicht länger nur Vereinbarungen oder Einträge in der Dokumentation: Sie ließen sich technisch festschreiben und automatisch überprüfen. NX trifft keine Architekturentscheidungen anstelle des Architekten, hilft aber dabei, unzulässige Abhängigkeiten zu erkennen und zu verhindern.

Für mich ist das eine der wichtigsten praktischen Erkenntnisse: Architekturregeln dürfen nicht nur auf dem Papier oder im Kopf des Architekten existieren. Wenn Grenzen für die langfristige Weiterentwicklung eines Systems wichtig sind, sollten sie nach Möglichkeit mit technischen Mitteln durchgesetzt und automatisch überprüft werden. Dabei geht es nicht darum, die Freiheit der Entwickler zugunsten formaler Ordnung einzuschränken. Es geht darum zu verhindern, dass lokale Entscheidungen die Integrität des Gesamtsystems zerstören.

### Die Evolution der Werkzeuge und des Denkens

Die Geschichte der Angular-Migrationen ist nicht einfach eine Erzählung über Upgrade-Mechanismen. Der Ansatz entwickelte sich von manueller Arbeit über offizielle Empfehlungen bis hin zum Einsatz von AI-Agenten. Kein Werkzeug machte jedoch die Analyse von Änderungen, die Überprüfung der Ergebnisse und das Treffen technischer Entscheidungen überflüssig.

Die Angular-Werkzeuge wurden leistungsfähiger und die Automatisierungsmöglichkeiten umfangreicher. Dennoch hing die Fähigkeit eines konkreten Projekts, sich weiterzuentwickeln, in hohem Maße davon ab, wie konsequent seine architektonischen Einschränkungen eingehalten wurden.

Meine Erfahrung hat gezeigt: Architekturregeln zu definieren reicht nicht aus – ihre Einhaltung muss mit technischen Mitteln sichergestellt werden. Die Geschichte eines Projekts, das den Weg von Angular 2 bis Angular 19 durchlaufen hat, wurde für mich zu einer anschaulichen Bestätigung dieser Erkenntnis.

## 3. Von der Komponentenentwicklung zum Systemdesign

Mit zunehmender Größe einer Anwendung reicht das jedoch nicht mehr aus.

Nach und nach wird deutlich, dass eine einzelne Komponente nicht für sich allein existiert. Sie interagiert mit anderen Teilen der Anwendung, verwendet Daten, hängt von Services ab und ist an gemeinsamen Abläufen beteiligt. Eine Entscheidung, die innerhalb einer Komponente praktisch erscheint, kann andere Systemteile beeinflussen und deren weitere Entwicklung erschweren.

Genau hier zeigt sich der grundlegende Unterschied zwischen der Implementierung einer Funktionalität und dem Entwurf eines Systems.

### Eine lokal richtige Entscheidung ist nicht immer für das Gesamtsystem richtig

Entwickler lösen normalerweise eine konkrete Aufgabe in einem bestimmten Kontext. Sie müssen eine Funktion ergänzen, einen Fehler beheben oder das Verhalten der Oberfläche ändern. Natürlich versuchen sie, den einfachsten und schnellsten Weg zu finden.

Ein Problem entsteht dann, wenn eine lokale Entscheidung beginnt, die Struktur anderer Anwendungsteile zu bestimmen.

Eine Komponente könnte beispielsweise selbst Daten abrufen, Transformationen durchführen, den Zustand verwalten und auf den Speicher zugreifen. In einem kleinen Bereich der Anwendung wirkt das durchaus sinnvoll. Alles Notwendige befindet sich an einem Ort, der Code lässt sich schnell schreiben und das Ergebnis leicht überprüfen.

Mit der Zeit führt dieser Ansatz jedoch dazu, dass Verantwortlichkeiten unklar werden. Die Komponente kennt zu viele interne Details der Anwendung. Eine Änderung des Speichermechanismus kann Änderungen an der Oberfläche erforderlich machen. Die Änderung eines Ablaufs wirkt sich plötzlich auf andere Abläufe aus. Wiederkehrende Logik entwickelt sich an verschiedenen Stellen unterschiedlich weiter.

Jede einzelne Entscheidung mag zum Zeitpunkt ihrer Umsetzung gerechtfertigt gewesen sein. In ihrer Gesamtheit können solche Entscheidungen das System jedoch erheblich komplexer machen.

Beim Entwurf sollte deshalb nicht nur betrachtet werden, ob ein bestimmter Codeabschnitt die unmittelbare Aufgabe löst. Wir müssen auch verstehen, welche Auswirkungen diese Entscheidung auf die übrigen Teile der Anwendung haben wird.

### Verantwortung ist wichtiger als der Speicherort des Codes

Mit der Zeit wurde Architektur für mich immer weniger zu einer Frage danach, in welchem Ordner eine bestimmte Datei liegen sollte.

Die korrekte Ablage von Dateien bedeutet noch lange nicht, dass eine Anwendung eine klare Struktur besitzt. Man kann zahlreiche Ordner, Services und Abstraktionen erstellen und trotzdem eine enge Kopplung zwischen Komponenten und Schichten beibehalten.

Viel wichtiger ist es, die Verantwortung jedes Systemteils und die Regeln für die Zusammenarbeit dieser Teile festzulegen.

Eine Komponente sollte Aufgaben der Benutzeroberfläche und der Benutzerinteraktion übernehmen. Zustandsverwaltung, Datenbeschaffung, Speicherzugriff und andere Aufgaben benötigen klare Grenzen. Gleichzeitig muss nicht für jede Operation eine eigene Schicht geschaffen oder eine zusätzliche Abstraktion nur aus Gründen formaler architektonischer Reinheit eingeführt werden.

Architektur sollte helfen, Komplexität zu beherrschen, nicht sie erzeugen.

Deshalb betrachte ich die Trennung von Verantwortlichkeiten nicht als mechanische Befolgung eines bestimmten Musters, sondern als Möglichkeit, ein System für alle Beteiligten verständlich und vorhersehbar zu machen.

### Architektur bedeutet auch Abhängigkeitsmanagement

Ein weiterer wichtiger Schritt beim Verständnis von Architektur ist die Erkenntnis, dass es nicht ausreicht, den Code in logische Teile aufzuteilen. Es muss auch festgelegt werden, wie diese Teile miteinander interagieren dürfen.

Wenn jede Komponente auf jeden Service zugreifen, selbstständig Daten abrufen und interne Mechanismen anderer Module verwenden kann, schützt die formale Projektstruktur nicht vor Kopplung.

Architekturgrenzen müssen daher nicht nur Verantwortlichkeiten, sondern auch zulässige Abhängigkeitsrichtungen definieren.

Das ist besonders in großen Teams wichtig. Ein Architekt kann Regeln erklären, Diagramme zeigen und die Projektstruktur abstimmen. Entwickler treffen jedoch jeden Tag zahlreiche kleine Entscheidungen. Bleiben die Regeln lediglich Empfehlungen, können sie mit der Zeit nicht mehr eingehalten werden.

Meine Erfahrungen mit mehreren langfristigen Projekten haben gezeigt, dass Architekturvereinbarungen nicht nur formuliert, sondern nach Möglichkeit auch technisch durchgesetzt werden müssen. Deshalb ist die automatische Überprüfung von Abhängigkeitsgrenzen zu einem wichtigen Bestandteil meiner Architekturpraxis geworden.

### Ein Architekt entwirft nicht nur eine einzelne Komponente

Mit wachsender Erfahrung ändern sich auch die Fragen, die man bei der Diskussion neuer Funktionalität stellt.

Anstelle der Frage „Wie implementieren wir diese Komponente?“ treten andere Fragen:

- Für welche Verantwortung soll sie zuständig sein?
- Woher erhält sie die benötigten Daten?
- Wer verwaltet den Zustand?
- Welche Abhängigkeiten benötigt sie tatsächlich?
- Welche Anwendungsteile sind betroffen, wenn sich diese Funktionalität ändert?
- Verursacht die lokale Lösung Probleme für das Gesamtsystem?
- Kann ein anderer Entwickler diese Struktur verstehen und ihre Weiterentwicklung übernehmen?

Das bedeutet nicht, dass jede kleine Aufgabe zu einer eigenen Architekturanalyse werden muss. Im Gegenteil: Ein guter Architekturansatz sollte helfen, Entscheidungen ohne unnötige Komplexität zu treffen.

Je größer jedoch das System und das Team werden, desto wichtiger ist es, die Folgen von Entscheidungen zu verstehen, die zunächst unbedeutend erscheinen.

### Von der Erfahrung zur bewussten Architektur

Heute betrachte ich Angular in erster Linie als Plattform, die Werkzeuge für die Entwicklung von Anwendungen bereitstellt. Das Framework selbst entscheidet nicht darüber, ob die Architektur erfolgreich sein wird.

Neue Angular-Funktionen können die Umsetzung bestimmter Ansätze vereinfachen, ersetzen aber nicht das Verständnis von Verantwortlichkeiten, Abhängigkeiten und Systemgrenzen.

Dasselbe gilt für alle anderen Werkzeuge. Man kann moderne Mechanismen zur Zustandsverwaltung, neue APIs oder zusätzliche Automatisierungswerkzeuge verwenden. Ohne ein klares Architekturmodell garantieren sie jedoch keine Wartbarkeit.

Für mich liegt das wichtigste Ergebnis der langjährigen Erfahrung genau in diesem Perspektivwechsel: weg von der Implementierung einzelner Funktionen und hin zum Entwurf des Systems, in dem diese Funktionen existieren und miteinander interagieren müssen.

Und das ist vielleicht die wichtigste Veränderung in meinem professionellen Denken. Architektur beginnt nicht mit der Auswahl einer Technologie und auch nicht mit dem Anlegen einer Ordnerstruktur. Sie beginnt mit dem Verständnis dafür, wie das System aufgebaut sein soll, wer wofür verantwortlich ist und welche Regeln seine Weiterentwicklung ermöglichen, ohne seine Integrität zu verlieren.

---

Damit endet der historische und analytische Teil des Artikels. Er zeigt, wie praktische Erfahrung, die Entwicklung von Angular und die Arbeit mit großen Teams meinen Ansatz für den Entwurf von Frontend-Systemen nach und nach geprägt haben.

Im nächsten Teil wechseln wir von den Prinzipien zu ihrer praktischen Umsetzung: Wir betrachten Facade Services, Signals und die Organisation der Zusammenarbeit zwischen Komponenten, Zustand und Datenzugriffsschicht.

---

## 4. Praktische Umsetzung: Facades und Signals ohne Effect

Der historische Teil des Artikels hat gezeigt, warum Verantwortlichkeiten, kontrollierte Abhängigkeiten und die Einhaltung architektonischer Grenzen für mich wichtig sind. Jetzt wechseln wir von diesen Prinzipien zur praktischen Umsetzung.

Als Beispiel verwenden wir eine Personal-Finance-Anwendung. Sie ermöglicht die Verwaltung von Einnahmen und Ausgaben, zeigt eine Zusammenfassung auf dem Dashboard an und speichert Benutzerdaten dauerhaft. Im Mittelpunkt steht nicht der gesamte Funktionsumfang der Anwendung, sondern die Organisation der Zusammenarbeit zwischen UI, Zustand, API und lokalem Speicher.

Zunächst bauen wir die Struktur auf Basis von Facade Services und Signals auf. Auf die Einführung von `effect()` verzichten wir bewusst: Für den gewählten Benutzerablauf ist es nicht erforderlich. Auf die Frage seines Einsatzes kommen wir später zurück, wenn sich die Interaktion mit den Formularen ändert.

### Vom Benutzerablauf zu architektonischen Anforderungen

Beginnen wir mit dem Verhalten der Anwendung und nicht mit Ordnern und Klassen.

Beim Öffnen der Website muss die Anwendung den Authentifizierungsstatus prüfen. Dazu kommuniziert sie über die entsprechende Facade mit der API. Ist der Benutzer nicht authentifiziert, wird er zur Login-Seite weitergeleitet. Das Dashboard ist erst nach erfolgreicher Authentifizierung verfügbar.

Nach der Anmeldung sieht der Benutzer das Dashboard mit einer aktuellen Zusammenfassung der Einnahmen und Ausgaben. Zunächst werden Transaktionen auf separaten Seiten erstellt und bearbeitet. Der Benutzer öffnet eine Seite, um Einnahmen oder Ausgaben hinzuzufügen oder zu bearbeiten, speichert die Daten und kehrt zum Dashboard zurück.

Nach der Rückkehr muss das Dashboard den aktuellen Zustand anzeigen. Die Komponente muss nicht wissen, wie die Daten beschafft wurden, wo sie gespeichert sind oder wie genau die Anfrage ausgeführt wird. Ihre Aufgabe besteht darin, den Zustand darzustellen und die Benutzeraktion an die zuständige Facade weiterzugeben.

Aus diesem Ablauf ergeben sich einige grundlegende Anforderungen:

- Komponenten kommunizieren nicht direkt mit der API.
- Komponenten greifen nicht direkt auf Local Storage, Session Storage oder IndexedDB zu.
- Zustand und Operationen sind in den entsprechenden Facade Services gekapselt.
- Der Low-Level-Datenzugriff ist von der UI getrennt.
- Zustandsänderungen erfolgen über die öffentlichen Methoden der Facade.
- Abgeleitete Werte des Dashboards werden reaktiv berechnet.
- Die Architektur bleibt einfach und führt keine Abstraktionen ohne praktischen Bedarf ein.

### Grenzen der Verantwortlichkeiten

Für diese Anwendung reicht es aus, einige zentrale Verantwortlichkeiten voneinander zu trennen.

**UI-Komponenten** sind für Darstellung, Benutzereingaben und lokale Interaktionen zuständig. Sie erhalten Daten über die öffentlichen Schnittstellen der Facades und rufen deren Methoden auf. Eine Komponente sollte nicht selbst entscheiden, welchen HTTP-Endpunkt sie aufruft, wie eine API-Antwort transformiert oder wie Daten in IndexedDB geschrieben werden.

**API Facade** stellt der UI eine verständliche Schnittstelle für Backend-Operationen bereit. Sie koordiniert das Abrufen und Ändern von Daten, verwaltet den Zustand dieser Vorgänge und verwendet bei Bedarf nachgelagerte Services für den API-Zugriff.

**Storage Facade** kapselt den Zugriff der Anwendung auf den lokalen Speicher. Die UI und andere Anwendungsteile verwenden ihre Methoden und Verträge statt eines konkreten Speichermechanismus.

**DAL (Data Access Layer)** enthält die Low-Level-Implementierung des Datenzugriffs. Dazu gehören die Initialisierung von IndexedDB, die Arbeit mit Object Stores und Transaktionen sowie technische Besonderheiten der Browser-API. Diese Details dürfen nicht in Komponenten gelangen oder Teil ihrer Verantwortung werden.

Vereinfacht sieht der Interaktionsfluss folgendermaßen aus:

```text
UI Component
    |
    v
Feature Facade
    |
    +----> API / Data Service ----> HTTP Client ----> Backend
    |
    +----> Storage Facade --------> DAL ------------> IndexedDB
```

Dies ist ein Diagramm der Verantwortlichkeiten und keine zwingende Vorgabe, für jeden Kasten einen eigenen Service zu erstellen. Wenn ein bestimmter Teil keine eigenständige Verantwortung besitzt, sollte er nicht künstlich als separate Abstraktion ausgegliedert werden.

Eine einzige Storage Facade reicht hier beispielsweise aus. Eine separate IndexedDB Facade ist nicht erforderlich: Die Low-Level-Implementierung ist bereits im DAL isoliert, und ein zusätzlicher Vermittler löst kein eigenständiges Problem.

### Eine Facade als öffentliche Funktionsgrenze

Ein Facade Service ist nicht einfach ein Service, in den einige Methoden aus einer Komponente verschoben wurden. Seine Hauptaufgabe besteht darin, eine verständliche und stabile Schnittstelle für eine bestimmte Funktionalität bereitzustellen.

Die Dashboard-Komponente muss nicht wissen, wie Transaktionen genau geladen werden, wie eine Backend-Antwort verarbeitet oder wie die Summen berechnet werden. Sie soll einen fertigen Zustand erhalten und die benötigte Aktion aufrufen.

Eine beispielhafte Schnittstelle der Facade könnte folgendermaßen aussehen:

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionsFacade {
  readonly transactions = /* read-only signal */;
  readonly loading = /* read-only signal */;
  readonly error = /* read-only signal */;

  readonly totalIncome = /* computed signal */;
  readonly totalExpenses = /* computed signal */;
  readonly balance = /* computed signal */;

  load(): void {
    // Datenabruf koordinieren
  }

  createIncome(command: CreateIncomeCommand): void {
    // Einnahme erstellen
  }

  createExpense(command: CreateExpenseCommand): void {
    // Ausgabe erstellen
  }

  updateTransaction(command: UpdateTransactionCommand): void {
    // Bestehende Transaktion aktualisieren
  }
}
```

Dies veranschaulicht einen öffentlichen Vertrag und ist keine vollständige Implementierung mit konkreter Fehlerbehandlung und HTTP-Anfragen. Entscheidend ist das Prinzip: Die Komponente sieht fachliche Operationen der Anwendung und nicht die technischen Details ihrer Ausführung.

Achten wir auch auf `providedIn: 'root'`. Diese Deklaration registriert die Facade beim Root-Injector von Angular. Komponenten und Services, die `TransactionsFacade` über Dependency Injection anfordern, erhalten dadurch standardmäßig dieselbe Instanz, die vom Root-Injector erstellt wird.

Das ist für unser Szenario wesentlich: Dashboard und Formular müssen mit demselben Transaktionszustand arbeiten. Wenn das Formular eine neue Transaktion an die Facade übergibt, aktualisiert diese ihr Signal, und das Dashboard erhält über dieselbe Service-Instanz den aktuellen Wert. Die Komponenten müssen weder separate Zustandskopien synchronisieren noch direkt miteinander kommunizieren.

Wäre die Facade stattdessen in den `providers` jeder Komponente registriert, würde Angular in den jeweiligen Child-Injectors separate Instanzen erzeugen. Dashboard und Formular könnten dann unterschiedliche Instanzen und damit unterschiedliche Zustände erhalten. Deshalb registrieren wir eine Facade für gemeinsam genutzten Feature-Zustand im Root-Injector und überschreiben sie nicht in lokalen `providers` von Komponenten oder Routen.

Eine Facade kann frontend-spezifische Logik enthalten: Daten für die UI aufbereiten, Benutzereingaben vorläufig validieren, mehrere Anfragen koordinieren und den Ladezustand verwalten. Das bedeutet jedoch nicht, dass Geschäftsregeln des Backends ins Frontend verschoben werden sollen. Die serverseitige Geschäftslogik und die Datenvalidierung auf dem Backend bleiben Aufgabe des Backends.

Gleichzeitig sollte eine Facade nicht zu einem universellen Service für die gesamte Anwendung werden. Ihre Grenzen sollten klaren funktionalen Bereichen entsprechen. Für das kleine Beispiel Personal Finance ist es nicht erforderlich, im Voraus eine komplexe Domain-Struktur einzuführen. Die Verantwortlichkeiten für Authentifizierung, Transaktionen und Datenspeicherung müssen jedoch unterscheidbar bleiben.

### Zustand mit Signals kapseln

Es ist praktisch, den internen Zustand einer Facade in Writable Signals zu speichern. Komponenten erhalten Read-only Signals und können den Zustand der Facade daher nicht direkt über `set()` oder `update()` ändern.

Ein vereinfachtes Beispiel:

```ts
import { computed, signal } from '@angular/core';

export class TransactionsFacade {
  private readonly _transactions = signal<Transaction[]>([]);

  readonly transactions = this._transactions.asReadonly();

  readonly totalIncome = computed(() =>
    this._transactions()
      .filter(item => item.type === 'income')
      .reduce((total, item) => total + item.amount, 0)
  );

  readonly totalExpenses = computed(() =>
    this._transactions()
      .filter(item => item.type === 'expense')
      .reduce((total, item) => total + item.amount, 0)
  );

  readonly balance = computed(
    () => this.totalIncome() - this.totalExpenses()
  );

  replaceTransactions(items: Transaction[]): void {
    this._transactions.set(items);
  }
}
```

Das Beispiel zeigt mehrere Prinzipien:

1. Das Writable Signal bleibt ein privater Bestandteil der Facade.
2. Nach außen wird eine schreibgeschützte Darstellung des Zustands bereitgestellt.
3. Zustandsänderungen erfolgen über eine Methode der Facade.
4. Die Summen für Einnahmen, Ausgaben und Saldo werden nicht als separate Datenkopien gespeichert, sondern aus dem Ausgangszustand berechnet.

Ein Read-only Signal verhindert, dass Verbraucher über die zurückgegebene Referenz direkt `set()` und `update()` aufrufen. Das ist jedoch keine tiefe Immutability: Angular verhindert nicht, dass verschachtelte Eigenschaften eines über ein solches Signal erhaltenen Objekts verändert werden. Deshalb sollte der Zustand kontrolliert aktualisiert werden, vorzugsweise durch das Ersetzen von Arrays und Objekten durch neue Werte, statt deren Inhalte außerhalb der Facade zu verändern.

### Computed für abgeleiteten Zustand, nicht für das Laden von Daten

`computed()` eignet sich für Werte, die vollständig durch andere Signals bestimmt werden. In unserem Beispiel hängen die Summe der Einnahmen, die Summe der Ausgaben und der Saldo von der Transaktionsliste ab. Sie müssen nicht separat gespeichert und manuell synchronisiert werden.

Computed Signals werden verzögert ausgewertet und speichern ihr Ergebnis zwischen, bis sich ihre Abhängigkeiten ändern. Angular verfolgt die Signals, die innerhalb der Berechnung gelesen werden. Ändert sich die Transaktionsliste, werden die abgeleiteten Werte daher ungültig und beim nächsten Lesen neu berechnet.

Wichtig ist die Grenze von `computed()`: Es berechnet einen Wert aus dem vorhandenen Zustand, lädt aber keine Daten vom Server und stellt sie auch nicht aus einem Speicher wieder her.

Nach einem vollständigen Neuladen der Anwendung verschwindet der Zustand im Arbeitsspeicher. Deshalb müssen die Daten bei der Initialisierung der Anwendung oder des Funktionsbereichs über Facade und DAL geladen werden. Nach dem Empfang der Daten aktualisiert die Facade das Ausgangs-Signal, und die abgeleiteten Werte werden automatisch neu berechnet.

### Signals und RxJS lösen unterschiedliche Aufgaben

Die Einführung von Signals bedeutet nicht, dass RxJS nicht mehr benötigt wird. Diese Werkzeuge lösen verwandte, aber unterschiedliche Aufgaben.

Signals eignen sich gut zur Darstellung des aktuellen Anwendungszustands und seiner abgeleiteten Werte. Sie lassen sich bequem in Templates lesen, in Facades verwenden und über `computed()` mit anderen Zuständen verknüpfen.

RxJS bleibt ein wichtiges Werkzeug für die Arbeit mit asynchronen Streams: HTTP-Kommunikation, Ereignisfolgen, Abbruch und Kombination von Requests, Verarbeitung von Datenströmen und andere Szenarien, in denen Observables und Operatoren nützlich sind.

Angular bietet Mechanismen zur Zusammenarbeit dieser Modelle. Beispielsweise ermöglicht `toSignal()`, ein Observable als Signal darzustellen, während `toObservable()` ein Signal als Observable bereitstellt. Das sind Integrationswerkzeuge und kein Grund, jedes Observable mechanisch in ein Signal oder umgekehrt umzuwandeln.

In unserer Architektur kann eine Facade RxJS zur Koordination eines asynchronen Vorgangs verwenden und anschließend ihre internen Signals mit dem Ergebnis aktualisieren. Die Komponente muss dabei nicht wissen, welcher Mechanismus intern verwendet wurde.

### Warum in diesem Szenario kein Effect erforderlich ist

Im aktuellen Benutzerablauf bleiben die Formulare für Einnahmen und Ausgaben separate Seiten.

Der Benutzer öffnet ein Formular, speichert eine Transaktion und kehrt zum Dashboard zurück. Nach der Rückkehr erhält das Dashboard den aktuellen Zustand über die Facade. Die Facade selbst verwaltet das Laden und Ändern der Daten, während Signals die Aktualisierung der abhängigen Ansichten sicherstellen.

Es ist hier nicht notwendig, den Wert eines Signals in ein anderes zu kopieren oder eine zusätzliche Synchronisierungskette zu starten. Für berechnete Summen reicht `computed()`; für das Laden und Speichern verwenden wir explizite Methoden der Facade.

Deshalb wird `effect()` in diesem Teil bewusst nicht verwendet. Die aktuelle Angular-Dokumentation beschreibt Effect in erster Linie als Mechanismus zur Synchronisierung reaktiven Zustands mit imperativen APIs und externen Systemen. Für abgeleitete Werte wird `computed()` empfohlen, nicht das Kopieren von Zustand über einen Effect.

Später ändern wir den Interaktionsablauf: Die Formulare werden zu Modal Dialogs, und es entsteht eine konkrete Aufgabe, für die wir den Einsatz von Effect gesondert bewerten können. So lässt sich seine Verwendung anhand eines tatsächlichen Architekturbedarfs zeigen und nicht nur, um eine API vorzuführen.

### Wiederherstellung des Zustands und Lebenszyklus der Anwendung

Es ist wichtig, zwei Szenarien zu unterscheiden.

**Gewöhnliche Navigation innerhalb einer laufenden Anwendung.** Wenn ein Facade Service im passenden Anwendungsscope existiert und seinen Zustand zwischen den Übergängen beibehält, kann das Dashboard bereits geladene Daten erneut verwenden. Nach einer Änderung der Transaktion aktualisiert die Facade den Zustand, und Komponenten, die die entsprechenden Signals lesen, erhalten die aktuellen Werte.

**Vollständiges Neuladen der Seite.** Der Speicher der Anwendung wird neu aufgebaut. Deshalb müssen die Daten aus einer verfügbaren Quelle wiederhergestellt werden: durch eine Anfrage an das Backend und, sofern es der Ablauf vorsieht, durch das Lesen des lokalen Speichers über Storage Facade und DAL. Wir dürfen nicht davon ausgehen, dass ein Signal selbst eine dauerhafte Speicherung gewährleistet.

Der Zeitpunkt des Ladens und die maßgebliche Datenquelle müssen eine bewusste Architekturentscheidung sein. Der aktuelle UI-Zustand, ein Cache im Arbeitsspeicher und eine dauerhafte Speicherung sollten nicht zu einer ununterscheidbaren Einheit vermischt werden.

### Lokaler Komponentenstatus ist eine zulässige Ausnahme

Nicht jeder Zustand gehört in einen Facade Service.

Werte, die ausschließlich zur aktuellen Formularinstanz gehören – beispielsweise der aufgeklappte Zustand eines Abschnitts, ein lokaler Schritt eines Wizards, ein temporärer Feldwert oder die Anzeige eines zusätzlichen Hinweises – können innerhalb der Komponente bleiben.

Für einen solchen Zustand ist ein lokales Signal durchaus sinnvoll. Eine Übertragung in eine gemeinsame Facade ist nur dann angebracht, wenn der Zustand tatsächlich außerhalb der Komponente verfügbar sein muss oder zum gemeinsamen Funktionszustand gehört.

Andernfalls wird die Facade nach und nach zu einem Speicher für sämtliche UI-Variablen der Anwendung und ihre Verantwortung verschwimmt. Das Ziel der Kapselung ist nicht, absolut alles zu zentralisieren, sondern für jede Art von Zustand den richtigen Ort zu bestimmen.

### Zusammenfassung

Damit erhalten wir eine klare Trennung der Verantwortlichkeiten:

- UI-Komponenten zeigen Daten an und leiten Benutzeraktionen weiter.
- Facade Services stellen öffentliche Operationen bereit und kapseln den Zustand.
- Signals repräsentieren den aktuellen Zustand und abgeleitete Werte.
- RxJS wird dort eingesetzt, wo die Verarbeitung asynchroner Streams erforderlich ist.
- Storage Facade trennt die Anwendung vom konkreten Mechanismus der lokalen Speicherung.
- DAL enthält die Low-Level-Implementierung des Datenzugriffs.
- Das Backend bleibt Eigentümer der serverseitigen Geschäftslogik.

Wir haben keine separaten Domains, keinen universellen Store und keine zusätzlichen Abstraktionsebenen ohne Notwendigkeit eingeführt. Die Architektur ist aus einem konkreten Benutzerablauf und seinen Anforderungen entstanden.

Das ist das zentrale Prinzip dieses Ansatzes: Signals oder Facades nicht deshalb verwenden, weil sie in Angular verfügbar sind, sondern dort einsetzen, wo sie helfen, Zustand, Verantwortlichkeiten und die Interaktion der Systemteile verständlich zu machen.

### Offizielle Dokumentation

- [Angular Signals](https://angular.dev/guide/signals) — Writable Signals, Read-only Signals, computed und reaktive Abhängigkeiten.
- [RxJS interop with Angular signals](https://angular.dev/guide/signals/rxjs-interop) — Zusammenarbeit von Observables und Signals über `toSignal()` und `toObservable()`.
- [Angular Effects](https://angular.dev/guide/signals/effect) — Zweck von Effect und Empfehlungen für seinen Einsatz.
- [Defining dependency providers](https://angular.dev/guide/di/defining-dependency-providers) — Registrierung von Services über `providedIn` und Dependency-Injection-Scopes.

[Branch +1 — Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking+1](https://github.com/iAVP/enterprise-frontend-workshop/tree/Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking+1)

## 5. Facades, Signals und IndexedDB: Interaktion zwischen Dashboard und modalen Formularen

Im vorherigen Abschnitt haben wir Facade Services und Signals anhand separater Seiten zum Hinzufügen von Einnahmen und Ausgaben betrachtet. Nun ändern wir den Benutzerablauf: Die Formulare werden direkt vom Dashboard aus in modalen Dialogen geöffnet.

Bei dieser Änderung geht es nicht nur um die Darstellung des Formulars. Die Trennung der Verantwortlichkeiten muss erhalten bleiben: Das Dashboard steuert das Öffnen des Dialogs, das Formular ist für Eingabe und Validierung zuständig, und die Transaktions-Facade bleibt die zentrale Stelle zur Verwaltung der gemeinsamen Transaktionssammlung.

### Von separaten Seiten zu modalen Dialogen

In der vorherigen Variante navigierte der Benutzer vom Dashboard zu einer separaten Seite, um Einnahmen oder Ausgaben hinzuzufügen. Jetzt bleibt er auf dem Dashboard und öffnet das benötigte Formular in einem Modal Dialog.

Das Dashboard öffnet den Dialog und erhält dessen Ergebnis beim Schließen. Das Formular selbst übernimmt die Eingabe und Validierung. Es muss nicht wissen, wie das Dashboard die Transaktionsliste aktualisiert oder wo die Daten gespeichert werden.

Nach der Bestätigung des Formulars wird das Ergebnis über die API des modalen Dialogs an die aufrufende Komponente zurückgegeben. Das Dashboard erhält ein Objekt mit den Transaktionsdaten und übergibt es an die Facade. Wird der Dialog abgebrochen, gibt es kein Ergebnis und somit wird auch keine neue Transaktion erstellt.

Der Ablauf sieht folgendermaßen aus:

1. Der Benutzer klickt auf Add income oder Add expense im Dashboard.
2. Das Dashboard öffnet den entsprechenden Modal Dialog und übergibt den Transaktionstyp.
3. Das Formular erfasst Beschreibung, Betrag und Datum und validiert die eingegebenen Werte.
4. Bei Bestätigung gibt das Formular die Transaktionsdaten über den Modal Dialog zurück.
5. Das Dashboard erhält das Ergebnis und ruft die Facade-Methode zum Hinzufügen der Transaktion auf.
6. Die Facade aktualisiert den gemeinsamen Zustand und speichert die Sammlung; das Dashboard zeigt die neuen Werte automatisch an.

Das Formular kommuniziert nicht direkt mit dem Dashboard, und das Dashboard verwaltet nicht den internen Zustand des Formulars. Ihre einzige Verbindung ist der Vertrag für die Dialoginteraktion.

### Die Facade bleibt die zentrale Stelle für die Transaktionsverwaltung

Die Transaktions-Facade stellt den Komponenten ein Read-only Signal mit der Transaktionssammlung sowie berechnete Werte für Saldo, Einnahmen und Ausgaben bereit. Änderungen an der Sammlung erfolgen über die öffentlichen Methoden der Facade.

In der Facade befindet sich ein Writable Signal:

~~~ts
private state = signal<Transaction[]>([]);

readonly transactions = this.state.asReadonly();

readonly balance = computed(() =>
  this.state().reduce(
    (sum, transaction) => sum + transaction.amount * transaction.type,
    0
  )
);
~~~

Die Komponenten erhalten nur die schreibgeschützte Darstellung. Dadurch bleibt die Kontrolle über den Zustand erhalten, und es müssen keine separaten Kopien des Arrays im Dashboard und im modalen Fenster angelegt werden.

Wenn das Dashboard die bestätigten Daten an die Facade übergibt, wartet diese zunächst auf den Abschluss des initialen Ladevorgangs, erstellt eine ID für die neue Transaktion, fügt sie am Anfang der aktuellen Sammlung ein und aktualisiert das Signal. Komponenten, die diesen Zustand verwenden, erhalten automatisch die aktuellen Werte.

Dabei müssen zwei Mechanismen unterschieden werden:

- `computed()` berechnet abgeleitete Werte aus dem vorhandenen reaktiven Zustand;
- explizite Facade-Methoden führen Operationen aus, die den Zustand ändern oder auf den Speicher zugreifen.

Saldo, Gesamteinnahmen und Gesamtausgaben bleiben Aufgaben für `computed()`. Sie sollten nicht mithilfe eines Effects in separate Signals kopiert werden.

### Transaktionen ohne Effect speichern

In der tatsächlichen Personal-Finance-Implementierung werden Transaktionen nicht über `effect()` gespeichert. Die Facade verwendet eine explizite Methode zum Hinzufügen einer Transaktion: Nach der Aktualisierung des Signals übergibt sie die neue Sammlung zur Speicherung an die Storage Facade.

Vereinfacht sieht die Abfolge folgendermaßen aus:

~~~ts
async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
  await this.initialization;

  const newTransaction: Transaction = {
    ...transaction,
    id: crypto.randomUUID()
  };

  const updatedTransactions = [newTransaction, ...this.state()];
  this.state.set(updatedTransactions);
  await this.storageFacade.saveTransactions(updatedTransactions);

  return newTransaction;
}
~~~

Es gibt keinen Hintergrund-Effect, der Änderungen am Signal beobachtet. Die Aktualisierung des Zustands und das Speichern der Daten sind Teil einer ausdrücklich aufgerufenen Facade-Operation. Dadurch bleibt die Abfolge nachvollziehbar, und ein zusätzlicher Synchronisationsmechanismus wird vermieden, wenn er nicht benötigt wird.

`computed()` wird weiterhin ausschließlich für abgeleitete Werte verwendet. In der aktuellen Implementierung ist `effect()` weder für die Berechnung des Saldos noch für die Speicherung der Transaktionen erforderlich.

### Warum für Transaktionen IndexedDB verwendet wird

Die Anwendung verwendet IndexedDB, um die Sammlung der Einnahmen und Ausgaben zu speichern.

LocalStorage bietet eine synchrone Schnittstelle zum Speichern von Zeichenfolgen. Für Objekte ist üblicherweise eine explizite JSON-Serialisierung erforderlich; auch das Lesen und Parsen erfolgt synchron.

IndexedDB stellt einen asynchronen Browserspeicher für strukturierte Daten bereit. In der Anwendung wird die Transaktionssammlung als einzelner Wert unter dem Schlüssel `personal-finance.transactions` gespeichert. Der DAL kapselt die Datenbankoperationen, sodass die Facade nicht von den Details der IndexedDB-API abhängt.

`IndexedDbService` ist für das Öffnen der Datenbank `personal-finance`, das Erstellen des Object Stores `key-value` sowie das Lesen, Schreiben und Löschen von Werten zuständig. Die Storage Facade stellt eine funktional orientierte Schnittstelle bereit: Die Transaktions-Facade verwendet diese Schnittstelle, statt direkt mit IndexedDB zu arbeiten.

### Migration bereits gespeicherter Daten

Der Wechsel zu IndexedDB berücksichtigt Daten, die möglicherweise von einer früheren Anwendungsversion in LocalStorage gespeichert wurden.

Beim ersten Lesen eines bestimmten Schlüssels prüft der Service zunächst IndexedDB. Ist dort kein Wert vorhanden, sucht er den alten Wert in LocalStorage. Wird ein solcher gefunden, parst der Service das JSON und versucht, die Daten in IndexedDB zu schreiben. Der alte Wert wird erst dann aus LocalStorage entfernt, wenn das Schreiben in IndexedDB erfolgreich war.

Dadurch wird die vorhandene Transaktionssammlung beim ersten Lesen automatisch migriert, ohne dass der Benutzer sie erneut manuell eingeben muss. Die Migration erfolgt für jeden Schlüssel separat und erfordert keine vorherige Übertragung sämtlicher Daten beim Start der Anwendung.

LocalStorage wird nicht vollständig aus der Anwendung entfernt: Er wird weiterhin zum Speichern des Benutzernamens verwendet. Geändert wird ausschließlich der Speichermechanismus für die Transaktionssammlung. So bleiben nicht zusammenhängende Daten unberührt und das Verhalten der Anmeldung unverändert.

Die Storage Facade erhält diese Trennung auch auf der Anwendungsschnittstelle aufrecht. Für Transaktionen verwendet sie IndexedDbService, während sie den Benutzernamen weiterhin über den vorhandenen StorageService liest und speichert. Die Migration der Transaktionssammlung wirkt sich daher nicht auf Authentifizierungsdaten aus und erfordert nicht, alle LocalStorage-Werte nach IndexedDB zu verschieben.

### Wiederherstellung des Zustands nach einem Neuladen der Seite

Nach einem vollständigen Neuladen der Angular-Anwendung werden Signals neu erstellt. Deshalb muss die Facade die Sammlung aus dem persistenten Speicher wiederherstellen.

Während der Initialisierung fordert die Facade die Transaktionen asynchron über die Storage Facade an. Existiert eine gespeicherte Sammlung, wird sie zum neuen Wert des Ausgangs-Signals. Sind noch keine Daten vorhanden, liefert die Storage Facade die Demo-Sammlung zurück.

Beim Hinzufügen einer neuen Transaktion wartet die Facade zunächst auf den Abschluss des initialen Ladevorgangs. Das ist wichtig: Die neue Transaktion muss zur bereits wiederhergestellten Sammlung hinzugefügt werden und nicht zu einem leeren Anfangszustand. Anschließend aktualisiert die Facade das Signal und speichert das aktualisierte Array über die Storage Facade.

Damit hängt der Benutzerablauf nicht davon ab, ob die Seite gerade erst geöffnet wurde oder die Anwendung bereits seit einiger Zeit läuft. Die Quelle der persistenten Daten bleibt dieselbe, während die UI ihren Zustand über Facade und Signals erhält.

### Überprüfung der Implementierung

Es reicht nicht aus, nur das sichtbare Erscheinen einer neuen Zeile im Dashboard zu überprüfen. Die Anzeige von Daten in der aktuellen Sitzung beweist noch nicht, dass sie tatsächlich dauerhaft gespeichert wurden.

Die Überprüfung sollte mehrere getrennte Bedingungen umfassen:

- Nach der Bestätigung des Dialogs erscheint eine neue Transaktion im Dashboard.
- Die Daten werden tatsächlich unter dem erwarteten Schlüssel in IndexedDB gespeichert.
- Nach einem vollständigen Neuladen der Seite wird die Transaktion aus IndexedDB wiederhergestellt.
- Das Abbrechen des Dialogs erstellt keine neue Transaktion.
- Die alte Sammlung in LocalStorage wird beim ersten Lesen nach IndexedDB migriert.
- Nach erfolgreicher Migration wird der alte Wert aus LocalStorage entfernt.

Diese Prüfungen decken drei unabhängige Aspekte ab: den Benutzerablauf, die reaktive Aktualisierung des Zustands und die dauerhafte Datenspeicherung. Erst die erfolgreiche Überprüfung aller drei Aspekte bestätigt, dass die Implementierung als Ganzes funktioniert.

Die E2E-Prüfungen trennen diese Szenarien. Der Test des modalen Dialogs überprüft, dass Einnahmen über das Formular erstellt werden können, dass ein Datensatz in IndexedDB vorhanden ist und dass die Daten nach einem Neuladen der Seite wiederhergestellt werden. Das Abbrechen des Dialogs mit der Escape-Taste wird separat geprüft: Das Schließen des Formulars darf keine Transaktion hinzufügen. Der Migrationstest legt einen alten Datensatz in LocalStorage an, öffnet die Anwendung, prüft die Anzeige der wiederhergestellten Transaktion, kontrolliert den Wert in IndexedDB und bestätigt, dass der alte Schlüssel nach erfolgreicher Migration entfernt wurde.

### Zusammenfassung

In der Anwendung ergibt sich damit folgender Ablauf der Verantwortlichkeiten:

- Der Modal Dialog übernimmt die Eingabe und Validierung des Formulars.
- Das Dashboard öffnet den Dialog und übergibt das bestätigte Ergebnis an die Facade.
- Die Transaktions-Facade verwaltet den gemeinsamen Zustand der Vorgänge.
- Signals sorgen für die reaktive Aktualisierung des Dashboards.
- `computed()` berechnet abgeleitete Werte.
- Eine explizite Facade-Methode aktualisiert das Signal und übergibt die Sammlung zur Speicherung an die Storage Facade.
- Der DAL kapselt die technische Arbeit mit IndexedDB.
- Die Storage Facade stellt eine funktionale Schnittstelle für den Datenzugriff bereit.

Die Komponenten sind nicht direkt gekoppelt, und Effect wird nicht als Ersatz für explizite Facade-Operationen verwendet. Jeder Mechanismus hat seine eigene Aufgabe: Die Facade verwaltet die Funktionalität, Signals repräsentieren den Zustand, `computed()` berechnet abgeleitete Daten, und IndexedDB stellt die dauerhafte Speicherung der Transaktionssammlung sicher.

[Branch +2 — Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking+2](https://github.com/iAVP/enterprise-frontend-workshop/tree/Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking+2)

# Offizielle Dokumentation

- [Angular Signals](https://angular.dev/guide/signals) — reaktiver Zustand, Read-only Signals und berechnete Werte.
- [Angular Effects](https://angular.dev/guide/signals/effect) — Zweck von Effect und Empfehlungen für seinen Einsatz.
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) — asynchrone Speicherung strukturierter Daten im Browser.
- [IDBDatabase](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase) — Transaktionen öffnen und mit Object Stores arbeiten.

---

[Enterprise Frontend Workshop Repository](https://github.com/iAVP/enterprise-frontend-workshop)
