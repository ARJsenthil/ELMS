import { API } from "../common/api";
import axios from "axios"

export function listDepartment () {
    return function (dispatch) {
        axios.get(API.listDepartment)
        .then((res) => {
            const { data, total } = res.data? res.data : {};
            dispatch({ type: 'LIST_DEPARTMENT', payload: data ? data : [], total: total ? total : 0 })
        })
        .catch((err) => {
            dispatch({ type: 'LIST_DEPARTMENT', payload: [], total: 0 })
        })
    }
}

export function viewDepartment (id = '') {
    return function (dispatch) {
        axios.get(API.viewDepartment + '/' + id)
        .then((res) => {
            const { data, total } = res.data? res.data : {};
            dispatch({ type: 'VIEW_DEPARTMENT', payload: data ? data : [], total: total ? total : 0 })
        })
        .catch((err) => {
            dispatch({ type: 'VIEW_DEPARTMENT', payload: [], total: 0 })
        })
    }
}

export function handleInputChangeDepartment (name, value) {
    return function (dispatch) {
        dispatch({ type: 'HANDLE_INPUT_CHANGE_DEPARTMENT', name: name, value: value })
    }
}