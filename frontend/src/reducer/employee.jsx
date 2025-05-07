
const initialState = {
    listEmployee: [],
    employee: {},
    total: 0,
}

const employeeReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case 'LIST_EMPLOYEE':
            return {
                ...state,
                listEmployee: action.payload,
                total: action.total,
            }
        case 'VIEW_EMPLOYEE':
            return {
                ...state,
                employee: action.payload,
            }
        case 'HANDLE_INPUT_CHANGE_EMPLOYEE':
            return {
                ...state,
                employee: {
                    ...state.employee,
                    [action.name]: action.value,
                }
            }
            case 'RESET_EMPLOYEE':
                return {
                    ...state,
                    employee: {}
                }
    
            
        default:
            return state;
    }
}


export default employeeReducer;