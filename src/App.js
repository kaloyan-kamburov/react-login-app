import React, { Component } from 'react';
// import logo from './logo.svg';
import './styles/App.css';
import { Link, Router, withRouter } from 'react-router-dom';

import * as screenActions from './reducers/';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, bindActionCreators } from 'redux'
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
	axios.interceptors.response.use(/*success => {
		console.log(success)
		// store.dispatch({ type: actionTypes.SERVER_CHECK_SUCCESS, payload: success });
	}*/ null, error => {
		store.dispatch({ type: actionTypes.SERVER_CHECK_ERROR, payload: error.message });
	})
}


class App extends Component {

	constructor(props) {
		super(props);


		this.state = {
			activeRoute: '',
			serverError: ''
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

	componentDidMount() {
		store.dispatch({ type: actionTypes.SERVER_CHECK_REQUEST, payload: '' });
		store.subscribe(() => {
			this.setState({
				serverError: store.getState().server.error
			})
			
		})

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

	componentWillUpdate() {
		
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
						show={this.state.serverError}
						type='alert'
						msg={this.state.serverError}
					/>
				</div>
			</Provider>
		)
	}
}

const mapStateToProps = state => {
	console.log(state)
	return {
		...state
	}
}


export default withRouter(App);
