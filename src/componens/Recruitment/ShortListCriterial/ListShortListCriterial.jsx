import React, { useEffect, useState,useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../Header";
import { tokens } from "../../../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { deleteCriteria ,listCriteria,listEducationLevels} from "../../../../Services/apiData";
import DeleteDialog from "../../DeleteDialog";
import { Box, useTheme, Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation } from 'react-router-dom';


import AuthContext from "../../Auth/AuthContext";
import { canAccessResource } from "../../Auth/Services/SecurityService";
import RecruitmentServiceResourceName from "../../Auth/Resource/RecruitmentServiceResourceName";



const ListShortListCriterial = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [criterials, setCriterials] = useState([]);
  const [educationNames, setEducationNames] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [criterialToDelete, setCriterialToDelete] = useState(null);

  const location = useLocation();
  const recruitmentId = location.state?.recruitmentId;
   console.log(`the recruitmentId  ${recruitmentId}`);


  useEffect(() => {
    fetchData();
    checkPermissions();
  }, []);

  const fetchData = async () => {
    try {
      const [criterialResponse, educationNamesResponse] = await Promise.all([
        listCriteria(recruitmentId),
         listEducationLevels()
      ]);

      console.log("Criterial Response:", criterialResponse.data);
      console.log("Education Names Response:", educationNamesResponse.data);

      const criterialData = criterialResponse.data;
      const educationNamesData = educationNamesResponse.data;

      const mappedData = criterialData.map(crit => ({
        ...crit,
        educationLevelName: getEducationName(crit.educationLevelId, educationNamesData)
      }));

      console.log("Mapped Data:", mappedData);
      setCriterials(mappedData);
      setEducationNames(educationNamesData);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const getEducationName = (educationLevelId, educationNames) => {
    const education = educationNames.find((ed) => ed.id === educationLevelId);
    return education ? education.educationLevelName : "Unknown";
  };

  const handleEditApplicant = (recruitmentId,id) => {
    navigate('/recruitment/editcriterial', { state: {recruitmentId,id} });
  };
 

  const handleDelete = (criterial) => {
    setCriterialToDelete(criterial);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCriteria(criterialToDelete.id);
      const updatedCriterials = criterials.filter((crit) => crit.id !== criterialToDelete.id);
      setCriterials(updatedCriterials);
      console.log("Criterial deleted:", criterialToDelete);
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

  
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const { authState } = useContext(AuthContext);
  const userRoles = authState.roles;

  const checkPermissions = async () => {
    // Check permissions for actions
    const editAccess = await canAccessResource(RecruitmentServiceResourceName.UPDATE_SHORTLIST_CRITERIA, userRoles);
    const deleteAccess = await canAccessResource(RecruitmentServiceResourceName.DELETE_SHORTLIST_CRITERIA, userRoles);
  
    setCanEdit(editAccess);
    setCanDelete(deleteAccess);
  };

  const columns = [
    { field: "criteriaName", headerName: "Criteria Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "educationLevelName", headerName: "Education Level", flex: 1, cellClassName: "name-column--cell" },
    { field: "experienceType", headerName: "Experience Type", flex: 1, cellClassName: "name-column--cell" },
    { field: "cgpa", headerName: "CGPA", flex: 1, cellClassName: "name-column--cell" },
    { field: "gender", headerName: "Gender", flex: 1, cellClassName: "name-column--cell" },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {canDelete && (
             <Tooltip title="Delete Criterial">
             {/* <IconButton onClick={() => handleDelete(params.row)} color="error"> */}
             <IconButton onClick={() => navigate("/recruitment/deleteCriterial", { state: { criterialId: params.row.id,recruitmentId:params.row.recruitmentId } })} color="error">
               
               <DeleteIcon />
             </IconButton>
           </Tooltip>
          )}

          {canEdit && (
              <Tooltip title="Edit">
              <IconButton onClick={() => handleEditApplicant(recruitmentId,params.row.id)} color="primary">
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
      <Header subtitle="List of Criterial" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={criterials}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection={false}
        />
      </Box>
      <DeleteDialog
        open={openDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this criterial?"
      />
    </Box>
  );
};

export default ListShortListCriterial;
