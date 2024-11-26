import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { IdProvider } from './IdContext';
import { AuthProvider, useAuth } from './Auth/AuthContext'; // Ensure you import useAuth
import { BrowserRouter } from 'react-router-dom';

// Create a wrapper component to access isLoggedIn
const Root = () => {
  const { isLoggedIn } = useAuth(); // Get authentication state from AuthContext
  console.log('isLoggedIn:', isLoggedIn);

  return (
    <IdProvider isLoggedIn={isLoggedIn}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IdProvider>
  );
};

ReactDOM.render(
  <AuthProvider>
    <Root /> {/* Use the new Root component */}
  </AuthProvider>,
  document.getElementById('root')
);