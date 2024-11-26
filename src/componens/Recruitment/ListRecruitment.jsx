// import React, { useEffect, useState } from "react";
// import { Box, Typography, useTheme, Tooltip, IconButton } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import Header from "../Header";
// import { tokens } from "../../../theme";
// import { listRecruitment, deleteRecruitment } from "../../../Services/apiData";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import DeleteDialog from "../DeleteDialog";
// import AddIcon from "@mui/icons-material/Add";
// import { useNavigate } from "react-router-dom";
// import CheckIcon from '@mui/icons-material/Check';
// import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
// import CancelIcon from '@mui/icons-material/Cancel';
// import ToolbarComponent from "../Training/ToolbarComponent";

// const ListRecruitment = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const navigate = useNavigate();

//   const [recruitment, setRecruitment] = useState([]);
//   const [error, setError] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [recruitmentToDelete, setRecruitmentToDelete] = useState(null);

//   const handleEditRecruitment = (id,requesterEmployeeId) => {
//     navigate('/recruitment/edit', { state: { id,requesterEmployeeId } });
//   };

//   const handleEditRecruitmentApprove = (id, requesterEmployeeId) => {
//     navigate('/recruitment/editApprovance', { state: { id, requesterEmployeeId } });
//   };

//   const handleMoreAbout = (id) => {
//     navigate('/recruitment/more', { state: { id } });
//   };
  

//   useEffect(() => {
//     fetchRecruitment();
//   }, []);

//   const fetchRecruitment = async () => {
//     try {
//       const response = await listRecruitment();
//       setRecruitment(response.data);  // Use response.data to access the API response
//       console.log("Recruitment:", response.data);
//     } catch (error) {
//       setError(error.message);
//       console.error("Error fetching recruitment:", error.message);
//     }
//   };

  

//   const handleDelete = async (recruitment) => {
//     setRecruitmentToDelete(recruitment);
//     setOpenDialog(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await deleteRecruitment(recruitmentToDelete.id);
//       const updatedRecruitments = recruitment.filter((emp) => emp.id !== recruitmentToDelete.id);
//       setRecruitment(updatedRecruitments);
//       console.log("Recruitment deleted:", recruitmentToDelete);
    
//     } catch (error) {
//       setError(error.message);
//       console.log(error.message);
//     } finally {
//       setOpenDialog(false);
//     }
//   };

//   const handleCancelDelete = () => {
//     setOpenDialog(false);
//   };

//   const columns = [
//     { field: "numberOfEmployeesRequested", headerName: "Number of Employees Requested", flex: 1, cellClassName: "name-column--cell" },
//     { field: "recruitmentType", headerName: "Recruitment Type", flex: 1, cellClassName: "name-column--cell" },
//     { field: "recruitmentMode", headerName: "Recruitment Mode", flex: 1, cellClassName: "name-column--cell" },
//     { field: "remark", headerName: "Remark", flex: 1, cellClassName: "name-column--cell" },
//     {
//       field: "actions",
//       headerName: "Actions",
//       headerAlign: 'center',
//       width: 300,
//       renderCell: (params) => (
//         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//           <Tooltip title="Delete recruitment">
//             <IconButton onClick={() => handleDelete(params.row)} color="error">
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
          
//           {params.row.recruitmentStatus === 'Pending' && (
//             <Tooltip title="This recruitmentStatus Pending">
//               <IconButton onClick={() => handleEditRecruitmentApprove(params.row.id, params.row.requesterEmployeeId)}>
//                 <HourglassEmptyIcon />
//               </IconButton>
//             </Tooltip>
//           )}
          
//           {params.row.recruitmentStatus === 'Approved' && (
//              <Tooltip title="Add More About recruitment">
//             <IconButton onClick={() => handleMoreAbout(params.row.id)}>
//               <AddIcon />
//             </IconButton>
//           </Tooltip>
          
//           )}

//           <Tooltip title="Update recruitment Information">
//             <IconButton onClick={() => handleEditRecruitment(params.row.id,params.row.requesterEmployeeId)} color="primary">
//               <EditIcon />
//             </IconButton>
//           </Tooltip>

//           {params.row.recruitmentStatus === 'Rejected' && (
//             <Tooltip title="This recruitmentStatus Rejected">
//               <IconButton>
//                 <CancelIcon />
//               </IconButton>
//             </Tooltip>
//           )}
      

//         </Box>
//       ),
//     },
//   ];
//   const handleIconClick = () => {
//     navigate('/recruitment/create');
//   };

//   const refreshPage = () => {
//     window.location.reload();
//   };

//   return (
//     <Box>
//     <ToolbarComponent mainIconType="add" onMainIconClick={handleIconClick} refreshPage={refreshPage} />
//       <Header subtitle="List of recruitment" />
//       <Box m="0 0 0 0" height="75vh">
//         <DataGrid
//           rows={recruitment}
//           columns={columns}
//           getRowId={(row) => row.id}
//           checkboxSelection={false}
//         />
//       </Box>
//       <DeleteDialog
//         open={openDialog}
//         onClose={handleCancelDelete}
//         onConfirm={handleConfirmDelete}
//         message="Are you sure you want to delete?"
//       />
//     </Box>
//   );
// };

// export default ListRecruitment;



