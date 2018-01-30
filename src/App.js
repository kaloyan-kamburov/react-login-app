import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import Navigation from './containers/Navigation'
import Routes from './containers/Routes'

const store = createStore(rootReducer)

const App = props => {
	return (
		<Provider store={store}>
			<div>
				<Navigation />
				<Routes />
			</div>
		</Provider>
	)
}

export default App
