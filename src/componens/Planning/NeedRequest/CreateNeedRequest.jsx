import React from "react";
import {
  Box,
  Button,
  TextField,FormControl ,Select ,MenuItem ,InputLabel 
} from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { createNeedRequest, REST_API_BASE_URL } from "../../../../Services/apiData";
import Header from "../../Header";
import ToolbarComponent from "../../Training/ToolbarComponent";
import DepartmentTree from "../../Employee/DepartmentTree";
import { useState,useEffect } from "react";
import axios from "axios";

const CreateNeedRequest = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [staf, setStaf] = useState([]);
  const [jobRegistrations, setJobRegistrations] = useState([]);
  const [jobGrades, setJobGrades] = useState(null);



  
  

  const handleFormSubmit = async (values) => {
    try {
      console.log("Submitting the following values:", values);
      await createNeedRequest( values); // Assuming createSkill function takes id and values
      console.log("Form data submitted successfully!");
   
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  };
  

  const initialValues = {
    
    noOfPosition: "",
    employmentType: "",
    howToBeFilled: "",
    whenToBe: "",
    remark: "",
    budgetYearId: 1,
    departmentId:"" ,
    staffPlanId: 1
  };

  useEffect(() => {
    fetchStaffByDepartementId();
    fetchJobRegistrations();
    fetchJobGrade();
  }, []);

  const fetchStaffByDepartementId = async (departmentId) => {
    try {
      const response = await fetch(
        `${REST_API_BASE_URL}staff-plans/1/departments/${departmentId}`
      

      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const stafData = await response.json();
      setStaf(stafData);

      console.log("Staff Data:", stafData);
    } catch (error) {
      console.error("Failed to fetch Staff details:", error);
    }
  };

  
  const fetchJobRegistrations = async (departmentId) => {
    try {
      const response = await axios.get(
        `${REST_API_BASE_URL}job-registrations/1/jobs/${departmentId}`
      );
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jobRegistrationsData = response.data;
      setJobRegistrations(jobRegistrationsData);
      console.log("Job Registrations:", jobRegistrationsData);

      // Fetch job grades for each job registration
      if (jobRegistrationsData.length > 0) {
        const jobGradeId = jobRegistrationsData[0].jobGradeId;
        await fetchJobGrade(jobGradeId);
      }
    } catch (error) {
      console.error("Error fetching job registrations:", error);
    }
  };

  const fetchJobGrade = async (jobGradeId) => {
    try {
      const response = await fetch(
        `${REST_API_BASE_URL}job-grades/1/get/${jobGradeId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jobGradeData = await response.json();
      setJobGrades(jobGradeData);
      console.log("Job Grade Data:", jobGradeData);
    } catch (error) {
      console.error("Failed to fetch job grade details:", error);
    }
  };


  const checkoutSchema = yup.object().shape({
   
  });

  const handleIconClick = () => {
    navigate("/employee/SkillAction", { state: { employerId } });
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Box m="20px">
       <ToolbarComponent mainIconType="search" onMainIconClick={handleIconClick} refreshPage={refreshPage} />
      <Header  subtitle="Create Need Request" />
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
                  <MenuItem value="Permanent">Permanent</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Temporary">Temporary</MenuItem>
                  <MenuItem value="DayLabour">DayLabour</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              
              <FormControl sx={{ gridColumn: "span 2" }}>
               

               <Select
                 label="when_To_Be"
                 value={values.whenToBe}
                
                 onChange={handleChange}
                 onBlur={handleBlur}
                 required
                 displayEmpty
                 inputProps={{ "aria-label": "when_To_Be" }}
                 name="whenToBe"
                 error={!!touched.whenToBe && !!errors.whenToBe}
                 sx={{ gridColumn: "span 1" }}
               >
                 <MenuItem value="">
                   <em> Please Select when To Be</em>
                 </MenuItem>
                 <MenuItem value="January">January</MenuItem>
                 <MenuItem value="February">February</MenuItem>
                 <MenuItem value="March">March</MenuItem>
                 <MenuItem value="April">April</MenuItem>
                 <MenuItem value="May">May</MenuItem>

                 <MenuItem value="June">June</MenuItem>
                 <MenuItem value="July">July</MenuItem>
                 <MenuItem value="August">August</MenuItem>
                 <MenuItem value="September">September</MenuItem>

                 <MenuItem value="October">July</MenuItem>
                 <MenuItem value="November">August</MenuItem>
                 <MenuItem value="December">September</MenuItem>
                 <MenuItem value="Today">Today</MenuItem>

               </Select>
             </FormControl>
   
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="recruitmentType-label">recruitment Type</InputLabel>
                <Select
                  labelId="recruitmentType-label"
                  value={values.howToBeFilled}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="howToBeFilled"
                  error={!!touched.howToBeFilled && !!errors.howToBeFilled}
                >

                  <MenuItem value="">
                    <em>Select Recruitment Type</em>
                  </MenuItem>
                  <MenuItem value="InternalRecruitment">InternalRecruitment</MenuItem>
                  <MenuItem value="ExternalRecruitment">ExternalRecruitment</MenuItem>
                  <MenuItem value="Transfer">Transfer</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
               
              </FormControl>

             
              <TextField
                fullWidth
               // variant="filled"
                type="text"
                label="No_Of_Position"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.noOfPosition}
                name="noOfPosition"
                error={!!touched.noOfPosition && !!errors.noOfPosition}
                helperText={touched.noOfPosition && errors.noOfPosition}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
               multiline
                rows={2}//  variant="filled"
               
                label="remark"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.remark}
                name="remark"
                error={!!touched.remark && !!errors.remark}
                helperText={touched.remark && errors.remark}
                sx={{ gridColumn: "span 2" }}
              />
               {/* <DepartmentTree
                name="departmentId"
                handleSelect={(selectedDepartmentId) =>
                  handleChange({
                    target: { name: 'departmentId', value: selectedDepartmentId },
                  })
                }
              /> */}
               <DepartmentTree
                name="departmentId"
                handleSelect={(selectedDepartmentId) => {
                  setFieldValue("departmentId", selectedDepartmentId); // Set form value for departmentId
                  fetchStaffByDepartementId(selectedDepartmentId); 
                  fetchJobRegistrations(selectedDepartmentId);
                }}
              />

            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Skill
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateNeedRequest;