import { getResourceByName, getTenantById } from "../../../../Services/apiData";

// Fetch tenant information and then check if the user can access the resource
export const canAccessResource = async (resourceName, userRoles) => {
  try {
    // Fetch the tenant information
    const tenantResponse = await getTenantById();
    const tenant = tenantResponse.data;
    const abbreviatedName = tenant.abbreviatedName;

    // Now fetch the resource by its name
    const resourceResponse = await getResourceByName(resourceName);
    const resource = resourceResponse.data;
    const requiredRolesOld = resource.requiredRoles;

    // Create the required roles with the prefix
    const requiredRoles = [];
    requiredRolesOld.forEach((role) => {
      const prefix = abbreviatedName.toLowerCase() + "_";
      const resourceRole = prefix + role;
      requiredRoles.push(resourceRole);
    });


    // Check if the user's roles match the required roles for the resource
    return requiredRoles.some(role => userRoles.includes(role));

  } catch (error) {
    console.error("Error fetching resource or tenant:", error);
    return false;
  }
};





















// import { getResourceByName, getTenantById } from "../../../../Services/apiData";

// export const canAccessResource = async (resourceName, userRoles) => {
//   try {
//     const response = await getResourceByName(resourceName);
//     const resource = response.data;
//     const  requiredRoles  = resource.requiredRoles;
//     console.log(`requiredRoles ${requiredRoles}`);
//     getTenantValues();


//     return requiredRoles.some(role => userRoles.includes(role));
    
//   } catch (error) {
//     console.error("Error fetching resource:", error);
//     return false;
//   }
// };


// export const  getTenantValues = async () => {
//   try {
//     const response = await getTenantById();
//     const resource = response.data;
//     console.log(`tenant Values are ${resource}`);

    
//   } catch (error) {
//     console.error("Error fetching resource:", error);
//     return false;
//   }
// };






// export const canAccessResource = async (resourceName, userRoles) => {
//   try {
//     const response = await getResourceByName(resourceName);
//     const resource = response.data;
//     const  requiredRolesOld  = resource.requiredRoles;
//     console.log(`requiredRoles ${requiredRoles}`);




//     return requiredRoles.some(role => userRoles.includes(role));
    
    
//   } catch (error) {
//     console.error("Error fetching resource:", error);
//     return false;
//   }
// };




