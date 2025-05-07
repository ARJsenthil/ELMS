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

    const { session, router } = props;
    const user = session ? session.user.type : 'admin';

    const routes = {

        "/dashboard": <Dashboard router={router} />,
        
        "/changePassword": <ChangePassword router={router} user={user}/>,

        "/department/listDepartment": <ListDepartment router={router} />,
        "/department": <ListDepartment router={router} />,
        "/department/addDepartment": <AddAndEditDepartment router={router} model='add' />,
        "/department/editDepartment": <AddAndEditDepartment router={router} model='edit' />,

        "/employee/listEmployee": <ListEmployee router={router} />,
        "/employee": <ListEmployee router={router} />,
        "/employee/addEmployee": <AddAndEditEmployee router={router} model='add' user={user} />,
        "/employee/editEmployee": <AddAndEditEmployee router={router} model='edit' user={user} />,

        "/leaveType/listLeaveType": <ListLeaveType router={router} />,
        "/leaveType": <ListLeaveType router={router} />,
        "/leaveType/addLeaveType": <AddAndEditLeaveType router={router} model='add' />,
        "/leaveType/editLeaveType": <AddAndEditLeaveType router={router} model='edit' user={user} />,

        "/leaveManagement/listLeave": <ListLeave router={router} leaveStatus={null}/>,
        "/leaveManagement": <ListLeave router={router} leaveStatus={null}/>,
        "/leaveManagement/pendingLeaves": <ListLeave router={router} leaveStatus="pendingLeaves"  />,
        "/leaveManagement/approvedLeaves": <ListLeave router={router} leaveStatus="approvedLeaves"  />,
        "/leaveManagement/notApprovedLeaves": <ListLeave router={router} leaveStatus="notApprovedLeaves"  />,

        "/leave/leaveHistory": <ListLeave router={router} user={user} />,
        "/leave": <ListLeave router={router} user={user} />,

        "/myProfile": <AddAndEditEmployee router={router} model='edit' user={user} />,


        "/myProfile": <AddAndEditEmployee router={router} model='edit' user={user} />,


    }

    const adminRoutes = ["/dashboard","/changePassword","/department/listDepartment","/department","/department/addDepartment","/department/editDepartment","/employee/listEmployee","/employee","/employee/addEmployee","/employee/editEmployee","/leaveType/listLeaveType","/leaveType","/leaveType/addLeaveType","/leaveType/editLeaveType","/leaveManagement/listLeave","/leaveManagement","/leaveManagement/pendingLeaves","/leaveManagement/approvedLeaves","/leaveManagement/notApprovedLeaves","/myProfile"]
    const employeeRoutes = ["/changePassword","/employee","/leaveType/listLeaveType","/leaveManagement/listLeave","/leave","/leave/leaveHistory","/myProfile"];
    const routesData = {};
    if(!user) {
        routesData["/login"] = <Login router={router} />
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
