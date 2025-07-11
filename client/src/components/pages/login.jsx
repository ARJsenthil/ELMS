import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from 'axios';
import { API } from '../../common/api';
import { AlertBox } from '../../utilities/alerts/alert';
import { useRef, useState } from 'react';

const Login = (props) => {

    const { router } = props;
    const [alignment, setAlignment] = useState('admin');
    const handleChange = (event, newAlignment) => {
        if (newAlignment)
            setAlignment(newAlignment);
    };
    const [alert, setAlert] = useState({ type: null, message: "", open: false });

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [ph_no, setph_no] = useState('');
    const [password, setPassword] = useState('');

    const [ph_noError, setph_noError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const ph_noInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const onchange = ({ name, value }) => {
        if (name === 'ph_no') {
            setph_noError(false);
            setph_no(value);
        }
        else if (name === 'password') {
            setPasswordError(false);
            setPassword(value);
        }
    }

    const onsubmit = () => {

        let valid = true;
        let focusField = null

        if (!ph_no) {
            setph_noError(true);
            valid = false;
            if (!focusField) focusField = ph_noInputRef;
        }


        if (!password) {
            setPasswordError(true);
            valid = false;
            if (!focusField) focusField = passwordInputRef;
        }


        if (focusField) {
            focusField.current.focus()
        }

        const formdata = { ph_no, password, type: alignment };
        if (valid) {
            const axiosCall = axios.post(API.login, formdata);

            axiosCall
                .then((res) => {
                    const userData = res.data.data.data;
                    localStorage.setItem('loginSession', JSON.stringify(userData));
                    setAlert({ type: "success", message: "Success", open: true });
                    window.location.reload();
                    router.navigate("/", { replace: true });
                })
                .catch((err) => {
                    setAlert({ type: "warning", message: "Try Again Later", open: true });

                })
        }
    }
    const handleAlertClose = () => {
        setAlert((pre) => ({ ...pre, open: false }))
    }
    const Capitalize = (data) => {
        return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
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
                <ToggleButton value="admin">Admin</ToggleButton>
                <ToggleButton value="employee">Employee</ToggleButton>
            </ToggleButtonGroup>

            <h1>{Capitalize(alignment)} Login</h1>
            {alert.open && <AlertBox alertType={alert.type} message={alert.message} onClose={handleAlertClose} />}

            <Stack spacing={3}>
                <TextField
                    error={ph_noError}
                    id='outlined-error-helper-text'
                    onChange={(e) => onchange(e.target)}
                    label="Phone Number"
                    value={ph_no || ''}
                    name="ph_no"
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">@</InputAdornment>,
                        },
                    }}
                    helperText={ph_noError && 'Phone Number is required'}
                    inputRef={ph_noInputRef}
                />
                <FormControl sx={{ m: 1 }} variant="outlined" error={passwordError}>
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
            <Button variant="contained" onClick={onsubmit}>login</Button>
            </Stack>
        </>
    )
}
export default Login;
