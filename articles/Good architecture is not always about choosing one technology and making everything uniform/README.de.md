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

## Wenn sich ein Produkt mit mehreren Frontend-Frameworks weiterentwickelt

Eine ähnliche Situation kann innerhalb des Frontend-Produkts selbst entstehen – auch dann, wenn es nicht um die Unternehmensinfrastruktur, sondern um Anwendungen verschiedener Teams geht.

Stellen wir uns ein großes System vor, dessen Hauptanwendung mit Angular entwickelt wurde. Sie existiert seit mehreren Jahren, umfasst zahlreiche Funktionen und Integrationen, und das Team kennt ihre Funktionsweise. Im Laufe der Zeit hat sich ein Entwicklungsmodell etabliert, nützliche Lösungen sind entstanden, und es haben sich Abhängigkeiten zu anderen Teilen des Produkts gebildet.

Dann wird ein neuer Funktionsbereich mit React umgesetzt. Einige Zeit später beginnt ein anderes Team, einen separaten Teil des Produkts mit Vue zu entwickeln. Parallel dazu wird eine mobile Anwendung benötigt, für die Ionic oder React Native in Betracht gezogen wird.

Das Produkt enthält nun verschiedene Frontend-Frameworks.

Warum kommt es dazu? Dafür gibt es viele mögliche Gründe. Anwendungen können zu unterschiedlichen Zeiten, von unterschiedlichen Teams und für verschiedene Nutzungsszenarien entwickelt worden sein. Die Teams verfügen möglicherweise über unterschiedliche Erfahrungen. Ein neuer Produktbereich kann aus einer bestehenden Anwendung hervorgegangen sein, die bereits einen bestimmten Technologie-Stack verwendet hat. Eine Organisation kann auch mehrere Produkte zusammenführen, die jeweils ihre eigene Geschichte und technische Rahmenbedingungen mitbringen.

Das bedeutet nicht automatisch, dass zu Beginn jemand einen Fehler gemacht hat. Technologische Vielfalt entsteht häufig durch geschäftliches Wachstum, veränderte Anforderungen und neue Bedürfnisse.

Wenn ein Produkt gerade erst entsteht, alle Anwendungen ähnliche Anforderungen haben und ein Team sie gemeinsam entwickelt, ist ein einziges Framework oft sinnvoll. UI-Komponenten lassen sich leichter wiederverwenden, die Zahl der Werkzeuge sinkt und der Einstieg neuer Entwickler wird einfacher. Gemeinsame Konventionen lassen sich ebenfalls leichter einhalten, wenn die Anwendungen ähnlichen Mustern folgen.

Nehmen wir jedoch an, die Anwendungen existieren bereits, werden aktiv genutzt und enthalten umfangreiche Funktionalität. Alles auf ein Framework umzustellen, ist dann keine Frage mehr, ein paar Abhängigkeiten zu ändern. Es wird zu einem Migrationsvorhaben, das erhebliche Ressourcen beanspruchen kann.

Wenn die Hauptanwendung auf Angular stabil ist und die geschäftlichen Anforderungen erfüllt, bedeutet eine Neuentwicklung mit React, Oberflächen neu aufzubauen, Geschäftsabläufe erneut zu testen, Integrationen zu erhalten und sicherzustellen, dass sich die neue Version wie die alte verhält. Selbst wenn die Entwicklung gut verläuft, investiert das Team Zeit in die Wiederherstellung bestehender Funktionen, statt neue Möglichkeiten bereitzustellen.

Hinzu kommen Aufwände für Tests, die Übergangsphase, Schulungen und die Behebung von Regressionen. Müssen alte und neue Version gleichzeitig unterstützt werden, steigen die Kosten weiter.

Bevor das Team eine Vereinheitlichung auf eine Technologie beschließt, sollte es deshalb fragen: Welches konkrete Problem soll diese Änderung lösen?

Wenn die Pflege mehrerer Frameworks die Produktentwicklung tatsächlich behindert, erhebliche Kosten verursacht oder die sinnvolle Wiederverwendung gemeinsamer Komponenten verhindert, kann der Wechsel auf eine Plattform gerechtfertigt sein. Erfüllen die Anwendungen jedoch weiterhin ihren Zweck und verursachen ihre Unterschiede keine kritischen Probleme, kann eine Neuentwicklung allein zugunsten der Einheitlichkeit unverhältnismäßig teuer sein.

Damit entsteht eine andere Aufgabe: Anwendungen mit unterschiedlichen Technologien müssen sich weiterentwickeln können, ohne dass das Produkt zu einer Sammlung unabhängiger Systeme wird, die dieselben Probleme auf unvereinbare Weise lösen.

