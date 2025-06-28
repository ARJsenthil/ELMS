
const ROOTURL = 'https://elms-otvr.onrender.com/api/v1';


export const API = {

    BASE_URL: ROOTURL,
    login: ROOTURL + '/auth/login',
    
    totalEmployee: ROOTURL + '/employee/totalEmployee',
    totalDepartment: ROOTURL + '/department/totalDepartment',
    totalLeaveType: ROOTURL + '/leaveType/totalLeaveType',
    
    // Employee
    employee: ROOTURL + '/employee/',

    // Department
    department: ROOTURL + '/department/',

    // LeaveType
    leaveType: ROOTURL + '/leaveType/',

    // Leave
    leave: ROOTURL + '/leave/',
    listLeaveByStatus: ROOTURL + '/leave/listLeaveByStatus',


    deleteItem: ROOTURL + '/delete/deleteData',
}