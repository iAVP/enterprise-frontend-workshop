# Architektur in der Praxis: Entscheidungen, die Enterprise-Frontend-Systeme prägen

Dieser Artikel eröffnet den theoretischen Teil der Reihe Enterprise Frontend Workshop. Er behandelt reale architektonische Zielkonflikte und erklärt, warum unterschiedliche Projekte zu unterschiedlichen Lösungen kommen. Im nächsten Schritt werden diese Überlegungen technisch in einem NX-Workspace umgesetzt.

## Architektur vor Technologie

Zu Beginn eines neuen Projekts ist es leicht, sich in der Auswahl von Technologien zu verlieren. Welches Frontend-Framework soll verwendet werden? Wie soll das Frontend mit dem Backend kommunizieren? Welche Projektstruktur unterstützt die Entwicklung und lässt die Anwendung zugleich wachsen? Sollte Wiederverwendbarkeit von Anfang an berücksichtigt werden, oder sollte sich das Team zunächst auf die Umsetzung der Anforderungen konzentrieren?

Diese Fragen tauchen meist nacheinander auf, während das Team versucht, den richtigen Einstieg zu finden. Eine Technologieentscheidung steht jedoch selten für sich allein. Sie muss bestehende Systeme, die Menschen, die auf sie angewiesen sind, und mögliche Veränderungen in einem oder mehreren Jahren berücksichtigen.

Am Anfang scheint vieles überschaubar. Die Anforderungen sind bekannt, der wichtigste Nutzungspfad ist klar, Zeitplan und Einschränkungen sind definiert. Das Team kann ein Framework auswählen, eine Anwendung erstellen und mit der Entwicklung beginnen. Unternehmenssoftware bleibt jedoch selten genau so, wie sie ursprünglich geplant war. Anforderungen ändern sich, weitere Teams kommen hinzu, zusätzliche Anwendungen entstehen und die Interaktion mit den Nutzern entwickelt sich weiter. Manchmal muss eine neue Lösung mit Systemen integriert werden, die seit vielen Jahren existieren und ihre Aufgaben weiterhin erfüllen.

Irgendwann zeigt sich, dass es nicht nur darum geht, eine neue Anwendung zu entwickeln. Sie muss sich in eine bestehende Umgebung einfügen, funktionierende Abläufe erhalten, die Erfahrung des Teams berücksichtigen und zugleich Raum für die weitere Entwicklung lassen.

Dann wird deutlich, dass die Wahl der Technologie nur ein Teil der Arbeit ist. Ebenso wichtig ist es zu entscheiden, was unverändert bleiben kann, was miteinander verbunden werden muss und welche Folgen die heutigen Entscheidungen für spätere Projektphasen haben können.

Architektur ist mehr als die Struktur des Quellcodes oder eine Methode, eine Anwendung in Module aufzuteilen. Sie legt fest, wie Systemteile zusammenarbeiten, welche Entscheidungen unabhängig voneinander geändert werden können, wo Verantwortlichkeiten beginnen und enden und wie teuer spätere Änderungen voraussichtlich werden.

Architektur existiert auch nicht unabhängig von der Organisation, für die Software entwickelt wird. Dieselbe technische Lösung kann in einem Projekt erfolgreich und in einem anderen ungeeignet sein. Viel hängt davon ab, welche Aufgaben zu lösen sind, welche Systeme bereits existieren, welche Erfahrung das Team mitbringt und was passiert, wenn sich die ursprünglichen Annahmen ändern.

Bevor konkrete Werkzeuge diskutiert werden, lohnt es sich deshalb, die Entstehung architektonischer Entscheidungen zu verstehen. Warum müssen manchmal Technologien kombiniert werden, die auf den ersten Blick schlecht zusammenpassen? Warum kann ein Produkt mehrere Frontend-Frameworks enthalten? Warum muss eine anfangs praktische Entscheidung nach einigen Jahren möglicherweise grundlegend überdacht werden? Und warum ist die technisch einfachste Lösung nicht immer die wirtschaftlichste?

Die Antworten finden sich weniger in abstrakten Regeln als in Situationen, die bei der Entwicklung und Weiterentwicklung von Unternehmenssystemen tatsächlich auftreten.

