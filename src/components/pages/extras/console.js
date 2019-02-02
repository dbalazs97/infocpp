import React, {Component} from 'react';
import {PageHeader, Syntax} from "../../StyleComponents";
import {Container} from 'semantic-ui-react-single/Container';
import {Icon} from 'semantic-ui-react-single/Icon';
import {Table} from 'semantic-ui-react-single/Table';
import RlUtilDocs from "./RLUtilDocs";

export default class Console extends Component {
	render() {
		return (
			<Container>
				<PageHeader icon='terminal'>Konzolos felületek</PageHeader>

				<h5>RlUtil</h5>
				<p>A házi feladatok elkészítése során felmerülhet az igény a konzolon a színes betűk kirajzolására, vagy éppen a kurzor mozgatására. Ezen igényeket minden operációs rendszeren másképpen lehet kielégíteni (ncurses, conio stb.)</p>
				<p>Éppen ezért szeretnékn bemutatni egy egyszerű, cross-platform és C/C++ alatt működő megoldást az <b>RlUtil</b>-t.</p>
				<p>
					<a href="http://tapiov.net/rlutil/docs/HTML/files/rlutil-h.html"><Icon name={'book'}/> RlUtil dokumentáció</a><br/>
					<a href="https://github.com/tapio/rlutil"><Icon name={'github'}/> RlUtil GitHub</a><br/>
					<a href="download/rlutil.h" download="rlutil.h"><Icon name={'download'}/> RlUtil letöltése</a><br/>
				</p>

				<h5>Használat</h5>
				<p>Az egész könyvtár egyetlen header fájlban található meg, így elegendő azt beincludeolni.</p>
				<Syntax>{`#include "rlutil.h"`}</Syntax>

				<p>Minden függvény az <b>rlutil</b> nevű névtérben található, kivéve a <i>getch</i>, <i>kbhit</i> and <i>gotoxy</i>.</p>

				<h5>Dokumentáció</h5>
				<RlUtilDocs/>

				<h5>Függelék</h5>
				<p><b>Színkódok</b></p>
				<Table className="colors" textAlign={'center'}>
					<Table.Body>
						<Table.Row><Table.Cell className="x-black x-white-text">rlutil::BLACK</Table.Cell><Table.Cell className="x-white x-black-text">rlutil::WHITE</Table.Cell></Table.Row>
						<Table.Row><Table.Cell className="x-darkgrey x-white-text">rlutil::DARKGREY</Table.Cell><Table.Cell className="x-grey x-white-text">rlutil::GREY</Table.Cell></Table.Row>
						<Table.Row><Table.Cell className="x-red x-white-text">rlutil::RED</Table.Cell><Table.Cell className="x-lightred x-white-text">rlutil::LIGHTRED</Table.Cell></Table.Row>
						<Table.Row><Table.Cell className="x-brown x-white-text">rlutil::BROWN</Table.Cell><Table.Cell className="x-yellow x-black-text">rlutil::YELLOW</Table.Cell></Table.Row>
						<Table.Row><Table.Cell className="x-green x-white-text">rlutil::GREEN</Table.Cell><Table.Cell className="x-lime x-black-text">rlutil::LIGHTGREEN</Table.Cell></Table.Row>
						<Table.Row><Table.Cell className="x-cyan x-white-text">rlutil::CYAN</Table.Cell><Table.Cell className="x-lightcyan x-black-text">rlutil::LIGHTCYAN</Table.Cell></Table.Row>
						<Table.Row><Table.Cell className="x-blue x-white-text">rlutil::BLUE</Table.Cell><Table.Cell className="x-lightblue x-white-text">rlutil::LIGHTBLUE</Table.Cell></Table.Row>
						<Table.Row><Table.Cell className="x-purple x-white-text">rlutil::MAGENTA</Table.Cell><Table.Cell className="x-lightpurple x-white-text">rlutil::LIGHTMAGENTA</Table.Cell></Table.Row>
					</Table.Body>
				</Table>
				<p><b>Billentyűkódok</b></p>
				<p>Az alfanumerikus billentyűk a karakteres reprezentációjukkal hivatkozhatók (pl 'a', '4', '*').</p>

				<Table className="keys" compact>
					<Table.Body>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_ESCAPE</Table.Cell><Table.Cell>Escape</Table.Cell><Table.Cell textAlign={'right'}>KEY_ENTER</Table.Cell><Table.Cell>Enter</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_SPACE</Table.Cell><Table.Cell>Space</Table.Cell><Table.Cell textAlign={'right'}>KEY_INSERT</Table.Cell><Table.Cell>Insert</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_HOME</Table.Cell><Table.Cell>Home</Table.Cell><Table.Cell textAlign={'right'}>KEY_END</Table.Cell><Table.Cell>End</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_PGUP</Table.Cell><Table.Cell>PageUp</Table.Cell><Table.Cell textAlign={'right'}>KEY_PGDOWN</Table.Cell><Table.Cell>PageDown</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_UP</Table.Cell><Table.Cell>Fel nyíl</Table.Cell><Table.Cell textAlign={'right'}>KEY_DOWN</Table.Cell><Table.Cell>Le nyíl</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_LEFT</Table.Cell><Table.Cell>Balra nyíl</Table.Cell><Table.Cell textAlign={'right'}>KEY_RIGHT</Table.Cell><Table.Cell>Jobbra nyíl</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_F1</Table.Cell><Table.Cell>F1</Table.Cell><Table.Cell textAlign={'right'}>KEY_F2</Table.Cell><Table.Cell>F2</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_F3</Table.Cell><Table.Cell>F3</Table.Cell><Table.Cell textAlign={'right'}>KEY_F4</Table.Cell><Table.Cell>F4</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_F5</Table.Cell><Table.Cell>F5</Table.Cell><Table.Cell textAlign={'right'}>KEY_F6</Table.Cell><Table.Cell>F6</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_F7</Table.Cell><Table.Cell>F7</Table.Cell><Table.Cell textAlign={'right'}>KEY_F8</Table.Cell><Table.Cell>F8</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_F9</Table.Cell><Table.Cell>F9</Table.Cell><Table.Cell textAlign={'right'}>KEY_F10</Table.Cell><Table.Cell>F10</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_F11</Table.Cell><Table.Cell>F11</Table.Cell><Table.Cell textAlign={'right'}>KEY_F12</Table.Cell><Table.Cell>F12</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_NUMPAD0</Table.Cell><Table.Cell>Numpad 0</Table.Cell><Table.Cell textAlign={'right'}>KEY_NUMPAD1</Table.Cell><Table.Cell>Numpad 1</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_NUMPAD2</Table.Cell><Table.Cell>Numpad 2</Table.Cell><Table.Cell textAlign={'right'}>KEY_NUMPAD3</Table.Cell><Table.Cell>Numpad 3</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_NUMPAD4</Table.Cell><Table.Cell>Numpad 4</Table.Cell><Table.Cell textAlign={'right'}>KEY_NUMPAD5</Table.Cell><Table.Cell>Numpad 5</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_NUMPAD6</Table.Cell><Table.Cell>Numpad 6</Table.Cell><Table.Cell textAlign={'right'}>KEY_NUMPAD7</Table.Cell><Table.Cell>Numpad 7</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_NUMPAD8</Table.Cell><Table.Cell>Numpad 8</Table.Cell><Table.Cell textAlign={'right'}>KEY_NUMPAD9</Table.Cell><Table.Cell>Numpad 9</Table.Cell></Table.Row>
						<Table.Row><Table.Cell textAlign={'right'}>KEY_NUMDEL</Table.Cell><Table.Cell>Numpad Del</Table.Cell><Table.Cell textAlign={'right'}>KEY_DELETE</Table.Cell><Table.Cell>Delete</Table.Cell></Table.Row>
					</Table.Body>
				</Table>

				<h5>Példakód</h5>

				<p>Az alább látható egy példakód az RlUtil használatáról. A példában egy karaktert tudunk mozgatni a terminálablakban a nyíl billentyűkkel.</p>
				<Syntax>{'#include <iostream>\n#include "rlutil.h"\n\nunsigned int x = 1, y = 1;\n\nbool valid(unsigned int px, unsigned int py) {\n\treturn (\n\t\tpx > 0 && \n\t\tpy > 0 &&\n\t\tpx <= rlutil::tcols() &&\n\t\tpy <= rlutil::trows()\n\t);\n}\n\nvoid printCursor() {\n\trlutil::cls();\n\trlutil::locate(x, y);\n\tstr::cout << (char)219;\n}\n\nint main(int argc, char const *argv[])\n{\n\tbool exit = false;\n\n\trlutil::saveDefaultColor();\n\trlutil::hidecursor();\n\trlutil::setColor(rlutil::RED);\n\trlutil::setBackgroundColor(rlutil::WHITE);\n\tprintCursor();\n\n\twhile(!exit) {\n\t\tif(kbhit()) {\n\t\t\tswitch(rlutil::getkey()) {\n\t\t\t\tcase rlutil::KEY_ESCAPE: exit = true; break;\n\t\t\t\tcase rlutil::KEY_UP: \tif(valid(x, y-1)) y--; break;\n\t\t\t\tcase rlutil::KEY_DOWN: \tif(valid(x, y+1)) y++; break;\n\t\t\t\tcase rlutil::KEY_LEFT: \tif(valid(x-1, y)) x--; break;\n\t\t\t\tcase rlutil::KEY_RIGHT: if(valid(x+1, y)) x++; break;\n\t\t\t}\n\t\t\t\n\t\t\tprintCursor();\n\t\t}\n\t}\n\n\trlutil::showcursor();\n\trlutil::resetColor();\n\treturn 0;\n}'}</Syntax>
			</Container>
		);
	}
}
