export default {
    user: {
        id: '',
        personal_info: {
            username: {
                value: "",
                class: ""
            },     
            firstname: {
                value: "",
                class: ""
            },     
            lastname: {
                value: "",
                class: ""
            },      
            address: {
                value: "",
                class: ""
            },       
            phone: {
                value: "",
                class: ""
            },       
            email: {
                value: "",
                class: ""
            },        
            password: {
                value: "",
                class: ""
            },        
            password2: {
                value: "",
                class: ""
            },
            errorType: "",
            errorMsg: "" 
        },
        token: '',
        cart_products: [],
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