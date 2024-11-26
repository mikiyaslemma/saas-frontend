import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { createTrainings } from "../../../../Services/apiData";
import Header from "../../Header";
import SearchComponent from "../../SearchComponent ";
import { useIds } from "../../../IdContext";


const CreateTraining = ({ id }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");

  const employerId = id;
  console.log(`the employeer id is  ${employerId} ` );

  const { ids } = useIds();
  
  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("training", new Blob([JSON.stringify(values)], { type: "application/json" }));
      formData.append("certificate", values.certificate);

      const response = await createTrainings(employerId, formData);

      if (response.status === 201) {
        navigate("/employee/TrainingAction", { state: { employerId } });
      } else {
        console.error("Error adding training. Status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else {
        console.error("An error occurred while adding the training:", error.message);
      }
    }
  };

  const handleFileUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
  ;  setFieldValue("certificate", file);
    setImagePreview(URL.createObjectURL(file));
  }

  const checkoutSchema = yup.object().shape({
    trainingTitle: yup
      .string()
      .required("Training title cannot be blank") // Aligns with @NotBlank
      .trim(), // Ensures no whitespace-only entries
    
    institution: yup
      .string()
      .required("Institution name cannot be blank") // Aligns with @NotBlank
      .trim(), // Ensures no whitespace-only entries
    
    sponsoredBy: yup
      .string()
      .required("Sponsored by field cannot be blank") // Aligns with @NotBlank
      .trim(), // Ensures no whitespace-only entries
    
    startDate: yup
      .date()
      .required("Start date cannot be null") // Aligns with @NotNull
      .max(new Date(), "Start date must be in the past or present"), // Aligns with @PastOrPresent
    
    endDate: yup
      .date()
      .required("End date cannot be null") // Aligns with @NotNull
      .max(new Date(), "End date must be in the past or present") // Aligns with @PastOrPresent
      ,
    
    certificate: yup
      .mixed()
      .required("Certificate is required"), // Assuming you want to validate file presence
  });
  

  const initialValues = {
    trainingTitle: "",
    institution: "",
    sponsoredBy: "",
    startDate: null,
    endDate: null,
    certificate: null,
  };

  return (
    <Box m="20px">
        <SearchComponent 
       label="Enter Id to Get all Employee Trainings"
       path="/employee/TrainingAction"
       actionLabel="All Tranings"
       ids={ids}
     
      />
    
      <Header subtitle="Create Training of Employee" />
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
          setFieldValue,
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
                variant="filled"
                type="text"
                label="Training Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.trainingTitle}
                name="trainingTitle"
                error={!!touched.trainingTitle && !!errors.trainingTitle}
                helperText={touched.trainingTitle && errors.trainingTitle}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Institution"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.institution}
                name="institution"
                error={!!touched.institution && !!errors.institution}
                helperText={touched.institution && errors.institution}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sponsored By"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sponsoredBy}
                name="sponsoredBy"
                error={!!touched.sponsoredBy && !!errors.sponsoredBy}
                helperText={touched.sponsoredBy && errors.sponsoredBy}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startDate}
                name="startDate"
                error={!!touched.startDate && !!errors.startDate}
                helperText={touched.startDate && errors.startDate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.endDate}
                name="endDate"
                error={!!touched.endDate && !!errors.endDate}
                helperText={touched.endDate && errors.endDate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                type="file"
                fullWidth
                name="certificate"
                onChange={(e) => handleFileUpload(e, setFieldValue)}
                onBlur={handleBlur}
                error={!!touched.certificate && !!errors.certificate}
                helperText={touched.certificate && errors.certificate}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Training
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateTraining;
