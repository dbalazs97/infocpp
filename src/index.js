import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import 'semantic-ui-react-single/css'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from "webfontloader";


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

WebFont.load({
	google: {
		families: ['Fira Mono', 'monospace']
	}
});
