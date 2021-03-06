import React from 'react';
import {PageHeader, PageTitle} from '../StyleComponents';
import {Icon} from 'semantic-ui-react-single/Icon';
import {Segment} from 'semantic-ui-react-single/Segment';
import {Container} from 'semantic-ui-react-single/Container';
import {Card} from 'semantic-ui-react-single/Card';
import {Image} from 'semantic-ui-react-single/Image';

import contactImage from '../../img/contact.png';

export default function ContactPage() {
	return (
		<Container>
			<PageTitle text='InfoC++2 :: Kapcsolat'/>
			<PageHeader icon='user'>Kapcsolat</PageHeader>
			<Card.Group centered>
				<Card>
					<Image src={contactImage}/>
					<Card.Content>
						<Card.Header>Dóka Balázs</Card.Header>
						<Card.Meta>BME</Card.Meta>
						<Card.Description>Tartalomfejlesztés, design, programozás.</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<Icon name={"mail"}/> <a href={'mailto:colorplay@protonmail.com'}>colorplay@protonmail.com</a>
					</Card.Content>
				</Card>
				<Card>
					<Image src={contactImage}/>
					<Card.Content>
						<Card.Header>Hassan Khaled</Card.Header>
						<Card.Meta>BME</Card.Meta>
						<Card.Description>Tartalomfejlesztés, DevOps, üzemeltetés.</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<Icon name={"mail"}/> <a href={'mailto:colorplay@protonmail.com'}>colorplay@protonmail.com</a>
					</Card.Content>
				</Card>
			</Card.Group>
			<hr/>
			<h5>Forráskód</h5>
			<p>Az oldal forráskódja elérhető GitHubon. Ha hibát találsz szívesen fogadjuk az Issue-kat és Pull request-eket.</p>
			<p><a href="https://github.com/dbalazs97/infocpp" target={'_blank'} rel="noopener noreferrer"><Icon name={'github'}/> InfoCPP GitHub</a></p>
			<hr/>
			<h5>Felhasznált eszközök</h5>
			<Segment>
				<b>Segédanyagok:</b> Tárgyhonlap, TutorialsPoint <br/>
				<b>Forráskódok:</b> Tárgyhonlap, StackOverflow, saját
			</Segment>
			<Segment>
				<b>UI framework:</b> React <br/>
				<b>UI:</b> Semantic UI <br/>
				<b>Ábrák:</b> draw.io
			</Segment>
		</Container>
	);
};
