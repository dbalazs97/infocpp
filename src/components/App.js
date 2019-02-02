import React, {Component} from 'react';

import {BrowserRouter as Router} from 'react-router-dom'
import PageRouter from "./router";

import Analytics from 'react-router-ga';

class App extends Component {
	state = {
		selectedpage: 'home'
	};

	render() {
		return (
			<React.Fragment>
				<Router>
					<Analytics id={process.env.REACT_APP_GOOGLE_ANALYTICS_UID}>
						<PageRouter/>
					</Analytics>
				</Router>
			</React.Fragment>
		);
	}
}

export default App;
