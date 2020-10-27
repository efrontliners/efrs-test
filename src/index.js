import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../src/styles/stylesMain.css'
import '../src/styles/responsive.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Router} from 'react-router-dom'
import axios from 'axios'
import history from './components/history'
axios.defaults.baseURL = 'https://efrs-demo.herokuapp.com';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
     <App />
     </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
