import { DashboardLayout } from "insa_react_ui";
import React, { useContext, useEffect, useState } from "react";
import { navItems } from "./config/routes";
import { Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import AuthContext from "./componens/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { canAccessResource } from "./componens/Auth/Services/SecurityService";

const App = () => {
  const { authState, logout } = useContext(AuthContext);
  const [filteredNavItems, setFilteredNavItems] = useState([]);
  const navigate = useNavigate();

  const getUserName = () => localStorage.getItem("username");
  const username = getUserName();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const filterNavItems = async () => {
      const filteredItems = await Promise.all(
        navItems.map(async (item) => {
          if (item.subMenu && item.subMenu.length > 0) {
            const accessibleSubMenu = await Promise.all(
              item.subMenu.map(async (subItem) => {
                // Check if the current user is an admin and the resourceName matches
                if (
                  username &&
                  username.toLowerCase().includes("admin") &&
                  subItem.resourceName === "Get Employee by Employee ID"
                ) {
                  return null; // Exclude this subItem for admin users
                }

                if (subItem.resourceName) {
                  const hasAccess = await canAccessResource(
                    subItem.resourceName,
                    authState.roles
                  );
                  return hasAccess ? subItem : null;
                }
                return subItem;
              })
            );

            // Check if at least one child menu is accessible
            const hasAccessibleChild = accessibleSubMenu.some(Boolean);

            // If it has accessible children, include the parent menu
            return hasAccessibleChild
              ? { ...item, subMenu: accessibleSubMenu.filter(Boolean) }
              : null;
          }

          // Also check the top-level item if it matches the resource name
          if (
            item.resourceName === "Get Employee by Employee ID" &&
            username &&
            username.toLowerCase().includes("admin")
          ) {
            return null; // Exclude the top-level item for admin users
          }

          return item;
        })
      );

      // Filter out null values to get the final navigation items
      setFilteredNavItems(filteredItems.filter(Boolean));
    };

    filterNavItems();
  }, [authState.roles, username]); // Add username to dependencies

  const topBarItems = (
    <div className="flex flex-col gap-2 bg-white px-2 py-3 rounded-2xl divide-y-2">
      <Button onClick={handleLogout}>LogOut</Button>
    </div>
  );

  return (
    <DashboardLayout
      icon="/assets/svg/user.png"
      navItems={filteredNavItems}
      userName="INSA"
      topBarMenu={topBarItems}
      title="INSA"
      currentPage="HR System"
      footerText="INSA"
    >
      <Outlet />
    </DashboardLayout>
  );
};

export default App;

// import { DashboardLayout } from 'insa_react_ui';
// import React, { useContext, useEffect, useState } from 'react';
// import { navItems } from './config/routes';
// import { Outlet } from 'react-router-dom';
// import { Button } from '@mui/material';
// import AuthContext from './componens/Auth/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { canAccessResource } from './componens/Auth/Services/SecurityService';

// const App = () => {
//   const { authState, logout } = useContext(AuthContext);
//   const [filteredNavItems, setFilteredNavItems] = useState([]);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   useEffect(() => {
//     const filterNavItems = async () => {
//       const filteredItems = await Promise.all(navItems.map(async (item) => {
//         if (item.subMenu && item.subMenu.length > 0) {
//           const accessibleSubMenu = await Promise.all(item.subMenu.map(async (subItem) => {
//             if (subItem.resourceName) {
//               const hasAccess = await canAccessResource(subItem.resourceName, authState.roles);
//               return hasAccess ? subItem : null;
//             }
//             return subItem;
//           }));

//           // Check if at least one child menu is accessible
//           const hasAccessibleChild = accessibleSubMenu.some(Boolean);

//           // If it has accessible children, include the parent menu
//           return hasAccessibleChild ? { ...item, subMenu: accessibleSubMenu.filter(Boolean) } : null;
//         }
//         return item;
//       }));

//       // Filter out null values to get the final navigation items
//       setFilteredNavItems(filteredItems.filter(Boolean));
//     };

//     filterNavItems();
//   }, [authState.roles]);

//   const topBarItems = (
//     <div className="flex flex-col gap-2 bg-white px-2 py-3 rounded-2xl divide-y-2">
//       <Button onClick={handleLogout}>LogOut</Button>
//     </div>
//   );

//   return (
//     <DashboardLayout
//       icon='/assets/svg/user.png'
//       navItems={filteredNavItems}
//       userName="INSA"
//       topBarMenu={topBarItems}
//       title="INSA"
//       currentPage="HR System"
//       footerText="INSA"
//     >
//       <Outlet />
//     </DashboardLayout>
//   );
// };

// export default App;
