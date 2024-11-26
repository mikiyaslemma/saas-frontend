import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { createExperience } from "../../../../Services/apiData";
import { useState } from "react";
import SearchComponent from "../../SearchComponent ";
import { useIds } from "../../../IdContext";


const CreateExperience = ({ id }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");

  const employerId = id;
  console.log(`the employeer id is  ${employerId} ` );
  const { ids } = useIds();

  const [experience, setExperience] = useState({
    institution: "",
    employmentType: "",
    jobTitle: "",
    salary: "",
    startDate: null,
    endDate: null,
    responsibility: "",
    reasonForTermination: "",
    document: null,
  });

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("experience", new Blob([JSON.stringify(values)], { type: "application/json" }));
      formData.append("document", values.document);

      const response = await createExperience(employerId, formData);

      if (response.status === 201) {
        navigate("/employee/ExperenceAction", { state: { employerId } });
      } else {
        console.error("Error adding education. Status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else {
        console.error("An error occurred while adding the education:", error.message);
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setExperience(prevExperience => ({
      ...prevExperience,
      document: file
    }));
    setImagePreview(URL.createObjectURL(file));
  };



  const checkoutSchema = yup.object().shape({
    institution: yup.string().required("Institution name cannot be blank"),
    employmentType: yup.string().required("Employment type cannot be null"),
    jobTitle: yup.string().required("Job title cannot be blank"),
    startDate: yup.date().required("Start Date is required").max(new Date(), "Start date must be in the past or present"),
    endDate: yup.date().required("End Date is required").max(new Date(), "End date must be in the past or present"),
    
    responsibility: yup.string().required("Responsibility description cannot be blank"),
    reasonForTermination: yup.string().nullable(),
    document: yup.mixed().notRequired(), // Remove required validation for optional change
  });

  return (
    <Box m="20px">

       <SearchComponent 
       label="Enter Id to Get all Employee Experience"
       path="/employee/ExperenceAction"
       ids={ids}
       actionLabel="All  Experience"
       />
     
      <Header subtitle="Create Experience of Employer" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={experience}
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
                label="Institution"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.institution}
                name="institution"
                error={!!touched.institution && !!errors.institution}
                helperText={touched.institution && errors.institution}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl variant="filled" fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel>Employment Type</InputLabel>
                <Select
                  value={values.employmentType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="employmentType"
                  error={!!touched.employmentType && !!errors.employmentType}
                >
                  <MenuItem value="">
                    <em>Please Select Employment Type</em>
                  </MenuItem>
                  <MenuItem value="PERMANENT">Permanent</MenuItem>
                  <MenuItem value="CONTRACT">Contract</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Salary"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.salary}
                name="salary"
                error={!!touched.salary && !!errors.salary}
                helperText={touched.salary && errors.salary}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Job Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.jobTitle}
                name="jobTitle"
                error={!!touched.jobTitle && !!errors.jobTitle}
                helperText={touched.jobTitle && errors.jobTitle}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Responsibility"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.responsibility}
                name="responsibility"
                error={!!touched.responsibility && !!errors.responsibility}
                helperText={touched.responsibility && errors.responsibility}
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
                fullWidth
                variant="filled"
                type="text"
                label="Reason for Termination"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reasonForTermination}
                name="reasonForTermination"
                error={!!touched.reasonForTermination && !!errors.reasonForTermination}
                helperText={touched.reasonForTermination && errors.reasonForTermination}
                sx={{ gridColumn: "span 2" }}
              />
             <TextField
                type="file"
                fullWidth
                name="document"
                onChange={(e) => {
                  handleFileUpload(e);
                  setFieldValue("document", e.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
                error={!!touched.document && !!errors.document}
                helperText={touched.document && errors.document}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Experience
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateExperience;
