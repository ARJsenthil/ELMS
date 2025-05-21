import { API } from "../common/api";
import axios from "axios"

export const listLeave = () => {
    return function (dispatch) {
        axios.get(API.leave)
        .then((res) => {
            const { data, total } = res.data? res.data : {};
            dispatch({ type: 'LIST_LEAVE', payload: data ? data : [], total: total ? total : 0 })
        })
        .catch((err) => {
            dispatch({ type: 'LIST_LEAVE', payload: [], total: 0 })
        })
    }
}

export const listLeaveByStatus = (leaveStatus) => {
    return function (dispatch) {
        axios.get(API.listLeaveByStatus+'/'+leaveStatus)
        .then((res) => {
            const { data, total } = res.data? res.data : {};
            dispatch({ type: 'LIST_LEAVE_BY_STATUS', payload: data ? data : [], total: total ? total : 0 })
        })
        .catch((err) => {
            dispatch({ type: 'LIST_LEAVE_BY_STATUS', payload: [], total: 0 })
        })
    }
}

export const viewLeave = (id = '') => {
    return function (dispatch) {
        axios.get(API.leave + '/' + id)
        .then((res) => {
            const { data, total } = res.data? res.data : {};
            dispatch({ type: 'VIEW_LEAVE', payload: data ? data : [], total: total ? total : 0 })
        })
        .catch((err) => {
            dispatch({ type: 'VIEW_LEAVE', payload: [], total: 0 })
        })
    }
}

export const handleInputChangeLeave = (name, value) => {
    return function (dispatch) {
        dispatch({ type: 'HANDLE_INPUT_CHANGE_LEAVE', name: name, value: value })
    }
}
export const resetLeave = (name, value) => {
    return function (dispatch) {
        dispatch({ type: 'RESET_LEAVE' })
    }
}