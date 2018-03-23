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
            avatar: '',
            // avatarFile: ''
            // password: '',
            // oldPassword: '',
            // newPassword: '',
            // confirmNewPassword: ''
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
            msgUserChangePasswordError: ''
        } 
    },
    products: {
        categories: [
            {
                name: 'category1'
            }
        ],
        
    }
}