## Wenn neue Funktionen die gewohnten Arbeitsabläufe nicht stören dürfen

Betrachten wir eine typische Situation.

Eine Organisation nutzt seit Jahren SharePoint. Für ihre Beschäftigten ist es eine vertraute Arbeitsumgebung: Sie arbeiten mit Tabellen und Dokumenten, greifen auf Daten zu, führen ihre Aufgaben aus und folgen etablierten Abläufen. Sie wissen, wo Informationen liegen und wie sie ihre Arbeit erledigen. Sie müssen sich nicht täglich mit dem Innenleben des Systems beschäftigen, sondern nutzen es für ihre alltäglichen Aufgaben.

Irgendwann wird eine mobile Anwendung für iOS und Android benötigt. Sie soll zusätzliche Funktionen bereitstellen, mit Unternehmensdaten arbeiten und die erforderlichen Nutzungsszenarien unterstützen.

Die bisherigen Arbeitsabläufe sollen sich dabei nicht ändern. Die Beschäftigten arbeiten weiterhin wie gewohnt in SharePoint. Sie sollen nicht zu einem anderen System wechseln, neu geschult werden oder ihre Routinen umstellen müssen, nur weil an anderer Stelle eine neue Anwendung entsteht. Die mobile App kann einen zusätzlichen Zugang zum Unternehmenssystem bieten, ohne die vertraute Arbeitsumgebung derjenigen zu beeinträchtigen, die sie nicht benötigen.

Auf den ersten Blick wirkt das wie eine rein technische Aufgabe: eine Oberfläche erstellen, Daten abrufen, die Verbindung zur Unternehmensinfrastruktur herstellen und Benachrichtigungen konfigurieren. Doch bevor konkrete Technologien ausgewählt werden, muss geklärt werden, wie sich neue Funktionen ergänzen lassen, ohne das Bestehende zu stören.

Eine Alternative wäre, ein neues System zu entwickeln, die Daten dorthin zu migrieren und die bisherigen Abläufe schrittweise umzustellen. In manchen Fällen ist das tatsächlich notwendig. Wenn die alte Plattform die geschäftlichen Anforderungen nicht mehr erfüllt, kann ein Ersatz sinnvoll sein. Wenn die bestehende Umgebung ihre Aufgabe jedoch weiterhin erfüllt, stellt sich eine berechtigte Frage: Muss sie wirklich ersetzt werden, nur um zusätzliche Funktionen bereitzustellen?

Ein solcher Wechsel würde mehr als Entwicklungsarbeit erfordern. Daten müssten migriert, Beschäftigte geschult, Arbeitsabläufe verändert und Zeit für die Umstellung eingeplant werden. Die Organisation hat bereits in die bestehende Infrastruktur investiert, und die Menschen sind an deren Funktionsweise gewöhnt.

In diesem Fall bestand das wichtigere Ziel nicht darin, die vertraute Umgebung zu ersetzen, sondern das bestehende System zu erweitern, damit die Beschäftigten ohne unnötige Unterbrechungen weiterarbeiten können.

Die technische Umsetzung war keineswegs trivial. Die Lösung kombinierte SharePoint, Dienste von Microsoft Azure, Azure WebJobs und Firebase. Die Komponenten hatten unterschiedliche Aufgaben: Die bestehende Unternehmensumgebung blieb für die Arbeit mit Daten im Einsatz, Cloud-Mechanismen übernahmen erforderliche Hintergrundprozesse und Ereignisverarbeitung, und Firebase wurde für Push-Benachrichtigungen an mobile Anwendungen verwendet.

So entstand ein System, das Technologien verschiedener Plattformen miteinander verband. Betrachtet man es ausschließlich unter dem Gesichtspunkt technischer Einheitlichkeit, könnte man fragen, warum nicht ein einziger Stack und ein einheitliches Muster verwendet wurden.

Die Vielfalt war hier jedoch kein Selbstzweck. Sie ergab sich aus den tatsächlichen Rahmenbedingungen des Projekts. Die vorhandene Infrastruktur erfüllte bereits ihre Aufgaben, die mobile Anwendung benötigte zusätzliche Funktionen, und die Nutzer sollten ihre gewohnte Arbeitsweise nicht ändern müssen.

