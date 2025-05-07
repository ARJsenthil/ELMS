
const initialState = {
    listDepartment: [],
    department: {},
    total: 0,
}

const departmentReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case 'LIST_DEPARTMENT':
            return {
                ...state,
                listDepartment: action.payload,
                total: action.total,
            }
        case 'VIEW_DEPARTMENT':
            return {
                ...state,
                department: action.payload,
            }
        case 'HANDLE_INPUT_CHANGE_DEPARTMENT':
            console.log(action)
            return {
                ...state,
                department: {
                    ...state.department,
                    [action.name]: action.value,
                }
            }
            case 'RESET_DEPARTMENT':
                return {
                    ...state,
                    department: {}
                }
    
            
        default:
            return state;
    }
}

export default departmentReducer;
