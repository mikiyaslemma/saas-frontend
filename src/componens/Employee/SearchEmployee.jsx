import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIds } from '../../IdContext';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const SearchEmployee = () => {
  const { employeeIdMap } = useIds();
  const [searchId, setSearchId] = useState('');
  const [exists, setExists] = useState(null);
  const navigate = useNavigate();

  const checkIdExists = () => {
    const trimmedSearchId = searchId.trim();
    const idExists = employeeIdMap.hasOwnProperty(trimmedSearchId);
    setExists(idExists);

    if (idExists) {
      const id = employeeIdMap[trimmedSearchId];
      handleDetails(trimmedSearchId, id);
    }
  };

  const handleDetails = (employeeId, id) => {
    navigate('/employee/details', { state: { employeeId, id } });
  };

  return (
    <Container>
      <Box mt={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Search Employee ID
        </Typography>
        <TextField
          label="Enter Employee ID to search"
          variant="outlined"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ marginBottom: 20 }}
        />
        <Box>
          <Button variant="contained" color="primary" onClick={checkIdExists}>
            Search
          </Button>
        </Box>
        {exists !== null && (
          <Typography variant="h6" mt={2}>
            The Employee ID {searchId} {exists ? 'exists' : 'does not exist'} in the list.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default SearchEmployee;