Jede Komponente löste eine bestimmte Aufgabe; die Architektur verband sie zu einer funktionierenden Gesamtlösung.

Das bedeutet nicht, dass die Kombination mehrerer Plattformen immer besser ist als ein einzelnes System. Integration kostet Zeit, erfordert Erfahrung und muss dauerhaft gewartet werden. Mitunter werden die Verbindungen zwischen Diensten so komplex, dass der Ersatz eines Teils der Infrastruktur wirtschaftlicher wird. Eine solche Schlussfolgerung sollte jedoch aus der Bewertung der konkreten Situation entstehen und nicht aus der Annahme, Einheitlichkeit sei automatisch das wichtigste Merkmal guter Architektur.

Der wirtschaftliche Nutzen ergab sich in diesem Beispiel aus mehreren Faktoren. Die alltägliche Arbeit der Beschäftigten musste nicht umgestellt werden. Bereits vorhandene Funktionen mussten nicht neu entwickelt werden, und es war nicht nötig, sämtliche Abläufe nur wegen der mobilen Anwendung in ein neues System zu verlagern. Die Entwicklung konnte sich auf die tatsächlich fehlenden Möglichkeiten konzentrieren.

Auch die organisatorischen Kosten veränderter Arbeitsabläufe wurden reduziert. Selbst wenn ein neues System technisch bequemer ist, kann der Wechsel für Menschen, die täglich mit Software arbeiten, erheblichen Aufwand verursachen.

Die komplexe technische Umsetzung löste damit aus Sicht der Nutzer ein relativ einfaches Problem: Das System erhielt neue Funktionen, während die gewohnte Arbeit unverändert weiterlief.

Für die Beschäftigten wurde der Erfolg nicht an der Anzahl der Integrationen oder an der Ungewöhnlichkeit des Technologie-Stacks gemessen. Entscheidend war, dass ihre Arbeit weder unterbrochen noch schwieriger wurde, obwohl im Hintergrund neue Funktionen hinzugekommen waren.

Das Beispiel zeigt, warum sich eine Architekturentscheidung nicht allein anhand der Anzahl von Technologien, Komponenten oder Integrationen bewerten lässt. Entscheidend ist, welche Aufgabe sie erfüllen, warum bestimmte Interaktionsmuster gewählt wurden und was sich bei einem anderen Ansatz ändern würde.

Manchmal wird Architektur durch weniger Komponenten einfacher. In anderen Fällen ermöglichen mehrere Technologien, funktionierende Systeme zu erhalten und wesentlich teurere Änderungen zu vermeiden.

Wichtig ist zu verstehen, warum eine bestimmte Lösung zur Organisation passt und welche Folgen sie nicht nur heute, sondern auch in Zukunft hat.

## Wenn sich ein Produkt mit mehreren Frontend-Frameworks weiterentwickelt

Eine ähnliche Situation kann innerhalb des Frontend-Produkts entstehen, auch wenn es nicht um Unternehmensinfrastruktur, sondern um Anwendungen geht, die von verschiedenen Teams entwickelt werden.

Stellen wir uns ein großes System vor, dessen Hauptanwendung mit Angular erstellt wurde. Sie existiert seit mehreren Jahren, enthält viele Funktionen und Integrationen, und das Team kennt ihren Aufbau gut. Im Laufe der Zeit hat sich ein Entwicklungsmodell etabliert, nützliche Lösungen haben sich bewährt und Abhängigkeiten zu anderen Produktteilen sind entstanden.

Später wird ein neuer Funktionsbereich mit React entwickelt. Einige Zeit danach beginnt ein anderes Team, einen separaten Produktteil mit Vue umzusetzen. Gleichzeitig wird eine mobile Anwendung benötigt, für die Ionic oder React Native in Betracht gezogen wird.

Damit enthält ein Produkt mehrere Frontend-Frameworks.

Dafür gibt es verschiedene Gründe. Anwendungen können zu unterschiedlichen Zeiten, von unterschiedlichen Teams und für verschiedene Nutzungsszenarien entwickelt worden sein. Die Teams bringen möglicherweise unterschiedliche Erfahrung mit. Ein neuer Produktbereich kann aus einer bestehenden Anwendung hervorgegangen sein, die bereits einen bestimmten Technologie-Stack nutzte. Ebenso kann eine Organisation mehrere Produkte zusammenführen, von denen jedes seine eigene Geschichte und technische Einschränkungen mitbringt.

