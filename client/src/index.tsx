import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <App url="http://localhost:9000" />, // pollInterval={2000}
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
