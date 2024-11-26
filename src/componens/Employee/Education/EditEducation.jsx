import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
  Link,
} from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import { getEducationById, getEducationFileById, listEducationLevels, listFieldStudies, updateEducation } from "../../../../Services/apiData";
import { useLocation } from "react-router-dom";

const EditEducation = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();


  const { employerId  } = location.state;
  const educationId =location?.state?.id
  console.log(`the employee id is ${employerId}`);
  console.log(`education id is ${educationId}`);
  
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [educationLevels, setEducationLevels] = useState([]);
  const [fieldOfStudies, setFieldOfStudies] = useState([]);


  const [education, setEducation] = useState({
    educationLevelId: "",
    educationType: "",
    fieldOfStudyId: "",
    institution: '',
    startDate: '',
    endDate: '',
    award: '',
    result: '',
    document: null,
  });

  useEffect(() => {
    fetchEducation();
    fetchFileOfEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await getEducationById(employerId, educationId);
      const data = response.data;

      setEducation({
        educationLevelId: data.educationLevelId,
        educationType: data.educationType.toUpperCase(),
        fieldOfStudyId: data.fieldOfStudyId,
        institution: data.institution,
        startDate: data.startDate,
        endDate: data.endDate,
        award: data.award,
        result: data.result,
        document: data.document,
      });
    } catch (error) {
      console.error("Failed to fetch education:", error.message);
    }
  };

  useEffect(() => {
    fetchEducationLevels();
    fetchFieldOfStudies();
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
  
  const fetchFieldOfStudies = async () => {
    try {
      const response = await listFieldStudies();
      setFieldOfStudies(response.data);
      console.log(response.data); // Optional: log the data to the console
    } catch (error) {
      console.error('Error fetching field of studies:', error.message);
    }
  };
  

  const fetchFileOfEducation = async () => {
    try {
    //  const fileUrl = `${REST_API_BASE_URL}educations/1/${employerId}/download-document/${educationId}`;
      const response = await getEducationFileById(employerId,educationId)

      if (response.ok) {
        setFileUrl(fileUrl);
        setFileName(fileUrl.split('/').pop());
      } else {
        console.error("Failed to fetch the file. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch Employee Image:", error.message);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append(
        "education",
        new Blob([JSON.stringify(values)], { type: "application/json" })
      );
      formData.append("document", values.document || education.document);

      console.log("Submitting form data:", values);

      const response = await  updateEducation(employerId,educationId,formData)
     
      if (response.status === 200) {
        console.log("Education updated successfully!");
        navigate("/employee/EducationAction", { state: { employerId } });
      } else {
        console.error("Error updating education. Status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else {
        console.error("An error occurred while updating the education:", error.message);
      }
    }
  };

  const handleFileUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setEducation((prevEducation) => ({
      ...prevEducation,
      document: file,
    }));
    setFieldValue("document", file);
  };

  const checkoutSchema = yup.object().shape({
    educationType: yup.string().required("Education Type is required"),
    document: yup.mixed().notRequired(),
    educationLevelId: yup.string().required("Education Level is required"),
    fieldOfStudyId: yup.string().required("Field of Study is required"),
    startDate: yup.date().required("Start Date is required"),
    endDate: yup.date().required("End Date is required"),
    result: yup.string().required("Result/CGPA is required"),
    institution: yup.string().required("Institution is required"),
  });

  return (
    <Box m="20px">
      <Header subtitle="Update education level of employer" />
      <Formik
        initialValues={education}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
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
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
              <InputLabel id="fieldOfStudy">Education Level</InputLabel>

                <Select
                  labelId="educationLevel"
                  value={values.educationLevelId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
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

              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="fieldOfStudy">Fields of Study</InputLabel>
                <Select
                  labelId="fieldOfStudy"
                  value={values.fieldOfStudyId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  name="fieldOfStudyId"
                  error={!!touched.fieldOfStudyId && !!errors.fieldOfStudyId}
                >
                  <MenuItem value="">
                    <em>Select Field of Study</em>
                  </MenuItem>
                  {fieldOfStudies.map((fieldOfStudy) => (
                    <MenuItem key={fieldOfStudy.id} value={fieldOfStudy.id}>
                      {fieldOfStudy.fieldOfStudy}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <Select
                  label="educationType"
                  value={values.educationType}
                  variant="filled"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  displayEmpty
                  inputProps={{ "aria-label": "educationType" }}
                  name="educationType"
                  error={!!touched.educationType && !!errors.educationType}
                >
                  <MenuItem value="" disabled>
                    <em>Please Select Education Type</em>
                  </MenuItem>
                  <MenuItem value="REGULAR">Regular</MenuItem>
                  <MenuItem value="WEEKEND">Weekend</MenuItem>
                  <MenuItem value="NIGHT">Night</MenuItem>
                  <MenuItem value="DISTANCE">Distance</MenuItem>
                  <MenuItem value="SUMMER">Summer</MenuItem>
                </Select>
                <FormHelperText>{touched.educationType && errors.educationType}</FormHelperText>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Start Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startDate}
                name="startDate"
                error={!!touched.startDate && !!errors.startDate}
                helperText={touched.startDate && errors.startDate}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="End Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.endDate}
                name="endDate"
                error={!!touched.endDate && !!errors.endDate}
                helperText={touched.endDate && errors.endDate}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Result/CGPA"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.result}
                name="result"
                error={!!touched.result && !!errors.result}
                helperText={touched.result && errors.result}
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

              <Box sx={{ gridColumn: "span 2" }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  Upload File
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileUpload(e, setFieldValue)}
                  />
                </Button>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  {fileName ? (
                    <Link href={fileUrl} target="_blank" rel="noopener noreferrer">
                      {fileName}
                    </Link>
                  ) : (
                    "No file uploaded"
                  )}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Education
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditEducation;
