import React, { Component } from 'react';
import Form from '../../../../components/common/Form';
import { Redirect } from 'react-router-dom';

import { 
    email, 
    notEmpty, 
    notEmptyCheckboxGroup,
    comparePasswords, 
    length, 
    password,
    checkFileSize
} from '../../../../common/validators';

export default class ProductAdd extends Component {
    constructor(props) {
        super(props);
    }

    categoriesToArray = () => {
        return Object.keys(this.props.categories.all).map(category => this.props.categories.all[category]);
    }



    render() {
        if (!this.props.products.productAdded) {
            return(
                <div>
                    <h2>Add new product</h2>
                    <Form
                        msgSuccess={this.props.formMessages.msgCategoryAddSuccess}
                        msgError={this.props.formMessages.msgCategoryAddError}
                        errorTypes={this.props.formMessages.formErrorTypes}
                        onSubmit={this.props.productAdd}
                        encType='multipart/form-data'
                        fields={[
                            {
                                type: 'file',
                                label: 'Product image',
                                name: 'productImage',
                                validators: [checkFileSize(200), notEmpty]
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
                                validators: [notEmptyCheckboxGroup]
                            },
                            {
                                type: 'textarea',
                                label: 'Description',
                                name: 'desc',
                                validators: [notEmpty, length(1)]
                            }
                        ]}
                    />
                </div>
            )
        } else {
            return(
                <Redirect to='/admin/categories'/>
            )
        }
    }
}