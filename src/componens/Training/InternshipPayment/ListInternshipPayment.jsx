
import React, { useEffect, useState } from "react";
import { Box, Tooltip, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../Header";
import { tokens } from "../../../../theme";
import { deleteEducation, listInternshipPayments } from "../../../../Services/apiData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteDialog from "../../DeleteDialog";
import { useNavigate } from "react-router-dom";
import TrainingServiceResourceName from "../../Auth/Resource/TrainingServiceResourceName";
import AuthContext from "../../Auth/AuthContext";

const ListInternshipPayment = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [internPayment, setInternPayment] = useState([]);


    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [internPaymentToDelete, setInternPaymentToDelete] = useState(null);


    const handleEditInternshipPayement = ( id) => {
        navigate('/training/updateInternPayement', { state: { id } });
    };

    useEffect(() => {
        fetchAllInternPayment();
        checkPermissions();
    }, []);

    const fetchAllInternPayment = async () => {
        try {
            const response = await listInternshipPayments();
            const data = response.data;
            setInternPayment(data);
            console.log(data);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        }
    };

    

    const handleConfirmDelete = async () => {
        try {
            await deleteEducation( internPaymentToDelete.id);
            const updatedInternPayment = internPayment.filter((emp) => emp.id !== internPaymentToDelete.id);
            setInternPayment(updatedInternPayment);
            console.log("internship payment deleted:", internPaymentToDelete);
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        } finally {
            setOpenDialog(false);
        }
    };


    const handleCancelDelete = () => {
        setOpenDialog(false);
    };

    const [canEdit, setCanEdit] = useState(false);
    const [canDelete, setCanDelete] = useState(false);
    const { authState } = useContext(AuthContext);
    const userRoles = authState.roles;
  
    const checkPermissions = async () => {
      // Check permissions for actions
      const editAccess = await canAccessResource(TrainingServiceResourceName.UPDATE_INTERNSHIP_PAYMENT &&
        TrainingServiceResourceName.GET_INTERNSHIP_PAYMENT_BY_ID,
        userRoles);
  
      const deleteAccess = await canAccessResource(TrainingServiceResourceName.DELETE_INTERNSHIP_PAYMENT 
        , userRoles);
    
      setCanEdit(editAccess);
      setCanDelete(deleteAccess);
    };



    const columns = [

        { field: "startDate", headerName: "Start Date", flex: 1, cellClassName: "name-column--cell" },
        { field: "endDate", headerName: "End Date", flex: 1, cellClassName: "name-column--cell" },
        { field: "paymentAmount", headerName: "paymentAmount", flex: 1, cellClassName: "name-column--cell" },
        { field: "referenceLetter", headerName: "referenceLetter", flex: 1, cellClassName: "name-column--cell" },

        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>

            {canDelete && (
                  <Tooltip title="Delete Intern Payment ">
                  <IconButton onClick={() => navigate("/training/deleteIntenpayment", { state: { paymentId: params.row.id } })} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
            )} 

            {canDelete && (
                     <Tooltip title="Update">
                     <IconButton
                         onClick={() => handleEditInternshipPayement( params.row.id)}
                         color="primary"
                     >
                         <EditIcon />
                     </IconButton>
                 </Tooltip>

            )} 
                </Box>
            ),
        },
    ];

    return (
        <Box m="20px">

            <Header subtitle="List of Intern Payment" />
            <Box m="40px 0 0 0" height="75vh">
                <DataGrid
                    rows={internPayment}
                    columns={columns}
                    getRowId={(row) => row.id}
                    checkboxSelection={false}
                />
            </Box>
            <DeleteDialog
                open={openDialog}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this Intern Payment"
            />
        </Box>
    );
};

export default ListInternshipPayment;

