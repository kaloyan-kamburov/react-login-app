import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Register from '../Register/index.js';

class Routes extends Component {
    render() {
        // const ActivePage = this.props.activePage;

        return(
            <Switch>
                <Route path="/"/>
                <Route path="/register" component={Register}/>
            </Switch>
        )
    }
}

const mapStateToProps = state => {
    return {
        pages: state.pages
    }
}

export default connect(mapStateToProps)(Routes);