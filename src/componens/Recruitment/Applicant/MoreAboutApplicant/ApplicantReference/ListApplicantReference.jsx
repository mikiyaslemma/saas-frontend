import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../../Header";
import { tokens } from "../../../../../../theme";
import {  listApplicantReferences, deleteApplicantReferences } from "../../../../../../Services/apiData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Box,  useTheme,Tooltip,IconButton  } from "@mui/material";
import DeleteDialog from "../../../../DeleteDialog";


const ListApplicantReference = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const applicantId = location.state.applicantId;
  console.log(applicantId);

  const [reference, setReference] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);;
  const [referenceToDelete, setReferenceToDelete] = useState(null);
  
  const handleEditReference = (applicantId, id) => {
    navigate('/recruitment/editapplicantReference', { state: { applicantId, id } });
  };
  

  useEffect(() => {
    fetchReference();
  }, []);

  const fetchReference = async () => {
    try {
      const response = await listApplicantReferences(applicantId);
      const data = response.data;
      setReference(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const handleDelete = async (id, reference) => {
    setReferenceToDelete(reference);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteApplicantReferences(applicantId, referenceToDelete.id);
      const updatedReference = reference.filter((emp) => emp.id !== referenceToDelete.id);
      setReference(updatedReference);
      console.log("Reference of Applicant deleted:", updatedReference);
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
          <Tooltip title="Delete Reference of Employer">  
            <IconButton onClick={() => handleDelete(applicantId, params.row)}   color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Update">
            <IconButton
                  onClick={() => handleEditReference(applicantId, params.row.id)}
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
      <Header subtitle="List of applicant references" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={reference}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection={false}
        />
        <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
        
      </Box>
    </Box>
  );
};

export default ListApplicantReference;
