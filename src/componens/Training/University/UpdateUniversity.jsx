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
  import { createUniversity, getUniversityById, updateUniversity } from "../../../../Services/apiData";
  import ToolbarComponent from "../ToolbarComponent";
import LocationTree from "../../Employee/LocationTress";
import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
  
  const UpdateUniversity = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const location = useLocation();
    const universityId = location?.state?.id;
    console.log(universityId);
  
    const handleFormSubmit = async (values, { resetForm }) => {
      try {
        await updateUniversity(universityId,values);
        navigate('/training/listUiversity');

        console.log("Form data submitted successfully!");
        resetForm(); // Reset form after successful submission
      } catch (error) {
        console.error("Failed to submit form data:", error);
      }
    };
  
    const handleIconClick = () => {
      navigate('/training/listUiversity');
    };
  
    const refreshPage = () => {
      window.location.reload();
    };
    

    const [university, setUniversity] = useState({ 
      universityName: "",
      abbreviatedName: "",
      locationId: "",
      costPerPerson: "",
      mobilePhoneNumber: "",
      telephoneNumber: "",
      email: "",
      fax: "",
      website: "",
      remark: ""
      });

      useEffect(() => {
        fetchTrainingUniversity();
      }, []);
    
      const fetchTrainingUniversity = async () => {
        try {
          const response = await getUniversityById(universityId);
          const data = response.data; 
          setUniversity(data);
          console.log(data);
        } catch (error) {
          console.error("Failed to fetch University:", error.message);
        }
      };
  

  
    const checkoutSchema = yup.object().shape({
        universityName: yup.string().required("University name cannot be blank"),
        abbreviatedName: yup.string().required("Abbreviated name cannot be blank"),
        locationId: yup.number().nullable().required("Location ID cannot be null"),
        costPerPerson: yup.number().nullable().required("Cost per person cannot be null"),
        mobilePhoneNumber: yup
          .string()
          .matches(/\+?[0-9. ()-]{7,25}/, "Invalid mobile phone number")
          .nullable(),
        telephoneNumber: yup
          .string()
          .matches(/\+?[0-9. ()-]{7,25}/, "Invalid telephone number")
          .required("Telephone number cannot be null"),
        email: yup.string().email("Invalid email address").nullable(),
        fax: yup
          .string()
          .matches(/\+?[0-9. ()-]{7,25}/, "Invalid fax number")
          .nullable(),
      });
  
    return (
      <Box m="20px">
        <ToolbarComponent
          mainIconType="search"
          onMainIconClick={handleIconClick}
          refreshPage={refreshPage}
        />
        <Header subtitle="Update University for Entern" />
  
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={university}
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
            setFieldValue,
            resetForm,
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
                  label="University"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.universityName}
                  name="universityName"
                  error={!!touched.universityName && !!errors.universityName}
                  helperText={touched.universityName && errors.universityName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Abbreviated Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.abbreviatedName}
                  name="abbreviatedName"
                  error={!!touched.abbreviatedName && !!errors.abbreviatedName}
                  helperText={touched.abbreviatedName && errors.abbreviatedName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  type="text"
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
                  label="Mobile Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mobilePhoneNumber}
                  name="mobilePhoneNumber"
                  error={!!touched.mobilePhoneNumber && !!errors.mobilePhoneNumber}
                  helperText={touched.mobilePhoneNumber && errors.mobilePhoneNumber}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Telephone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.telephoneNumber}
                  name="telephoneNumber"
                  error={!!touched.telephoneNumber && !!errors.telephoneNumber}
                  helperText={touched.telephoneNumber && errors.telephoneNumber}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
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
                  label="Remark"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.remark}
                  name="remark"
                  error={!!touched.remark && !!errors.remark}
                  helperText={touched.remark && errors.remark}
                  sx={{ gridColumn: "span 2" }}
                />
                <Box sx={{ gridColumn: "span 4" }}>
                  <LocationTree
                    name="locationId"
                    handleSelect={(selectedLocationId) =>
                      setFieldValue("locationId", selectedLocationId)
                    }
                  />
                </Box>
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                   Submit
                </Button>
                <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  onClick={() => resetForm()}
                  style={{ marginLeft: '10px' }}
                >
                  Reset
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
  };
  
  export default UpdateUniversity;
  