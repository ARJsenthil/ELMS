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
import { listDepartment } from "../../../../action/department";
import { AlertBox } from "../../../../utilities/alerts/alert";
import { API } from "../../../../common/api";
import axios from "axios";

export default function ListDepartment(props) {
  const { router } = props;
  const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'dept_code', label: 'Dept Code', minWidth: 100 },
    {
      id: 'dept_name',
      label: 'Dept Name',
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

  const storeData = useSelector(state => state.department);
  const data = storeData.listDepartment;

  React.useEffect(() => {
    fetchData(dispatch);
  }, [dispatch])

  const fetchData = (dispatch) => {
    listDepartment()(dispatch);
    // router.navigate('/dashboard');
  }

  function createData(id, dept_code, dept_name, action) {
    return { id, dept_code, dept_name, action };
  }

  const editData = (itemID) => {
    router.data = { ...router.data, id: itemID }
    localStorage.setItem("managementId", JSON.stringify({ "id": itemID, "name": "department" }));
    router.navigate(`/department/editDepartment`, { replace: true });
  }
  const deleteData = (itemID) => {
    // alert(itemID)
    axios.delete(`${API.deleteItem}/${itemID}`, {
      data: { model: 'department' }
    })
      .then((res) => {
        setAlert({ type: "success", message: res.data.message, open: true });
        fetchData(dispatch);
      })
      .catch((err) => {
        setAlert({ type: "warning", message: "Try Again Later", open: true });

      })
  }

  const rows = data.map(element =>
    createData(
      element.id,
      element.dept_code,
      element.dept_name,
      <>
        <Button onClick={() => editData(element.id)}>Edit</Button>
        {/* <Button onClick={() => deleteData(element.id)}>Delete</Button> */}
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
        <TableContainer sx={{ maxHeight: 440 }} loading>
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
          loading
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
