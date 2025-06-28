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
import { listLeaveType } from "../../../../action/leaveType";
import { AlertBox } from "../../../../utilities/alerts/alert";
import { API } from "../../../../common/api";
import axios from "axios";

export default function ListLeaveType(props) {
  const { router } = props;
  const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'leaveType', label: 'LeaveType', minWidth: 100 },
    {
      id: 'leaveDescription',
      label: 'Leave Description',
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

  const storeData = useSelector(state => state.leaveType);
  const data = storeData.listLeaveType;

  React.useEffect(() => {
    fetchData(dispatch);
  }, [dispatch])

  const fetchData = (dispatch) => {
    listLeaveType()(dispatch);
  }

  function createData(id, leaveType, leaveDescription, action) {
    return { id, leaveType, leaveDescription, action };
  }

  const deleteData = (itemID) => {
    axios.delete(`${API.deleteItem}/${itemID}`, { data: { model: 'leave_type' } })
      .then((res) => {
        setAlert({ type: "success", message: "Leave Type Added", open: true });
        fetchData(dispatch);
      })
      .catch((err) => {
        setAlert({ type: "warning", message: "Try Again Later", open: true });

      })
  }
  console.log(data)

  const editData = (itemID) => {
    router.data = { ...router.data, id: itemID }
    console.log(router)
    localStorage.setItem("managementId", JSON.stringify({ "id": itemID, "name": "leaveType"}));
    router.navigate(`/leaveType/editLeaveType`);
  }

  const rows = data.map(element =>
    createData(
      element.id,
      element.leave_type,
      element.description,
      <>
        <Button onClick={() => editData(element.id)}>Edit</Button>
        {/* <Button onClick={() => deleteData(element.ID)}>Delete</Button> */}
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
      {alert.open && <AlertBox alertType={alert.type} message={alert.message} onClose={handleAlertClose} />}
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
