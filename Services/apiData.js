import axios from 'axios';

export const REST_API_BASE_URL0 = 'http://172.20.85.83:8000/api/';
export const REST_API_BASE_URL = 'http://172.20.85.83:8000/api/employee';
export const REST_API_BASE_URL1 = 'http://172.20.85.83:8000/api/organization';
export const REST_API_BASE_URL2 = 'http://172.20.85.83:8000/api/recruitment';
export const REST_API_BASE_URL3 = 'http://172.20.85.83:8000/api/training';
export const REST_API_BASE_URL4 = 'http://172.20.85.83:8000/api/';
export const REST_API_BASE_URL5 = 'http://172.20.85.83:8000/api/auth/';



/* 
172.20.136.77()

*/

const getAuthToken = () => localStorage.getItem('accessToken');
const getTenantId = () => localStorage.getItem('tenantId');

const apiClient0 = axios.create({
  baseURL: REST_API_BASE_URL0,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` // Attach the token here
  }
});



const apiClient = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` // Attach the token here
  }
});

const apiClient1 = axios.create({
  baseURL: REST_API_BASE_URL1,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` // Attach the token here
  }
});

const apiClient2 = axios.create({
  baseURL: REST_API_BASE_URL2,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` // Attach the token here
  }
});

const apiClient3 = axios.create({
  baseURL: REST_API_BASE_URL3,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` // Attach the token here
  }
});

const apiClient4 = axios.create({
  baseURL: REST_API_BASE_URL4,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` // Attach the token here
  }
});

