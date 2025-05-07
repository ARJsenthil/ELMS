import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../../common/api";
import { handleInputChangeEmployee, resetEmployee, viewEmployee } from "../../../../action/employee";
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
    const [errors, setErrors] = useState({
        
    });
    const [alert, setAlert] = useState({ type: null, message: "", open: false });

    const inputRef = useRef({
        firstname:null,
        lastname:null,
        mailId:null,
        password:null,
        gender:null,
        DOB:null,
        deptName:null,
        country:null,
        cityTown:null,
        address:null,
        phNo:null,
    });

    const emailregex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const passwordRegex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\>';
    const phoneregex = /(\+91[\s-]?)?[6-9]\d{9}\b/g;
    const unameregex = '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])>';
    const numberRegex = /^\d*$/;
    const [loading, setLoading] = useState(true);

    const id = null;
    useEffect(() => {
        listDepartment()(dispatch)
        if(model === 'edit') {
            viewEmployee(id)(dispatch);            
        }
        else {
            resetEmployee()(dispatch);
        }
    }, [dispatch])

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onchange = ({name, value}) => {
        var checkfield = [ 'firstname', 'lastname', 'password', 'gender', 'DOB', 'deptName', 'country', 'cityTown', 'address' ]
            if(checkfield.includes(name)) {
                setErrors({ ...errors, [name]: false });
                handleInputChangeEmployee(name, value)(dispatch);
            }
            else if(name === 'mailId') {
                handleInputChangeEmployee(name, value)(dispatch);
                if(emailregex.test(value)) {
                    setErrors({ ...errors, 'mailId': false });
                }
                else {
                    setErrors({ ...errors, 'mailId': true });
                }

            }
            else if(name === 'phNo') {
                if(numberRegex.test(value) && value.length <= 10) {
                    handleInputChangeEmployee(name, value)(dispatch);
                    if(phoneregex.test(value)) {
                        setErrors({ ...errors, 'phNo': false });
                    }
                    else {
                        setErrors({ ...errors, 'phNo': true });
                    }
                }
            }
    }

    const onsubmit = () => {
        const newData = { ...data }

        let valid = true;
        let focusField = null
        var checkfield = [];
        if(model === 'edit') {
            checkfield = [ 'firstname', 'lastname', 'mailId', 'gender', 'DOB', 'country', 'cityTown', 'address', 'phNo' ]
        }
        else {
            checkfield = [ 'firstname', 'lastname', 'mailId', 'password', 'gender', 'DOB', 'deptName', 'country', 'cityTown', 'address', 'phNo' ]
        }
        var checkError = {};
        checkfield.forEach(name => {
            if(!newData[name]) {
                checkError[name] = { ...checkError, [name]: false };
                valid = false;
                if(!focusField) focusField = name;
            }            
        });
        
        if(focusField) {
            inputRef.current[focusField].focus();
            console.log(focusField)
        }
        setErrors({ ...checkError })
        
        const formdata = new FormData();
        // newData.forEach(element => {
            // console.log(element)
        // });

        if(valid) {
            const axiosCall = model === 'add' ?
            axios.post(API.addEmployee, newData) 
            : axios.post(API.editEmployee, newData);

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
        { alert.open && <div id='alert'><AlertBox alertType={alert.type} message={alert.message} onClose={handleAlertClose} /></div> }
            <Stack spacing={3}>
            <TextField
                error={errors.firstname}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Firstname"
                value={data.firstname || ''}
                name="firstname"
                helperText={errors.firstname && 'Firstname is required'}
                inputRef={(el) => inputRef.current.firstname = el}
            />
            <TextField
                error={errors.lastname}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Lastname"
                value={data.lastname || ''}
                name="lastname"
                helperText={errors.lastname && 'Lastname is required'}
                inputRef={(el) => inputRef.current.lastname = el}
            />          
            <TextField
                error={errors.mailId}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Mail ID"
                value={data.mailId || ''}
                type="mail"
                name="mailId"
                helperText={errors.mailId && 'Mail ID is required / Invalid Mail id'}
                inputRef={(el) => inputRef.current.mailId = el}
            />
            {user === 'admin' && <FormControl sx={{ m: 1}} variant="outlined" error={errors.password}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={data.password || ''}
                onChange={(e) => onchange(e.target)}
                name="password"
                inputRef={(el) => inputRef.current.password = el}
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
            {errors.password && <FormHelperText>Password is required</FormHelperText>}
            </FormControl>}
            <TextField
                error={errors.gender}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Gender"
                select
                value={data.gender || ''}
                name="gender"
                helperText={errors.gender && 'Employee name is required'}
                inputRef={(el) => inputRef.current.gender = el}
            >
                <MenuItem key="male" value="male">Male</MenuItem>
                <MenuItem key="female" value="female">Female</MenuItem>
                <MenuItem key="other" value="other">Other</MenuItem>
            </TextField>  
            <TextField
                error={errors.DOB}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="DOB"
                type="date"
                value={data.DOB || ''}
                name="DOB"
                defaultValue=" "
                helperText={errors.DOB && 'DOB is required'}
                inputRef={(el) => inputRef.current.DOB = el}
            />
            {user === 'admin' && <TextField
                error={errors.deptName}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Department name"
                select
                value={data.deptName || ''}
                name="deptName"
                helperText={errors.deptName && 'Department name is required'}
                inputRef={(el) => inputRef.current.deptName = el}
            >
                {(storeData.department.listDepartment).map((option) => (
                    <MenuItem key={option.dept_code} value={option.dept_code}>
                    {option.dept_name}
                    </MenuItem>
                ))}
            </TextField>}
            <TextField
                error={errors.country}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Country"
                value={data.country || ''}
                name="country"
                helperText={errors.country && 'Country is required'}
                inputRef={(el) => inputRef.current.country = el}
            />          
            <TextField
                error={errors.cityTown}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="City/Town"
                value={data.cityTown || ''}
                name="cityTown"
                helperText={errors.cityTown && 'City/Town is required'}
                inputRef={(el) => inputRef.current.cityTown = el}
            />
            <TextField
                error={errors.address}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Address"
                multiline
                rows={4}
                value={data.address || ''}
                name="address"
                helperText={errors.address && 'Address is required'}
                inputRef={(el) => inputRef.current.address = el}
            />
            <TextField
                error={errors.phNo}
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
                helperText={errors.phNo && 'Phone Number is required'}
                inputRef={(el) => inputRef.current.phNo = el}
            />
            <Button onClick={onsubmit} >{model} Employee</Button>
            </Stack>
        </>
    )
}

export default AddAndEditEmployee;