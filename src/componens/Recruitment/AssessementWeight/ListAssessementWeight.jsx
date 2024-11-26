import React, { useEffect, useState,useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../Header";
import { tokens } from "../../../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {  listAssessment } from "../../../../Services/apiData";
import { Box, useTheme,Tooltip ,IconButton  } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";


import AuthContext from "../../Auth/AuthContext";
import { canAccessResource } from "../../Auth/Services/SecurityService";
import RecruitmentServiceResourceName from "../../Auth/Resource/RecruitmentServiceResourceName";


const ListAssessementWeight = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
 
  const [assessement, setAssessement] = useState([]);
  const [error, setError] = useState(null);

  
  const handleEditAssessement = (id) => {
    navigate('/recruitment/editassessement', { state: { id } });
  };
  


  useEffect(() => {
    fetchAdvertisment();
    checkPermissions();
  }, []);

 
  const fetchAdvertisment = async () => {
    try {
 
      const response = await listAssessment();
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = response.data;
      setAssessement(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const { authState } = useContext(AuthContext);
  const userRoles = authState.roles;

  const checkPermissions = async () => {
    // Check permissions for actions
    const editAccess = await canAccessResource(RecruitmentServiceResourceName.UPDATE_ASSESSMENT_WEIGHT, userRoles);
    const deleteAccess = await canAccessResource(RecruitmentServiceResourceName.DELETE_ASSESSMENT_WEIGHT, userRoles);
  
    setCanEdit(editAccess);
    setCanDelete(deleteAccess);
  };



  const columns = [
    { field: "writtenExam", headerName: "writtenExam", flex: 1, cellClassName: "name-column--cell" },
    { field: "interview", headerName: "interview", flex: 1, cellClassName: "name-column--cell" },
    { field: "experience", headerName: "experience", flex: 1, cellClassName: "name-column--cell" },
    { field: "other", headerName: "other", flex: 1, cellClassName: "name-column--cell" },
    { field: "cgpa", headerName: "cgpa", flex: 1, cellClassName: "name-column--cell" },
    { field: "practicalExam", headerName: "practicalExam", flex: 1, cellClassName: "name-column--cell" },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
     renderCell: (params) => (
        <Box  sx={{ display: 'flex', justifyContent: 'center' }}>

          {canDelete && (
                 <Tooltip title="Delete Skill of Employee">
                 <IconButton onClick={() => navigate("/recruitment/deleteAssesigmentWeight", { state: { weightId: params.row.id,recruitmentId:params.row.recruitmentId } })} color="error">
                   <DeleteIcon />
                 </IconButton>
               </Tooltip>
          )}

          {canEdit && (
               <Tooltip title="Update">
               <IconButton
                   onClick={() => handleEditAssessement( params.row.id)}
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
      <Header  subtitle="List of Assessiement Weight" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={assessement}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection={false}
        />
      </Box>

    </Box>
  );
};


export default ListAssessementWeight;
