import React from 'react';
import ReactDOM from 'react-dom'; 
import CRouter from './router';
import {Provider} from "react-redux"
import { createStore } from 'redux'
import registerServiceWorker from './registerServiceWorker';

import ruducers from './store/reducers'
import store from './store'
import './style/loading.less' 
ReactDOM.render(
    <Provider store={store}>
        <CRouter />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
