import { connect } from 'react-redux'
import * as constants from '../../common/constants';
import Navigation from '../../components/common/Navigation';

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => (
            dispatch({
                type: constants.USER_LOGOUT
            })
        ),
        incrementQuantity: payload => (
            dispatch({
                type: constants.USER_ADD_PRODUCT_TO_CART_REQUEST,
                payload
            })
        ),
        decrementQuantity: payload => (
            dispatch({
                type: constants.USER_DECREMENT_PRODUCT_QUANTITY_REQUEST,
                payload
            })
        ),
        removeProductFromCart: payload => (
            dispatch({
                type: constants.USER_REMOVE_PRODUCT_FROM_CART_REQUEST,
                payload
            })
        ),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);