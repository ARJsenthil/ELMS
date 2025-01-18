
const ROOTURL = 'https://localhost:4000/apt/v1'


export const API = {

    totalEmployee: ROOTURL + '/employee/totalEmployee',
    totalDepartment: ROOTURL + '/department/totalDepartment',
    totalLeaveType: ROOTURL + '/leaveType/totalLeaveType',
    
    // Employee
    listEmployee: ROOTURL + '/employee/listEmployee',
    addEmployee: ROOTURL + '/employee/addEmployee',
    editEmployee: ROOTURL + '/employee/editEmployee',
    viewEmployee: ROOTURL + '/employee/viewEmployee',

    // Department
    listDepartment: ROOTURL + '/department/listDepartment',
    addDepartment: ROOTURL + '/department/addDepartment',
    editDepartment: ROOTURL + '/department/editDepartment',
    viewDepartment: ROOTURL + '/department/viewDepartment',

    // LeaveType
    listLeaveType: ROOTURL + '/leaveType/listLeaveType',
    addLeaveType: ROOTURL + '/leaveType/addLeaveType',
    editLeaveType: ROOTURL + '/leaveType/editLeaveType',
    viewLeaveType: ROOTURL + '/leaveType/viewLeaveType',

    // Leave
    listLeave: ROOTURL + '/leave/listLeave',
    listLeaveByStatus: ROOTURL + '/leave/listLeaveByStatus',
    addLeave: ROOTURL + '/leave/addLeave',
    editLeave: ROOTURL + '/leave/editLeave',
    viewLeave: ROOTURL + '/leave/viewLeave',


    deleteItem: ROOTURL + '/deleteItem'
}