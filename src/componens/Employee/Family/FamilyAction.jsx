import React, { useEffect, useState,useContext } from "react";
import { Box,Tooltip ,useTheme,IconButton  } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../Header";
import { tokens } from "../../../../theme";
import { listOfFamilyOfEmployee } from "../../../../Services/apiData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { canAccessResource } from "../../Auth/Services/SecurityService";
import EmployeeServiceResourceName from "../../Auth/Resource/EmployeeServiceResourceName";
import AuthContext from "../../Auth/AuthContext";

const FamilyAction = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  
  const employerId = location.state?.employerId;
  console.log(`the  employee id ${employerId}`);


  const [family, setFamily] = useState([]);
  const [error, setError] = useState(null);
  // const [openDialog, setOpenDialog] = useState(false);
  // const [familyToDelete, setFamilyToDelete] = useState(null);
  
  const handleEditFamily = (employerId, id) => {
    navigate('/employee/EditFamily', { state: { employerId, id } });
  };

  const handleDelete = (employerId, id) => {
    navigate('/employee/deleteFamily', { state: { employerId, id } });
  };
  
  
  useEffect(() => {
    fetchFamily();
    checkPermissions();
  }, []);

  
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const { authState } = useContext(AuthContext);
  const userRoles = authState.roles;

  const checkPermissions = async () => {
    // Check permissions for actions
    const editAccess = await canAccessResource(EmployeeServiceResourceName.UPDATE_FAMILY, userRoles);
    const deleteAccess = await canAccessResource(EmployeeServiceResourceName.DELETE_FAMILY, userRoles);
  
    setCanEdit(editAccess);
    setCanDelete(deleteAccess);
  };

  const fetchFamily= async () => {
    try {
      const response = await listOfFamilyOfEmployee(employerId);
      const data = response.data;
      setFamily(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  // const handleDelete = async (employerId, family) => {
  //   setFamilyToDelete(family);
  //   setOpenDialog(true);
  // };

  // const handleConfirmDelete = async () => {
  //   try {
  //     await deleteFamilyOfEmployee(employerId, familyToDelete.id);
  //     const updatedFamily = family.filter((emp) => emp.id !== familyToDelete.id);
  //     setFamily(updatedFamily);
  //     console.log("Family deleted:", familyToDelete);
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
    { field: "relationshipType", headerName: "Relationship Type", flex: 1, cellClassName: "name-column--cell" },
    { field: "firstName", headerName: "FirstName", flex: 1, cellClassName: "name-column--cell" },
    { field: "middleName", headerName: "MiddleName", flex: 1, cellClassName: "name-column--cell" },
    { field: "lastName", headerName: "LastName", flex: 1, cellClassName: "name-column--cell" },
  
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
     renderCell: (params) => (
        <Box  sx={{ display: 'flex', justifyContent: 'center' }}>

          {canDelete &&(
               <Tooltip title="Delete Skill of Employee">
               <IconButton  onClick={() => handleDelete(employerId, params.row.id)}  color="error">
                 <DeleteIcon />
               </IconButton>
             </Tooltip>

          )}

          {canEdit &&(
                <Tooltip title="Update">
                <IconButton
                   onClick={() => handleEditFamily(employerId, params.row.id)}
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
        <Header  subtitle="List of Employer Family" />
        <Box m="40px 0 0 0" height="75vh">
          <DataGrid
            rows={family}
            columns={columns}
            getRowId={(row) => row.id}
            checkboxSelection={false}
          />
        </Box>
        {/* <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this Family of The Employer?"
      /> */}

      </Box>
    );
  };
export default FamilyAction;
