import React, { createContext, useReducer } from 'react';
import AppReducer from './reducers';

const initialState = { 
	lang: 'br',
	alerts: []
};

const getInitialStaste = () =>
	localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : initialState;

const mainReducer = (state, action) => AppReducer(state, action);

const AppContext = createContext({ state: getInitialStaste(), dispatch: () => null });

function AppProvider({ children }) {
	const [state, dispatch] = useReducer(mainReducer, getInitialStaste());
	return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
