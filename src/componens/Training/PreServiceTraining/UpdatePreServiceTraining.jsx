import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Checkbox,
    ListItemText,
    Chip,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { getDocuments, getPreServiceCourseById, getPreServiceTrainingById, getPreServiceTrainingImageById, listEducationLevels, listFieldStudies, listOfBudgetYears, REST_API_BASE_URL, updatePreServiceTraining } from "../../../../Services/apiData";
import ToolbarComponent from "../ToolbarComponent";
import LayoutForCourse from "../LayoutForCourse";
import Header from "../../Header";
import LocationTree from "../../Employee/LocationTress";
import { useLocation } from "react-router-dom";

const UpdatePreServiceTraining = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [allbudgetYearList, setAllbudgetYearList] = useState([]);
    const [educationLevels, setEducationLevels] = useState([]);
    const [fieldOfStudies, setFieldOfStudies] = useState([]);
    const [imagePreview, setImagePreview] = useState("");
    const [selectedDocumentTypes, setSelectedDocumentTypes] = useState([]);
    const [documentTypes, setDocumentTypes] = useState([]);
    const location = useLocation();

    const preServiceTrainingId = location?.state?.id
    console.log(preServiceTrainingId);


    const [preServiceTraining, setPreServiceTraining] = useState({
        traineeId: "",
        budgetYearId: "",
        educationLevelId: "",
        fieldOfStudyId: "",
        batchCode: "",
        firstName: "",
        middleName: "",
        lastName: "",
        amharicFirstName: "",
        amharicMiddleName: "",
        amharicLastName: "",
        gender: "",
        locationId: "",
        telephoneNumber: "",
        mobileNumber: "",
        remark: "",
        documentIds: [],
        image: null,
    })






    const handleMediaTypesChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedDocumentTypes(
            typeof value === "string" ? value.split(",") : value
        );
    };

    useEffect(() => {
        fetchAllDocuments();
        fetchBudgetYears();
        fetchEducationLevels();
        fetchFieldOfStudies();
        fetchPreServiceTraining();
        fetchImageOfPreServiceTraining();
    }, []);

    const fetchAllDocuments = async () => {
        try {
          const response = await getDocuments();
          setDocumentTypes(response.data);
        } catch (error) {
          console.error("Error fetching documents:", error);
        }
      };
    
    
      const fetchBudgetYears = async () => {
        try {
            const response = await listOfBudgetYears();
            setAllbudgetYearList(response.data);
            console.log("The list of budget year:", response.data);
        } catch (error) {
            console.error("Error fetching budget years:", error);
        }
    };
    

      const fetchEducationLevels = async () => {
        try {
          const response = await listEducationLevels();
          setEducationLevels(response.data);
          console.log(response.data); // Optional: log the data to the console
        } catch (error) {
          console.error('Error fetching education levels:', error.message);
        }
      };
      
      const fetchFieldOfStudies = async () => {
        try {
          const response = await listFieldStudies();
          setFieldOfStudies(response.data);
          console.log(response.data); // Optional: log the data to the console
        } catch (error) {
          console.error('Error fetching field of studies:', error.message);
        }
      };


      const fetchImageOfPreServiceTraining = async () => {
        try {
          const imageUrl = await getPreServiceTrainingImageById(preServiceTrainingId); // Await the promise here
          setImagePreview(imageUrl); // This sets the image preview in the state
        } catch (error) {
          console.error("Failed to fetch preservice training Image:", error.message);
        }
      };
    

    const fetchPreServiceTraining = async () => {
        try {
            const response = await getPreServiceTrainingById(preServiceTrainingId);
            const data = response.data;
            setPreServiceTraining({
                ...data,
                 gender: data.gender.toUpperCase(),
                 
              });
              

            console.log(" fetched preService Training:", data);
        } catch (error) {
            console.error("Failed to fetch employee:", error.message);
        }
    };
    


    const handleFormSubmit = async (values) => {
        try {
            const formData = new FormData();

            // Add trainee details to the FormData object
            formData.append(
                "trainee",
                new Blob(
                    [
                        JSON.stringify({
                            ...values,
                            documentIds: selectedDocumentTypes.map(
                                (name) =>
                                    documentTypes.find(
                                        (documentType) => documentType.documentName === name
                                    )?.id

                            ),
                        }),
                    ],
                    { type: "application/json" }
                )
            );

            // Add the image file to the FormData object if it exists
            if (values.image) {
                formData.append("image", values.image);
            }

            // Make the API call to add the pre-service training
            // const response = await axios.post(
            //     `${REST_API_BASE_URL}pre-service-trainees/1/add`,
            //     formData
            // );
            const response = await updatePreServiceTraining(preServiceTrainingId, formData);

            // Check the response status and log appropriate messages
            if (response.status === 200) {
                navigate("/training/listPreserviceTraining");

                console.log("PreService Training added successfully!");
            } else {
                console.error(
                    "Error adding PreService Training. Status code:",
                    response.status
                );
            }
        } catch (error) {
            // Handle any errors that occur during the API call
            if (error.response) {
                console.error("Server responded with an error:", error.response.data);
            } else {
                console.error("An error occurred while submitting the form:", error.message);
            }
        }
    };

    const handleFileUpload = (e, setFieldValue) => {
        const file = e.target.files[0];
        setFieldValue("image", file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleIconClick = () => {
        navigate("/training/listPreserviceTraining");
    };

    const refreshPage = () => {
        window.location.reload();
    };
    const checkoutSchema = yup.object().shape({
        traineeId: yup.string().required("Trainee id cannot be blank"),
        budgetYearId: yup.number().required("Budget year id cannot be null"),
        batchCode: yup.string().required("Batch code cannot be blank"),
        firstName: yup.string().required("First name cannot be blank"),
        middleName: yup.string().required("Middle name cannot be blank"),
        lastName: yup.string().required("Last name cannot be blank"),
        amharicFirstName: yup.string().required("Amharic first name cannot be blank"),
        amharicMiddleName: yup.string().required("Amharic middle name cannot be blank"),
        amharicLastName: yup.string().required("Amharic last name cannot be blank"),
        gender: yup.string().required("Gender cannot be null"),
        locationId: yup.number().required("Location id cannot be null"),
        telephoneNumber: yup.string().nullable(),
        mobileNumber: yup.string().required("Mobile number cannot be blank"),
        educationLevelId: yup.number().required("Education level id cannot be null"),
        fieldOfStudyId: yup.number().required("Field of study id cannot be null"),
        remark: yup.string().nullable(),
        imageName: yup.string().nullable(),
        imageType: yup.string().nullable(),
        image: yup.mixed().nullable(),
        documentIds: yup
            .array()
            .min(1, "At least one document is required")
            .required("Documents are required"),
    });


    return (
        <LayoutForCourse>
            <ToolbarComponent
                mainIconType="search"
                onMainIconClick={handleIconClick}
                refreshPage={refreshPage}
            />
            <Header subtitle="Update PreService Training" />
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={preServiceTraining}
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
                            <FormControl
                                sx={{ gridColumn: "span 2" }}
                                error={!!touched.budgetYearId && !!errors.budgetYearId}
                            >
                                <InputLabel id="budgetYear-label">Select Budget Year</InputLabel>
                                <Select
                                    labelId="budgetYear-label"
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
                                error={!!touched.educationLevelId && !!errors.educationLevelId}
                            >
                                <InputLabel id="educationLevel-label">Education Level</InputLabel>
                                <Select
                                    labelId="educationLevel-label"
                                    value={values.educationLevelId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="educationLevelId"
                                >
                                    <MenuItem value="">
                                        <em>Select Education Level</em>
                                    </MenuItem>
                                    {educationLevels.map((educationLevel) => (
                                        <MenuItem key={educationLevel.id} value={educationLevel.id}>
                                            {educationLevel.educationLevelName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.educationLevelId && errors.educationLevelId && (
                                    <FormHelperText>{errors.educationLevelId}</FormHelperText>
                                )}
                            </FormControl>

                            <FormControl
                                sx={{ gridColumn: "span 2" }}
                                error={!!touched.fieldOfStudyId && !!errors.fieldOfStudyId}
                            >
                                <InputLabel id="fieldOfStudy-label">Fields of Study</InputLabel>
                                <Select
                                    labelId="fieldOfStudy-label"
                                    value={values.fieldOfStudyId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="fieldOfStudyId"
                                >
                                    <MenuItem value="">
                                        <em>Select Field of Study</em>
                                    </MenuItem>
                                    {fieldOfStudies.map((fieldOfStudy) => (
                                        <MenuItem key={fieldOfStudy.id} value={fieldOfStudy.id}>
                                            {fieldOfStudy.fieldOfStudy}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.fieldOfStudyId && errors.fieldOfStudyId && (
                                    <FormHelperText>{errors.fieldOfStudyId}</FormHelperText>
                                )}
                            </FormControl>

                            <FormControl
                                fullWidth
                                sx={{ gridColumn: "span 2" }}
                                error={!!touched.documentIds && !!errors.documentIds}
                            >
                                <InputLabel>Please Select Documents</InputLabel>
                                <Select
                                    multiple
                                    label="Please Select Documents"
                                    value={selectedDocumentTypes}
                                    onChange={(event) => {
                                        handleMediaTypesChange(event);
                                        setFieldValue("documentIds", event.target.value);
                                    }}
                                    renderValue={(selected) => (
                                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} style={{ margin: 2 }} />
                                            ))}
                                        </div>
                                    )}
                                >
                                    {documentTypes.map((documentType) => (
                                        <MenuItem key={documentType.id} value={documentType.documentName}>
                                            <Checkbox
                                                checked={selectedDocumentTypes.indexOf(documentType.documentName) > -1}
                                            />
                                            <ListItemText primary={documentType.documentName} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.documentIds && errors.documentIds && (
                                    <FormHelperText>{errors.documentIds}</FormHelperText>
                                )}
                            </FormControl>
                            <TextField
                                fullWidth
                                type="text"
                                label="Enter Trainee ID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.traineeId}
                                name="traineeId"
                                error={!!touched.traineeId && !!errors.traineeId}
                                helperText={touched.traineeId && errors.traineeId}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                type="text"
                                label="batchCode"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.batchCode}
                                name="batchCode"
                                error={!!touched.batchCode && !!errors.batchCode}
                                helperText={touched.batchCode && errors.batchCode}
                                sx={{ gridColumn: "span 2" }}
                            />


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
                            <TextField
                                fullWidth
                                type="text"
                                label="Amharic FirstName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.amharicFirstName}
                                name="amharicFirstName"
                                error={!!touched.amharicFirstName && !!errors.amharicFirstName}
                                helperText={touched.amharicFirstName && errors.amharicFirstName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                label="Amharic MiddleName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.amharicMiddleName}
                                name="amharicMiddleName"
                                error={!!touched.amharicMiddleName && !!errors.amharicMiddleName}
                                helperText={touched.amharicMiddleName && errors.amharicMiddleName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                label="Amharic LastName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.amharicLastName}
                                name="amharicLastName"
                                error={!!touched.amharicLastName && !!errors.amharicLastName}
                                helperText={touched.amharicLastName && errors.amharicLastName}
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
                                label="telephoneNumber"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.telephoneNumber}
                                name="telephoneNumber"
                                error={!!touched.telephoneNumber && !!errors.telephoneNumber}
                                helperText={touched.telephoneNumber && errors.telephoneNumber}
                                sx={{ gridColumn: "span 2" }}
                            />


                            <TextField
                                fullWidth
                                type="text"
                                label="mobileNumber"
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
                                label="Remark"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.remark}
                                name="remark"
                                error={!!touched.remark && !!errors.remark}
                                helperText={touched.remark && errors.remark}
                                sx={{ gridColumn: "span 2" }}
                            />



                            <Grid item xs={12}>
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                                    <input
                                        accept="image/*"
                                        id="contained-button-file"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={(e) => handleFileUpload(e, setFieldValue)}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="primary" component="span">
                                            Upload Image
                                        </Button>
                                    </label>
                                </div>
                                {imagePreview && (
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <img
                                            src={imagePreview}
                                            alt="Selected"
                                            style={{ maxWidth: "100%", maxHeight: "200px" }}
                                        />
                                    </div>
                                )}
                            </Grid>

                            <LocationTree
                                name="locationId"
                                handleSelect={(selectedLocationId) =>
                                    handleChange({
                                        target: { name: 'locationId', value: selectedLocationId },
                                    })
                                }
                            />
                        </Box>
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create PreService Training
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </LayoutForCourse>
    );
};

export default UpdatePreServiceTraining;