Eine solche Situation bedeutet nicht automatisch, dass zu Beginn jemand eine falsche Entscheidung getroffen hat. Technologische Vielfalt entsteht häufig durch Unternehmenswachstum, veränderte Anforderungen und neue Aufgaben.

Beginnt ein Produkt gerade erst, haben alle Anwendungen ähnliche Anforderungen und entwickelt ein einziges Team sie gemeinsam, ist ein einheitliches Framework oft eine sinnvolle Wahl. UI-Komponenten lassen sich leichter wiederverwenden, die Zahl der Werkzeuge sinkt und neue Entwickler können einfacher eingearbeitet werden. Auch gemeinsame Konventionen lassen sich leichter pflegen, wenn Anwendungen ähnlich aufgebaut sind.

Doch nehmen wir an, dass die Anwendungen bereits existieren, aktiv genutzt werden und einen erheblichen Funktionsumfang besitzen. Alles auf ein Framework umzustellen bedeutet dann weit mehr, als einige Abhängigkeiten auszutauschen. Es wird zu einem Migrationsvorhaben, das erhebliche Ressourcen beanspruchen kann.

Wenn die zentrale Angular-Anwendung stabil ist und die geschäftlichen Anforderungen erfüllt, würde eine Neuentwicklung mit React bedeuten, Oberflächen erneut zu implementieren, Geschäftsabläufe zu testen, Integrationen zu erhalten und sicherzustellen, dass sich die neue Version wie die bisherige verhält. Selbst wenn die Entwicklung gut verläuft, investiert das Team seine Zeit in die Wiederherstellung vorhandener Funktionen statt in neue Möglichkeiten.

Hinzu kommen Kosten für Tests, die Übergangsphase, die Schulung von Fachleuten und die Behebung von Regressionen. Müssen alte und neue Version parallel betrieben werden, steigen die Kosten weiter.

Bevor eine Vereinheitlichung beschlossen wird, sollte das Team daher fragen: Welches konkrete Problem soll sie lösen?

Wenn mehrere Frameworks die Produktentwicklung tatsächlich behindern, erhebliche Kosten verursachen oder die gemeinsame Nutzung von Komponenten verhindern, kann ein Wechsel auf eine Plattform sinnvoll sein. Wenn die Anwendungen ihre Aufgaben jedoch weiterhin erfüllen und ihre Unterschiede keine kritischen Probleme verursachen, kann eine Neuentwicklung allein aus Gründen der Einheitlichkeit unverhältnismäßig teuer sein.

Dann entsteht eine andere Aufgabe: Die Anwendungen sollen sich mit unterschiedlichen Technologien weiterentwickeln können, ohne dass das Produkt zu einer Sammlung unabhängiger Systeme wird, die dieselben Probleme auf inkompatible Weise lösen.

Dazu müssen zwei Begriffe unterschieden werden: technologische Einheitlichkeit und architektonische Konsistenz.

Mehrere Anwendungen können unterschiedliche Frameworks verwenden und trotzdem gemeinsame Regeln für den Systemaufbau befolgen. Sie können eigene Einstiegspunkte, Methoden zur Oberflächenerstellung und Build-Prozesse haben und dennoch ausgewählte Funktionalität gemeinsam nutzen.

Beispielsweise können verschiedene Anwendungen dieselben Datenmodelle verwenden, gemeinsame Verträge für die Backend-Kommunikation nutzen und identische Algorithmen zur Datenverarbeitung ausführen. Wenn diese Teile nicht von einem bestimmten UI-Framework abhängen, lassen sie sich so organisieren, dass sie nicht für jede Anwendung neu implementiert werden müssen.

Dabei sollte nicht versucht werden, ausnahmslos alles gemeinsam zu nutzen. Eine Angular-Komponente wird nicht allein deshalb in React verwendbar, weil beide Anwendungen TypeScript einsetzen. Auch ein auf Angular-Mechanismen basierender Service ist nicht automatisch frameworkunabhängig. Unterschiedliche Technologien besitzen eigene Modelle für Komponenteninteraktion, Zustandsverwaltung und Oberflächenaufbau.

