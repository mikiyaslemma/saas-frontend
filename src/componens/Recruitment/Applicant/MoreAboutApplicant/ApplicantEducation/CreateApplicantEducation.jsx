import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel 
} from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik } from "formik";
import { addApplicantEducations, listEducationLevels, listFieldStudies } from "../../../../../../Services/apiData";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";



const CreateApplicantEducation = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const applicantId = location?.state?.id
  
  console.log(applicantId);
  const [imagePreview, setImagePreview] = useState("");

  const [educationLevels, setEducationLevels] = useState([]);
  const [fieldOfStudies, setFieldOfStudies] = useState([]);
  

  const [education, setEducation] = useState({
    educationLevelId: "",
    educationType: "",
    fieldOfStudyId: "",
    institution: '',
    startDate: '',
    endDate: '',
    result: '',
    document: ""
  });

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
  

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("education", new Blob([JSON.stringify(values)], { type: "application/json" }));
      formData.append("document", values.document);


      const response = await addApplicantEducations(applicantId, formData);

      if (response.status === 201) {
        navigate("/recruitment/listapplicantEducation", { state: { applicantId } });
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
    setEducation(prevEducation => ({
      ...prevEducation,
      document: file
    }));
    setImagePreview(URL.createObjectURL(file));
  };

  const checkoutSchema = yup.object().shape({
    educationLevelId: yup.string().required("Education Level is required"),
    educationType: yup.string().required("Education Type is required"),
    fieldOfStudyId: yup.string().required("Field of Study is required"),
    institution: yup.string().required("Institution is required"),
    startDate: yup.date().required("Start Date is required").max(new Date(), "Start date must be in the past or present"),
    endDate: yup.date().required("End Date is required").max(new Date(), "End date must be in the past or present"),
  
    result: yup.number().required("Result/CGPA is required").min(0, "Result must be a non-negative value").max(100, "Result cannot exceed 100"),
    document: yup.mixed().required("Document is required")
  });

  return (
    <Box m="20px">
   
  
   
       
      <Header subtitle="Create education of employee"  />
      <Formik
        initialValues={education}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
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
              

              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <Select
                label="Education Type"
                value={values.educationType}
                variant="filled"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                displayEmpty
                inputProps={{ "aria-label": "educationType" }}
                error={!!touched.educationType && !!errors.educationType}
                name="educationType"
                sx={{ gridColumn: "span 2" }}
              >
                  <MenuItem value="">
                    <em>Education Type</em>
                  </MenuItem>
                  <MenuItem value="Regular">Regular</MenuItem>
                  <MenuItem value="WEEKEND">Weekend</MenuItem>
                  <MenuItem value="NIGHT">Night</MenuItem>
                  <MenuItem value="DISTANCE">Distance</MenuItem>
                  <MenuItem value="SUMMER">Summer</MenuItem>
                   </Select>
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
                label="School/Institution"
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
                Create Education
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


export default CreateApplicantEducation;




