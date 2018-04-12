import { connect } from 'react-redux'
import * as constants from '../../common/constants';
import Navigation from '../../components/common/Navigation';

const mapStateToProps = state => {
    return {
        ...state
        //email: state.user.personal_info.email.value
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => {
            dispatch({
                type: constants.USER_LOGOUT
            })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);