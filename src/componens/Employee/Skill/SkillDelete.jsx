import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Typography, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { deleteSkill } from "../../../../Services/apiData";

const SkillDelete = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { employerId  } = location.state;
  const skillId =location?.state?.id
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);


  const handleDelete = async () => {
    try {
      await deleteSkill(employerId, skillId);
      const id =employerId ;
      navigate('/employee/editDetails', { state: { id, isEditable: true,activeTab: 1 } }); // Navigate to "Skill" tab


    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    const id =employerId ;
   // navigate("/employee/SkillAction", { state: { employerId } });
   navigate('/employee/editDetails', { state: { id, isEditable: true,activeTab: 1 } }); // Navigate to "Skill" tab

  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Confirm Skill Deletion
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3 }}>
        Are you sure you want to delete the skill with ID: <strong>{skillId}</strong>?
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={handleOpenDialog}
        sx={{ marginRight: 2, minWidth: 120 }}
      >
        Delete
      </Button>
      <Button
        variant="outlined"
        onClick={handleCancel}
        sx={{ minWidth: 120 }}
      >
        Cancel
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete the skill with ID: {skillId}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default SkillDelete;