Dazu müssen zwei Begriffe unterschieden werden: technologische Einheitlichkeit und architektonische Konsistenz.

Mehrere Anwendungen können unterschiedliche Frameworks nutzen und dennoch gemeinsamen Regeln für den Aufbau des Systems folgen. Sie können eigene Einstiegspunkte, Techniken für den Aufbau der Benutzeroberfläche und Build-Mechanismen haben und trotzdem ausgewählte Funktionalität gemeinsam nutzen.

So können verschiedene Anwendungen dieselben Datenmodelle verwenden, gemeinsame Verträge für die Kommunikation mit dem Backend teilen und identische Datenverarbeitungsalgorithmen ausführen. Wenn diese Teile nicht von einem bestimmten UI-Framework abhängen, lassen sie sich so organisieren, dass sie nicht für jede Anwendung separat implementiert werden müssen.

Das bedeutet nicht, dass ausnahmslos alles gemeinsam genutzt werden sollte. Eine Angular-Komponente wird nicht allein deshalb in React verwendbar, weil beide Anwendungen TypeScript einsetzen. Ein Dienst, der auf Angular-Mechanismen aufbaut, ist ebenfalls nicht automatisch frameworkunabhängig. Unterschiedliche Technologien besitzen eigene Modelle für die Komponenteninteraktion, die Zustandsverwaltung und den Aufbau der Benutzeroberfläche.

Gemeinsam genutzter Code sollte sich deshalb auf Teile beschränken, die tatsächlich dasselbe Problem lösen und unabhängig vom Framework einer bestimmten Anwendung bestehen können. UI-spezifischer Code und technologieabhängige Mechanismen können in ihren jeweiligen Frameworks verbleiben.

So lassen sich bestehende Anwendungen erhalten, die Erfahrung der Teams nutzen und das Produkt gemeinsam weiterentwickeln.

Technologische Vielfalt ist dann nicht mehr automatisch ein Zeichen von Chaos. Sie wird zu einer Systemeigenschaft, die sich beherrschen lässt, wenn Verantwortlichkeiten und Regeln für die Zusammenarbeit ausdrücklich festgelegt sind.

Mehrere Frameworks verursachen selbstverständlich auch Kosten. Teams müssen verschiedene Werkzeuge pflegen, Unterschiede zwischen Technologieumgebungen berücksichtigen und manchmal separate Varianten von UI-Komponenten entwickeln. Es geht nicht darum, Wahlfreiheit um ihrer selbst willen zu erhalten, sondern zu verstehen, wann sie echten Nutzen stiftet.

Architektur bedeutet nicht, jede Technologie ohne Einschränkungen zuzulassen. Sie hilft zu bestimmen, wo Unterschiede gerechtfertigt sind, wo ein gemeinsamer Ansatz erforderlich ist und welche Entscheidungen die Weiterentwicklung des Produkts ermöglichen, ohne ständig funktionierende Anwendungen umbauen zu müssen.

## Wenn ein bequemer Konfigurationsmechanismus neu bewertet werden muss

Ein weiteres Beispiel betrifft die Anwendungskonfiguration. Es zeigt, wie eine Architekturentscheidung bei ihrer Einführung sinnvoll sein kann, später aber neu bewertet werden muss, wenn sich das Projekt verändert und der Mechanismus anders verwendet wird, als ursprünglich vorgesehen.

Im Jahr 2017 begann ein langfristiges Projekt auf Basis von Angular 2. Bestimmte Einstellungen sollten geändert werden können, ohne die Anwendung neu zu kompilieren. Dafür wurde eine externe JSON-Konfigurationsdatei eingeführt, die auf einem Webserver gehostet wurde.

Für die ursprüngliche Anforderung war das praktisch. Wenn ein öffentlicher Parameter geändert werden muss, ist es nicht immer sinnvoll, die gesamte Anwendung neu zu bauen und zu veröffentlichen. Eine externe Konfiguration trennt ausgewählte Einstellungen vom Hauptcode und ermöglicht es, sie unabhängig von einem Release zu ändern.

Es war ursprünglich nicht vorgesehen, sensible Daten in dieser Konfiguration abzulegen. Der Mechanismus sollte eine klar definierte Gruppe von Einstellungen verwalten und ein konkretes Problem lösen.

Das Projekt entwickelte sich jedoch weiter. Anforderungen änderten sich, Entwickler wechselten zwischen Aufgaben, und bestehende Lösungen blieben im Einsatz. Nach und nach wurde die JSON-Konfiguration umfassender genutzt als beabsichtigt, und sensible Daten tauchten darin auf.

