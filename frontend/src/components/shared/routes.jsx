// import { lazy } from "react"

import Dashboard from "../dashboard/dashboard";
import ChangePassword from "../pages/common/changePassword/changePassword";
import AddAndEditDepartment from "../pages/admin/department/addAndEditDepartment";
import ListDepartment from "../pages/admin/department/listDepartment";
import AddAndEditEmployee from "../pages/common/employee/addAndEditEmployee";
import ListEmployee from "../pages/common/employee/listEmployee";
import AddAndEditLeaveType from "../pages/admin/leaveType/addAndEditLeaveType";
import ListLeaveType from "../pages/admin/leaveType/listLeaveType";
import ListLeave from "../pages/common/leaveManagement/listLeave";
import Login from "../pages/login";

export const RoutesData = (props) => {
    const user = props ? props.user : '';
    return (
        {
            "/dashboard": <Dashboard />,
            
            "/changePassword": <ChangePassword user={user}/>,
    
            "/department/listDepartment": <ListDepartment />,
            "/department/addDepartment": <AddAndEditDepartment model='add' />,
            "/department/editDepartmype/:id": <AddAndEditDepartment model='edit' />,

            "/employee/listEmployee": <ListEmployee />,
            "/employee/addEmployee": <AddAndEditEmployee model='add' user={user} />,
            "/employee/editEmploype/:id": <AddAndEditEmployee model='edit' user={user} />,

            "/leaveType/listLeaveType": <ListLeaveType />,
            "/leaveType/addLeaveType": <AddAndEditLeaveType model='add' />,
            "/leaveType/editLeaveType/:id": <AddAndEditLeaveType model='edit' user={user} />,

            "/leaveManagement/listLeave": <ListLeave leaveStatus={null}/>,
            "/leaveManagement/pendingLeaves": <ListLeave leaveStatus="pendingLeaves"  />,
            "/leaveManagement/approvedLeaves": <ListLeave leaveStatus="approvedLeaves"  />,
            "/leaveManagement/notApprovedLeaves": <ListLeave leaveStatus="notApprovedLeaves"  />,

            "/leave/leaveHistory": <ListLeave user={user} />,

            "/myProfile": <AddAndEditEmployee model='edit' user={user} />,


            "/myProfile": <AddAndEditEmployee model='edit' user={user} />,

            "/login": <Login />,

        }
    )
}
