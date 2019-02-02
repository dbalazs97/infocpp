import React from 'react';
import {Block, PageHeader, PageTitle} from '../StyleComponents';
import {Container} from 'semantic-ui-react-single/Container';
import {Table} from 'semantic-ui-react-single/Table';
import {Statistic} from 'semantic-ui-react-single/Statistic';

export default function InfoPage() {
	return (
		<Container>
			<PageTitle text='InfoC++2 :: Info'/>
			<PageHeader icon='info circle'>Információk</PageHeader>

			<h5>Tárgy adatok</h5>
			<p><b>Tárgykód</b>: VIIIAA03</p>
			<p><b>Beosztás</b>: 2 óra előadás + 2 óra labor</p>
			<p><b>Tárgylap</b>: <a href="https://portal.vik.bme.hu/kepzes/targyak/VIIIAA03/">https://portal.vik.bme.hu/kepzes/targyak/VIIIAA03/</a></p>
			<p><b>Tárgyhonlap</b>: <a href="https://infocpp.iit.bme.hu">https://infocpp.iit.bme.hu</a></p>

			<hr/>
			<h5>Követelmények</h5>

			<Statistic.Group widths='4' size={'mini'}>
				<Statistic>
					<Statistic.Value>70%</Statistic.Value>
					<Statistic.Label>részvétel</Statistic.Label>
				</Statistic>

				<Statistic>
					<Statistic.Value>3</Statistic.Value>
					<Statistic.Label>KZH</Statistic.Label>
				</Statistic>

				<Statistic>
					<Statistic.Value>2</Statistic.Value>
					<Statistic.Label>NZH</Statistic.Label>
				</Statistic>

				<Statistic>
					<Statistic.Value>1</Statistic.Value>
					<Statistic.Label>HF</Statistic.Label>
				</Statistic>

			</Statistic.Group>
			<Block type=''><b>Ezek csak tájékoztató jellegűek, hivatalos információért keresd a TAD-ot vagy a tárgyhonlapot.</b></Block>


			<p>Ezekből: Pontszám = NZH1 + NZH2 + legjobb_2_kZH_pontszáma + EXTRA</p>

			<Table celled unstackable>
				<Table.Header><Table.Row><Table.HeaderCell>Ponthatár</Table.HeaderCell><Table.HeaderCell>Jegy</Table.HeaderCell></Table.Row></Table.Header>
				<Table.Body>
					<Table.Row><Table.Cell>0-47</Table.Cell><Table.Cell>1</Table.Cell></Table.Row>
					<Table.Row><Table.Cell>48-60</Table.Cell><Table.Cell>2</Table.Cell></Table.Row>
					<Table.Row><Table.Cell>61-73</Table.Cell><Table.Cell>3</Table.Cell></Table.Row>
					<Table.Row><Table.Cell>74-86</Table.Cell><Table.Cell>4</Table.Cell></Table.Row>
					<Table.Row><Table.Cell>87-&infin;</Table.Cell><Table.Cell>5</Table.Cell></Table.Row>
				</Table.Body>
			</Table>
		</Container>
	);
};
