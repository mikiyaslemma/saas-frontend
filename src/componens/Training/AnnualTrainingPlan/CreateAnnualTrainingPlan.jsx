import {
    Box,
    Button,
    TextField,
    Grid,
    FormControl, InputLabel, Select, MenuItem, FormHelperText
} from "@mui/material";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import {  createAnnualTrainingPlan, listCourseCategory, listCourseTrainingByCategory, listOfBudgetYears, listTrainingInstution, REST_API_BASE_URL } from "../../../../Services/apiData";
import ToolbarComponent from "../ToolbarComponent";
import LayoutForCourse from "../LayoutForCourse";
import Header from "../../Header";
import axios from "axios";
import { useEffect, useState } from "react";
import DepartmentTree from "../../Employee/DepartmentTree";



const CreateAnnualTrainingPlan = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [allbudgetYearList, setAllbudgeYeartList] = useState([]);
    const [allCourseCategory, setallCourseCategory] = useState([]);
    const [allTrainingCourse, setallTrainingCourse] = useState([]);
    const [allTrainingInstution, setallTrainingInstution] = useState([]);

    // 
  


    const initialValues = {
        budgetYearId: "",
        courseCategoryId: "",
        trainingCourseId: "",
        trainingInstitutionId: "",
        departmentId: "",
        numberOfParticipants: "",
        numberOfDays: "",
        startDate: "",
        endDate: "",
        costPerPerson: "",
        round: "",
        venue: "",
        remark: ""
    };

    useEffect(() => {
        fetchBudgetYears();
        fetchCourseCategory();
        fetchTrainingCourse();
        fetchTrainingInstution();
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



    const fetchCourseCategory = async () => {
        try {
            const response = await listCourseCategory();
            setallCourseCategory(response.data);
            console.log("The list of course category:", response.data);
        } catch (error) {
            console.error("Error fetching Course category:", error);
        }
    };

    const fetchTrainingCourse = async (courseCategoryId) => {
        if (!courseCategoryId) {
            console.warn("Invalid courseCategoryId provided");
            return;
        }
        try {
            const response = await listCourseTrainingByCategory(courseCategoryId);
            setallTrainingCourse(response.data);
            console.log("The list of training courses:", response.data);
        } catch (error) {
            console.error("Error fetching training courses:", error);
        }
    };

    const fetchTrainingInstution = async () => {
        try {
            const response = await listTrainingInstution();
            setallTrainingInstution(response.data);
            console.log("The list of Training Instution:", response.data);
        } catch (error) {
            console.error("Error fetching Course category:", error);
        }
    };
    
    const handleIconClick = () => {
        navigate('/training/listannualTraininPlan');

    };

    const refreshPage = () => {
        window.location.reload();
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            console.log("Submitting the following values:", values);
            await createAnnualTrainingPlan(values);
            console.log("Course created successfully!");
            resetForm();
        } catch (error) {
            console.error("Failed to create course:", error);
            // Add more context-specific error handling here
        }
    };


    const checkoutSchema = yup.object().shape({
        budgetYearId: yup.number().required("Budget year ID is required"),
        courseCategoryId: yup.number().required("Course category ID is required"),
        trainingCourseId: yup.number().required("Training course ID is required"),
        trainingInstitutionId: yup.number().required("Training institution ID is required"),
        departmentId: yup.number().required("Department ID is required"),
        numberOfDays: yup.number().required("Number of days is required").min(1, "Number of days must be at least 1"),
        startDate: yup.date().required("Start date is required").min(new Date(), "Start date must be in the future or present"),
        endDate: yup.date().required("End date is required").min(
            yup.ref('startDate'),
            "End date must be equal to or greater than the start date plus the number of days minus one"
        ),
        costPerPerson: yup.number().required("Cost per person is required").min(0, "Cost per person must be non-negative"),
    
        round: yup.number().required("Round is required"),
        venue: yup.string().required("Venue cannot be blank"),
        remark: yup.string()
    });






    return (
        <LayoutForCourse>
            <ToolbarComponent
                mainIconType="search"
                onMainIconClick={handleIconClick}
                refreshPage={refreshPage}
            />
            <Header subtitle="Create Annual Training Plan" />


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
                    resetForm
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
                                error={!!touched.courseCategoryId && !!errors.courseCategoryId}
                            >
                                <InputLabel id="coursecategory-label">Select Course Category</InputLabel>
                                <Select
                                    labelId="courseCategory-label"
                                    value={values.courseCategoryId}
                                    onChange={async (e) => {
                                        const selectedCategoryId = e.target.value;
                                        handleChange(e);
                                        if (selectedCategoryId) {
                                            await fetchTrainingCourse(selectedCategoryId);
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    name="courseCategoryId"
                                >
                                    <MenuItem value="">
                                        <em>Select Course Category</em>
                                    </MenuItem>
                                    {allCourseCategory.map((courseCategory) => (
                                        <MenuItem key={courseCategory.id} value={courseCategory.id}>
                                            {courseCategory.categoryName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.courseCategoryId && errors.courseCategoryId && (
                                    <FormHelperText>{errors.courseCategoryId}</FormHelperText>
                                )}
                            </FormControl>



                            <FormControl
                                sx={{ gridColumn: "span 2" }}
                                error={!!touched.trainingCourseId && !!errors.trainingCourseId}
                            >
                                <InputLabel id="trainingCourse-label">Select Training Course</InputLabel>
                                <Select
                                    labelId="trainingCourse-label"
                                    value={values.trainingCourseId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="trainingCourseId"
                                >
                                    <MenuItem value="">
                                        <em>Select Training Course</em>
                                    </MenuItem>
                                    {allTrainingCourse.length > 0 ? (
                                        allTrainingCourse.map((courseTraining) => (
                                            <MenuItem key={courseTraining.id} value={courseTraining.id}>
                                                {courseTraining.courseName}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No training courses available</MenuItem>
                                    )}
                                </Select>
                                {touched.trainingCourseId && errors.trainingCourseId && (
                                    <FormHelperText>{errors.trainingCourseId}</FormHelperText>
                                )}
                            </FormControl>

                            <FormControl
                                sx={{ gridColumn: "span 2" }}
                                error={!!touched.trainingInstitutionId && !!errors.trainingInstitutionId}
                            >
                                <InputLabel id="trainingInstution-label">Select Training Instution</InputLabel>
                                <Select
                                    labelId="trainingInstution-label"
                                    value={values.trainingInstitutionId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="trainingInstitutionId"
                                >
                                    <MenuItem value="">
                                        <em>Select Training Instution</em>
                                    </MenuItem>
                                    {allTrainingInstution.map((trainingInstution) => (
                                        <MenuItem key={trainingInstution.id} value={trainingInstution.id}>
                                            {trainingInstution.institutionName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.trainingInstitutionId && errors.trainingInstitutionId && (
                                    <FormHelperText>{errors.trainingInstitutionId}</FormHelperText>
                                )}
                            </FormControl>

                            <TextField
                                fullWidth
                                type="number"
                                label="Cost Per Person"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.costPerPerson}
                                name="costPerPerson"
                                error={!!touched.costPerPerson && !!errors.costPerPerson}
                                helperText={touched.costPerPerson && errors.costPerPerson}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                type="text"
                                label="Number Of Participants"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.numberOfParticipants}
                                name="numberOfParticipants"
                                error={!!touched.numberOfParticipants && !!errors.numberOfParticipants}
                                helperText={touched.numberOfParticipants && errors.numberOfParticipants}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                type="numberOfDays"
                                label="Number Of Days"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.numberOfDays}
                                name="numberOfDays"
                                error={!!touched.numberOfDays && !!errors.numberOfDays}
                                helperText={touched.numberOfDays && errors.numberOfDays}
                                sx={{ gridColumn: "span 2" }}
                            />

                         
                            <TextField
                                fullWidth
                                type="number"
                                label="round"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.round}
                                name="round"
                                error={!!touched.reason && !!errors.round}
                                helperText={touched.reason && errors.round}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                type="text"
                                label="venue"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.venue}
                                name="venue"
                                error={!!touched.venue && !!errors.venue}
                                helperText={touched.venue && errors.venue}
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
                            <DepartmentTree
                                name="departmentId"
                                handleSelect={(selectedDepartmentId) =>
                                    handleChange({
                                        target: { name: 'departmentId', value: selectedDepartmentId },
                                    })
                                }
                            />
                        </Box>

                        <Grid container spacing={3} justifyContent="center" style={{ marginBottom: 16, marginTop: 60 }}>
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

        </LayoutForCourse>

    );
};

export default CreateAnnualTrainingPlan;
