
import React, { useEffect, useState,useContext } from "react";
import { Box, Tooltip, useTheme,IconButton  } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../Header";
import { tokens } from "../../../../theme";
import {  listOfExperience } from "../../../../Services/apiData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import DeleteDialog from "../../DeleteDialog";
import { canAccessResource } from "../../Auth/Services/SecurityService";
import EmployeeServiceResourceName from "../../Auth/Resource/EmployeeServiceResourceName";
import AuthContext from "../../Auth/AuthContext";


const ExperenceAction = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();

  const employerId = location.state?.employerId;
  console.log(`the  employee id ${employerId}`);

  

  const [experence, setExperence] = useState([]);
  // const [error, setError] = useState(null);
  // const [openDialog, setOpenDialog] = useState(false);;
  
  //  const [experenceToDelete, setExperenceToDelete] = useState(null);
  
  const handleEditExperence = (employerId, id) => {
    navigate('/employee/EditExperence', { state: { employerId, id } });
  };

  const handleDelete = (employerId, id) => {
    navigate('/employee/deleteExperience', { state: { employerId, id } });
  };

  useEffect(() => {
    fetchExperence();
    checkPermissions();
  }, []);

  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const { authState } = useContext(AuthContext);
  const userRoles = authState.roles;

  const checkPermissions = async () => {
    // Check permissions for actions
    const editAccess = await canAccessResource(EmployeeServiceResourceName.UPDATE_EXPERIENCE, userRoles);
    const deleteAccess = await canAccessResource(EmployeeServiceResourceName.DELETE_EXPERIENCE, userRoles);
  
    setCanEdit(editAccess);
    setCanDelete(deleteAccess);
  };

  const fetchExperence = async () => {
    try {
      const response = await listOfExperience(employerId);
      const data = response.data;
      setExperence(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  // const handleDelete = async (employerId, experence) => {
  //   setExperenceToDelete(experence);
  //   setOpenDialog(true);
  // };

  // const handleConfirmDelete = async () => {
  //   try {
  //     await deleteExperience(employerId, experenceToDelete.id);
  //     const updatedExperence = training.filter((emp) => emp.id !== experenceToDelete.id);
  //     setExperence(updatedExperence);
  //     console.log("Experence deleted:", experenceToDelete);
  //   } catch (error) {
  //     setError(error.message);
  //     console.log(error.message);
  //   } finally {
  //     setOpenDialog(false);
  //   }
  // };



  // const handleCancelDelete = () => {
  //   setOpenDialog(false);
  // };

  const columns = [
    { field: "institution", headerName: "Institution", flex: 1  ,cellClassName: "name-column--cell" },
    { field: "employmentType", headerName: "Employment Type", flex: 1 ,cellClassName: "name-column--cell" },
    { field: "jobTitle", headerName: "Job Title", flex: 1 ,cellClassName: "name-column--cell"},
    { field: "salary", headerName: "Salary", flex: 1 ,cellClassName: "name-column--cell"},
    { field: "startDate", headerName: "Start Date", flex: 1 ,cellClassName: "name-column--cell"},
    { field: "endDate", headerName: "End Date", flex: 1,cellClassName: "name-column--cell" },
    { field: "responsibility", headerName: "Responsibility", flex: 1,cellClassName: "name-column--cell" },
  
    
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
   renderCell: (params) => (
      <Box  sx={{ display: 'flex', justifyContent: 'center' }}>
      
       {canDelete &&(
              <Tooltip title="Delete Skill of Employee">
              <IconButton onClick={() => handleDelete(employerId, params.row.id)}  color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
       )}

       {canEdit && (
        
        <Tooltip title="Update">
        <IconButton
             onClick={() => handleEditExperence(employerId, params.row.id)}  color="primary" >
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
      <Header subtitle="List of employee exprience"/>
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={experence}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection={false}
        />
      </Box>
      {/* <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this Experience of The Employee?"
      /> */}
    </Box>
  );
};

export default ExperenceAction;

