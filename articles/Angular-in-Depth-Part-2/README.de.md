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

## 4. Praktische Umsetzung: Phase +1 — Facades und Signals ohne Effect

Der historische Teil des Artikels hat gezeigt, warum Verantwortlichkeiten, kontrollierte Abhängigkeiten und die Einhaltung architektonischer Grenzen für mich wichtig sind. Jetzt wechseln wir von diesen Prinzipien zur praktischen Umsetzung.

Als Beispiel verwenden wir eine Personal-Finance-Anwendung. Sie ermöglicht die Verwaltung von Einnahmen und Ausgaben, zeigt eine Zusammenfassung auf dem Dashboard an und speichert Benutzerdaten. Uns interessiert nicht der vollständige Funktionsumfang der Anwendung, sondern die Organisation der Zusammenarbeit zwischen UI, Zustand, WebAPI und lokalem Speicher.

In der ersten Phase bauen wir die Struktur auf Facade Services und Signals auf. Dabei führen wir bewusst kein `effect()` ein, denn im gewählten Benutzerablauf wird es nicht benötigt. Auf seine Verwendung kommen wir in der nächsten Phase zurück, wenn sich die Interaktion mit den Formularen ändert.

### Vom Benutzerablauf zu den Architektur-Anforderungen

Wir beginnen nicht mit Ordnern und Klassen, sondern mit dem Verhalten der Anwendung.

Beim Öffnen der Website muss die Anwendung den Authentifizierungsstatus prüfen. Dazu kommuniziert sie über die entsprechende Facade mit der WebAPI. Ist der Benutzer nicht authentifiziert, muss er zur Login-Seite gelangen. Das Dashboard ist erst nach erfolgreicher Authentifizierung verfügbar.

Nach der Anmeldung sieht der Benutzer das Dashboard mit einer aktuellen Übersicht über Einnahmen und Ausgaben. In der ersten Phase werden Vorgänge auf separaten Seiten erstellt und bearbeitet. Der Benutzer öffnet die Seite zum Hinzufügen oder Ändern einer Einnahme beziehungsweise Ausgabe, speichert die Daten und kehrt zum Dashboard zurück.

Nach der Rückkehr muss das Dashboard den aktuellen Zustand anzeigen. Die Komponente muss nicht wissen, auf welche Weise die Daten abgerufen wurden, wo sie gespeichert sind oder wie die Anfrage ausgeführt wird. Ihre Aufgabe besteht darin, den Zustand darzustellen und die Benutzeraktion an die zuständige Facade weiterzugeben.

Aus diesem Ablauf ergeben sich die grundlegenden Anforderungen:

- Komponenten kommunizieren nicht direkt mit der WebAPI.
- Komponenten greifen nicht unmittelbar auf Local Storage, Session Storage oder IndexedDB zu.
- Zustand und Operationen sind in den entsprechenden Facade Services gekapselt.
- Der Low-Level-Datenzugriff ist von der UI getrennt.
- Zustandsänderungen erfolgen über öffentliche Methoden der Facade.
- Abgeleitete Werte des Dashboards werden reaktiv berechnet.
- Die Architektur bleibt ausreichend einfach und führt keine Abstraktionen ohne praktischen Bedarf ein.

### Dependency Injection (DI): Verwaltung von Abhängigkeiten

Dependency Injection ist ein Entwurfsprinzip, bei dem ein Objekt seine Abhängigkeiten nicht selbst erstellt, sondern von außen erhält. Dadurch muss eine Klasse nicht wissen, wie die verwendeten Objekte erzeugt werden und wer für deren Lebenszyklus verantwortlich ist.

Stellen wir uns eine Komponente vor, die einen Authentifizierungsservice und einen Service zum Laden von Daten benötigt. Ohne DI müsste die Komponente diese Objekte selbst erzeugen, ihre Konstruktoren kennen und möglicherweise die gesamte Abhängigkeitskette manuell aufbauen. Das würde zu einer engen Kopplung führen: Eine Änderung der Erzeugung eines Services würde auch dessen Verbraucher betreffen.

DI verlagert diese Verantwortung in einen separaten Mechanismus – den Dependency Container. In Angular übernehmen Injector diese Aufgabe. Sie speichern Informationen über registrierte Abhängigkeiten, erzeugen bei Bedarf Instanzen und stellen sie den Verbrauchern zur Verfügung.

Angular DI basiert auf drei grundlegenden Konzepten:

- **Injection Token** – ein Bezeichner, anhand dessen Angular den benötigten Wert finden kann. Als Token können eine Klasse, eine abstrakte Klasse oder ein speziell erstelltes `InjectionToken`-Objekt dienen.
- **Provider** – eine Beschreibung, welcher Wert für einen bestimmten Token bereitgestellt werden soll und wie er zu erhalten ist: durch Erzeugen einer Klasseninstanz, Verwendung eines vorhandenen Werts oder Aufruf einer Factory.
- **Injector** – der Mechanismus, der eine Abfrage nach einer Abhängigkeit auflöst: Er findet den entsprechenden Provider, beschafft oder erzeugt den Wert und gibt ihn an den Verbraucher zurück.

