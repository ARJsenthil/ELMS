
const initialState = {
    totalDepartment: 0,
    totalEmployee: 0,
    totalLeaveType: 0,
}

const dashboardReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case 'TOTAL_DEPARTMENT':
            return {
                ...state,
                totalDepartment: action.total,
            }
        case 'TOTAL_EMPLOYEE':
        return {
            ...state,
            totalEmployee: action.total,
        }
        case 'TOTAL_LEAVE_TYPE':
        return {
            ...state,
            totalLeaveType: action.total,
        }
            
        default:
            return state;
    }
}

export default dashboardReducer;
