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
  import {
    assignDepartment,

  } from "../../../../Services/apiData";

  import { useLocation } from "react-router-dom";
  import DepartmentTree from "../../Employee/DepartmentTree";
  
  const AssignDepartement = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const location = useLocation();
    const interStudentId = location?.state?.id;
    console.log(interStudentId);
  
    const initialValues = {
      remark: "",
      placedDepartmentId: "",
    };
  
    const handleFormSubmit = async (values) => {
      try {
        await assignDepartment(interStudentId, values);
        navigate("/training/listInternstudent");
        console.log("Form data submitted successfully!");
      
      } catch (error) {
        console.error("Failed to submit form data:", error);
      }
    };
  

    const checkoutSchema = yup.object().shape({
      placedDepartmentId: yup.number().required("Placed Department ID cannot be null"),
      remark: yup.string().nullable(),
    });
  
    return (
      <Box m="20px">
      
        <Header subtitle="Assign Departement for Students" />
  
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
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
                   <Box sx={{ gridColumn: "span 2" }}>
                  <DepartmentTree
                    name="placedDepartmentId"
                    handleSelect={(selectedLocationId) =>
                      setFieldValue("placedDepartmentId", selectedLocationId)
                    }
                  />
                </Box>
              
  
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
               
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Submit
                </Button>
              
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
  };
  
  export default AssignDepartement;
  