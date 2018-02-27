import { connect } from 'react-redux';
import Profile from '../../components/Profile';
import AuthGuard from '../../common/auth/authGuard';
import * as constants from '../../common/constants';

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => ({
    onSubmit: payload => (
        dispatch({
            type: constants.USER_UPDATE,
            payload
        })
    )
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(Profile));