
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../../common/api";
import { handleInputChangeDepartment, viewDepartment } from "../../../../action/department";
import { AlertBox } from "../../../../utilities/alerts/alert";
import { Button, Stack, TextField } from "@mui/material";

const AddAndEditDepartment = (props) => {

    const dispatch = useDispatch();
    const storeData = useSelector( state => state.department );
    const data = storeData.department;
    const [model, setModel] = useState('add');
    const [deptCodeError, setDeptCodeError] = useState(false);
    const [deptNameError, setDeptNameError] = useState(false);
    const [deptShortNameError, setDeptShortNameError] = useState(false);
    const [alert, setAlert] = useState({ type: null, message: "", open: false });

    const deptCodeInputRef = useRef(null);
    const deptNameInputRef = useRef(null);
    const deptShortNameInputRef = useRef(null);
    const id = null;
    useEffect(() => {
        if(model === 'edit') {
            viewDepartment()(dispatch);            
        }
    }, [dispatch])

    const onchange = ({name, value}) => {
        if(name === 'deptCode') {
            setDeptCodeError(false);
            handleInputChangeDepartment(name, value)(dispatch);
        }
        else if(name === 'deptName') {
            setDeptNameError(false);
            handleInputChangeDepartment(name, value)(dispatch);
        }
        else if(name === 'deptShortName') {
            setDeptShortNameError(false);
            handleInputChangeDepartment(name, value)(dispatch);
        }
    }

    const onsubmit = () => {
        const newData = { ...data }

        let valid = true;
        let focusField = null

        if(!newData.deptCode) {
            setDeptCodeError(true);
            valid = false;
            if(!focusField) focusField = deptCodeInputRef;
        }


        if(!newData.deptName) {
            setDeptNameError(true);
            valid = false;
            if(!focusField) focusField = deptNameInputRef;
        }


        if(!newData.deptShortName) {
            setDeptShortNameError(true);
            valid = false;
            if(!focusField) focusField = deptShortNameInputRef;
        }
        
        if(focusField) {
            focusField.current.focus()
            console.log(focusField)
        }
        
        const formdata = new FormData();

        if(valid) {
            const axiosCall = model === 'add' 
                ? axios.post(API.addDepartment, formdata) 
                : axios.post(API.editDepartment, formdata);

            axiosCall
            .then((res) => {
                setAlert({ type: "success", message: "Department Added", open: true });
                
            })
            .catch((err) => {
                setAlert({ type: "warning", message: "Try Again Later", open: true });

            })
        }
    }
    const handleAlertClose = () => {
        setAlert((pre) => ({ ...pre, open: false }))
    }

    return(
        <>
        { alert.open && <AlertBox alertType={alert.type} message={alert.message} onClose={handleAlertClose} /> }
            <Stack spacing={3}>
            <TextField
                error={deptCodeError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Department Code"
                defaultValue={data.deptCode || ''}
                name="deptCode"
                helperText={deptCodeError && 'Department code is required'}
                inputRef={deptCodeInputRef}
            />
            <TextField
                error={deptNameError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Department Name"
                defaultValue={data.deptName || ''}
                name="deptName"
                helperText={deptNameError && 'Department name is required'}
                inputRef={deptNameInputRef}
            />          
            <TextField
                error={deptShortNameError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Department Short Name"
                defaultValue={data.deptShortName || ''}
                name="deptShortName"
                helperText={deptShortNameError && 'Department short name is required'}
                inputRef={deptShortNameInputRef}
            />
            <Button onClick={onsubmit}>Click</Button>
            </Stack>
        </>
    )
}

export default AddAndEditDepartment;