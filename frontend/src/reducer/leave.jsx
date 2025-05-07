
const initialState = {
    listLeave: [],
    leave: {},
    total: 0,
}

const leaveReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case 'LIST_LEAVE':
            return {
                ...state,
                listLeave: action.payload,
                total: action.total,
            }
        case 'LIST_LEAVE_BY_STATUS':
            return {
                ...state,
                listLeave: action.payload,
                total: action.total,
            }
        case 'VIEW_LEAVE':
            return {
                ...state,
                Leave: action.payload,
            }
        case 'HANDLE_INPUT_CHANGE_LEAVE':
            return {
                ...state,
                leave: {
                    ...state.leave,
                    [action.name]: action.value,
                }
            }
            
        case 'RESET_LEAVE':
            return {
                ...state,
                leave: {}
            }
            
        default:
            return state;
    }
}


export default leaveReducer;