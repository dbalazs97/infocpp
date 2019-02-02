import React from 'react';
import {PageHeader, PageTitle} from '../StyleComponents';
import {Container} from 'semantic-ui-react-single/Container';
import {List} from 'semantic-ui-react-single/List';
import {Link} from "react-router-dom";

export default function ExtrasPage() {
	return (
		<Container>
			<PageTitle text='InfoC++2 :: Extrák'/>
			<PageHeader icon='add square'>Extrák</PageHeader>
			<List verticalAlign={'middle'} divided selection>
				<List.Item as={Link} to={'/extras/appendix'}>
					<List.Icon name={'plus'} size={'big'}/>
					<List.Content content={'Függelék'}/>
				</List.Item>
				<List.Item as={Link} to={'/extras/console'}>
					<List.Icon name={'terminal'} size={'big'}/>
					<List.Content content={'Érdekesség: Konzolos felületek'}/>
				</List.Item>
				<List.Item as={Link} to={'/extras/uml'}>
					<List.Icon name={'sitemap'} size={'big'}/>
					<List.Content content={'Érdekesség: UML diagramok'}/>
				</List.Item>
			</List>
		</Container>
	);
};