Ein praktischer Mechanismus wurde also für einen Zweck verwendet, für den er nicht vorgesehen war.

Das Problem bestand nicht darin, dass JSON grundsätzlich ein schlechtes Konfigurationsformat wäre. Das Problem war, dass Informationen, die für Benutzer einer Client-Anwendung nicht zugänglich sein sollten, in einer öffentlich erreichbaren Datei abgelegt wurden.

Nachdem dies erkannt worden war, musste die unsichere Praxis beendet und der Konfigurationsansatz geändert werden. Diese Verwendung des Mechanismus wurde untersagt, und trotz der dadurch entstehenden Konflikte musste eine andere Organisation der Konfiguration eingeführt werden.

Die grundsätzliche Idee einer gemeinsamen Konfiguration blieb sinnvoll. Gemeinsame Parameter mussten weiterhin an einer zentralen Stelle definiert und für bestimmte Umgebungen überschrieben werden können. Geändert wurden nicht das Prinzip der zentralen Konfigurationsverwaltung, sondern ihre Umsetzung und die Grenzen ihrer zulässigen Verwendung.

Daraus sollte man nicht schließen, dass TypeScript automatisch Sicherheit bietet. Enthält ein clientseitiges Bundle sensible Daten, werden diese nicht dadurch geschützt, dass sie in TypeScript geschrieben, minimiert oder verschleiert wurden. Geheimnisse müssen auf einer geschützten Seite gespeichert und verwendet werden; die Client-Anwendung darf nur Werte erhalten, deren Offenlegung gegenüber ihren Nutzern unbedenklich ist.

Warum ist dieses Beispiel aus architektonischer Sicht wichtig?

Es zeigt den Unterschied zwischen der ursprünglichen Absicht und dem tatsächlichen Lebenszyklus einer Lösung in einem langfristigen Projekt. Bei ihrer Einführung erfüllte der Mechanismus die Anforderung. Später wurde er anders verwendet, wodurch sich auch die Bewertung seiner Zulässigkeit änderte.

In der Enterprise-Entwicklung kann man nicht davon ausgehen, dass jede Entscheidung ausschließlich unter den Bedingungen genutzt wird, die bei ihrer Einführung bestanden. Ein Projekt kann sich über Jahre weiterentwickeln. Menschen, Anforderungen und Nutzungsmuster des Codes verändern sich. Deshalb reicht es nicht, einen bequemen Mechanismus zu schaffen; es müssen auch die Grenzen definiert werden, innerhalb derer seine Verwendung akzeptabel bleibt.

Manchmal lassen sich diese Grenzen durch Dokumentation und Vereinbarungen im Team festlegen. In anderen Fällen muss der Ansatz selbst geändert werden, damit unerwünschte Nutzung unwahrscheinlicher wird. Und wenn Sicherheit betroffen ist, reichen Bequemlichkeit und Vertrautheit nicht aus, um eine unsichere Lösung beizubehalten.

Dieses Beispiel zeigt außerdem, dass architektonische Verantwortung nicht bei der technischen Umsetzung endet. Manchmal erfordert sie organisatorische Entscheidungen, die Erklärung ihrer Notwendigkeit und eine Änderung etablierter Praktiken.

Architektur bedeutet in diesem Sinne nicht, den ursprünglichen Entwurf um jeden Preis zu bewahren. Sie bedeutet, Entscheidungen bei veränderten Rahmenbedingungen erneut zu prüfen und das System an den aktuellen Anforderungen auszurichten.

## Wenn verschiedene Technologien gemeinsam ein Problem lösen

Die bisherigen Situationen zeigen, dass Architekturentscheidungen aus unterschiedlichen Gründen entstehen können. Manchmal muss eine vertraute Arbeitsumgebung erhalten bleiben. Manchmal müssen mehrere Anwendungen mit verschiedenen Frontend-Frameworks weiterentwickelt werden. Manchmal muss ein bequemer Mechanismus überdacht werden, weil sich die Sicherheitsanforderungen verändert haben.

Eine allgemeinere Frage bleibt: Wie beurteilen wir Lösungen, die technisch zunächst komplex oder uneinheitlich wirken?

Stellen wir uns vor, eine Möglichkeit besteht darin, das System auf einer einzigen Plattform aufzubauen. Dafür müssten jedoch bestehende Komponenten ersetzt, zusätzliche Spezialisten eingestellt und etablierte Abläufe verändert werden. Eine andere Möglichkeit kombiniert mehrere Technologien, von denen jede eine bestimmte Aufgabe erfüllt; dafür muss das Team ihre Zusammenarbeit beherrschen.

