import React, {Component} from 'react';
import {List} from 'semantic-ui-react-single/List';
import {Table} from 'semantic-ui-react-single/Table';
import {Card} from 'semantic-ui-react-single/Card';
import {Syntax} from "../../StyleComponents";

export default class RlUtilDocs extends Component {
	state = {
		selectedIndex: 0
	};

	docs = [
		{name: 'kbhit', code: 'bool kbhit();', desc: 'A visszatérési értéke meghatározza, hogy lett-e billentyű lenyomva. (Nem blokkolja a szálat)'},
		{name: 'rlutil::getkey', code: 'int rlutil::getkey();', desc: 'Vár egy billentyű lenyomására, majd ha az megtötént visszadja a billentyű kódját. (A billentyűkódokat megtalálod a függelékben) (Blokkolja a szálat)'},
		{name: 'rlutil::setColor', code: 'void rlutil::setColor(const int color);', desc: 'Beállítja a következő karakter kiírások előtérszínét a paraméterként átadott színre. (A színkódokat megtalálod a függelékben)'},
		{name: 'rlutil::setBackgroundColor', code: 'void rlutil::setBackgroundColor(const int color);', desc: 'Beállítja a következő karakter kiírások háttérszínét a paraméterként átadott színre. (A színkódokat megtalálod a függelékben)'},
		{name: 'rlutil::saveDefaultColor', code: 'void rlutil::saveDefaultColor();', desc: 'Elmenti az aktuális színeket (csak Windows-on).'},
		{name: 'rlutil::resetColor', code: 'void rlutil::resetColor();', desc: 'Visszaállítja az elmentett színeket (csak Windows-on).'},
		{name: 'rlutil::cls', code: 'void rlutil::cls();', desc: 'Letörli a képernyő tartalmát, és a kurzort a bal-felső sarkba helyezi.'},
		{name: 'rlutil::locate', code: 'void rlutil::locate(int x, int y);', desc: 'Áthelyezi a kurzort a megadott (x, y) koordinátákra. A bal-felső sarok koordinátája az (1,1)!'},
		{name: 'rlutil::hidecursor', code: 'void rlutil::hidecursor();', desc: 'Elrejti a (villogó) kurzort.'},
		{name: 'rlutil::showcursor', code: 'void rlutil::showcursor();', desc: 'Megjeleníti a (villogó) kurzort.'},
		{name: 'rlutil::msleep', code: 'void rlutil::msleep(unsigned int milliseconds);', desc: 'Vár legalább a paraméterben (milliszekundumban) megadott ideig. (Blokkolja a szálat)'},
		{name: 'rlutil::trows', code: 'int rlutil::trows();', desc: 'Visszaadja a terminálablak sorainak számát vagy -1 ha hiba törénik.'},
		{name: 'rlutil::tcols', code: 'int rlutil::trows();', desc: 'Visszaadja a terminálablak oszlopainak számát vagy -1 ha hiba törénik.'},
		{name: 'rlutil::setConsoleTitle', code: 'void rlutil::setConsoleTitle(std::string title);', desc: 'Átállítja a terminálablak címsorában lévő szöveget a paraméterben megadott szövegre.'},
	];

	render() {
		return (
			<Table>
				<Table.Body>
					<Table.Row>
						<Table.Cell width={10}>
							<List divided selection verticalAlign={'middle'}>
								{this.docs.map((doc, index) => (
									<List.Item key={doc.name} active={index === this.state.selectedIndex} onClick={() => this.setState({selectedIndex: index})}>
										<List.Icon name={'code'} size={'small'}/>
										<List.Content>{doc.name}</List.Content>
									</List.Item>
								))}
							</List>
						</Table.Cell>
						<Table.Cell width={6}>
							<Card fluid>
								<Card.Content>
									<Card.Header content={this.docs[this.state.selectedIndex].name}/>
									<Card.Description>
										<Syntax>{this.docs[this.state.selectedIndex].code}</Syntax>
										{this.docs[this.state.selectedIndex].desc}
									</Card.Description>
								</Card.Content>
							</Card>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		);
	}
}
