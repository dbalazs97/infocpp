import React, {Component} from 'react';
import {Block, PageHeader, SVG, SVGTable, Syntax} from "../../StyleComponents";
import {Container} from 'semantic-ui-react-single/Container';
import {Icon} from 'semantic-ui-react-single/Icon';

import DequeSVG from '../../../img/STL/deque.svg';
import ListSVG from '../../../img/STL/list.svg';
import MapSVG from '../../../img/STL/map.svg';
import MultimapSVG from '../../../img/STL/multimap.svg';
import MultisetSVG from '../../../img/STL/multiset.svg';
import PrioritySVG from '../../../img/STL/priority.svg';
import QueueSVG from '../../../img/STL/queue.svg';
import SetSVG from '../../../img/STL/set.svg';
import StackSVG from '../../../img/STL/stack.svg';
import VectorSVG from '../../../img/STL/vector.svg';

export default class Appendix extends Component {
	render() {
		return (
			<Container>
				<PageHeader icon='plus'>Függelék</PageHeader>
				<h5>String osztály</h5>
				<p>A forráskód példaprogrammal letölthető: <a href="https://www.uniforum.hu/download/appendix/string.cpp" download><Icon name={'file'}/> string.cpp</a></p>
				<Syntax>{'class String {\n\tsize_t length;\n\tchar* data;\n\npublic:\n\t// Konstruktorok és destruktor\n\tString(size_t length = 0) \t: length(length),\t\tdata(new char[length+1]) { data[length] = \'0\'; }\n\tString(const char* str)   \t: length(strlen(str)), \tdata(new char[length+1]) { strcpy(data, str); }\n\tString(const String& other) : length(other.length), data(new char[length+1]) { strcpy(data, other.data); }\n\tvirtual ~String () { delete[] data; }\n\n\t// Copy-and-swap\n\tvoid swap(String& other) {\n\t\tstd::swap(data, other.data);\n\t\tstd::swap(length, other.length);\n\t}\n\n\tString& operator= (String other) {\n\t\tswap(other);\n\t\treturn *this;\n\t}\n\n\t// Getterek és setterek\n\tsize_t \t\t getLength()   const { return length; }\n\tchar*  \t\t getPointer()  const { return data; }\n\tconst char*  getCPointer() const { return data; }\n\n\t// Operátorok\n\t// Indexelő\n\tchar& operator[](size_t index) { return data[index]; }\n\tconst char& operator[](size_t index) const { return data[index]; }\n\t\n\t// Castoló\n\toperator char*() const { return data; }\n\n\t// Összefűző\n\tString operator+(const String& other) {\n\t\tString temp(length + other.length);\n\t\tstrcpy(temp.data, data);\n\t\tstrcat(temp.data, other.data);\n\t\treturn temp;\n\t}\n\n\t// Összehasonlító\n\tbool operator==(const String& other) { return (strcmp(data, other.data) == 0); }\n\tbool operator!=(const String& other) { return (strcmp(data, other.data) != 0); }\n\tbool operator< (const String& other) { return (strcmp(data, other.data) <  0); }\n\tbool operator> (const String& other) { return (strcmp(data, other.data) >  0); }\n\tbool operator>=(const String& other) { return (strcmp(data, other.data) >= 0); }\n\tbool operator<=(const String& other) { return (strcmp(data, other.data) <= 0); }\n\n};'}</Syntax>
				<hr/>

				<h5>Vector osztály</h5>
				<p>A forráskód példaprogrammal letölthető: <a href="https://www.uniforum.hu/download/appendix/vector.cpp" download><Icon name={'file'}/> vector.cpp</a></p>
				<Syntax>{'template<class T>\nclass Vector {\n\tsize_t size;\n\tT* array;\n\npublic:\n\t// Kostruktorok és destruktor\n\tVector(size_t size = 0, const T& fill = T()) : size(size), array(new T[size]) { std::fill(array, array+size, fill); }\n\tVector(const Vector& other) : size(other.size), array(new T[size]) { std::copy(other.array, other.array+other.size, array); }\n\ttemplate<typename It> Vector(It first, It last) : size(std::distance(first, last)), array(new T[size]) { std::copy(first, last, array); }\n\tvirtual ~Vector() { delete[] array; }\n\n\t// Copy-and-swap\n\tvoid swap(Vector& other) { std::swap(array, other.array); std::swap(size, other.size); }\n\tVector& operator=(Vector other) { swap(other); return *this; }\n\n\t// Indexelő operátor\n\tT& operator[](size_t idx) { return array[idx]; }\n\tconst T& operator[](size_t idx) const { return array[idx]; }\n\tT& at(size_t idx) { if(idx < size) return array[idx]; else throw std::out_of_range(""); }\n\n\t// Getter és setter\n\tsize_t getSize() const { return size; }\n\n\t// Iterátor (nem vizsgáló!)\n\tclass iterator {\n\t\tT* pointer;\n\tpublic:\n\t\titerator(T* ptr) : pointer(ptr) { }\n\t\tT& operator*() { return *pointer; }\n\t\titerator operator++() { pointer++; return *this; }\n\t\titerator operator++(int) { iterator i = *this; pointer++; return i; }\n\t\tbool operator==(const iterator& rhs) { return pointer == rhs.pointer; }\n\t\tbool operator!=(const iterator& rhs) { return pointer != rhs.pointer; }\n\t};\n\n\titerator begin() { return iterator(array); }\n\titerator end() { return iterator(array + size); }\n};'}</Syntax>
				<hr/>

				<h5>STL tárolók</h5>
				<p>Kétféle tároló létezik: <b>asszociatív</b> és <b>szekvenciális</b>.</p>

				<h6>Asszociatív tárolók</h6>
				<p>Az elemeknek nincs meghatározott sorrendje, az elemek a kulcsuk megadásával érhetők el.</p>
				<p>Asszociatív tárolók: <a href="http://en.cppreference.com/w/cpp/container/set">std::set</a>, <a href="http://en.cppreference.com/w/cpp/container/multiset">std::multiset</a>, <a href="http://en.cppreference.com/w/cpp/container/map">std::map</a>, <a href="http://en.cppreference.com/w/cpp/container/multimap">std::multimap</a></p>

				<h6>Szekvenciális tárolók</h6>
				<p>Az elemeknek van egy meghatározott sorrendje, melyben el lehet érni őket.</p>
				<p>Szekvenciális tárolók: <a href="http://en.cppreference.com/w/cpp/container/list">std::list</a>, <a href="http://en.cppreference.com/w/cpp/container/vector">std::vector</a>, <a href="http://en.cppreference.com/w/cpp/container/deque">std::deque</a>, <a href="http://en.cppreference.com/w/cpp/container/queue">std::queue</a>, <a href="http://en.cppreference.com/w/cpp/container/stack">std::stack</a>, <a href="http://en.cppreference.com/w/cpp/container/priority_queue">std::priority_queue</a></p>

				<hr/>
				<h5>Jelölések a leírásban</h5>
				<Syntax>{'template<K, C, A> class asc; \t// Tetszőleges asszociatív tároló\ntemplate<T, A> \t  class seq;\t// Tetszőleges szekvenciális tároló\n                  class ctn;\t// Tetszőleges tároló (vagy asszociatív vagy szekvenciális)'}</Syntax>
				<ul>
					<li><b>K: </b> A kulcs típusa</li>
					<li><b>C: </b> Az kulcsokat komparáló függvény. (Alapból az <a href="http://en.cppreference.com/w/cpp/utility/functional/less">std::less</a> osztály)</li>
					<li><b>T: </b> Az elemek típusa.</li>
					<li><b>A: </b> Allokátor függvény (általában nem foglakozunk vele)</li>
					<li><b>It:</b> A tárolónak megfelelő iterátor</li>
				</ul>
				<hr/>

				<h5>Közös metódusok</h5>
				<h6>Konstruktor és destruktor</h6>
				<Syntax>{'seq::seq(const A& alloc = A());\t\t\t\t\t\t\t\t\t\t\t\t// 1.\nseq::seq(size_t n, const T& fill = T(), const A& alloc = A()); \t\t\t\t// 2.\nseq::seq(It first, It last, const A& alloc = A());\t\t\t\t\t\t\t// 3.\n\nasc::asc(const C& comp = C(), const A& alloc = A());\t\t\t\t\t\t// 1.\nasc::asc(It first, It last, const C& comp = C(), const A& alloc = A());\t\t// 3.\n\ncnt::cnt(const cnt& other);\t\t\t\t\t\t\t\t\t\t\t\t\t// 4.\ncnt::~cnt();\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// 5.'}</Syntax>

				<ol>
					<li>Az A és C paraméterek beállítása és alapértelmezett konstruktor</li>
					<li>A tároló feltöltése <b>n</b> darab elemmel, melyek értéke <b>fill</b></li>
					<li>Iterátoros másoló konstruktor</li>
					<li>Másoló konstruktor</li>
					<li>Destruktor</li>
				</ol>

				<hr/>
				<h6>Iterátorok</h6>
				<Syntax>{'It cnt::begin();\t// 1. \nIt cnt::end();\t\t// 2.\nIt cnt::rbegin();\t// 3.\nIt cnt::rend();\t\t// 4.'}</Syntax>
				<ol>
					<li> Az első elem iterátora</li>
					<li> Az utolsó utáni elem iterátora</li>
					<li> Az első elem iterátora hátulról</li>
					<li> Az utolsó utáni elem iterátora hátulról</li>
				</ol>

				<hr/>
				<h6>Méretek</h6>
				<Syntax>{'size_t cnt::size();\t\t// 1. \nsize_t cnt::capacity();\t// 2.\nsize_t cnt::max_size();\t// 3.'}</Syntax>
				<ol>
					<li> A tárolóban lévő elemek számával tér vissza</li>
					<li> A tároló memóriában lefoglalt méretével tér vissza, elemszámban kifejezve</li>
					<li> A tároló elméleti maximális kapacitásával tér vissza (ez csak egy becslés, már korábban is kicrashelhet a program)</li>
				</ol>

				<hr/>
				<h6>Módosítás</h6>
				<Syntax>{'void\t\t\t\tcnt::clear()\t\t\t\t\t\t\t\t//  1.\nvoid\t\t\t\tcnt::swap(const cnt& other)\t\t\t\t\t//  2.\nIt\t\t\t\t\tcnt::erase(It pos)\t\t\t\t\t\t\t//  3.\nIt\t\t\t\t\tcnt::erase(It first, It last)\t\t\t\t//  4.\n\nIt \t\t\t\t\tseq::insert(It pos, const T& val)\t\t\t//  5.\nvoid\t\t\t\tseq::insert(It pos, size_t n, const T& val)\t//  6.\nvoid\t\t\t\tseq::insert(It pos, It first, It last)\t\t//  7.\n\nstd::pair<It,bool>  asc::insert(const T& val)\t\t\t\t\t//  8.\nIt \t\t\t\t\tasc::insert(It pos, const T& val)\t\t\t//  9.\nvoid\t \t\t\tacs::insert(It first, It last)\t\t\t\t// 10.'}</Syntax>

				<ol>
					<li>Törli a tároló összes elemét így a mérete 0 lesz</li>
					<li>Kicseréli az <b>other</b> tároló elemeit a saját elemeivel (lásd copy-and-swap)</li>
					<li>Törli <b>pos</b> iterátor helyén az elemet és visszatér a törlés helye utáni elem iterátorával</li>
					<li>Törli a [<b>first</b>,<b>last</b>) iterátorok között az elemeket és visszatér a törlés helye utáni elem iterátorával</li>
					<li>Beszúr a <b>pos</b> iterátor helyére egy <b>val</b> értékű elemet, növeli a tároló méretét, visszatér az újonan beszúrt elem iterátorával</li>
					<li>Beszúr a <b>pos</b> iterátor helyére <b>n</b> darab <b>val</b> értékű elemet, növeli a tároló méretét</li>
					<li>Beszúrja és átmásolja a <b>pos</b> iterátor helyére egy másik tároló [<b>first</b>,<b>last</b>) iterátorhalmazáról az elemeket</li>
					<li>Beszúr egy <b>val</b> értékű elemet a tárolóba, visszatér egy párral, amiben a <i>first</i> a beszúrt elem iterátora, a <i>second</i> a beszúrás sikeressége</li>
					<li>Ugyanaz, mint a 8. pont, de a <b>pos</b> iterátorral adhatunk egy tippet, hogy hova kell beszúrni az elemet (de nem feltétlenül kerül oda, mivel nincs sorrend)</li>
					<li>Beszúrja egy másik tároló [<b>first</b>,<b>last</b>) iterátorai közötti2 elemeket</li>
				</ol>


				<hr/>
				<h5>Szekvenciális tárolók</h5>
				<h6>Közös metódusok</h6>
				<Syntax>{'void seq::push_front(const T& val)\t// 1.\nvoid seq::push_back(const T& val)\t// 2.\nvoid seq::pop_front()\t\t\t\t// 3.\nvoid seq::pop_back()\t\t\t\t// 4.\nT&   seq::front()\t\t\t\t\t// 5.\nT&   seq::back()\t\t\t\t\t// 6.'}</Syntax>

				<ol>
					<li> Beszúr egy val értékű elemet a tároló elejére</li>
					<li> Beszúr egy val értékű elemet a tároló végére</li>
					<li> Törli az első elemet</li>
					<li> Törli az utolsó elemet</li>
					<li> Visszatér az első elem értékével</li>
					<li> Visszatér az utolsó elem értékével</li>
				</ol>


				<hr/>
				<h6>std::list</h6>
				<SVG src={ListSVG}/>
				<p>Az <b>std::list</b> egy duplán láncolt lista, melyben csak a lista bejárásával érhetők el az elemek, direkt indexeléssel nem.</p>

				<b>Listaműveletek</b><br/>
				<Syntax>{'void list::remove(const T& val)\t// 1.\nvoid list::remove_if<P>(P pred)\t// 2.\nvoid list::reverse()\t\t\t// 3.\nvoid list::unique()\t\t\t\t// 4.\nvoid list::unique<P>(P pred)\t// 5.\nvoid list::sort()\t\t\t\t// 6.\nvoid list::sort<C>(C comp)\t\t// 7.'}</Syntax>

				<ol>
					<li>Törli az összes olyan elemet, melynek értéke <b>val</b></li>
					<li>Törli az összes olyan elemet, melyre a predikátum igazzal tér vissza (A predikátum: <b>bool pred(T val)</b> alakú)</li>
					<li>Megfordítja az elemek sorrendjét</li>
					<li>Törli az összes <b>egymás után következő</b> ugyanolyan értékű elemeket (pl. 1,2,2,2,3,2,4,1 -> 1,2,3,2,4,1)</li>
					<li>Törli az összes <b>egymás után következő</b> elemeket, melyre a predikátum igaz ( Predikátum: <b>bool pred(const T&amp; a, const T&amp; b)</b> )</li>
					<li>Rendezi a tömb elemeit növekvő sorrendben (az operator&lt;-t használja)</li>
					<li>Rendezi a tömb elemeit megadott összehasonlító függvénnyel (A függvény: <b>bool comp(const T&amp; a, const T&amp; b)</b> )</li>
				</ol>

				<hr/>
				<h6>std::vector</h6>
				<SVG src={VectorSVG}/>
				<p>Az <b>std::vector</b> egy olyan adatszerkezet, melynek csak a végére lehet beszúrni, és kivenni elemet. Továbbá indexelhető, így használható RandomAccessIterator-al.</p>
				<p>Tehát nem létezik <b>push_front()</b> és <b>pop_front()</b> metódusa.</p>

				<b>Indexelés</b>
				<Syntax>{'T& vector::operator[](size_t index)\t// 1.\nT& vector::at(size_t index)\t\t\t// 2.'}</Syntax>

				<ol>
					<li> Visszaadja az <b>index</b> helyen lévő elem értékét</li>
					<li> Visszaadja az <b>index</b> helyen lévő elem értékét vizsgálva <b>index</b> helyességét</li>
				</ol>

				<hr/>

				<h6>std::deque</h6>
				<SVG src={DequeSVG}/>
				<p>Az <b>std::deque</b> egy olyan adatszerkezet, melynek mindkét végére lehet beszúrni, és kivenni elemet. Továbbá indexelhető. (A kiejtése kétféleképpen is elfogadott: franciásan /dek/ vagy angolosan /dikjú/)</p>

				<b>Indexelés</b>
				<Syntax>{'T& deque::operator[](size_t index)\t// 1.\nT& deque::at(size_t index)\t\t\t// 2.'}</Syntax>

				<ol>
					<li> Visszaadja az <b>index</b> helyen lévő elem értékét</li>
					<li> Visszaadja az <b>index</b> helyen lévő elem értékét vizsgálva <b>index</b> helyességét</li>
				</ol>

				<hr/>
				<h6>std::stack</h6>
				<SVG src={StackSVG}/>
				<p>Az <b>std::stack</b> egy olyan LIFO adatszerkezet, melynek a tetejére lehet beszúrni elemet és onnan lehet törölni is.</p>
				<b>Veremműveletek</b>
				<Syntax>{'void stack::push(const T& val)\t// 1.\nvoid stack::pop()\t\t\t\t// 2.\nT& \t stack::top()\t\t\t\t// 3.'}</Syntax>

				<ol>
					<li> Beszúrja a <b>val</b> értékű elemet a tároló tetejére</li>
					<li> Törli az elemet a tároló tetejéről</li>
					<li> Visszatér a legfelső elem értékével</li>
				</ol>

				<hr/>
				<h6>std::queue</h6>
				<SVG src={QueueSVG}/>
				<p>Az std::queue egy olyan FIFO adatszerkezet, melynek a tetejére lehet beszúrni elemet és az aljáról lehet törölni.</p>
				<b>Sorműveletek</b>
				<Syntax>{'void queue::push(const T& val)\t// 1.\nvoid queue::pop()\t\t\t\t// 2.\nT& \t queue::front()\t\t\t\t// 3.\nT& \t queue::back()\t\t\t\t// 4.'}</Syntax>

				<ol>
					<li> Beszúrja a <b>val</b> értékű elemet a tároló tetejére</li>
					<li> Törli az elemet a tároló aljáról</li>
					<li> Visszatér a legfelső elem értékével</li>
					<li> Visszatér a legalsó elem értékével</li>
				</ol>

				<hr/>

				<h6>std::priority_queue</h6>
				<SVG src={PrioritySVG}/>
				<p>Az std::priority_queue egy olyan FIFO, melybe a beszúráskor egy megadott függvénnyel dől el a beszúrandó elem helye.</p>
				<b>Sorműveletek</b>
				<Syntax>{'void priority_queue::push(const T& val)\t\t\t\t// 1.\nvoid priority_queue::pop()\t\t\t\t\t\t\t// 2.\nT& \t priority_queue::top()\t\t\t\t\t\t\t// 3.'}</Syntax>

				<ol>
					<li> Beszúrja a <b>val</b> értékű elemet a függvény szerinti helyre</li>
					<li> Törli az elemet a tároló aljáról</li>
					<li> Visszatér a legfelső elem értékével</li>
				</ol>


				<hr/>
				<h5>Asszociatív tárolók</h5>
				<h6>Közös metódusok</h6>
				<Syntax>{'size_t asc::count(const T& val)\t\t// 1.\nIt \t   asc::find(const T& what)\t\t// 2.'}</Syntax>

				<ol>
					<li> Megszámlálja, hogy hány <b>val</b> értékű elem található a tárolóban (ha semennyi akkor 0)</li>
					<li> Megkeresi a <b>what</b> értéket a tárolóban és visszatér a rá mutató iterátorral (ha nincs találat akkor <b>asc::end()</b> a visszatérési érték)</li>
				</ol>


				<hr/>
				<h6>std::set és std::multiset</h6>
				<p>Az <b>std::set</b> egy halmaz jellegű tároló, így minden elem egyszer szerepelhet és az elemeknek nincs sorrendje. Az <b>std::multiset</b>-ben többször is szerepelhetnek elemek.</p>
				<SVGTable src1={SetSVG} src2={MultisetSVG}/>


				<hr/>
				<h6>std::map</h6>
				<p>az <b>std::map</b> egy olyan <b>std::set</b>, mely <b>std::pair</b>-eket tárol. Így gyakorlatilag kulcs-érték párokat tárolunk el. Egy kulcsnak egyedinek kell lennie.</p>
				<SVGTable src1={MapSVG} src2={MultimapSVG} halfWidth/>
				<Block type={'important'}>Az std::map konstruktorában meg kell adni a kulcs és az érték típusát sablon paraméterként.</Block>
			</Container>
		);
	}
}
