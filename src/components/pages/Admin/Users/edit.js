import React, { Component } from 'react';
import Form from '../../../../components/common/Form';
import { 
    email, 
    notEmpty, 
    comparePasswords, 
    length, 
    password 
} from '../../../../common/validators';
import { Row, Col } from 'reactstrap';


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
            <div>
                <h2>Edit User</h2>
                <Row>
                    <Col>
                        <Form
                            formData={this.state.user}
                            msgSuccess={this.props.formMessages.msgUserUpdateSuccess}
                            msgError={this.props.formMessages.msgUserUpdateError}
                            errorTypes={this.props.formMessages.formErrorTypes}
                            onSubmit={this.props.updateUserInfo}
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
                    </Col>
                    <Col>
                    <Form
                            msgSuccess={this.props.formMessages.msgAdminChangeUserPasswordSuccess}
                            msgError={this.props.formMessages.msgAdminChangeUserPasswordError}
                            onSubmit={this.props.changeUserPassword}
                            hiddenData={{
                                id: this.state.user.id
                            }}
                            fields={[
                                {
                                    type: 'password',
                                    label: 'Change password',
                                    name: 'newPassword',
                                    validators: [notEmpty]
                                }
                            ]}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}