import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Header from "../../Header";
import { createReference } from "../../../../Services/apiData";
import SearchComponent from "../../SearchComponent ";
import { useIds } from "../../../IdContext";
import { useAuth } from "../../Auth/AuthContext";

const CreateReference = ({ id }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { ids } = useIds();
  const employerId = id;
  console.log(`the employeer id is  ${employerId} ` );
  const { authState } = useAuth(); // Destructure authState from useAuth
  const { username } = authState; // Access the username
 


  const handleFormSubmit = async (values) => {
    try {
      console.log("Form data:", values);
      await createReference(employerId, values); // Assuming createReference function takes id and values
      console.log("Form  data submitted successfully!");
      navigate("/employee/ReferenceAction", { state: { employerId } });// Passing id to ReferenceAction page
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  };

  const initialValues = {
    fullName: "",
    workAddress: "",
    email: "",
    phoneNumber: "",
    description: "",
    jobTitle: "",
  };

  const checkoutSchema = yup.object().shape({
    fullName: yup.string().required("Full name cannot be blank"),
    workAddress: yup.string().required("Work address cannot be blank"),
    email: yup.string().email("Invalid email address").required("Email cannot be blank"),
    phoneNumber: yup.string().matches(/^\d{10}$/, "Invalid phone number").required("Phone number cannot be blank"),
    description: yup.string(),
    jobTitle: yup.string().required("Job title cannot be blank"),
  });

  return (
    <Box m="20px">
        <SearchComponent 
       label="Enter Id to Get all Employee Reference"
       path="/employee/ReferenceAction"
       ids={ids}
       actionLabel="All  Reference"
      />
      <Header subtitle="Create Reference for employer" />

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
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Work Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.workAddress}
                name="workAddress"
                error={!!touched.workAddress && !!errors.workAddress}
                helperText={touched.workAddress && errors.workAddress}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
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
                multiline
                rows={2}
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
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Reference
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateReference;
