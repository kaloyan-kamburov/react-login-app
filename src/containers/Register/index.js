import React from 'react';
import { connect } from 'react-redux'

import RegisterForm from '../../components/RegisterForm';

class Register extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            email: props.email
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state)
    }

    render() {
        return (
            <RegisterForm name={this.state.name} onChange={this.onChange} onSubmit={this.onSubmit}/>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        name: state.user.name,
        email: state.user.email
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSubmit: ({name, email}) => (
        dispatch({
            type: 'USER_REGISTER',
            payload:{

                name,
                email
            }
        })
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);