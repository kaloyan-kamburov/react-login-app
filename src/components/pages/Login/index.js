import React, { Component } from 'react';

import Form from '../../../components/common/Form';
// import Input from '../../containers/Form/Input'; 

import { 
    notEmpty, 
    password 
} from '../../../common/validators';

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h1>Login</h1>
                <Form
                    msgError={this.props.formMessages.msgLoginError}
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
