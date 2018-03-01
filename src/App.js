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
import axios from 'axios';
import { getUserPersonalInfoFromToken } from './common/auth/jwtHelper';
import * as actionTypes from './common/constants';


import { Container, Row, Col } from 'reactstrap';

const sagaMiddleware = createSagaMiddleWare();
const store = createStore(
	rootReducer,
	applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga);

if (localStorage.getItem('loginAppToken')) {
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('loginAppToken')
	axios.defaults.headers.common['Content-type'] = 'application/json';
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
		})
		store.dispatch({ type: actionTypes.USER_SET_PERSONAL_INFO, payload: getUserPersonalInfoFromToken() })
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.setState({
				activeRoute: this.props.location.pathname
			})
		}
	}

	onRouteChanged() {
		console.log("ROUTE CHANGED");
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
