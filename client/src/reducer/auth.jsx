
const initialState = {
    user: "",
}

const authReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case 'USER':
            return {
                ...state,
                user: action.user,
            }
            
        default:
            return state;
    }
}

export default authReducer;
