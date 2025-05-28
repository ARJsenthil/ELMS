import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../../common/api";
import { handleInputChangeLeaveType, resetLeaveType, viewLeaveType } from "../../../../action/leaveType";
import { AlertBox } from "../../../../utilities/alerts/alert";
import { Button, Stack, TextField } from "@mui/material";

const AddAndEditLeaveType = (props) => {

    const dispatch = useDispatch();
    const {model, router} = props;
    const [leaveTypeError, setLeaveTypeError] = useState(false);
    const [leaveDescriptionError, setLeaveDescriptionError] = useState(false);
    const [alert, setAlert] = useState({ type: null, message: "", open: false });
    const leaveTypeInputRef = useRef(null);
    const leaveDescriptionInputRef = useRef(null); 
    const idData = JSON.parse(localStorage.getItem('managementId'));
    const id = idData.name == 'leaveType'? idData.id: ( model == "edit" && router.navigate('/leaveType/listLeaveType'));
    useEffect(() => {
        console.log(model)
        fetchData(dispatch);
    }, [dispatch]);
    const fetchData = (dispatch) => {
        if(model === 'edit') {
            viewLeaveType(id)(dispatch);
        }
        else {
            resetLeaveType()(dispatch);  
        }
    }
    const storeData = useSelector( state => state.leaveType );
    const data = storeData.leaveType;
    console.log(data);
    const onchange = ({name, value}) => {
        if(name === 'leave_type') {
            setLeaveTypeError(false);
            handleInputChangeLeaveType(name, value)(dispatch);
        }
        else if(name === 'description') {
            setLeaveDescriptionError(false);
            handleInputChangeLeaveType(name, value)(dispatch);
        }
    }

    const onsubmit = () => {
        const newData = { ...data }

        let valid = true;
        let focusField = null

        if(!newData.leave_type) {
            setLeaveTypeError(true);
            valid = false;
            if(!focusField) focusField = leaveTypeInputRef;
        }


        if(!newData.description) {
            setLeaveDescriptionError(true);
            valid = false;
            if(!focusField) focusField = leaveDescriptionInputRef;
        }


        if(focusField) {
            focusField.current.focus()
            console.log(focusField)
        }
        
        const tempData = [ {name: 'a'}, {name: 'a'}, {name: 'a'} ]

        if(valid) {
            const axiosCall = model === 'add' 
                ? axios.post(API.leaveType, newData) 
                : axios.put(API.leaveType+'/'+id, newData);

            let message = '';
            axiosCall
            .then((res) => {
                message = res.data.message;
                setAlert({ type: "success", message: message, open: true });
                router.navigate('/leaveType/listLeaveType');

            })
            .catch((err) => {
                message = err.response.data.message;
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
                error={leaveTypeError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Leave Type"
                value={data.leave_type || ''}
                name="leave_type"
                helperText={leaveTypeError && 'Leave type is required'}
                inputRef={leaveTypeInputRef}
            />
            <TextField
                error={leaveDescriptionError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Leave Description"
                value={data.description || ''}
                multiline
                rows={3}
                name="description"
                helperText={leaveDescriptionError && 'Leave description name is required'}
                inputRef={leaveDescriptionInputRef}
            />
            <Button onClick={onsubmit}>Click</Button>
            </Stack>
        </>
    )
}

export default AddAndEditLeaveType;