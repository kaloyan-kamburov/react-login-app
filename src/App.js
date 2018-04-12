import React, { Component } from 'react';
// import logo from './logo.svg';
import './styles/App.css';
import { Link, Router, withRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import rootReducer from './reducers'
import Navigation from './containers/Navigation'
import Routes from './containers/Routes'

import rootSaga from './sagas';
import createSagaMiddleWare from 'redux-saga';
import { getUserIdFromToken } from './common/auth/jwtHelper';
import * as actionTypes from './common/constants';

import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';


import Modal from './components/common/Modal';

const sagaMiddleware = createSagaMiddleWare();
const store = createStore(
	rootReducer,
	applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga);

if (localStorage.getItem('token')) {
	axios.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('token');
	axios.interceptors.response.use(null, error => {
		store.dispatch({ type: actionTypes.SERVER_ERROR, payload: error.message });
		
		//console.log(Object.assign({}, e))
		// console.log(e.message)
		// console.log(e)
	})
}


class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activeRoute: '',
			serverError: store.getState().server.error
		}
	}

	componentWillMount() {
		this.setState({
			activeRoute: this.props.location.pathname,
			serverError: store.getState().server.error
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
		// switch (route) {
		// 	case '/users':
		// 		store.dispatch({ type: actionTypes.ADMIN_GET_ALL_USERS_REQUEST })
		// }
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
					<Modal 
						show={store.getState().server.error}
						type='alert'
						msg={`Server is down. Please try again later.`}
					/>
				</div>
			</Provider>
		)
	}
}

export default withRouter(App)
