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
  import {  createInternshipPayment, createInternshipStudents, REST_API_BASE_URL } from "../../../../Services/apiData";
  import ToolbarComponent from "../ToolbarComponent";
  import LocationTree from "../../Employee/LocationTress";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { useLocation } from "react-router-dom";
  
  const CreateInterbshipPayment = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const location = useLocation();
    const interStudentId = location?.state?.id;
    console.log(interStudentId);


    
  
    const handleFormSubmit = async (values, { resetForm }) => {
      try {
        await createInternshipPayment(values);
        console.log("Form data submitted successfully!");
        resetForm(); // Reset form after successful submission
      } catch (error) {
        console.error("Failed to submit form data:", error);
      }
    };
  
    const handleIconClick = () => {
      navigate('/training/listInternPayement');
    };
  
    const refreshPage = () => {
      window.location.reload();
    };

   
    const initialValues = {
      referenceLetter: "",
      startDate: "",
      endDate: "",
      paymentAmount:"",
      internId:interStudentId,
      remark: "",
   
    };
  
    const checkoutSchema = yup.object().shape({
        referenceLetter: yup
          .string()
          .required("Reference letter cannot be blank"),
      
        startDate: yup
          .date()
          .nullable()
          .required("Start date cannot be null"),
      
        endDate: yup
          .date()
          .nullable()
          .required("End date cannot be null")
          .min(yup.ref('startDate'), "End date must be after or the same day as start date"),
      
        paymentAmount: yup
          .number()
          .nullable()
          .required("Payment amount cannot be null")
          .min(0, "Payment amount must be non-negative"),
      
        remark: yup
          .string()
          .nullable(),
          
       
      });
      
  
  
    return (
      <Box m="20px">
        <ToolbarComponent
          mainIconType="search"
          onMainIconClick={handleIconClick}
          refreshPage={refreshPage}
        />
        <Header subtitle="Create Intern Payment" />
  
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
                  label="Reference Letter"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.referenceLetter}
                  name="referenceLetter"
                  error={!!touched.referenceLetter && !!errors.referenceLetter}
                  helperText={touched.referenceLetter && errors.referenceLetter}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  type="number"
                  label="Payment Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.paymentAmount}
                  name="paymentAmount"
                  error={!!touched.paymentAmount && !!errors.paymentAmount}
                  helperText={touched.paymentAmount && errors.paymentAmount}
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
  
  export default CreateInterbshipPayment;
  