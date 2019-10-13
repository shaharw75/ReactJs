import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './css/app.css';
import App from './components/App';
import { Provider } from 'mobx-react'
import Store from "./components/Store";

const rootElement = document.getElementById('root');
const store = new Store();

ReactDOM.render( <Provider appStore={store}><App /></Provider>, rootElement);

registerServiceWorker();
