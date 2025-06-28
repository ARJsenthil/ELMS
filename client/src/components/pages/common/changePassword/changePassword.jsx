import { Button, Stack, TextField } from "@mui/material"
import axios from "axios";
import { useRef, useState } from "react";
import { AlertBox } from "../../../../utilities/alerts/alert";
import { API } from "../../../../common/api";
// import { DatePicker } from "@mui/x-date-pickers";

const ChangePassword = (props) => {

    const { type, password } = props.user;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [data, setData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [currentPasswordError, setCurrentPasswordError] = useState(false);
    const [currentPasswordMatchError, setCurrentPasswordMatchError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [comparePasswordError, setComparePasswordError] = useState(false);

    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ type: null, message: "", open: false });
    
    const inputRef = useRef({
        currentPassword: null,
        newPassword: null,
        confirmPassword: null,
    })


    const onchange = ({name, value}) => {
        if(name === 'currentPassword') {
            setErrors({ ...errors, [name]: false });
            setData({ ...data, [name]: value });
        }
        else if(name === 'newPassword') {
            setErrors({ ...errors, [name]: false });
            setData({ ...data, [name]: value });
        }
        else if(name === 'confirmPassword') {
            setData({ ...data, [name]: value });
            if(data.newPassword != value) {
                setErrors({ ...errors, [name]: false, comparePassword: true });
            }
            else {
                setErrors({ ...errors, [name]: false, comparePassword: false });
            }
        }
    }

    const onsubmit = () => {

        let valid = true;
        let focusField = null
        let newData = { ...data };
        let checkErrors = {};
        if(!newData.currentPassword) {
            checkErrors['currentPassword'] = true;
            valid = false;
            if(!focusField) focusField = 'currentPassword';
        }
        else if(newData.currentPassword !== password) {
            checkErrors['currentPasswordMatch'] = true;
            newData['currentPassword'] = '';
            valid = false;
            if(!focusField) focusField = 'currentPassword';
            setAlert({ type: "warning", message: "Incorrect Password", open: true });
        }

        if(!newData.newPassword) {
            checkErrors['newPassword'] = true;
            valid = false;
            if(!focusField) focusField = 'newPassword';
        }

        if(!newData.confirmPassword) {
            checkErrors['confirmPassword'] = true;
            valid = false;
            if(!focusField) focusField = 'confirmPassword';
        }
        else if(errors.comparePassword) {
            checkErrors['comparePassword'] = true;
            valid = false;
            if(!focusField) focusField = 'confirmPassword';
        }
        
        
        
        if(focusField) {
            inputRef.current[focusField].focus()
            console.log(focusField)
        }

        setErrors({...checkErrors});
        setData({...newData});



        if(valid) {
            axios.post(API.changePassword+`/${type}`, newData)
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
                    error={errors.currentPassword || errors.currentPasswordMatch}
                    id="outlined-basic"
                    type="password" 
                    name="currentPassword"
                    value={data.currentPassword || ''} 
                    onChange={(e) => onchange(e.target)}
                    label="Current Password" 
                    helperText={errors.currentPassword && 'Department code is required'}
                    variant="outlined" 
                    inputRef={(el) => inputRef.current.currentPassword = (el)}
                />
                <TextField 
                    error={errors.newPassword}
                    id="outlined-basic" 
                    type="password" 
                    onChange={(e) => onchange(e.target)}
                    name="newPassword"
                    value={data.newPassword || ''} 
                    label="New Password" 
                    helperText={errors.newPassword && 'Department code is required'}
                    variant="outlined" 
                    inputRef={(el) => inputRef.current.newPassword = (el)}
                />
                <TextField 
                    error={errors.confirmPassword || errors.comparePassword}
                    id="outlined-basic" 
                    type="password" 
                    onChange={(e) => onchange(e.target)}
                    name="confirmPassword"
                    value={data.confirmPassword || ''} 
                    label="Confirm Password" 
                    helperText={errors.confirmPassword && 'Department code is required'}
                    variant="outlined" 
                    inputRef={(el) => inputRef.current.confirmPassword = (el)}  
                />

                <Button variant="contained" onClick={onsubmit}>Contained</Button>
            </Stack>
        </>
    )
}



export default ChangePassword;