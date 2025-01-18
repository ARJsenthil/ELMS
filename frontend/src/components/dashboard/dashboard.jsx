
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { totalDepartment, totalEmployee, totalLeaveType } from '../../action/dashboard';

const Dashboard = () => {
    const data = useSelector(state => state);
    console.log(data)
    const dispatch = useDispatch();
    useEffect(() => {
        totalDepartment()(dispatch);
        totalEmployee()(dispatch);
        totalLeaveType()(dispatch);
    }, [dispatch])
    return(
        <>
        <Stack direction={{ xs: 'column', sm: 'row' }}
  spacing={2} sx={{ justifyContent: 'space-evenly' }}>
        <Card sx={{ p:3, flexGrow: 1 }}>
        <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                No. of Departments <b>{data.dashboard.totalDepartment}</b>
            </Typography>
        </CardContent>
    </Card>
    <Card sx={{ p:3, flexGrow: 1 }}>
        <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                No. of Employee <b>{data.dashboard.totalEmployee}</b>
            </Typography>
        </CardContent>
    </Card>
    <Card sx={{ p:3, flexGrow: 1 }}>
        <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                No. of Leave Types <b>{data.dashboard.totalLeaveType}</b>
            </Typography>
        </CardContent>
    </Card> 
        </Stack>
        </>
    )
}

export default Dashboard;