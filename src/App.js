import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import Navigation from './containers/Navigation'
import Routes from './containers/Routes'

import rootSaga from './sagas';
import createSagaMiddleWare from 'redux-saga';

import axios from 'axios';


import { Container, Row, Col } from 'reactstrap';

const sagaMiddleware = createSagaMiddleWare();
const store = createStore(
	rootReducer,
	applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga);

const App = props => {
	return (
		<Provider store={store}>
			<div className='App'>
				<Navigation />
				<Container>
					<Row>
						<Col xs="12"><Routes/></Col>
					</Row>
				</Container>
			</div>
		</Provider>
	)
}

export default App