Der Verbraucher fordert also eine Abhängigkeit über einen Token an, und der Angular Injector löst diese Anfrage mithilfe des registrierten Providers auf. Der Verbraucher muss nicht wissen, welches konkrete Objekt bereitgestellt wird und wie es erzeugt wurde.

#### Dependency Tokens

In Angular dient meistens die Serviceklasse selbst als Token. Wenn eine Komponente beispielsweise `AuthFacade` anfordert, verwendet Angular diese Klasse als Token und sucht nach einem dafür registrierten Provider.

Eine Abhängigkeit wird jedoch nicht immer durch eine Klasse repräsentiert. Manchmal müssen Anwendungskonfiguration, ein String-Wert, eine Funktion oder ein Objekt injiziert werden, für das keine eigene Klasse erforderlich ist. Für solche Fälle stellt Angular `InjectionToken` bereit.

Tokens ermöglichen es, den Abhängigkeitsvertrag von der konkreten Implementierung zu trennen. Das ist besonders nützlich, wenn sich eine Implementierung abhängig von der Anwendungskonfiguration oder der Umgebung ändern kann.

An dieser Stelle beschränken wir uns auf diesen Überblick. Verschiedene Token-Arten, eigene `InjectionToken`-Objekte, Factory Provider, Multi Provider und praktische Anwendungsszenarien verdienen eine eigene Betrachtung und werden in einem anderen Artikel behandelt.

#### Wie sieht das in Angular aus?

Im modernen Angular kann eine Abhängigkeit mithilfe der Funktion `inject()` bezogen werden. Sie greift auf den aktuellen Injection Context zu und fordert den Wert über den entsprechenden Token an:

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionWebApi {
  private readonly http = inject(HttpClient);
}
```

Hier dient `HttpClient` als Dependency Token, und Angular stellt die dafür registrierte Instanz bereit. Die Klasse erzeugt `HttpClient` nicht selbst und verwaltet dessen interne Implementierung nicht.

In diesem Projekt verwenden wir zum Beziehen von Abhängigkeiten `inject()` statt Constructor Injection. Damit verfolgen wir einen einheitlichen Angular-Codestil, den wir auch in den weiteren Beispielen beibehalten.

DI ist nicht auf Services beschränkt: Komponenten, Direktiven, Pipes und andere von Angular DI unterstützte Klassen können Abhängigkeiten erhalten. Wo ein Provider registriert wird und wie lange die erzeugte Instanz existiert, hängt von der Injector-Hierarchie und dem Registrierungsbereich ab. Das steht in direktem Zusammenhang mit dem Lebenszyklus von Services, den wir als Nächstes betrachten.

### Angular-Services und ihr Lebenszyklus

Bevor wir über Facades, Signals und den Anwendungszustand sprechen, müssen wir verstehen, was Angular als Service bezeichnet und wie lange seine Instanzen leben. Ohne dieses Wissen lässt sich nicht richtig erklären, warum ein Signal innerhalb eines Services bei der Navigation zwischen Seiten manchmal erhalten bleibt und manchmal verschwindet.

#### Ein Service als Funktionseinheit und ein Service in Angular DI

Im architektonischen Kontext bezeichnet ein Service normalerweise eine Klasse mit einer bestimmten funktionalen Verantwortung. Das kann Datenverarbeitung, Kommunikation mit einer WebAPI, Zustandsverwaltung, Berechnung, Formatierung, Validierung oder die Koordination von Operationen sein.

Es ist jedoch wichtig, zwei Begriffe zu unterscheiden: einen funktionalen Service als gewöhnliche TypeScript-Klasse und einen Service, dessen Instanz von Angular Dependency Injection verwaltet wird. Das ist nicht dasselbe.

**Eine gewöhnliche funktionale Klasse benötigt nicht allein deshalb DI, weil sie Logik enthält.** Ein Rechner, Formatter oder Datentransformator kann beispielsweise eine ganz normale Klasse sein. Wenn er keine Abhängigkeiten von Angular benötigt und sein Lebenszyklus nicht von Angular verwaltet werden muss, kann die Instanz direkt erzeugt werden:

```ts
export class TransactionCalculator {
  calculateBalance(income: number, expenses: number): number {
    return income - expenses;
  }
}

