import { combineReducers } from 'redux';
import dashboardReducer from './dashboard';
import departmentReducer from './department';
import employeeReducer from './employee';
import leaveReducer from './leave';
import leaveTypeReducer from './leaveType';

const rootReducer = combineReducers({

    dashboard: dashboardReducer,
    department: departmentReducer,
    employee: employeeReducer,
    leave: leaveReducer,
    leaveType: leaveTypeReducer,
});

export default rootReducer;