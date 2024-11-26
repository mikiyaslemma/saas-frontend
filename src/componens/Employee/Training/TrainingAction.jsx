import React, { useEffect, useState ,useContext} from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../Header";
import { tokens } from "../../../../theme";
import { listTrainings } from "../../../../Services/apiData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Tooltip, IconButton } from "@mui/material";

import { canAccessResource } from "../../Auth/Services/SecurityService";
import EmployeeServiceResourceName from "../../Auth/Resource/EmployeeServiceResourceName";
import AuthContext from "../../Auth/AuthContext";

const TrainingAction = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const employerId = location.state?.employerId;
console.log(`the employeeId id ${employerId}`);

  const [training, setTraining] = useState([]);
  const [error, setError] = useState(null);
  // const [openDialog, setOpenDialog] = useState(false);;
  // const [trainingToDelete, setTrainingToDelete] = useState(null);
  
  const handleEditTraning = (employerId, id) => {
    navigate('/employee/EditTranining', { state: { employerId, id } });
  };

  const handleDelete = (employerId, id) => {
    navigate('/employee/deleteTraining', { state: { employerId, id } });
  };

  useEffect(() => {
    fetchTraining();
    checkPermissions();
  }, []);

  const fetchTraining = async () => {
    try {
      const response = await listTrainings(employerId);
      const data = response.data;
      setTraining(data);
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
    const editAccess = await canAccessResource(EmployeeServiceResourceName.UPDATE_TRAINING, userRoles);
    const deleteAccess = await canAccessResource(EmployeeServiceResourceName.DELETE_TRAINING, userRoles);
  
    setCanEdit(editAccess);
    setCanDelete(deleteAccess);
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
       
         {canDelete && (
              <Tooltip title="Delete Skill of Employee">
              <IconButton onClick={() => handleDelete(employerId, params.row.id)}  color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          
         )}

         {canEdit && (
           <Tooltip title="Update">
           <IconButton
                 onClick={() => handleEditTraning(employerId, params.row.id)}
             color="primary"
           >
             <EditIcon />
           </IconButton>
         </Tooltip>

         )
          
         }
      
         
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header subtitle="List of employer training" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={training}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection={false}
        />
      </Box>
      {/* <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this Training of The Employee?"
      /> */}
    </Box>
  );
};

export default TrainingAction;