const calculator = new TransactionCalculator();
const balance = calculator.calculateBalance(1000, 350);
```

Hier erfüllt `TransactionCalculator` eine eigenständige funktionale Aufgabe. Die Klasse ist nicht in Angular DI registriert, ist kein Provider und benötigt kein `@Injectable()`.

**Ein Angular-Service, der über DI bezogen wird, ist eine Klasse, deren Instanz Angular den Verbrauchern bereitstellen soll.** Wenn mehrere Komponenten oder andere Services dieselbe Instanz verwenden sollen, wenn die Klasse selbst Abhängigkeiten über `inject()` erhält oder wenn der Gültigkeitsbereich ihres Zustands durch einen Anwendungs-Injector bestimmt werden soll, wird die Klasse an Angular DI angebunden.

Dafür werden zwei miteinander verbundene, aber unterschiedliche Mechanismen verwendet:

- `@Injectable()` teilt Angular mit, dass die Klasse für die Teilnahme an DI vorbereitet ist, und ermöglicht Angular, eine Factory für ihre Erzeugung bereitzustellen. Der Decorator allein legt ohne `providedIn` oder Registrierung in `providers` nicht fest, wo die Instanz verfügbar ist.
- **Provider** ist eine Registrierung, die einen Dependency Token mit einer Regel zur Beschaffung des Werts verknüpft. Ein Provider kann auf eine Klasse, einen vorhandenen Wert oder eine Factory verweisen. Er ist selbst kein Service und muss auch keinen Service bereitstellen: Über DI können ebenso Konfigurationen, Strings, Funktionen und andere Werte bezogen werden.

Mit anderen Worten: Ein Service beschreibt die funktionale Rolle einer Klasse, ein Provider hingegen ist eine Anweisung an Angular DI, welcher Wert für einen bestimmten Token bereitgestellt und wie er beschafft werden soll. Nicht jeder funktionale Service ist ein Provider, und nicht jeder Provider stellt einen Service bereit.

Wenn eine Klasse Abhängigkeiten über Angular DI erhalten soll, muss sie für DI vorbereitet und in einem geeigneten Injector registriert werden. In diesem Projekt beziehen wir Abhängigkeiten innerhalb von Angular-Klassen über `inject()` und nicht über Constructor Injection. Benötigt eine Klasse keine DI, sollten wir nicht nur wegen des formalen Status als „Service“ `@Injectable()` und eine Registrierung hinzufügen.

Im Folgenden betrachten wir genau die Services, die von Angular DI verwaltet werden. Denn um Facades, Signals und den Lebenszyklus des Zustands zu verstehen, müssen wir wissen, wo ihre Instanzen erzeugt werden und wie lange sie existieren.

#### Root-Services

Die gebräuchlichste Variante ist die Registrierung eines Services im Root-Injector der Anwendung:

```ts
import { Injectable, computed, signal } from '@angular/core';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionState {
  private readonly _transactions = signal<readonly Transaction[]>([]);

  readonly transactions = this._transactions.asReadonly();

  readonly transactionCount = computed(
    () => this._transactions().length
  );

  replaceTransactions(transactions: readonly Transaction[]): void {
    this._transactions.set([...transactions]);
  }
}
```

Der Wert `providedIn: 'root'` registriert den Service im Root EnvironmentInjector. Innerhalb einer einzelnen Anwendungsinstanz existiert ein solcher Service normalerweise als eine einzige Instanz und kann in Komponenten, andere Services und weitere Verbraucher injiziert werden, die die Abhängigkeit über diesen Root-Injector auflösen.

Die Instanz wird nicht zwingend beim Start der Anwendung erzeugt. Angular erstellt sie normalerweise erst, wenn der Service zum ersten Mal angefordert wird. Nach der Erstellung bleibt sie verfügbar, solange der entsprechende Root-Injector existiert.

Deshalb eignen sich Root-Services häufig für Zustände, die über verschiedene Anwendungsseiten hinweg gemeinsam genutzt werden sollen: beispielsweise den Authentifizierungsstatus, Benutzereinstellungen oder geladene Transaktionen.

Es gibt jedoch eine wichtige Einschränkung: Root beschreibt den Gültigkeitsbereich innerhalb einer laufenden Angular-Anwendungsinstanz und keine dauerhafte Datenspeicherung. Bei einem vollständigen Neuladen der Seite erstellt der Browser eine neue JavaScript-Umgebung und eine neue Angular-Anwendung. Die alten Service-Instanzen und die darin enthaltenen Signals werden zusammen mit der vorherigen Anwendung zerstört. Nach dem Start werden neue Instanzen erzeugt und ihr Anfangszustand wird erneut aufgebaut.

Ein Root-Service erhält den Zustand also bei gewöhnlicher Navigation innerhalb der Anwendung, überlebt aber kein vollständiges Neuladen der Seite.

#### Services mit lokalem Gültigkeitsbereich

Nicht jeder Service muss in der gesamten Anwendung gemeinsam genutzt werden. Angular ermöglicht die Registrierung von Providern auf Route-, Komponenten- oder Direktivenebene. In diesem Fall ist die Instanz im entsprechenden DI-Bereich verfügbar und nicht in der gesamten Anwendung.

Ein Service kann beispielsweise in `providers` einer Komponente registriert werden:

```ts
import { Component, Injectable, inject, signal } from '@angular/core';

