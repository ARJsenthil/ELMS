import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../../common/api";
import { handleInputChangeLeaveType, viewLeaveType } from "../../../../action/leaveType";
import { AlertBox } from "../../../../utilities/alerts/alert";
import { Button, Stack, TextField } from "@mui/material";

const AddAndEditLeaveType = (props) => {

    const dispatch = useDispatch();
    const storeData = useSelector( state => state.leaveType );
    const data = storeData.leaveType;
    const {model} = props;
    const [leaveTypeError, setLeaveTypeError] = useState(false);
    const [leaveDescriptionError, setLeaveDescriptionError] = useState(false);
    const [alert, setAlert] = useState({ type: null, message: "", open: false });
    console.log(data)
    const leaveTypeInputRef = useRef(null);
    const leaveDescriptionInputRef = useRef(null);
    const id = null;
    useEffect(() => {
        if(model === 'edit') {
            viewLeaveType()(dispatch);            
        }
    }, [dispatch])

    const onchange = ({name, value}) => {
        if(name === 'leaveType') {
            setLeaveTypeError(false);
            handleInputChangeLeaveType(name, value)(dispatch);
        }
        else if(name === 'leaveDescription') {
            setLeaveDescriptionError(false);
            handleInputChangeLeaveType(name, value)(dispatch);
        }
    }

    const onsubmit = () => {
        const newData = { ...data }

        let valid = true;
        let focusField = null

        if(!newData.leaveType) {
            setLeaveTypeError(true);
            valid = false;
            if(!focusField) focusField = leaveTypeInputRef;
        }


        if(!newData.leaveDescription) {
            setLeaveDescriptionError(true);
            valid = false;
            if(!focusField) focusField = leaveDescriptionInputRef;
        }


        if(focusField) {
            focusField.current.focus()
            console.log(focusField)
        }
        
        const formdata = new FormData();
        formdata.append('leaveType', newData.leaveType);
        formdata.append('leaveDescription', newData.leaveDescription);

        if(valid) {
            const axiosCall = model === 'add' 
                ? axios.post(API.addLeaveType, formdata) 
                : axios.post(API.editLeaveType, formdata);

            axiosCall
            .then((res) => {
                setAlert({ type: "success", message: "Leave Type Added", open: true });
                
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
                error={leaveTypeError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Leave Type"
                defaultValue={data.leaveType || ''}
                name="leaveType"
                helperText={leaveTypeError && 'Leave type is required'}
                inputRef={leaveTypeInputRef}
            />
            <TextField
                error={leaveDescriptionError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Leave Description"
                defaultValue={data.leaveDescription || ''}
                multiline
                rows={3}
                name="leaveDescription"
                helperText={leaveDescriptionError && 'Leave description name is required'}
                inputRef={leaveDescriptionInputRef}
            />
            <Button onClick={onsubmit}>Click</Button>
            </Stack>
        </>
    )
}

export default AddAndEditLeaveType;