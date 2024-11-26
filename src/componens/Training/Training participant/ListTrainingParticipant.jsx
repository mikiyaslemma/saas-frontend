import React, { useEffect, useState } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../DeleteDialog";
import {
  listOfTrainingParticipant,
  REST_API_BASE_URL,
  deleteParticipants,
  listEmployees,
} from "../../../../Services/apiData";
import LayoutForCourse from "../LayoutForCourse";
import { tokens } from "../../../../theme";
import Header from "../../Header";
import { useLocation } from "react-router-dom";
import ToolbarComponent from "../ToolbarComponent";

const ListTrainingParticipant = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const { trainingId } = location.state;

  const [employeeId, setEmplyeeId] = useState([]);
  const [participantTrainer, setParticipantTrainer] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [participantToDelete, setParticipantToDelete] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [participantResponse, participantIdResponse] = await Promise.all([
        listOfTrainingParticipant(trainingId),
        listEmployees()
      ]);

      const participantData = participantResponse.data;
      const participantIdData = participantIdResponse.data;

      const mappedData = participantData.map(participant => ({
        ...participant,
        employeeId: getEmployeeId(participant.participantEmployeeId, participantIdData)
      }));

      setParticipantTrainer(mappedData);
      setEmplyeeId(participantIdData);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const getEmployeeId = (participantEmployeeId, participantIdData) => {
    const participant = participantIdData.find((emp) => emp.id === participantEmployeeId);
    return participant ? participant.employeeId : "Unknown";
  };

  const handleDelete = (trainingId, participant) => {
    setParticipantToDelete(participant);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteParticipants(trainingId, participantToDelete.id);
      const updatedParticipants = participantTrainer.filter(
        (participant) => participant.id !== participantToDelete.id
      );
      setParticipantTrainer(updatedParticipants);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const editTrainingParticipants = (trainingId,id) => {
    navigate("/training/updateTrainingParticipants", { state: {trainingId, id } });
  };

  const handleIconClick = () => {
    navigate('/training/trainingparticipant',{ state: { trainingId } });
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const columns = [
    { field: "employeeId", headerName: "Employee ID", flex: 1 },
    { field: "reason", headerName: "Reason", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Delete Participant">
            <IconButton
              onClick={() => handleDelete(trainingId, params.row)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Update">
            <IconButton
              onClick={() => editTrainingParticipants(trainingId,params.row.id)}
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
    <LayoutForCourse>
         <ToolbarComponent mainIconType="add" onMainIconClick={handleIconClick} refreshPage={refreshPage} />
     
      <Header subtitle="List Of Training Participants" />
      <DataGrid
        rows={participantTrainer}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection={false}
      />
      <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this participant?"
      />
      
    </LayoutForCourse>
  );
};

export default ListTrainingParticipant;