@Injectable()
export class TransactionEditorState {
  private readonly _description = signal('');

  readonly description = this._description.asReadonly();

  setDescription(description: string): void {
    this._description.set(description);
  }
}

@Component({
  selector: 'app-transaction-editor',
  standalone: true,
  providers: [TransactionEditorState],
  template: '<p>{{ state.description() }}</p>'
})
export class TransactionEditorComponent {
  readonly state = inject(TransactionEditorState);
}
```

Hier ist `TransactionEditorState` nicht im Root-Injector, sondern im Gültigkeitsbereich einer bestimmten Komponenteninstanz registriert. Angular erzeugt für jede Instanz von `TransactionEditorComponent` eine eigene Service-Instanz. Untergeordnete Komponenten können über die DI-Hierarchie dieselbe Instanz erhalten, sofern sie den entsprechenden Provider nicht überschreiben.

Wird die Komponenteninstanz zerstört, endet auch der Gültigkeitsbereich ihres Providers. Zusammen mit dem Service verschwindet der gesamte Zustand, der in seinen Feldern und Signals gespeichert war.

Dieser Ansatz eignet sich für Zustände, die zu einem bestimmten Bildschirm oder einer konkreten UI-Instanz gehören: beispielsweise ein Formularentwurf, temporäre Editorparameter oder der Zustand eines mehrstufigen Ablaufs.

Provider können auch auf Route-Ebene deklariert werden. Dadurch lassen sich Services eines funktionalen Routenbereichs bereitstellen, ohne sie für die gesamte Anwendung zu registrieren. Der Gültigkeitsbereich wird durch den entsprechenden Route EnvironmentInjector bestimmt. Man sollte nicht automatisch davon ausgehen, dass ein solcher Service bei jedem Verlassen und erneuten Aufrufen der Route zerstört wird.

#### Was bedeutet „Ein Service ist als Provider registriert“?

Ein Provider ist weder eine eigene Art von Service noch eine Basisklasse. Er ist eine Anweisung für DI, die einen Dependency Token mit der Art verknüpft, wie der entsprechende Wert beschafft wird: durch Erzeugen einer Klasseninstanz, Verwendung eines vorhandenen Werts oder Aufruf einer Factory.

`providedIn: 'root'` ist eine bequeme Möglichkeit, eine Injectable-Klasse im Root-Injector zu registrieren. Das Array `providers` in der Konfiguration der Anwendung, einer Route oder einer Komponente ermöglicht die explizite Registrierung im gewünschten Bereich.

Wenn eine Klasse weder über `providedIn` noch über den entsprechenden `providers`-Eintrag registriert ist, kann Angular sie in diesem Bereich nicht als Abhängigkeit injizieren. Die TypeScript-Klasse lässt sich weiterhin manuell mit `new` erzeugen, aber eine solche Instanz wird nicht mehr von Angular DI verwaltet: Der Entwickler muss ihre Abhängigkeiten und ihren Lebenszyklus selbst organisieren.

Wenn wir also von einem Root-Service oder einem Service mit lokalem Gültigkeitsbereich sprechen, beschreiben wir keine unterschiedlichen Arten von TypeScript-Klassen. Wir beschreiben den Ort der Provider-Registrierung und den Sichtbarkeitsbereich der erzeugten Instanz.

#### Welche Rolle spielen Signals dabei und warum verschwindet der Zustand?

Ein Signal ist weder ein Service noch wird es als Provider registriert. Es ist ein reaktiver Wertcontainer. Sein Lebenszyklus wird durch das Objekt bestimmt, das es erstellt und eine Referenz darauf hält.

In den vorherigen Beispielen ist das Signal als Feld eines Services deklariert. Deshalb ist die Lebensdauer dieses Zustands faktisch an die Lebensdauer der Service-Instanz gebunden:

- Ein Signal innerhalb eines Root-Services behält seinen Wert bei der Navigation zwischen Seiten normalerweise so lange, wie der Root-Injector der Anwendung existiert.
- Ein Signal innerhalb eines auf Komponentenebene registrierten Services existiert während der Lebensdauer der entsprechenden Komponenteninstanz und ihres DI-Bereichs.
- Ein direkt in einer Komponente erstelltes Signal ist an den Lebenszyklus dieser Komponenteninstanz gebunden.
- Bei einem vollständigen Neuladen der Seite verschwinden alle Instanzen und Signals der vorherigen Anwendung – unabhängig davon, ob sie Root oder lokal waren.

In Angular Signals gibt es einige grundlegende Varianten, die man unterscheiden sollte:

- `signal()` erstellt ein Writable Signal – einen Wert, den sein Besitzer mit `set()` und `update()` lesen und ändern kann.
- `asReadonly()` stellt eine schreibgeschützte Schnittstelle zu einem bestehenden Writable Signal bereit. Der Verbraucher kann über die zurückgegebene Referenz keine Methoden zur Wertänderung aufrufen. Eine tiefe Immutability für verschachtelte Objekte wird dadurch jedoch nicht gewährleistet.
- `computed()` erstellt ein schreibgeschütztes Signal, dessen Wert aus anderen Signals abgeleitet wird. Es eignet sich für abgeleitete Daten und wird bei Änderungen der Abhängigkeiten automatisch neu berechnet.

Die Begriffe „Root Signal“ und „lokales Signal“ sind keine eigenen Signaltypen in Angular. Sie stellen keine Klassifizierung der API dar. Informell können wir damit den Gültigkeitsbereich eines Signals beschreiben, abhängig davon, wo es erstellt wurde – beispielsweise in einem Root-Service oder in einem Service, der auf Komponentenebene registriert ist.

Hier liegt auch die Antwort auf die Frage, warum Daten verschwinden können. Ein Signal speichert seinen Wert im JavaScript-Speicher, nicht auf einem Datenträger und nicht in einer Browserdatenbank. Der Wert ist verfügbar, solange sein Besitzer existiert. Wird der Besitzer oder die gesamte Anwendung zerstört, verschwindet auch der entsprechende Zustand.

Wenn Daten ein Neuladen der Seite überstehen müssen, müssen sie separat gespeichert werden – beispielsweise auf einem Backend oder in einem Browser-Speicher. Nach dem Start der Anwendung müssen die Daten gelesen und der Zustand der Signals wiederhergestellt werden. Weder ein Root-Service noch ein Signal ist für sich genommen ein Mechanismus zur dauerhaften Speicherung.

Nachdem wir Services, Provider, DI-Bereiche und den Lebenszyklus des Zustands betrachtet haben, können wir zu den Facades übergehen. Eine Facade ist kein spezieller Angular-Service-Typ, sondern die architektonische Rolle eines konkreten Services: Sie stellt Komponenten eine verständliche funktionale Grenze bereit und verbirgt die interne Implementierung.

### Verantwortungsgrenzen

Für diese Anwendung reicht es aus, einige zentrale Verantwortlichkeiten zu trennen.

**UI-Komponenten** sind für die Darstellung, die Benutzereingabe und die lokale Interaktion verantwortlich. Sie erhalten Daten über die öffentlichen Schnittstellen der Facades und rufen deren Methoden auf. Komponenten dürfen weder direkt auf das Backend zugreifen noch unmittelbar mit den Browsermechanismen zur Datenspeicherung arbeiten. Sie sollten nicht einmal wissen müssen, wo die von ihnen verwendeten Informationen gespeichert sind. Diese Information ist für sie nicht nur unnötig – sie ist gefährlich und sollte vollständig tabu sein. Eine Komponente sollte so wenig Logik wie möglich enthalten und nach Minimalismus streben, wie jedes HTML-Tag des W3C.

**WebAPI Facade** stellt der UI eine verständliche Schnittstelle für die Kommunikation mit dem Backend bereit. Sie koordiniert das Abrufen und Ändern von Daten, verwaltet den Zustand dieser Vorgänge und verwendet bei Bedarf nachgelagerte Services für den WebAPI-Zugriff.

**Storage Facade** kapselt den Zugriff der Anwendung auf den lokalen Speicher. Die UI und andere Anwendungsteile greifen über ihre Methoden und Verträge darauf zu, nicht über einen konkreten Speichermechanismus.

**DAL (Data Access Layer)** enthält die Low-Level-Implementierung des Datenzugriffs. Dazu gehören beispielsweise die Initialisierung von IndexedDB, die Arbeit mit Object Stores und Transaktionen sowie technische Besonderheiten der Browser-API. Diese Details dürfen nicht in Komponenten gelangen oder Teil ihrer Verantwortung werden.

Vereinfacht sieht der Interaktionsfluss folgendermaßen aus:

```text
UI Component
    |
    v
