import React, {  Component } from 'react'
import LoginForm from '../../components/LoginForm'
import Navigation from '../../components/Navigation';

import { connect } from 'react-redux'

// class Login extends Component {
//     render() {
//         return (
//             <LoginForm name={this.props.name}/>
//         )
//     }
// }

const mapStateToProps = state => {
    return {
        name: state.login.name
    }
}

export default connect(mapStateToProps)(LoginForm)
// export default connect(mapStateToProps)(Navigation)