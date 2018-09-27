import React from 'react';
import ReactDOM from 'react-dom'; 
import CRouter from './router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CRouter />, document.getElementById('root'));
registerServiceWorker();
