import React, {Component} from 'react';
import {Block, BottomLessonChanger, PageHeader, Syntax} from "../../StyleComponents";
import {Container} from 'semantic-ui-react-single/Container';

export default class Lesson2 extends Component {
	render() {
		return (
			<Container>
				<PageHeader icon='book'>2: OOP alapok</PageHeader>
				<BottomLessonChanger current={2} title={'OOP alapok'}/>

				<p>
					Ebben a fejezetben az objektum orientált programozás alapelveivel és annak C++ megvalósításával foglalkozunk.
				</p>
				<hr/>

				<h5>Az objektum orientált programozás</h5>
				<p>A C++ megalkotásának egyik fő szempontja az objektum orientált programozás bevezetése (A C-ben használt procedurális programozás<sup>*</sup> felváltására).</p>
				<p>Az OOP középpontjában az objektum áll, mely egy olyan dolog ami tulajdonságokkal és rajta elvégezhető műveletekkel rendelkezik.</p>
				<Block type='example'>Például az autó egy objektum.<br/><b>Tulajdonságai:</b> szín, fogyasztás, ülések száma, stb.<br/><b>Rajta végezhető műveletek:</b> vezetés, fékezés, váltás, stb.</Block>
				<small>* - Olyan programozás, ahol csak globális függvényeket használunk a műveletekhez végrehajtására.</small>

				<h5>Objektum és osztály</h5>
				<p>Ismerkedjünk meg az OOP-ben használatos terminológiával, definíciókkal.</p>
				<p><b>Objektum</b>: Az OOP alapegysége, mely tulajdonságok és az azon végzett műveletek egyesítéséből áll.</p>
				<p><b>Osztály</b>: Az objektumok "tervrajza", mely önmagában nem határoz meg konkrétumokat, csak leírja, hogy az az objektum miként néz ki és hogyan viselkedik.</p>
				<p><b>Példány</b>: Egy olyan osztályelem, ami specifikálja az objektumot úgy, hogy az megfeleljen az osztályban leírt váznak.</p>

				<Block type='example'>
					Az autós példában<br/>
					<b>Objektum:</b> Az autó, mint fogalom.<br/>
					<b>Osztály:</b> Egy autógyárban az autó tervrajza.<br/>
					<b>Példány:</b> A saját autónk.<br/>
				</Block>

				<p>Sajnos az osztály és az objektum kifejezést nem szoktuk megkülönböztetni, így ezek után mi is élünk ezen szokásjoggal.</p>

				<h5>Az OOP alapelvek</h5>
				<p>Egy modern OOP nyelvnek meg kell felelnie néhány alapelvnek (axiómának).</p>
				<p><b>Abstraction</b>: Egy objektum mindig csak a legszükségesebb elemeit "mutassa" a külvilágnak, a belső működését rejtse el.</p>
				<p><b>Encapsulation</b>: Egy objektum álljon logikailag összetartozó tulajdonságokból és műveletekből.</p>
				<p><b>Inheritance</b>: Az objektumok álljanak hierarchiában, egy feljebb lévő osztály elemeit felhasználhatja a lejjebb lévő.</p>
				<p><b>Polymorphism</b>: Egy objektum legyen többféle módon használható, és több hasonló objektum viselkedjen hasonlóan. (Ebből következik az Override)</p>
				<p><b>Override</b>: Egy objektum legyen képes felülírni, átalakítani saját működését az őseihez képest.</p>

				<p>Az elkövetkezendő fejezetekben megnézzük, hogy a C++ hogyan valósítja meg az OOP alapelveket.</p>
				<small>Ezen az oldalon ezentúl a tulajdonságokat adattagnak a műveleteket metódusnak nevezzük.</small>

				<hr/>

				<h5>Osztályok létrehozása és példányosítása</h5>
				<p>Osztályokat a <b>class</b> kulcsszóval hozhatunk létre. Az adattagokat változószerűen, a metódusokat függvényszerűen deklarálunk. Ezzel megvalósítjuk az <b>Encapsulation</b> alapelvet.</p>
				<p>Ezután az osztályunk használható mint "típus", azaz példányokat hozhatunk létre az osztályunkból.</p>
				<Syntax>{'class Rectangle\t{ \t\t// Osztály meghatározása\n\tint a, b;\t\t\t// Adattagok\n\tint area();\t\t\t// Metódus\n\tvoid grow(int by);\t// Metódus paraméterrel\n};\n// ...\nRectangle myRect;\t\t// A myRect egy példánya a Rectangle osztálynak'}</Syntax>
				<p>A példányon az adattagok és a metódusok ezentúl elérhetőek a példány neve után tett <b>.</b> operátorral. (Ha osztályra mutató pointerünk van, akkor a <b>-></b> használandó).</p>

				<h5>Adattagok és metódusok láthatósága</h5>
				<p>Első megközelítésben kétféle adattag és metódus láthatóság létezik, melyekkel korlátozhatjuk az ezekhez való hozzáférést.</p>
				<p><b>public</b>: az adattagot vagy metódust kívülről is elérhető, látható</p>
				<p><b>private</b>: az adattagot vagy metódust csak az adott objektum metódusai látják, kívülről azok elérhetetlenek, láthatatlanok</p>
				<p>C++-ban a public és a private kulcsszó, melynek leírása után minden adattag és metódus az adott láthatósággal fog rendelkezni. Ezzel megvalósítjuk az <b>Abstraction</b> alapelvet.</p>
				<Syntax>{'class Rectangle {\n\tprivate:\n\tint a, b;\t\t\t// Ezek az adattagok csak a Rectangle osztályból láthatóak\n\n\tpublic:\n\tint area();\t\t\t// Ezek a metódusok láthatók kívülről is\n\tvoid grow(int by);\n};\n// ...\nRectangle myRect;\nmyRect.a = 6;\t\t\t\t// Hiba: privát adattagot nem lehet módosítani\nint area = myRect.area(); \t// Publikus metódus hívható, hivatkozni a . operátorral lehet rá'}</Syntax>
				<p>Mint korábban említettük a <b>struct</b> kulcsszó C++-ban más jelentéssel bír, ugyanis azzal is osztályt lehet létrehozni. Az egyetlen különbség a <b>struct</b> és a <b>class</b> között, hogy a <b>struct</b> után ha nem írunk láthatóságot az alapértelmezetten <b>public</b>, míg a <b>class</b>-nál <b>private</b>.</p>

				<Syntax>{'class A {\n\tint n;\t// Ez private adattag\n};\n\nstruct B {\n\tint n;\t// Ez public adattag\n};'}</Syntax>

				<h5>Metódusok létrehozása</h5>
				<p>A metódusok deklarálása hasonlít a függvényekére, tehát túlterhelhető, használható alapértelmezett paraméter stb.</p>
				<p>Az osztályok metódusait kétféleképpen lehet definiálni. Lehetséges az osztálydefiníción belül, vagy azon kívül.</p>
				<p><b>Belül: </b> A metódus deklarációja után.</p>
				<p><b>Kívül: </b> Az osztálydeklaráción kívül az osztály neve után tett <b>::</b> operátorral érhető el az osztály metódusai.</p>
				<p>Általában a rövid (~2-3 sor) metódusokat szoktuk belül definiálni a többit kívül. A modulok szempontjából az osztálydefiníciók a <b>.h</b> fájlokba kerülnek, a metódusok definíciói pedig a <b>.cpp</b>-be.</p>
				<small>Ebben a tananyagban minden osztályban belül definiálunk metódusokat a rövidség kedvéért.</small>

				<p>A metódusokban hivatkozhatunk az adott osztály adattagjaira a nevükkel. Minden metódusba el van rejtve egy pointer az aktuális példányról, melynek a neve <b>this</b>. Ha a paraméterlistán van egy adattaggal megegyező paraméter, akkor az adattagot csak a <b>this</b>-en keresztül érhetjük el.</p>
				<h6>Konstans metódusok</h6>
				<p>A metódus paraméterlistája után tett <b>const</b> kulcsszóval jelezhetjük, hogy az adott metódus nem módosítja az adattagokat.</p>
				<Syntax>{'// rectangle.h\nclass Rectangle {\n\tprivate:\n\tint width, height;\n\n\tpublic:\n\tint area() const {\t\t\t\t// Belül definiált metódus (konstans)\n\t\treturn width * height;\n\t}\n\tvoid grow(int by = 1);\t\t// Használható alapértelmezett paraméter\n\tvoid add(int width, int height);\n};\n\n// rectangle.cpp\n// Külső definiáláskor a :: (scope-operátor) bal oldalán az osztály van, jobb oldalán a metódus\nvoid Rectangle::grow(int by) {\n\twidth *= by; height *= by;\n}\n\nvoid Rectangle::add(int width, int height) {\n\t// Ha ugyanaz a paraméter neve, mint egy adattagé akkor az adattag\n\t// a this-> kulcsszóval érhető el\n\tthis->width  += width;\n\tthis->height += height;\n}'}</Syntax>


				<h5>Kontrollált hozzáférhetőség, getter és setter metódusok</h5>
				<p>Az <b>Abstraction</b> alapelv értelmében általában minden adattagot privát láthatósággal deklarálunk. Azonban, ha szeretnénk hozzáférést biztosítani hozzájuk, akkor ún. getter és setter metódusokat hozunk létre. Ezzel tudjuk kontrollálni a hozzáférést, ugyanis ha csak olvashatóvá akarjuk tenni az adattagot, akkor csak gettert csinálunk.</p>
				<Syntax>{'class Number {\n\tint value;\n\n\tpublic:\n\tint getValue() const { return value; }\n\tvoid setValue(int v) { value = v; }\n};'}</Syntax>

				<h5>Metódusok túlterhelése</h5>
				<p>Metódusok túlterhelése hasonlít a függvényekéhez, azaz több ugyanolyan nevű függvény, más paraméterezéssel.</p>
				<Syntax>{'class Rectangle {\n\tint width, height;\n\n\tpublic:\n\tvoid grow(int by) { width *= by; height *= by; }\n\tvoid grow(int byW, int byH) { width *= byW; height *= byH; }\n};'}</Syntax>

				<h5>Operátorok túlterhelése</h5>
				<p>Ha szeretnénk az osztályunkon operátorokat (<b>+</b>,<b>-</b>,<b>*</b>,<b>/</b>,<b>()</b>,<b>[]</b>,<b>++</b>,<b>--</b> stb.) használni, azokat túlterhelhetjük, így saját működést biztosíthatunk.</p>
				<p>Ezentúl az operátorokat is metódusként emlegetjük, mivel definiálni metódusként kell az operátor szimbóluma elé tett <b>operator</b> kulcsszóval. Az egyik operandus mindig a saját osztály, a két operandusú operátoroknál pedig megkapjuk paraméterként a másik operandust.</p>
				<Syntax>{'struct Vector2D {\n\tdouble x, y;\n\n\tVector2D(double a, double b) { x = a; y = b; }\n\n\t// Összeadás túlterhelése\n\tVector2D operator+(const Vector2D& other) {\n\t\treturn Vector2D(this->x + other.x, this->y + other.y);\n\t}\n\n\t// Szorzás túlterhelése -> skaláris szorzás\n\tdouble operator*(const Vector2D& other) {\n\t\treturn this->x + other.x * this->y + other.y;\n\t}\n\n\t// Szorzás túlterhelése -> szám és vektor szorzása\n\tVector2D operator*(double n) {\n\t\treturn Vector2D(this->x * n, this->y * n);\n\t}\n\n};\n// ...\nVector2D v1(1,3), v2(1,1), v3(1,7);\nVector2D v4 = (v1 + v3) * 5;\ndouble scalar = v4 * v2;'}</Syntax>

				<h5>Globális operátor túlterhelés</h5>
				<p>A C++ lehetőséget biztosít bármilyen két típus közötti operátor túlterhelésére, melyeket függvényekhez hasonlóan hajthatunk végre.</p>
				<Syntax>{'// Általánosan\nVisszaTípus operatorX(BalOperandusTípus lhs, JobbOperandusTípus rhs);\n\n// Inserter operátor saját osztályhoz\nstd::ostream& operator<<(std::ostream& os, const Vector2D& v){\n\tos << \'(\' << v.x << \',\' << v.y << \')\';\n\treturn os;\n}'}</Syntax>

				<h5>Speciális metódusok</h5>
				<p>Ha nem terheljük túl őket, akkor léteznek olyan speciális metódusok, melyek alapértelmezetten létrejönnek az objektumokkal.</p>
				<Block type='important'>
					<b>Konstruktor: </b> Egy példány létrehozásakor lefutó metódus (Jelölés: Az osztály nevével megegyező metódus)<br/>
					<b>Destruktor: </b> Egy példány megszűnésekor lefutó metódus (Jelölés: ~ jel majd osztály nevével megegyező metódus)<br/>
					<b>Másoló konstruktor: </b> Egy olyan konstruktor, mely során egy másik példány adatait másoljuk át a mi példányunknak<br/>
					<b>Értékadó operátor: </b> A mi már <b>létező</b> példányunk adatait szeretnénk felülírni egy másik példány adataival<br/>
					<b>* és & operátor: </b> Dereferálás és pointerképzés
				</Block>
				<p>Ezen metódusokkal a következő fejezetben részletesen is foglalkozunk.</p>
				<Syntax>{'class Rectangle {\n\tint width, height;\n\n\tpublic:\n\t// Konstruktor - visszatérés nélküli, a neve az osztály neve\n\tRectangle() { width = 0; height = 0; }\n\tRectangle(int w, int h) { width = w; height = h; }\n\tRectangle(int size) { width = size; height = size; }\n\t// Destruktor  - visszatérés nélküli, az osztálnév elé tett ~ jelöli\n\t// Erőltetett példa -> a következő fejezetekben használjuk érdekesebb dolgokra is\n\t~Rectangle() { a = -1; b = -1; }\n};\n// ...\nRectangle r1(1), r2(1,2);\t// Ha ezt írjuk lefut a megfelelő konstruktor\nRectangle r3(r1);\t\t\t// Másoló konstruktor\nr3 = r2;\t\t\t\t\t// Értékadó operátor\nRectangle* pr1 = &r1;\t\t// Pointerképzés'}</Syntax>
			</Container>
		);
	}
}

