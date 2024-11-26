import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { listEmployees, listOfPayGrade, listTitleName } from "../../../Services/apiData";
import { Box, useTheme, IconButton, Tooltip, TextField, Snackbar, Alert, Toolbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useNavigate } from "react-router-dom";
import ToolbarComponent from "../Training/ToolbarComponent";
import AuthContext from "../Auth/AuthContext";
import AccessDenied from "../Auth/AccessDenied";
import { canAccessResource } from "../Auth/Services/SecurityService";
import EmployeeServiceResourceName from "../Auth/Resource/EmployeeServiceResourceName";

const ListEmployee = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const userRoles = authState.roles;
  const [accessDenied, setAccessDenied] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canAddMore, setCanAddMore] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmployees();
    checkPermissions();
  }, []);

  const fetchEmployees = async () => {
    try {
      const [employeeResponse, titleNamesResponse, payGradeNameResponse] = await Promise.all([
        listEmployees(),
        listTitleName(),
        listOfPayGrade(),
      ]);

      const employeeData = employeeResponse.data;
      const titleNamesData = titleNamesResponse.data;
      const payGradeNamesData = payGradeNameResponse.data;

      const mappedData = employeeData.map((employee) => ({
        ...employee,
        titleName: getTitleName(employee.titleNameId, titleNamesData),
        salary: getPayGradeName(employee.payGradeId, payGradeNamesData),
      }));

      setEmployees(mappedData);
      showNotification("Employees fetched successfully!", "success");
    } catch (error) {
      setError(error.message);
      showNotification("Failed to fetch employees. Please try again.", "error");
      console.error(error.message);
    }
  };

  const getTitleName = (titleNameId, titleNames) => {
    const title = titleNames.find((name) => name.id === titleNameId);
    return title ? title.titleName : "Unknown";
  };

  const getPayGradeName = (payGradeId, payGradeNames) => {
    const payGrade = payGradeNames.find((name) => name.id === payGradeId);
    return payGrade ? payGrade.salary : "Unknown";
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setNotification({ ...notification, open: false });
  };

    const handleEditEmployee = (id) => {
    navigate("/employee/editDetails", { state: { id, isEditable: true } });
  };

    const handleDetails = (id) => {
    navigate("/employee/editDetails", { state: { id, isEditable: false } });
  };

  const checkPermissions = async () => {
    setCanEdit(await canAccessResource(EmployeeServiceResourceName.UPDATE_EMPLOYEE, userRoles));
    setCanDelete(await canAccessResource(EmployeeServiceResourceName.DELETE_EMPLOYEE, userRoles));
    setCanAddMore(await canAccessResource(EmployeeServiceResourceName.ADD_ADDRESS, userRoles));
  };

  const filteredEmployees = searchTerm
    ? employees.filter((employee) => employee.employeeId.toString().includes(searchTerm))
    : employees;

  const columns = [
    { field: "employeeId", headerName: "Employee ID", flex: 1 },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "employmentType", headerName: "Employment Type", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          {canDelete && (
            <Tooltip title="Delete Employee">
              <IconButton onClick={() => navigate("/employee/delete", { state: { employeeId: params.row.id } })} color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* {canAddMore && (
            <Tooltip title="Add More About Employee">
              <IconButton onClick={() => navigate("/employee/details", { state: { id: params.row.id } })}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )} */}

          {/* {canEdit && (
            <Tooltip title="Update Employee Information">
              <IconButton onClick={() => navigate("/employee/edit", { state: { id: params.row.id } })} color="primary">
                <EditIcon />
              </IconButton>
            </Tooltip>
          )} */}

          {canEdit && (
            <Tooltip title="Update Employee Information">
              <IconButton onClick={() => handleEditEmployee(params.row.id)} color="primary">
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Detail">
         <IconButton onClick={() => handleDetails(params.row.id)}>
          <ReadMoreIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {accessDenied ? (
        <AccessDenied />
      ) : (
        <Box>
          <ToolbarComponent mainIconType="add" onMainIconClick={() => navigate("/employee/addEmployee")} />

          <Box m="0 0 0 0" height="75vh">
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mb: 2 }}>
              <TextField
                label="Search by Employee ID"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: "300px" }}
              />
            </Box>

            <DataGrid
              rows={filteredEmployees}
              columns={columns}
              getRowId={(row) => row.id}
              checkboxSelection={false}
              pageSize={20}
              pageSizeOptions={[10, 20, 50]}
            />
          </Box>

          {error && (
            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            </Snackbar>
          )}

          {/* Snackbar for Notifications */}
          <Snackbar 
            open={notification.open} 
            autoHideDuration={6000} 
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioned at top-right
          >
            <Alert onClose={handleCloseSnackbar} severity={notification.severity}>
              {notification.message}
            </Alert>
          </Snackbar>
        </Box>
      )}
    </Box>
  );
};