const apiClient5 = axios.create({
  baseURL: REST_API_BASE_URL5,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}` // Attach the token here
  }
});


export const createUser = (employeeId) => {
  const tenantId = getTenantId(); // Assuming tenantId is fetched correctly
  const url = `users/${tenantId}/add?employeeId=${employeeId}`; // Correctly use employeeId
  return apiClient5.post(url); // No need to send employeeId in the request body
};




export const getDepartementById = (departmentId) => {
  const tenantId = getTenantId(); 
  return apiClient1.get(`departments/${tenantId}/get/${departmentId}`);
};



export const getTenantById = () => {
  const tenantId = getTenantId();
  const url = `tenants/get/${tenantId}`;
  return apiClient1.get(url);
};



export const listLocation = () => {
  const tenantId = getTenantId(); 
  return apiClient1.get(`locations/${tenantId}/get-all`);
};

export const listEducationLevels = () => {
  const tenantId = getTenantId(); 
  return apiClient1.get(`education-levels/${tenantId}/get-all`);
};
export const listFieldStudies = () => {
  const tenantId = getTenantId(); 
  return apiClient1.get(`field-of-studies/${tenantId}/get-all`);
};

export const listDepartement = () => {
  const tenantId = getTenantId(); 
  return apiClient1.get(`departments/${tenantId}/get-all`);
  };

export const listJobRegestration = () => {
  const tenantId = getTenantId(); 
  return apiClient1.get(`job-registrations/${tenantId}/get-all`);
};

export const jobGradeById = (jobGradeId) => {
  const tenantId = getTenantId(); 
  return apiClient1.get(`job-grades/${tenantId}/get/${jobGradeId}`);
};

 export const fetchJobGradeByJobId = (jobId) => {
  const tenantId = getTenantId(); 
  return apiClient1.get(`job-registrations/${tenantId}/get/${jobId}`);
};


export const getJoblistByDepartementId = (departmentId) => {
  const tenantId = getTenantId(); 
  return apiClient1.get(`job-registrations/${tenantId}/jobs/${departmentId}`);
};


export const createUserTitleName = (titleName) => {
  const tenantId = getTenantId(); 
  const url = `title-names/${tenantId}/add`;
  return apiClient.post(url, titleName);
};

export const listTitleName = () => {
  const tenantId = getTenantId(); 
  const url = `title-names/${tenantId}/get-all`;
  return apiClient.get(url);
  };
  
  export const listEmployees = () => {
    const tenantId = getTenantId();
  const url = `employees/${tenantId}/get-all`;
  return apiClient.get(url);
  };


  export const createEmployee = (formData) => {
    const tenantId = getTenantId(); // Ensure tenantId is retrieved here
    const url = `employees/${tenantId}/add`;
    return apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Important for file uploads
      }
    });
  };

  export const updateEmployee = (employeeId,formData) => {
    const tenantId = getTenantId(); // Ensure tenantId is retrieved here
    const url = `employees/${tenantId}/update/${employeeId}`;
    return apiClient.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Important for file uploads
      }
    });
  };
  
// export const updateEmployee = (employeeId, employee) => {
//   const url = `employees/${tenantId}/update/${employeeId}`;
//   return apiClient.put(url, employee);
// };
  
  


//export const listEmployees = REST_API_BASE_URL + `employees/${tenantId}/get-all`
//export const listLanguageNames = REST_API_BASE_URL + `language-names/${tenantId}/get-all`

export const listLanguageNames = () => {
  const tenantId = getTenantId();
  const url = `language-names/${tenantId}/get-all`;
  return apiClient.get(url);
  };


export const createUserLangauge = (language) => {
  const tenantId = getTenantId();
const url = `language-names/${tenantId}/add`;
return apiClient.post(url, language);
};

export const getEmployeeImageById = async (id) => {
  const tenantId = getTenantId(); // Ensure tenantId is retrieved here
  const url = `employees/${tenantId}/download-image/${id}`;
  
  // Make sure to set responseType to 'blob' if you expect a binary image file
  const response = await apiClient.get(url, { responseType: 'blob' });
  
  // Create an object URL from the response data (blob)
  const imageUrl = URL.createObjectURL(response.data);
  
  return imageUrl;
};




export const deleteEmployee = (employeeId) => {
  const tenantId = getTenantId();
  const url = `employees/${tenantId}/delete/${employeeId}`;
  return apiClient.delete(url);
};


export const getEmployeeById = (id) => {
  const tenantId = getTenantId();
  const url = `employees/${tenantId}/get/${id}`;
  return apiClient.get(url);
};

export const getEmployeeByEmployeId = (employeeId) => {
  const tenantId = getTenantId();
  const url = `employees/${tenantId}/get?employee-id=${employeeId}`;
  return apiClient.get(url);
};

export const getResourceByName = (resourseName) => {
  const tenantId = getTenantId();
  const url = `resources/${tenantId}/get/resource-name?resourceName=${resourseName}`;
  return apiClient5.get(url);
};


export const getEmployeeRequesterId = (requesterId) => {
  const tenantId = getTenantId();
  const url = `employees/${tenantId}/get/${requesterId}`;
  return apiClient.get(url);
};


// Skill APIs
export const createSkill = (id, skill) => {
  const tenantId = getTenantId();
  const url = `skills/${tenantId}/${id}/add`;
  return apiClient.post(url, skill);
};

export const listSkills = (employeeId) => {
  const tenantId = getTenantId();
  const url = `skills/${tenantId}/${employeeId}/get-all`;
  return apiClient.get(url);
};

export const deleteSkill = (employeeId, skillId) => {
  const tenantId = getTenantId();
  const url = `skills/${tenantId}/${employeeId}/delete/${skillId}`;
  return apiClient.delete(url);
};

export const getSkillById = (id, skillId) => {
  const tenantId = getTenantId();
  const url = `skills/${tenantId}/${id}/get/${skillId}`;
  return apiClient.get(url);
};

export const updateSkill = (id, skillId, data) => {
  const tenantId = getTenantId();
  const url = `skills/${tenantId}/${id}/update/${skillId}`;
  return apiClient.put(url, data);
};

// Training APIs
export const createTrainings = (id, formData) => {
  const tenantId = getTenantId();
  const url = `trainings/${tenantId}/${id}/add`;
  return apiClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const updateTrainings = (id, trainingId, data) => {
  const tenantId = getTenantId();
  const url = `trainings/${tenantId}/${id}/update/${trainingId}`;
  return apiClient.put(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// export const updateTrainings = (id, trainingId, data) => {
//   const tenantId = getTenantId();
//   const url = `trainings/${tenantId}/${id}/update/${trainingId}`;
//   return apiClient.put(url, data);
// };


export const listTrainings = (employeeId) => {
  const tenantId = getTenantId();
  const url = `trainings/${tenantId}/${employeeId}/get-all`;
  return apiClient.get(url);
};

export const deleteTrainings = (employeeId, trainingId) => {
  const tenantId = getTenantId();
  const url = `trainings/${tenantId}/${employeeId}/delete/${trainingId}`;
  return apiClient.delete(url);
};

export const getTrainingsById = (id, trainingId) => {
  const tenantId = getTenantId();
  const url = `trainings/${tenantId}/${id}/get/${trainingId}`;
  return apiClient.get(url);
};


export const getTrainingsFileById = async (employerId, trainingId) => {
  const tenantId = getTenantId();
  const url = `trainings/${tenantId}/${employerId}/download-certificate/${trainingId}`;
  
  // Fetch the file as binary data (blob)
  const response = await apiClient.get(url, { responseType: 'blob' });

  return response.data; // Return the blob directly
};




// Language APIs
export const createLanguage = (id, language) => {
  const tenantId = getTenantId();
  const url = `languages/${tenantId}/${id}/add`;
  return apiClient.post(url, language);
};

export const listLanguage = (employeeId) => {
  const tenantId = getTenantId();
  const url = `languages/${tenantId}/${employeeId}/get-all`;
  return apiClient.get(url);
};

export const deleteLanguage = (employeeId, languageId) => {
  const tenantId = getTenantId();
  const url = `languages/${tenantId}/${employeeId}/delete/${languageId}`;
  return apiClient.delete(url);
};

export const getLanguageById = (id, languageId) => {
  const tenantId = getTenantId();
  const url = `languages/${tenantId}/${id}/get/${languageId}`;
  return apiClient.get(url);
};

export const updateLanguage = (id, languageId, data) => {
  const tenantId = getTenantId();
  const url = `languages/${tenantId}/${id}/update/${languageId}`;
  return apiClient.put(url, data);
};

// Family APIs
export const createFamily = (id, family) => {
  const tenantId = getTenantId();
  const url = `families/${tenantId}/${id}/add`;
  return apiClient.post(url, family);
};

export const listOfFamilyOfEmployee = (employeeId) => {
  const tenantId = getTenantId();
  const url = `families/${tenantId}/${employeeId}/get-all`;
  return apiClient.get(url);
};

export const deleteFamilyOfEmployee = (employeeId, familyId) => {
  const tenantId = getTenantId();
  const url = `families/${tenantId}/${employeeId}/delete/${familyId}`;
  return apiClient.delete(url);
};

export const getFamilyById = (id, familyId) => {
  const tenantId = getTenantId();
  const url = `families/${tenantId}/${id}/get/${familyId}`;
  return apiClient.get(url);
};

export const updateFamilyOfEmployee = (id, familyId, data) => {
  const tenantId = getTenantId();
  const url = `families/${tenantId}/${id}/update/${familyId}`;
  return apiClient.put(url, data);
};

// Reference APIs
export const createReference = (id, reference) => {
  const tenantId = getTenantId();
  const url = `references/${tenantId}/${id}/add`;
  return apiClient.post(url, reference);
};

export const listOfReference = (employeeId) => {
  const tenantId = getTenantId();
  const url = `references/${tenantId}/${employeeId}/get-all`;
  return apiClient.get(url);
};

export const deleteReference = (employeeId, referenceId) => {
  const tenantId = getTenantId();
  const url = `references/${tenantId}/${employeeId}/delete/${referenceId}`;
  return apiClient.delete(url);
};

export const getReferenceById = (id, referenceId) => {
  const tenantId = getTenantId();
  const url = `references/${tenantId}/${id}/get/${referenceId}`;
  return apiClient.get(url);
};

export const updateReference = (id, referenceId, data) => {
  const tenantId = getTenantId();
  const url = `references/${tenantId}/${id}/update/${referenceId}`;
  return apiClient.put(url, data);
};

// Address APIs
export const createAddress = (id, address) => {
  const tenantId = getTenantId();
  const url = `addresses/${tenantId}/${id}/add`;
  return apiClient.post(url, address);
};

export const listOfAddress = (employeeId) => {
  const tenantId = getTenantId();
  const url = `addresses/${tenantId}/${employeeId}/get-all`;
  return apiClient.get(url);
};

export const deleteAddress = (employeeId, addressId) => {
  const tenantId = getTenantId();
  const url = `addresses/${tenantId}/${employeeId}/delete/${addressId}`;
  return apiClient.delete(url);
};

export const getAddressById = (id, addressId) => {
  const tenantId = getTenantId();
  const url = `addresses/${tenantId}/${id}/get/${addressId}`;
  return apiClient.get(url);
};

export const updateAddress = (id, addressId, data) => {
  const tenantId = getTenantId();
  const url = `addresses/${tenantId}/${id}/update/${addressId}`;
  return apiClient.put(url, data);
};

// Experience APIs
export const createExperience = (id, experience) => {
  const tenantId = getTenantId();
  const url = `experiences/${tenantId}/${id}/add`;
  return apiClient.post(url, experience, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const updateExperience = (id, experienceId,data) => {
  const tenantId = getTenantId();
  const url = `experiences/${tenantId}/${id}/update/${experienceId}`;
  return apiClient.put(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
//const fileUrl = `${REST_API_BASE_URL}educations/1/${employerId}/download-document/${educationId}`;

export const getEducationFileById = async (employerId, educationId) => {
  const tenantId = getTenantId();
  const url = `educations/${tenantId}/${employerId}/download-document/${educationId}`;
  
  // Fetch the file as binary data (blob)
  const response = await apiClient.get(url, { responseType: 'blob' });

  return response.data; // Return the blob directly
};



export const getExperienceFileById = async (employerId, experienceId) => {
  const tenantId = getTenantId();
  const url = `experiences/${tenantId}/${employerId}/download-document/${experienceId}`;
  
  // Fetch the file as binary data (blob)
  const response = await apiClient.get(url, { responseType: 'blob' });

  return response.data; // Return the blob directly
};

// export const updateExperience = (id, experienceId, data) => {
//   const url = `experiences/${tenantId}/${id}/update/${experienceId}`;
//   return apiClient.put(url, data);
// };

// export const createExperience = (id, experience) => {
//   const url = `experiences/${tenantId}/${id}/add`;
//   return apiClient.post(url, experience);
// };

export const listOfExperience = (employeeId) => {
  const tenantId = getTenantId();
  const url = `experiences/${tenantId}/${employeeId}/get-all`;
  return apiClient.get(url);
};

export const deleteExperience = (employeeId, experienceId) => {
  const tenantId = getTenantId();
  const url = `experiences/${tenantId}/${employeeId}/delete/${experienceId}`;
  return apiClient.delete(url);
};

export const getExperienceById = (id, experienceId) => {
  const tenantId = getTenantId();
  const url = `experiences/${tenantId}/${id}/get/${experienceId}`;
  return apiClient.get(url);
};



// Education APIs
export const createEducation = (id, education) => {
  const tenantId = getTenantId();
  const url = `educations/${tenantId}/${id}/add`;
  return apiClient.post(url, education, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const updateEducation = (id, educationId, data) => {
  const tenantId = getTenantId();
  const url = `educations/${tenantId}/${id}/update/${educationId}`;
  return apiClient.put(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};


export const listOfEducation = (employeeId) => {
  const tenantId = getTenantId();
  const url = `educations/${tenantId}/${employeeId}/get-all`;
  return apiClient.get(url);
};

export const deleteEducation = (employeeId, educationId) => {
  const url = `educations/${tenantId}/${employeeId}/delete/${educationId}`;
  return apiClient.delete(url);
};



export const getEducationById = (id, educationId) => {
  const tenantId = getTenantId();
  const url = `educations/${tenantId}/${id}/get/${educationId}`;
  return apiClient.get(url);
};


export const addRecruitment = (data) => {
  const tenantId = getTenantId();
  const url = `recruitments/${tenantId}/add`;
  return apiClient2.post(url, data);
};

export const listRecruitment = () => {
  const tenantId = getTenantId();
  const url = `recruitments/${tenantId}/get-all`;
  return apiClient2.get(url);
};

export const deleteRecruitment = (recruitmentId) => {
  const tenantId = getTenantId();
  const url = `recruitments/${tenantId}/delete/${recruitmentId}`;
  return apiClient2.delete(url);
};

export const getRecruitmentbyId = (recruitmentId) => {
  const tenantId = getTenantId();
  const url = `recruitments/${tenantId}/get/${recruitmentId}`;
  return apiClient2.get(url);
};

export const editRecruitment = (recruitmentId, data) => {
  const tenantId = getTenantId();
  const url = `recruitments/${tenantId}/update/${recruitmentId}`;
  return apiClient2.put(url, data);
};

export const editRecruitmentbyapprove = (recruitmentId, data) => {
  const tenantId = getTenantId();
  const url = `recruitments/${tenantId}/approve/${recruitmentId}`;
  return apiClient2.put(url, data);
};


// Advertisement APIs
export const addAdvertisement = (data) => {
  const tenantId = getTenantId();
  const url = `advertisements/${tenantId}/add`;
  return apiClient2.post(url, data);
};

export const listAdvertisement = () => {
  const tenantId = getTenantId();
  const url = `advertisements/${tenantId}/get-all`;
  return apiClient2.get(url);
};

export const deleteAdvertisement = (advertisementId) => {
  const tenantId = getTenantId();
  const url = `advertisements/${tenantId}/delete/${advertisementId}`;
  return apiClient2.delete(url);
};

export const editAdvertisement = (advertisementId, data) => {
  const tenantId = getTenantId();
  const url = `advertisements/${tenantId}/update/${advertisementId}`;
  return apiClient2.put(url, data);
};

export const getAdvertisementbyId = (advertisementId) => {
  const tenantId = getTenantId();
  const url = `advertisements/${tenantId}/get/${advertisementId}`;
  return apiClient2.get(url);
};

export const listMediaType = () => {
  const tenantId = getTenantId();
  const url = `media-types/${tenantId}/get-all`;
  return apiClient2.get(url);
};

// create apis for applicants
export const addAssessment = (data) => {
  const tenantId = getTenantId();
  const url = `assessment-weights/${tenantId}/add`;
  return apiClient2.post(url, data);
};

export const listAssessment = () => {
  const tenantId = getTenantId();
  const url = `assessment-weights/${tenantId}/get-all`;
  return apiClient2.get(url);
};      


export const deleteAssessment = (assessmentId) => {
  const tenantId = getTenantId();
  const url = `assessment-weights/${tenantId}/delete/${assessmentId}`;
  return apiClient2.delete(url);
};

export const getAssessmentbyId = (assessmentId) => {
  const tenantId = getTenantId();
  const url = `assessment-weights/${tenantId}/get/${assessmentId}`;
  return apiClient2.get(url);
};
export const getAssessmentBYrecruitmentId = (recruitmentId) => {
  const tenantId = getTenantId();
  const url = `assessment-weights/${tenantId}/get/recruitment/${recruitmentId}`;
  return apiClient2.get(url);
};


export const editAssessment = (assessmentId, data) => {
  const tenantId = getTenantId();
  const url = `assessment-weights/${tenantId}/update/${assessmentId}`;
  return apiClient2.put(url, data);
};

// call api for shortlist criterial

export const addApplicant = (data) => {
  const tenantId = getTenantId();
  const url = `applicants/${tenantId}/add`;
  return apiClient2.post(url, data);
};

export const listApplicant = (recruitmentId) => {
  const tenantId = getTenantId();
  const url = `applicants/${tenantId}/${recruitmentId}/get-all`;
  return apiClient2.get(url);
};

export const deleteApplicant = (applicantId) => {
  const tenantId = getTenantId();
  const url = `applicants/${tenantId}/delete/${applicantId}`;
  return apiClient2.delete(url);
};

export const getApplicantbyId = (applicantId) => {
  const tenantId = getTenantId();
  const url = `applicants/${tenantId}/get/${applicantId}`;
  return apiClient2.get(url);
};

export const editApplicant = (applicantId, data) => {
  const tenantId = getTenantId();
  const url = `applicants/${tenantId}/update/${applicantId}`;
  return apiClient2.put(url, data);
};


export const addCriteria = (data) => {
  const tenantId = getTenantId();
  const url = `shortlist-criteria/${tenantId}/add`;
  return apiClient2.post(url, data);
};

export const listCriteria = (recruitmentId) => {
  const tenantId = getTenantId();
  const url = `shortlist-criteria/${tenantId}/get-all/${recruitmentId}`;
  return apiClient2.get(url);
};

export const deleteCriteria = (criteriaId) => {
  const tenantId = getTenantId();
  const url = `shortlist-criteria/${tenantId}/delete/${criteriaId}`;
  return apiClient2.delete(url);
};

export const getCriteriaById = (criteriaId) => {
  const tenantId = getTenantId();
  const url = `shortlist-criteria/${tenantId}/get/${criteriaId}`;
  return apiClient2.get(url);
};

export const editCriteria = (criteriaId, data) => {
  const tenantId = getTenantId();
  const url = `shortlist-criteria/${tenantId}/update/${criteriaId}`;
  return apiClient2.put(url, data);
};
export const addApplicantTraining = (applicantId, data) => {
  const tenantId = getTenantId();
  const url = `applicant-trainings/${tenantId}/${applicantId}/add`;
  return apiClient2.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const editApplicantCertificate = (applicantId, trainingId, data) => {
  const tenantId = getTenantId();
  const url = `applicant-trainings/${tenantId}/${applicantId}/update/${trainingId}`;
  return apiClient2.put(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getApplicatantCertificatefileById = async (applicantId, trainingId) => {
  const tenantId = getTenantId();
  const url = `applicant-trainings/${tenantId}/${applicantId}/download-certificate/${trainingId}`;

  // Fetch the file as binary data (blob)
  const response = await apiClient2.get(url, { responseType: 'blob' });
  return response.data; // Return the blob directly
};


export const listApplicantCertificate = (applicantId) => {
  const tenantId = getTenantId();
  const url = `applicant-trainings/${tenantId}/${applicantId}/get-all`;
  return apiClient2.get(url);
};

export const deleteApplicantCertificate = (applicantId, trainingId) => {
  const tenantId = getTenantId();
  const url = `applicant-trainings/${tenantId}/${applicantId}/delete/${trainingId}`;
  return apiClient2.delete(url);
};

export const getApplicantCertificateById = (applicantId, trainingId) => {
  const tenantId = getTenantId();
  const url = `applicant-trainings/${tenantId}/${applicantId}/get/${trainingId}`;
  return apiClient2.get(url);
};



// create api for applicant Education

export const addApplicantEducations = (applicantId, data) => {
  const tenantId = getTenantId();
  const url = `applicant-educations/${tenantId}/${applicantId}/add`;
  return apiClient2.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
    // const fileUrl = `${REST_API_BASE_URL}applicant-educations/1/${applicantId}/download-document/${educationId}`;


    export const getApplicatantEducationfileById = async (applicantId, educationId) => {
      const tenantId = getTenantId();
      const url = `applicant-educations/${tenantId}/${applicantId}/download-document/${educationId}`;
      
      // Fetch the file as binary data (blob)
      const response = await apiClient2.get(url, { responseType: 'blob' });
      return response.data; // Return the blob directly
    };

export const listApplicantEducations = (applicantId) => {
  const tenantId = getTenantId();
  const url = `applicant-educations/${tenantId}/${applicantId}/get-all`;
  return apiClient2.get(url);
};

export const deleteApplicantEducations = (applicantId, educationId) => {
  const tenantId = getTenantId();
  const url = `applicant-educations/${tenantId}/${applicantId}/delete/${educationId}`;
  return apiClient2.delete(url);
};

export const getApplicantEducationsById = (applicantId, educationId) => {
  const tenantId = getTenantId();
  const url = `applicant-educations/${tenantId}/${applicantId}/get/${educationId}`;
  return apiClient2.get(url);
};
export const editApplicantEducations = (applicantId, educationId, data) => {
  const tenantId = getTenantId();
  const url = `applicant-educations/${tenantId}/${applicantId}/update/${educationId}`;
  return apiClient2.put(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};


// create api for applicant Reference
export const addApplicantReferences = (applicantId, data) => {
  const tenantId = getTenantId();
  const url = `applicant-references/${tenantId}/${applicantId}/add`;
  return apiClient2.post(url, data);
};

export const listApplicantReferences = (applicantId) => {
  const tenantId = getTenantId();
  const url = `applicant-references/${tenantId}/${applicantId}/get-all`;
  return apiClient2.get(url);
};

export const deleteApplicantReferences = (applicantId, referenceId) => {
  const tenantId = getTenantId();
  const url = `applicant-references/${tenantId}/${applicantId}/delete/${referenceId}`;
  return apiClient2.delete(url);
};

export const getApplicantReferencesbyId = (applicantId, referenceId) => {
  const tenantId = getTenantId();
  const url = `applicant-references/${tenantId}/${applicantId}/get/${referenceId}`;
  return apiClient2.get(url);
};

export const editApplicantReference = (applicantId, referenceId, data) => {
  const tenantId = getTenantId();
  const url = `applicant-references/${tenantId}/${applicantId}/update/${referenceId}`;
  return apiClient2.put(url, data);
};
// create api for applicant Language
// Applicant Language APIs
export const addApplicantLanguages = (applicantId, data) => {
  const tenantId = getTenantId();
  const url = `applicant-languages/${tenantId}/${applicantId}/add`;
  return apiClient2.post(url, data);
};

export const listApplicantLanguages = (applicantId) => {
  const tenantId = getTenantId();
  const url = `applicant-languages/${tenantId}/${applicantId}/get-all`;
  return apiClient2.get(url);
};


export const deleteApplicantLanguages = (applicantId, LanguagesId) => {
  const tenantId = getTenantId();
  return apiClient2.delete(`applicant-languages/${tenantId}/${applicantId}/delete/${LanguagesId}`);
};

export const getApplicantLanguagesbyId = (applicantId, LanguagesId) => {
  const tenantId = getTenantId();
  return apiClient2.get(`applicant-languages/${tenantId}/${applicantId}/get/${LanguagesId}`);
};

export const editApplicantLanguages = (applicantId, LanguagesId, data) => {
  const tenantId = getTenantId();
  return apiClient2.put(`applicant-languages/${tenantId}/${applicantId}/update/${LanguagesId}`, data);
};

// create api for applicant Experences
export const addApplicantExperences = (applicantId, data) => {
  const tenantId = getTenantId();
  const url = `applicant-experiences/${tenantId}/${applicantId}/add`;
  return apiClient2.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};


export const listApplicantExperences = (applicantId) => {
  const tenantId = getTenantId();
  return apiClient2.get(`applicant-experiences/${tenantId}/${applicantId}/get-all`);
};

export const deleteApplicantExperences = (applicantId, experienceId) => {
  const tenantId = getTenantId();
  return apiClient2.delete(`applicant-experiences/${tenantId}/${applicantId}/delete/${experienceId}`);
};

export const getApplicantExperencesbyId = (applicantId, experienceId) => {
  const tenantId = getTenantId();
  return apiClient2.get(`applicant-experiences/${tenantId}/${applicantId}/get/${experienceId}`);
};
export const updateApplicantExperience = (applicantId, experienceId, data) => {
  const tenantId = getTenantId();
  const url = `applicant-experiences/${tenantId}/${applicantId}/update/${experienceId}`;
  return apiClient2.put(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getApplicatantExperiencefileById = async (applicantId, educationId) => {
  const tenantId = getTenantId();
  const url = `applicant-educations/${tenantId}/${applicantId}/download-document/${educationId}`;
  
  // Fetch the file as binary data (blob)
  const response = await apiClient2.get(url, { responseType: 'blob' });
  return response.data; // Return the blob directly
};


// create api for Exam Result of applicants
export const addExamResult = (recruitmentId, applicantId, data) => {
  const tenantId = getTenantId();
  return apiClient2.post(`exam-result/${tenantId}/${recruitmentId}/${applicantId}/add`, data);
};

export const listExamResult = (recruitmentId) => {
  const tenantId = getTenantId();
  return apiClient2.get(`exam-result/${tenantId}/${recruitmentId}/get-all`);
};

export const deleteExamResult = (recruitmentId, applicantId, examResultId) => {
  const tenantId = getTenantId();
  return apiClient2.delete(`exam-result/${tenantId}/${recruitmentId}/${applicantId}/delete/${examResultId}`);
};

export const getExamResultById = (recruitmentId, applicantId, examResultId) => {
  const tenantId = getTenantId();
  return apiClient2.get(`exam-result/${tenantId}/${recruitmentId}/${applicantId}/get/${examResultId}`);
};

export const updateExamResult = (recruitmentId, applicantId, examResultId, data) => {
  const tenantId = getTenantId();
  return apiClient2.put(`exam-result/${tenantId}/${recruitmentId}/${applicantId}/update/${examResultId}`, data);
};
  //the apis related with training

export const addCourseCategory = (category) => {
  const tenantId = getTenantId();
  return apiClient3.post(`course-categories/${tenantId}/add`, category);
};

export const addCourseTraining = (coursetraining) => {
  const tenantId = getTenantId();
  return apiClient3.post(`training-courses/${tenantId}/add`, coursetraining);
};

export const listCourseTraining = (categoryId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`training-courses/${tenantId}/get-all/${categoryId}`);
};

export const listCourseCategory = () => {
  const tenantId = getTenantId();
  return apiClient3.get(`course-categories/${tenantId}/get-all`);
};

export const deleteTrainingCourses = (courseId) => {
  const tenantId = getTenantId();
  return apiClient3.delete(`training-courses/${tenantId}/delete/${courseId}`);
};


export const getCourseTrainingById = (courseId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`training-courses/${tenantId}/get/${courseId}`);
};

export const updateCourseTraining = (courseId, data) => {
  const tenantId = getTenantId();
  return apiClient3.put(`training-courses/${tenantId}/update/${courseId}`, data);
}

export const listCourseTrainingByCategory = (categoryId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`training-courses/${tenantId}/get-all/${categoryId}`);
};

// Training Institution APIs
export const addTrainingInstution = (trainingInstution) => {
  const tenantId = getTenantId();
  return apiClient3.post(`training-institutions/${tenantId}/add`, trainingInstution);
};

export const listTrainingInstution = () => {
  const tenantId = getTenantId();
  return apiClient3.get(`training-institutions/${tenantId}/get-all`);
};



export const getTrainingInstutionById = (instutionId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`training-institutions/${tenantId}/get/${instutionId}`);
};

export const updateTrainingInstution = (instutionId, data) => {
  const tenantId = getTenantId();
  return apiClient3.put(`training-institutions/${tenantId}/update/${instutionId}`, data);
};

export const deleteTrainingInstution = (instutionId) => {
  const tenantId = getTenantId();
  return apiClient3.delete(`training-institutions/${tenantId}/delete/${instutionId}`);
};


// create api for Annumal Training Request and related apis 

export const addAnnualTrainingRequest = (trainingsRequest) => {
  const tenantId = getTenantId();
  return apiClient3.post(`trainings/${tenantId}/add`, trainingsRequest);
};

export const getAnnualTrainingById = (trainingId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`trainings/${tenantId}/get/${trainingId}`);
};

export const getTrainingStatusByStatus = (status) => {
  const tenantId = getTenantId();
  return apiClient3.get(`trainings/${tenantId}/get/status`, {
    params: {
      'training-status': status
    }
  });
};
export const listOfAnnualTrainingRequest = () => {
  const tenantId = getTenantId();
  console.log("Tenant ID:", tenantId); // Debugging line
  return apiClient3.get(`trainings/${tenantId}/get-all`);
};



export const deleteAnnualTrainingRequest = (trainingId) => {
  const tenantId = getTenantId();
  return apiClient3.delete(`trainings/${tenantId}/delete/${trainingId}`);
};

export const listOfdepartement = () => {
  const tenantId = getTenantId();
  return apiClient1.get(`departments/${tenantId}/get-all`);
};

export const listOfPayGrade = () => {
  const tenantId = getTenantId();
  return apiClient1.get(`pay-grades/${tenantId}/get-all`);
};

export const listOfBudgetYears = () => {
  const tenantId = getTenantId();
  return apiClient4.get(`budget-years/${tenantId}/get-all-years`);
};

export const updateAnnualTrainingRequest = (trainingId, data) => {
  const tenantId = getTenantId();
  return apiClient3.put(`trainings/${tenantId}/update/${trainingId}`, data);
};

export const trainingRequestStatus = (trainingId, data) => {
  const tenantId = getTenantId();
  return apiClient3.put(`trainings/${tenantId}/approve/${trainingId}`, data);
};

//craete api for traineer participants
export const addTrainingparticipant = (trainingId, data) => {
  const tenantId = getTenantId();
  return apiClient3.post(`training-participants/${tenantId}/${trainingId}/add`, data);
};

export const listOfTrainingParticipant = (trainingId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`training-participants/${tenantId}/${trainingId}/get-all`);
};

export const deleteParticipants = (trainingId, participantId) => {
  const tenantId = getTenantId();
  return apiClient3.delete(`training-participants/${tenantId}/${trainingId}/delete/${participantId}`);
};

export const getTrainingParticipantsById = (trainingId, participantId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`training-participants/${tenantId}/${trainingId}/get/${participantId}`);
};

export const updateTrainingPaercipants = (trainingId, participantId, data) => {
  const tenantId = getTenantId();
  return apiClient3.put(`training-participants/${tenantId}/${trainingId}/update/${participantId}`, data);
};


// list  of api s for annual training plan
export const createAnnualTrainingPlan = (trainingPlan) => {
  const tenantId = getTenantId();
  return apiClient3.post(`annual-training-plans/${tenantId}/add`, trainingPlan);
};

export const listAnnualTrainingPlan = () => {
  const tenantId = getTenantId();
  return apiClient3.get(`annual-training-plans/${tenantId}/get-all`);
};

export const getAnnualTrainingPlanByDepartement = (departmentId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`annual-training-plans/${tenantId}/get/department/${departmentId}`);
};


export const deleteAnnualTrainingPlan = (trainingPlanId) => {
  const tenantId = getTenantId();
  return apiClient3.delete(`annual-training-plans/${tenantId}/delete/${trainingPlanId}`);
};

export const getAnnualTrainingPlanById = (trainingPlanId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`annual-training-plans/${tenantId}/get/${trainingPlanId}`);
};

export const updateAnnualTrainingPlan = (trainingPlanId, trainingPlan) => {
  const tenantId = getTenantId();
  return apiClient3.put(`annual-training-plans/${tenantId}/update/${trainingPlanId}`, trainingPlan);
};



// create list of  pre-service training
export const addCourseType = (courseType) => {
  const tenantId = getTenantId();
  return apiClient3.post(`course-types/${tenantId}/add`, courseType);
};

export const listCourseType = () => {
  const tenantId = getTenantId();
  return apiClient3.get(`course-types/${tenantId}/get-all`);
};


export const addPreCourse = (preServiceCourses) => {
  const tenantId = getTenantId();
  return apiClient3.post(`pre-service-courses/${tenantId}/add`, preServiceCourses);
}; 



export const getDocuments = () => {
  const tenantId = getTenantId();
  return apiClient3.get(`documents/${tenantId}/get-all`);
};

export const listPreCourse = (courseTypeId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`pre-service-courses/${tenantId}/get/course-type/${courseTypeId}`);
};


export const deletePreCourse = (courseId) => {
  const tenantId = getTenantId();
  return apiClient3.delete(`pre-service-courses/${tenantId}/delete/${courseId}`);
};

export const getPreServiceCourseById = (precourseId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`pre-service-courses/${tenantId}/get/${precourseId}`);
};
export const updatePreServiceCourse = (precourseId, data) => {
  const tenantId = getTenantId();
  return apiClient3.put(`pre-service-courses/${tenantId}/update/${precourseId}`, data);
};


export const addPreServiceTraining = (data) => {
  const tenantId = getTenantId();
  const url = `pre-service-trainees/${tenantId}/add`;
  return apiClient3.post(url,data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const updatePreServiceTraining = (traineeId, data) => {
  const tenantId = getTenantId();
  const url = `pre-service-trainees/${tenantId}/update/${traineeId}`;
  return apiClient3.put(url,data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getPreServiceTrainingImageById = async (preServiceTrainingId) => {
  const tenantId = getTenantId(); // Ensure tenantId is retrieved here
  const url = `pre-service-trainees/${tenantId}/download-image/${preServiceTrainingId}`;
  
  // Make sure to set responseType to 'blob' if you expect a binary image file
  const response = await apiClient3.get(url, { responseType: 'blob' });
  
  // Create an object URL from the response data (blob)
  const imageUrl = URL.createObjectURL(response.data);
  
  return imageUrl;
};




export const listPreServiceTraining = () => {
  const tenantId = getTenantId();
  return apiClient3.get(`pre-service-trainees/${tenantId}/get-all`);
};

export const deletePresServiceTraining = (traineeId) => {
  const tenantId = getTenantId();
  return apiClient3.delete(`pre-service-trainees/${tenantId}/delete/${traineeId}`);
};

export const getPreServiceTrainingByYearId = (yearId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`pre-service-trainees/${tenantId}/get-all/${yearId}`);
};

export const getPreServiceTrainingById = (traineeId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`pre-service-trainees/${tenantId}/get/${traineeId}`);
};

export const getPreServiceTraineeCourseById = (traineeId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`pre-service-courses/${tenantId}/get/trainee-courses/${traineeId}`);
};

export const deletePreServiceTraineeCourse = (traineeId, courseId) => {
  const tenantId = getTenantId();
  return apiClient3.delete(`pre-service-courses/${tenantId}/remove-trainee-course/${traineeId}/${courseId}`);
};

export const updatePreServiceTrainieeCourese = (traineeId, data) => {
  const tenantId = getTenantId();
  return apiClient3.put(`pre-service-trainees/${tenantId}/add-courses/${traineeId}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};