Welche Option ist besser?

Ohne den Kontext lässt sich diese Frage nicht beantworten. Wenn mehrere Technologien komplexe Abhängigkeiten erzeugen, seltenes Fachwissen erfordern und die Wartungskosten erhöhen, kann eine einzige Plattform vorzuziehen sein. Funktionieren bestehende Systeme jedoch weiterhin und wäre eine Migration teuer, ohne den Nutzenden wesentliche Vorteile zu bringen, kann es sinnvoller sein, die aktuelle Lösung beizubehalten.

Dasselbe gilt für die Wahl von Frontend-Frameworks. Ein einziges Framework kann Entwicklung und Wartung vereinfachen. Mehrere große Anwendungen allein aus Gründen der Einheitlichkeit neu zu schreiben, kann jedoch Ressourcen verbrauchen, die besser in die Verbesserung der Funktionalität investiert wären.

Die wirtschaftlichen Auswirkungen einer Architekturentscheidung setzen sich aus vielen Faktoren zusammen. Dazu gehören nicht nur die Implementierungszeit, sondern auch Wartung, Schulung der Mitarbeitenden, Nutzung der vorhandenen Infrastruktur, Änderungsrisiken und Auswirkungen auf den Arbeitsalltag der Nutzenden.

Architektur ist daher enger mit Wirtschaftlichkeit verbunden, als es zunächst erscheinen mag. Sie bestimmt nicht nur, wie Software aufgebaut ist, sondern auch, wie viel Aufwand eine Organisation im Laufe der Zeit in ihre Weiterentwicklung investieren muss.

Es gibt keine allgemeingültige Regel, die im Voraus für jede Situation die richtige Option bestimmt. Die Entscheidung hängt von den Anforderungen, den Einschränkungen und den Folgen der jeweiligen Alternativen ab.

Manchmal ist eine technisch komplexere Lösung wirtschaftlich vorteilhaft, weil sie funktionierende Infrastruktur erhält. Manchmal senkt Standardisierung tatsächlich die Kosten. Manchmal sollte gemeinsame Funktionalität extrahiert werden; in anderen Fällen sind zwei unabhängige Implementierungen einfacher.

In der Praxis ist es hilfreicher, konkrete Alternativen zu vergleichen, statt nach einem scheinbar perfekten Diagramm zu suchen: Was muss geändert werden, was kann bleiben, wer wird die Lösung warten, und welchen Preis zahlt die Organisation für jeden Weg?

## Warum Architektur bei der Weiterentwicklung des Produkts erhalten bleiben muss

Auch gut durchdachte Anfangsentscheidungen garantieren nicht, dass ein System beim Wachstum seine ursprüngliche Struktur beibehält.

Entwicklung besteht aus vielen kleinen Änderungen. Für jede Aufgabe muss innerhalb der verfügbaren Zeit eine passende Lösung gefunden werden. Manchmal ist es für einen Entwickler einfacher, direkt ein benachbartes Modul zu verwenden, als eine geeignete gemeinsame Bibliothek zu finden oder zu erstellen. Manchmal erscheint es schneller, einen kleinen Teil des Codes zu duplizieren, als die vorhandene Struktur zu ändern.

Eine einzelne Abkürzung kann gerechtfertigt sein. Häufen sich solche Abkürzungen jedoch an, verschwimmen die Grenzen zwischen den Systemteilen. Bibliotheken erhalten Abhängigkeiten zu Anwendungen, gemeinsame Logik vermischt sich mit framework-spezifischem Code, und eine Änderung an einer Stelle wirkt sich unerwartet auf eine andere aus.

Das System wird nicht unbedingt deshalb schwieriger, weil es mehr Code enthält, sondern weil Entwickler die Folgen einer Änderung schwerer einschätzen können.

Architekturvereinbarungen müssen deshalb nicht nur dokumentiert, sondern auch während der Entwicklung eingehalten werden. Das Team sollte verstehen, warum bestimmte Grenzen existieren, welche Abhängigkeiten erlaubt sind und wann bestehende Entscheidungen erneut geprüft werden müssen.

Ein Teil dieser Arbeit geschieht in Architekturdiskussionen, durch die Einbindung erfahrener Entwickler und im Code Review. Andere Regeln lassen sich so automatisieren, dass unerwünschte Abhängigkeiten erkannt werden.

Das ist besonders bei großen Produkten mit mehreren Anwendungen und vielen gleichzeitig weiterentwickelten Bibliotheken wichtig. Ohne klare Regeln kann eine gemeinsame Codebasis nach und nach zu einer Sammlung von Projekten werden, die zwar nebeneinander liegen, aber auf willkürliche Weise miteinander verbunden sind.

