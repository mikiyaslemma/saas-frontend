import React from 'react';
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const AdvertisementExists = () => {
  const navigate = useNavigate();

  return (
    <Box m="20px">
      <Header subtitle="Advertisement Exists" />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2} // Padding 8px
        boxShadow={3} // Shadow depth
        borderRadius={8} // Rounded corners
        bgcolor="background.paper" // White background
      >
        <Typography variant="h5" gutterBottom align="center">
          An advertisement for this recruitment ID already exists.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/recruitment/listadvertisement')}
          sx={{ mt: 2 }} // Margin top 16px
        >
          Go to Advertisement List
        </Button>
      </Box>
    </Box>
  );
};

export default AdvertisementExists;