export const createPreServiceTraineeResult = (traineeId, courseId, data) => {
  const tenantId = getTenantId();
  return apiClient3.post(`trainee-results/${tenantId}/add/${traineeId}/${courseId}`, data);
};

export const listPreServiceTraineeResult = (courseId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`trainee-results/${tenantId}/get/course-results/${courseId}`);
};

export const deletePreServiceTraineeResult = (resultId) => {
  const tenantId = getTenantId();
  return apiClient3.delete(`trainee-results/${tenantId}/delete/${resultId}`);
};

export const getPreServiceTraineeCourseResultById = (traineeId, courseId, resultId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`trainee-results/${tenantId}/get/${traineeId}/${courseId}/${resultId}`);
};

export const updatePreServiceTraineeResult = (traineeId, courseId, resultId, data) => {
  const tenantId = getTenantId();
  return apiClient3.put(`trainee-results/${tenantId}/update/${traineeId}/${courseId}/${resultId}`, data);
};

// create api for university
export const createUniversity = (data) => {
  const tenantId = getTenantId();
  return apiClient3.post(`universities/${tenantId}/add`, data);
};

export const listOfUniversity = () => {
  const tenantId = getTenantId();
  return apiClient3.get(`universities/${tenantId}/get-all`);
};

export const deleteUniversity = (universityId) => {
  const tenantId = getTenantId();
  return apiClient3.delete(`universities/${tenantId}/delete/${universityId}`);
};

