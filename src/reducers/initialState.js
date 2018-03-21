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
            msgRegister: '',
            msgLogin: '',
            msgUserUpdate: '',
            msgUserChangePassword: ''
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