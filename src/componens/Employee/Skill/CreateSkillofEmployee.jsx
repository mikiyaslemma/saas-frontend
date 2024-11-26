import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { createSkill } from "../../../../Services/apiData";
import { useIds } from "../../../IdContext";
import SkillAction from "./SkillAction";

const CreateSkillofEmployee = ({ id }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const employerId = id;

  console.log(`The passed ID is ${employerId}`);
  const { ids } = useIds();

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      console.log("Form data:", values);
      await createSkill(employerId, values);
      setNotification({
        open: true,
        message: "Skill created successfully!",
        severity: "success",
      });
      resetForm();
      setRefreshKey(prev => prev + 1); // Increment refreshKey to refresh SkillAction
    } catch (error) {
      console.error("Failed to submit form data:", error);
      setNotification({
        open: true,
        message: "Failed to create skill. Please try again.",
        severity: "error",
      });
    }
  };

  const initialValues = {
    skillType: "",
    skillLevel: "",
    description: "",
  };

  const checkoutSchema = yup.object().shape({
    skillType: yup.string().required("Skill type is required"),
    skillLevel: yup.string().required("Skill level is required"),
    description: yup.string().required("Description is required"),
  });

  const handleCloseSnackbar = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box m="20px">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                type="text"
                label="Skill Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.skillType}
                name="skillType"
                error={!!touched.skillType && !!errors.skillType}
                helperText={touched.skillType && errors.skillType}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="text"
                label="Skill Level"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.skillLevel}
                name="skillLevel"
                error={!!touched.skillLevel && !!errors.skillLevel}
                helperText={touched.skillLevel && errors.skillLevel}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Skill
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
      
      {/* Pass the employerId and refreshKey to SkillAction */}
      <SkillAction employerId={employerId} refreshKey={refreshKey} />
      
    </Box>
  );
};

export default CreateSkillofEmployee;