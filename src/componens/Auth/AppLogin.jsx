import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { GlobalStyles } from '@mui/system';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from './AuthContext';

function AppLogin() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await login(values.username, values.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
      setFieldError('general', 'Invalid username or password.'); // Generic message
    }
    setSubmitting(false);
  };

  

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.42857143',
            color: '#333',
            backgroundColor: '#fff',
            margin: 0,
            padding: 0,
            backgroundImage: 'url(/assets/svg/hrs1.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          },
          '#root': {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      />
      <Container maxWidth="xs">
        <Box
          id="loginbox"
          style={{
            backgroundColor: '#3a6087',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            style={{ color: '#ffffff' }}
          >
            <Box
              component="span"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                marginBottom: '20px',
              }}
            >
              <img
                src="/assets/svg/user.png"
                alt="Login Icon"
                width="75"
                height="75"
                style={{
                  borderRadius: '50%',
                  border: '2px solid #ffffff',
                  marginBottom: '10px',
                }}
              />
            </Box>
          </Typography>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                {errors.general && (
                  <Alert severity="error">{errors.general}</Alert>
                )}

                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{ style: { color: '#ffffff' } }}
                  InputProps={{ style: { color: '#ffffff' } }}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{ style: { color: '#ffffff' } }}
                  InputProps={{ style: { color: '#ffffff' } }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  style={{
                    marginTop: '16px',
                    backgroundColor: '#ffffff',
                    color: '#3a6087',
                  }}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </>
  );
}

export default AppLogin;