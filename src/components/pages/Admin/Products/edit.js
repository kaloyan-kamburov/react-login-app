import React, { Component } from 'react';
import Form from '../../../../components/common/Form';
import { 
    email, 
    notEmpty, 
    comparePasswords, 
    notEmptyCheckboxGroup,
    length, 
    password,
    checkFileSize
} from '../../../../common/validators';
import { Row, Col } from 'reactstrap';

export default class ProductEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatar: props.products.currentEditableProduct.avatar
        }

    }

    categoriesToArray = () => {
        return Object.keys(this.props.categories.all).map(category => this.props.categories.all[category]);
    }

    render() {
        // console.log(this.props.products.currentEditableProduct)
        return(
            <div>
                <h2>Edit product</h2>
                <Row>
                    <Col>
                        <Form
                            formData={this.props.products.currentEditableProduct}
                            msgSuccess={this.props.formMessages.msgProductUpdateSuccess}
                            msgError={this.props.formMessages.msgProductUpdateError}
                            errorTypes={this.props.formMessages.formErrorTypes}
                            onSubmit={this.props.updateProduct}
                            hiddenData={{
                                id: this.props.products.currentEditableProduct.id,
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
                                    label: 'Name',
                                    name: 'name',
                                    validators: [notEmpty, length(1, 24)]
                                },
                                {
                                    type: 'number',
                                    label: 'Price',
                                    name: 'price',
                                    validators: [notEmpty, length(1, 24)]
                                },
                                {
                                    type: 'group-checkboxes',
                                    label: 'Categories',
                                    name: 'categories',
                                    values: this.categoriesToArray(),
                                    valueOption: '_id',
                                    textOption: 'name',
                                    checkboxCheckCriteria: 'categories',
                                    validators: [notEmptyCheckboxGroup]
                                },
                                {
                                    type: 'textarea',
                                    label: 'Description',
                                    name: 'description',
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