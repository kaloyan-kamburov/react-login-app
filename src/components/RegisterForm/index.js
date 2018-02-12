import React, { Component } from 'react';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import classNames from 'classnames';

import { isEmail } from '../../common/validators';

// export default class Register extends React.Component {
//     render() {
//         return(
//             <div>REGISTsER</div>
//         )
//     }
// }

const RegisterForm = (props) => {

    return (
        <div>
            <h1>Register</h1>
            <Form onSubmit={props.onSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input 
                        name="name"
                        onChange={props.onChange} 
                        className={props.name.class}
                        value={props.name.value}
                        type="text"
                        id="name" 
                        placeholder="Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input 
                        name="email"
                        onChange={props.onChange} 
                        className={props.email.class}
                        value={props.email.value}
                        validator={props.email.validator}
                        type="email"
                        id="email" 
                        placeholder="Email"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input 
                        name="password"
                        onChange={props.onChange} 
                        className={props.name.class}
                        value={props.password.value}
                        type="password"
                        id="password" 
                        placeholder="Password" 
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="name">Confirm Password</Label>
                    <Input 
                        name="password2"
                        onChange={props.onChange} 
                        className={props.name.class}
                        value={props.password2.value}
                        type="password"
                        id="password2" 
                        placeholder="Confirm password" 
                    />
                </FormGroup>
                <FormGroup>
                    <Button className="btn" type="submit" disabled={true}>Submit</Button>
                </FormGroup>
            </Form>
        </div>
        
    )


}

export default RegisterForm;
