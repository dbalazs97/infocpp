import React, {Component} from 'react';
import {Block, BottomLessonChanger, PageHeader, Syntax} from "../../StyleComponents";
import {Container} from 'semantic-ui-react-single/Container';

export default class Lesson9 extends Component {
	render() {
		return (
			<Container>
				<PageHeader icon='book'>9: Kivételkezelés, az STL elemei</PageHeader>
				<BottomLessonChanger current={9} title={'Kivétel, STL'}/>

				Ebben a fejezetben a kivételkezelés bugyraiba mélyedünk el valamint megismerkedünk a standard C++ könyvtárral.
				<hr/>
				<h5>Kivételkezelés</h5>
				<p>Az OOP számos problémát vet fel kivételkezelés terén, ezért az ismereteinket bővíteni kell.</p>

				<p>Figyeljük meg az alábbi kódot! Ha x==0, akkor hibát dobunk és a delete[] nem fut le. Így az <i>imlost</i> változó memóriaszivárgást okoz. Ezzel szemben az <i>str</i> változóban tárolt pointer nem fog szivárogni. Ezt nevezik stack unwinding-nak.</p>
				<Block type={'important'}><b>Stack unwinding (rollback):</b> A folyamat, mely kivétel keletkezésekor az adott scope (függvény, metódus stb.) lokális változóinak a destruktorait lefuttatja. A folyamat során a dinamikusan foglalt adatok elvesznek (mivel a pointer destruktora nem szabadít fel).</Block>
				<Syntax>{'void func(int x) {\n\tchar* imlost = new char[420];\n\tstd::string str("I won\'t be lost.");\n\tif(x) throw "I\'m dying...";\n\tdelete[] imlost;\n}\n//...\ntry {\n\tfunc(0);\n}\ncatch(const char* msg) {\n\tstd::cout << "Handling exceptions...\n";\n}'}</Syntax>

				<h5>Smart-pointer</h5>
				<p>A problémára a smart-pointerek adnak megoldást. Ezt C++-ban az <b>std::auto_ptr</b> osztály valósítja meg.</p>
				<p>A smart-pointer lényege a <b>RAII</b> (Resource acquisition is initialization) megvalósítása, azaz gyakorlatilag ez egy pointer tároló melynek, ha meghívják a destruktorát, akkor a tárolt pointert felszabadítja.</p>
				<p>Az osztály váza:</p>

				<Syntax>{'#include <memory>\ntemplate <class T> \t    auto_ptr::auto_ptr (T* ptr = 0); // Konstruktor, beállítja a pointert\ntemplate <class T> void auto_ptr::reset    (T* ptr = 0); // Törli és átállítja a pointert'}</Syntax>
				<Block type={'modern'}>A C++11 által bevezetett új technológiák (move sematics, rvalue reference stb.) miatt ma már elavultnak számít az <b>auto_ptr</b>. Helyette a <b>unique_ptr</b> és <b>shared_ptr</b> alkalmazandó.</Block>

				<p>A következő kódrészletben megvizsgáljuk a működését. Cselesen felülírjuk a globális new és delete operátort tesztelési céllal. Mint láthatjuk a B osztály smart-pointerben tárolt dinamikus adata felszabadul a konstruktorban dobott hibánál. Továbbá az is látszik, hogy A és B destruktora nem hívódik meg.</p>
				<Syntax>{'#include <iostream>\t// cout\n#include <cstdlib>\t// malloc, free\n#include <memory>\t// auto_ptr\n\n// Globális new operátor felüldefiniálása\nvoid* operator new(size_t sz) {\n\tvoid* ptr = std::malloc(sz);\n\tstd::cout << "Allocated " << ptr << " memory address (" << sz << " bytes).\n";\n\treturn ptr;\n}\n\n// Globális delete operátor felüldefiniálása\nvoid operator delete(void* ptr) {\n\tstd::cout << "Deallocated " << ptr << " memory address.\n";\n\tstd::free(ptr);\n}\n\n// Sima pointert használó osztály kivételt dob a konstruktorában\nstruct A {\n\tchar* chr;\n\tA() { chr = new char; throw "Exception thrown at A constructor.\n";}\n\t~A() { delete chr; std::cout << "A destructor called.\n";}\n};\n\n// Smart-pointert használó osztály kivétel létrejöttekor törli a tartalmát\nstruct B {\n\tstd::auto_ptr<char> chr;\n\tB() { chr.reset(new char); throw "Exception thrown at B constructor.\n";}\n\t~B() { chr.reset(); std::cout << "B destructor called.\n";}\n};\n//...\ntry { A a; } catch(const char* c) { std::cout << c; }\ntry { B b; } catch(const char* c) { std::cout << c; }\n\n/*\n\tAllocated 0x1914f0 memory address (1 bytes).\n\tException thrown at A constructor.\n\t------------------------------------------------------------\n\tAllocated 0x196ba0 memory address (1 bytes).\n\tDeallocated 0x196ba0 memory address.\n\tException thrown at B constructor.\n*/'}</Syntax>

				<hr/>
				<h5>A throw annotáció</h5>
				<p>Jelzésképpen megadhatjuk bármely függvény vagy metódus deklarációja után, hogy milyen kivételeket fog dobni. Ezt a deklaráció után tett <b>throw</b> kulcsszó után zárójelben felsorolt típusok felsorolásával tehető meg.</p>
				<small>Ám nem érdemes ezzel "vacakolni" ugyanis csak futásidőben értékelődhet ki, tehát bad pactise a használata. <a href="https://stackoverflow.com/questions/1055387/throw-keyword-in-functions-signature">Stackoverflow: throw kulcsszó</a></small>
				<Block type={'modern'}>Ha nem a megfelelő típusú kivétel dobódik, akkor az <b>std::unexcepted</b> függvénynek paraméterül adott hívható fut le. Alapértelmezetten az <b>std::terminate</b> függvényt hívja, ami kegyetlenül kilövi a programunkat.</Block>
				<Syntax>{'double division(double a, double b) throw(const char*) {\n\tif(b == 0) throw "Division by zero.";\n\treturn a / b;\n}'}</Syntax>

				<hr/>
				<h5>Standard kivételek</h5>
				<p>A C++ nyelvben általában nem alaptípusokat dobálunk, hanem a szabványos <b>std::exception</b> osztály leszármazottjait. Mindegyiknek van egy <b>what()</b> metódusa, mely kiadja a hiba általunk beírt szövegét.</p>
				<p>A kivételek listája: <a href="http://en.cppreference.com/w/cpp/error/exception">C++ refrence: std::exception</a>.</p>

				<hr/>
				<h5>Az STL elemei</h5>
				<p>Az STL (Standard Template Library) a C++-ban szabványos dolgok (tárolók, streamek, stringek, algoritmusok, memóriakezelők stb) közös gyűjteménye.</p>

				<h6>STL tárolók</h6>
				<p>A <b>Függelék</b> menüpontban található a részletes leírásuk.</p>

				<h6>STL algoritmusok</h6>
				<p>Az STL tárolókon és iterátoraikon végezhető szabványos műveletek:</p>
				<p>
					Művelet végzése az elemeken: <a href="http://en.cppreference.com/w/cpp/algorithm/for_each">std::for_each</a><br/>
					Másolás: <a href="http://en.cppreference.com/w/cpp/algorithm/copy">std::copy, std::copy_if</a>, <a href="http://en.cppreference.com/w/cpp/algorithm/copy_n">std::copy_n</a><br/>
					Megszámlálás: <a href="http://en.cppreference.com/w/cpp/algorithm/count">std::count, std::count_if</a><br/>
					Keresés: <a href="http://en.cppreference.com/w/cpp/algorithm/find">std::find, std::find_if</a>, <a href="http://en.cppreference.com/w/cpp/algorithm/binary_search">std::binary_search</a><br/>
					Törlés: <a href="http://en.cppreference.com/w/cpp/algorithm/remove">std::remove, std::remove_if</a><br/>
					Kitöltés: <a href="http://en.cppreference.com/w/cpp/algorithm/fill">std::fill</a><br/>
					Rendezés: <a href="http://en.cppreference.com/w/cpp/algorithm/sort">std::sort</a>, <a href="http://en.cppreference.com/w/cpp/algorithm/is_sorted">std::is_sorted</a><br/>
				</p>

				<p>STL iterátorok:</p>
				<p>
					Beszúró iterátorok: <a href="http://en.cppreference.com/w/cpp/iterator/front_inserter">std::front_inserter</a>, <a href="http://en.cppreference.com/w/cpp/iterator/back_inserter">std::back_inserter</a>, <a href="http://en.cppreference.com/w/cpp/iterator/reverse_iterator">std::reverse_iterator</a><br/>
					Stream iterátorok: <a href="http://en.cppreference.com/w/cpp/iterator/istream_iterator">std::istream_iterator</a>,<a href="http://en.cppreference.com/w/cpp/iterator/ostream_iterator">std::ostream_iterator</a>
				</p>
			</Container>
		);
	}
}