Gemeinsam genutzt werden sollten daher nur jene Teile, die tatsächlich dieselbe Aufgabe lösen und unabhängig vom jeweiligen UI-Framework bestehen können. Oberflächenspezifischer Code und technologieabhängige Mechanismen können dagegen im jeweiligen Framework verbleiben.

So lassen sich bestehende Anwendungen erhalten, die Erfahrung der Teams nutzen und das Produkt dennoch gemeinsam weiterentwickeln.

Technologische Vielfalt ist dann nicht automatisch ein Zeichen von Chaos. Sie wird zu einer Eigenschaft des Systems, die sich steuern lässt, wenn Verantwortlichkeiten und Regeln für die Zusammenarbeit klar definiert sind.

Natürlich verursacht der Einsatz mehrerer Frameworks zusätzliche Kosten. Teams müssen unterschiedliche Werkzeuge pflegen, die Eigenheiten verschiedener Technologieumgebungen berücksichtigen und teilweise separate UI-Komponenten implementieren. Es geht deshalb nicht darum, Wahlfreiheit um jeden Preis zu bewahren, sondern zu verstehen, wann sie einen tatsächlichen Nutzen bringt.

Architektur bedeutet nicht, jede Technologie ohne Einschränkungen zuzulassen. Sie hilft zu bestimmen, wo Unterschiede sinnvoll sind, wo ein gemeinsamer Ansatz gebraucht wird und welche Entscheidungen die Weiterentwicklung ermöglichen, ohne bereits funktionierende Anwendungen ständig neu bauen zu müssen.

## Wenn ein zunächst praktischer Konfigurationsmechanismus überdacht werden muss

Ein weiteres Beispiel betrifft die Anwendungskonfiguration. Es zeigt, dass eine Architekturentscheidung zum Zeitpunkt ihrer Einführung sinnvoll sein kann, später aber überdacht werden muss, wenn sich das Projekt verändert und der Mechanismus anders verwendet wird als ursprünglich vorgesehen.

Im Jahr 2017 begann ein langfristiges Projekt auf Basis von Angular 2. Bestimmte Parameter sollten geändert werden können, ohne die Anwendung neu zu kompilieren. Dafür wurde eine externe JSON-Konfiguration eingeführt, die auf einem Webserver lag.

Für die ursprüngliche Anforderung war das praktisch. Wenn sich eine öffentliche Einstellung ändert, muss nicht immer die gesamte Anwendung neu gebaut und veröffentlicht werden. Eine externe Konfiguration trennt ausgewählte Einstellungen vom eigentlichen Code und ermöglicht ihre Änderung unabhängig von einem Release.

Ursprünglich war nicht vorgesehen, vertrauliche Daten in dieser Konfiguration zu speichern. Der Mechanismus war für eine klar definierte Gruppe von Einstellungen gedacht und löste ein konkretes Problem.

Das Projekt entwickelte sich jedoch weiter. Anforderungen änderten sich, Entwickler wechselten zwischen Aufgaben, und bestehende Lösungen blieben im Einsatz. Allmählich wurde die JSON-Konfiguration breiter genutzt als ursprünglich beabsichtigt, und schließlich landeten vertrauliche Daten darin.

Ein praktischer Mechanismus wurde somit für einen Zweck verwendet, für den er nicht vorgesehen war.

Das Problem bestand nicht darin, dass JSON grundsätzlich ein ungeeignetes Konfigurationsformat wäre. Das Problem war, dass Daten, die für Nutzer einer Client-Anwendung nicht zugänglich sein sollten, in einer öffentlich erreichbaren Datei abgelegt wurden.

Nachdem die Situation erkannt worden war, musste die unsichere Praxis beendet und der Umgang mit der Konfiguration geändert werden. Diese Verwendung des Mechanismus wurde untersagt. Trotz des daraus entstandenen Konflikts wurde ein anderer Aufbau der Konfiguration verbindlich festgelegt.

Die Grundidee einer gemeinsamen Konfiguration blieb sinnvoll. Allgemeine Parameter sollten weiterhin an einer Stelle definiert und für bestimmte Umgebungen überschrieben werden können. Geändert wurden nicht das Prinzip der zentralen Konfigurationsverwaltung, sondern dessen Umsetzung und die Grenzen der zulässigen Verwendung.

