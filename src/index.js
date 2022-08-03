import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import App from './App';
import './index.css';

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<CookiesProvider>
			<App />
		</CookiesProvider>
	</BrowserRouter>
);
