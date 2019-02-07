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
				<List.Item as={Link} to={'/extras/hftest'}>
					<List.Icon name={'lab'} size={'big'}/>
					<List.Content content={'HFTest használata'}/>
				</List.Item>
				<List.Item>
					<List.Icon name={'file pdf outline'} size={'big'}/>
					<List.Content>
						Saját dia sorok
					</List.Content>
					<List.Description>
						|{' '}
						{
							[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
								<span><a href={`https://www.uniforum.hu/download/dia/dia${i}.pdf`} target={'_blank'} rel="noopener noreferrer">{i}. dia</a> | </span>
							))
						}
					</List.Description>
				</List.Item>
				<List.Item>
					<List.Icon name={'file pdf outline'} size={'big'}/>
					<List.Content>
						Hivatalos diasorok backup (2018)
					</List.Content>
					<List.Description>
						|{' '}
						{
							[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
								<span><a href={`https://www.uniforum.hu/download/ea/${i}_ea-c.pdf`} target={'_blank'} rel="noopener noreferrer">{i}. dia</a> | </span>
							))
						}
						<hr/>
						|{' '}
						<span><a href={`https://www.uniforum.hu/download/puska/cppsummary.pdf`} target={'_blank'} rel="noopener noreferrer">CPP puska</a> | </span>
						<span><a href={`https://www.uniforum.hu/download/puska/stdc.pdf`} target={'_blank'} rel="noopener noreferrer">C puska</a> | </span>
						<span><a href={`https://www.uniforum.hu/download/puska/stlsummary.pdf`} target={'_blank'} rel="noopener noreferrer">STL puska</a> | </span>
					</List.Description>
				</List.Item>
				<List.Item>
					<List.Icon name={'calendar check'} size={'big'}/>
					<List.Content>
						Konzultációink
					</List.Content>
					<List.Description>
						|{' '}
						<span><a href={`https://www.uniforum.hu/download/konzi1/konzi.pdf`} target={'_blank'} rel="noopener noreferrer">2018. 03. 23. Konzi</a> | </span>
						<span><a href={`https://www.uniforum.hu/download/konzi1/grumpy.cpp`} target={'_blank'} rel="noopener noreferrer">Grumpy Cat megoldás</a> | </span>
						<span><a href={`https://www.uniforum.hu/download/konzi1/gps.cpp`} target={'_blank'} rel="noopener noreferrer">GPS megoldás</a> | </span>
						<span><a href={`https://www.uniforum.hu/download/konzi1/tokio.cpp`} target={'_blank'} rel="noopener noreferrer">Tokio megoldás</a> | </span>
						<span><a href={`https://www.uniforum.hu/download/konzi1/vector.cpp`} target={'_blank'} rel="noopener noreferrer">Vector megoldás</a> | </span>
						<hr/>
						|{' '}
						<span><a href={`https://www.uniforum.hu/download/konzi2/konzi2.pdf`} target={'_blank'} rel="noopener noreferrer">2018. 05. 04. Konzi</a> | </span>
						<span><a href={`https://www.uniforum.hu/download/konzi2/mylist.cpp`} target={'_blank'} rel="noopener noreferrer">MyList megoldás</a> | </span>
						<span><a href={`https://www.uniforum.hu/download/konzi2/soldier.cpp`} target={'_blank'} rel="noopener noreferrer">Soldier megoldás</a> | </span>
						<span><a href={`https://www.uniforum.hu/download/konzi2/stack.cpp`} target={'_blank'} rel="noopener noreferrer">Stack megoldás</a> | </span>
						<hr/>
						|{' '}
						<span><a href={`https://www.uniforum.hu/download/szombat/szombat.pdf`} target={'_blank'} rel="noopener noreferrer">2018. 03. 10. Szombat</a> | </span>
						<span><a href={`https://www.uniforum.hu/download/szombat/animal.cpp`} target={'_blank'} rel="noopener noreferrer">Animal megoldás</a> | </span>
						<span><a href={`https://www.uniforum.hu/download/szombat/matrix.cpp`} target={'_blank'} rel="noopener noreferrer">Matrix megoldás</a> | </span>
						<span><a href={`https://www.uniforum.hu/download/szombat/vektor.cpp`} target={'_blank'} rel="noopener noreferrer">Vektor megoldás</a> | </span>
					</List.Description>
				</List.Item>
			</List>
		</Container>
	);
};
