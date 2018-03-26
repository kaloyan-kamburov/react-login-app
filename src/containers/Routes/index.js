import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RegisterContainer from '../../containers/Register/';
import LoginContainer from '../../containers/Login/';
import ProfileContainer from '../../containers/Profile/';
import UsersContainer from '../../containers/Admin/Users/';

class Routes extends Component {
    render() {
        return(
            <div>
                <Switch>
                    <Route exact path="/" component={() => (<h1>Home</h1>)}/>
                    <Route path="/register" component={RegisterContainer}/>
                    <Route path="/login" component={LoginContainer}/>
                    <Route path="/profile" component={ProfileContainer}/> 
                    <Route path="/users" component={UsersContainer}/> 
                </Switch>
            </div> 
        )
    }
}

export default Routes;