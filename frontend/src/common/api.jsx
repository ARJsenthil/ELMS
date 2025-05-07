
const ROOTURL = 'http://localhost:4000/api/v1';


export const API = {

    login: ROOTURL + '/auth/login',
    
    totalEmployee: ROOTURL + '/employee/totalEmployee',
    totalDepartment: ROOTURL + '/department/totalDepartment',
    totalLeaveType: ROOTURL + '/leaveType/totalLeaveType',
    
    // Employee
    listEmployee: ROOTURL + '/employee/listEmployee',
    addEmployee: ROOTURL + '/employee/addEmployee',
    editEmployee: ROOTURL + '/employee/editEmployee',
    viewEmployee: ROOTURL + '/employee/viewEmployee',

    // Department
    listDepartment: ROOTURL + '/department/',
    addDepartment: ROOTURL + '/department/',
    editDepartment: ROOTURL + '/department/',
    viewDepartment: ROOTURL + '/department/',

    // LeaveType
    listLeaveType: ROOTURL + '/leaveType/',
    addLeaveType: ROOTURL + '/leaveType/',
    editLeaveType: ROOTURL + '/leaveType/',
    viewLeaveType: ROOTURL + '/leaveType/',

    // Leave
    listLeave: ROOTURL + '/leave/listLeave',
    listLeaveByStatus: ROOTURL + '/leave/listLeaveByStatus',
    addLeave: ROOTURL + '/leave/addLeave',
    editLeave: ROOTURL + '/leave/editLeave',
    viewLeave: ROOTURL + '/leave/viewLeave',


    deleteItem: ROOTURL + '/delete/deleteData',
}