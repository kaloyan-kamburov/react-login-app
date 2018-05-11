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
        cart: {
            products: {},
            totalPrice: 0
        },
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
		msgAdminUpdateInfoSuccess: '',
		msgAdminUpdateInfoError: '',
		msgAdminChangeUserPasswordSuccess: '',
		msgAdminChangeUserPasswordError: '',
		msgAdminChangeUserPassword: '',
		msgCategoryAddSuccess: '',
		msgCategoryAddError: '',
		msgCategoryUpdateSuccess: '',
		msgCategoryUpdateError: '',
        formErrorTypes: []
    },
    admin: {
        users: {
            searchResults: [],
            currentEditableUser: {},
            all: [],
            searchField: 'username',
            searchValue: ''
        }
    },
    products: {
        currentEditableProduct: {},
        productAdded: false,
        all: {}
    },
    categories: {
        currentEditableCategory: {},
        categoryAdded: false,
        all: {}
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