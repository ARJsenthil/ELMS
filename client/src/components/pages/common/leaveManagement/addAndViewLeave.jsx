import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const AddAndViewLeave = (props) => {

    const dispatch = useDispatch();
    const storeData = useSelector(state => state.leave);
    const data = storeData.leave;

    const { model, user, router } = props;
    const [ errors, setErrors ] = useState({});

    const [ alert, setAlert ] = useState({ type: null, message: '', open: false });

    const inputRef = useRef({
        from_date: null,
        to_date: null,
        leave_type: null,
        reson: null,
        admin_remark: null,
    })
    return (
        <>
            
        </>
    );
}