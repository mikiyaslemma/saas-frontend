
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../../Header";
import { tokens } from "../../../../../../theme";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { listApplicantEducations, listFieldStudies, listEducationLevels } from "../../../../../../Services/apiData";
import { Box,  useTheme,Tooltip,IconButton  } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";



const ListApplicantEducation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const applicantId = location.state.applicantId;
  console.log(applicantId);

  const [education, setEducation] = useState([]);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);;
 /// const [experenceToDelete, setExperenceToDelete] = useState(null);
  //const [educationToDelete, setEducationToDelete] = useState(null);
  const [educationLevels, setEducationLevels] = useState([]);
  const [fieldOfStudies, setFieldOfStudies] = useState([]);
  


  
  useEffect(() => {
    fetchApplicant();
  }, []);

  const fetchApplicant = async () => {
    try {
      const [applicantEducationResponse,
         fieldofStudyResponse,
         educationLevelResponse] = await Promise.all([
        listApplicantEducations(applicantId),
      listFieldStudies(),
      listEducationLevels(),
      ]);

      const applicantEducationData = applicantEducationResponse.data;
      const fieldofStudyData = fieldofStudyResponse.data;
      const educationLevelData = educationLevelResponse.data;

      const mappedData = applicantEducationData.map(lang => ({
        ...lang,
        fieldOfStudy: getFieldOfStudies(lang.fieldOfStudyId, fieldofStudyData),
        educationLevelName: getEducationLevel(lang.educationLevelId, educationLevelData)
      }));

      setEducation(mappedData);
      setEducationLevels(educationLevelData);
      setFieldOfStudies(fieldofStudyData);

      console.log(mappedData);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const getEducationLevel = (educationLevelId, educationLevels) => {
    const education = educationLevels.find((lang) => lang.id === educationLevelId);
    return education ? education.educationLevelName : "Unknown";
  };
  const getFieldOfStudies = (fieldOfStudyId, fieldOfStudies) => {
    const field = fieldOfStudies.find((lang) => lang.id === fieldOfStudyId);
    return field ? field.fieldOfStudy : "Unknown";
  };

  const handleEditEducation = (applicantId, id) => {
    navigate('/recruitment/editapplicantEducation', { state: { applicantId, id } });
  };

  
  
  // const handleDelete = async (id, education) => {
  //   setEducationToDelete(education)
  //   setOpenDialog(true);
  // };

  // const handleConfirmDelete = async () => {
  //   try {
  //     await deleteApplicantEducations(applicantId, educationToDelete.id);
  //     const updatedEducation = education.filter((emp) => emp.id !== educationToDelete.id);
  //     setEducation(updatedEducation);
  //     console.log("education deleted:", educationToDelete);
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
    { field: "educationLevelName", headerName: "Education Level", flex: 1  ,cellClassName: "name-column--cell" },
    { field: "fieldOfStudy", headerName: "Field of Study", flex: 1  ,cellClassName: "name-column--cell" },
    { field: "educationType", headerName: "Education Type", flex: 1 ,cellClassName: "name-column--cell" },
    { field: "institution", headerName: "institution", flex: 1 ,cellClassName: "name-column--cell"},
    { field: "startDate", headerName: "Start Date", flex: 1 ,cellClassName: "name-column--cell"},
    { field: "endDate", headerName: "End Date", flex: 1,cellClassName: "name-column--cell" },
    { field: "result", headerName: "result", flex: 1,cellClassName: "name-column--cell" },
   { field: "fileName", headerName: "Document", flex: 1 ,cellClassName: "name-column--cell"},
    
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
   renderCell: (params) => (
      <Box  sx={{ display: 'flex', justifyContent: 'center' }}>

        <Tooltip title="Delete Applicant Education ">  
         <IconButton onClick={() => navigate("/recruitment/deleteapplicantEducation", { state: { educationId:   params.row.id,applicantId:params.row.applicantId,
                recruitmentId:params.row.recruitmentId } })} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>

     

          <Tooltip title="Update">
            <IconButton
                  onClick={() => handleEditEducation(applicantId, params.row.id)}
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
      <Header title="list of applicant Education" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={education}
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

export default ListApplicantEducation;

