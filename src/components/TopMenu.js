import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react-single/Icon';
import {Menu} from 'semantic-ui-react-single/Menu';
import {Responsive} from 'semantic-ui-react-single/Responsive';
import {Link} from 'react-router-dom'

export default class TopMenu extends Component {
	activePage = 'home';

	componentDidMount() {
		this.activePage = this.props.activePage;
	}

	componentWillUpdate(nextProps, nextState, nextContext) {
		this.activePage = nextProps.activePage;
	}

	handleItemClick = (e, {name}) => {
		this.activePage = name;
	};

	render() {
		return (
			<div className='topmenu'>
				<Menu color="green" inverted className='fixed'>
					<Menu.Item name="main" active={this.activePage === 'home'} onClick={this.handleItemClick} as={Link} to='/'>
						<Icon name="code" fitted/><Responsive {...Responsive.onlyLargeScreen}>InfoC++2</Responsive>
					</Menu.Item>

					<Menu.Menu position="right" color="green">
						<Menu.Item name="info" active={this.activePage === 'info'} onClick={this.handleItemClick} as={Link} to='/info'>
							<Responsive {...Responsive.onlyComputer}>Info</Responsive>
							<Responsive maxWidth={Responsive.onlyTablet.maxWidth} as={Icon} name={'info'} fitted/>
						</Menu.Item>

						<Menu.Item name="lessons" active={this.activePage === 'lessons'} onClick={this.handleItemClick} as={Link} to='/lessons'>
							<Responsive {...Responsive.onlyComputer}>Tananyag</Responsive>
							<Responsive maxWidth={Responsive.onlyTablet.maxWidth} as={Icon} name={'book'} fitted/>
						</Menu.Item>

						<Menu.Item name="extras" active={this.activePage === 'extras'} onClick={this.handleItemClick} as={Link} to='/extras'>
							<Responsive {...Responsive.onlyComputer}>Extrák</Responsive>
							<Responsive maxWidth={Responsive.onlyTablet.maxWidth} as={Icon} name={'add square'} fitted/>
						</Menu.Item>

						<Menu.Item name="contact" active={this.activePage === 'contact'} onClick={this.handleItemClick} as={Link} to='/contact'>
							<Responsive {...Responsive.onlyComputer}>Kapcsolat</Responsive>
							<Responsive maxWidth={Responsive.onlyTablet.maxWidth} as={Icon} name={'address card'} fitted/>
						</Menu.Item>
					</Menu.Menu>
				</Menu>
			</div>
		);
	}
}
