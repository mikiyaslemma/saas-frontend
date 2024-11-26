import React, { useEffect, useState,useContext } from "react";
import { Box, Typography, useTheme,Tooltip ,IconButton  } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../Header";
import { tokens } from "../../../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { listAdvertisement } from "../../../../Services/apiData";

import { canAccessResource } from "../../Auth/Services/SecurityService";
import RecruitmentServiceResourceName from "../../Auth/Resource/RecruitmentServiceResourceName";
import AuthContext from "../../Auth/AuthContext";



const ListAdvertisment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

  const { authState } = useContext(AuthContext);
  const userRoles = authState.roles;


  const [advertisement, setAdvertisement] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  
  const [recruimentToDelete, setRecruimentToDelete] = useState(null);
  
  const handleEditAdvertisement = (id) => {
    navigate('/recruitment/editadverisement', { state: { id } });
  };


  useEffect(() => {
    fetchAdvertisment();
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    // Check permissions for actions
    const editAccess = await canAccessResource(RecruitmentServiceResourceName.UPDATE_ADVERTISEMENT, userRoles);
    const deleteAccess = await canAccessResource(RecruitmentServiceResourceName.REMOVE_ADVERTISEMENT_MEDIA_TYPE, userRoles);
  
    setCanEdit(editAccess);
    setCanDelete(deleteAccess);
  };

  const fetchAdvertisment = async () => {
    try {
      const response = await listAdvertisement(); // Corrected API call
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = response.data;
      const transformedData = data.map(ad => ({
        ...ad,
        mediaTypes: ad.mediaTypes.map(mt => mt.mediaTypeName).join(", ")
      }));

      setAdvertisement(transformedData);
      console.log(transformedData);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

 

  const columns = [
    { field: "startDate", headerName: "startDate", flex: 1, cellClassName: "name-column--cell" },
    { field: "endDate", headerName: "endDate", flex: 1, cellClassName: "name-column--cell" },
    { field: "announcementType", headerName: "announcementType", flex: 1, cellClassName: "name-column--cell" },
    { field: "mediaTypes", headerName: "mediaTypes", flex: 1, cellClassName: "name-column--cell" },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
     renderCell: (params) => (
        <Box  sx={{ display: 'flex', justifyContent: 'center' }}>

         {canEdit && (
           <Tooltip title="Update">
           <IconButton
              onClick={() => handleEditAdvertisement( params.row.id)}
             color="primary"
           >
             <EditIcon />
           </IconButton>
         </Tooltip>
          
          )}

        {canDelete && (
              <Tooltip title="Delete Advertisement">  
              <IconButton onClick={() => navigate("/recruitment/deleteAdvertisement", { state: { advertisementId: params.row.id,recruitmentId:params.row.recruitmentId } })} color="error">
              <DeleteIcon />
                 </IconButton>
               </Tooltip>
          
          )}
          

          </Box>
        ),
      },
    ];
  return (
    <Box m="20px">
      <Header  subtitle="List of Advertisement" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={advertisement}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection={false}
        />
      </Box>
 
    </Box>
  );
};


export default ListAdvertisment;


 // const handleDelete = async ( advertisement) => {
  //   setAdvertismentToDelete(advertisement);
  //   setOpenDialog(true);
  // };

  // const handleConfirmDelete = async () => {
  //   try {
  //     await deleteAdvertisement( advertismentToDelete.id);
  //     const updatedAdvertisment = advertisement.filter((emp) => emp.id !== advertismentToDelete.id);
  //     setAdvertisement(updatedAdvertisment);
  //     console.log("Advetisement deleted:", advertismentToDelete);
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


