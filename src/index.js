// dependencies
import React from 'react';
import ReactDOM from 'react-dom';

import {HashRouter} from 'react-router-dom'
// styles
import './styles/css/index.css';
// components
import App from './App';

ReactDOM.render(
        <HashRouter>
            <App />
        </HashRouter>, 
document.getElementById('root'));
