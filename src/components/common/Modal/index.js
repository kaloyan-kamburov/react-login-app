import React, { Component } from 'react';
import { FaClose } from 'react-icons/lib/fa'

export default class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: props.show,
            element: ''
        }
    }

    closeModal = () => {
        this.setState({
            visible: false
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.show
        })
    }

    createMarkupForMsg = () => {
        return {
            __html: this.props.promptMsg
        }
    }

    promptConfirmFunction = event => {
        this.props.confirmFunction()
    }

    renderModalBody = () => {

        switch(this.props.type) {
            case 'prompt':
                return  <div className='modal-body'>
                            <div dangerouslySetInnerHTML={this.createMarkupForMsg()}></div>
                            <div className='modal-buttons'>
                                <button className='btn btn-primary' onClick={this.promptConfirmFunction}>Confirm</button>
                                <button className='btn btn-secondary' onClick={this.closeModal}>Cancel</button>
                            </div>
                        </div>
            default: 
                return null;
        }
    }

    render() {
        if (this.state.visible) {     
            
            return(
                <div className='modal-wrapper'>
                    <div className='modal-mask' onClick={this.closeModal}></div>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <FaClose onClick={this.closeModal} className='btn-close' />
                        </div>
                        {this.renderModalBody()}
                        <div className='modal-footer'></div>
                    </div>
                </div>
            );
        }
        return null;
        
    }
}