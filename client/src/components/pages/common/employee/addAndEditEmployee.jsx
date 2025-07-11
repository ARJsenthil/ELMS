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

    const {model, user, router} = props;
    const [errors, setErrors] = useState({
        
    });
    const [alert, setAlert] = useState({ type: null, message: "", open: false });

    const inputRef = useRef({
        firstname:null,
        lastname:null,
        email:null,
        password:null,
        gender:null,
        dob:null,
        dept_id:null,
        country:null, 
        city_town:null,
        address:null,
        ph_no:null,
    });

    const emailregex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const passwordRegex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\>';
    const phoneregex = /(\+91[\s-]?)?[6-9]\d{9}\b/g;
    const unameregex = '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])>';
    const numberRegex = /^\d*$/;
    const [loading, setLoading] = useState(true);

    const idData = JSON.parse(localStorage.getItem('managementId')) || JSON.parse(localStorage.getItem('loginSession')).user || "";
    const id = idData.name == 'employee' || idData.type == 'employee' ? idData.id: ( model == "edit" && router.navigate('/employee/listEmployee', { replace: true }));
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
        var checkfield = [ 'firstname', 'lastname', 'password', 'gender', 'dob', 'dept_id', 'country', 'city_town', 'address' ]
            if(checkfield.includes(name)) {
                setErrors({ ...errors, [name]: false });
                handleInputChangeEmployee(name, value)(dispatch);
            }
            else if(name === 'email') {
                handleInputChangeEmployee(name, value)(dispatch);
                if(emailregex.test(value)) {
                    setErrors({ ...errors, 'email': false });
                }
                else {
                    setErrors({ ...errors, 'email': true });
                }

            }
            else if(name === 'ph_no') {
                if(numberRegex.test(value) && value.length <= 10) {
                    handleInputChangeEmployee(name, value)(dispatch);
                    if(phoneregex.test(value)) {
                        setErrors({ ...errors, 'ph_no': false });
                    }
                    else {
                        setErrors({ ...errors, 'ph_no': true });
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
            checkfield = [ 'firstname', 'lastname', 'email', 'gender', 'dob', 'country', 'city_town', 'address', 'ph_no' ]
        }
        else {
            checkfield = [ 'firstname', 'lastname', 'email', 'password', 'gender', 'dob', 'dept_id', 'country', 'city_town', 'address', 'ph_no' ]
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
        }
        setErrors({ ...checkError })
        
        const formdata = new FormData();
        // newData.forEach(element => {
        // });

        if(valid) {
            const axiosCall = model === 'add' ?
            axios.post(API.employee, newData) 
            : axios.put(API.employee+id, newData);

            axiosCall
            .then((res) => {
                setAlert({ type: "success", message: "Employee Added", open: true });
                router.navigate('/employee/listEmployee', { replace: true });
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
                error={errors.email}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Mail ID"
                value={data.email || ''}
                type="mail"
                name="email"
                helperText={errors.email && 'Mail ID is required / Invalid Mail id'}
                inputRef={(el) => inputRef.current.email = el}
            />
            {model === 'add' && <FormControl sx={{ m: 1}} variant="outlined" error={errors.password}>
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
                error={errors.dob}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="dob"
                type="date"
                value={data.dob || ''}
                name="dob"
                defaultValue=" "
                helperText={errors.dob && 'dob is required'}
                inputRef={(el) => inputRef.current.dob = el}
            />
            {user === 'admin' && <TextField
                error={errors.dept_id}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Department name"
                select
                value={data.dept_id || ''}
                name="dept_id"
                helperText={errors.dept_id && 'Department name is required'}
                inputRef={(el) => inputRef.current.dept_id = el}
            >
                {(storeData.department.listDepartment).map((option) => (
                    <MenuItem key={option.id} value={option.id}>
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
                error={errors.city_town}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="City/Town"
                value={data.city_town || ''}
                name="city_town"
                helperText={errors.city_town && 'City/Town is required'}
                inputRef={(el) => inputRef.current.city_town = el}
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
                error={errors.ph_no}
                id='outlined-error-helper-text'
                onChange={(e) => onchange(e.target)}
                label="Phone Number"
                value={data.ph_no || ''}
                name="ph_no"
                slotProps={{
                    input: {
                    startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                    },
                }}
                helperText={errors.ph_no && 'Phone Number is required'}
                inputRef={(el) => inputRef.current.ph_no = el}
            />
            <Button onClick={onsubmit} >{model} Employee</Button>
            </Stack>
        </>
    )
}

export default AddAndEditEmployee;