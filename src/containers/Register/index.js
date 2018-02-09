import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants';

import RegisterForm from '../../components/RegisterForm';

class RegisterContainer extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: props.user.name,
            email: props.user.email
        }

    }

    componentDidMount() {
        
        // console.log(this.state)
    }

    onChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state)
    }

    render() {
        return (
            <RegisterForm 
                name={this.state.name} 
                email={this.state.email}
                onChange={this.onChange} onSubmit={this.onSubmit}/>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        user: {
            ...state.user,
            name: state.user.name,
            email: state.user.email
        }
    }
}

const mapDispatchToProps = dispatch => ({
    onSubmit: ({name, email}) => (
        dispatch({
            type: constants.USER_REGISTER,
            payload:{
                name,
                email
            }
        })
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);