Daraus darf nicht geschlossen werden, dass TypeScript automatisch Sicherheit gewährleistet. Wenn vertrauliche Daten in ein clientseitiges Bundle gelangen, werden sie nicht dadurch geschützt, dass der Code in TypeScript geschrieben, minifiziert oder obfuskiert wurde. Geheimnisse müssen auf einer geschützten Seite gespeichert und verwendet werden. Die Client-Anwendung darf nur Werte erhalten, deren Offenlegung gegenüber Nutzern zulässig ist.

Warum ist dieses Beispiel für Architektur relevant?

Es zeigt den Unterschied zwischen der ursprünglichen Absicht und dem tatsächlichen Lebenszyklus einer Lösung in einem langfristigen Projekt. Bei ihrer Einführung erfüllte der Mechanismus die Anforderung. Später wurde er anders verwendet, wodurch sich die Bewertung seiner Zulässigkeit änderte.

In der Unternehmensentwicklung lässt sich nicht voraussetzen, dass jede Entscheidung ausschließlich unter den Bedingungen verwendet wird, die bei ihrer Einführung bestanden. Ein Projekt kann sich über Jahre weiterentwickeln; Menschen, Anforderungen und die Verwendung des Codes ändern sich. Deshalb reicht es nicht, einen bequemen Mechanismus zu schaffen. Es müssen auch Grenzen definiert werden, innerhalb derer seine Verwendung vertretbar bleibt.

Manchmal lassen sich solche Grenzen durch Dokumentation und Teamvereinbarungen festlegen. In anderen Fällen muss der Ansatz selbst geändert werden, damit eine unerwünschte Nutzung unwahrscheinlicher wird. Und wenn Sicherheit betroffen ist, reichen Bequemlichkeit und Gewohnheit nicht aus, um eine unsichere Lösung beizubehalten.

Der Fall zeigt außerdem, dass architektonische Verantwortung nicht bei der technischen Umsetzung endet. Manchmal sind organisatorische Entscheidungen nötig, ihre Gründe müssen erklärt und etablierte Praktiken verändert werden.

Architektur bedeutet in diesem Sinne nicht, den ursprünglichen Entwurf um jeden Preis zu bewahren. Sie bedeutet, Entscheidungen bei veränderten Rahmenbedingungen neu zu bewerten und das System an den aktuellen Anforderungen auszurichten.

## Wenn unterschiedliche Technologien gemeinsam eine Aufgabe lösen

Die bisherigen Beispiele zeigen, dass Architekturentscheidungen aus unterschiedlichen Gründen entstehen. Manchmal muss eine vertraute Arbeitsumgebung erhalten bleiben. Manchmal müssen mehrere Anwendungen mit unterschiedlichen Frontend-Frameworks weiterentwickelt werden. Manchmal muss ein bequemer Mechanismus überarbeitet werden, weil sich die Sicherheitsanforderungen geändert haben.

Damit stellt sich eine allgemeinere Frage: Wie lassen sich Lösungen bewerten, die auf den ersten Blick technisch komplex oder uneinheitlich wirken?

Nehmen wir an, eine Lösung auf einer einzigen Plattform würde den Austausch bestehender Komponenten, zusätzliche Fachkräfte und Änderungen etablierter Abläufe erfordern. Eine andere Lösung verwendet mehrere Technologien, von denen jede eine bestimmte Aufgabe übernimmt, verlangt dafür aber, dass ihre Zusammenarbeit organisiert wird.

Welche Variante ist besser?

Ohne Kontext lässt sich das nicht beantworten. Wenn mehrere Technologien komplexe Abhängigkeiten erzeugen, seltenes Fachwissen erfordern und die Wartungskosten erhöhen, kann eine einzelne Plattform vorzuziehen sein. Wenn vorhandene Systeme dagegen zuverlässig arbeiten und eine Migration teuer wäre, ohne den Nutzern einen wesentlichen Vorteil zu bringen, kann es sinnvoller sein, die bestehende Lösung beizubehalten.

