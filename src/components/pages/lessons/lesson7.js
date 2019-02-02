import React, {Component} from 'react';
import {Block, BottomLessonChanger, PageHeader, SVG, Syntax} from "../../StyleComponents";
import {Container} from 'semantic-ui-react-single/Container';

import IterSVG from '../../../img/iter.svg';

export default class Lesson7 extends Component {
	render() {
		return (
			<Container>
				<PageHeader icon='book'>7: Iterátorok</PageHeader>
				<BottomLessonChanger current={7} title={'Iterátorok'}/>

				Ebben a fejezetben tovább boncolgatjuk a genericitás témakörét. Arra adunk megoldást, hogy hogyan lehet bejárni egy tárolót anélkül, hogy ismernénk a belső szerkezetét.
				<hr/>
				<h5>Iterátorok fogalma</h5>
				<p>Ha valamilyen adattároló struktúrát használunk (Lásd 9. fejezet) szükségünk lehet arra, hogy kívülről a struktúra elemeit elérhessük úgy, hogy közben nem fedjük fel a struktúra belső szerkezetét, méretét vagy memória beli elhelyezkedését. Ezzel biztosítjuk azt, hogy bármilyen tárolót sorrendben bejárhassunk (&rarr; generikus).</p>

				<h6>Belső osztály</h6>
				<p>Az iterátorok implementálásához szükséges bevezetni a belső osztály fogalmát.</p>
				<Block type={'important'}><b>Belső osztály: </b> Egy olyan osztály mely más osztályon belül van definiálva. Más nyelvektől eltérően a belső osztály nem látja a külső osztály adattagjait.</Block>
				<Syntax>{'class Outer {\n\tclass Innner{ };\n};'}</Syntax>

				<h6>Implementáció</h6>
				<p>Minden tárolóban van egy <b>iterator</b> nevű belső osztály, melyet ha példányosít valaki, akkor bejárhatja a struktúrát. A belső osztályok tulajdonsága miatt (lásd fent) az <b>iterator</b> osztály tárol egy pointert az éppen aktuálisan bejárandó elemre. Ezentúl legalább a következő metódusok szükségesek:</p>
				<ul>
					<li><b>Konstruktor:</b> A konstruktorban megkapjuk a kezdőelem címét.</li>
					<li><b>operator++:</b> A következő elemre lépés</li>
					<li><b>operator==, operator!=:</b> Két elem összehasonlítása</li>
					<li><b>operator*:</b> Az aktuális elem dereferálása</li>
				</ul>
				<p>A külső osztályban pedig van egy <b>begin()</b> és <b>end()</b> metódust, melyek a szerkezet első és utolsó <b>utáni</b> elemére ad vissza egy iterátort.</p>

				<Syntax>{'template<typename T>\nclass IterableArray {\n\tsize_t size;\n\tT* data;\n\n\tpublic:\n\tIterableArray(size_t length = 0): size(length), data(new T[size]) { }\n\t~IterableArray() { delete[] data; }\n\tsize_t length() { return size; }\n\n\tT& operator[](size_t index) { return data[index]; }\n\tconst T& operator[](size_t index) const { return data[index]; }\n\n\t// Iterátor belső osztály\n\tclass iterator {\n\t\tT* pointer;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// Az aktuális elem pointere\n\t\tpublic:\n\t\titerator(T* ptr) : pointer(ptr) { }\t\t\t\t\t\t\t\t\t\t\t// Konstruktorban megkapjuk a kezdőcímet\n\t\tT& operator*() { return *pointer; }\t\t\t\t\t\t\t\t\t\t\t// Dereferáljuk az aktuális elemet\n\t\titerator operator++() { pointer++; return *this; }\t\t\t\t\t\t\t// Prefix inkremetálás: ++it használatához\n\t\titerator operator++(int) { iterator i = *this; pointer++; return i; }\t\t// Postfix inkrementálás: it++ használatához\n\t\tbool operator==(const iterator& rhs) { return pointer == rhs.pointer; }\t\t// Két iterátor összehasonlítása\n\t\tbool operator!=(const iterator& rhs) { return pointer != rhs.pointer; }\t\t// Két iterátor negált összehasonlítása\n\t};\n\n\titerator begin() { return iterator(data); }\t\t\t\t\t\t\t\t\t\t// Első elem iterátora\n\titerator end() { return iterator(data+size); }\t\t\t\t\t\t\t\t\t// Utolsó utáni elem iterátora\n};\n//...\nstd::srand(std::time(0));\nIterableArray<int> arr(30);\nfor(IterableArray<int>::iterator it = arr.begin(); it != arr.end(); it++) {\t\t\t// Végigiterálunk a tömbön begin() → end()\n\t*it = std::rand();\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// Dereferáljuk az aktuális elemet → elérjük az elemet\n\tstd::cout << *it << \'\n\';\n}'}</Syntax>

				<h5>Iterátorok használata</h5>
				<p>Az iterátorokat általában arra használjuk, hogy ha egy tárolót kell átadni paraméterként, akkor ne kelljen "beleégetni" a tömb méretét a paraméterlistába. A megoldás az, hogy kérünk egy első és egy utolsó utáni iterátort, majd azzal bejárjuk a szerkezetet. Ez a módszer nagyon hasznos, ugyanis ha átméretezzük a tömböt, akkor is működni fog ugyanaz a kód.</p>
				<p>Az iterátor típusát sablonként adjuk meg, így akár egy C stílusú tömböt is használhatunk mint iterátor.</p>
				<Syntax>{'struct isEven { bool operator()(int a) { return (a % 2) == 0; } };\n\n// Megszámlálja az It típusú iterátorral megadott struktúrából, F típusú predikátumnak megfelelő elemeket\ntemplate<typename It, typename F>\nsize_t count(It first, It last, F comp) {\n\tsize_t ret = 0;\n\tfor (; first != last; ++first)\n\t\tif (comp(*first))\n\t\t\tret++;\n\treturn ret;\n}\n//...\nint arr[] = { 1, 2, 3, 4, 5, 6 };\nIterableArray<int> vec(10);\n// ... vec feltöltése\nstd::cout << count(vec.begin(), vec.end(), isEven()) << std::endl;\t// A begin és end metódus visszaadja vec elejét és végét\nstd::cout << count(arr, arr+6, isEven());\t\t\t\t\t\t\t\t\t// Tömb is használható, mint iterátor'}</Syntax>

				<Block type="modern">
					<h5>Iterátorok fajtái</h5>
					<p>A C++ tovább finomítja az iterátorok fogalmát. A különböző implementálású tárolók (lásd 9. fejezet) különböző hozzáférési módokat engednek meg az adataikhoz (például láncolt listán csak előre lehet menni, hátra nem).</p>
					<p>Ezért az iterátorokat 5 kategóriába sorolták a rajtuk végezhető műveletek alapján.</p>
					<ul>
						<li><b>Input:</b> Az aktuális elem olvasható</li>
						<li><b>Output:</b> Az aktuális elem írható</li>
						<li><b>Forward:</b> A struktúrát be lehet járni előre</li>
						<li><b>Bidirectional:</b> A struktúrát előre és hátra is be lehet járni</li>
						<li><b>Random access:</b> A struktúrában tetszőleges helyre ugorhatunk (~ tömbindexezés)</li>
					</ul>
					<p>Az iterátorok hierarchiája és a rajtuk végezhető műveletek:</p>
					<SVG src={IterSVG}/>
					<p>További kategória még a konstans iterátor mely az Output iterátoron kívül bármelyik lehet; ezen iterátor elemei csak olvashatók. A tárolónak van <b>cbegin()</b> és <b>cend()</b> metódusa.</p>
					<p>
						<small>Ezek megvalósítását nem részletezzük, ugyanis kézzel ritkán írunk tárolót/iterátor (lásd 9. fejezet). Az ott megismert tárolóknál jelezzük a megfelelő iterátort.</small>
					</p>
				</Block>
			</Container>
		);
	}
}

