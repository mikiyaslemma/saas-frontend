import React from "react";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Header  from "../../Header";
import {  createUserLangauge } from "../../../../Services/apiData";


const CreateListLangauge = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
 

  const handleFormSubmit = async (values) => {
    try {
      console.log("Form data:", values);
      await createUserLangauge(values); 
      console.log("Form data submitted successfully!");
     // navigate("/employee/SkillAction", { state: { id } }); // Passing id to SkillAction page
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  };

  const initialValues = {
    languageName: "",
    description: "",
  };

  const checkoutSchema = yup.object().shape({
    languageName: yup.string().required("Language name cannot be blank"),
    
  });

  return (
    <Box m="20px">

      <Header  subtitle="Create Language " />
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
               variant="outlined"
                type="text"
                label="languageName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.languageName}
                name="languageName"
                error={!!touched.languageName && !!errors.languageName}
                helperText={touched.languageName && errors.languageName}
                sx={{ gridColumn: "span 2" }}
              />
              
              <TextField
                fullWidth
              //  variant="filled"
                multiline
                rows={4}
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
                Create Language
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateListLangauge;