import React, { Component } from 'react';
// import logo from './logo.svg';
import './styles/App.css';
import { Link, Router, withRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import Navigation from './containers/Navigation'
import Routes from './containers/Routes'

import rootSaga from './sagas';
import createSagaMiddleWare from 'redux-saga';
import { getUserIdFromToken } from './common/auth/jwtHelper';
import * as actionTypes from './common/constants';


import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

const sagaMiddleware = createSagaMiddleWare();
const store = createStore(
	rootReducer,
	applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga);

if (localStorage.getItem('token')) {
	axios.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('token');
}

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activeRoute: ''
		}
	}

	componentWillMount() {
		this.setState({
			activeRoute: this.props.location.pathname
		}, () => {
			store.dispatch({ type: actionTypes.USER_SET_PERSONAL_INFO_REQUEST, payload: getUserIdFromToken() });
			this.onRouteChanged(this.props.location.pathname)
		});
		
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			store.dispatch({ type: actionTypes.ROUTE_CHANGED });
			this.setState({
				activeRoute: this.props.location.pathname
			}, this.onRouteChanged(this.props.location.pathname));
		}
	}

	

	onRouteChanged(route) {
		console.log(route)
		switch (route) {
			case ('/users' || 'aa'):
				store.dispatch({ type: actionTypes.USER_GET_ALL_REQUEST })
		}
	}


	render() {
		return (
			<Provider store={store}>
				<div className='App'>
					<Navigation activeRoute={this.state.activeRoute} />
					<Container>
						<Row>
							<Col xs="12"><Routes /></Col>
						</Row>
					</Container>
				</div>
			</Provider>
		)
	}
}

export default withRouter(App)
