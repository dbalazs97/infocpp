import React, {Component} from 'react';
import {Block, PageHeader, Syntax} from "../../StyleComponents";
import {Container} from 'semantic-ui-react-single/Container';

export default class HFTest extends Component {
	render() {
		return (
			<Container>
				<PageHeader icon='lab'>HFTest</PageHeader>
				<h5>Mi a HFTest?</h5>
				<p>A HFTest szorgalmi feladatokat értékelő rendszer. Ezen feladatok sikeres megoldásáért EXTRA pontokat lehet szerezni a félév során.</p>
				<p>A program a BME Ural2 nevű UNIX szerverén fut, ott kell használni távoli eléréssel.</p>

				<Block type={'important'}>Az oldalon <b><big>NEM</big></b> található meg az egyes feladatok megoldása!!</Block>

				<h5>A szorgalmi feladatok megoldásának menete</h5>
				<ol>
					<li>Kapcsolódás az Ural2 szerverhez</li>
					<li>A programkód megírása</li>
					<li>A programkód lefordítása</li>
					<li>A program tesztelése</li>
					<li>HFTest értékelés</li>
				</ol>
				<p>A továbbiakban ezeket a pontokat nézzük végig.</p>

				<h5>Kapcsolódás az Ural2 szerverhez</h5>

				<p>Először is szükségünk van egy felhasználói fiókra az Ural2 használatához, melyet itt szerezhetünk be: <a href="https://accadmin.hszk.bme.hu/" target="_blank" rel="noopener noreferrer">HSZK Accadmin</a></p>
				<p><b>Linux</b>: Először is szükségünk van egy SSH kliens programra, például OpenSSH. (Ennek a beszerzése disztribúciónként eltérő.) Azután valamilyen terminálon írjuk be a következőt:</p>
				<Syntax language={'bash'}>{`ssh ural2.hszk.bme.hu`}</Syntax>

				<p><b>Windows</b>: Egy SSH kliensre lesz szükségünk, a legnépszerűbb a Putty nevű program, amit innen tölthettek le: Putty Download <a href="https://the.earth.li/~sgtatham/putty/latest/w32/putty.exe" target="_blank" rel="noopener noreferrer">32-bit</a>/<a href="https://the.earth.li/~sgtatham/putty/latest/w64/putty.exe" target="_blank" rel="noopener noreferrer">64-bit</a></p>
				<p>A Host Name feliratú szövegdobozba írjuk be az <b>ural2.hszk.bme.hu</b> címet, a Porthoz a 22-t. A Saved Sessions feliratú szövegdobozba írjunk be egy tetszőleges nevet. Ezután kattintsunk a Save gombra. Ezentúl az általunk megadott nevű listaelemre dupla klikkelve csatlakozhatunk a szerverhez.</p>

				<hr/>

				<p>Ezek után valami hasonlót kell látnunk:</p>

				<Syntax language={'bash'}>{`login as: _`}</Syntax>

				<p>Írjuk be az Ural2 azonosítónkat, majd Enter után a jelszavunkat. (A jelszó beírásakor nem látszódik, hogy mit írunk be) <br/>
					Ha sikeresen beléptünk, akkor ilyesmit kell látnunk a képernyőn:
				</p>
				<Syntax language={'bash'}>{'Last login: Dátum from IP\n\t\tSun Microsystems Inc.      SunOS 5.8      Generic May 2001\n\n\t\t\t\tUdvozoljuk a BME Hallgatoi Szamitogepkozpont\n\t\t\t\t\t\tural2.hszk.bme.hu szerveren!\n\n\t\t\t\t\t\t\tSun Enterprise 450\n\t\t\t\t\t\t4x 400 MHz UltraSparc CPU\n\t\t\t\t\t\t\t4 GB RAM,  180 GB HD\n\n+--------------------------------------------------------------------+\n| Temaszammal kapcsolatos problema eseten javasoljuk, hogy eloszor a |\n| http://www.hszk.bme.hu/mittegyek.html    oldalon   tajekozodjanak. |\n+--------------------------------------------------------------------+\n|  Ha a Szabalyzatunkban foglaltakat nem fogadja el, MOST lepjen ki. |\n+--------------------------------------------------------------------+\n\nYou don\'t have mail.\n\nural2:~$ _'}</Syntax>

				<p>Ezek után a leírás feltételezi az alapvető UNIX utasítások ismeretét. (Melyeket feltehetőleg az 1. laboron leadtak, továbbá javasoljuk a Midnight Commander használatát az mc paranccsal.) Ezek után a home könyvtár <b>src</b> könyvtárában lesznek a forráskódok és a <b>bin</b> könyvtárba fordítunk.</p>

				<h5>A programkód megírása</h5>
				<p>A programkódok megírásához a Midnight Commander szerkesztőjét ajánljuk, ami a következőképpen használható:</p>
				<Syntax language={'bash'}>{'# mcedit megnyitása - a -c kapcsoló színesen indítja el a szerkesztőt\nmcedit -c fájlnév\n# Például\nmcedit -c ~/src/program.c\t'}</Syntax>

				<p>A megjelenő szerkesztőbe begépeljük a kódunkat. Gépelés közben a következő gyorsbillentyűk használhatók:</p>

				<Syntax language={'bash'}>{'F2  - Mentés\nF7  - Keresés\nF9  - Menü legörgetése\nF10 - Kilépés'}</Syntax>

				<h5>A programkód fordítása</h5>
				<p>Fordítani sokféleképpen lehet (kézi begépelés, makefile, IDE stb.), viszont az egyszerű programokat a következő paranccsal lehet fordítani:</p>

				<Syntax language={'bash'}>{'# Általános fordítás - C nyelven - a -o kapcsoló után a lefordult program fájlnevét kell írni\ngcc -o Kimenet Forráskód1 Foráskód2 ...\n# Általános fordítás - C++ nyelven\ng++ -o Kimenet Forráskód1 Foráskód2 ...\n\n# Példák\ngcc -o ~/bin/program1 ~/src/prog1.c\ngcc -o ~/bin/test ~/src/prog.c ~/src/tester.c\ng++ -o ~/bin/test ~/src/mycode.cpp ~/src/test.cpp'}</Syntax>

				<h5>A program tesztelése</h5>
				<p>Ha a <b>bin</b> könyvtárunkat hozzáadtuk a <b>PATH</b> környezeti változóhoz, akkor csak beírjuk a lefordított programunk nevét. Ha nincs, akkor teljes elérési úttal kell beírni a programunk nevét.</p>

				<h5>HFTest értékelés</h5>
				<p>Először is készítsünk linket a HFTest programra a <b>bin</b> könyvtárunkban:</p>
				<Syntax language={'bash'}>{`ln -s ~szebi/hftest ~/bin`}</Syntax>
				<p>Ezután a HFTest a következőképpen használható:</p>
				<Syntax language={'bash'}>{'# HFTest általános használata\nhftest programnév\n\n# Példa\nhftest ~/bin/feladat1'}</Syntax>

				<p>Ezután a HFTest lefuttatja a programunkat, és értékeli azt. Ha sikeres a futás, akkor megkapjuk EXTRA pontjainkat. Ha nem, akkor kiírja a hibát.</p>

				<h5>A feladatok általánosságban</h5>
				<p>Mindig a páratlan sorszámú feladatokkal tudjuk lekérdezni a páros sorszámú feladatokat. Tehát az 1. feladat lekérdezi a 2.-at és azután azt megoldjuk.</p>
				<p>Minden feladat eleje azonos. Először kiírjuk a Standard Outputra az azonosítóinkat, és a feladat sorszámát. Majd a páros sorszámúaknál maga a program következik.</p>
				<p>Az azonosítás valami ilyesmi függvény legyen:</p>
				<Syntax>{'void identify(int task, bool mail)\n{\n\tstd::cout << "NÉV <E-mail> NEPTUN" << std::endl;\n\tstd::cout << "Feladat = " << task << std::endl;\n\t\n\t// Ha szeretnénk e-mailt kapni a feladatról (ennek csak páratlan sorszámúnál van értelme)\n\tif(mail)\n\t\tstd::cout << "Mail" << std::endl;\n}'}</Syntax>

				<p>A main függvényben a feladatok így néz ki (A példában az 1. feladat):</p>

				<Syntax>{'void main()\n{\n\tidentify(1, true);\n\t\n\t// Ha páros sorszámú lenne ide jönne a program.\n\treturn 0;\n}'}</Syntax>

				<h5>2. feladat</h5>
				<p>Ebben a feladatban egy polinom helyettesítési értékét kell kiszámítani. Tehát egy olyan függvény megvalósítása, mely bemenetként megkapja az x változó értékét, majd kiszámolja az együtthatók beszorzásával a polinom értékét.</p>
				<p>A főprogramban azt kell lekezelnünk, hogy a HFTest megsorozza a Standard Inputot random x változókkal fájlvége jelig és a programunknak ki kell írnia a Standard Outputra a polinom helyettesítési értékét 4 jegy pontossággal<sup>*</sup>.</p>

				<small>* - <a href="http://www.cplusplus.com/reference/iomanip/setprecision/" target="_blank" rel="noopener noreferrer">CPP STD IO setprecision</a></small>

				<h5>4. feladat</h5>
				<p>Ebben a feladatban egy reguláris kifejezést kapunk, ha lekérdezzük a feladatot. A programunknak a feladatban meghatározott darabszámú, a reguláris kifejezésre illeszkedő szöveget kell kiírni a Standard Outputra, valamint szintén meghatározott számú a reguláris kifejezésre nem illeszkedő szöveget.</p>
				<p>A reguláris kifejezésekhez ajánljuk a következő weblapokat: <a href="https://regexone.com/" target="_blank" rel="noopener noreferrer">RegexOne</a>, <a href="https://regex101.com/" target="_blank" rel="noopener noreferrer">Regex101</a>, <a href="http://fent.github.io/randexp.js/" target="_blank" rel="noopener noreferrer">RandExp.js</a></p>

				<h5>6. feladat</h5>
				<p>Ebben a feladatban a 4. feladatban kapott reguláris kifejezésünkkel kell dolgozni. A HFTest megsorozza random szövegekkel a Standard Inputot és nekünk meg kell számlálni a reguláris kifejezésnek megfelelőket és azt is, hogy hány sort küldött. A fájlvégjel beérkezése után nekünk ki kell írni a Standard Outputra oktális számrendszerben<sup>*</sup> a megfelelők / sorok száma értékeket.</p>

				<small>* - <a href="http://www.cplusplus.com/reference/ios/oct/" target="_blank" rel="noopener noreferrer">CPP STD IO oct</a></small>
			</Container>
		);
	}
}
