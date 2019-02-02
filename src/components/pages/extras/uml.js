import React, {Component} from 'react';
import {PageHeader, SVG} from "../../StyleComponents";
import {Container} from 'semantic-ui-react-single/Container';
import {Icon} from 'semantic-ui-react-single/Icon';

import Class1PNG from '../../../img/UML/class1.png';
import Class2PNG from '../../../img/UML/class2.png';
import Class3PNG from '../../../img/UML/class3.png';
import UMLArrowPNG from '../../../img/UML/umlarrows.png';
import DrawIO1PNG from '../../../img/UML/drawio1.png';
import DrawIO2PNG from '../../../img/UML/drawio2.png';
import DrawIO3PNG from '../../../img/UML/drawio3.png';

export default class UML extends Component {
	render() {
		return (
			<Container>
				<PageHeader icon='sitemap'>UML Diagramok</PageHeader>

				<h5>Bevezető</h5>
				<p>A házifeladat második részében és a ZH-n is előfordul, hogy UML osztálydiagramokat kell rajzolni. Ebben a fejezetben megismerkedünk az UML diagramok egyszerű felépítéséről és azok előállításáról is.</p>
				<p>Ez a leírás nem feltétlenül a legszakszerűbben magyarázza el a diagramokat, kizárólag az alapvető információkat adja át.</p>

				<h5>Osztályok ábrázolása</h5>
				<p>Osztályokat általánosságban <b>téglalapokkal</b> ábrázolunk, melynek a közepére kerül az osztály neve. Ha szeretnénk az adattagokat és a metódusokat is feltüntetni, akkor három részre kell osztani a diagramot.</p>
				<SVG src={Class1PNG} halfWidth/>
				<p>Felülre kerül az osztály neve, középre az adattagok és alulra a metódusok.</p>

				<h5>Adattagok ábrázolása</h5>
				<p>Az adattagoknak a láthatóságát, a nevét és a típusát kell megadni ebben a sorrendben. (<i>láthatóság&nbsp;név:&nbsp;típus</i>)</p>
				<p><b>Láthatóság:</b> <b>+</b> public <b>-</b> private <b>#</b> protected</p>
				<p><b>Statikusság:</b> A statikus adattagokat alá kell húzni.</p>
				<p><b>Példa:</b></p>
				<SVG src={Class2PNG} halfWidth/>

				<h5>Metódusok ábrázolása</h5>
				<p>A metódusokat a láthatóságuk, a nevük, a paraméterlistájuk és a visszatérési értékük szerint kell megadni. (<i>láthatóság&nbsp;név(arg1:&nbsp;típus1,&nbsp;arg2:&nbsp;típus2,&nbsp;...):visszatípus</i>)</p>
				<p><b>Láthatóság:</b> <b>+</b> public <b>-</b> private <b>#</b> protected</p>
				<p><b>Statikusság:</b> A statikus metódusokat alá kell húzni.</p>
				<p><b>Virtualitás:</b> Mivel a szabványban nincs jelölés rá, így a metódus neve elé írjuk, hogy <b>virtual</b>.</p>
				<SVG src={Class3PNG} halfWidth/>

				<h5>Osztályok kapcsolatának ábrázolása</h5>
				<p>Az osztályok különböző kapcsolatokban állhatnak, ezt mutatja be a lenti táblázat:</p>
				<SVG src={UMLArrowPNG} halfWidth/>

				<p>
					<ol>
						<li><b>Asszociáció:</b> Az A hozzáfér a B-hez, azaz van B típusú adattagja.</li>
						<li><b>Dependencia:</b> Az A függ a B-től, azaz van B metódusparamétere vagy visszatérési értéke.</li>
						<li><b>Generalizáció:</b> Az A a B leszármazottja, azaz A mindehol használható, ahol B is.</li>
						<li><b>Realizáció:</b> Az A megvalósítja a B interfész metódusait.</li>
						<li><b>Kompozíció:</b> Az A osztály tartalmaz B-beli elemeket (általában tömbben), de A megszűnésekor a tartalmazott B-k megszűnnek.</li>
						<li><b>Aggregáció:</b> Az A osztály tartalmaz B-beli elemeket (általában tömbben), de A megszűnésekor a tartalmazott B-k külön entitásként léteznek tovább.</li>
					</ol>
				</p>

				<h5>Tippek</h5>
				<ul className="browser-default">
					<li>A leszármazottakban nem kell jelölni az ősök adattagjait és metódusait, csak azokat, amiket felülír a leszármazott.</li>
					<li>A konstruktort és destruktor akkor ábrázoljuk ha van tartalma is.</li>
					<li>Ha kétirányú az asszociáció, akkor nincs szükség nyílvégre</li>
				</ul>
				<hr/>

				<h5>Rajzeszközök</h5>
				<p>Az ábárák elkészítéséhez a böngészőben futó draw.io nevű rajzeszközt ajánlanám.</p>
				<p><Icon name={'pencil'}/> <a href="https://draw.io/">Draw.IO</a></p>

				<h5>Osztályok beszúrása</h5>
				<p>Itt a <b>Create new diagram</b> menüpontban válasszuk a <b>Blank diagram</b> menüt, ezáltal egy üres rajzfelülettel találkozunk.</p>
				<p>A bal oldali menüsávban keressük ki az UML kategóriát. Innen a pirossal jelölt elemmel tudunk osztályt hozzáadni a vászonra húzással.</p>
				<SVG src={DrawIO1PNG} halfWidth/>
				<p>Az osztályhoz adattagot vagy metódust a kékkel bekarikázott elem az osztály megfelelő részére való húzásával lehetséges.</p>

				<h5>Kapcsolatok kiépítése</h5>
				<p>Nyilakat kétféleképpen lehet elhelyezni. Először is úgy, hogy a kurzort az osztályra víve megjelenő osztópontokból kihúzzuk a nyilat a megfelelő helyre.</p>
				<SVG src={DrawIO2PNG} halfWidth/>

				<p>Másodszor pedig bal oldalt az UML kategóriából kiválasztjuk a megfelelő típusú nyilat. Behúzzuk a vászonra és a végeit a megfelelő helyre illesztjük.</p>
				<p>A nyilakat úgy tudjuk megváltoztatni, hogy rájuk kattintunk és a jobb oldalt megjelenő panelen kiválasztjuk a megfelelő szaggatottságot és nyílvégeket.</p>
				<SVG src={DrawIO3PNG} halfWidth/>

				<h5>Exportálás</h5>
				<p>A diagram elkészültekor a <b>File</b> &rarr; <b>Export as...</b> menüpontjában tetszőleges formátumba elmenthetjük a diagramunkat.</p>
			</Container>
		);
	}
}
