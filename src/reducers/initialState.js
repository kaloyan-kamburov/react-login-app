export default {
    user: {
        personalInfo: {
            id: '',
            username: '',
            firstname: '',
            lastname: '',
            address: '',
            phone: '', 
            email: '', 
            avatar: ''
        },
        cartProducts: [],
        wishlist: [],
        orders: {
            pending: [],
            history: []
        },
        formMessages: {
            msgRegisterError: '',
            msgLoginError: '',
            msgUserUpdateSuccess: '',
            msgUserUpdateError: '',
            msgUserChangePasswordSuccess: '',
            msgUserChangePasswordError: '',
            formErrorTypes: []
        },
    },
    admin: {
        users: []
    },
    products: {
        categories: [
            {
                name: 'category1'
            }
        ],
        
    }
}