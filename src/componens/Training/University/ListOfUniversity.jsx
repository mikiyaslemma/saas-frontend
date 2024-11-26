import React, { useEffect, useState } from "react";
import { Box,Tooltip ,useTheme,IconButton  } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import {   deleteUniversity, listLocation, listOfUniversity } from "../../../../Services/apiData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import DeleteDialog from "../../DeleteDialog";
import ToolbarComponent from "../ToolbarComponent";
import AuthContext from "../../Auth/AuthContext";
import TrainingServiceResourceName from "../../Auth/Resource/TrainingServiceResourceName";
import { canAccessResource } from "../../Auth/Services/SecurityService";

const ListOfUniversity = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  
const [university, setUniversity] = useState([]);
  const [locationNames, setLocationNames] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [universityToDelete, setUniversityToDelete] = useState(null);

  
  const handleEditUniversity = (id) => {
    navigate('/training/updateUniversity', { state: {  id } });
  };
  
  


  useEffect(() => {
    fetchData();
    checkPermissions();

  }, []);

  const fetchData = async () => {
    try {
      const [luniversityResponse, locationNamesResponse] = await Promise.all([
        listOfUniversity(),
       listLocation(),
      ]);

      const luniversityData = luniversityResponse.data;
      const locationNamesData = locationNamesResponse.data;

      const mappedData = luniversityData.map(lang => ({
        ...lang,
        locationName: getLocationName(lang.locationId, locationNamesData)
      }));

      setUniversity(mappedData);
      setLocationNames(locationNamesData);
      console.log(mappedData);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const getLocationName = (locationId, locationNames) => {
    const location = locationNames.find((lang) => lang.id === locationId);
    return location ? location.locationName : "Unknown";
  };


  const handleDelete = async (university) => {
    setUniversityToDelete(university);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUniversity(universityToDelete.id);
      const updateUniversity = university.filter((emp) => emp.id !== universityToDelete.id);
      setUniversity(updateUniversity);
      console.log("University is  deleted:", universityToDelete);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };
  const handleIconClick = () => {
    navigate('/training/university');
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const { authState } = useContext(AuthContext);
  const userRoles = authState.roles;

  const checkPermissions = async () => {
    // Check permissions for actions
    const editAccess = await canAccessResource(TrainingServiceResourceName.UPDATE_UNIVERSITY &&
      TrainingServiceResourceName.GET_UNIVERSITY_BY_ID,
      userRoles);

    const deleteAccess = await canAccessResource(TrainingServiceResourceName.DELETE_UNIVERSITY 
      , userRoles);
  
    setCanEdit(editAccess);
    setCanDelete(deleteAccess);
  };



  const columns = [
    { field: "universityName", headerName: "UniversityName", flex: 1, cellClassName: "name-column--cell" },
    { field: "mobilePhoneNumber", headerName: "mobilePhoneNumber", flex: 1, cellClassName: "name-column--cell" },
    { field: "email", headerName: "email", flex: 1, cellClassName: "name-column--cell" },
    { field: "website", headerName: "website", flex: 1, cellClassName: "name-column--cell" },
    { field: "locationName", headerName: "location Name", flex: 1, cellClassName: "name-column--cell" },

  
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
     renderCell: (params) => (
        <Box  sx={{ display: 'flex', justifyContent: 'center' }}>

        {canDelete && (
              <Tooltip title="Delete University ">
              <IconButton onClick={() => navigate("/training/deleteUniversity", { state: { universityId: params.row.id } })} color="error">
                 <DeleteIcon />
             </IconButton>
         </Tooltip>
        )}
        {canEdit && (
              <Tooltip title="Update">
              <IconButton
                 onClick={() => handleEditUniversity( params.row.id)}
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
    <ToolbarComponent mainIconType="add" onMainIconClick={handleIconClick} refreshPage={refreshPage} />
        <Box m="40px 0 0 0" height="75vh">
          <DataGrid
            rows={university}
            columns={columns}
            getRowId={(row) => row.id}
            checkboxSelection={false}
          />
        </Box>
        <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this Family of The Employer?"
      />

      </Box>
    );
  };
export default ListOfUniversity;
