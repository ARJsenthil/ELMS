import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';
import { totalCount } from '../../action/dashboard';

const Dashboard = (props) => {
    const { router } = props;
    const data = useSelector(state => state.dashboard);
    const dispatch = useDispatch();

    const styles = {
        card: { p: 3, flexGrow: 1 },
        typography: { color: 'text.secondary', fontSize: 15, display: 'grid', gap: 1, justifyContent: 'center', alignItems: 'center' },
        b: { display: 'inline', margin: 'auto' }, 

    }
    useEffect(() => {
        totalCount()(dispatch);
    }, [dispatch])
    return (
        <>
            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={2} sx={{ justifyContent: 'space-evenly' }}>
                <Card sx={styles.card} onClick={() => router.navigate('/department/listDepartment')} >
                    <CardContent>
                        <Typography gutterBottom sx={styles.typography}>
                            No. of Departments <b style={styles.b}>{data.departmentCount || <CircularProgress size="17px" color="inherit" />}</b>
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={styles.card} onClick={() => router.navigate('/employee/listEmployee')} >
                    <CardContent>
                        <Typography gutterBottom sx={styles.typography}>
                            No. of Employee <b style={styles.b}>{data.employeeCount || <CircularProgress size="17px" color="inherit" />}</b>
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={styles.card} onClick={() => router.navigate('/leaveType/listLeaveType')} >
                    <CardContent>
                        <Typography gutterBottom sx={styles.typography}>
                            No. of Leave Types <b style={styles.b}>{data.leaveTypeCount || <CircularProgress size="17px" color="inherit" />}</b>
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>
        </>
    )
}

export default Dashboard;