import React, { useEffect, useState,useContext } from "react";
import { Box, useTheme, Tooltip, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../Header";
import { tokens } from "../../../../theme";
import { listLanguage, deleteLanguage, listLanguageNames } from "../../../../Services/apiData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { canAccessResource } from "../../Auth/Services/SecurityService";
import EmployeeServiceResourceName from "../../Auth/Resource/EmployeeServiceResourceName";
import AuthContext from "../../Auth/AuthContext";

const LanguageAction = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const employerId = location.state?.employerId;
  
  console.log(`the  employee id ${employerId}`);

  const [language, setLanguage] = useState([]);
  const [languageNames, setLanguageNames] = useState([]);
  
  const [error, setError] = useState(null);
  // const [openDialog, setOpenDialog] = useState(false);
  // const [languageToDelete, setLanguageToDelete] = useState(null);

  useEffect(() => {
    fetchData();
    checkPermissions();
  }, []);

  const fetchData = async () => {
    try {
      const [languageResponse, languageNamesResponse] = await Promise.all([
        listLanguage(employerId),
        listLanguageNames()
       // axios.get(REST_API_BASE_URL + `language-names/1/get-all`)
      ]);

      const languageData = languageResponse.data;
      const languageNamesData = languageNamesResponse.data;

      const mappedData = languageData.map(lang => ({
        ...lang,
        languageName: getLanguageName(lang.languageNameId, languageNamesData)
      }));

      setLanguage(mappedData);
      setLanguageNames(languageNamesData);
      console.log(mappedData);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const getLanguageName = (languageNameId, languageNames) => {
    const language = languageNames.find((lang) => lang.id === languageNameId);
    return language ? language.languageName : "Unknown";
  };

  const handleEditLanguage = (employerId, id) => {
    navigate('/employee/EditLanguage', { state: { employerId, id } });
  };

  
  const handleDelete = (employerId, id) => {
    navigate('/employee/deleteLanguage', { state: { employerId, id } });
  };

   
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const { authState } = useContext(AuthContext);
  const userRoles = authState.roles;

  const checkPermissions = async () => {
    // Check permissions for actions
    const editAccess = await canAccessResource(EmployeeServiceResourceName.UPDATE_LANGUAGE, userRoles);
    const deleteAccess = await canAccessResource(EmployeeServiceResourceName.DELETE_LANGUAGE, userRoles);
  
    setCanEdit(editAccess);
    setCanDelete(deleteAccess);
  };

  const columns = [
    { field: "languageName", headerName: "Language Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "reading", headerName: "Reading Level", flex: 1, cellClassName: "name-column--cell" },
    { field: "listening", headerName: "Listening Level", flex: 1, cellClassName: "name-column--cell" },
    { field: "speaking", headerName: "Speaking Level", flex: 1, cellClassName: "name-column--cell" },
    { field: "writing", headerName: "Writing Level", flex: 1, cellClassName: "name-column--cell" },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {canEdit &&(
                <Tooltip title="Update">
                <IconButton onClick={() => handleEditLanguage(employerId, params.row.id)} color="primary">
                  <EditIcon />
                </IconButton>
              </Tooltip>
          )}
          
          {canDelete &&(
               <Tooltip title="Delete Skill of Employee">
               <IconButton onClick={() => handleDelete(employerId, params.row.id)} color="error">
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
      <Header subtitle="List of Employer Language" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={language}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection={false}
        />
      </Box>
      {/* <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this Language of The Employee?"
      /> */}
    </Box>
  );
};

export default LanguageAction;