Feature Facade
    |
    +----> WebAPI / Data Service ----> HTTP Client ----> Backend
    |
    +----> Storage Facade --------> DAL ------------> IndexedDB
```

Dies ist ein Diagramm der Verantwortlichkeiten und keine zwingende Vorgabe, für jeden Kasten einen eigenen Service zu erstellen. Wenn ein bestimmter Teil keine eigenständige Verantwortung besitzt, sollte er nicht künstlich als separate Abstraktion ausgegliedert werden.

In dieser Phase reicht beispielsweise eine einzige Storage Facade aus. Eine separate IndexedDB Facade ist nicht erforderlich: Die Low-Level-Implementierung ist bereits im DAL isoliert, und ein zusätzlicher Vermittler löst derzeit kein eigenständiges Problem.

### Eine Facade als öffentliche Funktionsgrenze

Ein Facade Service ist nicht einfach ein Service, in den einige Methoden aus einer Komponente verschoben wurden. Seine Hauptaufgabe besteht darin, eine verständliche und stabile Schnittstelle für eine bestimmte Funktionalität bereitzustellen.

Die Dashboard-Komponente muss nicht wissen, wie Transaktionen genau geladen werden, wie eine Backend-Antwort verarbeitet wird oder wie die Summen berechnet werden. Sie soll einen fertigen Zustand erhalten und die benötigte Aktion aufrufen.

Eine beispielhafte Schnittstelle der Facade könnte folgendermaßen aussehen:

```ts
import type { Signal } from '@angular/core';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
}