import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, useTheme, Tooltip, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";
import { tokens } from "../../../theme";
import { listRecruitment, deleteRecruitment } from "../../../Services/apiData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../DeleteDialog";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import ToolbarComponent from "../Training/ToolbarComponent";
import AuthContext from "../Auth/AuthContext";
import AccessDenied from "../Auth/AccessDenied";
import { canAccessResource } from "../Auth/Services/SecurityService";
import RecruitmentServiceResourceName from "../Auth/Resource/RecruitmentServiceResourceName";

const ListRecruitment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  
  const { authState } = useContext(AuthContext);
  const userRoles = authState.roles;

  const [accessDenied, setAccessDenied] = useState(false);

  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canApprove, setCanApprove] = useState(false);
  
  const [recruitment, setRecruitment] = useState([]);
  
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [recruitmentToDelete, setRecruitmentToDelete] = useState(null);
  const [canAddMore, setCanAddMore] = useState(false);


  useEffect(() => {
    fetchRecruitment();
    checkPermissions(); // Check permissions when the component mounts
  }, []);

  const fetchRecruitment = async () => {
    try {
      const response = await listRecruitment();
      setRecruitment(response.data); // Use response.data to access the API response
      console.log("Recruitment:", response.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching recruitment:", error.message);
    }
  };

  const checkPermissions = async () => {
    // Check permissions for actions
    const editAccess = await canAccessResource(RecruitmentServiceResourceName.UPDATE_RECRUITMENT, userRoles);
    const deleteAccess = await canAccessResource(RecruitmentServiceResourceName.DELETE_RECRUITMENT, userRoles);
    const approveAccess = await canAccessResource(RecruitmentServiceResourceName.APPROVE_RECRUITMENT, userRoles);
    
    const addMoreAccess = await canAccessResource(
      RecruitmentServiceResourceName.ADD_SHORTLIST_CRITERIA || RecruitmentServiceResourceName.ADD_APPLICANT ||
      RecruitmentServiceResourceName.ADD_ADVERTISEMENT || RecruitmentServiceResourceName.ADD_ASSESSMENT_WEIGHT 
      , userRoles);

    setCanEdit(editAccess);
    setCanDelete(deleteAccess);
    setCanApprove(approveAccess);
    setCanAddMore(addMoreAccess);
  };

  const handleEditRecruitment = (id, requesterEmployeeId) => {
    navigate('/recruitment/edit', { state: { id, requesterEmployeeId } });
  };

  const handleEditRecruitmentApprove = (id, requesterEmployeeId) => {
    navigate('/recruitment/editApprovance', { state: { id, requesterEmployeeId } });
  };

  const handleMoreAbout = (id) => {
    navigate('/recruitment/more', { state: { id } });
  };

  // const handleDelete = async (recruitment) => {
  //   setRecruitmentToDelete(recruitment);
  //   setOpenDialog(true);
  // };

  const handleConfirmDelete = async () => {
    try {
      await deleteRecruitment(recruitmentToDelete.id);
      const updatedRecruitments = recruitment.filter((emp) => emp.id !== recruitmentToDelete.id);
      setRecruitment(updatedRecruitments);
      console.log("Recruitment deleted:", recruitmentToDelete);
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

  const columns = [
    { field: "numberOfEmployeesRequested", headerName: "Number of Employees Requested", flex: 1, cellClassName: "name-column--cell" },
    { field: "recruitmentType", headerName: "Recruitment Type", flex: 1, cellClassName: "name-column--cell" },
    { field: "recruitmentMode", headerName: "Recruitment Mode", flex: 1, cellClassName: "name-column--cell" },
    { field: "remark", headerName: "Remark", flex: 1, cellClassName: "name-column--cell" },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: 'center',
      width: 300,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {canDelete && (
            <Tooltip title="Delete recruitment">
              {/* <IconButton onClick={() => handleDelete(params.row)} color="error"> */}
              <IconButton onClick={() => navigate("/recruitment/delete", { state: { recruitmentId: params.row.id, requesterEmployeeId: params.row.requesterEmployeeId } })} color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
          
          {canApprove && params.row.recruitmentStatus === 'Pending' && (
            <Tooltip title="This recruitmentStatus Pending">
              <IconButton onClick={() => handleEditRecruitmentApprove(params.row.id, params.row.requesterEmployeeId)}>
                <HourglassEmptyIcon />
              </IconButton>
            </Tooltip>
          )}
          
          { canAddMore && params.row.recruitmentStatus === 'Approved' && (
            <Tooltip title="Add More About recruitment">
              <IconButton onClick={() => handleMoreAbout(params.row.id)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}

          {canEdit &&  params.row.recruitmentStatus === 'Pending' &&
           (
            <Tooltip title="Update recruitment Information">
              <IconButton onClick={() => handleEditRecruitment(params.row.id, params.row.requesterEmployeeId)} color="primary">
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}

          {params.row.recruitmentStatus === 'Rejected' && (
            <Tooltip title="This recruitmentStatus Rejected">
              <IconButton>
                <CancelIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
    },
  ];

  const handleIconClick = () => {
    navigate('/recruitment/create');
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Box>
      {accessDenied ? (
        <AccessDenied />
      ) : (
        <>
          <ToolbarComponent mainIconType="add" onMainIconClick={handleIconClick} refreshPage={refreshPage} />
          <Header subtitle="List of recruitment" />
          <Box m="0 0 0 0" height="75vh">
            <DataGrid
              rows={recruitment}
              columns={columns}
              getRowId={(row) => row.id}
              checkboxSelection={false}
            />
          </Box>
          <DeleteDialog
            open={openDialog}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </Box>
  );
};

export default ListRecruitment;
