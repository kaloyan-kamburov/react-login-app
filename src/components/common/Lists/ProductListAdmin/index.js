import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../Modal';

export default class ProductListAdmin extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            linkPath: '/admin/products/edit/',
            products: props.products,
            sortCriteria: '',
            sortDirectionDown: true,
            modalVisible: false,
            productDelete: {}
            
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            modalVisible: false,
            products: nextProps.products    
        })
    }

    renderTableHeader = () => {
        return (
            <div className='list-table-head'>
                <div>Name</div>
                <div>Action</div>
            </div>
        );
    }

    renderData = () => {
        if (Object.keys(this.state.products).length) {
            return (
                <div className='list table'>
                    {this.renderTableHeader()}
                    {Object.keys(this.state.products).map(key => 
                        this.productRenderFunction(key)
                    )}
                </div>
            );
        }
        return <div>No products found</div>;        
    }

    showDeleteProductModal = product => {
        console.log(this.props)
        this.setState({
            productDelete: product,
            modalVisible: true
        })
    }

    productRenderFunction = productId => {
        let path = this.state.linkPath + productId;
        return (
            <div key={productId} className='list-item'>
                <div className='list-item-property'>{this.state.products[productId].name}</div>
                <div className='list-item-property'>
                    <Link to={path}>Edit</Link>
                    <div onClick={() => this.showDeleteProductModal(productId)}>Delete</div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className='list-users'>
                {this.renderData()}
                <Modal 
                    show={this.state.modalVisible}
                    type='prompt'
                    confirmFunction={() => this.props.deleteProduct(this.state.productDelete)}
                    msg={`Are you sure you want to delete this product ?`}
                />
            </div>
        )
    }
}