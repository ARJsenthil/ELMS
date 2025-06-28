import BarChartIcon from '@mui/icons-material/BarChart';
import BadgeIcon from '@mui/icons-material/Badge';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

export const NAVIGATION = {
            admin : [
                { 
                    segment: 'dashboard', 
                    title: 'Dashboard', 
                    icon: <DashboardIcon />, 
                    },
                    { 
                    segment: 'employee', 
                    title: 'Employee', 
                    icon: <BadgeIcon />, 
                    children: [
                        { 
                        segment: 'addEmployee', 
                        title: 'Add Employee', 
                        icon: <RadioButtonCheckedIcon sx={{ fontSize: 'medium' }} />, 
                        },
                        { 
                        segment: 'listEmployee', 
                        title: 'List Employee', 
                        icon: <RadioButtonCheckedIcon sx={{ fontSize: 'medium' }} />, 
                        },
                    ],
                    },
                    { 
                    segment: 'department', 
                    title: 'Department', 
                    icon: <BusinessIcon />, 
                    children: [
                        { 
                        segment: 'addDepartment', 
                        title: 'Add Department', 
                        icon: <RadioButtonCheckedIcon sx={{ fontSize: 'medium' }} />, 
                        },
                        { 
                        segment: 'listDepartment', 
                        title: 'List Department', 
                        icon: <RadioButtonCheckedIcon sx={{ fontSize: 'medium' }} />, 
                        },
                    ],
                    },
                    { 
                    segment: 'leaveType', 
                    title: 'LeaveType', 
                    icon: <BarChartIcon />, 
                    children: [
                        { 
                        segment: 'addLeaveType', 
                        title: 'Add LeaveType', 
                        icon: <RadioButtonCheckedIcon sx={{ fontSize: 'medium' }} />, 
                        },
                        { 
                        segment: 'listLeaveType', 
                        title: 'List LeaveType', 
                        icon: <RadioButtonCheckedIcon sx={{ fontSize: 'medium' }} />, 
                        },
                    ],
                    },
                    { 
                    segment: 'leaveManagement', 
                    title: 'LeaveManagement', 
                    icon: <BarChartIcon />, 
                    children: [
                        { 
                        segment: 'listLeave', 
                        title: 'List Leave', 
                        icon: <RadioButtonCheckedIcon sx={{ fontSize: 'medium' }} />, 
                        },
                        { 
                        segment: 'pendingLeaves', 
                        title: 'Pending Leaves', 
                        icon: <RadioButtonCheckedIcon sx={{ fontSize: 'medium' }} />, 
                        },
                        { 
                        segment: 'notApprovedLeaves', 
                        title: 'Not Approved Leaves', 
                        icon: <RadioButtonCheckedIcon sx={{ fontSize: 'medium' }} />, 
                        },
                        { 
                        segment: 'approvedLeaves', 
                        title: 'Approved Leaves', 
                        icon: <RadioButtonCheckedIcon sx={{ fontSize: 'medium' }} />, 
                        },
                    ],
                    },
                    { 
                    segment: 'changePassword', 
                    title: 'Change Password', 
                    icon: <LockResetIcon />, 
                    },
            ],
            employee : [
                { 
                segment: 'myProfile', 
                title: 'My Profile', 
                icon: <LockResetIcon />, 
                },
                { 
                segment: 'leave', 
                title: 'Leave', 
                icon: <BarChartIcon />, 
                children: [
                    { 
                    segment: 'addLeave', 
                    title: 'Add Leave', 
                    icon: <RadioButtonCheckedIcon sx={{ fontSize: 'medium' }} />, 
                    },
                    { 
                    segment: 'leaveHistory', 
                    title: 'Leave History', 
                    icon: <RadioButtonCheckedIcon sx={{ fontSize: 'medium' }} />, 
                    },
                ],
                },
                { 
                segment: 'changePassword', 
                title: 'Change Password', 
                icon: <LockResetIcon />, 
                },

            ],
            login : [
                { 
                segment: 'login', 
                title: 'Login', 
                icon: <LockResetIcon />, 
                },
            ],
}