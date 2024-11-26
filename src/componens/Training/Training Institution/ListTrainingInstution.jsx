import React, { useEffect, useState } from "react";
import {
  Box, TextField, useTheme, Tooltip, IconButton, Select, MenuItem, FormControl, InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../DeleteDialog";
import ToolbarComponent from "../ToolbarComponent";
import LayoutForCourse from "../LayoutForCourse";
import axios from "axios";
import { listTrainingInstution, deleteTrainingCourses, listLocation, REST_API_BASE_URL, deleteTrainingInstution } from "../../../../Services/apiData";

const ListTrainingInstution = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [trainingInstution, setTrainingInstution] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [trainingInstutionResponse, locationsResponse] = await Promise.all([
        listTrainingInstution(),
       listLocation(),
      ]);

      const trainingInstutionData = trainingInstutionResponse.data;
      const locationsData = locationsResponse.data;

      const mappedData = trainingInstutionData.map((institution) => ({
        ...institution,
        locationName: getLocationName(institution.locationId, locationsData),
      }));

      setTrainingInstution(mappedData);
      setLocations(locationsData);
      console.log(mappedData);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const getLocationName = (locationId, locationsData) => {
    const location = locationsData.find((location) => location.id === locationId);
    return location ? location.locationName : "Unknown";
  };

  

  const handleDelete = (courseTraining) => {
    setSkillToDelete(courseTraining);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTrainingInstution(skillToDelete.id);
      const updatedTrainingInstutions = trainingInstution.filter((course) => course.id !== skillToDelete.id);
      setTrainingInstution(updatedTrainingInstutions);
      console.log("Training deleted:", skillToDelete);
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

  const handleCategoryChange = (event) => {
    setSelectedLocationId(event.target.value);
  };

  const handleIconClick = () => {
    navigate('/training/trainingInstution');
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleCourseTraining = (id) => {
    navigate('/training/updateTrainingInstution', { state: { id } });
  };

  const columns = [
    { field: "institutionName", headerName: "Institution Name", flex: 1 },
    { field: "locationName", headerName: "Location Name", flex: 1 },
    { field: "costPerPerson", headerName: "Cost Per Person", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip title="Delete Course">
            <IconButton onClick={() => handleDelete(params.row)} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Update">
            <IconButton onClick={() => handleCourseTraining(params.row.id)} color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <LayoutForCourse subtitle="List Of Courses">
      <ToolbarComponent mainIconType="add" onMainIconClick={handleIconClick} refreshPage={refreshPage} />
     
      <DataGrid
        rows={trainingInstution}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection={false}
      />
      <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this course?"
      />
    </LayoutForCourse>
  );
};

export default ListTrainingInstution;





