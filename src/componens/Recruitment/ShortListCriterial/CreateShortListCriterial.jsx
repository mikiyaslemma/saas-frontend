import React, { useEffect, useState } from "react";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik } from "formik";
import Header from "../../Header";
import axios from "axios";
import { Box, Button, TextField, MenuItem, Select, Typography, FormControl, InputLabel } from "@mui/material";
import {  addCriteria, listEducationLevels, REST_API_BASE_URL } from "../../../../Services/apiData"; // Ensure this is the correct import

const CreateShortListCriterial = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const recruitmentId = location?.state?.id;
  const [educationLevels, setEducationLevels] = useState([]);

  const initialValues = {
    criteriaName: "",
    gender: "",
    educationLevelId: "", // Ensure this is part of initial values
    trainingOrCertificate: "",
    experienceType: "",
    cgpa: "",
    recruitmentId: recruitmentId,
    minimumExperience: "",
    minimumAge: "",
    maximumAge: "",
    other: ""
  };
  
  useEffect(() => {
    fetchEducationLevels();
  }, []);
  
  const fetchEducationLevels = async () => {
    try {
      const response = await listEducationLevels();
      setEducationLevels(response.data);
      console.log(response.data); // Optional: log the data to the console
    } catch (error) {
      console.error('Error fetching education levels:', error.message);
    }
  };


  
  const handleFormSubmit = async (values) => {
    try {
      console.log("Form data:", values);
      await addCriteria(values);
      console.log("Form data submitted successfully!");
  
      // Assuming `values` contains the recruitmentId
      const recruitmentId = values.recruitmentId;
      navigate('/recruitment/listcriterial', { state: { recruitmentId } });
        // Redirect after successful submission
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  };

  // const handleFormSubmit = async (values) => {
  //   try {
  //     const response = await listCriterial();
  //     if (response.status !== 200) {
  //       throw new Error("Failed to fetch Criterials");
  //     }
  //     const data = response.data;
  //     const exists = data.some(ad => ad.recruitmentId === recruitmentId);

  //     if (exists) {
  //       navigate('/recruitment/shortListCriterialError');
  //       return;
  //     }

  //     await addCriterial(values);
  //     console.log("Form data submitted successfully!");
  //     navigate('/recruitment/listcriterial');
  //   } catch (error) {
  //     console.error("Failed to submit form data:", error);
  //     if (error.response && error.response.data) {
  //       console.error('Failed to submit form data:', error.response.data);
  //     } else if (error.response) {
  //       console.error('Server response:', error.response);
  //     } else {
  //       console.error('Failed to submit form data:', error.message);
  //     }
  //   }
  // };

  const checkoutSchema = yup.object().shape({
    criteriaName: yup.string().required("Criteria name cannot be blank"),
    gender: yup.string().required("Gender cannot be null"),
    educationLevelId: yup.string().required("Education level cannot be null"), // Update schema to match form value
    trainingOrCertificate: yup.string().required("Training or certificate cannot be blank"),
    experienceType: yup.string().required("Experience type cannot be null"),
    cgpa: yup.number().min(0, "CGPA must be a non-negative value").max(100, "CGPA cannot exceed 100").required("CGPA is required"),
    minimumExperience: yup.number().required("Minimum experience cannot be null"),
    minimumAge: yup.number().required("Minimum age cannot be null"),
    maximumAge: yup.number().required("Maximum age cannot be null"),
    other: yup.string()
  });

  return (
    <Box m="20px">
      <Header subtitle="Create Criterial" />
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
                variant="filled"
                type="text"
                label="Criteria Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.criteriaName}
                name="criteriaName"
                error={!!touched.criteriaName && !!errors.criteriaName}
                helperText={touched.criteriaName && errors.criteriaName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Training or Certificate"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.trainingOrCertificate}
                name="trainingOrCertificate"
                error={!!touched.trainingOrCertificate && !!errors.trainingOrCertificate}
                helperText={touched.trainingOrCertificate && errors.trainingOrCertificate}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="gender"
                  error={!!touched.gender && !!errors.gender}
                >
                  <MenuItem value="">
                    <em>Please Select Gender</em>
                  </MenuItem>
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                </Select>
              </FormControl>
              {touched.gender && errors.gender && (
                <Typography color="error" variant="body2">{errors.gender}</Typography>
              )}

              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="experienceType-label">Experience Type</InputLabel>
                <Select
                  labelId="experienceType-label"
                  value={values.experienceType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="experienceType"
                  error={!!touched.experienceType && !!errors.experienceType}
                >
                  <MenuItem value="">
                    <em>Please Select Experience Type</em>
                  </MenuItem>
                  <MenuItem value="DIRECT">Direct Experience</MenuItem>
                  <MenuItem value="RELATED">Related Experence</MenuItem>
                </Select>
              </FormControl>
              {touched.experienceType && errors.experienceType && (
                <Typography color="error" variant="body2">{errors.experienceType}</Typography>
              )}

              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="educationLevel-label">Education Level</InputLabel>
                <Select
                  labelId="educationLevel-label"
                  value={values.educationLevelId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="educationLevelId"
                  error={!!touched.educationLevelId && !!errors.educationLevelId}
                >
                  <MenuItem value="">
                    <em>Select Education Level</em>
                  </MenuItem>
                  {educationLevels.map((educationLevel) => (
                    <MenuItem key={educationLevel.id} value={educationLevel.id}>
                      {educationLevel.educationLevelName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {touched.educationLevelId && errors.educationLevelId && (
                <Typography color="error" variant="body2">{errors.educationLevelId}</Typography>
              )}

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="CGPA"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cgpa}
                name="cgpa"
                error={!!touched.cgpa && !!errors.cgpa}
                helperText={touched.cgpa && errors.cgpa}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Minimum Experience"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.minimumExperience}
                name="minimumExperience"
                error={!!touched.minimumExperience && !!errors.minimumExperience}
                helperText={touched.minimumExperience && errors.minimumExperience}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Minimum Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.minimumAge}
                name="minimumAge"
                error={!!touched.minimumAge && !!errors.minimumAge}
                helperText={touched.minimumAge && errors.minimumAge}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Maximum Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.maximumAge}
                name="maximumAge"
                error={!!touched.maximumAge && !!errors.maximumAge}
                helperText={touched.maximumAge && errors.maximumAge}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Other"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.other}
                name="other"
                error={!!touched.other && !!errors.other}
                helperText={touched.other && errors.other}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Criterial
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateShortListCriterial;
