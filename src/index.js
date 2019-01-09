import React from 'react';
import { hydrate, render } from "react-dom";
import './css/index.css';
import './css/index-tablet.css';
import './css/index-mobile.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import { unregister } from './registerServiceWorker';

import {BrowserRouter} from "react-router-dom";

// unregister();

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate(<BrowserRouter><App /></BrowserRouter>, rootElement);
} else {
    render(<BrowserRouter><App /></BrowserRouter>, rootElement);
}


// registerServiceWorker();
