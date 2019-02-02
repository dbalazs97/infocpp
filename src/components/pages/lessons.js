import React from 'react';
import {Block, PageHeader, PageTitle, Syntax} from '../StyleComponents';
import {Header} from 'semantic-ui-react-single/Header';
import {Container} from 'semantic-ui-react-single/Container';
import {List} from 'semantic-ui-react-single/List';
import {Link} from "react-router-dom";

export default function LessonsPage() {
	return (
		<Container>
			<PageTitle text='InfoC++2 :: Tananyag'/>
			<PageHeader icon='book'>Tananyag</PageHeader>

			<Header as={'h4'}>Tartalomjegyzék</Header>
			<List>
				<List.Item as={Link} to={'/lesson/1'}>1: C és C++ eltérések</List.Item>
				<List.Item as={Link} to={'/lesson/2'}>2: OOP alapok</List.Item>
				<List.Item as={Link} to={'/lesson/3'}>3: Osztályok tulajdonságai</List.Item>
				<List.Item as={Link} to={'/lesson/4'}>4: Öröklés</List.Item>
				<List.Item as={Link} to={'/lesson/5'}>5: Példányok tulajdonságai</List.Item>
				<List.Item as={Link} to={'/lesson/6'}>6: Sablonok</List.Item>
				<List.Item as={Link} to={'/lesson/7'}>7: Iterátorok</List.Item>
				<List.Item as={Link} to={'/lesson/8'}>8: Többszörös öröklés, szerializáció</List.Item>
				<List.Item as={Link} to={'/lesson/9'}>9: Kivételkezelés, az STL elemei</List.Item>
			</List>

			<hr/>
			<Header as={'h4'}>Bevezető</Header>
			<p>Az oldalon található tananyag kiegészítést biztosít az előadások, gyakorlatok és laborok anyagához, éppen ezért a témakörök beosztása ezen órák anyagához vannak igazítva.</p>
			<p>Az egyes fejezetek elkészítésekor az volt a vezérelv, hogy minél kevesebb szöveg és nagyon sok kód szerepeljen, ezzel is erősítve azt, hogy a programozást csak a gyakorlat útján lehet megtanulni. Éppen e miatt az oldalon található forráskódok is a tananyag részei, azok többletinformációt tartalmaznak a szöveges leírásokon túl.</p>
			<p>A forráskódok kommentjei az adott sor részleteit magyarázzák el, valamint a //... jelölés azt jelenti, hogy az utána következő rész máshol található a kódban.</p>
			<p>A Függelék menüpontban összegyűjtöttük a tárgy során gyakran előforduló és sokszor használt kódrészleteket és adatszerkezeteket, mely tekinthető egyfajta elméleti összefoglalónak.</p>

			<hr/>
			<Header as={'h4'}>Jelmagyarázat</Header>
			<List bulleted>
				<List.Item>A fontosabb részeket és szövegbeli kódrészeket <b>félkövér</b> betűkkel jelöljük.</List.Item>
				<List.Item>A tananyagban lévő kódrészletek ilyen színezett dobozokban vannak:</List.Item>
				<Syntax>{`status = GetRadarInfo(); if (status = 1) LaunchNukes();`}</Syntax>
				<List.Item><Block type={'important'}>A témában lévő definíciókat világoszöld csíkkal jelöljük</Block></List.Item>
				<List.Item><Block type={'example'}>A témában lévő példákat zöld csíkkal jelöljük</Block></List.Item>
				<List.Item><Block type={'modern'}>A modernebb, C++11 vagy nem tárgykövetelmény anyagokat piros csíkkal jelöljük.</Block></List.Item>
			</List>
		</Container>
	);
};
