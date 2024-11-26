import React, { useEffect, useState } from "react";
import { Box, Select, MenuItem, FormControl, InputLabel, Tooltip, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../DeleteDialog";
import {  listPreServiceTraineeResult, deletePreServiceTraineeResult } from "../../../../Services/apiData";
import LayoutForCourse from "../LayoutForCourse";
import { tokens } from "../../../../theme";
import { useLocation } from "react-router-dom";
import Header from "../../Header";

const ListPreCourseTraineeResult = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [result, setResult] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [resultToDelete, setResultToDelete] = useState(null);

  const location = useLocation();

  const { courseId  } = location.state;
  console.log(courseId)

  useEffect(() => {
    fetchTraineeCourserResult();
  }, []);

 

  const fetchTraineeCourserResult = async () => {
    try {
      const response = await listPreServiceTraineeResult(courseId);
      const data = response.data;
      setResult(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };
  const handleDelete = async ( result) => {
    setResultToDelete(result);
    setOpenDialog(true);
  };

 
  const handleConfirmDelete = async () => {
    try {
      await deletePreServiceTraineeResult(resultToDelete.id);
      const updateCourseResult = result.filter((result) => result.id !== resultToDelete.id);
      setResult(updateCourseResult);
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

  const handlePreServiceTraineeCourseResult = (traineeId,courseId ,id) => {
    navigate('/training/updatePreTraineeCourseResult', { state: {traineeId,courseId, id } });
  };





  const columns = [
    { field: "startDate", headerName: "startDate", flex: 1 },
    { field: "endDate", headerName: "endDate", flex: 1 },
    { field: "semester", headerName: "semester", flex: 1 },
    { field: "result", headerName: "result", flex: 1 },
    { field: "decision", headerName: "decision", flex: 1 },


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
            <IconButton
              onClick={() => handlePreServiceTraineeCourseResult(params.row.traineeId,params.row.courseId ,params.row.id)}
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
    
    <LayoutForCourse >
        <Header subtitle="The Update of Pre Service Trainee Result"/>
      <DataGrid
        rows={result}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection={false}
      />
      <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this Result of Trainee?"
      />
    </LayoutForCourse>
  );
};

export default ListPreCourseTraineeResult;
