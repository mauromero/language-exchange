import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducers from "./reducers";
import { Provider } from "react-redux";

const store = createStore(reducers);

ReactDOM.render(  
    <Provider store={store}>  
        <BrowserRouter>
            <App />
        </BrowserRouter> 
    </Provider>   
, document.getElementById('root'));
registerServiceWorker();
