import React from "react";
import ReactDOM from 'react-dom'
import Router from './components/Router';
import './css/style.css';

ReactDOM.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
    document.getElementById('main')
);

