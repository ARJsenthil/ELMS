import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from 'axios';
import { API } from '../../common/api';
import { AlertBox } from '../../utilities/alerts/alert';
import { useRef, useState } from 'react';

const Login = (props) => {

    const [alignment, setAlignment] = useState('Admin');
    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };
    const [alert, setAlert] = useState({ type: null, message: "", open: false });

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const usernameInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const onchange = ({name, value}) => {
        if(name === 'username') {
            setUsernameError(false);
            setUsername(value);
        }
        else if(name === 'password') {
            setPasswordError(false);
            setPassword(value);
        }
    }

    const onsubmit = () => {

        let valid = true;
        let focusField = null

        if(!username) {
            setUsernameError(true);
            valid = false;
            if(!focusField) focusField = usernameInputRef;
        }


        if(!password) {
            setPasswordError(true);
            valid = false;
            if(!focusField) focusField = passwordInputRef;
        }


        if(focusField) {
            focusField.current.focus()
            console.log(focusField)
        }
        
        const formdata = new FormData();
        formdata.append('username', username);
        formdata.append('password', password);
        formdata.append('type', alignment);

        if(valid) {
            const axiosCall = axios.post(API.login, formdata);

            axiosCall
            .then((res) => {
                setAlert({ type: "success", message: "Success", open: true });
                
            })
            .catch((err) => {
                setAlert({ type: "warning", message: "Try Again Later", open: true });

            })
        }
    }
    const handleAlertClose = () => {
        setAlert((pre) => ({ ...pre, open: false }))
    }
    return (
        <>
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            <ToggleButton value="Admin">Admin</ToggleButton>
            <ToggleButton value="Employee">Employee</ToggleButton>
        </ToggleButtonGroup>

            <h1>{alignment} Login</h1>
            { alert.open && <AlertBox alertType={alert.type} message={alert.message} onClose={handleAlertClose} /> }

            <TextField
                error={usernameError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Phone Number"
                value={username || ''}
                name="username"
                slotProps={{
                    input: {
                    startAdornment: <InputAdornment position="start">@</InputAdornment>,
                    },
                }}
                helperText={usernameError && 'Phone Number is required'}
                inputRef={usernameInputRef}
            />
            <FormControl sx={{ m: 1}} variant="outlined" error={passwordError}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password || ''}
                onChange={(e) => onchange(e.target)}
                name="password"
                inputRef={passwordInputRef}
                label="Password"
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                    onClick={handleClickShowPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
            />
            {passwordError && <FormHelperText>Password is required</FormHelperText>}
            </FormControl>
            <Button onClick={onsubmit}>login</Button>
        </>
    )
}
export default Login;
