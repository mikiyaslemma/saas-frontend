import {
    Box,
    Button,
    TextField,
    Grid,
  } from "@mui/material";
  import * as yup from "yup";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import { useNavigate } from "react-router-dom";
  import { Formik } from "formik";
  import LocationTress from "../../Employee/LocationTress";
  import {  getTrainingInstutionById, updateTrainingInstution } from "../../../../Services/apiData";
  import ToolbarComponent from "../ToolbarComponent";
  import LayoutForCourse from "../LayoutForCourse";
import Header from "../../Header";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
  
  const UpdateTrainingInstution = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const location = useLocation();
    const instutionId = location?.state?.id;

    const [trainingInstution, setTrainingInstution] = useState({ 
        institutionName: "",
        locationId: "",
        costPerPerson: "",
        phoneNumber: "",
        email: "",
        fax: "",
        website: "",
        tinNumber: "",
        remark: ""
      });

   
  

    const handleIconClick = () => {
        navigate('/training/ListTrainingInstution');
        
      };
    
  
    const refreshPage = () => {
      window.location.reload();
    };
    useEffect(() => {
        fetchTrainingInstution();
      }, []);
    
      const fetchTrainingInstution = async () => {
        try {
          const response = await getTrainingInstutionById(instutionId);
          const data = response.data; 
    
          setTrainingInstution(data);
          console.log(data);
        } catch (error) {
          console.error("Failed to fetch language:", error.message);
        }
      };
  
      const handleCourseFormSubmit = async (values, { resetForm }) => {
        try {
        
          const response = await updateTrainingInstution(instutionId, values);
          
          console.log("Update response:", response);
      
          if (response.status === 200) {           
            resetForm();
            navigate('/training/ListTrainingInstution');
            
            console.log("Instution training is  successfully upfated !");

          } else {
            console.error("Failed to update course: Unexpected response status", response.status);
          }
        } catch (error) {
          console.error("Failed to update course:", error);
        }
      };
      
    


   
    const checkoutSchema = yup.object().shape({
      institutionName: yup.string().required("Institution name is required"),
      locationId: yup.number().required("Location ID is required").positive().integer(),
      costPerPerson: yup.number().required("Cost per person is required").positive(),
      tinNumber: yup.string().required("TIN number is required"),
      remark: yup.string().required("Remark is required"),
      email: yup.string().email("Invalid email address").required("Email is required"),
      fax: yup.string().matches(/^\+?[0-9. ()-]{7,25}$/, "Invalid fax number").notRequired(),
     
      phoneNumber: yup.string()
        .matches(/^\+?[0-9. ()-]{7,25}$/, "Invalid phone number")
        .required("Phone number is required"),
    });
  
    return (
      <LayoutForCourse>
        <ToolbarComponent
          mainIconType="search"
          onMainIconClick={handleIconClick}
          refreshPage={refreshPage}
        />
               <Header  subtitle="Update Training Instution" />

  
        <Formik
          onSubmit={handleCourseFormSubmit}
          initialValues={trainingInstution}
          validationSchema={checkoutSchema}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm
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
                  label="Institution Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.institutionName}
                  name="institutionName"
                  error={!!touched.institutionName && !!errors.institutionName}
                  helperText={touched.institutionName && errors.institutionName}
                  sx={{ gridColumn: "span 2" }}
                />
  
                <TextField
                  fullWidth
                  type="number"
                  label="Cost Per Person"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.costPerPerson}
                  name="costPerPerson"
                  error={!!touched.costPerPerson && !!errors.costPerPerson}
                  helperText={touched.costPerPerson && errors.costPerPerson}
                  sx={{ gridColumn: "span 2" }}
                />
  
                <TextField
                  fullWidth
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
                  type="text"
                  label="Fax"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fax}
                  name="fax"
                  error={!!touched.fax && !!errors.fax}
                  helperText={touched.fax && errors.fax}
                  sx={{ gridColumn: "span 2" }}
                />
  
                <TextField
                  fullWidth
                  type="text"
                  label="Website"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.website}
                  name="website"
                  error={!!touched.website && !!errors.website}
                  helperText={touched.website && errors.website}
                  sx={{ gridColumn: "span 2" }}
                />
  
                <TextField
                  fullWidth
                  type="text"
                  label="TIN Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tinNumber}
                  name="tinNumber"
                  error={!!touched.tinNumber && !!errors.tinNumber}
                  helperText={touched.tinNumber && errors.tinNumber}
                  sx={{ gridColumn: "span 2" }}
                />
  
                <TextField
                  fullWidth
                  type="text"
                  label="Remark"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.remark}
                  name="remark"
                  error={!!touched.remark && !!errors.remark}
                  helperText={touched.remark && errors.remark}
                  sx={{ gridColumn: "span 2" }}
                />
  
                <LocationTress
                  name="locationId"
                  handleSelect={(selectedLocationId) =>
                    handleChange({
                      target: { name: 'locationId', value: selectedLocationId },
                    })
                  }
                />
              </Box>
              <Grid container spacing={3} justifyContent="center" style={{ marginBottom: 16 }}>
                <Grid item xs={12} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() => resetForm()}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </LayoutForCourse>
    );
  };
  
  export default UpdateTrainingInstution;
  