import React, {Component} from 'react';
import {Block, BottomLessonChanger, PageHeader, SVG, Syntax} from "../../StyleComponents";
import {Container} from 'semantic-ui-react-single/Container';

import EmissionSVG from '../../../img/emisssion.svg';
import HeterArrowsSVG from '../../../img/heter_arrows.svg';
import UMLEmissionSVG from '../../../img/uml_emission.svg';

export default class Lesson5 extends Component {
	render() {
		return (
			<Container>
				<PageHeader icon='book'>5: Példányok tulajdonságai</PageHeader>
				<BottomLessonChanger current={5} title={'Példányok'}/>

				Ebben a fejezetben az öröklődésből adódó problémákat elemezzük a példányok szempontjából.
				<hr/>

				<h5>Példányosítás</h5>
				<p>Példányosításnak nevezzük azt, amikor az osztályunk "tervrajzaiból" létrehozunk egy konkrét entitást.</p>
				<Syntax>{'class A { ... };\nclass B { B(int x){...}; };\n//...\nA xyz; \t\t// xyz egy példánya az A osztálynak\nB uvw(3);\t// uvw pedig B-nek egy példánya, a megfelelő konstruktort hívva'}</Syntax>
				<h5>Példányok kompatibilitása</h5>
				<p>Az OOP egyik nagyszerű találmánya az, hogy mivel a leszármazott osztály tartalmazza az ősosztályát, így a leszármazott bármilyen olyan helyen használható, ahol az őse is.</p>
				<p>Tehát a hierarchiában lejjebb lévő osztály kompatibilis a felette lévővel.</p>
				<Syntax>{'class A { };\nclass B : public A { };\n// ...\nvoid func(A* xyz) { }\n// ...\nA a; B b;\nfunc(&a); // Működik, mivel a megfelelő típus\nfunc(&b); // Működik, mivel a kért típus leszármazottja (ami kompatibilis vele)'}</Syntax>
				<h5>Virtuális metódus</h5>
				<p>A fenti példából kiindulva, mivel A és B kompatibilisek, ezért amikor b-t átadjuk elvesznek a "B specifikus" metódusai. Erre a problémára ad megoldást a virtuális metódus.</p>
				<Block type={'important'}>
					A <b>virtuális metódus</b> egy olyan metódus, melyet ha a leszármazott felüldefiniál, akkor a helyettesítés során a leszármazott verziója hajtódik végre.<br/>
					Virtuális metódust a metódus neve elé írt <b>virtual</b> kulcsszóval lehet létrehozni.
				</Block>
				<Syntax>{'class A {\n\tpublic:\n\t\t\tint funcA() { return 1; }\n\tvirtual int funcB() { return 2; }\n};\n\nclass B : public A {\n\tpublic:\n\t\t\tint funcA() { return 3; }\n\t\t\tint funcB() { return 4; }\n};\n//...\nvoid func(A* a) {\n\tstd::cout << a->funcA() << " - " << a->funcB() << \'\n\';\n}\n//...\nA a; B b;\nfunc(&a); // 1 - 2, mivel nem leszármazottat hívunk a virtuális metódus csak sima metódusként viselkedik\nfunc(&b); // 1 - 4, mivel funcA nem virtuális, ezért az A osztálybeli hívódik; ezzel szemben funcB-ből a B-beli fut le'}</Syntax>

				<h5>Virtuális destruktor</h5>
				<p>A fent említett probléma miatt, a helyettesítés során csak az alaposztály destruktora hívódna meg, tehát érdemes minden osztályban virtuális destruktort használni. (A jobb fajta IDE-k alapból virtuális destruktort szúrnak be).</p>
				<Syntax>{'class A {\n\tint* a;\n\tpublic:\n\t\t\t A() { a = new int[50]; }\n\tvirtual ~A() { delete[] a; std::cout << "~A\n"; }\n};\n\nclass B : public A {\n\tint* b;\n\tpublic:\n\t\t\t B() { b = new int[70]; }\n\tvirtual ~B() { delete[] b; std::cout << "~B\n"; }\n};\n//...\nA* b = new B;\ndelete b; // ~B ~A, mivel az A destruktora virtuális, ezért a helyettesítéskor a B destruktora is lefut.'}</Syntax>
				<Block type={'example'}><b>Megjegyzés:</b> virtuális konstruktor nem létezik. (Helyette általában létrehozunk egy clone() metódust, mely lemásolja az osztályt.)</Block>

				<h5>Interfészek</h5>
				<p>A kompatibilitás remek lehetőséget biztosít arra, hogy olyan osztályokat hozzunk létre, melyek meghatározhatják, hogy a leszármazottjainak milyen metódusokat kell megvalósítaniuk.</p>
				<p>Ezt elősegítve vezetjük be a tisztán virtuális metódust.</p>
				<Block type={'important'}>
					<b>Tisztán virtuális metódus:</b> Egy olyan metódus, mely nincs definiálva, ezért azt minden leszármazottjának definiálnia <b>kell</b>.<br/>
					Tisztán virtuális metódust a virtuális metódus deklarációja után tett <b>= 0</b> jelzéssel lehet létrehozni<br/>
					<b>Interfész: </b> Egy olyan osztály, melynek csak tisztán virtuális metódusai vannak. Éppen ezért <b>nem példányosítható</b>.
				</Block>
				<Syntax>{'class IShape {\n\tprotected:\n\tsize_t width, height;\n\n\tpublic:\n\tsize_t area() = 0;\n\tsize_t perimeter() = 0;\n};\n\nclass Rectangle : public IShape {\n\tpublic:\n\tsize_t area() { return width * height; }\n\tsize_t perimeter() { return 2 * (width + height); }\n};\n//...\nIShape sh; \t\t// Hiba: interfész nem példányosítható\nRectangle rt;'}</Syntax>
				<hr/>
				<h5>Heterogén kollekció</h5>
				<p>Ha egy bizonyos műveletet szeretnénk elvégezni valamilyen alaposztállyal és leszármazottaival, akkor érdemes őket valamilyen tárolóban elhelyezni és az adott műveletet a tároló minden elemén elvégezni.</p>
				<p>Ezt a tárolót nevezik <b>heterogén kollekciónak</b>, ugyanis az csak alaposztálybeli pointereket tartalmaz, melyek a kompatibilitás miatt használhatók leszármazottként is.</p>

				<h6>Implementáció</h6>
				<p>A heterogén kollekció egy olyan osztály lesz, melyben a kérdéses alaposztály pointeréből álló tömböt tárolunk. Így ennek a tömbnek minden elemén már végrehajthatjuk a műveleteket.</p>

				<h6>A pointerek élettartama</h6>
				<Block type={'important'}>
					<b>"Könyvtár" típus:</b> Amikor a heterogén kollekcióban tárolt pointerek megsemmisülnek a kollekcióval együtt.<br/><i>Hivatalosan: kompozíció</i><br/>
					<b>"Állatkert" típus:</b> Amikor a heterogén kollekcióban tárolt pointerek <b>nem</b> semmisülnek meg a kollekcióval együtt.<br/><i>Hivatalosan: aggregáció</i>
				</Block>
				<p>Ezek a vicces (és nem hivatalos) elnevezések, az élettartamra utalnak, ugyanis ha egy könyvtárat leégetünk, akkor a bent lévő könyvek is leégnek; azonban ha egy állatkertet bezárnak, akkor nem fogják legyilkolni az állatokat.</p>

				<Syntax>{'struct Vehicle {\n\tvirtual int getEmission() = 0;\n\tvirtual ~Vehicle(){} // Ha szükség lenne destruktorra, akkor az alaposztályban legyen mindig virtuális destruktor\n};\n\nstruct Car : public Vehicle {\n\tint getEmission() { return 3; }\n};\n\nstruct Bus : public Vehicle {\n\tint getEmission() { return 10; }\n};\n\nstruct EmissionCounter {\n\tVehicle** traffic;\t// Fontos: A heterogén kollekcióban csak pointerek vannak tárolva\n\tsize_t  size, count;\n\n\tEmissionCounter(int size = 100) : size(size), count(0) { traffic = new Vehicle*[size]; }\n\t~EmissionCounter() { delete[] traffic; } // Mivel állatkert típusú, ezért a tárolt pointereket nem töröljük\n\n\tvoid addVehicle(Vehicle* v) { traffic[count++] = v; }\n\n\tint totalEmission() {\n\t\tint total = 0;\n\t\tfor(size_t i = 0; i < count; i++)\n\t\t\ttotal += traffic[i]->getEmission();\n\t\treturn total;\n\t}\n};\n//...\nCar* a = new Car, *b = new Car;\nBus* c = new Bus, *d = new Bus;\n\nEmissionCounter ec;\nec.addVehicle(a); ec.addVehicle(b); ec.addVehicle(c); ec.addVehicle(d);\nstd::cout << ec.totalEmission() << \'\n\';\n\ndelete a; delete b; delete c; delete d;  // Mivel állatkert típusú'}</Syntax>
				<SVG src={EmissionSVG} doubleWidth/>
				<small>A 9. fejezetben látni fogjuk, hogy nincs szükség saját tárolót implementálni, léteznek szabványosak is.</small>

				<h5>Heterogén kollekció és az UML osztálydiagram</h5>
				<p>Ha egy osztály aggregál, vagy "kompozitál" egy másik osztályt, akkor jelben a következők a jelölések:</p>
				<SVG src={HeterArrowsSVG} halfWidth/>
				<p>A rombusz mindig a tartalmazónál van, a nyíl a tartalmazottnál. <br/>
					<small>Ezt úgy lehet megjegyezni, hogy a gyémánt mindig a gazdagnál van. (angol: diamond = rombusz)</small>
				</p>
				<p>Az előző példa UML osztálydiagramja:</p>
				<SVG src={UMLEmissionSVG}/>
				<br/>
			</Container>
		);
	}
}

