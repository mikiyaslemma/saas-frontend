import React, { useEffect, useState } from "react";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { createEmployee, createUserTitleName, listDepartement, listEmployees, listJobRegestration, listOfPayGrade, listTitleName } from "../../../Services/apiData";
import { Formik, Form,  ErrorMessage } from "formik";
import axios from "axios";
import Header from "../Header";

import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel, IconButton, Dialog,  DialogContent, DialogTitle,Grid ,FormHelperText,Snackbar,Alert
} from "@mui/material";
import DepartmentTree from "./DepartmentTree";
import { Add, Close } from '@mui/icons-material';


const CreateEmployee = ({ onEmployeeCreated }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [lisemployees, setListEmployees] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });




  const handleAddCategoryClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const titleNameIntialValues = {
    titleName: "",
    description: "",
  };

  
  const titleNameSchema = yup.object().shape({
    titleName: yup.string().required("title name cannot be blank"),    
  });

  const handleTitleNameFormSubmit = async (values, { resetForm }) => {
    try {
      await createUserTitleName(values);
      resetForm();
      setOpen(false);
    } catch (error) {
      setNotification({ open: true, message: "Failed to Craete the Tittle Name c. Please try again.", severity: "error" });
    }
  };




  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    fetchJobRegistrations();
    fetchAlltitleName();
    fetchAllPayGrade();
  }, []);

 



  const fetchEmployees = async () => {
    try {
      const response = await listEmployees();
      setListEmployees(response);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };


  const [employee, setEmployee] = useState({
    employeeId: "",
    departmentId: "",
    titleNameId: "",
    payGradeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    employmentType: "",
    jobId: "",
    hiredDate: "",
    endDate: "",
    dutyStation: "",
    nationality: "",
    fydaNumber: "",
    passportNumber: "",
    tinNumber: "",
    pensionNumber: "",
    email:"",
    profileImage: null

  });
  const handleCloseSnackbar = () => {
    setNotification({ ...notification, open: false });
  };
  
  const [departments, setDepartments] = useState([]);
  const [jobRegistration, setJobRegistration] = useState([]);
  const [allTitleName, setAlltitleName] = useState([]);
  const [allPayGradeName, setAllPayGradeName] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [allCountries, setAllCountries] = useState([]);


  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const countries = response.data.map(country => ({
        name: country.name.common,
        code: country.cca2
      }));
      setAllCountries(countries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };





  const fetchDepartments = async () => {
    try {
      const response = listDepartement();
      setDepartments(response.data);
    } catch (error) {
      setNotification({ open: true, message: "Failed fetch the Departement c. Please try again.", severity: "error" });
    }
  };

  const fetchJobRegistrations = async () => {
    try {
      const response = await listJobRegestration();
      setJobRegistration(response.data);
      
    }
     catch (error) {
      setNotification({ open: true, message: "Failed fetch the job registration c. Please try again.", severity: "error" });
      if (error) {
       
      }
    }
  };


  const fetchAlltitleName = async () => {
    try {
      const response = await listTitleName();
      setAlltitleName(response.data);
    } catch (error) {
      setNotification({ open: true, message: "Failed fetch the Title Name c. Please try again.", severity: "error" });
    }
  };

  const fetchAllPayGrade = async () => {
    try {
      const response = await listOfPayGrade();
      setAllPayGradeName(response.data);
    } catch (error) {
      setNotification({ open: true, message: "Failed fetch the  Salary c. Please try again.", severity: "error" });
    }
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
        const formData = new FormData();
        formData.append(
            "employee",
            new Blob([JSON.stringify(values)], { type: "application/json" })
        );
        formData.append("profileImage", employee.profileImage);

        const response = await createEmployee(formData);
        if (response.status === 201) {
            resetForm();
            setNotification({ open: true, message: "Employee created successfully!", severity: "success" });
            if (onEmployeeCreated) onEmployeeCreated(response.data.id);
        } else {
            // Combine error messages in case of a non-201 response
            setNotification({ open: true, message: "Failed to create employee. Please try again.", severity: "error" });
        }
    } catch (error) {
        let errorMessage = "Failed to create employee. Please try again.";
        
        if (error.response) {
            console.error("Server responded with an error:", error.response.data);
            // Combine server error messages if available
            errorMessage = error.response.data.message || errorMessage; // Adjust based on your error response structure
        } else {
            console.error("An error occurred while updating the employee:", error.message);
            errorMessage = "An unexpected error occurred. Please try again.";
        }

        setNotification({ open: true, message: errorMessage, severity: "error" });
    }
};


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      profileImage: file,
    }));
    setImagePreview(URL.createObjectURL(file));
  };

  const checkoutSchema = yup.object().shape({
    employeeId: yup.string().required("Employee ID cannot be blank"),
    email: yup.string().required("Employee ID cannot be blank"),

    payGradeId: yup.string().required("Pay Grade Name cannot be blank"),
    firstName: yup.string().required("First name cannot be blank"),
    middleName: yup.string().required("Middle name cannot be blank"),
    lastName: yup.string().required("Last name cannot be blank"),
    gender: yup.string().required("Gender cannot be null"),
    dateOfBirth: yup
      .date()
      .required("Date of birth is required")
      .max(new Date(), "Date of birth must be in the past")
      .typeError("Date of birth must be a valid date"),
    maritalStatus: yup.string().required("Marital status cannot be null"),
    employmentType: yup.string().required("Employment type cannot be null"),
    hiredDate: yup
      .date()
      .required("Hired date cannot be null")
      .max(new Date(), "Hired date must be in the past or present")
      .typeError("Hired date must be a valid date"),
    endDate: yup
      .date()

      .min(new Date(), "End date must be in the future or present")
      .typeError("End date must be a valid date"),
    departmentId: yup
      .string()
      .required("Department ID cannot be null")
      .typeError("Department ID must be a number"),
    jobId: yup
      .string()
      .required("Job ID cannot be null")
      .typeError("Job ID must be a number"),
  });

  const handleIconClick = () => {
    navigate(`/employee/list`);
  };

  const refreshPage = () => {
    window.location.reload();
  };


  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <Box >
      {/* <ToolbarComponent mainIconType="search" onMainIconClick={handleIconClick} refreshPage={refreshPage} /> */}
      {/* <Header subtitle="Create new employee" /> */}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={employee}
        validationSchema={checkoutSchema}

      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
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
                label="Employee ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.employeeId}
                name="employeeId"
                error={!!touched.employeeId && !!errors.employeeId}
                helperText={touched.employeeId && errors.employeeId}
                sx={{ gridColumn: "span 2" }}

              />



              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel>Please Select Gender</InputLabel>
                <Select
                  label="Gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  displayEmpty
                  inputProps={{ "aria-label": "gender" }}
                  error={!!touched.gender && !!errors.gender}
                  name="gender"
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                type="text"
                label="Firs Name"
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
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                type="email"
                label="Enter Your Email"
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
                type="date"
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateOfBirth}
                name="dateOfBirth"
                error={!!touched.dateOfBirth && !!errors.dateOfBirth}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
                sx={{ gridColumn: "span 2" }}
              />
              
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="marital-status-label">Marital Status</InputLabel>
                <Select
                  labelId="marital-status-label"
                  value={values.maritalStatus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="maritalStatus"
                  error={!!touched.maritalStatus && !!errors.maritalStatus}
                >


                  <MenuItem value="">
                    <em>Select Marital Status</em>
                  </MenuItem>
                  <MenuItem value="SINGLE">Single</MenuItem>
                  <MenuItem value="MARRIED">Married</MenuItem>
                  <MenuItem value="DIVORCED">Divorced</MenuItem>
                  <MenuItem value="WIDOWED">Widowed</MenuItem>
                  <MenuItem value="SEPARATED">Separated</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
                <ErrorMessage name="maritalStatus" component="div" />
              </FormControl>

              <FormControl sx={{ gridColumn: "span 2" }}>
                <Select
                  label="Employment Type"
                  value={values.employmentType}

                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  displayEmpty
                  inputProps={{ "aria-label": "Employment Type" }}
                  name="employmentType"
                  error={!!touched.employmentType && !!errors.employmentType}
                  sx={{ gridColumn: "span 1" }}
                >
                  <MenuItem value="">
                    <em> Please Select Employment Type</em>
                  </MenuItem>


                  <MenuItem value="PERMANENT">Permanent</MenuItem>
                  <MenuItem value="CONTRACT">Contract</MenuItem>
                </Select>

              </FormControl>

              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="jobtitle-label">Job Title</InputLabel>
                <Select
                  labelId="jobtitle-label"
                  value={values.jobId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  name="jobId"
                  error={!!touched.jobId && !!errors.jobId}
                >
                  <MenuItem value="">
                    <em>Select JobTitlte</em>
                  </MenuItem>
                  {jobRegistration.map((jobtitle) => (
                    <MenuItem key={jobtitle.id} value={jobtitle.id}>
                      {jobtitle.jobTitle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                  sx={{ flexGrow: 1, flexShrink: 1, minWidth: 0 ,gridColumn: "span 2"}}
                  error={!!touched.payGradeId && !!errors.payGradeId}
                >
                  <InputLabel id="language-label">Select PayGrade Name</InputLabel>
                  <Select
                    labelId="language-label"
                    value={values.payGradeId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="payGradeId"
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>Select PayGrade Name</em>
                    </MenuItem>
                    {allPayGradeName.map((PayGrade) => (
                      <MenuItem key={PayGrade.id} value={PayGrade.id}>
                        {PayGrade.salary}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.payGradeId && errors.payGradeId && (
                    <FormHelperText>{errors.payGradeId}</FormHelperText>
                  )}
                </FormControl>




              <Box display="flex" alignItems="center" sx={{ gridColumn: "span 2" }}>
                <FormControl
                  sx={{ flexGrow: 1, flexShrink: 1, minWidth: 0 }}
                  error={!!touched.titleNameId && !!errors.titleNameId}
                >
                  <InputLabel id="language-label">Select Title Name</InputLabel>
                  <Select
                    labelId="language-label"
                    value={values.titleNameId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="titleNameId"
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>Select Title Name</em>
                    </MenuItem>
                    {allTitleName.map((title) => (
                      <MenuItem key={title.id} value={title.id}>
                        {title.titleName}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.titleNameId && errors.titleNameId && (
                    <FormHelperText>{errors.titleNameId}</FormHelperText>
                  )}
                </FormControl>
                <IconButton
                  sx={{ flexShrink: 0, marginLeft: 1 }}
                  onClick={handleAddCategoryClick}
                  title="Click to register termination type"
                >
                  <Add />
                </IconButton>
              </Box>

            




              <TextField
                fullWidth

                type="date"
                label="Hired Date"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hiredDate}
                name="hiredDate"
                error={!!touched.hiredDate && !!errors.hiredDate}
                helperText={touched.hiredDate && errors.hiredDate}
                sx={{ gridColumn: "span 2" }}
              />
              
              {values.employmentType === 'CONTRACT' && (
                <TextField
                  fullWidth

                  type="date"
                  label="End Date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.endDate}
                  name="endDate"
                  error={!!touched.endDate && !!errors.endDate}
                  helperText={touched.endDate && errors.endDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
              )}
              <TextField
                fullWidth

                type="text"
                label="Duty Station"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dutyStation}
                name="dutyStation"
                error={!!touched.dutyStation && !!errors.dutyStation}
                helperText={touched.dutyStation && errors.dutyStation}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth

                type="text"
                label="FYDA Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fydaNumber}
                name="fydaNumber"
                error={!!touched.fydaNumber && !!errors.fydaNumber}
                helperText={touched.fydaNumber && errors.fydaNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth

                type="text"
                label="Passport Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.passportNumber}
                name="passportNumber"
                error={!!touched.passportNumber && !!errors.passportNumber}
                helperText={touched.passportNumber && errors.passportNumber}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl
                sx={{ gridColumn: "span 2" }}
                error={!!touched.nationality && !!errors.nationality}
              >
                <InputLabel id="country-label">Select Country</InputLabel>
                <Select
                  labelId="country-label"
                  value={values.nationality}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="nationality"
                >
                  <MenuItem value="">
                    <em>Select Country</em>
                  </MenuItem>
                  {allCountries.map((country) => (
                    <MenuItem key={country.code} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.nationality && errors.nationality && (
                  <FormHelperText>{errors.nationality}</FormHelperText>
                )}
              </FormControl>

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
                label="Pension Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pensionNumber}
                name="pensionNumber"
                error={!!touched.pensionNumber && !!errors.pensionNumber}
                helperText={touched.pensionNumber && errors.pensionNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
                {imagePreview && (
                  <Box
                    sx={{
                      gridColumn: "span 4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100px",
                    }}
                  >
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  </Box>
                )}


                <Box sx={{ gridColumn: "span 4" }}>
                  <TextField
                    fullWidth

                    type="file"
                    label="Profile Image"
                    onBlur={handleBlur}
                    onChange={handleFileUpload}
                    name="profileImage"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "100%" }} // Adjust the width of the input field
                  />

                </Box>

              </Box>


              <DepartmentTree
                name="departmentId"
                handleSelect={(selectedDepartmentId) =>
                  handleChange({
                    target: { name: 'departmentId', value: selectedDepartmentId },
                  })
                }
              />




            </Box>
            <Box display="flex" justifyContent="center" mt="70px">
              <Button type="submit" color="secondary" variant="contained">
                Create Employee
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
        {/* Dialog for adding new category */}
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Header subtitle=" Create Title  Name" />
          <IconButton
            onClick={handleClose}
            style={{ position: 'absolute', right: 8, top: 4 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        
        <Formik
          initialValues={titleNameIntialValues}
          validationSchema={titleNameSchema}
          onSubmit={handleTitleNameFormSubmit}
        >
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Title Name"
                      variant="outlined"
                      name="titleName"
                      value={values.titleName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.titleName && !!errors.titleName}
                      helperText={touched.titleName && errors.titleName}
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
                <Grid item xs={12} md={3} > 
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
       {/* Snackbar for Notifications */}
       <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioned at top-right
      >
        <Alert onClose={handleCloseSnackbar} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>



    </Box>
  );
};

export default CreateEmployee;
