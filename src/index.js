import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '@material-tailwind/react';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import App from './App';
import './index.css';

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<CookiesProvider>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</CookiesProvider>
		</BrowserRouter>
	</React.StrictMode>
);
