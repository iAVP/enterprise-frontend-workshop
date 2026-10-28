# Architektur in der Praxis: Entscheidungen für Enterprise-Frontend-Systeme

**Status:** Deutsche Übersetzung noch nicht erstellt.

Ausgangsartikel: [Architecture in Practice: Decisions Behind Enterprise Frontend Systems](https://enterprise-frontend-workshop.hashnode.dev/architecture-in-practice-decisions-behind-enterprise-frontend-systems).
# Architektur in der Praxis: Entscheidungen für Enterprise-Frontend-Systeme

*Dieser Artikel eröffnet den theoretischen Teil des Enterprise Frontend Workshop. Er beleuchtet reale Architekturentscheidungen und erklärt, warum unterschiedliche Projekte zu unterschiedlichen Lösungen gelangen. Im nächsten Schritt werden diese Überlegungen in die technische Organisation eines NX-Workspaces übertragen.*

## Inhalt

- [Architektur vor Technologie](#architektur-vor-technologie)
- [Wenn neue Funktionen die gewohnte Arbeitsweise nicht beeinträchtigen sollen](#wenn-neue-funktionen-die-gewohnte-arbeitsweise-nicht-beeinträchtigen-sollen)
- [Wenn sich ein Produkt mit mehreren Frontend-Frameworks weiterentwickelt](#wenn-sich-ein-produkt-mit-mehreren-frontend-frameworks-weiterentwickelt)
- [Wenn ein bequemer Konfigurationsmechanismus neu bewertet werden muss](#wenn-ein-bequemer-konfigurationsmechanismus-neu-bewertet-werden-muss)
- [Wenn verschiedene Technologien gemeinsam ein Problem lösen](#wenn-verschiedene-technologien-gemeinsam-ein-problem-lösen)
- [Warum Architektur bei der Weiterentwicklung des Produkts erhalten bleiben muss](#warum-architektur-bei-der-weiterentwicklung-des-produkts-erhalten-bleiben-muss)
- [Vom Architekturdenken zur Projektorganisation](#vom-architekturdenken-zur-projektorganisation)

## Architektur vor Technologie

Wenn ein neues Projekt beginnt, kann man sich leicht in der Auswahl der Technologien verlieren. Welches Frontend-Framework soll verwendet werden? Wie soll das Frontend mit dem Backend kommunizieren? Welche Projektstruktur ermöglicht komfortable Entwicklung und lässt die Anwendung zugleich wachsen? Sollte Wiederverwendung von Anfang an eingeplant werden, oder sollte sich das Team zunächst auf die Umsetzung der Anforderungen konzentrieren?

Diese Fragen tauchen meist nacheinander auf, während das Team versucht, einen Anfang zu finden. Technologieentscheidungen stehen jedoch selten für sich allein. Sie müssen bestehende Systeme, die Menschen, die auf sie angewiesen sind, und mögliche Veränderungen in einem oder mehreren Jahren berücksichtigen.

Am Anfang kann alles unkompliziert erscheinen. Die Anforderungen sind bekannt, der wichtigste Benutzerablauf ist klar, und Zeitplan sowie Einschränkungen sind verstanden. Das Team kann ein Framework auswählen, eine Anwendung erstellen und mit der Entwicklung beginnen. Enterprise-Produkte bleiben jedoch selten genau so, wie sie ursprünglich geplant wurden. Anforderungen entwickeln sich weiter, andere Teams kommen hinzu, neue Anwendungen entstehen, und die Art, wie Menschen mit dem Produkt arbeiten, verändert sich. Manchmal muss sich die neue Lösung in Systeme integrieren, die seit vielen Jahren existieren und weiterhin ihren Zweck erfüllen.

Irgendwann zeigt sich, dass die Aufgabe mehr umfasst als die Entwicklung einer neuen Anwendung. Sie muss sich in die bestehende Umgebung einfügen, funktionierende Abläufe bewahren, die Erfahrung des Teams berücksichtigen und Raum für die weitere Entwicklung lassen.

Dann wird deutlich, dass die Wahl einer Technologie nur einen Teil der Arbeit ausmacht. Ebenso wichtig ist die Entscheidung, was unverändert bleiben kann, was miteinander verbunden werden muss und welche Folgen die heutigen Entscheidungen für spätere Projektphasen haben könnten.

Architektur ist mehr als die Struktur des Quellcodes oder eine Methode, eine Anwendung in Module aufzuteilen. Sie bestimmt, wie Systemteile miteinander interagieren, welche Entscheidungen unabhängig voneinander geändert werden können, wo Verantwortlichkeiten beginnen und enden und wie aufwendig spätere Änderungen voraussichtlich sein werden.

Architektur existiert außerdem nicht losgelöst von der Organisation, der die Software dient. Dieselbe technische Lösung kann in einem Projekt gut und in einem anderen schlecht funktionieren. Viel hängt von den zu lösenden Problemen, den vorhandenen Systemen, der Erfahrung des Teams und den Folgen einer Änderung der ursprünglichen Annahmen ab.

Bevor wir konkrete Werkzeuge betrachten, lohnt es sich daher zu verstehen, woher Architekturentscheidungen kommen. Warum müssen wir manchmal Technologien kombinieren, die zunächst unvereinbar wirken? Warum kann ein Produkt mehrere Frontend-Frameworks enthalten? Warum muss eine zunächst praktische Entscheidung einige Jahre später möglicherweise grundlegend überdacht werden? Und warum ist die technisch einfachste Lösung für eine Organisation nicht immer die wirtschaftlichste?

Die Antworten findet man weniger in abstrakten Regeln als in Situationen, die beim Aufbau und bei der Wartung von Enterprise-Systemen tatsächlich auftreten.

## Wenn neue Funktionen die gewohnte Arbeitsweise nicht beeinträchtigen sollen

Betrachten wir eine typische Situation.

Eine Organisation verwendet seit Jahren SharePoint. Für ihre Beschäftigten ist es eine vertraute Arbeitsumgebung: Sie arbeiten mit Tabellen und Dokumenten, greifen auf Daten zu, erledigen Routineaufgaben und folgen etablierten Abläufen. Sie wissen, wo Informationen gespeichert sind und wie sie ihre Arbeit erledigen. Sie müssen sich nicht täglich mit den internen Details des Systems beschäftigen, sondern nutzen es einfach für ihre alltäglichen Aufgaben.

Irgendwann benötigt die Organisation eine mobile Anwendung für iOS und Android. Diese soll zusätzliche Funktionen bieten, mit Unternehmensdaten arbeiten und die erforderlichen Nutzungsszenarien unterstützen.

Die bestehenden Arbeitsabläufe der Beschäftigten sollen sich jedoch nicht ändern. Sie arbeiten weiterhin wie bisher in SharePoint. Nur weil andernorts eine neue Anwendung entwickelt wurde, sollen sie weder zu einem anderen System wechseln noch neu geschult werden oder ihre Routinen umstellen müssen. Die mobile App kann einen zusätzlichen Zugang zum Unternehmenssystem bieten, ohne die vertraute Umgebung derjenigen zu stören, die sie nicht benötigen.

Auf den ersten Blick mag das wie eine rein technische Aufgabe aussehen: eine Oberfläche entwickeln, Daten abrufen, die Verbindung zur Unternehmensinfrastruktur herstellen und Benachrichtigungen konfigurieren. Vor der Wahl der Technologien muss das Team jedoch entscheiden, wie neue Funktionen ergänzt werden können, ohne das zu beeinträchtigen, was bereits funktioniert.

Eine Alternative wäre, ein neues System aufzubauen, die Daten zu migrieren und die bestehenden Abläufe schrittweise zu ändern. Manchmal ist das notwendig. Wenn die alte Plattform die geschäftlichen Anforderungen nicht mehr erfüllt, kann ein Ersatz sinnvoll sein. Wenn die vorhandene Umgebung aber weiterhin ihren Zweck erfüllt, stellt sich die Frage: Muss sie wirklich ersetzt werden, nur um den Nutzenden zusätzliche Funktionen anzubieten?

Ein solcher Übergang würde mehr als Entwicklungsarbeit erfordern. Er brächte Datenmigration, Schulungen, Änderungen an Arbeitsabläufen und Zeit für die Umstellung der Beschäftigten mit sich. Die Organisation hat bereits in die aktuelle Infrastruktur investiert, und die Beschäftigten sind mit ihrer Funktionsweise vertraut.

In diesem Fall bestand das wichtigere Ziel nicht darin, die vertraute Umgebung zu ersetzen, sondern das bestehende System zu erweitern, damit die Menschen ohne unnötige Unterbrechungen weiterarbeiten konnten.

Die Umsetzung war keineswegs trivial. Die Lösung kombinierte SharePoint, Microsoft-Azure-Dienste, Azure WebJobs und Firebase. Jede Komponente hatte ihre eigene Aufgabe: Die bestehende Unternehmensumgebung blieb für die Arbeit mit Daten im Einsatz, Cloud-Mechanismen übernahmen notwendige Hintergrundprozesse und die Ereignisverarbeitung, und Firebase wurde zum Versand von Push-Benachrichtigungen an mobile Anwendungen verwendet.

So entstand ein System, das Technologien verschiedener Plattformen kombinierte. Betrachtet man es ausschließlich unter dem Gesichtspunkt technologischer Einheitlichkeit, könnte man fragen, warum nicht alles mit einem einzigen Stack und nach einem einheitlichen Muster entwickelt wurde.

Die Vielfalt war jedoch kein Selbstzweck. Sie spiegelte die tatsächlichen Rahmenbedingungen des Projekts wider. Die vorhandene Infrastruktur erfüllte bereits wichtige Aufgaben, die mobile Anwendung benötigte zusätzliche Funktionen, und die Nutzenden mussten ihre gewohnte Arbeitsweise nicht ändern.

Jede Komponente deckte einen konkreten Bedarf ab; die Architektur verband sie zu einer funktionierenden Gesamtlösung.

Das bedeutet nicht, dass die Kombination mehrerer Plattformen grundsätzlich besser ist als ein einzelnes System. Integration kostet Zeit, Fachwissen und laufende Wartung. Mitunter werden die Verbindungen zwischen Diensten so zahlreich, dass es wirtschaftlicher wird, einen Teil der Infrastruktur zu ersetzen. Eine solche Schlussfolgerung sollte jedoch aus der Bewertung der tatsächlichen Situation entstehen – nicht aus der Annahme, Einheitlichkeit sei an sich das wichtigste Merkmal guter Architektur.

In diesem Beispiel hatte der wirtschaftliche Nutzen mehrere Ursachen. Der Arbeitsalltag der Beschäftigten musste nicht unterbrochen werden, bereits durch die vorhandene Infrastruktur bereitgestellte Funktionen mussten nicht neu entwickelt werden, und es war nicht nötig, sämtliche Abläufe allein für die Einführung einer mobilen App auf ein neues System umzustellen. Die Entwicklung konnte sich auf die tatsächlich fehlenden Funktionen konzentrieren.

Die vertraute Umgebung beizubehalten, verringerte außerdem organisatorische Kosten, die mit Änderungen an Arbeitsabläufen verbunden sind. Selbst wenn ein neues System technisch bequemer ist, kann der Wechsel erheblichen Aufwand für Menschen bedeuten, die täglich auf Software angewiesen sind, um ihre Arbeit zu erledigen.

Die komplexe Umsetzung löste aus Sicht der Nutzenden daher ein relativ einfaches Problem: Das System erhielt neue Funktionen, während die tägliche Arbeit in der vertrauten Umgebung weiterlief.

Für die Beschäftigten wurde der Erfolg nicht an der Anzahl der Integrationen oder an der Besonderheit des Technologie-Stacks gemessen. Entscheidend war, dass ihre Arbeit nicht unterbrochen oder erschwert wurde, obwohl im Hintergrund neue Funktionen hinzugekommen waren.

Dieses Beispiel zeigt, warum sich eine Architekturentscheidung nicht allein anhand der Anzahl von Technologien, Komponenten oder Integrationen beurteilen lässt. Wir müssen verstehen, welche Aufgaben sie erfüllen, warum genau diese Interaktionsmuster gewählt wurden und was sich bei einer anderen Lösung ändern würde.

Manchmal wird Architektur durch die Reduzierung der Komponenten einfacher. In anderen Fällen ermöglichen mehrere Technologien, funktionierende Systeme zu erhalten und wesentlich kostspieligere Änderungen zu vermeiden.

Entscheidend ist, zu verstehen, warum eine bestimmte Option zur Organisation passt und welche Folgen sie nicht nur heute, sondern auch in Zukunft mit sich bringt.