export const getUniversityById = (universityId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`universities/${tenantId}/get/${universityId}`);
};

export const updateUniversity = (universityId, data) => {
  const tenantId = getTenantId();
  return apiClient3.put(`universities/${tenantId}/update/${universityId}`, data);
};

export const createInternshipStudents = (data) => {
  const tenantId = getTenantId();
  return apiClient3.post(`internship-students/${tenantId}/add`, data);
};

// Assuming this is defined in Services/apiData.js or similar
export const listInternshipStudents = (budgetTypeId, semester) => {
  const tenantId = getTenantId(); // Or however you're getting the tenant ID
  let url = `internship-students/${tenantId}/get-all`;

  if (budgetTypeId && semester) {
    url += `/${budgetTypeId}?Semester=${semester}`;
  }

  return apiClient3.get(url);
};


export const deleteInternshipStudents = (internId) => {
  const tenantId = getTenantId();
  return apiClient3.delete(`internship-students/${tenantId}/delete/${internId}`);
};

export const getInternshipStudents = (internId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`internship-students/${tenantId}/get/${internId}`);
};

export const updateInternshipStudents = (internId, data) => {
  const tenantId = getTenantId();
  return apiClient3.put(`internship-students/${tenantId}/update/${internId}`, data);
};


export const assignDepartment = (internId, data) => {
  const tenantId = getTenantId();
  return apiClient3.put(`internship-students/${tenantId}/assign-department/${internId}`, data);
};

