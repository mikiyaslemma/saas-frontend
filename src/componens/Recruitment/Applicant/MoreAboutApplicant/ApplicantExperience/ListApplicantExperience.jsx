
import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../../Header";
import { tokens } from "../../../../../../theme";
import { deleteApplicantExperences, listApplicantExperences } from "../../../../../../Services/apiData";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import DeleteDialog from "../../../../DeleteDialog";
import { Box,  useTheme,Tooltip,IconButton  } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";


const ListApplicantExperience = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const applicantId = location.state.applicantId;
  console.log(applicantId);

  const [experence, setExperence] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);;
  
   const [experenceToDelete, setExperenceToDelete] = useState(null);
  
  const handleEditExperence = (applicantId, id) => {
    navigate('/recruitment/editapplicantExperence', { state: { applicantId, id } });
  };

  useEffect(() => {
    fetchExperence();
  }, []);

  const fetchExperence = async () => {
    try {
      const response = await listApplicantExperences(applicantId);
      const data = response.data;
      setExperence(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const handleDelete = async (applicantId, experence) => {
    setExperenceToDelete(experence);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteApplicantExperences(applicantId, experenceToDelete.id);
      const updatedExperence = experence.filter((emp) => emp.id !== experenceToDelete.id);
      setExperence(updatedExperence);
      console.log("Experence of Applicanted is deleted:", experenceToDelete);
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


  const columns = [
    { field: "institution", headerName: "Institution", flex: 1  ,cellClassName: "name-column--cell" },
    { field: "experienceType", headerName: "Employment Type", flex: 1 ,cellClassName: "name-column--cell" },
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
     
        <Tooltip title="Delete Applicant Experience ">  
         <IconButton onClick={() => navigate("/recruitment/deleteapplicantExperience", { state: { expirenceId:   params.row.id,applicantId:params.row.applicantId,
                recruitmentId:params.row.recruitmentId } })} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          
          <Tooltip title="Update">
            <IconButton
                    onClick={() => handleEditExperence(applicantId, params.row.id)}
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
      <Header subtitle="list of applicant Experience"  />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={experence}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection={false}
        />
      </Box>
      <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      //  message="Are you sure you want to delete this Skill of The Employee?"
      />
    </Box>
  );
};

export default ListApplicantExperience;

