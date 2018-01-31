import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import Navigation from './containers/Navigation'
import Routes from './containers/Routes'


import { Container, Row, Col } from 'reactstrap';

const store = createStore(rootReducer)

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
