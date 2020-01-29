import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// eslint-disable-next-line
import bsStyles from 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line
import appStyles from './styles/scss/main.scss';
// eslint-disable-next-line
import 'bootstrap';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
