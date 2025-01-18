import { API } from "../common/api";
import axios from "axios"

export function totalDepartment () {
    return function (dispatch) {
        return axios.get(API.totalDepartment)
        .then((res) => {
            const { total } = res.data? res.data : {};
            dispatch({ type: 'TOTAL_DEPARTMENT', total: total ? total : 0 })
        })
        .catch((err) => {
            dispatch({ type: 'TOTAL_DEPARTMENT', total: 0 })
        })
    }
}

export function totalEmployee () {
    return function (dispatch) {
        return axios.get(API.totalEmployee)
        .then((res) => {
            const { total } = res.data? res.data : {};
            dispatch({ type: 'TOTAL_EMPLOYEE', total: total ? total : 0 })
        })
        .catch((err) => {
            dispatch({ type: 'TOTAL_EMPLOYEE', total: 0 })
        })
    }
}

export function totalLeaveType () {
    return function (dispatch) {
        return axios.get(API.totalLeaveType)
        .then((res) => {
            const { total } = res.data? res.data : {};
            dispatch({ type: 'TOTAL_LEAVE_type', total: total ? total : 0 })
        })
        .catch((err) => {
            dispatch({ type: 'TOTAL_LEAVE_type', total: 0 })
        })
    }
}
