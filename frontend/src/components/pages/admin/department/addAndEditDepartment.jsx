import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../../common/api";
import { handleInputChangeDepartment, resetDepartment, viewDepartment } from "../../../../action/department";
import { AlertBox } from "../../../../utilities/alerts/alert";
import { Button, Stack, TextField } from "@mui/material";
import { useParams } from "react-router-dom";

const AddAndEditDepartment = (props) => {
    const { router } = props;    
    const dispatch = useDispatch();
    const storeData = useSelector( state => state.department );
    const data = storeData.department;
    console.log(data);
    const { model } = props;
    const [deptCodeError, setDeptCodeError] = useState(false);
    const [deptNameError, setDeptNameError] = useState(false);
    const [deptShortNameError, setDeptShortNameError] = useState(false);
    const [alert, setAlert] = useState({ type: null, message: "", open: false });

    const deptCodeInputRef = useRef(null);
    const deptNameInputRef = useRef(null);
    const deptShortNameInputRef = useRef(null);
    const id = router.searchParams.get('id');
    useEffect(() => {
        if(model === 'edit') {
            viewDepartment(id)(dispatch);
        }
        else {
            resetDepartment()(dispatch);            
        }
    }, [dispatch])
    console.log(id);

    const onchange = ({name, value}) => {
        if(name === 'dept_code') {
            setDeptCodeError(false);
            handleInputChangeDepartment(name, value)(dispatch);
        }
        else if(name === 'dept_name') {
            setDeptNameError(false);
            handleInputChangeDepartment(name, value)(dispatch);
        }
        else if(name === 'dept_short_name') {
            setDeptShortNameError(false);
            handleInputChangeDepartment(name, value)(dispatch);
        }
    }

    const onsubmit = () => {
        const newData = { ...data }

        let valid = true;
        let focusField = null

        if(!newData.dept_code) {
            setDeptCodeError(true);
            valid = false;
            if(!focusField) focusField = deptCodeInputRef;
        }


        if(!newData.dept_name) {
            setDeptNameError(true);
            valid = false;
            if(!focusField) focusField = deptNameInputRef;
        }


        if(!newData.dept_short_name) {
            setDeptShortNameError(true);
            valid = false;
            if(!focusField) focusField = deptShortNameInputRef;
        }
        
        if(focusField) {
            focusField.current.focus()
            console.log(focusField)
        }
        
        const tempData = [ {name: 'a'}, {name: 'a'}, {name: 'a'} ];
        if(valid) {
            const axiosCall = model === 'add' 
                ? axios.post(API.department, newData) 
                : axios.put(API.department+'/'+id, newData);

            axiosCall
            .then((res) => {
                var message = res.data.message;
        setAlert({ type: "success", message: message, open: true });
                router.navigate('/department/listDepartment');
                
            })
            .catch((err) => {
                var message = err.response.data.message;
                setAlert({ type: "warning", message: message, open: true });

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
                value={data.dept_code || ''}
                name="dept_code"
                helperText={deptCodeError && 'Department code is required'}
                inputRef={deptCodeInputRef}
            />
            <TextField
                error={deptNameError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Department Name"
                value={data.dept_name || ''}
                name="dept_name"
                helperText={deptNameError && 'Department name is required'}
                inputRef={deptNameInputRef}
            />          
            <TextField
                error={deptShortNameError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Department Short Name"
                value={data.dept_short_name || ''}
                name="dept_short_name"
                helperText={deptShortNameError && 'Department short name is required'}
                inputRef={deptShortNameInputRef}
            />
            <Button onClick={onsubmit}>Click</Button>
            </Stack>
        </>
    )
}

export default AddAndEditDepartment;