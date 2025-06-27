
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { totalCount } from '../../action/dashboard';

const Dashboard = (props) => {
    const { router } = props;
    const data = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    useEffect(() => {
        totalCount()(dispatch);
    }, [dispatch])
    return(
        <>
        <Stack direction={{ xs: 'column', sm: 'row' }}
  spacing={2} sx={{ justifyContent: 'space-evenly' }}>
        <Card sx={{ p:3, flexGrow: 1 }} onClick={()=>router.navigate('/department/listDepartment')} >
        <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                No. of Departments <b>{data.departmentCount}</b>
            </Typography>
        </CardContent>
    </Card>
    <Card sx={{ p:3, flexGrow: 1 }} onClick={()=>router.navigate('/employee/listEmployee')} >
        <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                No. of Employee <b>{data.employeeCount}</b>
            </Typography>
        </CardContent>
    </Card>
    <Card sx={{ p:3, flexGrow: 1 }} onClick={()=>router.navigate('/leaveType/listLeaveType')} >
        <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                No. of Leave Types <b>{data.leaveTypeCount}</b>
            </Typography>
        </CardContent>
    </Card> 
        </Stack>
        </>
    )
}

export default Dashboard;