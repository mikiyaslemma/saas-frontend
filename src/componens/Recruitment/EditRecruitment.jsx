// import {
//   Box,
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel
// } from "@mui/material";
// import * as yup from "yup";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useNavigate } from "react-router-dom";
// import { Formik } from "formik";
// import Header from "../Header";
// import { addRecruitment, editRecruitment, getEducationById, getRecruitmentbyId } from "../../../Services/apiData";
// import { useIds } from '../../IdContext';
// import { useLocation } from 'react-router-dom';
// import { useState,useEffect } from "react";
// import ToolbarComponent from "../Training/ToolbarComponent";


// const EditRecruitment = () => {
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const navigate = useNavigate();
//   const { employeeIds } = useIds();
//   const location = useLocation();
//   const recruitmentId = location?.state?.id;
//   const requesterEmployeeId = location?.state?.requesterEmployeeId;

//   console.log(`employeeId are${employeeIds}`)
//     const [employee, setEmployee] = useState({});
    
//   const [requesterInfo, setRequesterInfo] = useState({
//     fullName: "",
//     employeeId: ""
//   });


//   const [recruiment, setRecruiment] = useState({  
//     requesterEmployeeId: "",
//     departmentId: "",
//     numberOfEmployeesRequested: "",
//     recruitmentType:"",
//     recruitmentMode:"",
//     remark:"",
// });


//   const fetchEmployee = async () => {
//     try {
//       const response = await getEducationById(requesterEmployeeId);
//       const data = response.data;

//       setEmployee(data);

//       // Set the requester info (full name and employee ID)
//       setRequesterInfo({
//         fullName: `${data.firstName} ${data.middleName} ${data.lastName}`,
//         employeeId: data.employeeId,
//       });

//     } catch (error) {
//       console.error("Failed to fetch employee:", error.message);
//     }
//   };
  


//   useEffect(() => {
//     fetchRecruitment();
//     fetchEmployee();
//   }, []);

//   const fetchRecruitment = async () => {
//     try {
//       const response = await getRecruitmentbyId(recruitmentId);
//       const data = response.data;
//       data.recruitmentMode =data.recruitmentMode.toUpperCase();
//       data.recruitmentType =data.recruitmentType.toUpperCase();
     
//       setRecruiment({
//         ...data,
//         requesterEmployeeId: data.requesterEmployeeId // Ensure the requesterId field is properly set
       
//       });
//       console.log(data); // Log the entire response object to inspect its structure
//     } catch (error) {
//       console.error("Failed to fetch recruitment:", error.message);
//     }
//   };
  
  

//   const handleFormSubmit = async (values) => {
//     try {
//       const response = await editRecruitment(recruitmentId, values);
//       if (response.status === 200) {
//         console.log('Recruitment updated successfully!');
//         navigate('/recruitment/list', { state: { recruitmentId } });
//       } else {
//         console.error('Error updating recruitment. Status code:', response.status);
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error('Server responded with an error:', error.response.data);
//       } else {
//         console.error('An error occurred while updating the recruitment:', error.message);
//       }
//     }
//   };
  

//   const checkoutSchema = yup.object().shape(
//     {
//        requesterEmployeeId: yup
//       .string()
//       .required('Requester ID is required'),
//     numberOfEmployeesRequested: yup.string().required("numberOfEmployeesRequested  is required"),
//     recruitmentType: yup.string().required("recruitmentType  is required"),
//     recruitmentMode: yup.string().required("recruitmentMode  is required"),
//     remark: yup.string().required("remark  is required"),
   
    
//   });
//   const handleIconClick = () => {
//     navigate('/recruitment/list');
//   };

//   const refreshPage = () => {
//     window.location.reload();
//   };
  
//   return (
//     <Box >
//       <ToolbarComponent
//                 mainIconType="search"
//                 onMainIconClick={handleIconClick}
//                 refreshPage={refreshPage}
//             />
//       <Header
//         subtitle="Update the recruitment  "
//       />

//       <Formik
//         onSubmit={handleFormSubmit}
//         initialValues={recruiment}
//         validationSchema={checkoutSchema}
//         enableReinitialize
        
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//         }) => (
//           <form onSubmit={handleSubmit}>
//             <Box
//               display="grid"
//               gap="30px"
//               gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//               sx={{
//                 "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//               }}
//             >
              
            
//           <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
//                 <InputLabel>Requester ID</InputLabel>
//                 <Select
//                   label="requesterEmployeeId"
//                   value={values.requesterEmployeeId}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   required
//                   displayEmpty
//                   inputProps={{ "aria-label": "requesterEmployeeId" }}
//                   name="requesterEmployeeId"
//                   error={!!touched.requesterEmployeeId && !!errors.requesterEmployeeId}
//                   helperText={touched.requesterEmployeeId && errors.requesterEmployeeId}
//                 >
//                  {employeeIds.map((id) => (
//                 <MenuItem key={id} value={id}>
//                   {id}
//                 </MenuItem>
//               ))}
//                 </Select>
//               </FormControl>
// {/* 
//             <TextField
//                 fullWidth
//                 type="text"
//                 label="Requester Employee ID"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.requesterEmployeeId}
//                 name="requesterEmployeeId"
//                 error={!!touched.requesterEmployeeId && !!errors.requesterEmployeeId}
//                 helperText={touched.requesterEmployeeId && errors.requesterEmployeeId}
//                 sx={{ gridColumn: "span 2" }}
//               />
//            */}

