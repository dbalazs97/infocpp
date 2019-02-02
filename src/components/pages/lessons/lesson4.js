import React, {Component} from 'react';
import {Block, BottomLessonChanger, PageHeader, SVG, SVGTable, Syntax} from "../../StyleComponents";
import {Container} from 'semantic-ui-react-single/Container';

import AnimalsSVG from '../../../img/animals.svg';
import InheritanceSVG from '../../../img/inheritance.svg';
import AccessSVG from '../../../img/access.svg';

export default class Lesson4 extends Component {
	render() {
		return (
			<Container>
				<PageHeader icon='book'>4: Öröklés</PageHeader>
				<BottomLessonChanger current={4} title={'Öröklés'}/>
				<p>Ebben a fejezetben az osztályok egymással való hierarchikus viszonyáról fogunk beszélni, az öröklésről.</p>
				<hr/>
				<h5>Öröklés-elmélet</h5>
				<Block type={'example'}>Biológia tudásunkat megerőltetve kijelenthetjük, hogy léteznek állatok, amik tudnak mozogni, lehetnek lábaik, van súlyuk stb. (&rarr;&nbsp;így&nbsp;objektumként&nbsp;reprezentálhatók).<br/>
					Észrevehető, hogy így elég tág fogalmat definiáltunk érdemes lenne kicsit konkretizálni. <br/>
					Például definiálhatnánk a gerinceseket és a rovarokat, mint állatok. Sőt a gerincesek tovább is bonthatók például hüllőkre és emlősökre. <br/><br/>

					Látható, hogy az objektumok <b>az-egy</b> (is-a) kapcsolatban állnak. (Az emlős <b>az-egy</b> gerinces, a gerinces <b>az-egy</b> állat, stb.)<br/>
					Továbbá azt is láthatjuk, hogy bizonyos tulajdonságok öröklődnek: például az emlősöknek is van gerince. Vagy éppen "felülíródnak": például egy emlős és egy hüllő nem ugyanúgy szaporodik.
				</Block>

				<Block type={'important'}>Egy az-egy kapcsolatban a szülőt <b>alaposztálynak</b>, a gyereket <b>leszármazott osztálynak</b> nevezzük, az összes kapcsolat együttes rendszerét <b>hierarchiának</b>.</Block>

				<h5>UML osztálydiagram</h5>
				<p>Az UML (Unified Modeling Language) osztálydiagram egy szabványos jelölést biztosító nyelv, mellyel vizuálisan tudjuk reprezentálni az osztályhierarchiát.</p>
				<p>Az osztályokat téglalapok, az öröklést teli végű nyilak.</p>
				<SVG src={AnimalsSVG}/>

				<h5>Öröklési láthatóság</h5>
				<p>Öröklés során természetesen az objektumok egymással megosztanak adatokat. De az adatok védelme érdekében megtilthatjuk a leszármazott osztálynak, hogy hozzáférjen az alaposztályának adataihoz.</p>
				<Block type={'important'}>A C++-ban 3 féle öröklési módot különböztetünk meg: <b>public, private</b> és <b>protected</b></Block>

				<p>A következő táblázatok összefoglalják, a C++ öröklés láthatósági lehetőségeit.</p>

				<SVGTable src1={InheritanceSVG} src2={AccessSVG}/>

				<h5>C++ öröklés</h5>
				<Block type={'important'}>Az öröklést a <b>class osztálynév</b> után tett kettőspont után <b>öröklésmód alaposztály</b> formában. Ha nem írunk öröklésmódot, akkor structnál <b>public</b>, classnál <b>private</b> lesz.<br/>
					class A : public B {};<br/>
					class C : private B {};<br/>
					class D : A {};
				</Block>
				<p>Örökléskor ha felülírjuk az alaposztály metódusait, akkor a példányokon a saját metódusunk hívódik. Az alaposztály konstruktorát az inicializáló listán kell meghívni, különben az alapértelmezett fut le.</p>
				<Syntax>{'class Polygon {\n\tprotected:\n\tsize_t width, height;\n\n\tpublic:\n\tPolygon(size_t w = 0, size_t h = 0) : width(w), height(h) { }\n\tvoid resize (size_t w, size_t h) { width  = w; height = h; } \n};\n\nclass Rectangle: public Polygon {\n\tpublic:\n\tsize_t area() { return width * height; }\n};\n\nclass Triangle: public Polygon {\n\tpublic:\n\tsize_t area() { return width * height / 2; }\n};\n\t\nRectangle rect;\nTriangle  trgl;\nrect.resize(4,5);\ntrgl.resize(4,5);\ncout << rect.area() << \'\\n\'; // 20\ncout << trgl.area() << \'\\n\'; // 10'}</Syntax>
			</Container>
		);
	}
}

