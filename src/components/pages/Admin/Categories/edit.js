import React, { Component } from 'react';
import Form from '../../../../components/common/Form';
import { 
    email, 
    notEmpty, 
    comparePasswords, 
    length, 
    password,
    checkFileSize
} from '../../../../common/validators';
import { Row, Col } from 'reactstrap';

export default class CategoryEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: props.categories.currentEditableCategory
        }

    }

    componentWillMount() {
        this.props.getCategory(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        this.setState({
            category: nextProps.categories.currentEditableCategory
        });
    }

    render() {
        return(
            <div>
                <h2>Edit Category</h2>
                <Row>
                    <Col>
                        <Form
                            formData={this.state.category}
                            // msgSuccess={this.props.formMessages.msgUserUpdateSuccess}
                            msgError={this.props.formMessages.msgUserUpdateError}
                            errorTypes={this.props.formMessages.formErrorTypes}
                            onSubmit={this.props.onUpdateUserInfo}
                            hiddenData={{
                                avatar: this.state.avatar
                            }}
                            encType='multipart/form-data'
                            fields={[
                                {
                                    type: 'file',
                                    label: 'Category image',
                                    name: 'avatar',
                                    validators: [checkFileSize(200), notEmpty]
                                },
                                {
                                    type: 'text',
                                    label: 'Name',
                                    name: 'name',
                                    validators: [notEmpty, length(1, 24)]
                                },
                                {
                                    type: 'textarea',
                                    label: 'Description',
                                    name: 'desc',
                                    validators: [notEmpty, length(1)]
                                }
                            ]}
                        />  
                        {/* <Form
                            formData={this.state.user}
                            msgSuccess={this.props.formMessages.msgUserUpdateSuccess}
                            msgError={this.props.formMessages.msgUserUpdateError}
                            errorTypes={this.props.formMessages.formErrorTypes}
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
                        />  */}
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
            </div>
        )
    }
}