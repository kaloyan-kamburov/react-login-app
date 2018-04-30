import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../Modal';

export default class ProductList extends Component {
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

    compare = (obj1, obj2, criteria) => {
        if (obj1[criteria] < obj2[criteria])
            return -1;
        if (obj1[criteria] > obj2[criteria])
            return 1;
        return 0;
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
        if (this.state.products && this.state.products.length) {
            return (
                <div className='list table'>
                    {this.renderTableHeader()}
                    {Object.keys(this.state.products).map(key => 
                        this.productRenderFunction(this.state.products[key])
                    )}
                </div>
            );
        }
        return <div>No products found</div>;        
    }

    showDeleteProductModal = product => {
        this.setState({
            productDelete: product,
            modalVisible: true
        })
    }

    productRenderFunction = product => {
        let path = this.state.linkPath + product._id;
        return (
            <div key={product._id} className='list-item' key={product._id}>
                <div className='list-item-property'>{product.name}</div>
                <div className='list-item-property'>
                    <Link to={path}>Edit</Link>
                    <div onClick={() => this.showDeleteProductModal(product)}>Delete</div>
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
                    confirmFunction={() => this.props.deleteCategory(this.state.productDelete._id)}
                    msg={`Are you sure you want to delete product <b>${this.state.productDelete.name}</b> ?`}
                />
            </div>
        )
    }
}