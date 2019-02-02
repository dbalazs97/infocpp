import React, {Component} from 'react';
import {Block, BottomLessonChanger, PageHeader, SVG, SVGTable, Syntax} from "../../StyleComponents";
import {Container} from 'semantic-ui-react-single/Container';
import {Table} from 'semantic-ui-react-single/Table';

import DiamondSVG from '../../../img/diamond.svg';
import VirtualSVG from '../../../img/virtual.svg';
import VirtualGIF from '../../../img/virtual.gif';

import SerializationDAGSVG from '../../../img/seri-dag.svg';
import SerializationGeneralSVG from '../../../img/seri-general.svg';
import SerializationTreeSVG from '../../../img/seri-tree.svg';

export default class Lesson8 extends Component {
	render() {
		return (
			<Container>
				<PageHeader icon='book'>8: Többszörös öröklés, szerializáció</PageHeader>
				<BottomLessonChanger current={8} title={'Többszörös öröklés'}/>

				Ebben a fejezetben a több alaposztályból való öröklésről és az objektumok perzisztenciájáról lesz szó.
				<hr/>

				<h5>Többszörös öröklés</h5>
				<p>Többszörös öröklésről akkor beszélünk, amikor egy leszármazott osztálynak több ősosztálya is van. Általában akkor használjuk őket, amikor egy osztálynak többféle objektum viselkedésével is kell rendelkeznie.</p>
				<Block type={'important'}>Az öröklésnél az alaposztályokat vesszővel elválasztva soroljuk fel. Minden alaposztálytól egyedi láthatósággal örökölhetünk.</Block>

				<Block type="example">
					<Syntax>{'struct A {\n\t A() { std::cout << "CONST A "; }\n\t~A() { std::cout << "DESTR A "; }\n};\n\nstruct B {\n\t B() { std::cout << "CONST B "; }\n\t~B() { std::cout << "DESTR B "; }\n};\n\nstruct C: public B, public A {\n\t C() { std::cout << "CONST C "; }\n\t~C() { std::cout << "DESTR C "; }\n};\n//...\nC c;\n// Output:\n// CONST B CONST A CONST C DESTC C DESTC A DESTC B'}</Syntax>
					<p>Mint látható a konstruktorok az öröklés sorrendjében, míg a destruktorok fordítva futnak le.</p>
				</Block>

				<h5>Diamond problem</h5>
				<p>A többszörös öröklés során a diamond problem akkor lép fel, ha egy osztály több olyan osztálytól örököl, melyek közös alaposztályból származnak.</p>
				<SVG src={DiamondSVG}/>

				<Syntax>{'struct Person {\n\tstd::string name;\n\tPerson(std::string name = "noname") : name(name) { std::cout << "Person CTR\n"; }\n};\n\nstruct Teacher : public Person {\n\tint ID;\n\tTeacher(std::string name, int id) : Person(name), ID(id) { }\n};\n\nstruct Student : public Person {\n\tstd::string neptun;\n\tStudent(std::string name, std::string neptun) :  Person(name), neptun(neptun) { }\n};\n\nstruct Demonstrator : public Teacher, public Student {\n\tDemonstrator(std::string name, std::string neptun, int id) : Teacher(name, id), Student(name, neptun) { }\n};\n//...\nDemonstrator db("Doka Balazs", "ABC123", 35);\n\nstd::cout << db.name << \'\\n\';\t\t\t\t\t\t\t\t\t\t// Fordítási hiba: kétértelműség a névben\nstd::cout << db.Teacher::name << \'-\' << db.Student::name << \'\\n\';\t// Explicit név: a kettő akár lehetne más is!'}</Syntax>

				<p>Mint látható a <b>db</b> példánynak két példányban létezik a <b>Person</b> alaposztálybeli neve: egy a <b>Teacher</b> és egy a <b>Student</b> osztályokból. Ez problémás mivel, nem tudunk a nevére hivatkozni és így a két irányból akár más neve is lehetne.</p>

				<h5>Virtuális öröklés</h5>
				<p>A diamond problem feloldására találták ki a virtuális öröklés, mely során kijelentjük, hogy ha valaki a virtuális leszármazottakból származik le többszörösen, akkor a virtuális alaposztály csak egy példányban jön létre.</p>
				<Block type={'important'}>
					<b>Virtuális öröklés</b> az öröklés listán az alaposztály láthatósága elé tett <b>virtual</b> kulcsszóval hozható létre.<br/>
					Virtuális öröklés során, ha a virtuális leszármazottak leszármazottjai nem hívják meg explicite a virtuális ősosztály konstruktorát, akkor a default konstruktor fut le.
				</Block>
				<Block type="example">A fenti példában a <b>Student</b> és a <b>Teacher</b> osztály fog virtuálisan örökölni a <b>Person</b> osztályból. Így a <b>Person-ból</b> csak egy példány fog keletkezni.</Block>
				<SVG src={VirtualSVG}/>
				<Block type="example">
					<p>Az alábbi kódban látszik a virtuális öröklés lényege. A Demonstrator osztálynak háromfajta megoldását adtuk meg:</p>
					<ul>
						<li><b>A:</b> A <b>Teacher</b> és <b>Student</b> osztály konstruktorát ugyanazzal a névvel hívtuk meg &rarr; a név <i>undefined</i></li>
						<li><b>B:</b> A <b>Teacher</b> és <b>Student</b> osztály konstruktorát különböző a nevekkel hívtuk meg &rarr; a név <i>undefined</i></li>
						<li><b>C:</b> A <b>Person</b> konstruktorát explicite hívtuk meg, a <b>Teacher</b> és <b>Student</b> osztály konstruktorát üres névvel hívtuk meg &rarr; a név a <b>Person</b> konstruktorában megadott lett</li>
					</ul>
					<Syntax>{'struct Person {\n\tstd::string name;\n\tPerson(std::string name = "undefined") : name(name) { }\n};\n\nstruct Teacher : virtual public Person {\n\tint ID;\n\tTeacher(std::string name, int id) : Person(name), ID(id) { }\n};\n\nstruct Student : virtual public Person {\n\tstd::string neptun;\n\tStudent(std::string name, std::string neptun) :  Person(name), neptun(neptun) { }\n};\n\nstruct DemonstratorA : public Teacher, public Student {\n\tDemonstratorA(std::string name, std::string neptun, int id) : Teacher(name, id), Student(name, neptun) { }\n};\n\nstruct DemonstratorB : public Teacher, public Student {\n\tDemonstratorB(std::string name1, std::string name2, std::string neptun, int id) : Teacher(name1, id), Student(name2, neptun) { }\n};\n\nstruct DemonstratorC : public Teacher, public Student {\n\tDemonstratorC(std::string name, std::string neptun, int id) : Person(name), Teacher("", id), Student("", neptun) { }\n};\n//...\nDemonstratorA dbA("Doka Balazs", "ABC123", 35);\nDemonstratorB dbB("Doka Balazs", "Boka Dalazs", "ABC123", 35);\nDemonstratorC dbC("Doka Balazs", "ABC123", 35);\n\nstd::cout << dbA.name << \'-\' << dbB.name << \'-\' << dbC.name << \'\\n\';\n// undefined-undefined-Doka Balazs'}</Syntax>
				</Block>
				<hr/>
				<h5>Példányok életciklusa</h5>
				<p>A virtuális öröklés bevezetésével a példányok létrejötté és megszűnésének sorrendje egy non-triviális probléma lett. A sorrend bevezetéséhez szükséges a virtuális tábla fogalma.</p>
				<Block type={'important'}><b>Virtuális tábla:</b> Az példányokon belül egy olyan "rejtett adattag", mely tartalmazza az összes leszármazott virtuális metódusainak pointereit valamint a virtuális alaposztályra mutató pointereket is. (További információ: <a href="https://en.wikipedia.org/wiki/Virtual_method_table">Wikipedia</a>)</Block>
				<Table size={'small'} striped basic>
					<Table.Header fullWidth>
						<Table.Row>
							<Table.HeaderCell>#</Table.HeaderCell>
							<Table.HeaderCell>Folyamat</Table.HeaderCell>
							<Table.HeaderCell>Példa</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell collapsing><b>1.</b></Table.Cell>
							<Table.Cell>Virtuális alaposztályok konstruktorai</Table.Cell>
							<Table.Cell>Person</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><b>2.</b></Table.Cell>
							<Table.Cell>A többi alaposztály konstruktorai a hierarchián felfelé</Table.Cell>
							<Table.Cell>Teacher, Student</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><b>3.</b></Table.Cell>
							<Table.Cell>A virtuális alaposztályok beírása a virtuális táblába</Table.Cell>
							<Table.Cell>Person &rarr; Teacher::VTable, Student::VTable</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><b>4.</b></Table.Cell>
							<Table.Cell>A virtuális metódusok beírása a virtuális táblába</Table.Cell>
							<Table.Cell>-</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><b>5.</b></Table.Cell>
							<Table.Cell>Belső osztályok konstruktorának meghívása</Table.Cell>
							<Table.Cell>-</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell><b>6.</b></Table.Cell>
							<Table.Cell>Saját konstruktor hívása</Table.Cell>
							<Table.Cell>Demonstrator</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
				<SVG src={VirtualGIF}/>
				<p>Az objektum megszűnése a táblázatban lentről felfele történik a konstruktor=destruktor, beírás=törlés helyettesítésekkel.</p>

				<Block type="example">
					A fent említett sorrendből következik, hogy a konstruktorban hívott virtuális metódus nem a leszármazottét hívja hanem a saját metódusát, ugyanis a konstruktorhívás előbb fut le mint hogy a virtuális tábla létrejön.
					<Syntax>{'struct A {\n\tA() { foo(); }\n\tvirtual void foo() { std::cout << "A::foo\n"; }\n};\n\nstruct B : public A {\n\tvoid foo() { std::cout << "B::foo\n"; }\n};\n//...\nB b; // A::foo'}</Syntax>
				</Block>
				<hr/>
				<h5>Típuskonverzió</h5>
				<p>A heterogén kollekciónál megismertük, hogy a példányok pointerei milyen módon kompatibilisek. Az virtuális öröklések bevezetésével most lehetőség nyílik a pointerek egymásba való alakítására. Ez a folyamat a típuskonverzió.</p>
				<p>A C nyelvből megismert explicit castolást főleg alapvető típusoknál (fundamental data types) alkalmazzuk, ugyanis nem mindig biztosít védelmet a konverzió sikerességét tekintve.</p>
				<p>Ezért C++-ban bevezettek 4 féle konverziós operátort.</p>
				<Block type={'important'}>
					<b>Típuskonverzió (cast):</b> Egy pointer<sup>*</sup> átalakítása egy másik pointerré.<br/>
					<b>Upcast:</b> Amikor leszármazott típusról konvertálunk alaposztályra. <br/>
					<b>Downcast:</b> Amikor alaposztálybeli típusról konvertálunk leszármazottra. (Általában akkor használjuk, ha biztosan tudjuk, hogy a cél az leszármazottja a forrásnak. pl. Heterogén kollekció)
				</Block>

				<small>* - Ritkábban szokás referenciákat is konvertálni.</small>

				<hr/>
				<h5>dynamic_cast</h5>
				<p>A pointerek kompatibilitását fordítási és futásidőben is ellenőrzi, értve ezalatt azt, hogy a konvertálandó pointer teljes és érvényes a céltípussal szemben.</p>
				<Block type={'important'}><Syntax>{'Forrás* forrás;\nCél* c = dynamic_cast<Cél*>(forrás);'}</Syntax></Block>
				<p><b>Upcast:</b> Ha kompatibilisek, akkor minden akadály nélkül.</p>
				<p><b>Downcast:</b> Csak akkor lehetséges ha a forrás osztály <b>polimorf</b> (van virtuális metódusa), ugyanis csak ebben az esetben lehetséges a futásidejű ellenőrzés.</p>
				<Block type="example"><b>Tipp:</b> Használjunk virtuális destruktort mindenhol, így mindig polimorf lesz az osztályunk.</Block>
				<Syntax>{'class Base { virtual ~Base() {} };\nclass Derived : public Base { };\n//...\nBase* base = new Base;\nBase* mixed = new Derived;\n\nDerived* d1 = dynamic_cast<Derived*>(base);\t// Hiba: nem teljes az osztály\nDerived* d2 = dynamic_cast<Derived*>(mixed);\t// Sikeres, mivel teljes és érvényes'}</Syntax>

				<hr/>
				<h5>static_cast</h5>
				<p>A pointerek kompatibilitását csak fordításidőben ellenőrzi, vagyis csak az érvényességüket a teljességüket nem (azt a programozóra bízza). </p>
				<Block type={'important'}><Syntax>{'Forrás* forrás;\nCél* c = static_cast<Cél*>(forrás);'}</Syntax></Block>
				<Syntax>{'class Base { virtual ~Base() {} };\nclass Derived : public Base { };\n//...\nBase* base = new Base;\nBase* mixed = new Derived;\n\nDerived* d1 = dynamic_cast<Derived*>(base);\t // Sikeres, mivel nincs a teljesség ellenőrizve (d1 dereferálása futásidejű hibát okozhat!!!)\nDerived* d2 = dynamic_cast<Derived*>(mixed); // Sikeres, mivel teljes és érvényes'}</Syntax>

				<hr/>
				<h5>const_cast</h5>
				<p>Pointerek konstansúságát tudja elvenni / hozzárendelni. Az eredetileg konstans változók továbbra sem lesznek módosíthatók!</p>

				<Block type={'important'}><Syntax>{'A* forrás; const A* cforrás;\n\nA* c  \t\t= const_cast<A*>\t  (cforrás);\nconst A* cc = const_cast<const A*>(forrás);'}</Syntax></Block>

				<Syntax>{'// Konstansság hozzáadása\nint i = 5;\nconst int* j = const_cast<const int*> (&i);\n*j = 6; // Fordítási hiba: nem módosítható típus módosítási kísérlete\n\n// Konstansság elvétele\nconst char* c = "nibba";\nchar* d = const_cast<char*>(c);\nd[2] = \'g\'; // Futásidejű hiba: nem módosítható típus módosítási kísérlete'}</Syntax>

				<hr/>
				<h5><span role={'img'} aria-label={'18+'}>&#x1F51E;</span> reinterpret_cast <span role={'img'} aria-label={'18+'}>&#x1F51E;</span></h5>
				<p>Két tetszőleges pointer egymásba alakítása. Nagyon körültekintően szabad csak használni! Könnyen lehet futásidejű hibát okozni.</p>
				<Block type={'important'}><Syntax>{'A* a;\nB* b = reinterpret_cast<A*>(a);'}</Syntax></Block>
				<hr/>
				<h5>Végszó</h5>
				<p>A típuskonverziós operátorok minidig <b>nullptr</b>-el térnek vissza, ha sikertelen volt a konverzió.</p>
				<hr/>

				<h5>Szerializáció</h5>
				<p>A szerializáció során az objektumainkat olyan szöveges formára hozzuk, mely lementhető (fájlba, memóriába), elküldhető (interneten) vagy melyből később visszaállítható az objektum.</p>
				<p>A C++ nyelv nem biztosít a fejlesztőknek reflexiót, azaz nincsenek tárolva az objektumokról az adattagjaik és metódusaik nevei. Éppen ezért a szerializációt nagyon nehéz implementálni C++-ban.</p>
				<p>Az előadáson bemutatott módszer az volt, hogy létrehozunk egy <b>Serializable</b> interfészt és egy perzisztens osztályt, mely többszörösen örököl a Serializable-ből és a szerializálandó osztályból. Továbbá a szerializálást tetszőleges streamre oldja meg.</p>
				<Syntax>{'struct ISerializable {\n\tvirtual void serialize   (std::ostream& os) = 0;\n\tvirtual void deserialize (std::istream& is) = 0;\n\tvirtual ~ISerializable() { }\n};\n\nclass Person {\n\tprotected:\n\tstd::string name;\n\tint age;\n\n\tpublic:\n\tPerson(std::string name, int age) : name(name), age(age) { }\n\tstd::string getName() const { return name; }\n\tint getAge() const { return age; }\n};\n\nstruct pPerson : public ISerializable, public Person {\n\tpPerson(Person& per) : Person(per) { }\n\n\tvoid serialize(std::ostream& os) {\n\t\tos << age << \'|\' << name.length() << \'|\' << name;\n\t}\n\n\tvoid deserialize(std::istream& is) {\n\t\t(is >> age).ignore(1);\n\t\t\n\t\tsize_t namelen;\n\t\t(is >> namelen).ignore(1);\n\n\t\tstd::string str(namelen, \'0\');\n\t\tis.read(&str[0], namelen);\n\t\tname = str;\n\t}\n};\n//...\nPerson p("Doka Balazs", 20);\npPerson sp(p);\n\nsp.serialize(std::cout);\n//... (program betöltésnél, hálózati küldésnél a vétel oldal, stb.\nsp.deserialize(std::cin);\nstd::cout << sp.getName() << " is " << sp.getAge() << " years old.\n";'}</Syntax>

				<p>Az előadáson csak felületesen érintettétek a témát, de sok lehetőség van a szerializációval kapcsolatban.</p>
				<Block type="modern">
					<p>Vizsgáljuk meg a pointer adattagok szerializációját, ugyanis azokat nem érdemes szerializálni mivel a memóriacím mindig változik, így valamilyen rekurzív módszerre van szükség, hogy a pointer által mutatott objektum is kiszerializálódjon.</p>
					<p>Ezzel egy gráfelméleti problémához jutunk, ugyanis a pointerek szerializációjából lehetséges felállítani egy irányított <b>szerializációs gráfot</b>. A csúcsok az objektumok, az A&rarr;B akkor él ha A-ban van pointer B-re.</p>
					<p>Alapvetően három fajtája létezik:</p>

					<SVGTable
						src1={SerializationTreeSVG}
						src2={SerializationDAGSVG}
						src3={SerializationGeneralSVG}
						halfWidth
						figcap
					/>

					<p>Ezen gráfok szerializációs sorrendje/módja:</p>
					<ol>
						<li>A fát a gyökértől indulva rekurzívan szerializálhatjuk.</li>
						<li>A DAG-nak egy topologikus sorrendjében lehet szerializálni.</li>
						<li>Valahonnan elkezdjük bejárni és egy listában tároljuk, hogy mit szerializáltunk már, és ha valamit szerializáltunk, azt még egyszer már nem kell.</li>
					</ol>

					<p>Ennek továbbgondolását és implementálását a kedves olvasóra bízzuk.</p>
				</Block>
			</Container>
		);
	}
}