export default ListEmployee;









// import DeleteIcon from "@mui/icons-material/Delete";

// import React, { useEffect, useState, useContext } from "react";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../../theme";
// import { listEmployees, listOfPayGrade, listTitleName } from "../../../Services/apiData";
// import { Box, useTheme, IconButton, Tooltip, TextField, Snackbar, Alert, Toolbar } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import ReadMoreIcon from "@mui/icons-material/ReadMore";
// import { useNavigate } from "react-router-dom";
// import ToolbarComponent from "../Training/ToolbarComponent";
// import AuthContext from "../Auth/AuthContext";
// import AccessDenied from "../Auth/AccessDenied";
// import { canAccessResource } from "../Auth/Services/SecurityService";
// import EmployeeServiceResourceName from "../Auth/Resource/EmployeeServiceResourceName";

// const ListEmployee = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const navigate = useNavigate();
//   const { authState } = useContext(AuthContext);
//   const userRoles = authState.roles;
//   const [accessDenied, setAccessDenied] = useState(false);
//   const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  
//   const handleCloseSnackbar = () => {
//     setNotification({ ...notification, open: false });
//   };

//   const [canEdit, setCanEdit] = useState(false);

//   const [canDelete, setCanDelete] = useState(false);
//   const [canAddMore, setCanAddMore] = useState(false);
//   const [canAdd, setCanAss] = useState(false);

