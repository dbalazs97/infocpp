import React, {Component, lazy, Suspense} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import TopMenu from './TopMenu';
import {Dimmer} from "semantic-ui-react-single/Dimmer";
import {Loader} from "semantic-ui-react-single/Loader";
import CookieConsent from "react-cookie-consent";

const IndexPage = lazy(() => import( './pages/index'));
const InfoPage = lazy(() => import( './pages/info'));
const ContactPage = lazy(() => import( "./pages/contact"));
const LessonsPage = lazy(() => import( "./pages/lessons"));
const ExtrasPage = lazy(() => import( "./pages/extras"));
const AppendixPage = lazy(() => import( "./pages/extras/appendix"));
const ConsolePage = lazy(() => import( "./pages/extras/console"));
const UMLPage = lazy(() => import( "./pages/extras/uml"));
const lessons = [
	lazy(() => import( `./pages/lessons/lesson1`)),
	lazy(() => import( `./pages/lessons/lesson2`)),
	lazy(() => import( `./pages/lessons/lesson3`)),
	lazy(() => import( `./pages/lessons/lesson4`)),
	lazy(() => import( `./pages/lessons/lesson5`)),
	lazy(() => import( `./pages/lessons/lesson6`)),
	lazy(() => import( `./pages/lessons/lesson7`)),
	lazy(() => import( `./pages/lessons/lesson8`)),
	lazy(() => import( `./pages/lessons/lesson9`)),
];


export default withRouter(
	class PageRouter extends Component {
		state = {
			activePage: 'home'
		};

		componentDidMount() {
			this.onRouteChanged(this.props.location);
		}

		componentDidUpdate(prevProps) {
			if (this.props.location !== prevProps.location) {
				this.onRouteChanged(this.props.location);
			}
		}

		onRouteChanged(location) {
			if (!location.pathname) return;
			if (location.pathname.includes('info')) return this.setState({activePage: 'info'});
			if (location.pathname.includes('extras')) return this.setState({activePage: 'extras'});
			if (location.pathname.includes('lesson')) return this.setState({activePage: 'lessons'});
			if (location.pathname.includes('contact')) return this.setState({activePage: 'contact'});
			this.setState({activePage: 'home'});
		}

		render() {
			return (
				<React.Fragment>
					<TopMenu activePage={this.state.activePage}/>
					<CookieConsent
						debug={process.env.NODE_ENV === 'development'}
						buttonText={'Értem'}
						style={{background: '#21ba45'}}
						buttonStyle={{background: "rgb(30,167,62)", color: 'white', fontSize: "13px", cursor: 'pointer'}}
					>
						Weboldalunk cookie-kat (sütiket) használ a forgalom mérésére és a felhasználói élmény biztosításához.
					</CookieConsent>
					<Suspense fallback={<Dimmer active><Loader content={'Betöltés...'}/></Dimmer>}>
						<Switch>
							<Route exact path="/" component={IndexPage} strict/>
							<Route path="/info" component={InfoPage}/>

							<Route path="/lessons" component={LessonsPage}/>
							{
								lessons.map((e, index) => <Route path={`/lesson/${index + 1}`} component={e} key={index} exact/>)
							}

							<Route path="/extras/appendix" component={AppendixPage} exact/>
							<Route path="/extras/console" component={ConsolePage} exact/>
							<Route path="/extras/uml" component={UMLPage} exact/>
							<Route path="/extras" component={ExtrasPage}/>
							<Route path="/contact" component={ContactPage}/>
						</Switch>
					</Suspense>
				</React.Fragment>
			);
		}
	})
