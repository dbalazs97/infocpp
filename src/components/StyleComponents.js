import React, {Component} from 'react';
import {Header} from 'semantic-ui-react-single/Header';
import {Icon} from 'semantic-ui-react-single/Icon';
import {Menu} from 'semantic-ui-react-single/Menu';
import {Dropdown} from 'semantic-ui-react-single/Dropdown';
import {Popup} from 'semantic-ui-react-single/Popup';
import {Segment} from 'semantic-ui-react-single/Segment';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import {atomDark} from 'react-syntax-highlighter/styles/prism';
import {Link} from "react-router-dom";

// Block
export const Block = ({type, children}) => {
	return (
		<Segment className={`block-${type}`} color={((type === 'example') ? 'green' : (type === 'important') ? 'olive' : (type === 'modern') ? 'red' : 'black')}>
			<span className={`block-flag block-flag-${type}`}>{
				(
					(type === 'example') ? 'példa' :
						(type === 'important') ? 'definíció' :
							(type === 'modern') ? 'kiegészítő' :
								''
				)
			}</span>
			{children}
		</Segment>
	);
};

// Syntax Highlighter
export const Syntax = (props) => {
	return (
		<React.Fragment>
			<Popup
				trigger={<button className="copy-button" onClick={() => navigator.clipboard.writeText(props.children)}><Icon inverted color={'green'} name={'copy'}/></button>}
				content={'Másolva'}
				on={'click'}
				position={'top center'}
				hideOnScroll
				inverted
			/>

			<SyntaxHighlighter language="cpp" style={atomDark}>
				{props.children}
			</SyntaxHighlighter>
		</React.Fragment>
	);
};

// Header
export const PageHeader = ({children, icon}) => (
	<span>
		<Header as='h2'>
			{icon && <Icon name={icon}/>}
			<Header.Content>{children}</Header.Content>
		</Header>		
		<hr/>
	</span>
);

// Bottom lesson bar
export class BottomLessonChanger extends Component {
	render() {
		let {current, title} = this.props;
		return (
			<Menu fixed={'bottom'} widths={3} size={'mini'} inverted>
				{current !== 1 ?
					<Menu.Item as={Link} to={`/lesson/${current - 1}`}>
						<Icon name={'left arrow'}/>
						Előző
					</Menu.Item>
					:
					<Menu.Item disabled>
						<Icon name={'left arrow'}/>
						Előző
					</Menu.Item>
				}

				<Dropdown text={title} fluid upward basic className='link item inverted'>
					<Dropdown.Menu className={'inverted'}>
						<Dropdown.Item as={Link} to={'/lessons'}>Bevezető</Dropdown.Item>
						<Dropdown.Item as={Link} to={'/lesson/1'}>1: C és C++ eltérések</Dropdown.Item>
						<Dropdown.Item as={Link} to={'/lesson/2'}>2: OOP alapok</Dropdown.Item>
						<Dropdown.Item as={Link} to={'/lesson/3'}>3: Osztályok tulajdonságai</Dropdown.Item>
						<Dropdown.Item as={Link} to={'/lesson/4'}>4: Öröklés</Dropdown.Item>
						<Dropdown.Item as={Link} to={'/lesson/5'}>5: Példányok tulajdonságai</Dropdown.Item>
						<Dropdown.Item as={Link} to={'/lesson/6'}>6: Sablonok</Dropdown.Item>
						<Dropdown.Item as={Link} to={'/lesson/7'}>7: Iterátorok</Dropdown.Item>
						<Dropdown.Item as={Link} to={'/lesson/8'}>8: Többszörös öröklés, szerializáció</Dropdown.Item>
						<Dropdown.Item as={Link} to={'/lesson/9'}>9: Kivételkezelés, az STL elemei</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>


				{current !== 9 ?
					<Menu.Item as={Link} to={`/lesson/${current + 1}`}>
						Következő
						<Icon name={'right arrow'}/>
					</Menu.Item>
					:
					<Menu.Item disabled>
						Következő
						<Icon name={'right arrow'}/>
					</Menu.Item>
				}c
			</Menu>
		);
	}
}

// SVG display
export const SVG = ({src, alt = 'kép', halfWidth = false, doubleWidth = false}) => (
	<span className={'svg-container'}>
		<img src={src} alt={alt} className={`svg-image ${(halfWidth) ? 'svg-image-half' : (doubleWidth) ? 'svg-image-double' : ''}`}/>
	</span>
);

export const SVGTable = ({src1, src2, src3, halfWidth = false, figcap = false, alt = 'kép'}) => (
	<div className={`svg-table-container`}>
		<img src={src1} alt={alt} className={`svg-${typeof src3 === 'undefined' ? '2' : '3'}-table-image ${halfWidth ? 'svg-image-half' : ''}`}/>
		{figcap && <span className={'figcap'}>1.</span>}
		<img src={src2} alt={alt} className={`svg-${typeof src3 === 'undefined' ? '2' : '3'}-table-image ${halfWidth ? 'svg-image-half' : ''}`}/>
		{figcap && <span className={'figcap'}>2.</span>}
		{src3 &&
		<React.Fragment>
			<img src={src3} alt={alt} className={`svg-${typeof src3 === 'undefined' ? '2' : '3'}-table-image ${halfWidth ? 'svg-image-half' : ''}`}/>
			{figcap && <span className={'figcap'}>3.</span>}
		</React.Fragment>
		}
	</div>
);

// Title changer
export const PageTitle = ({text}) => {
	document.title = text;
	return null;
};
