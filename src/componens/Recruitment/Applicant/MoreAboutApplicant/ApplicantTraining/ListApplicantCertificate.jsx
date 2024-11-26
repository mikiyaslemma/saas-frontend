import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../../Header";
import { tokens } from "../../../../../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { listApplicantCertificate, deleteApplicantCertificate } from "../../../../../../Services/apiData";
import DeleteDialog from "../../../../DeleteDialog";
import { Box,  useTheme,Tooltip,IconButton  } from "@mui/material";

const ListApplicantCertificate = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const applicantId = location.state.applicantId;
  console.log(applicantId);

  const [certificate, setCertificate] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);;
  const [certificateToDelete, setCertificateToDelete] = useState(null);
  
  const handleEditTraning = (applicantId, id) => {
    navigate('/recruitment/editapplicantCertificate', { state: { applicantId, id } });
  };

  useEffect(() => {
    fetchApplicantcertificate();
  }, []);

  const fetchApplicantcertificate = async () => {
    try {
      const response = await listApplicantCertificate(applicantId);
      const data = response.data;
      setCertificate(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const handleDelete = async (applicantId, certificate) => {
    setCertificateToDelete(certificate);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteApplicantCertificate(applicantId, certificateToDelete.trainingId);
      const updatedApplicantcertifacte = certificate.filter((emp) => emp.id !== certificateToDelete.id);
      setCertificate(updatedApplicantcertifacte);
      console.log("Training deleted:", certificateToDelete);
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
    { field: "trainingTitle", headerName: "Training Title", flex: 1, cellClassName: "name-column--cell" },
  { field: "institution", headerName: "Institution", flex: 1, cellClassName: "name-column--cell" },
  { field: "sponsoredBy", headerName: "Sponsored By", flex: 1, cellClassName: "name-column--cell" },
  { field: "startDate", headerName: "Start Date", flex: 1, cellClassName: "name-column--cell" },
  { field: "endDate", headerName: "End Date", flex: 1, cellClassName: "name-column--cell" },
 
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
   renderCell: (params) => (
      <Box  sx={{ display: 'flex', justifyContent: 'center' }}>
         <Tooltip title="Delete certificat of employer">  
            <IconButton onClick={() => handleDelete(applicantId, params.row)}    color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Update">
            <IconButton
                  onClick={() => handleEditTraning(applicantId, params.row.id)}
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
      <Header subtitle="Certificates of applicants" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={certificate}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection={false}
        />
      </Box>
      <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default ListApplicantCertificate;
