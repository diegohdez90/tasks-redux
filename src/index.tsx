import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/App';
import store from './app/store';
import { Provider } from 'react-redux';

import './style.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
