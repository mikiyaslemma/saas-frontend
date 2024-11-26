import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const login = async (username, password) => {
  const data = new URLSearchParams({
    grant_type: 'password',
    client_id: 'saas-client',
    client_secret: 'APHalzvUVsfz9Jffe5ZAZ1XImFwv5a8K',
    username,
    password,
    scope: 'openid profile email',
  });

  try {
    const response = await axios.post(
      'http://host.docker.internal:8282/realms/saas-realm/protocol/openid-connect/token',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = response.data.access_token;
    const decodedToken = jwtDecode(accessToken);
    const roles = decodedToken.realm_access.roles;
    const tenantId = decodedToken.tenantId;

    // Console log the tokens and roles
    console.log('Access Token:', accessToken);
    console.log('Decoded Token:', decodedToken);
    console.log('Roles:', roles);
    console.log('Tenant ID:', tenantId);

    return { accessToken, roles, tenantId };
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw new Error('Login failed');
  }
};

export default login;






// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from './AuthContext'; // Import your AuthContext
// import { createEmployee, getResourceByName } from './api'; // Your API functions
// import EmployeeServiceResourceName from './EmployeeServiceResourceName'; // Import the resource names

// // Function to check if user has access to a resource
// const canAccessResource = async (resourceName, userRoles) => {
//     try {
//         const response = await getResourceByName(resourceName);
//         const resource = response.data;

//         const { requiredRoles } = resource;

//         // Check if userRoles include any of the requiredRoles
//         return requiredRoles.some(role => userRoles.includes(role));
//     } catch (error) {
//         console.error('Error fetching resource:', error);
//         return false; // Access denied if there's an error
//     }
// };

// // Function to handle creating an employee with access check
// export const handleCreateEmployee = async (formData) => {
//     const { authState } = useContext(AuthContext); // Get auth state from context
//     const userRoles = authState.roles; // User roles from the context
//     const resourceName = EmployeeServiceResourceName.ADD_EMPLOYEE; // Resource name to check access

//     // Check if the user has access to create an employee
//     const hasAccess = await canAccessResource(resourceName, userRoles);

//     if (hasAccess) {
//         try {
//             const response = await createEmployee(formData);
//             console.log('Employee created successfully:', response.data);
//             return response.data; // Return the response if needed
//         } catch (error) {
//             console.error('Error creating employee:', error);
//             throw error; // Rethrow the error if you want to handle it upstream
//         }
//     } else {
//         console.error('Access denied to create employee');
//         throw new Error('Access denied');
//     }
// };

// // Usage example within a React component
// const CreateEmployeeComponent = () => {
//     const [formData, setFormData] = useState(new FormData());
//     const [skills, setSkills] = useState([]); // To hold skills data if needed

//     const { authState } = useContext(AuthContext); // Get auth state from context

//     // Fetch skills or any other data needed for the form
//     useEffect(() => {
//         const fetchSkills = async () => {
//             try {
//                 const employeeId = 'someEmployeeId'; // Replace with actual employee ID
//                 const response = await listSkills(employeeId);
//                 setSkills(response.data); // Adjust based on your API response structure
//             } catch (error) {
//                 console.error('Error fetching skills:', error.message);
//             }
//         };

//         fetchSkills();
//     }, [authState]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const createdEmployee = await handleCreateEmployee(formData);
//             console.log('Created Employee:', createdEmployee);
//         } catch (error) {
//             console.error('Creation Failed:', error.message);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             {/* Populate form data fields here */}
//             <button type="submit">Create Employee</button>
//         </form>
//     );
// };

// export default CreateEmployeeComponent;