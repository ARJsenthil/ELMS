import { API } from "../common/api";
import axios from '../utilities/axiosInstance'

export const listEmployee = () => {
    return function (dispatch) {
        axios.get(API.employee, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            const { data, total } = res.data? res.data : {};
            dispatch({ type: 'LIST_EMPLOYEE', payload: data ? data : [], total: total ? total : 0 })
        })
        .catch((err) => {
            dispatch({ type: 'LIST_EMPLOYEE', payload: [], total: 0 })
        })
    }
}

export const viewEmployee = (id = '') => {
    return function (dispatch) {
        axios.get(API.employee + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            const { data, total } = res.data? res.data : {};
            dispatch({ type: 'VIEW_EMPLOYEE', payload: data ? data : [], total: total ? total : 0 })
        })
        .catch((err) => {
            dispatch({ type: 'VIEW_EMPLOYEE', payload: [], total: 0 })
        })
    }
}

export const handleInputChangeEmployee = (name, value) => {
    return function (dispatch) {
        dispatch({ type: 'HANDLE_INPUT_CHANGE_EMPLOYEE', name: name, value: value })
    }
}
export const resetEmployee = () => {
    return function (dispatch) {
        dispatch({ type: 'RESET_EMPLOYEE' })
    }
}