import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  useMediaQuery,IconButton ,Dialog,  DialogContent, DialogTitle,Grid ,TextField 
} from "@mui/material";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import Header from "../../Header";
import SearchComponent from "../../SearchComponent ";
import { Add, Close } from '@mui/icons-material';


import { useIds } from "../../../IdContext";
import { createLanguage, createUserLangauge, createUserTitleName, listLanguageNames, REST_API_BASE_URL } from "../../../../Services/apiData";

const CreateLanguage = ({ id }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { ids } = useIds();
  const [open, setOpen] = React.useState(false);


  const employerId = id;
  console.log(`the employeer id is  ${employerId} ` );

  const handleAddCategoryClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLanguageNameFormSubmit = async (values, { resetForm }) => {
    try {
      await createUserLangauge(values);
      console.log("Language Name  is  created successfully!");
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Failed to create language:", error);
    }
  };

  const languageNameIntialValue = {
    languageName: "",
    description: "",
  };

  const  languageNamecheckoutSchema = yup.object().shape({
    languageName: yup.string().required("Language name cannot be blank"),
    
  });
 

  const [allListOfLanguage, setAllListOfLanguage] = useState([]);

  useEffect(() => {
    fetchAllLanguages();
  }, []);

  const fetchAllLanguages = async () => {
    try {
      const response = await listLanguageNames();
      setAllListOfLanguage(response.data);
      console.log("The list of languages:", response.data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

 

  const handleFormSubmit = async (values) => {
    try {
      console.log("Form data:", values);
      await createLanguage(employerId, values);
      console.log("Form data submitted successfully!");
      navigate("/employee/LanguageAction", { state: { employerId } });
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  };

  const initialValues = {
    languageNameId: "",
    reading: "",
    listening: "",
    speaking: "",
    writing: "",
  };

  const validListeningLevels = ["Beginner", "Intermediate", "Advanced", "Proficient", "Fluent"];
  const validReadingLevels = ["Beginner", "Intermediate", "Advanced", "Proficient"];
  const validSpeakingLevels = ["Beginner", "Intermediate", "Advanced", "Fluent"];
  const validWritingLevels = ["Beginner", "Intermediate", "Advanced", "Proficient"];

  const checkoutSchema = yup.object().shape({
    languageNameId: yup.string().required("Language name cannot be null"),
    listening: yup.string().oneOf(validListeningLevels, "Invalid skill level").required("Listening skill level cannot be null"),
    speaking: yup.string().oneOf(validSpeakingLevels, "Invalid skill level").required("Speaking skill level cannot be null"),
    reading: yup.string().oneOf(validReadingLevels, "Invalid skill level").required("Reading skill level cannot be null"),
    writing: yup.string().oneOf(validWritingLevels, "Invalid skill level").required("Writing skill level cannot be null"),
  });

  return (
    <Box m="20px">
      <SearchComponent
        label="Enter Id to Get all Employee Languages"
        path="/employee/LanguageAction"
        actionLabel=" All Languages"
        ids={ids}
      />
      <Header subtitle="Create Language of Employer" />
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              }}
            >
               <Box display="flex" alignItems="center" sx={{ gridColumn: "span 2" }}>
                <FormControl
                  sx={{ flexGrow: 1, flexShrink: 1, minWidth: 0 }}
                  error={!!touched.titleNameId && !!errors.titleNameId}
                >
                  <InputLabel id="language-label">Select Title Name</InputLabel>
                  <Select
                  labelId="language-label"
                  value={values.languageNameId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="languageNameId"
                >
                  <MenuItem value="">
                    <em>Select Language</em>
                  </MenuItem>
                  {allListOfLanguage.map((language) => (
                    <MenuItem key={language.id} value={language.id}>
                      {language.languageName}
                    </MenuItem>
                  ))}
                </Select>
                   

                  {touched.languageNameId && errors.languageNameId && (
                    <FormHelperText>{errors.languageNameId}</FormHelperText>
                  )}
                </FormControl>
                <IconButton
                  sx={{ flexShrink: 0, marginLeft: 1 , marginRight: 1}}
                  onClick={handleAddCategoryClick}
                  title="Click to register termination type"
                >
                  <Add />
                </IconButton>
              </Box>


              {/* <FormControl
               // variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.languageNameId && !!errors.languageNameId}
              >
                <InputLabel id="language-label">Select Language</InputLabel>
                <Select
                  labelId="language-label"
                  value={values.languageNameId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="languageNameId"
                >
                  <MenuItem value="">
                    <em>Select Language</em>
                  </MenuItem>
                  {allListOfLanguage.map((language) => (
                    <MenuItem key={language.id} value={language.id}>
                      {language.languageName}
                    </MenuItem>
                  ))}
                </Select>
                {touched.languageNameId && errors.languageNameId && (
                  <FormHelperText>{errors.languageNameId}</FormHelperText>
                )}
              </FormControl> */}

              <FormControl
                fullWidth
                sx={{ gridColumn: "span 2" }}
                error={!!touched.listening && !!errors.listening}
              >
                <InputLabel>Please Select Listening Level</InputLabel>
                <Select
                  label="Listening Level"
                  value={values.listening}
                 // variant="filled"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="listening"
                >
                  <MenuItem value="">
                    <em>Select Listening Level</em>
                  </MenuItem>
                  {validListeningLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
                {touched.listening && errors.listening && (
                  <FormHelperText>{errors.listening}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                sx={{ gridColumn: "span 2" }}
                error={!!touched.reading && !!errors.reading}
              >
                <InputLabel>Please Select Reading Level</InputLabel>
                <Select
                  label="Reading Level"
                  value={values.reading}
                 // variant="filled"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="reading"
                >
                  <MenuItem value="">
                    <em>Select Reading Level</em>
                  </MenuItem>
                  {validReadingLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
                {touched.reading && errors.reading && (
                  <FormHelperText>{errors.reading}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                sx={{ gridColumn: "span 2" }}
                error={!!touched.speaking && !!errors.speaking}
              >
                <InputLabel>Please Select Speaking Level</InputLabel>
                <Select
                  label="Speaking Level"
                  value={values.speaking}
                 // variant="filled"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="speaking"
                >
                  <MenuItem value="">
                    <em>Select Speaking Level</em>
                  </MenuItem>
                  {validSpeakingLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
                {touched.speaking && errors.speaking && (
                  <FormHelperText>{errors.speaking}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                sx={{ gridColumn: "span 2" }}
                error={!!touched.writing && !!errors.writing}
              >
                <InputLabel>Please Select Writing Level</InputLabel>
                <Select
                  label="Writing Level"
                  value={values.writing}
                //  variant="filled"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="writing"
                >
                  <MenuItem value="">
                    <em>Select Writing Level</em>
                  </MenuItem>
                  {validWritingLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
                {touched.writing && errors.writing && (
                  <FormHelperText>{errors.writing}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Language
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {/* Dialog for adding new category */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Header subtitle=" Create language  Name" />
          <IconButton
            onClick={handleClose}
            style={{ position: 'absolute', right: 8, top: 4 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        
        <Formik
          initialValues={languageNameIntialValue}
          validationSchema={languageNamecheckoutSchema}
          onSubmit={handleLanguageNameFormSubmit}
        >
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Language Name"
                      variant="outlined"
                      name="languageName"
                      value={values.languageName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.languageName && !!errors.languageName}
                      helperText={touched.languageName && errors.languageName}
                      style={{ marginTop: 8 }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: 8 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Description"
                      variant="outlined"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                      style={{ marginTop: 8 }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>

              <Grid container spacing={3} justifyContent="center" style={{marginBottom: 16 }}>
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
      </Dialog>

    </Box>
  );
};

export default CreateLanguage;
