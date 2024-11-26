import React, { useEffect, useState,useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../Header";
import { tokens } from "../../../../../theme";
import { useNavigate } from "react-router-dom";
import { listExamResult } from "../../../../../Services/apiData";
import { useLocation } from "react-router-dom";
import { Box,  useTheme,Tooltip,IconButton  } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


import RecruitmentServiceResourceName from "../../../Auth/Resource/RecruitmentServiceResourceName";
import { canAccessResource } from "../../../Auth/Services/SecurityService";
import AuthContext from "../../../Auth/AuthContext";






const ListExamResult = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const { recruitmentId ,applicantId} = location.state;

  console.log( recruitmentId,applicantId)

  const [assessement, setAssessement] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [assessementToDelete, setAssessementToDelete] = useState(null);
  
  const handleEditExamResult = (id) => {
    navigate('/recruitment/editExamresult', { state: {recruitmentId,applicantId, id } });
  };

  useEffect(() => {
    fetchListOfExamResult();
    checkPermissions();
  }, []);

  const fetchListOfExamResult = async () => {
    try {
      const response = await listExamResult(recruitmentId);
      const data = response.data;
      setAssessement(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

   const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const { authState } = useContext(AuthContext);
  const userRoles = authState.roles;

  const checkPermissions = async () => {
    // Check permissions for actions
    const editAccess = await canAccessResource(RecruitmentServiceResourceName.UPDATE_EXAM_RESULT, userRoles);
    const deleteAccess = await canAccessResource(RecruitmentServiceResourceName.DELETE_EXAM_RESULT, userRoles);
  
    setCanEdit(editAccess);
    setCanDelete(deleteAccess);
  };

  
  const columns = [
    { field: "writtenExam", headerName: "written Exam", flex: 1, cellClassName: "name-column--cell" },
    { field: "interview", headerName: "interview", flex: 1, cellClassName: "name-column--cell" },
    { field: "experience", headerName: "experience", flex: 1, cellClassName: "name-column--cell" },
    { field: "other", headerName: "other", flex: 1, cellClassName: "name-column--cell" },
    { field: "cgpa", headerName: "cgpa", flex: 1, cellClassName: "name-column--cell" },
    { field: "total", headerName: "total", flex: 1, cellClassName: "name-column--cell" },
    
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {canDelete && (
               <Tooltip title="Delete Reference of Employer">  
               <IconButton onClick={() => navigate("/recruitment/deleteApplicantExamResult", { state: { examresultId: params.row.id,applicantId:params.row.applicantId ,recruitmentId :params.row.recruitmentId} })} color="error">
                 <DeleteIcon />
               </IconButton>
             </Tooltip>
          )}
          {canEdit && (
                <Tooltip title="Update">
                <IconButton
                     onClick={() => handleEditExamResult(params.row.id)}
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
      <Header subtitle="List of Exam Results" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={assessement}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection={false}
        />
      </Box>
      {/* <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        
      /> */}
    </Box>
  );
};

export default ListExamResult;
