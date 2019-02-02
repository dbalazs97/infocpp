import React, {Component} from 'react';
import {BottomLessonChanger, PageHeader, Syntax} from "../../StyleComponents";
import {Container} from 'semantic-ui-react-single/Container';

export default class Lesson1 extends Component {
	render() {
		return (
			<Container>
				<PageHeader icon='book'>1: C és C++ eltérések</PageHeader>
				<BottomLessonChanger current={1} title={'Alapok'}/>

				<p>Ebben a fejezetben a C nyelvről a C++ nyelvre való áttérést vezetjük végig lépésről lépésre. Megismerkedünk a különbségekkel és újdonságokkal.</p>
				<hr/>

				<h5>Logikai típus</h5>
				<p>A C++ alapértelmezetten tartalmazza a logikai típust, melynek csak két értéke lehet <b>true</b> vagy <b>false</b>.</p>
				<p>Típuskonverziónál a 0 érték <b>false</b> lesz minden más <b>true</b>.</p>
				<Syntax>
					{`bool a = false;\na = 3; // a ilyenkor true értéket kap`}
				</Syntax>

				<h5>Struktúrák</h5>
				<p>A struktúrák a C nyelvtől eltérően azonnal típusként értelmeződnek, tehát később nem kell a <b>struct</b> vagy a <b>typedef</b> kulcsszót használni.</p>
				<small>Később látni fogjuk, hogy a struktúrák egyéb tulajdonságokat is szereztek.</small>
				<Syntax>{`struct ListaElem {\r\n\tint adat;\r\n\tListaElem* kovetkezo; // nincs sz\u00FCks\u00E9g a struct kulcssz\u00F3ra\r\n};`}</Syntax>

				<h5>Konstansok</h5>
				<p>Egy konstans változó értékét <b>csak egyszer lehet</b> megadni, onnantól kezdve értéke csak olvasható. A C++-ban konstans változót a típusnév elé írt <b>const</b> kulcsszóval lehet létrehozni.</p>
				<p>Pointer típusoknál mindig a <b>const</b> kulcsszó utáni objektum lesz nem módosítható.</p>
				<p>A konstansok pointeren vagy függvényen keresztül sem módosíthatóak.</p>
				<Syntax>{`int const a = 5;\t// Az a v\u00E1ltoz\u00F3 csak olvashat\u00F3, \u00E9rt\u00E9ke 5\r\nconst int a = 5;\t// Ugyanaz mint a fels\u0151, a C-s kompatibilit\u00E1s miatt haszn\u00E1lhat\u00F3\r\nconst char* p;\t\t// A p \u00E1ltal mutatott \u00E9rt\u00E9k nem v\u00E1ltozhat\r\nchar* const p;\t\t// A p-ben t\u00E1rolt c\u00EDm nem v\u00E1ltozhat`}</Syntax>

				<h5>Felsorolás típus</h5>
				<p>A felsorolás típus szigorúbb C++-ban. Egy felsorolás típusú változó értékeire nem lehet a megfelelő számértékkel hivatkozni. Csakis valamelyik felsorolt elem vagy a tömbszerű eléréssel hivatkozhatók.</p>
				<p>Csakúgy mint a struktúrák, a felsorolás típusú változók is automatikusan típusként értelmezendőek.</p>
				<Syntax>{`enum Szamok {\r\n\tNULLA, EGY, KETTO, HAROM, TIZENOT = 15\r\n};\r\n\r\nSzamok a = 2;\t\t\t// Ford\u00EDt\u00E1si hiba - \u00EDgy nem lehet hivatkozni\r\nSzamok b = KETTO;\t\t// M\u0171k\u00F6dik - felsorolt elem\r\nSzamok c = Szamok(2);\t// M\u0171k\u00F6dik - t\u00F6mbszer\u0171 megad\u00E1s\r\nSzamok d = Szamok(19); \t// Lefordul - meghat\u00E1rozatlan \u00E9rt\u00E9k (szemantikai hib\u00E1hoz vezethet)`}</Syntax>

				<h5>Referencia típus</h5>
				<p>A referencia típus egy már létező változónak ad egy alternatív nevet. Így ugyanarra a memóriaterületre többféle névvel is hivatkozhatunk. Emiatt <b>kötelező</b> értéket adni deklaráláskor.</p>
				<p>Ezt például függvényparaméter átadáskor ki lehet használni, mivel nem kell pointereket alkalmazni &rarr; egyszerűsödik a kód.</p>
				<p>Referencia típust deklarálni a típusnév után tett <b>&amp;</b> jellel lehet. Változóból referenciát képezni pedig a változónév elé tett <b>&amp;</b> jellel lehet.</p>
				<Syntax>{`void inc(int& x) {\t// Referencia t\u00EDpus \u00E1tv\u00E9tele\r\n\tx++; \t\t\t// Csak a referencia nev\u00E9vel hivatkozunk f\u00FCggv\u00E9nyen bel\u00FCl\r\n}\r\n// ...\r\nint a = 10;\r\nint& b;\t\t// Ford\u00EDt\u00E1si hiba - inicializ\u00E1latlan referencia t\u00EDpus\r\nint& c = a; // M\u0171k\u00F6dik - mostant\u00F3l a \u00E9s c ugyanarra a mem\u00F3riater\u00FCletre mutat\r\ninc(c);\t\t// Nincs sz\u00FCks\u00E9g referencia k\u00E9pz\u00E9sre`}</Syntax>

				<hr/>

				<h5>Inline kód</h5>
				<p>A C nyelv makrói veszélyesek, mivel nagyon könnyen szemantikai hibát okozhatnak. (Például a rossz zárójelezés, mellékhatások figyelmen kívül hagyása, stb.)</p>
				<p>Ezt a problémát oldja meg az inline függvények bevezetése, melyek ugyanúgy behelyettesítődnek a kódba mint a makrók, viszont mivel függvények, ezért garantált a paraméterek kiértékelődése az átadás előtt (szekvencia pont)<sup>*</sup>.</p>
				<p>Inline függvényt a függvény visszatérési típusa elé tett <b>inline</b> kulcsszóval lehet létre hozni.</p>
				<Syntax>{`inline int add(int a, int b) {\n\treturn a + b;\n}\n//...\nint x = add(6, 4);`}</Syntax>
				<small>* - Az inline függvények igazából csak hintek a fordítónak; dönthet úgy a fordító, hogy azokat mégis függvényként kezeli.</small>

				<h5>Függvénytúlterhelés</h5>
				<p>A C++-ban ugyanaz a globális függvénynév többször is szerepelhet, ha különbözik a <b>paraméterlistája</b>.</p>
				<p>Ez akkor hasznos, ha szeretnénk a függvényünket eltérő típusú paraméterekkel használni, de szeretnénk közös névvel hivatkozni rá (generikusan használni őket).</p>
				<Syntax>{'int min(int a, int b);\t\t\t// "Eredeti" függvény\ndouble min(double a, double b);\t// Double túlterhelés\nchar min(char a, char b);\t\t// Char túlterhelés\nint min(char a, char b);\t\t// Fordítási hiba - Nem elég a visszatérési érték eltérése\n//...\nint x = min(5, 4);\t\t\t\t// Működik - Az "eredeti" változat hívódik meg\ndouble y = min(5, 4);\t\t\t// Működik - A castolás megtörténik\nint z = min(5.4, \'a\');\t\t\t// Hiba - Több függvénynek is megfelel a paraméterlista'}</Syntax>

				<h5>Alapértelmezett paraméter</h5>
				<p>A függvényparamétereknek lehet alapértelmezett értéke, amit - ha függvényhíváskor nem volt megadva - behelyettesíti paraméter értékeként a fordító.</p>
				<p>Ilyen paraméterek csak a paraméterlista végén szerepelhetnek.</p>
				<Syntax>{'void printStringMultipleTimes(const char* str, int times = 1);\n//...\nprintStringMultipleTimes("abc", 5);\t// Ilyenkor - mivel meg van adva  - times értéke 5\nprintStringMultipleTimes("def");\t// Ilyenkor - mivel nincs megadva - times értéke 1'}</Syntax>

				<hr/>

				<h5>Névterek</h5>
				<p>A névterek változókat és függvényeket tartalmaznak. A névtér úgymond egy "címkét" ragaszt a benne lévő elemekre, ami jelzi, hogy hozzá tartoznak. Éppen ezért a benne tárolt elemekre csak az őt tartalmazó névtér nevével hivatkozhatunk. Ezzel elkerülhető az esetleges névütközés, ugyanis lehet két azonos nevű változó/függvény eltérő névtérben.</p>
				<p>Névteret a <b>namespace</b> kulcsszóval hozhatunk létre. Névtérbeli elemet a <b>::</b> scope operátorral érhetünk el <b>Névtér::Elem</b> formátumban.</p>
				<Syntax>{'namespace Test {\n\tint a, b;\n\tchar* c;\n\tvoid d(int e, double f); // Névtéren belüli függvény\n}\n// ...\nint d(char g);\t\t\t\t // Névtéren kívüli függvény\n// ...\nd(\'h\');\t\t\t\t\t\t // A külső függvény hívódik\nTest::d(4, 7.5);\t\t\t // A belső függvény hívódik'}</Syntax>

				<h5>Névterek megnyitása</h5>
				<p>A névterek elemeit akár el is érhetjük a "címkéjük" nélkül, ha azt megengedjük a fordítónak. Ezzel rövidebb, átláthatóbb kódot kapunk, de így fenn áll a veszély, hogy névütközéssel szembesülünk. (éppen ezért nem javasoljuk ezen funkció használatát, mi sem alkalmazzuk a példakódok során)</p>
				<p>Névteret megnyitni a <b>using</b> direktívával lehet. Ha utána a <b>namespace</b> kulcsszó és egy névtér neve áll, akkor az egész névteret megnyitjuk. Viszont, ha egy <b>Névtér::Elem</b> alak áll, akkor csak azt a bizonyos elemet nyitjuk meg. A megnyitás mindig a nyitás blokkjában érvényes, tehát ha a fájl elejére írjuk, akkor az egész fájlban megnyitjuk a névteret.</p>
				<Syntax>{'namespace Test {\n\tint a, c;\n}\n\nnamespace Test2 {\n\tint b, d;\n}\n// ...\nusing namespace Test; // Az egész Test névtér megnyitása\nusing Test2::b;\t\t  // Csak a Test2 névtér b változójának megnyitása\na = 6;\tb = 7;\t\t  // A megynitott változók lokális változóként használhatóak\nTest::a = 8;\t\t  // A megnyitás ellenére a régi alak is használható'}</Syntax>

				<h5>Az std névtér</h5>
				<p>Ebben a névtérben található a C++ Standard Library függvényei, konstansai és egyéb elemei. Többek között a Standard I/O. Ez a névtér több header fájlban van definiálva azért, hogy mindig csak az éppen nekünk kellő könyvtárelemet helyezzük el a programunkban.</p>
				<small>A Standard Library elemeiről itt találsz referenciát: <a href="http://www.cplusplus.com/reference/" target="_blank" rel="noopener noreferrer">C++ Std Reference</a></small>

				<h5>Standard I/O</h5>
				<p>A Standard I/O elemeit az <b>iostream</b> nevű fejlécben található, ahol úgynevezett streamek találhatóak. Ezek közül a legfontosabbak:</p>
				<p><b>std::cin</b> - Console Input, azaz a billentyűzetről olvasás</p>
				<p><b>std::cout</b> - Console Output, azaz a képernyőre írás</p>
				<p><b>std::cerr</b> - Console Error, azaz a hibakimenet</p>
				<p>Velük a <b>&gt;&gt;</b> és a <b>&lt;&lt;</b> operátorokkal lehet kommunikálni. Az operátor bal oldalán a stream található, jobb oldalán pedig gyakorlatilag bármilyen típusú változó vagy literál. Ezen operátorok egymás után láncolhatók.<sup>*</sup></p>
				<Syntax>{'#include <iostream>\n//...\nint a;\nstd::cout << "Hello World" << std::endl;\t\t// String literál kiírása, az endl az új sor\nstd::cout << "3 + 4 =" << 3 + 4 << std::endl;\t// Szám literál kiírása\nstd::cin  >> a;\t\t\t\t\t\t\t\t\t// Beolvasás a-ba a billentyűzetről\nstd::cout << "You typed: " << a << std::endl;\t// Változó kiírása\nstd::cerr << "Fatal error" << std::endl;\t\t// Hiba kiírása'}</Syntax>
				<small>* - Mivel a streamek ezen operátorai önmagukkal térnek vissza a meghíváskor</small>

				<h5>Dinamikus memóriakezelés</h5>
				<p>A C++-ban biztonságos a dinamikus memória kezelés, mivel nincs szükség a <b>void*</b> típusú pointerek castolására.</p>
				<p>Ha egy bizonyos típusú változóból a (heap) memóriában a <b>new</b> kulcsszóval foglalhatunk, melyet felszabadítani a <b>delete</b> kulcsszóval kell.</p>
				<p>Ha egy bizonyos típusú változóból egy tömböt szeretnénk foglalni, akkor a <b>new[ ]</b> kulcsszóval foglalhatunk, melyet felszabadítani a <b>delete[ ]</b> kulcsszóval kell.</p>
				<Syntax>{'// A ListItem egy láncolt listaelem struktúra\nListItem* item = new ListItem; // Egy ListItem lefoglalása\nchar* str = new char[50];\t   // Egy 50 karakter méretű tömb foglalása\n// ...\ndelete item;\t\t\t\t   // Egy elem felszabadítása\ndelete[] str;\t\t\t\t   // Több elem felszabadítása\n\n// Ezek C megfelelői (ezek C++-ban is használhatók std:: jelöléssel):\nListItem* item = (ListItem*) malloc(sizeof(ListItem));\nchar* str= (char*) malloc(50 * sizeof(char));\n// ...\nfree(item);\nfree(str);'}</Syntax>

				<h5>Kivételkezelés</h5>
				<p>A programozás során gyakran van szükség arra, hogy ha valamilyen hiba történik a programmal azt érzékeli tudjuk és valamit tudjunk kezdeni bekövetkezésük esetén.</p>
				<p>Ezen témakörrel foglalkozik a kivételkezelés. Kivételnek nevezzük, ha valahol egy programrész nem megfelelően fut le és azt jelzi.</p>

				<p>Ilyen kivételeket bármilyen függvény dobhat a <b>throw</b> kulcsszóval, mely után bármilyen literál kerülhet.</p>

				<p>A kivételeket detektálni is tudjuk a programunkkal:</p>

				<ul>
					<li>A vizsgálandó részt a <b>try</b> kulcsszó utáni blokkba helyezzük el.</li>
					<li>Az egyes kivételek lekezelését a <b>catch</b> kulcsszó utáni blokkba helyezzük el. A <b>catch</b> után meg kell adnunk, hogy milyen típusú hibát szeretnénk kezelni.</li>
					<li>Több <b>catch</b> blokk is elhelyezhető egymás után.</li>
					<li>Ha <b>catch</b> után <b>...</b>-ot teszünk azzal bármilyen hibát elkaphatunk, de így nem tudjuk változóként kezelni.</li>
				</ul>

				<small>Léteznek az ún. szabványos kivételek, melyeket az STD függvények képeznek. A szabványos kivételekről itt olvashatsz: <a href="http://www.cplusplus.com/reference/exception/exception/" rel="noopener noreferrer" target="_blank">CPP exception reference</a><br/></small>
				<small>Az OOP bevezetése után a kivételkezeléssel részletesebben is foglalkozunk a 9. leckében.</small>
				<Syntax>{'double divide(double a, double b) {\n\tif(b == 0) throw "Division by zero";\n\treturn a / b;\n}\n\nvoid quadratic(double a, double b, double c, double& x1, double& x2) {\n\tdouble d = b * b - 4 * a * c;\n\n\tif(d < 0)\n\t\tthrow "Negative discriminant";\n\telse if(d == 0)\n\t\tx1 = x2 = divide((-1 * b), (2 * a));\n\telse {\n\t\tx1 = divide((-1 * b + sqrt(d)),  (2 * a));\n\t\tx2 = divide((-1 * b - sqrt(d)),  (2 * a));\n\t}\n}\n//...\ndouble x, y;\ntry {\n\tquadratic(1, 2, 1, x, y);\t// OK\n\tquadratic(0, 1, 1, x, y);\t// Hiba - 0-val osztás &rarr; megfelelő catch lefut\n\tquadratic(1, 1, 1, x, y);\t// Már nem fut le, de Hiba - Negatív diszkrimináns\n\tquadratic(1, 3, 1, x, y);\t// Már nem fut le, de OK\n}\ncatch(const char* error) {\t\t\t// Ha a try blokkban ilyen típusú hiba volt ez fut le\n\tstd::cerr << error; \t\t\t// Írjuk ki a kapott hibát\n}'}</Syntax>
			</Container>
		);
	}
}

