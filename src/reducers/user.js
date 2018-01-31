const initialState = {
    name: "fssdfsdfs",
    email: ""
}

const userReducer = (state = initialState, action) => {
    if (action.type === 'USER_REGISTER') {
        return {
            name: action.payload.name,
            email: action.payload.email
        }
    } else {
        return state;
    }
}

export default userReducer;