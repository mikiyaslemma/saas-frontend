import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Create the context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: localStorage.getItem("accessToken") || "",
    roles: JSON.parse(localStorage.getItem("roles")) || [],
    tenantId: localStorage.getItem("tenantId") || "",
    username: localStorage.getItem("username") || "", // Initialize username
  });

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!authState.accessToken
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (authState.accessToken) {
      const decodedToken = jwtDecode(authState.accessToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
      }
    }
  }, [authState.accessToken]);

  const login = async (username, password) => {
    const data = new URLSearchParams({
      grant_type: "password",
      client_id: "saas-client",
      client_secret: "APHalzvUVsfz9Jffe5ZAZ1XImFwv5a8K",
      username,
      password,
      scope: "openid profile email",
    });

    try {
      const response = await axios.post(
        "http://172.20.85.83:8282/realms/saas-erp/protocol/openid-connect/token",
        data,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;

      const decodedToken = jwtDecode(accessToken);
      const roles = decodedToken.realm_access.roles;
      const tenantId = decodedToken.tenantId || "";
      const userName = decodedToken.username;

      // Store tokens and username in local storage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("roles", JSON.stringify(roles));
      localStorage.setItem("tenantId", tenantId);
      localStorage.setItem("username", userName); // Store username

      console.log(`the tenant Id ${tenantId}`);
      console.log(`the username Id ${userName}`);

      setAuthState({ accessToken, roles, tenantId, username: userName }); // Include username
      setIsAuthenticated(true);
      console.log(roles);
      console.log(userName);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error("Invalid username or password.");
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const data = new URLSearchParams({
        client_id: "saas-client",
        client_secret: "APHalzvUVsfz9Jffe5ZAZ1XImFwv5a8K",
        refresh_token: refreshToken,
      });

      try {
        await axios.post(
          "http://172.20.85.83:8282/realms/saas-erp/protocol/openid-connect/logout",
          data,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${authState.accessToken}`,
            },
          }
        );

        // Clear session storage after successful logout
        localStorage.clear();
        setAuthState({
          accessToken: "",
          roles: [],
          tenantId: "",
          username: "",
        }); // Reset username
        setIsAuthenticated(false);
      } catch (error) {
        console.error(
          "Error logging out:",
          error.response?.data || error.message
        );
      }
    } else {
      localStorage.clear();
      setAuthState({ accessToken: "", roles: [], tenantId: "", username: "" }); // Reset username
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ authState, isAuthenticated, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
