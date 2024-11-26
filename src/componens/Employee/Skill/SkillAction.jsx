import React, { useEffect, useState, useContext } from "react";
import { Box, useTheme, Tooltip, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import { listSkills } from "../../../../Services/apiData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { canAccessResource } from "../../Auth/Services/SecurityService";
import EmployeeServiceResourceName from "../../Auth/Resource/EmployeeServiceResourceName";
import AuthContext from "../../Auth/AuthContext";

const SkillAction = ({ employerId, refreshKey }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSkills();
    checkPermissions();
  }, [refreshKey]); // Add refreshKey to the dependency array

  const fetchSkills = async () => {
    try {
      const response = await listSkills(employerId);
      setSkills(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const handleEditSkill = (id) => {
    navigate('/employee/EditSkill', { state: { employerId, id } });
  };

  const handleDeleteSkill = (id) => {
    navigate('/employee/deleteSkill', { state: { employerId, id } });
  };

  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const { authState } = useContext(AuthContext);
  const userRoles = authState.roles;

  const checkPermissions = async () => {
    const editAccess = await canAccessResource(EmployeeServiceResourceName.UPDATE_SKILL, userRoles);
    const deleteAccess = await canAccessResource(EmployeeServiceResourceName.DELETE_SKILL, userRoles);
  
    setCanEdit(editAccess);
    setCanDelete(deleteAccess);
  };

  const columns = [
    { field: "skillType", headerName: "Skill Type", flex: 1 },
    { field: "skillLevel", headerName: "Skill Level", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {canDelete && (
            <Tooltip title="Delete Skill of Employee">
              <IconButton
                onClick={() => handleDeleteSkill(params.row.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}

          {canEdit && (
            <Tooltip title="Update">
              <IconButton
                onClick={() => handleEditSkill(params.row.id)}
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
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={skills}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection={false}
        />
      </Box>
    </Box>
  );
};

export default SkillAction;