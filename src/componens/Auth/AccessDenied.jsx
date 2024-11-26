import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles"; // Use the styled API
import accessDenied from '../../assets/svg/notPossible.png';

// Styled component for the container
const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  textAlign: "center",
  backgroundImage: `url(${accessDenied})`,
  backgroundSize: "contain", 
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  padding: theme.spacing(4),
  position: "relative",
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
}));

const Content = styled(Box)(({ theme }) => ({
  zIndex: 1,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const AccessDenied = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/dashboard");
  };

  return (
    <Container>
      <Overlay />
      <Content>
        <Typography variant="h3" color="error" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          You do not have permission to access this page.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleBackToHome}>
          Go Back to Home
        </Button>
      </Content>
    </Container>
  );
};

export default AccessDenied;






// import React from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { styled } from "@mui/material/styles";

// // Styled component for the container with a simple background
// const Container = styled(Box)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   minHeight: "100vh",
//   textAlign: "center",
//   background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`, // Gradient background
//   padding: theme.spacing(4),
//   color: "#fff", // Text color white for better contrast on background
// }));

// const AccessDenied = () => {
//   const navigate = useNavigate();

//   const handleBackToHome = () => {
//     navigate("/dashboard");
//   };

//   return (
//     <Container>
//       <Typography variant="h1" component="div" color="inherit" gutterBottom>
//         <span style={{ fontWeight: 'bold' }}>Access</span> Denied
//       </Typography>
//       <Typography variant="body1" paragraph>
//         <strong>Access denied while trying to process your request:</strong>
//       </Typography>
//       <ul style={{ listStyleType: 'none', padding: 0 }}>
//         <li>
//           This message is displayed because you don't have appropriate permission
//           to view the page you are requesting.
//         </li>
//       </ul>
//       <Button variant="contained" color="secondary" onClick={handleBackToHome}>
//         Go Back to Home
//       </Button>
//     </Container>
//   );
// };

// export default AccessDenied;