//               <TextField
//                 fullWidth
//                 type="text"
//                 label="Full Name"
//                 value={requesterInfo.fullName}
//                 name="fullName"
//                 disabled
//                 sx={{ gridColumn: "span 2" }}
//             />

//               <TextField
//                 fullWidth
//                 type="text"
//                 label="Employee ID"
//                 value={requesterInfo.employeeId}
//                 name="employeeId"
//                 disabled
//                 sx={{ gridColumn: "span 2" }}
//               />
             
//              <TextField
//                 fullWidth
//                // variant="filled"
//                 type="number"
//                 label="numberOfEmployeesRequested"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.numberOfEmployeesRequested}
//                 name="numberOfEmployeesRequested"
//                 error={!!touched.numberOfEmployeesRequested && !!errors.numberOfEmployeesRequested}
//                 helperText={touched.numberOfEmployeesRequested && errors.numberOfEmployeesRequested}
//                 sx={{ gridColumn: "span 2" }}
//               />
//               <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
//                 <InputLabel>Please Select recruitmentType</InputLabel>
//                 <Select
//                   label="recruitmentType"
//                   value={values.recruitmentType}
//                //   variant="filled"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   required
//                   displayEmpty
//                   inputProps={{ "aria-label": "recruitmentType" }}
//                   name="recruitmentType"
//                   error={!!touched.recruitmentType && !!errors.recruitmentType}
//                   helperText={touched.recruitmentType && errors.recruitmentType}
//                 >
//                  <MenuItem value="PERMANENT">PERMANENT</MenuItem>
//                   <MenuItem value="CONTRACT">CONTRACT</MenuItem>
//                   <MenuItem value="TEMPORARY">TEMPORARY</MenuItem>
//                   <MenuItem value="OTHER">OTHER</MenuItem>
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
//                 <InputLabel>Please Select recruitmentMode</InputLabel>
//                 <Select
//                   label="recruitmentMode"
//                   value={values.recruitmentMode}
//                 //  variant="filled"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   required
//                   displayEmpty
//                   inputProps={{ "aria-label": "recruitmentMode" }}
//                   name="recruitmentMode"
//                   error={!!touched.recruitmentMode && !!errors.recruitmentMode}
//                   helperText={touched.recruitmentMode && errors.recruitmentMode}
//                 >
//                   <MenuItem value="INTERNAL">INTERNAL</MenuItem>
//                   <MenuItem value="EXTERNAL">EXTERNAL</MenuItem>
//                   <MenuItem value="TRANSFER">TRANSFER</MenuItem>
//                   <MenuItem value="OTHER">OTHER</MenuItem>
//                 </Select>
//               </FormControl>
            
              
//               <TextField
//                 fullWidth
//              //   variant="filled"
//                 type="text"
//                 label="remark"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.remark}
//                 name="remark"
//                 error={!!touched.remark && !!errors.remark}
//                 helperText={touched.remark && errors.remark}
//                 sx={{ gridColumn: "span 2" }}
//               />


//             </Box>
//             <Box display="flex" justifyContent="center" mt="20px">
//               <Button type="submit" color="secondary" variant="contained">
//                 Edit Recruitment
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// export default EditRecruitment;





import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Header from "../Header";
import { editRecruitment, getEmployeeById, getRecruitmentbyId } from "../../../Services/apiData";
import { useIds } from '../../IdContext';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import ToolbarComponent from "../Training/ToolbarComponent";

