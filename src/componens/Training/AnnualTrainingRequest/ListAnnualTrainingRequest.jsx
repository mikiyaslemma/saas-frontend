import React, { useEffect, useState } from "react";
import { Box, useTheme, Tooltip, IconButton, Select, MenuItem, FormControl, InputLabel, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../DeleteDialog";
import ToolbarComponent from "../ToolbarComponent";
import LayoutForCourse from "../LayoutForCourse";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import {
  listOfAnnualTrainingRequest,
  deleteAnnualTrainingRequest,
  listCourseCategory,
  listOfdepartement,
  listTrainingInstution,
  listOfBudgetYears,
  getTrainingStatusByStatus,
} from "../../../../Services/apiData";

const ListAnnualTrainingRequest = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState(''); // Default to empty string for all
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [annualTrainingRequest, setAnnualTrainingRequest] = useState([]);
  const [department, setDepartment] = useState([]);
  const [courseCategory, setCourseCategory] = useState([]);
  const [institutionNames, setInstitutionNames] = useState([]);
  const [budgetYear, setBudgetYear] = useState([]);


  useEffect(() => {
    fetchData(selectedStatus);
  }, [selectedStatus]);

  const fetchData = async (status) => {
    try {
      const [
        trainingRequestResponse,
        categoryNamesResponse,
        departmentNameResponse,
        institutionNamesResponse,
        budgetResponse
      ] = await Promise.all([
        status === '' 
          ? listOfAnnualTrainingRequest() 
          :getTrainingStatusByStatus(status),

        listCourseCategory(),
        listOfdepartement(),
        listTrainingInstution(),
        listOfBudgetYears(),
        
      ]);

      const trainingRequestData = trainingRequestResponse.data;
      const categoryNamesData = categoryNamesResponse.data;
      const departmentNamesData = departmentNameResponse.data;
      const institutionNameData = institutionNamesResponse.data;
      const budgetYearData = budgetResponse.data;

      const mappedData = trainingRequestData.map((lang) => ({
        ...lang,
        categoryName: getCategoryName(lang.courseCategoryId, categoryNamesData),
        departmentName: getDepartmentName(lang.departmentId, departmentNamesData),
        institutionName: getInstitutionName(lang.trainingInstitutionId, institutionNameData),
        budgetYear: getBudgetYear(lang.budgetYearId, budgetYearData),
      }));

      setAnnualTrainingRequest(mappedData);
      setCourseCategory(categoryNamesData);
      setDepartment(departmentNamesData);
      setInstitutionNames(institutionNameData);
      setBudgetYear(budgetYearData);
    } catch (error) {
      setError(error.message);
    }
  };

  const getCategoryName = (courseCategoryId, categoryNames) => {
    const category = categoryNames.find((lang) => lang.id === courseCategoryId);
    return category ? category.categoryName : "Unknown";
  };

  const getDepartmentName = (departmentId, departmentNames) => {
    const department = departmentNames.find((dept) => dept.id === departmentId);
    return department ? department.departmentName : "Unknown";
  };

  const getInstitutionName = (institutionId, institutionNames) => {
    const institution = institutionNames.find((inst) => inst.id === institutionId);
    return institution ? institution.institutionName : "Unknown";
  };

  const getBudgetYear = (budgetYearId, budgetYears) => {
    const budget = budgetYears.find((budget) => budget.id === budgetYearId);
    return budget ? budget.budgetYear : "Unknown";
  };

  const handleDelete = (courseTraining) => {
    setSkillToDelete(courseTraining);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAnnualTrainingRequest(skillToDelete.id);
      const updatedTrainingRequest = annualTrainingRequest.filter((course) => course.id !== skillToDelete.id);
      setAnnualTrainingRequest(updatedTrainingRequest);
    } catch (error) {
      setError(error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleEditAnnualTrainingRequest = (trainingCourseId,id) => {
    navigate('/training/updateAnnualTrainingRequest', { state: {trainingCourseId,id} });
  };
 

  const handleStatusTraining = (id) => {
    navigate('/training/trainingStatus', { state: {id} });
  };
  
  const handleMoreAbout = (id) => {
    navigate('/training/trainingparticipant', { state: {id} });
  };
  
  
 

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleIconClick = () => {
    navigate('/training/annualTrainingRequest');
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const columns = [
    { field: "numberOfParticipants", headerName: "Number Of Participants", flex: 1 },
    { field: "categoryName", headerName: "Category Name", flex: 1 },
    { field: "institutionName", headerName: "Institution Name", flex: 1 },
    { field: "departmentName", headerName: "Department Name", flex: 1 },
    { field: "budgetYear", headerName: "Budget Year", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Tooltip title="Delete Course">
            <IconButton onClick={() => handleDelete(params.row)} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          {params.row.trainingStatus === 'Pending' && (
            <Tooltip title="Handle Status of Training">
               <IconButton onClick={() => handleStatusTraining(params.row.id)}>
                <HourglassEmptyIcon />
              </IconButton>
            </Tooltip>
          )}
          
          {params.row.trainingStatus === 'Approved' && (
             <Tooltip title="Add Participants">
            <IconButton onClick={() => handleMoreAbout(params.row.id)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          
          )}
          {params.row.trainingStatus === 'Rejected' && (
            <Tooltip title="This Training Request is  Rejected">
               <IconButton onClick={() => handleStatusTraining(params.row.id)}>
                <CancelIcon />
              </IconButton>
            </Tooltip>
          )}
          
      

          <Tooltip title="Update recruitment Information">
            <IconButton onClick={() => handleEditAnnualTrainingRequest(params.row.trainingCourseId , params.row.id)} color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>

  

        </Box>
      ),
    },
  ];

  return (
    <LayoutForCourse subtitle="List Of Annual Training Requests">
      <ToolbarComponent mainIconType="add" onMainIconClick={handleIconClick} refreshPage={refreshPage} />
     
      <Paper elevation={3} sx={{ padding: 2,minHeight: 5, marginBottom: 1 }}>
        <FormControl variant="outlined" sx={{ minWidth: 200, marginBottom: 2 }}>
          <InputLabel id="status-select-label">Search Training by Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={selectedStatus}
            onChange={handleStatusChange}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="APPROVED">Approved</MenuItem>
            <MenuItem value="REJECTED">Rejected</MenuItem>
          </Select>
        </FormControl>
        {error && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
            Error: {error}
          </Typography>
        )}
      </Paper>
      <Paper elevation={2} sx={{ padding: 1, borderRadius: 1 }}>
        <DataGrid
          rows={annualTrainingRequest}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection={false}
          autoHeight
          sx={{ border: 'none' }}
        />
      </Paper>
      <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this course?"
      />
    </LayoutForCourse>
  );
};

export default ListAnnualTrainingRequest;
