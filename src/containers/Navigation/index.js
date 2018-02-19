import { connect } from 'react-redux'

import Navigation from '../../components/Navigation';

const mapStateToProps = state => {
    return {
        email: state.user.personal_info.email.value,
        errorType: state.user.personal_info.errorType
    }
}

export default connect(mapStateToProps)(Navigation);