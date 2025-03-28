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
    const user = props ? props.user.type : '';

    const routes = {

        "/dashboard": <Dashboard />,
        
        "/changePassword": <ChangePassword user={user}/>,

        "/department/listDepartment": <ListDepartment />,
        "/department": <ListDepartment />,
        "/department/addDepartment": <AddAndEditDepartment model='add' />,
        "/department/editDepartmype/:id": <AddAndEditDepartment model='edit' />,

        "/employee/listEmployee": <ListEmployee />,
        "/employee": <ListEmployee />,
        "/employee/addEmployee": <AddAndEditEmployee model='add' user={user} />,
        "/employee/editEmploype/:id": <AddAndEditEmployee model='edit' user={user} />,

        "/leaveType/listLeaveType": <ListLeaveType />,
        "/leaveType": <ListLeaveType />,
        "/leaveType/addLeaveType": <AddAndEditLeaveType model='add' />,
        "/leaveType/editLeaveType/:id": <AddAndEditLeaveType model='edit' user={user} />,

        "/leaveManagement/listLeave": <ListLeave leaveStatus={null}/>,
        "/leaveManagement": <ListLeave leaveStatus={null}/>,
        "/leaveManagement/pendingLeaves": <ListLeave leaveStatus="pendingLeaves"  />,
        "/leaveManagement/approvedLeaves": <ListLeave leaveStatus="approvedLeaves"  />,
        "/leaveManagement/notApprovedLeaves": <ListLeave leaveStatus="notApprovedLeaves"  />,

        "/leave/leaveHistory": <ListLeave user={user} />,
        "/leave": <ListLeave user={user} />,

        "/myProfile": <AddAndEditEmployee model='edit' user={user} />,


        "/myProfile": <AddAndEditEmployee model='edit' user={user} />,


    }

    const adminRoutes = ["/dashboard","/changePassword","/department/listDepartment","/department","/department/addDepartment","/department/editDepartmype/:id","/employee/listEmployee","/employee","/employee/addEmployee","/employee/editEmploype/:id","/leaveType/listLeaveType","/leaveType","/leaveType/addLeaveType","/leaveType/editLeaveType/:id","/leaveManagement/listLeave","/leaveManagement","/leaveManagement/pendingLeaves","/leaveManagement/approvedLeaves","/leaveManagement/notApprovedLeaves","/myProfile"]
    const employeeRoutes = ["/changePassword","/employee","/leaveType/listLeaveType","/leaveManagement/listLeave","/leave","/leave/leaveHistory","/myProfile"];
    const routesData = {};
    if(!user) {
        routesData["/login"] = <Login />
    }
    else if(user === 'admin') {
        adminRoutes.forEach(element => {
            routesData[element] = routes[element];
        });
    }
    else if(user === 'employee') {
        employeeRoutes.forEach(element => {
            routesData[element] = routes[element];
        });
    }
    return routesData;
}
