import {
    Box,
    Button,
    TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText
  } from "@mui/material";
  import * as yup from "yup";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import { useNavigate } from "react-router-dom";
  import { Formik } from "formik";
  import Header from "../../Header";
  import {  createInternshipStudents, getInternshipStudents, listOfBudgetYears, listOfUniversity, REST_API_BASE_URL, updateInternshipStudents } from "../../../../Services/apiData";
  import ToolbarComponent from "../ToolbarComponent";
  import LocationTree from "../../Employee/LocationTress";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { useLocation } from "react-router-dom";

  
  const UpdateInternshipStudents = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [allbudgetYearList, setAllbudgeYeartList] = useState([]);
    const [allUniversityList, setAllUniversityList] = useState([]);
    const location = useLocation();
    const interStudentId = location?.state?.id;
    console.log(interStudentId);
  

    const [interStudent, setInterStudent] = useState({ 
        budgetYearId: "",
        semester: "",
        universityId: "",
        startDate: "",
        endDate: "",
        firstName: "",
        middleName: "",
        lastName: "",
        phoneNumber: "",
        stream: "",
        locationId: "",
        remark: "",
        idNumber: ""
        });

        useEffect(() => {
            fetchInterStudent();
          }, []);
        
          const fetchInterStudent = async () => {
            try {
              const response = await getInternshipStudents(interStudentId);
              const data = response.data; 
              setInterStudent(data);
              console.log(data);
            } catch (error) {
              console.error("Failed to fetch University:", error.message);
            }
          };
      

  
  
  
          useEffect(() => {
            fetchBudgetYears();
            fetchUniversity();
          }, []);
        
        
          const fetchBudgetYears = async () => {
            try {
                const response = await listOfBudgetYears();
                setAllbudgeYeartList(response.data);
                console.log("The list of budget year:", response.data);
            } catch (error) {
                console.error("Error fetching budget years:", error);
            }
        };
        
          const fetchUniversity = async () => {
            try {
              const response = await listOfUniversity();
              setAllUniversityList(response.data);
              console.log("The list of University are:", response.data);
            } catch (error) {
              console.error("Error fetching university:", error);
            }
          };
        
  
    const handleFormSubmit = async (values, { resetForm }) => {
      try {
        await updateInternshipStudents(interStudentId,values);
        navigate('/training/listInternstudent');

        console.log("Form data submitted successfully!");
        resetForm(); 
      } catch (error) {
        console.error("Failed to submit form data:", error);
      }
    };
  
    const handleIconClick = () => {
      navigate('/training/listInternstudent');
    };
  
    const refreshPage = () => {
      window.location.reload();
    };
  
  
  
 
  
    const checkoutSchema = yup.object().shape({
      budgetYearId: yup.number().required("Budget year id cannot be null"),
      semester: yup.string().required("Semester cannot be null"), // Assuming semester is a string in this context
  
      startDate: yup
        .date()
        .nullable()
        .required("Start date cannot be null")
        .min(new Date(), "Start date must be in future or present"),
      endDate: yup
        .date()
        .nullable()
        .required("End date cannot be null")
        .min(
          yup.ref('startDate'),
          "End date must be after or the same day as start date"
        ),
      firstName: yup.string().required("First name cannot be blank"),
      middleName: yup.string().required("Middle name cannot be blank"),
      lastName: yup.string().required("Last name cannot be blank"),
      idNumber: yup.string().nullable(),
      phoneNumber: yup
        .string()
        .required("Phone number cannot be null")
        .matches(/\+?[0-9. ()-]{7,25}/, "Invalid phone number"),
      stream: yup.string().required("Stream cannot be blank"),
      locationId: yup.number().required("Location id cannot be null"),
      remark: yup.string().nullable(),
      university: yup.object().nullable(), // Assuming university is an object
  
    });
  
  
    return (
      <Box m="20px">
        <ToolbarComponent
          mainIconType="search"
          onMainIconClick={handleIconClick}
          refreshPage={refreshPage}
        />
        <Header subtitle="Update Student for Entern" />
  
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={interStudent}
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
                  fullWidt
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
                <FormControl
                  sx={{ gridColumn: "span 2" }}
                  error={!!touched.budgetYearId && !!errors.budgetYearId}
                >
                  <InputLabel id="language-label">Select Budget Year</InputLabel>
                  <Select
                    labelId="language-label"
                    value={values.budgetYearId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="budgetYearId"
                  >
                    <MenuItem value="">
                      <em>Select Budget Year</em>
                    </MenuItem>
                    {allbudgetYearList.map((budget) => (
                      <MenuItem key={budget.id} value={budget.id}>
                        {budget.budgetYear}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.budgetYearId && errors.budgetYearId && (
                    <FormHelperText>{errors.budgetYearId}</FormHelperText>
                  )}
                </FormControl>
  
                <FormControl
                  sx={{ gridColumn: "span 2" }}
                  error={!!touched.universityId && !!errors.universityId}
                >
                  <InputLabel id="language-label">Select University </InputLabel>
                  <Select
                    labelId="university-label"
                    value={values.universityId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="universityId"
                  >
                    <MenuItem value="">
                      <em>Select University</em>
                    </MenuItem>
                    {allUniversityList.map((university) => (
                      <MenuItem key={university.id} value={university.id}>
                        {university.universityName}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.universityId && errors.universityId && (
                    <FormHelperText>{errors.universityId}</FormHelperText>
                  )}
                </FormControl>
  
                <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
  
  
                  <InputLabel>Choose Semester</InputLabel>
                  <Select
                    label="Semester"
                    value={values.semester}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    displayEmpty
                    inputProps={{ "aria-label": "semester" }}
                    name="semester"
                    error={
                      !!touched.decision && !!errors.semester
                    }
                  >
  
                    <MenuItem value="I">I</MenuItem>
                    <MenuItem value="II">II</MenuItem>
                    <MenuItem value="III">III</MenuItem>
                    <MenuItem value="IV">IV</MenuItem>
  
                  </Select>
                  {touched.semester && errors.semester && (
                    <FormHelperText error>
                      {errors.semester}
                    </FormHelperText>
                  )}
                </FormControl>
  
  
                <TextField
                  fullWidth
                  type="text"
                  label=" Phone Number"
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
                  label="Stream"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.stream}
                  name="stream"
                  error={!!touched.stream && !!errors.stream}
                  helperText={touched.stream && errors.stream}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  label="Id Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.idNumber}
                  name="idNumber"
                  error={!!touched.idNumber && !!errors.idNumber}
                  helperText={touched.idNumber && errors.idNumber}
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
  
  export default UpdateInternshipStudents;
  