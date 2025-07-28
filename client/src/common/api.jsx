
// const ROOTURL = 'http://localhost:4000/api/v1';
const ROOTURL = 'https://elms-1-ultz.onrender.com/api/v1';


export const API = {

    BASE_URL: ROOTURL,
    login: '/auth/login',
    
    totalEmployee: '/employee/totalEmployee',
    totalDepartment: '/department/totalDepartment',
    totalLeaveType: '/leaveType/totalLeaveType',
    
    // Employee
    employee: '/employee/',

    // Department
    department: '/department/',

    // LeaveType
    leaveType: '/leaveType/',

    // Leave
    leave: '/leave/',
    listLeaveByStatus: '/leave/listLeaveByStatus',


    deleteItem: '/delete/deleteData',
}