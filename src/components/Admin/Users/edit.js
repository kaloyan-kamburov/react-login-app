import React, { Component } from 'react';
import Form from '../../../containers/Form';
import { 
    email, 
    notEmpty, 
    comparePasswords, 
    length, 
    password 
} from '../../../common/validators';



export default class UserEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    componentWillMount() {
        this.props.getUser(this.props.match.params.id);
        // this.setState({
        //     user: nextProps.admin.users.currentEditableUser
        // });
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        this.setState({
            user: nextProps.admin.users.currentEditableUser
        });
    }

    render() {
        return(
            <Form
                formData={this.state.user}
                msgSuccess={this.props.user.formMessages.msgUserUpdateSuccess}
                msgError={this.props.user.formMessages.msgUserUpdateError}
                errorTypes={this.props.user.formMessages.formErrorTypes}
                onSubmit={this.props.onUpdateUserInfo}
                hiddenData={{
                    avatar: this.state.avatar
                }}
                encType='multipart/form-data'
                fields={[
                    {
                        type: 'file',
                        label: 'Avatar',
                        name: 'avatar',
                        validators: []
                    },
                    {
                        type: 'text',
                        label: 'First name',
                        name: 'firstname',
                        validators: [notEmpty, length(3, 24)]
                    },
                    {
                        type: 'text',
                        label: 'Last name',
                        name: 'lastname',
                        validators: [notEmpty, length(3, 24)]
                    },
                    {
                        type: 'text',
                        label: 'Address',
                        name: 'address',
                        validators: [notEmpty]
                    },
                    {
                        type: 'email',
                        label: 'Email',
                        name: 'email',
                        validators: [notEmpty, email]
                    },
                    {
                        type: 'number',
                        label: 'Phone number',
                        name: 'phone',
                        validators: [notEmpty, length(3, 24)]
                    }
                ]}
            /> 
        )
    }
}