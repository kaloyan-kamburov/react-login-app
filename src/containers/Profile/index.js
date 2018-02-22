import { connect } from 'react-redux';
import Profile from '../../components/Profile';
import AuthGuard from '../../common/auth/authGuard'

const mapStateToProps = state => {
    return {
        
    }
}

export default AuthGuard(connect(mapStateToProps)(Profile));