import React, {Component} from 'react';
import {Block, BottomLessonChanger, PageHeader, Syntax} from "../../StyleComponents";
import {Container} from 'semantic-ui-react-single/Container';

export default class Lesson6 extends Component {
	render() {
		return (
			<Container>
				<PageHeader icon='book'>6: Sablonok</PageHeader>
				<BottomLessonChanger current={6} title={'Sablonok'}/>

				Ebben a fejezetben az osztályok generikus programozásáról lesz szó.
				<hr/>

				<h5>Generikus programozás</h5>
				<p>Szükségessé válhat néha olyan programrészek vagy osztályok implementálása, amik "valahogyan" többféle típussal is tudnak működniük. Erre ad megoldást a C++-ban a sablonok bevezetése, mely gyakorlatilag egy "tervrajz" vagy "képlet" egy függvény vagy egy osztály számára.</p>

				<h5>Függvénysablonok</h5>
				<Block type={'important'}>Függvénysablonokat a függvény neve elé tett <b>template&lt;typename T1, typename T2, ...&gt;</b> kulcsszóval lehet létrehozni, ahol a <b>typename</b> vagy a <b>typename</b> kulcsszóra vagy egy konkrét típusra utal.<br/>Ilyenkor a <b>T1, T2, ...</b> használható a függvényen belül, mint típus.</Block>
				<Block type={'important'}>Ezután amikor meghívjuk a függvényt, akkor a neve után <b>&lt; &gt;</b> között fel kell sorolni az aktuális típusokat. Ha egyszerű típusokról van szó, akkor ez elhagyható ugyanis a fordító képes dedukciót alkalmazni.</Block>

				<Syntax>{'template<typename T>\nvoid swap(T& a, T& b) {\n\tT temp = a;\n\ta = b;\n\tb = temp;\n}\n//...\nint    a = 5, b = 6;\ndouble c = 7, d = 8;\nswap<int>   (a, b);\nswap<double>(c, d);\nswap\t\t(a, b); \t\t// Dedukció: a fordító "kitalálja" a paraméterek típusából'}</Syntax>

				<h6>Hatékonysági kérdések</h6>
				<p>A sablonok implementációja érdekes, ugyanis nem általánosan "tervrajzként" kerül bele a kész programba a sablon, hanem fordításidőben annyiféle példányban hozza létre a fordító, amennyiben használtuk.</p>
				<Block type={'example'}>Például a fenti kódban a <b>swap</b> függvény két példányban (egy <b>int</b> és egy <b>double</b>) kerül lefordításra.</Block>

				<h6>Specializáció</h6>
				<p>Ugyan a sablonok lehetővé teszik, hogy generikus kódokat írjuk, ezzel szemben megadja a lehetőséget, hogy specializáljuk (konkretizáljuk) bizonyos típusokra.</p>
				<Block type={'example'}>
					<br/>
					<Syntax>{'template<>\nswap<const char*> (const char* a, const char* b) {\n\t// két pointer felcserélése\n}'}</Syntax>
					Ez a fenti <b>swap</b> függvény egy specializált esete, melyben megadjuk, hogy <b>const char*</b>-ra másképpen működjön.
				</Block>

				<hr/>
				<h5>Osztálysablonok</h5>
				<p>Hasonlóan, mint a függvényeknél, osztályokon belül is használható sablon paraméter.</p>
				<Block type={'important'}>Osztálysablonokat a függvény neve elé tett <b>template&lt;typename T1, typename T2, ...&gt;</b> kulcsszóval lehet létrehozni. Használatuk megegyezik a függvénysablonokéval.</Block>

				<Syntax>{'template<typename T>\nclass Array {\n\tsize_t len;\n\tT* data;\n\n\tpublic:\n\tArray(size_t length = 0): len(length), data(new T[len]) { }\n\t~Array() { delete[] data; }\n\tint length() { return len; }\n\n\t// ... (copy const, op=, op[]) ...\n\t// A teljes forráskód a függelékben\n};\n//...\nArray<int> \t  intarr(10);\nArray<double> dblarr(10);\n\nfor(size_t i = 0; i < 10; i++){\n\tintarr[i] = i;\n\tdblarr[i] = i / 3.14f;\n}'}</Syntax>
				<Block type={''}><b>Egy dinamikus, generikus tömb osztály mintája megtalálható a Függelékben.</b></Block>

				<h5>Függvényobjektumok</h5>
				<p>A generikus programozás során felmerülhet olyan igény is, hogy valahogyan függvényt is át tudjunk adni generikusan.</p>
				<Block type={'example'}>Például szeretnénk a megszámlálás tételét generikusan megírni: csak akkor számlálunk meg valamit, ha az átadott függvény igazat ad vissza.</Block>
				<Block type={'important'}>
					A <b>függvényobjektum</b> egy olyan osztály melynek definiálva van az <b>operator()</b> metódusa.<br/>
					A <b>predikátum</b> egy olyan függvényobjektum melynek <b>bool</b> a visszatérési értéke.
				</Block>

				<Syntax>{'// Predikátumok\nstruct isEven {\n\tbool operator()(int a) { return (a % 2) == 0; }\n};\n\nstruct isOdd {\n\tbool operator()(int a) { return (a % 2) == 1; }\n};\n\n// Megszámlálás tétele\ntemplate<typename F>\nint count(int* arr, size_t len, F func) {\nint counter = 0;\n\tfor(size_t i = 0; i < len; i++)\n\t\tif (func(arr[i]))           // Meghívjuk a függvényobjektum operator() metódusát\n\t\t\tcounter++;\n\treturn counter;\n}\n\n//...\nint a[] = {0, 1, 2, 3, 4 , 5, 6, 7, 8};\n\nstd::cout << "There are " << count(a, 9, isEven()) << " even numbers.\n";\nstd::cout << "There are " << count(a, 9, isOdd()) << " odd numbers.";'}</Syntax>

				<h5>Modulokra bontás</h5>
				<p>Mivel a függvény és osztálysablonok fordításidőben értékelődnek ki, ezért nem lehet a deklaráció és definíciót külön fájlokra bontani &nbsp;(például&nbsp;<b>.h</b>&nbsp;és&nbsp;<b>.cpp</b>).</p>
				<p>Erre a megoldás - a két formátum "összegyúrása" - a <b>.hpp</b> kiterjesztésű fájl, melyben a sablonok deklarációja és definíciója is megtalálható.</p>
				<hr/>
				<Block type={"modern"}>
					<h5>Hívhatók</h5>
					<Block type={'important'}><b>Hívható:</b> Minden olyan <i>dolog</i>, ami függvényként értelmezhető és lefuttatható.</Block>
					<p>
						C++ a következők számítanak hívhatónak:
					</p>
					<ul>
						<li>C stílusú függvény pointer</li>
						<li>Objektumok metódusainak pointerei</li>
						<li>Függvényobjektumok</li>
						<li>Lambda kifejezések</li>
					</ul>
					<p>Hívhatót lehet átadni a fent mutatott sablonos módszerrel, azonban sokkal átláthatóbb/modernebb ha a paraméterünk <b>std::function</b> osztályt kérünk. Ennek ugyanis a fenti listából bármi adható.</p>
					<Block type={'important'}>Az <b>std::function</b> sablon paramétere: <b>std::function&lt;VisszaTípus(Arg1, Arg2, ...)&gt;</b></Block>

					<Syntax>{'template<typename T>\nsize_t countArray(T* arr, size_t len, std::function<bool(T)> func) {\n\tint counter = 0;\n\tfor(size_t i = 0; i < len; i++)\n\t\tif (func(arr[i]))\n\t\t\tcounter++;\n\treturn counter;\n}\n//...\nbool isPositive(int num) { return num >= 0; }\n\nstruct Poz {\n\tbool operator()(int num) { return num >= 0; }\n};\n//...\nint arr[] = { -1, 22, 433, -544, 6543, 666, -420 };\n\ncountArray<int>(arr, 7, &isPositive);\ncountArray<int>(arr, 7, Poz);\n\t\t'}</Syntax>

					<h5>Lambda-kifejezések</h5>
					<Block type={'important'}><b>Lambda-kifejezés:</b> Egy név nélküli függvényobjektum.</Block>
					<p>A lambda kifejezéseket általában arra használjuk, hogy ahol hívhatót kérnek oda helyben le tudjuk írni a függvényünket, ezzel átláthatóbbá téve a kódot.</p>
					<Syntax>{'// Általános lambda kifejezés\n[capture](params){body}'}</Syntax>
					<ul>
						<li><b>capture</b>: Azon külső lokális változók listája, melyeket szeretnénk a függvényünkben használni. A <b>&amp;</b> jellel minden lokális változót elkaphatunk.</li>
						<li><b>params</b>: A függvény paraméterlistája.</li>
						<li><b>body</b>: A függvény törzse.</li>
					</ul>

					<Syntax>{`countArray<int>(arr, 7, [](int num) { return num >= 0; });\n\nint N = 300;\ncountArray<int>(arr, 7, [N](int num) { return num >= N; });`}</Syntax>
					<p>Itt elég nagy vonalakban írtam a lambda kifejezésekről, ezen felül rengeteg felhasználási módja és alakja létezik.</p>
				</Block>
			</Container>
		);
	}
}