export const assignInternStudentStatus = (internId, status) => {
  const tenantId = getTenantId();  // Retrieve the tenant ID
  return apiClient3.put(`internship-students/${tenantId}/assign-status/${internId}`, { status });
};


//create the list  of interniship payment for complete if there is a payment
export const createInternshipPayment = (data) => {
  const tenantId = getTenantId();
  return apiClient3.post(`internship-payments/${tenantId}/add`, data);
};

export const listInternshipPayments = () => {
  const tenantId = getTenantId();
  return apiClient3.get(`internship-payments/${tenantId}/get-all`);
};

export const getInternshipPaymentById = (paymentId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`internship-payments/${tenantId}/get/${paymentId}`);
};

export const updateInternshipPayement = (paymentId, data) => {
  const tenantId = getTenantId();
  return apiClient3.put(`internship-payments/${tenantId}/update/${paymentId}`, data);
};

export const deleteInternshipPayement = (paymentId) => {
  const tenantId = getTenantId();
  return apiClient3.delete(`internship-payments/${tenantId}/delete/${paymentId}`);
};

//create the list  of api for education Opportunity
export const createEducationOpportunity = (data) => {
  const tenantId = getTenantId();
  return apiClient3.post(`education-opportunities/${tenantId}/add`, data);
};

export const listEducationOpportunity = () => {
  const tenantId = getTenantId();
  return apiClient3.get(`education-opportunities/${tenantId}/get-all`);
};

export const deleteEducationOpportunity = (educationId) => {
  const tenantId = getTenantId();
  return apiClient3.delete(`education-opportunities/${tenantId}/delete/${educationId}`);
};

export const getEducationOpportunityById = (educationId) => {
  const tenantId = getTenantId();
  return apiClient3.get(`education-opportunities/${tenantId}/get/${educationId}`);
};

export const updateeducationOpportunity = (educationId, data) => {
  const tenantId = getTenantId();
  return apiClient3.put(`education-opportunities/${tenantId}/update/${educationId}`, data);
};
export const getAllQualification = () => {
  const tenantId = getTenantId();
  return apiClient1.get(`qualifications/${tenantId}/get-all`);
};


export const createNeedRequest = (data) => {
  return apiClient.post(`need-requests/create-hr-need`, data);
};













