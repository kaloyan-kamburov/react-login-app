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

    componentWillMount() {

    }

    createMarkupForMsg = () => {
        return {
            __html: this.props.promptMsg
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
                        <div className='modal-body'>
                            {/* <div dangerouslySetInnerHTML={this.createMarkupForMsg()}></div> */}
                        </div>
                        <div className='modal-footer'>
                            <button className='btn btn-primary'>Confirm</button>
                            <button className='btn btn-secondary' onClick={this.closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            );
        }
        return(<div></div>)
        
    }
}