export interface CreateTransactionCommand {
  amount: number;
}

export interface UpdateTransactionCommand {
  id: string;
  amount: number;
}

export interface TransactionFacade {
  readonly transactions: Signal<readonly Transaction[]>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;
  readonly totalIncome: Signal<number>;
  readonly totalExpenses: Signal<number>;
  readonly balance: Signal<number>;

  load(): Promise<void>;
  createIncome(command: CreateTransactionCommand): Promise<void>;
  createExpense(command: CreateTransactionCommand): Promise<void>;
  updateTransaction(command: UpdateTransactionCommand): Promise<void>;
}
```

Dies ist eine Illustration des öffentlichen Vertrags und keine vollständige Implementierung mit konkreter Fehlerbehandlung und HTTP-Anfragen. Entscheidend ist das Prinzip: Die Komponente sieht fachliche Operationen der Anwendung und nicht die technischen Details ihrer Ausführung.

Eine Facade kann frontend-spezifische Logik enthalten: die Aufbereitung von Daten für die UI, eine vorläufige Validierung der Benutzereingaben, die Koordination mehrerer Anfragen und die Verwaltung des Ladezustands. Das bedeutet jedoch nicht, dass Geschäftsregeln des Backends ins Frontend verschoben werden sollen. Die serverseitige Geschäftslogik und die Datenvalidierung auf dem Backend bleiben Aufgabe des Backends.

Gleichzeitig sollte eine Facade nicht zu einem universellen Service für die gesamte Anwendung werden. Die Grenzen der Facades sollten klaren funktionalen Bereichen entsprechen. Für das kleine Beispiel Personal Finance ist es nicht erforderlich, im Voraus eine komplexe Domain-Struktur einzuführen. Die Verantwortlichkeiten für Authentifizierung, Transaktionen und Datenspeicherung müssen jedoch unterscheidbar bleiben.

### Zustandskapselung mit Signals

Es ist praktisch, den internen Zustand einer Facade in Writable Signals zu speichern. Komponenten erhalten schreibgeschützte Signals und können den Zustand der Facade daher nicht direkt über `set()` oder `update()` ändern.

Ein vereinfachtes Beispiel:

```ts
import { computed, signal } from '@angular/core';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
}

export class TransactionFacade {
  private readonly _transactions = signal<readonly Transaction[]>([]);

  readonly transactions = this._transactions.asReadonly();

  readonly totalIncome = computed(() =>
    this._transactions()
      .filter(transaction => transaction.type === 'income')
      .reduce((total, transaction) => total + transaction.amount, 0)
  );

  readonly totalExpenses = computed(() =>
    this._transactions()
      .filter(transaction => transaction.type === 'expense')
      .reduce((total, transaction) => total + transaction.amount, 0)
  );

  readonly balance = computed(
    () => this.totalIncome() - this.totalExpenses()
  );

