import React, {Component} from 'react';
import {Block, BottomLessonChanger, PageHeader, SVG, Syntax} from "../../StyleComponents";
import {Container} from 'semantic-ui-react-single/Container';

import CopyConSVG from '../../../img/copycon.svg';
import CopyCon2SVG from '../../../img/copycon2.svg';
import CopyAndSwapSVG from '../../../img/copyandswap.svg';

export default class Lesson3 extends Component {
	render() {
		return (
			<Container>
				<PageHeader icon='book'>3: Osztályok tulajdonságai</PageHeader>
				<BottomLessonChanger current={3} title={'Osztályok'}/>

				Ebben a fejezetben megismerkedünk az osztályok speciális metódusaival és egyéb viselkedéseivel.<br/>
				Egy dinamikus string osztályon mutatjuk be ezen működéseket.
				<hr/>

				<Syntax>{'class String {\n\tsize_t length;\n\tchar* data;\n\n\t// A további kódrészletek ide kerülnek\n};'}</Syntax>

				<h5>Konstruktor tulajdonságai</h5>
				<p>A konstruktor a példányok létrehozása során lefutó kódrészlet. Itt szokás inicializálni a változókat, dinamikus memóriát foglalni, fájlokat megnyitni, stb.</p>
				<Block type={'important'}>A konstruktor visszatérés nélküli függvény, neve az osztály neve. <b>Osztálynév(){}</b></Block>

				<h6>Inicializáló lista</h6>
				<p>Az inicializáló listával könnyen adhatunk értéket az adattagoknak rövid, tömör alakban a konstruktor fejlécében. Továbbá konstans és referencia adattagok inicializálásának elvégzését <b>kötelezően</b> itt kell megtenni.</p>
				<p>A függvénydefiníció után tett : jel után következik a lista <b>adattag(paraméter)</b> alakban, vesszővel elválasztva. Így a megadott adattagokat beállítjuk a megfelelő paraméterek értékére.</p>

				<Block type={'example'}>A <b>String</b> osztálynak legyen egy mérettel megadható és egy <b>const char*</b>-ból létrehozó konstruktora.</Block>
				<Syntax>{'String(size_t length = 0) \t: length(length),\t\tdata(new char[length+1]) { data[length] = \'0\'; }\nString(const char* str)   \t: length(strlen(str)), \tdata(new char[length+1]) { strcpy(data, str); }'}</Syntax>

				<hr/>
				<h5>Destruktor tulajdonságai</h5>
				<p>A destruktor a példányok megsemmisülése során lefutó kódrészlet. Itt szokás a dinamikus memóriát felszabadítani, fájlokat lezárni, egyéb erőforrásokat leszabadítani, stb.</p>
				<Block type={'important'}>A destruktor visszatérés nélküli függvény, neve az osztály neve és előtte egy ~ jel. <b>~Osztálynév(){}</b></Block>

				<Block type={'example'}>A String osztálynak, mivel foglalt dinamikus memóriát, a destruktorában azt fel kell szabadítania.</Block>
				<Syntax>{'~String() { delete[] pointer; }'}</Syntax>

				<hr/>
				<h5>Másoló konstruktor</h5>
				<p>Másoló konstruktor akkor fut le, amikor létrehozunk egy példányt és paraméterül egy létező példányt kapunk. Ilyenkor annak minden adattagja átmásolódik az újdonsült példányba. Lefut még akkor is, ha valahol paraméterként érték szerint adjuk át az osztályunkat.</p>
				<p>Amíg nincs dinamikus adatunk, fájlunk, stb. addig megfelel az alapértelmezett másoló konstruktor, mely "bájtról-bájtra" átmásolja a másik példány adattagjait.</p>
				<p>A probléma ezen esetekben jelentkezik, tekintsük a következő ábrát:</p>
				<SVG src={CopyConSVG}/>
				<p>Mint látható, ha másoljuk a String osztály példányait, akkor a benne lévő pointer egy-az-egyben másolódik. Ez akkor lesz súlyos probléma, ha valamelyik példányt megsemmisítjük, és annak destruktora felszabadítja a dinamikus területet. Ekkor a másik példánynak egy illegális pointere marad.</p>
				<SVG src={CopyCon2SVG}/>
				<p>A megoldás az, hogy felülírjuk az alapértelmezett másoló konstruktort és átmásoljuk az összes adattagot kézzel.</p>

				<Block type={'important'}>A másoló konstruktor egy olyan konstruktor mely egy konstans referenciát kap a másolandó példányról. <br/><b>Osztálynév(const Osztálynév&amp;){}</b></Block>

				<Syntax>{`String(const String& other) : length(other.length), data(new char[length+1]) { strcpy(data, other.data); }`}</Syntax>

				<h5>Értékadó operátor</h5>
				<p>Az értékadó operátorra akkor van szükség, ha már létezik egy példányunk és szeretnénk egy másik példány adattagjait átmásolni. Gyakorlatilag töröljük a saját adatainkat, majd átmásoljuk a másik példány adatait.</p>

				<Block type={'important'}>Az értékadó operátor az osztály operator= metódusa. <b>Osztálynév&amp; operator=(const Osztálynév&amp;){}</b></Block>
				<p>Első körben nézzünk meg egy kevésbé szerencsés, nem gyakorlatias megoldást:</p>
				<Syntax>{'String& operator= (const String& other) {\n\tif(this != &other) {\t\t\t\t\t// Saját magunkat nem szeretnénk törölni majd másolni\n\t\tdelete[] data;\t\t\t\t\t// Saját pointer felszabadítása\n\t\tlength = other.length;\n\t\tdata = new char [length + 1];\n\t\tstrcpy(data, data.pointer);\t\t// Másik példány másolása\n\t}\n\n\treturn *this;\t\t\t\t\t\t\t// a = b = c típusú láncolhatóság miatt\n}'}</Syntax>
				<Block type={'modern'}>
					<h6>Copy-and-swap fordulat</h6>
					<p>A fenti megvalósítás több ponton sem szerencsés:</p>
					<ul>
						<li>Gyakorlatilag egymás után tettük a destruktort és a másoló konstruktort &rarr; kódduplikáció</li>
						<li>Könnyen lemaradhat az önmásolás kiküszöbölése &rarr; memóriakezelési problémák</li>
						<li>
							<small>Nem kivétel biztos a kód</small>
						</li>
					</ul>

					<p>Erre biztosít megoldást a copy-and-swap fordulat, mely során implicite meghívjuk a másoló konstruktort és a destruktort.</p>
					<Block type={'example'}>
						Tekintsük azt a példát, hogy <b>B = A</b><br/>
						<ol>
							<li>Készítsünk másolatot <b>A</b>-ról &rarr; <b>A'</b></li>
							<li>Cseréljük ki <b>B</b> és <b>A'</b> adattagjait bájtról bájtra</li>
							<li>Semmisítsük meg <b>A'</b>-t</li>
						</ol>
					</Block>
					<SVG src={CopyAndSwapSVG}/>
					<Block type={'important'}>A <b>copy-and-swap fordulat</b> végrehajtásához szükség van egy olyan metódusra, mely kicseréli az osztály adattagjait. Ez használja a szabványos <b>std::swap</b> függvényt.<br/>
						Ezek után elegendő az értékadó operátornak csak ezen metódust meghívnia.
					</Block>

					<Syntax>{'void swap(const String& other) {\n\tstd::swap(pointer, other.pointer);\n\tstd::swap(length,  other.length);\n}\n\nString& operator= (String other) {\t// 1. Mivel érték szerint adtuk át, ezért másolat készül az other példányról\n\tswap(other);\t\t\t\t\t// 2. Kicseréljük a másolattal az adatainkat\n\treturn *this;\t\t\t\t\t// 3. Itt megsemmisül a másolat, és mivel nála van a régi pointerünk ezért azt fel fogja szabadítani\n}'}</Syntax>
				</Block>

				<hr/>
				<Block type={''}>A fenti <b>String</b> osztály megtalálható és letölthető a <b>Extrák &rarr; Függelék</b> menüpontban.</Block>

				<hr/>
				<h5>Statikusság</h5>
				<p>Felmerülhet néha az igény példányoktól független, de az osztályhoz kötődő "globális" adattagra vagy metódusra. Erre megoldás a statikus adattag és metódus.</p>
				<Block type={'important'}>Statikus metódus vagy adattagot a neve elé tett <b>static</b> kulcsszóval hozhatunk létre.</Block>
				<small>Gyakorlatilag egy globális változó az osztályon belül.</small>

				<h5>Statikus adattag</h5>
				<p>Egy osztály statikus adattagját ha módosítjuk valahol, akkor az minden példány számára is megváltozik, mivel az osztály részét képezi.</p>
				<p>Az értéküket <b>kötelező</b> beállítani a példányosítás előtt!</p>

				<Syntax>{'class String {\n\tpublic:\n\tstatic size_t max_size;\n\t// ...\n};\n// ...\nsize_t String::max_size = 200;'}</Syntax>

				<h5>Statikus metódusok</h5>
				<p>A példányoktól független metódus, éppen ezért <b>csak</b> statikus adattagokat ér el! Azonban például ha paraméterként átadunk egy azonos típusú példányt, akkor annak a privát adattagjait eléri.</p>
				<Syntax>{'class String {\n\tpublic:\n\tstatic String fromInt(int x);\n\t// ...\n};\n// ...\nString str = String::fromInt(65536);'}</Syntax>
			</Container>
		);
	}
}

