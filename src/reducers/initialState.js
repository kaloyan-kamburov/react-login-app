export default {
    user: {
        personalInfo: {
            username: '',
            firstname: '',
            lastname: '',
            address: '',
            phone: '', 
            email: '', 
            avatar: '',
            password: '',
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        },
        cartProducts: [],
        wishlist: [],
        orders: {
            pending: [],
            history: []
        },
        formMessages: {
            msgRegisterFail: '',
            msgLoginFail: '',
            msgUserUpdate: '',
            msgUserUpdateFail: ''
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