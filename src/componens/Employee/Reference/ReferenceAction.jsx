import React, { useEffect, useState,useContext } from "react";
import { Box,  useTheme,Tooltip,IconButton  } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../Header";
import { tokens } from "../../../../theme";
import { listOfReference } from "../../../../Services/apiData";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { canAccessResource } from "../../Auth/Services/SecurityService";
import EmployeeServiceResourceName from "../../Auth/Resource/EmployeeServiceResourceName";
import AuthContext from "../../Auth/AuthContext";



const ReferenceAction = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();

  const employerId = location.state?.employerId;
  console.log(`the  employee id ${employerId}`);


  const [reference, setReference] = useState([]);
  const [error, setError] = useState(null);
  // const [openDialog, setOpenDialog] = useState(false);;
  // const [referenceToDelete, setReferenceToDelete] = useState(null);
  
  const handleEditReference = (employerId, id) => {
    navigate('/employee/EditReference', { state: { employerId, id } });
  };

  const handleDelete = (employerId, id) => {
    navigate('/employee/deleteReference', { state: { employerId, id } });
  };
  

  useEffect(() => {
    fetchReference();
    checkPermissions();
  }, []);

  const fetchReference = async () => {
    try {
      const response = await listOfReference(employerId);
      const data = response.data;
      setReference(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const { authState } = useContext(AuthContext);
  const userRoles = authState.roles;

  const checkPermissions = async () => {
    // Check permissions for actions
    const editAccess = await canAccessResource(EmployeeServiceResourceName.UPDATE_REFERENCE, userRoles);
    const deleteAccess = await canAccessResource(EmployeeServiceResourceName.DELETE_REFERENCE, userRoles);
  
    setCanEdit(editAccess);
    setCanDelete(deleteAccess);
  };

  const columns = [
    { field: "fullName", headerName: "FullName", flex: 1, cellClassName: "name-column--cell" },
  { field: "phoneNumber", headerName: "phoneNumber", flex: 1, cellClassName: "name-column--cell" },
  { field: "jobTitle", headerName: "jobTitle", flex: 1, cellClassName: "name-column--cell" },
  { field: "workAddress", headerName: "workAddress", flex: 1, cellClassName: "name-column--cell" },
  { field: "email", headerName: "email", flex: 1, cellClassName: "name-column--cell" },
  { field: "description", headerName: "description", flex: 1, cellClassName: "name-column--cell" },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
   renderCell: (params) => (
      <Box  sx={{ display: 'flex', justifyContent: 'center' }}>
         
         {canDelete &&(
            <Tooltip title="Delete Reference of Employer">
            <IconButton onClick={() => handleDelete(employerId, params.row.id)}   color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>

         )}

         {canEdit &&(
            <Tooltip title="Update">
            <IconButton
                 onClick={() => handleEditReference(employerId, params.row.id)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

         )}
        
        
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header  subtitle="List of employer reference" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={reference}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection={false}
        />
      </Box>
      {/* <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this Reference for Employer?"
      /> */}
    </Box>
  );
};

export default ReferenceAction;
