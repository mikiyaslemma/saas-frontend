import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

import { useIds } from '../IdContext';

const SearchComponent = ({ label, path, actionLabel }) => {
  const [searchId, setSearchId] = useState('');
  const [exists, setExists] = useState(null);
  const navigate = useNavigate();
  const { employeeIdMap } = useIds();
  console.log(`the fetched Id for Seraching is not null ${employeeIdMap}`);

  const checkIdExists = () => {
    const trimmedSearchId = searchId.trim();
    const idExists = Object.keys(employeeIdMap).some(employeeId => employeeId.toString() === trimmedSearchId);
    setExists(idExists);

    if (idExists) {
      const employerId = employeeIdMap[trimmedSearchId];
      handleDetails(trimmedSearchId, employerId);
    }
  };

  const handleDetails = (employeeId, employerId) => {
    navigate(path, { state: { employeeId, employerId } });
  };

  return (
    <Container>
      <Box mt={4} textAlign="center">
        <TextField
          label={label}
          variant="outlined"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ marginBottom: 20 }}
        />
        <Box>
          <Button variant="contained" color="primary" onClick={checkIdExists}>
            {actionLabel}
          </Button>
        </Box>
        {exists !== null && (
          <Typography variant="h6" mt={2}>
            The employee ID {searchId} {exists ? 'exists' : 'does not exist'} in the list.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default SearchComponent;
