import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Header from "../../Header";
import { createAddress, listLocation} from "../../../../Services/apiData";
import { useEffect,useState } from "react";
import { useIds } from "../../../IdContext";
import SearchComponent from "../../SearchComponent ";



const CreateAddress = ({ id }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { ids } = useIds();
  const employerId = id;
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  

  const [locations, setLocations] = useState([]);

  

  // const handleFormSubmit = async (values) => {
  //   try {                                                                
  //     await createAddress(employerId, values);
  //     setNotification({ open: true, message: "Address created successfully!", severity: "success" });
      
  //     setTimeout(() => {
  //       navigate("/employee/AddressAction", { state: { employerId } });
  //     }, 1000); 
  //   } catch (error) {
  //     setNotification({ open: true, message: "Failed to create address. Please try again.", severity: "error" });
  //   }
  // };

    
  const handleFormSubmit = async (values) => {
    try {
      const response = await  createAddress(employerId, values);

  
      if (response.status === 201) {
        // Success notification
        setNotification({ open: true, message: "Employee address created successfully!", severity: "success" });
  
        // Delay navigation to give time for notification visibility
        setTimeout(() => {
          navigate("/employee/AddressAction", { state: { employerId } });
        }, 250); // Show for 2 seconds before navigating
      } else {
        // Handle unexpected response status
        setNotification({ open: true, message: `Error creating address. Status code: ${response.status}`, severity: "error" });
        console.error('Error creating address. Status code:', response.status);
      }
    } catch (error) {
      // Handle errors from the server and network errors
      if (error.response) {
        // Server error with response data
        const serverMessage = error.response.data.message || "Server responded with an error.";
        setNotification({ open: true, message: `Failed to create address: ${serverMessage}`, severity: "error" });
        console.error('Server responded with an error:', error.response.data);
      } else {
        // Network or other unexpected error
        setNotification({ open: true, message: "Failed to create address. Please check your connection and try again.", severity: "error" });
        console.error('Error create address:', error.message);
      }
    }
  };
  

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await listLocation();
      setLocations(response.data);
    } catch (error) {
      setError(error.message);
      setNotification({ open: true, message: "Failed to fetch location. Please try again.", severity: "error" });
    }
  };
  const handleCloseSnackbar = () => {
    setNotification({ ...notification, open: false });
  };
 

  const initialValues = {
    addressType: "",
    locationId:"",
    houseNumber: "",
    homeTelephone: "",
    officeTelephone: "",
    email: "",
    mobileNumber:"",
    poBox:"",
  };

  const checkoutSchema = yup.object().shape({
    addressType: yup.string().required("addressType  is required"),
    locationId: yup.string().required("locationId  is required"),
    houseNumber: yup.string().required("houseNumber  is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    mobileNumber: yup.string().matches(/^\d{10}$/, "Invalid phone number").required("Phone number cannot be blank"),
   
    
  });
 

  return (
    <Box m="20px"> 
    <SearchComponent 
     label="Enter Id to Get all Employee Address"
     path="/employee/AddressAction"
     actionLabel="All Address"
     ids={ids}
  
    />
 
      <Header
        subtitle="Create address of employer"
      />

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
               <FormControl  sx={{ gridColumn: "span 2" }}>
              <InputLabel id="locationId">Location</InputLabel>
                <Select
                  labelId="locationId"
                  value={values.locationId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  name="locationId"
                  error={!!touched.locationId && !!errors.locationId}
                >
                  <MenuItem value="">
                    <em>Select Location</em>
                  </MenuItem>
                  {locations.map((location) => (
                    <MenuItem key={location.id} value={location.id}>
                      {location.locationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              
              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel>Please Select Address for</InputLabel>
                <Select
                label="Address For"
                value={values.addressType}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                required
                displayEmpty
                inputProps={{ "aria-label": "addressType" }}
                name="addressType"
                error={!!touched.addressType && !!errors.addressType}
                helperText={touched.addressType && errors.addressType}
                sx={{ gridColumn: "span 2" }}
              >
                  
               <MenuItem value="PERMANENT">permanent</MenuItem>
                <MenuItem value="TEMPORARY">temporary</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="text"
                label="House Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.houseNumber}
                name="houseNumber"
                error={!!touched.houseNumber && !!errors.houseNumber}
                helperText={touched.houseNumber && errors.houseNumber}
                sx={{ gridColumn: "span 2" }}
              />
              
          
              <TextField
                fullWidth
                type="text"
                label="Home Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.homeTelephone}
                name="homeTelephone"
                error={!!touched.homeTelephone && !!errors.homeTelephone}
                helperText={touched.homeTelephone && errors.homeTelephone}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                type="text"
                label="Office Telephone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.officeTelephone}
                name="officeTelephone"
                error={!!touched.officeTelephone && !!errors.officeTelephone}
                helperText={touched.officeTelephone && errors.officeTelephone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="text"
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
                label="Mobile Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mobileNumber}
                name="mobileNumber"
                error={!!touched.mobileNumber && !!errors.mobileNumber}
                helperText={touched.mobileNumber && errors.mobileNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="text"
                label="P.O.Box"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pobox}
                name="pobox"
                error={!!touched.pobox && !!errors.pobox}
                helperText={touched.pobox && errors.pobox}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Adress
              </Button>
            </Box>
          </form>
        )}
      </Formik>
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

export default CreateAddress;
