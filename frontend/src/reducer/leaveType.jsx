
const initialState = {
    listLeaveType: [],
    leaveType: {},
    total: 0,
}

const leaveTypeReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case 'LIST_LEAVE_TYPE':
            console.log(action)
            return {
                ...state,
                listLeaveType: action.payload,
                total: action.total,
            }
        case 'VIEW_LEAVE_TYPE':
            return {
                ...state,
                leaveType: action.payload,
            }
        case 'HANDLE_INPUT_CHANGE_LEAVE_TYPE':
            console.log(action)
            return {
                ...state,
                leaveType: {
                    ...state.leaveType,
                    [action.name]: action.value,
                }
            }
            case 'RESET_LEAVE_TYPE':
                return {
                    ...state,
                    leaveType: {}
                }
            
        default:
            return state;
    }
}


export default leaveTypeReducer;