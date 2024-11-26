import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../../Header";
import { tokens } from "../../../../../../theme";
import { listApplicantLanguages, deleteApplicantLanguages, listLanguageNames} from "../../../../../../Services/apiData";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Box,  useTheme,Tooltip,IconButton  } from "@mui/material";
import DeleteDialog from "../../../../DeleteDialog";
import { useLocation } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";


const ListApplicantLanguage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const applicantId = location.state.applicantId;
  console.log(applicantId);

  const [error, setError] = useState(null);
 // const [openDialog, setOpenDialog] = useState(false);
  //const [languageToDelete, setLanguageToDelete] = useState(null);
  const [language, setLanguage] = useState([]);
  const [languageNames, setLanguageNames] = useState([]);
  
  const handleEditLanguage = (applicantId,id) => {
    navigate('/recruitment/editapplicantLangage', { state: { applicantId, id } });
  };
  


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [languageResponse, languageNamesResponse] = await Promise.all([
        listApplicantLanguages(applicantId),
       listLanguageNames(),
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


  // const handleDelete = async (id, language) => {
  //   setLanguageToDelete(language);
  //   setOpenDialog(true);
  // };

  // const handleConfirmDelete = async () => {
  //   try {
  //     await deleteApplicantLanguages(applicantId, languageToDelete.id);
  //     const updatedLanguages = language.filter((emp) => emp.id !== languageToDelete.id);
  //     setLanguage(updatedLanguages);
  //     console.log("Language deleted:", languageToDelete);
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
    { field: "languageName", headerName: "language Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "reading", headerName: "Reading Level", flex: 1, cellClassName: "name-column--cell" },
    { field: "listening", headerName: "Listening Level", flex: 1, cellClassName: "name-column--cell" },
    { field: "speaking", headerName: "speaking Level", flex: 1, cellClassName: "name-column--cell" },
    { field: "writing", headerName: "writing Level", flex: 1, cellClassName: "name-column--cell" },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
     renderCell: (params) => (
        <Box  sx={{ display: 'flex', justifyContent: 'center' }}>


          <Tooltip title="Delete Applicant Language ">  
         <IconButton onClick={() => navigate("/recruitment/deleteapplicantLanguage", { state: { languageId:   params.row.id,applicantId:params.row.applicantId,
                recruitmentId:params.row.recruitmentId } })} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>


          <Tooltip title="Update">
            <IconButton
                 onClick={() => handleEditLanguage(applicantId, params.row.id)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          </Box>
        ),
      },
    ];
  
    return (
      <Box m="20px">
        <Header subtitle="List of applicant language"  />
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
        message="Are you sure you want to delete this Skill of The Employee?"
      /> */}
      </Box>
    );
  };
export default ListApplicantLanguage;
