import React, { useEffect, useState } from "react";
import { Box, Select, MenuItem, FormControl, InputLabel, Tooltip, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../../DeleteDialog";
import { useNavigate } from "react-router-dom";
import { deletePreCourse, listCourseType, listPreCourse } from "../../../../Services/apiData";
import ToolbarComponent from "../ToolbarComponent";
import LayoutForCourse from "../LayoutForCourse";
import { tokens } from "../../../../theme";

const ListOfPresServiceCourse = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();  
  const [selectedCourseTypeId, setSelectedCourseTypeId] = useState('');
  const [error, setError] = useState(null);
  const [courseType, setCourseType] = useState([]);
  const [courseTraining, setCourseTraining] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);

  useEffect(() => {
    fetchCourseType();
  }, []);

  useEffect(() => {
    if (selectedCourseTypeId) {
      fetchCourseTrainings(selectedCourseTypeId);
    }
  }, [selectedCourseTypeId]);
  

  const fetchCourseType = async () => {
    try {
      const response = await listCourseType();
      setCourseType(response.data);
      const data =response.data;
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const fetchCourseTrainings = async (courseTypeId) => {
    try {
      const response = await listPreCourse(courseTypeId);
      const courseTrainingData = response.data.map((course) => ({
        ...course,
        courseType: getCourseTypeName(courseTypeId)
      }));
      setCourseTraining(courseTrainingData);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const getCourseTypeName = (courseTypeId) => {
    const courseTypeItem = courseType.find((cat) => cat.id === courseTypeId);
    return courseTypeItem ? courseTypeItem.courseType : "Unknown";
  };

  const handleDelete = (courseTraining) => {
    setSkillToDelete(courseTraining);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePreCourse(skillToDelete.id);
      const updatedTrainingCourses = courseTraining.filter((course) => course.id !== skillToDelete.id);
      setCourseTraining(updatedTrainingCourses);
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

  const handleCourseTraining = (id) => {
    navigate('/training/updatepreserviceTraining', { state: { id } });
  };


  const handleCourseChange = (event) => {
    setSelectedCourseTypeId(event.target.value);
  };

  const handleIconClick = () => {
    navigate('/training/preserviceCourses');
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const columns = [
    { field: "courseName", headerName: "Course Name", flex: 1 },
    { field: "courseType", headerName: "Course Type", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
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
              onClick={() => handleCourseTraining(params.row.id)}
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
    <LayoutForCourse subtitle="List Of Courses">
      <ToolbarComponent mainIconType="add" onMainIconClick={handleIconClick} refreshPage={refreshPage} />
      <FormControl variant="outlined" sx={{ minWidth: 200, marginBottom: 2 }}>
        <InputLabel id="pre-course">Search Training by Course Type</InputLabel>
        <Select
          labelId="pre-course"
          id="pre-course"
          value={selectedCourseTypeId}
          onChange={handleCourseChange}
          label="Pre Course"
        >
          {courseType.map((courseType) => (
            <MenuItem key={courseType.id} value={courseType.id}>
              {courseType.courseType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DataGrid
        rows={courseTraining}
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
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </LayoutForCourse>
  );
};

export default ListOfPresServiceCourse;
