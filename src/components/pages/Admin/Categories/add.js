import React, { Component } from 'react';
import Form from '../../../../components/common/Form';
import * as constants from '../../../../common/constants'
import { Redirect } from 'react-router-dom';


import { 
    email, 
    notEmpty, 
    comparePasswords, 
    length, 
    password,
    checkFileSize
} from '../../../../common/validators';

export default class CategoryAdd extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.categories.categoryAdded) {
            return(
                <div>
                    <h2>Add new category</h2>
                    <Form
                        msgSuccess={this.props.formMessages.msgCategoryAddSuccess}
                        msgError={this.props.formMessages.msgCategoryAddError}
                        errorTypes={this.props.formMessages.formErrorTypes}
                        onSubmit={this.props.onCategoryAdd}
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
                </div>
            )
        } else {
            return(
                <Redirect to='/admin/categories'/>
            )
        }
        
    }
}