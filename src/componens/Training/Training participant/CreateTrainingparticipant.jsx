import {
  Box,
  Button,
  TextField,
  FormControl,
  Autocomplete,
} from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Header from "../../Header";
import { useIds } from "../../../IdContext";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import ToolbarComponent from "../ToolbarComponent";
import { addTrainingparticipant, getEmployeeByEmployeId, REST_API_BASE_URL } from "../../../../Services/apiData";

const CreateTrainingparticipant = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { employeeIds } = useIds();
  const location = useLocation();
  const trainingId = location?.state?.id; 
   console.log(trainingId);
  const [employeeDetails, setEmployeeDetails] = useState(null);

  const fetchEmployeeDetails = async (employeeId) => {
    try {
      const response = await getEmployeeByEmployeId(employeeId)
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // With axios, the response is already parsed as JSON
      const data = response.data;
      setEmployeeDetails(data);
    } catch (error) {
      console.error("Failed to fetch employee details:", error);
    }
  };

  const handleIconClick = () => {
    navigate('/training/listTriningParticipant', { state: { trainingId } });
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      await addTrainingparticipant(trainingId, values);
      console.log("The participant trainer is successfully created");
      resetForm();
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  };

  const initialValues = {
    participantEmployeeId: "",
    reason: "",
    searchBy: "",
    firstName: "",
    middleName: "",
    lastName: "",
  };

  const checkoutSchema = yup.object().shape({
    participantEmployeeId: yup
      .string()
      .required("Requester ID is required")
      .test("is-valid", "Requester ID does not exist", (value) =>
        employeeIds.includes(value)
      ),
    reason: yup.string().required("Remark is required"),
  });

  return (
    <Box m="20px">
      <ToolbarComponent
        mainIconType="search"
        onMainIconClick={handleIconClick}
        refreshPage={refreshPage}
      />
      <Header subtitle="Create Participant of Training" />
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
          setFieldValue,
          handleSubmit,
        }) => {
          useEffect(() => {
            if (values.participantEmployeeId) {
              fetchEmployeeDetails(values.participantEmployeeId);
            }
          }, [values.participantEmployeeId]);

          useEffect(() => {
            if (employeeDetails) {
              setFieldValue("firstName", employeeDetails.firstName);
              setFieldValue("middleName", employeeDetails.middleName);
              setFieldValue("lastName", employeeDetails.lastName);
            }
          }, [employeeDetails, setFieldValue]);

          return (
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
                  <Autocomplete
                    freeSolo
                    options={employeeIds}
                    onChange={(event, value) =>
                      setFieldValue("participantEmployeeId", value)
                    }
                    onInputChange={(event, value) =>
                      setFieldValue("participantEmployeeId", value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Trainer ID"
                        onBlur={handleBlur}
                        name="participantEmployeeId"
                        error={!!touched.participantEmployeeId && !!errors.participantEmployeeId}
                        helperText={touched.participantEmployeeId && errors.participantEmployeeId}
                      />
                    )}
                  />
                </FormControl>

                <TextField
                  fullWidth
                  type="text"
                  label="Trainer First Name"
                  value={values.firstName}
                  name="firstName"
                  disabled
                  InputLabelProps={{
                    shrink: !!values.firstName,
                  }}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  type="text"
                  label="Trainer Middle Name"
                  value={values.middleName}
                  name="middleName"
                  disabled
                  InputLabelProps={{
                    shrink: !!values.middleName,
                  }}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  type="text"
                  label="Trainer Last Name"
                  value={values.lastName}
                  name="lastName"
                  disabled
                  InputLabelProps={{
                    shrink: !!values.lastName,
                  }}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  type="text"
                  label="Reason"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.reason}
                  name="reason"
                  error={!!touched.reason && !!errors.reason}
                  helperText={touched.reason && errors.reason}
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="primary" variant="contained">
                  Create Participant
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CreateTrainingparticipant;
