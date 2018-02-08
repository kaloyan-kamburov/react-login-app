import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import RegisterContainer from '../../containers/Register/';
import LoginContainer from '../../containers/Login/';

class Routes extends Component {
    render() {
        // const ActivePage = this.props.activePage;

        return(
            <div>
            <Switch>
                <Route exact path="/" component={() => (<h1>Home</h1>)}/>
                <Route path="/register" component={RegisterContainer}/>
                <Route path="/login" component={LoginContainer}/>
            </Switch>
            </div>
        )
    }
}

export default Routes