Dasselbe gilt für die Wahl von Frontend-Frameworks. Ein Framework kann Entwicklung und Wartung vereinfachen. Mehrere große Anwendungen nur aus Gründen der Einheitlichkeit neu zu schreiben, kann jedoch Ressourcen binden, die besser in die Weiterentwicklung der Funktionalität investiert wären.

Die wirtschaftlichen Auswirkungen einer Architekturentscheidung setzen sich aus vielen Faktoren zusammen. Dazu gehören nicht nur die Implementierungszeit, sondern auch Wartung, Weiterbildung, Nutzung vorhandener Infrastruktur, Änderungsrisiken und die Auswirkungen auf die tägliche Arbeit der Nutzer.

Architektur ist deshalb enger mit Wirtschaftlichkeit verbunden, als es zunächst scheinen mag. Sie bestimmt nicht nur, wie Software aufgebaut ist, sondern auch, wie viel Aufwand eine Organisation langfristig in ihre Weiterentwicklung investieren muss.

Es gibt keine allgemeine Regel, mit der sich im Voraus für jede Situation die richtige Variante bestimmen lässt. Die Entscheidung hängt von den Anforderungen, Einschränkungen und Folgen der jeweiligen Alternativen ab.

Manchmal ist eine technisch komplexere Lösung wirtschaftlicher, weil sie funktionierende Infrastruktur erhält. Manchmal senkt Standardisierung tatsächlich die Kosten. Manchmal sollte gemeinsame Funktionalität extrahiert werden; in anderen Fällen sind zwei unabhängige Implementierungen einfacher.

In der Praxis ist es hilfreicher, konkrete Optionen zu vergleichen, statt nach einem auf dem Diagramm makellosen Aufbau zu suchen: Was muss geändert werden? Was kann bleiben? Wer wird die Lösung warten? Und welchen Preis zahlt die Organisation für jeden Weg?

## Warum Architektur während der Weiterentwicklung erhalten bleiben muss

Auch gut durchdachte Entscheidungen zu Beginn garantieren nicht, dass ein System während seines Wachstums unverändert bleibt.

Entwicklung besteht aus vielen kleinen Änderungen. Jede neue Aufgabe braucht eine Lösung, die den Anforderungen entspricht und in den verfügbaren Zeitrahmen passt. Manchmal ist es für Entwickler einfacher, direkt die Funktionalität eines benachbarten Moduls zu verwenden, als eine passende gemeinsame Bibliothek zu finden oder zu erstellen. Manchmal scheint es schneller, einen kleinen Codeabschnitt zu duplizieren, als die bestehende Struktur anzupassen.

Eine einzelne Abkürzung kann durchaus gerechtfertigt sein. Häufen sich solche Vereinfachungen jedoch an, verschwimmen die Grenzen zwischen Systemteilen. Bibliotheken erhalten Abhängigkeiten zu Anwendungen, gemeinsame Logik vermischt sich mit framework-spezifischem Code, und eine Änderung an einer Stelle wirkt sich unerwartet auf andere Bereiche aus.

Das System wird nicht unbedingt deshalb schwieriger, weil es mehr Code enthält, sondern weil die Folgen von Änderungen immer schwerer zu überblicken sind.

Architekturvereinbarungen müssen deshalb nicht nur formuliert, sondern während der Entwicklung gepflegt werden. Das Team sollte verstehen, warum bestimmte Grenzen bestehen, welche Abhängigkeiten zulässig sind und wann bestehende Entscheidungen überdacht werden sollten.

Ein Teil dieser Arbeit findet in Architekturgesprächen, durch die Beteiligung erfahrener Entwickler und im Code Review statt. Andere Regeln lassen sich so festhalten, dass unerwünschte Abhängigkeiten automatisch erkannt werden.

Das ist besonders wichtig bei großen Produkten, in denen mehrere Anwendungen und zahlreiche Bibliotheken gleichzeitig weiterentwickelt werden. Ohne klare Regeln kann eine gemeinsame Codebasis nach und nach zu einer Sammlung von Projekten werden, die zwar nebeneinander liegen, aber auf zufällige Weise miteinander verbunden sind.

