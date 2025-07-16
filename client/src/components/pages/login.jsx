import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from '../../utilities/axiosInstance';
import { API } from '../../common/api';
import { AlertBox } from '../../utilities/alerts/alert';
import { useRef, useState } from 'react';
import { addUserDetails } from '../../action/auth';
import { useDispatch } from 'react-redux';

const Login = (props) => {
    const dispatch = useDispatch();
    const { router, setSession } = props;
    const [alignment, setAlignment] = useState('admin');
    const [loading, setLoading] = useState(false);
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
            setLoading(true);
            axios.post(API.login, formdata)
            .then((res) => {
                const userData = res.data.data.data;
                const token = res.data.data.token;
                setSession({ user: userData});
                addUserDetails(userData)(dispatch);
                localStorage.setItem('loginSession', JSON.stringify(userData));
                localStorage.setItem('token', token);
                setAlert({ type: "success", message: "Success", open: true });
                router.navigate("/", { replace: true });
            })
            .catch((err) => {
                console.log("a");
                setAlert({ type: "warning", message: "Try Again Later", open: true });
                
            })
            .finally(() => {
                setLoading(false);
                // window.location.reload();
            });
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
            <Button variant="contained" onClick={onsubmit}>
                {loading? <CircularProgress size="27px" color="inherit" />: "login"}
            </Button>
            </Stack>
        </>
    )
}
export default Login;
