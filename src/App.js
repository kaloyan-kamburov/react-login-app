import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import Login from './containers/Login'

const store = createStore(rootReducer)

const App = props => {
	return(
		<Provider store={store}>
			<Login />
		</Provider>
	)
}

export default App
