export default {
    user: {
        personalInfo: {
            username: '',
            firstname: '',
            lastname: '',
            address: '',
            phone: '', 
            email: '', 
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