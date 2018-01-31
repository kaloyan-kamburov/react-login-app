import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Register from '../../containers/Register/';
import LoginForm from '../../components/LoginForm'

class Routes extends Component {
    render() {
        // const ActivePage = this.props.activePage;

        return(
            <div>
            <Switch>
                <Route exact path="/" component={() => (<h1>Home</h1>)}/>
                <Route path="/register" component={Register}/>
            </Switch>
            </div>
        )
    }
}

export default Routes