Automatisierte Prüfungen ersetzen kein Architekturdenken. Sie können nicht selbst entscheiden, welche fachlichen Fähigkeiten zusammengehören, ob ein einziges Framework verwendet werden sollte oder wo die Grenze zwischen zwei Verantwortlichkeiten liegt. Sie können aber bereits getroffene Entscheidungen bewahren helfen und einige Verstöße erkennen, bevor diese Teil der Haupt-Codebasis werden.

Architektur ist daher nicht nur ein einmaliger Entwurf. Sie umfasst auch die Fähigkeit, ein kohärentes System während seiner Weiterentwicklung zu erhalten, überholte Entscheidungen rechtzeitig zu überprüfen und das Produkt beherrschbar zu halten.

## Vom Architekturdenken zur Projektorganisation

Alle Beispiele folgen einem gemeinsamen Muster: Architekturentscheidungen entstehen aus dem Bedürfnis, unterschiedliche Aspekte eines Produkts miteinander in Einklang zu bringen.

In einem Fall muss mobile Funktionalität ergänzt werden, während die vertraute Arbeitsumgebung der Beschäftigten und die vorhandene Infrastruktur erhalten bleiben. In einem anderen müssen mehrere Frontend-Anwendungen mit unterschiedlichen Frameworks weiterentwickelt werden, ohne ein funktionierendes Produkt allein zugunsten der Einheitlichkeit neu zu schreiben. In einem dritten muss ein bequemer Konfigurationsmechanismus neu bewertet werden, nachdem sich seine Verwendung verändert hat und ein Sicherheitsproblem entstanden ist.

Jeder Fall erfordert Aufmerksamkeit nicht nur für den Code, sondern auch für die Nutzenden, bestehende Systeme, die Erfahrung des Teams, die Kosten von Änderungen und die Zukunft des Produkts.

Deshalb beginnt Architektur mit dem Verständnis des Problems und seiner Rahmenbedingungen, nicht mit der Auswahl eines Werkzeugs. Zunächst müssen wir feststellen, welche Systemteile miteinander interagieren müssen, welche Entscheidungen sich unabhängig weiterentwickeln können und welche Abhängigkeiten später Probleme verursachen könnten. Erst danach ergibt es Sinn, festzulegen, wie der Code organisiert sein und wie die Anwendungen miteinander kommunizieren sollen.

Mit dem Wachstum eines Produkts wird dieser Ansatz besonders wichtig. Wenn mehrere Anwendungen, gemeinsame Bibliotheken und unterschiedliche Technologieumgebungen nebeneinander bestehen, reicht es nicht mehr aus, die Struktur jedes Projekts einzeln festzulegen. Das Team braucht ein gemeinsames Bild des Systems und muss sicherstellen, dass lokale Änderungen dessen Architekturgrenzen nicht untergraben.

Hier werden Werkzeuge nützlich, die mehrere Anwendungen und Bibliotheken innerhalb eines gemeinsamen Entwicklungs-Workspaces organisieren. Sie helfen, Beziehungen zwischen Projekten zu verwalten und festgelegte Regeln einzuhalten.

Die Werkzeuge treffen jedoch keine Architekturentscheidungen für das Team. Sie wissen nicht, warum die Kombination von Frameworks in einem Produkt gerechtfertigt ist, warum ein bestehendes System erhalten bleiben sollte oder welche Konfigurationswerte gemeinsam genutzt werden müssen. Diese Entscheidungen beruhen auf dem Verständnis des tatsächlichen Problems und der Folgen der verfügbaren Alternativen.

Bevor wir uns konkreten Werkzeugen und Projektstrukturen zuwenden, ist es daher wichtig, die Überlegungen hinter Architekturentscheidungen zu verstehen: Welche Probleme wollen wir lösen, warum eignen sich manche Ansätze besser als andere, und welche Prinzipien sollten unabhängig von den verwendeten Technologien gültig bleiben?

Ziel von Architektur ist nicht, jeden Teil eines Systems identisch zu machen. Es geht darum zu verstehen, warum die Teile so aufgebaut sind, welche Unterschiede gerechtfertigt sind und was vor unbeabsichtigten Änderungen geschützt werden muss, während das Produkt weiter wächst.

Erst dann ist es sinnvoll zu untersuchen, wie sich diese Entscheidungen in der Projektstruktur ausdrücken und über den gesamten Lebenszyklus des Produkts hinweg erhalten lassen.

