import React, { Component } from 'react';

import Form from '../../containers/Form';
// import Input from '../../containers/Form/Input'; 

import { 
    notEmpty, 
    password 
} from '../../common/validators';

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h1>Login</h1>
                <Form
                    msg={this.props.user.formMessages.msgLogin}
                    onSubmit={this.props.onSubmit}
                    fields={[
                        {
                            type: 'text',
                            label: 'Username',
                            name: 'username',
                            validators: [notEmpty]
                        },
                        {
                            type: 'password',
                            label: 'Password',
                            name: 'password',
                            validators: [notEmpty]
                        }
                    ]}
                />
            </div>
            
        )
    }
}
