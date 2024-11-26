import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel 
} from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { createFamily} from "../../../../Services/apiData";
import Header from "../../Header";
import SearchComponent from "../../SearchComponent ";
import { useIds } from "../../../IdContext";


const CreateFamily = ({ id }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { ids } = useIds();


  const employerId = id;
  console.log(`the employeer id is  ${employerId} ` );
 

 
 
  const initialValues = {
    relationshipType: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    houseNumber: "",
    homeTelephone: "",
    officeTelephone: "",
    mobileNumber: "",
    email: "",
    poBox: "",
    emergencyContact: false
  };
  
    
  
 
  const handleFormSubmit = async (values) => {
    try {
      console.log("Form data:", values);
      await createFamily(employerId, values);
      console.log("Form data submitted successfully!");
      navigate("/employee/FamilyAction", { state: { employerId } }); 
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  };

  const checkoutSchema = yup.object().shape({
    relationshipType: yup.string().required("Relationship is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    middleName: yup.string().required("Middle name is required"),
    dateOfBirth: yup.string().required("dateOfBirth is required"),
    gender: yup.string().required("gender is required"),
    emergencyContact: yup.string().required("gender is required"),
    mobileNumber: yup.string()
    .matches(/^\d{10}$/, "Invalid mobile number") // Add validation for mobile number
    .required("Mobile number is required"),
});


 
  console.log({ checkoutSchema });

  return (
    <Box m="20px">
       <SearchComponent 
       label="Enter Id to Get all Employee Family "
       path="/employee/FamilyAction"
       ids={ids}
       actionLabel="All Family"
       />
    
      <Header
        subtitle="Create Family of employer"
      />

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

              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>   
                <InputLabel>Please Select Relationship Type</InputLabel>
                <Select
                label="relationshipType"
                value={values.relationshipType}
                variant="filled"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                required
                displayEmpty
                inputProps={{ "aria-label": "relationship Type" }}
                name="relationshipType"
                error={!!touched.relationshipType && !!errors.relationshipType}
                sx={{ gridColumn: "span 2" }}
              >
      
               <MenuItem value="PARENT">Parent</MenuItem>
                 <MenuItem value="CHILD">Child</MenuItem>
                 <MenuItem value="SIBLING">Sibling</MenuItem>
                 <MenuItem value="GRANDPARENT">Grand Parent</MenuItem>
                 <MenuItem value="GRANDCHILD">Grand Child</MenuItem>
                 <MenuItem value="AUNT">Aunt</MenuItem>
                 <MenuItem value="UNCLE">Uncle</MenuItem>
                 <MenuItem value="NIECE">Niece</MenuItem>
                 <MenuItem value="NEPHEW">NEPHEW</MenuItem>
                 
                 <MenuItem value="COUSIN">Cousin</MenuItem>
                 <MenuItem value="SPOUSE">Spouse</MenuItem>
                 <MenuItem value="PARTNER">Partner</MenuItem>
                 <MenuItem value="IN_LAW">In law</MenuItem>
                 <MenuItem value="STEP_PARENT">Step Parent</MenuItem>
                 <MenuItem value="STEP_CHILD">Step child</MenuItem>
                 <MenuItem value="STEP_SIBLING">Step sibilings</MenuItem>
                 <MenuItem value="GUARDIAN">Guardian</MenuItem>

                 <MenuItem value="FOSTER_PARENT">Foster parent</MenuItem>
                 <MenuItem value="FOSTER_CHILD">Foster child</MenuItem>
                 <MenuItem value="ADOPTIVE_PARENT">Adoptive</MenuItem>
                 <MenuItem value="ADOPTED_CHILD">Apopted child</MenuItem>
                

                </Select>
              </FormControl>

            
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Middle Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.middleName}
                name="middleName"
                error={!!touched.middleName && !!errors.middleName}
                helperText={touched.middleName && errors.middleName}
                sx={{ gridColumn: "span 2" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.em}
                sx={{ gridColumn: "span 2" }}
              />

               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="House Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.houseNumber}
                name="houseNumber"
                error={!!touched.houseNumber && !!errors.houseNumber}
                helperText={touched.houseNumber && errors.houseNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Home Telephone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.homeTelephone}
                name="homeTelephone"
                error={!!touched.homeTelephone && !!errors.homeTelephone}
                helperText={touched.homeTelephone && errors.homeTelephone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Office Telephone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.officeTelephone}
                name="officeTelephone"
                error={!!touched.officeTelephone && !!errors.officeTelephone}
                helperText={touched.officeTelephone && errors.officeTelephone}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Mobile Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mobileNumber}
                name="mobileNumber"
                error={!!touched.mobileNumber && !!errors.mobileNumber}
                helperText={touched.mobileNumber && errors.mobileNumber}
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="email"
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
                label="poBox"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.poBox}
                name="poBox"
                error={!!touched.poBox && !!errors.poBox}
                helperText={touched.poBox && errors.poBox}
                sx={{ gridColumn: "span 2" }}
              />

                <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateOfBirth}
                name="dateOfBirth"
                error={!!touched.dateOfBirth && !!errors.dateOfBirth}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
                sx={{ gridColumn: "span 1" }}
              />   

              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>   
                <InputLabel>Please Select Gender</InputLabel>
                <Select
               label="Gender"
               value={values.gender}
               variant="filled"
               onChange={handleChange}
               onBlur={handleBlur}
               required
               displayEmpty
               inputProps={{ "aria-label": "gender" }}
               error={!!touched.gender && !!errors.gender}
               name="gender"
               sx={{ gridColumn: "span 1" }}
              > 
               <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                </Select>
              </FormControl>

          
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.emergencyContact}
                    onChange={handleChange}
                    
                    name="emergencyContact"
                  />
                }
                label="Emergency Contact"
              />
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Family
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateFamily;