Automatisierte Prüfungen ersetzen kein architektonisches Denken. Sie können nicht selbst entscheiden, welche fachlichen Funktionen zusammengehören, ob ein Framework verwendet werden sollte oder wo die Grenze zwischen zwei Verantwortungsbereichen verlaufen muss. Sie helfen jedoch, bereits getroffene Entscheidungen zu erhalten und manche Verstöße zu erkennen, bevor sie Teil der Haupt-Codebasis werden.

Architektur ist somit nicht nur ein anfänglicher Entwurf. Sie ist auch die Fähigkeit, den Systemaufbau während seiner Weiterentwicklung konsistent zu halten, veraltete Entscheidungen rechtzeitig zu überarbeiten und das Produkt beherrschbar zu halten.

## Vom architektonischen Denken zur Projektorganisation

Alle Beispiele verbindet ein Muster: Architekturentscheidungen entstehen aus der Notwendigkeit, unterschiedliche Aspekte eines Produkts miteinander in Einklang zu bringen.

In einem Fall muss mobile Funktionalität ergänzt werden, während die vertraute Arbeitsumgebung und die bestehende Infrastruktur erhalten bleiben. In einem anderen müssen mehrere Frontend-Anwendungen mit unterschiedlichen Frameworks weiterentwickelt werden, ohne ein funktionierendes Produkt nur für technische Einheitlichkeit neu zu schreiben. In einem dritten Fall muss ein bequemer Konfigurationsmechanismus überdacht werden, nachdem sich seine Nutzung verändert und ein Sicherheitsproblem gezeigt hat.

Jeder dieser Fälle erfordert Aufmerksamkeit nicht nur für den Code, sondern auch für die Nutzer, bestehende Systeme, die Erfahrung des Teams, die Kosten von Änderungen und die Zukunft des Produkts.

Deshalb beginnt Architektur mit dem Verständnis der Aufgabe und ihrer Einschränkungen, nicht mit der Auswahl eines Werkzeugs. Zunächst muss geklärt werden, welche Systemteile miteinander interagieren müssen, welche Entscheidungen unabhängig voneinander weiterentwickelt werden können und welche Abhängigkeiten später Probleme verursachen könnten. Erst dann ist es sinnvoll, die Organisation des Codes und die Kommunikation zwischen Anwendungen festzulegen.

Mit dem Wachstum eines Produkts wird dieser Ansatz besonders wichtig. Wenn mehrere Anwendungen, gemeinsame Bibliotheken und unterschiedliche Technologieumgebungen nebeneinander bestehen, reicht es nicht mehr aus, die Struktur jedes Projekts einzeln festzulegen. Das Team braucht einen gemeinsamen Überblick über das System und muss sicherstellen, dass lokale Änderungen die vereinbarten Architekturgrenzen nicht untergraben.

Hier werden Werkzeuge nützlich, die mehrere Anwendungen und Bibliotheken in einem gemeinsamen Entwicklungs-Workspace organisieren, ihre Beziehungen verwalten und festgelegte Regeln unterstützen.

Die Werkzeuge treffen jedoch keine Architekturentscheidungen für das Team. Sie wissen nicht, warum die Kombination mehrerer Frameworks in einem Produkt sinnvoll ist, warum ein bestehendes System erhalten bleiben sollte oder welche Konfigurationswerte gemeinsam sein müssen. Diese Entscheidungen entstehen aus dem Verständnis der tatsächlichen Aufgabe und der Folgen möglicher Alternativen.

Bevor konkrete Werkzeuge und Projektstrukturen betrachtet werden, ist es daher wichtig, die Gründe hinter Architekturentscheidungen zu verstehen: Welche Probleme sollen gelöst werden? Warum passen manche Ansätze besser als andere? Und welche Prinzipien sollten unabhängig von den verwendeten Technologien Bestand haben?

Architektur soll nicht alle Teile eines Systems identisch machen. Entscheidend ist zu verstehen, warum sie unterschiedlich aufgebaut sind, welche Unterschiede gerechtfertigt sind und was vor unbeabsichtigten Änderungen geschützt werden muss, während das Produkt weiter wächst.

Erst danach ist es sinnvoll zu untersuchen, wie sich die getroffenen Entscheidungen in der Projektstruktur ausdrücken und über den gesamten Lebenszyklus des Produkts erhalten lassen.
