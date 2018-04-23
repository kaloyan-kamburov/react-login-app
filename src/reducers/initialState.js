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
            avatarFile: ''
        },
        cartProducts: [],
        wishlist: [],
        orders: {
            pending: [],
            history: []
        }
    },    
    formMessages: {
        msgRegisterError: '',
        msgLoginError: '',
        msgUserUpdateSuccess: '',
        msgUserUpdateError: '',
        msgUserChangePasswordSuccess: '',
        msgUserChangePasswordError: '',
        msgCategoryAddSuccess: '',
        msgCategoryAddError: '',
        formErrorTypes: []
    },
    admin: {
        users: {
            searchResults: [],
            currentEditableUser: {},
            searchField: 'username',
            searchValue: ''
        }
    },
    products: [],
    categories: {
        currentEditableCategory: {},
        categoryAdded: false,
        all: []
    },
    server: {
        error: ''
    }
}

/*
    "cat1": {
        id: ''
        name: '',
        desc: ''
    }

*/