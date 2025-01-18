
const initialState = {
    listLeaveType: [],
    leaveType: {},
    total: 0,
}

const leaveTypeReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case 'LIST_LEAVETYPE':
            return {
                ...state,
                listLeaveType: action.payload,
                total: action.total,
            }
        case 'VIEW_LEAVETYPE':
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
            
        default:
            return state;
    }
}


export default leaveTypeReducer;