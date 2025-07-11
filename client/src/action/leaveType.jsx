import { API } from "../common/api";
import axios from "axios"

export const listLeaveType = () => {
    return function (dispatch) {
        axios.get(API.leaveType)
        .then((res) => {
            const { data, total } = res.data? res.data : {};
            dispatch({ type: 'LIST_LEAVE_TYPE', payload: data ? data : [], total: total ? total : 0 })
        })
        .catch((err) => {
            dispatch({ type: 'LIST_LEAVE_TYPE', payload: [], total: 0 })
        })
    }
}

export const viewLeaveType = (id = '') => {
    return function (dispatch) {
        axios.get(API.leaveType + '/' + id)
        .then((res) => {
            const { data, total } = res.data? res.data : {};
            dispatch({ type: 'VIEW_LEAVE_TYPE', payload: data ? data : [], total: total ? total : 0 })
        })
        .catch((err) => {
            dispatch({ type: 'VIEW_LEAVE_TYPE', payload: [], total: 0 })
        })
    }
}

export const handleInputChangeLeaveType = (name, value) => {
    return function (dispatch) {
        dispatch({ type: 'HANDLE_INPUT_CHANGE_LEAVE_TYPE', name: name, value: value })
    }
}

export const resetLeaveType = () => {
    return function (dispatch) {
        dispatch({ type: 'RESET_LEAVE_TYPE' })
    }
}