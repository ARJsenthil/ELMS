import { Button, Stack, TextField } from "@mui/material"
import axios from "axios";
import { useRef, useState } from "react";
import { AlertBox } from "../../../../utilities/alerts/alert";
import { DatePicker } from "@mui/x-date-pickers";

const ChangePassword = (props) => {

    const { type, password } = props.user;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [currentPasswordError, setCurrentPasswordError] = useState(false);
    const [currentPasswordMatchError, setCurrentPasswordMatchError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [comparePasswordError, setComparePasswordError] = useState(false);
    const [alert, setAlert] = useState({ type: null, message: "", open: false });
    
    const currentPasswordInputRef = useRef(null);
    const newPasswordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);


    const onchange = ({name, value}) => {
        if(name === 'currentPassword') {
            setCurrentPasswordError(false);
            setCurrentPassword(value);
        }
        else if(name === 'newPassword') {
            setNewPasswordError(false);
            setNewPassword(value);
        }
        else if(name === 'confirmPassword') {
            setConfirmPasswordError(false);
            setConfirmPassword(value);
            if(newPassword !== value) {
                setComparePasswordError(true);
            }
            else {
                setComparePasswordError(false)
            }
        }
    }

    const onsubmit = () => {

        let valid = true;
        let focusField = null

        if(!currentPassword) {
            setCurrentPasswordError(true);
            valid = false;
            if(!focusField) focusField = currentPasswordInputRef;
        }
        else if(currentPassword !== password) {
            setCurrentPasswordMatchError(true);
            setCurrentPassword('');
            valid = false;
            if(!focusField) focusField = currentPasswordInputRef;
            setAlert({ type: "warning", message: "Incorrect Password", open: true });
        }


        if(!newPassword) {
            setNewPasswordError(true);
            valid = false;
            if(!focusField) focusField = newPasswordInputRef;
        }


        if(!confirmPassword) {
            setConfirmPasswordError(true);
            valid = false;
            if(!focusField) focusField = confirmPasswordInputRef;
        }
        else if(comparePasswordError) {
            valid = false;
            if(!focusField) focusField = confirmPasswordInputRef;
        }
        
        if(focusField) {
            focusField.current.focus()
            console.log(focusField)
        }
        
        const formdata = new FormData();
        formdata.append('currentPassword', currentPassword)
        formdata.append('newPassword', newPassword)
        formdata.append('confirmPassword', confirmPassword)

        if(valid) {
            axios.post(`API.changePassword/${type}`, formdata)
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
    const onclick = () => {
        
    }
    return(
        <>
            { alert.open && <AlertBox alertType={alert.type} message={alert.message} onClose={handleAlertClose} /> }
            <Stack spacing={2}>
                <TextField 
                    error={currentPasswordError || currentPasswordMatchError}
                    id="outlined-basic"
                    type="password" 
                    name="currentPassword"
                    value={currentPassword || ''} 
                    onChange={(e) => onchange(e.target)}
                    label="Current Password" 
                    helperText={currentPasswordError && 'Department code is required'}
                    variant="outlined" 
                    inputRef={currentPasswordInputRef}
                />
                <TextField 
                    error={newPasswordError}
                    id="outlined-basic" 
                    type="password" 
                    onChange={(e) => onchange(e.target)}
                    name="newPassword"
                    value={newPassword || ''} 
                    label="New Password" 
                    helperText={newPasswordError && 'Department code is required'}
                    variant="outlined" 
                    inputRef={newPasswordInputRef}
                />
                <TextField 
                    error={confirmPasswordError || comparePasswordError}
                    id="outlined-basic" 
                    type="password" 
                    onChange={(e) => onchange(e.target)}
                    name="confirmPassword"
                    value={confirmPassword || ''} 
                    label="Confirm Password" 
                    helperText={confirmPasswordError && 'Department code is required'}
                    variant="outlined" 
                    inputRef={confirmPasswordInputRef}
                />
                <DatePicker
        label="Select a date"
        onChange={(newValue) => console.log(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />

                <Button variant="contained" onClick={onsubmit}>Contained</Button>
            </Stack>
        </>
    )
}



export default ChangePassword;