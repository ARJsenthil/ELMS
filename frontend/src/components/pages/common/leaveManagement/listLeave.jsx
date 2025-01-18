import { useDispatch, useSelector } from "react-redux";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Link } from "@mui/material";
import { listLeave } from "../../../../action/leave";
import { AlertBox } from "../../../../utilities/alerts/alert";
import { API } from "../../../../common/api";
import axios from "axios";

export default function ListLeave({ leaveStatus }) {
    const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'leaveType',
    label: 'Leave Description',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 100,
  },
];

const dispatch = useDispatch();
const [alert, setAlert] = React.useState({ type: null, message: "", open: false });

const storeData = useSelector( state => state.leave );
const data = storeData.listLeave;

React.useEffect(() => {
  fetchData(leaveStatus, dispatch);
}, [dispatch, data, leaveStatus])

const fetchData = (leaveStatus = null, dispatch) => {
  if(leaveStatus) {
    listLeave(leaveStatus)(dispatch);
  }
  else {
    listLeave()(dispatch);
  }
}

function createData(id, name, leaveType, status, action) {
  return { id, name, leaveType, status, action };
}
const deleteData = (itemID) => {
  axios.delete(`${API.deleteItem}/${itemID}`)
  .then((res) => {
    setAlert({ type: "success", message: "Leave Type Added", open: true });
    fetchData(dispatch);
  })
  .catch((err) => {
    setAlert({ type: "warning", message: "Try Again Later", open: true });

  })
}
const rows = data.map(element => 
  createData(
      element.id, 
      element.name, 
      element.leaveType, 
      element.status === "Approved" ? (
          <p style={{ color: 'green' }}>Approved</p>
      ) : element.status === "NotApproved" ? (
          <p style={{ color: 'red' }}>Not Approved</p>
      ) : (
          <p style={{ color: 'blue' }}>Pending</p>
      ),
      <>
          <Link to={`/leave/viewLeaveByStatus/${element.id}`}>view</Link>
      </>
  )
);


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleAlertClose = () => {
      setAlert((pre) => ({ ...pre, open: false }))
  }

  return (
    <>
        { alert.open && <AlertBox alertType={alert.type} message={alert.message} onClose={handleAlertClose} /> }
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}