const EditRecruitment = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { employeeIds } = useIds();
  const location = useLocation();
  const recruitmentId = location?.state?.id;
  const requesterEmployeeId = location?.state?.requesterEmployeeId;

  const [employee, setEmployee] = useState({});
  const [recruitment, setRecruitment] = useState({
    requesterEmployeeId: "",
    departmentId: "",
    numberOfEmployeesRequested: "",
    recruitmentType: "",
    recruitmentMode: "",
    remark: "",
  });

  const [requesterInfo, setRequesterInfo] = useState({
    fullName: "",
    employeeId: ""
  });

  useEffect(() => {
    fetchRecruitment();
    fetchEmployee();
  }, []);

  const fetchRecruitment = async () => {
    try {
      const response = await getRecruitmentbyId(recruitmentId);
      const data = response.data;

      // Convert to uppercase and set the data
      setRecruitment({
        ...data,
        recruitmentMode: data.recruitmentMode.toUpperCase(),
        recruitmentType: data.recruitmentType.toUpperCase(),
        requesterEmployeeId: data.requesterEmployeeId,
      });
    } catch (error) {
      console.error("Failed to fetch recruitment:", error.message);
    }
  };

  const fetchEmployee = async () => {
    try {
      const response = await getEmployeeById(requesterEmployeeId);
      const data = response.data;

      setEmployee(data);

    

      // Set the requester info (full name and employee ID)
      setRequesterInfo({
        fullName: `${data.firstName} ${data.middleName} ${data.lastName}`,
        employeeId: data.employeeId,
        
      });
    } catch (error) {
      console.error("Failed to fetch employee:", error.message);
    }
  };

  const handleFormSubmit = async (values) => {
    console.log("Form Values:", values); // Debugging form values
    console.log("Recruitment ID:", recruitmentId); // Debugging recruitment ID
    
    try {
      const response = await editRecruitment(recruitmentId, values);
      
      if (response.status === 200) {
        console.log('Recruitment updated successfully!');
        navigate('/recruitment/list', { state: { recruitmentId } });
      } else {
        console.error('Error updating recruitment. Status code:', response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
      } else {
        console.error('An error occurred while updating the recruitment:', error.message);
      }
    }
  };

  // Simplified validation schema for testing
  const checkoutSchema = yup.object().shape({
    requesterEmployeeId: yup
      .string()
      .required('Requester ID is required'),
    numberOfEmployeesRequested: yup
      .string()
      .required("Number of Employees Requested is required"),
    recruitmentType: yup
      .string()
      .required("Recruitment Type is required"),
    recruitmentMode: yup
      .string()
      .required("Recruitment Mode is required"),
    remark: yup
      .string()
      .required("Remark is required"),
  });

  const handleIconClick = () => {
    navigate('/recruitment/list');
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Box>
      <ToolbarComponent
        mainIconType="search"
        onMainIconClick={handleIconClick}
        refreshPage={refreshPage}
      />
      <Header subtitle="Update the recruitment" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={recruitment}
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
              {/* Display requester's full name and employeeId */}
              <TextField
                fullWidth
                type="text"
                label="Full Name"
                value={requesterInfo.fullName}
                name="fullName"
                disabled
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="text"
                label="Employee ID"
                value={requesterInfo.employeeId}
                name="employeeId"
                disabled
                sx={{ gridColumn: "span 2" }}
              />
{/* 
              Requester Employee ID (Editable Field)
              <TextField
                fullWidth
                type="text"
                label="Requester Employee ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.requesterEmployeeId}
                name="requesterEmployeeId"
                error={!!touched.requesterEmployeeId && !!errors.requesterEmployeeId}
                helperText={touched.requesterEmployeeId && errors.requesterEmployeeId}
                sx={{ gridColumn: "span 2" }}
              /> */}

                <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel>Requester ID</InputLabel>
              <Select
                  label="requesterEmployeeId"
                  value={values.requesterEmployeeId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  displayEmpty
                  inputProps={{ "aria-label": "requesterEmployeeId" }}
                  name="requesterEmployeeId"
                  error={!!touched.requesterEmployeeId && !!errors.requesterEmployeeId}
                  helperText={touched.requesterEmployeeId && errors.requesterEmployeeId}
                >
                 {employeeIds.map((id) => (
                <MenuItem key={id} value={id}>
                  {id}
                </MenuItem>
                
              ))}
                </Select>
              </FormControl>
{/* 

              

              {/* Other form fields */}
              <TextField
                fullWidth
                type="number"
                label="Number of Employees Requested"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.numberOfEmployeesRequested}
                name="numberOfEmployeesRequested"
                error={!!touched.numberOfEmployeesRequested && !!errors.numberOfEmployeesRequested}
                helperText={touched.numberOfEmployeesRequested && errors.numberOfEmployeesRequested}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel>Please Select Recruitment Type</InputLabel>
                <Select
                  label="Recruitment Type"
                  value={values.recruitmentType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="recruitmentType"
                  error={!!touched.recruitmentType && !!errors.recruitmentType}
                >
                  <MenuItem value="PERMANENT">PERMANENT</MenuItem>
                  <MenuItem value="CONTRACT">CONTRACT</MenuItem>
                  <MenuItem value="TEMPORARY">TEMPORARY</MenuItem>
                  <MenuItem value="OTHER">OTHER</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel>Please Select Recruitment Mode</InputLabel>
                <Select
                  label="Recruitment Mode"
                  value={values.recruitmentMode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="recruitmentMode"
                  error={!!touched.recruitmentMode && !!errors.recruitmentMode}
                >
                  <MenuItem value="INTERNAL">INTERNAL</MenuItem>
                  <MenuItem value="EXTERNAL">EXTERNAL</MenuItem>
                  <MenuItem value="TRANSFER">TRANSFER</MenuItem>
                  <MenuItem value="OTHER">OTHER</MenuItem>
                </Select>
              </FormControl>

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
            </Box>

            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Edit Recruitment
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditRecruitment;

  
  