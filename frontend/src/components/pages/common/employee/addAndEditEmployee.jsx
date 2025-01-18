import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../../common/api";
import { handleInputChangeEmployee, viewEmployee } from "../../../../action/employee";
import { AlertBox } from "../../../../utilities/alerts/alert";
import { Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Stack, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { listDepartment } from "../../../../action/department";
const AddAndEditEmployee = (props) => {

    const dispatch = useDispatch();
    const storeData = useSelector( state => state );
    const data = storeData.employee.employee;

    console.log(props)
    const {model, user} = props;
    console.log(model)
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [mailIdError, setMailIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [DOBError, setDOBError] = useState(false);
    const [deptNameError, setDeptNameError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [cityTownError, setCityTownError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [phNoError, setPhNoError] = useState(false);
    const [alert, setAlert] = useState({ type: null, message: "", open: false });

    const firstnameInputRef = useRef(null);
    const lastnameInputRef = useRef(null);
    const mailIdInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const genderInputRef = useRef(null);
    const DOBInputRef = useRef(null);
    const deptNameInputRef = useRef(null);
    const countryInputRef = useRef(null);
    const cityTownInputRef = useRef(null);
    const addressInputRef = useRef(null);
    const phNoInputRef = useRef(null);

    const emailregex = '/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g';
    const passwordRegex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\>';
    const phoneregex = '/(\+91[\s-]?)?[6-9]\d{9}\b/g';
    const unameregex = '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])>';
    const numberRegex = '/^\d*$/';
    const [loading, setLoading] = useState(true);

    const id = null;
    useEffect(() => {
        listDepartment()(dispatch)
        if(model === 'edit') {
            viewEmployee(id)(dispatch);            
        }
    }, [dispatch])

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);


    const onchange = ({name, value}) => {
        if(name === 'firstname') {
            setFirstnameError(false);
            handleInputChangeEmployee(name, value)(dispatch);
        }
        else if(name === 'lastname') {
            setLastnameError(false);
            handleInputChangeEmployee(name, value)(dispatch);
        }
        else if(name === 'mailId') {
            setMailIdError(false);
            handleInputChangeEmployee(name, value)(dispatch);
        }
        else if(name === 'password') {
            setPasswordError(false);
            handleInputChangeEmployee(name, value)(dispatch);
        }
        else if(name === 'gender') {
            setGenderError(false);
            handleInputChangeEmployee(name, value)(dispatch);
        }
        else if(name === 'DOB') {
            setDOBError(false);
            handleInputChangeEmployee(name, value)(dispatch);
        }
        else if(name === 'deptName') {
            setDeptNameError(false);
            handleInputChangeEmployee(name, value)(dispatch);
        }
        else if(name === 'country') {
            setCountryError(false);
            handleInputChangeEmployee(name, value)(dispatch);
        }
        else if(name === 'cityTown') {
            setCityTownError(false);
            handleInputChangeEmployee(name, value)(dispatch);
        }
        else if(name === 'address') {
            setAddressError(false);
            handleInputChangeEmployee(name, value)(dispatch);
        }
        else if(name === 'phNo') {
            if(numberRegex.test) {
                setPhNoError(false);
                handleInputChangeEmployee(name, value)(dispatch);
            }
        }
    }

    const onsubmit = () => {
        const newData = { ...data }

        let valid = true;
        let focusField = null

        if(!newData.firstname) {
            setFirstnameError(true);
            valid = false;
            if(!focusField) focusField = firstnameInputRef;
        }


        if(!newData.lastname) {
            setLastnameError(true);
            valid = false;
            if(!focusField) focusField = lastnameInputRef;
        }


        if(!newData.mailId) {
            setMailIdError(true);
            valid = false;
            if(!focusField) focusField = mailIdInputRef;
        }

        if(!newData.password) {
            setPasswordError(true);
            valid = false;
            if(!focusField) focusField = passwordInputRef;
        }


        if(!newData.gender) {
            setGenderError(true);
            valid = false;
            if(!focusField) focusField = genderInputRef;
        }


        if(!newData.DOB) {
            setDOBError(true);
            valid = false;
            if(!focusField) focusField = DOBInputRef;
        }

        if(!newData.deptName) {
            setDeptNameError(true);
            valid = false;
            if(!focusField) focusField = deptNameInputRef;
        }


        if(!newData.country) {
            setCountryError(true);
            valid = false;
            if(!focusField) focusField = countryInputRef;
        }


        if(!newData.cityTown) {
            setCityTownError(true);
            valid = false;
            if(!focusField) focusField = cityTownInputRef;
        }


        if(!newData.address) {
            setAddressError(true);
            valid = false;
            if(!focusField) focusField = addressInputRef;
        }

        if(!newData.phNo) {
            setPhNoError(true);
            valid = false;
            if(!focusField) focusField = phNoInputRef;
        }
        
        if(focusField) {
            focusField.current.focus()
            console.log(focusField)
        }
        
        const formdata = new FormData();
        // newData.forEach(element => {
            // console.log(element)
        // });

        if(valid) {
            const axiosCall = model === 'add' 
                ? axios.post(API.addEmployee, formdata) 
                : axios.post(API.editEmployee, formdata);

            axiosCall
            .then((res) => {
                setAlert({ type: "success", message: "Employee Added", open: true });
                
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
                error={firstnameError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Firstname"
                value={data.firstname || ''}
                name="firstname"
                helperText={firstnameError && 'Firstname is required'}
                inputRef={firstnameInputRef}
            />
            <TextField
                error={lastnameError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Lastname"
                value={data.lastname || ''}
                name="lastname"
                helperText={lastnameError && 'Lastname is required'}
                inputRef={lastnameInputRef}
            />          
            <TextField
                error={mailIdError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Mail ID"
                value={data.mailId || ''}
                type="mail"
                name="mailId"
                helperText={mailIdError && 'Mail ID is required'}
                inputRef={mailIdInputRef}
            />
            {user.type === 'admin' && <FormControl sx={{ m: 1}} variant="outlined" error={passwordError}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={data.password || ''}
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
            </FormControl>}
            <TextField
                error={genderError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Gender"
                select
                value={data.gender || ''}
                name="gender"
                helperText={genderError && 'Employee name is required'}
                inputRef={genderInputRef}
            >
                <MenuItem key="male" value="male">Male</MenuItem>
                <MenuItem key="female" value="female">Female</MenuItem>
                <MenuItem key="other" value="other">Other</MenuItem>
            </TextField>  
            <TextField
                error={DOBError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="DOB"
                type="date"
                value={data.DOB || ''}
                name="DOB"
                defaultValue=" "
                helperText={DOBError && 'DOB is required'}
                inputRef={DOBInputRef}
            />
            {user.type === 'admin' && <TextField
                error={deptNameError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Department name"
                select
                value={data.deptName || ''}
                name="deptName"
                helperText={deptNameError && 'Department name is required'}
                inputRef={deptNameInputRef}
            >
                {(storeData.department.listDepartment).map((option) => (
                    <MenuItem key={option.deptCode} value={option.deptCode}>
                    {option.deptName}
                    </MenuItem>
                ))}
            </TextField>}
            <TextField
                error={countryError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Country"
                value={data.country || ''}
                name="country"
                helperText={countryError && 'Country is required'}
                inputRef={countryInputRef}
            />          
            <TextField
                error={cityTownError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="City/Town"
                value={data.cityTown || ''}
                name="cityTown"
                helperText={cityTownError && 'City/Town is required'}
                inputRef={cityTownInputRef}
            />
            <TextField
                error={addressError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Address"
                multiline
                rows={4}
                value={data.address || ''}
                name="address"
                helperText={addressError && 'Address is required'}
                inputRef={addressInputRef}
            />
            <TextField
                error={phNoError}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Phone Number"
                value={data.phNo || ''}
                name="phNo"
                slotProps={{
                    input: {
                    startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                    },
                }}
                helperText={phNoError && 'Phone Number is required'}
                inputRef={phNoInputRef}
            />
            <Button onClick={onsubmit}>{model} Employee</Button>
            </Stack>
        </>
    )
}

export default AddAndEditEmployee;