//   const [employees, setEmployees] = useState([]);
  
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchEmployees();
//     checkPermissions(); // Check permissions when the component mounts
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const [employeeResponse, titleNamesResponse, payGradeNameResponse] = await Promise.all([
//         listEmployees(),
//         listTitleName(),
//         listOfPayGrade(),
//       ]);

//       const employeeData = employeeResponse.data;
//       const titleNamesData = titleNamesResponse.data;
//       const payGradeNamesData = payGradeNameResponse.data;

//       const mappedData = employeeData.map((employee) => ({
//         ...employee,
//         titleName: getTitleName(employee.titleNameId, titleNamesData),
//         salary: getPayGradeName(employee.payGradeId, payGradeNamesData),
//       }));

//       setEmployees(mappedData);
//       setNotification({ open: true, message: "Employee fetched successfully!", severity: "success" });

//     } catch (error) {
//       setError(error.message);
//       setNotification({ open: true, message: "Employee  not fetched try again !", severity: "success" });
//       console.error(error.message);
//     }
//   };

//   const getTitleName = (titleNameId, titleNames) => {
//     const title = titleNames.find((name) => name.id === titleNameId);
//     return title ? title.titleName : "Unknown";
//   };

//   const getPayGradeName = (payGradeId, payGradeNames) => {
//     const payGrade = payGradeNames.find((name) => name.id === payGradeId);
//     return payGrade ? payGrade.salary : "Unknown";
//   };

//   const handleEditEmployee = (id) => {
//     navigate("/employee/edit", { state: { id, isEditable: true } });
//   };

//   const handleDetails = (id) => {
//     navigate("/employee/edit", { state: { id, isEditable: false } });
//   };

//   const handleMoreAboutEmployer = (id) => {
//     navigate("/employee/details", { state: { id } });
//   };

//   const checkPermissions = async () => {
//     // Check permissions for actions
//     const addAccess = await canAccessResource(EmployeeServiceResourceName.ADD_EMPLOYEE, userRoles);

//     const editAccess = await canAccessResource(EmployeeServiceResourceName.UPDATE_EMPLOYEE, userRoles);
//     const deleteAccess = await canAccessResource(EmployeeServiceResourceName.DELETE_EMPLOYEE, userRoles);
//     const addMoreAccess = await canAccessResource(
//       EmployeeServiceResourceName.ADD_ADDRESS || EmployeeServiceResourceName.ADD_EDUCATION ||
//       EmployeeServiceResourceName.ADD_EXPERIENCE || EmployeeServiceResourceName.ADD_LANGUAGE 
//       , userRoles);

//     setCanEdit(editAccess);
//     setCanDelete(deleteAccess);
//     setCanAddMore(addMoreAccess);
//     setCanAss(addAccess);
//   };

//   const filteredEmployees = searchTerm
//     ? employees.filter((employee) =>
//         employee.employeeId.toString().includes(searchTerm)
//       )
//     : employees;

//   const columns = [
//     { field: "employeeId", headerName: "Employee ID", flex: 1 },
//     { field: "firstName", headerName: "First Name", flex: 1 },
//     { field: "lastName", headerName: "Last Name", flex: 1 },
//     { field: "employmentType", headerName: "Employment Type", flex: 1 },
//     { field: "email", headerName: "Email", flex: 1 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       renderCell: (params) => (
//         <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
//           {canDelete && (
//             <Tooltip title="Delete Employee">
//               <IconButton onClick={() => navigate("/employee/delete", { state: { employeeId: params.row.id } })} color="error">
//                 <DeleteIcon />
//               </IconButton>
//             </Tooltip>
//           )}
//           {canAddMore && (
//             <Tooltip title="Add More About Employee">
//               <IconButton onClick={() => handleMoreAboutEmployer(params.row.id)}>
//                 <AddIcon />
//               </IconButton>
//             </Tooltip>
//           )}
//           {canEdit && (
//             <Tooltip title="Update Employee Information">
//               <IconButton onClick={() => handleEditEmployee(params.row.id)} color="primary">
//                 <EditIcon />
//               </IconButton>
//             </Tooltip>
//           )}
          
//           <Tooltip title="Detail">
//             <IconButton onClick={() => handleDetails(params.row.id)}>
//               <ReadMoreIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box>
//       {accessDenied ? (
//         <AccessDenied />
//       ) : (
//         <Box>
                     
//           <ToolbarComponent mainIconType="add" onMainIconClick={() => navigate("/employee/create")} />
//           <Box m="0 0 0 0" height="75vh">
//             <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mb: 2 }}>
//               <TextField
//                 label="Search by Employee ID"
//                 variant="outlined"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 sx={{ width: "300px" }}
//               />
//             </Box>

//             <DataGrid
//               rows={filteredEmployees}
//               columns={columns}
//               getRowId={(row) => row.id}
//               // components={{Toolbar: GridToolbar}}
//               checkboxSelection={false}
//               pageSize={20}
//               pageSizeOptions={[10, 20, 50]}
//             />
//           </Box>
//           {error && (
//             <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
//               <Alert severity="error" onClose={() => setError(null)}>
//                 {error}
//               </Alert>
//             </Snackbar>
//           )}
//           {/* Snackbar for Notifications */}
//       <Snackbar 
//         open={notification.open} 
//         autoHideDuration={6000} 
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioned at top-right
//       >
//         <Alert onClose={handleCloseSnackbar} severity={notification.severity}>
//           {notification.message}
//         </Alert>
//       </Snackbar>
//         </Box>
        
//       )}
//     </Box>
//   );
// };

// export default ListEmployee;