  replaceTransactions(transactions: readonly Transaction[]): void {
    this._transactions.set([...transactions]);
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

Wichtig ist die Grenze der Verantwortung von `computed()`: Es berechnet einen Wert aus dem bereits vorhandenen Zustand, lädt aber keine Daten vom Server und stellt sie auch nicht aus einem Speicher wieder her.

Nach einem vollständigen Neuladen der Anwendung verschwindet der Zustand im Arbeitsspeicher. Deshalb müssen die Daten bei der Initialisierung der Anwendung oder des entsprechenden Funktionsbereichs über Facade und DAL geladen werden. Nach dem Empfang der Daten aktualisiert die Facade das Ausgangs-Signal, und die abgeleiteten Werte werden automatisch neu berechnet.

### Signals und RxJS lösen unterschiedliche Aufgaben

Die Einführung von Signals bedeutet nicht, dass RxJS nicht mehr benötigt wird. Diese Werkzeuge lösen verwandte, aber unterschiedliche Aufgaben.

Signals eignen sich gut zur Darstellung des aktuellen Anwendungszustands und seiner abgeleiteten Werte. Sie lassen sich bequem in Templates lesen, in Facades verwenden und über `computed()` mit anderen Zuständen verknüpfen.

RxJS bleibt ein wichtiges Werkzeug für die Arbeit mit asynchronen Streams: HTTP-Kommunikation, Ereignisfolgen, Abbruch und Kombination von Requests, Verarbeitung von Datenströmen und andere Szenarien, in denen Observables und Operatoren nützlich sind.

Angular bietet Mechanismen zur Zusammenarbeit dieser Modelle. Beispielsweise ermöglicht `toSignal()`, ein Observable als Signal darzustellen, während `toObservable()` ein Signal als Observable bereitstellt. Das sind Integrationswerkzeuge und kein Grund, jedes Observable mechanisch in ein Signal oder umgekehrt umzuwandeln.

In unserer Architektur kann eine Facade RxJS zur Koordination eines asynchronen Vorgangs verwenden und anschließend ihre internen Signals mit dem Ergebnis aktualisieren. Die Komponente muss dabei nicht wissen, welcher Mechanismus intern verwendet wurde.

### Warum wir in dieser Phase keinen Effect benötigen

Im aktuellen Benutzerablauf bleiben die Formulare für Einnahmen und Ausgaben separate Seiten.

Der Benutzer öffnet ein Formular, speichert eine Transaktion und kehrt zum Dashboard zurück. Nach der Rückkehr erhält das Dashboard den aktuellen Zustand über die Facade. Die Facade selbst verwaltet das Laden und Ändern der Daten, während Signals die Aktualisierung der abhängigen Ansichten sicherstellen.

Es ist hier nicht notwendig, den Wert eines Signals in ein anderes zu kopieren oder eine zusätzliche Synchronisierungskette zu starten. Für berechnete Summen reicht `computed()`; für das Laden und Speichern verwenden wir explizite Methoden der Facade.

Deshalb wird `effect()` in diesem Teil bewusst nicht verwendet. In der aktuellen Angular-Dokumentation wird Effect in erster Linie als Mechanismus zur Synchronisierung reaktiven Zustands mit imperativen APIs und externen Systemen beschrieben. Für abgeleitete Werte wird `computed()` empfohlen, nicht das Kopieren von Zustand über einen Effect.

In der nächsten Phase ändern wir den Interaktionsablauf: Die Formulare werden zu Modal Dialogs, und es entsteht eine konkrete Aufgabe, für die wir den Einsatz von Effect gesondert bewerten können. So lässt sich seine Verwendung anhand eines tatsächlichen Architekturbedarfs zeigen und nicht nur, um eine API vorzuführen.

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

### Ergebnis der Phase +1

Nach dieser Phase erhalten wir eine klare Trennung der Verantwortlichkeiten:

- UI-Komponenten zeigen Daten an und leiten Benutzeraktionen weiter.
- Facade Services stellen öffentliche Operationen bereit und kapseln den Zustand.
- Signals repräsentieren den aktuellen Zustand und abgeleitete Werte.
- RxJS wird dort eingesetzt, wo die Verarbeitung asynchroner Streams erforderlich ist.
- Storage Facade trennt die Anwendung vom konkreten Mechanismus der lokalen Speicherung.
- DAL enthält die Low-Level-Implementierung des Datenzugriffs.
- Das Backend bleibt Eigentümer der serverseitigen Geschäftslogik.

Wir haben keine separaten Domains, keinen universellen Store und keine zusätzlichen Abstraktionsebenen ohne Notwendigkeit eingeführt. Die Architektur ist aus einem konkreten Benutzerablauf und seinen Anforderungen entstanden.

Das ist das zentrale Prinzip dieser Phase: Signals oder Facades nicht deshalb verwenden, weil sie in Angular verfügbar sind, sondern dort einsetzen, wo sie helfen, Zustand, Verantwortlichkeiten und die Interaktion der Systemteile verständlich zu machen.

### Offizielle Dokumentation

- [Angular Signals](https://angular.dev/guide/signals) — Writable Signals, Read-only Signals, computed und reaktive Abhängigkeiten.
- [RxJS interop with Angular signals](https://angular.dev/guide/signals/rxjs-interop) — Zusammenarbeit von Observables und Signals über `toSignal()` und `toObservable()`.
- [Angular Effects](https://angular.dev/guide/signals/effect) — Zweck von Effect und Empfehlungen für seinen Einsatz.

### Anwendung und Prüfungen über das npm-Fenster der IDE starten

Alle wichtigen Projektbefehle sind über npm scripts in der zentralen `package.json` verfügbar. Deshalb können sie nicht nur im Terminal, sondern auch direkt über das npm-Fenster in WebStorm oder IntelliJ IDEA ausgeführt werden.

Öffne das Fenster **npm** in der IDE, wähle die zentrale `package.json` aus und starte das gewünschte Script per Doppelklick. Die IDE führt denselben Befehl aus, der auch im Terminal verwendet werden kann.

Die wichtigsten Befehle:

| npm script | Zweck |
|---|---|
| `serve` | Entwicklungsanwendung starten |
| `build` | Anwendung bauen |
| `test` | Unit-Tests ausführen |
| `lint` | ESLint-Prüfungen ausführen |
| `e2e` | Alle E2E-Tests in allen konfigurierten Browsern ausführen |
| `e2e:chromium` | E2E-Tests ausschließlich in Chromium ausführen |
| `e2e:headed` | Browser im sichtbaren Modus starten |
| `e2e:ui` | Die interaktive Playwright-Oberfläche öffnen |
| `e2e:install` | Die von Playwright benötigten Browser installieren |

Vor dem ersten Start der E2E-Tests muss `e2e:install` ausgeführt werden. Unter Linux können zusätzliche Playwright-Systemabhängigkeiten erforderlich sein; in CI werden sie automatisch installiert.

Die E2E-Suite ist in zwei Szenariodateien aufgeteilt: `dashboard.spec.ts` prüft die Darstellung des Dashboards, den initialen Transaktionsbestand, das Erstellen einer Transaktion, die Formularvalidierung und die Wiederherstellung gespeicherter Daten nach einem vollständigen Neuladen der Seite. `auth.spec.ts` prüft Pflichtfelder, ungültige Werte, das Zurücksetzen des Formulars, die Navigation zum Dashboard nach einer lokal erfolgreichen Prüfung, die Speicherung ausschließlich des Benutzernamens und dessen Wiederherstellung im Login-Formular.

Die Playwright-Konfiguration startet die Angular-Anwendung für die Dauer der Tests selbstständig und beendet sie nach Abschluss. Es ist nicht erforderlich, vor den E2E-Tests separat `serve` auszuführen.

In der aktuellen Demo-Anwendung prüft das Login-Formular die eingegebenen Werte clientseitig und navigiert den Benutzer nach einer erfolgreichen lokalen Prüfung zum Dashboard. Ein angebundener Backend-Dienst zur Authentifizierung und Überprüfung der Zugangsdaten existiert derzeit noch nicht. Deshalb prüfen die E2E-Tests Formular, Validierung und Navigation, bestätigen aber keine echte Benutzerauthentifizierung.

### Benutzernamen im Login speichern

Der nächste kleine Schritt verbessert den Anmeldeablauf. Nach erfolgreicher lokaler Formularprüfung speichert die Anwendung den Benutzernamen, damit er beim nächsten Öffnen der Login-Seite nicht erneut eingegeben werden muss.

Für die Speicherung ist die bereits vorhandene Storage Facade zuständig. Die Auth Facade greift nicht direkt auf den Browser-Speicher zu: Sie erhält die Storage Facade über Angular Dependency Injection und delegiert das Speichern und Lesen des Benutzernamens an sie. Die Storage Facade verwendet ihrerseits den DAL, der die technische Arbeit mit dem Browser-Speicher kapselt.

Der Speicherschlüssel ist zentral in `CONSTANTS` definiert: `CONSTANTS.AUTH_LOGIN.storageKey`. Dadurch wird der Schlüsselname nicht in Auth Facade, Storage Facade oder Komponenten dupliziert.

Wenn der Benutzer nach erfolgreicher Prüfung der Login-Felder auf OK klickt, übergibt die Login-Seite den eingegebenen Benutzernamen an die Auth Facade. Diese speichert über die Storage Facade ausschließlich den Login. Das Passwort wird weder in `localStorage` noch in einem anderen dauerhaften Speicher der Anwendung abgelegt. Der Status der Demo-Anmeldesitzung wird weiterhin separat in `sessionStorage` gespeichert.

Bei der Erstellung der Login Component wird der Anfangswert des Feldes Login name über die Auth Facade bezogen. Wenn zuvor kein Wert gespeichert wurde, liefert die Facade eine leere Zeichenfolge zurück. Das Feld Password bleibt bei jedem Öffnen des Formulars leer.

Die Verantwortlichkeiten bleiben damit klar getrennt:

- Login Component ist für die Darstellung des Formulars, die Eingabe und die lokale Validierung zuständig.
- Auth Facade koordiniert den Authentifizierungsablauf und stellt den gespeicherten Benutzernamen bereit.
- Storage Facade stellt der Anwendung verständliche Operationen zum Lesen und Speichern des Logins zur Verfügung.
- DAL führt den direkten Zugriff auf `localStorage\ aus.
- `CONSTANTS` enthält den einheitlichen Speicherschlüssel.

Dies ist eine Komfortfunktion der Demo und kein Mechanismus zur sicheren Speicherung von Zugangsdaten. Ein gespeicherter Benutzername bestätigt nicht die Identität des Benutzers und ersetzt keine Backend-Authentifizierung.

Die E2E-Prüfungen bestätigen nun zusätzlich, dass nach einem erfolgreichen Klick auf OK ausschließlich der Benutzername in `localStorage` erscheint, das Passwort dort nicht gespeichert wird und nach Logout das Feld Login name mit dem gespeicherten Wert vorbelegt ist. Das Feld Password bleibt dabei leer.

### Entwicklungsbranch

Die aktuelle Fassung des Artikels befindet sich im Branch [Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking+1](https://github.com/iAVP/enterprise-frontend-workshop/tree/Angular-in-Depth-Part-2-Evolution-of-Angular-and-Architectural-Thinking+1) des Repositorys [enterprise-frontend-workshop](https://github.com/iAVP/enterprise-frontend-workshop).
