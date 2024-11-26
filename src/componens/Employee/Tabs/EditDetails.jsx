import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from '../../Header';
import RoleProtectedRoute from '../../Auth/RoleProtectedRoute ';
import CreateSkillofEmployee from '../Skill/CreateSkillofEmployee';
import CreateTraining from '../Training/CreateTraining';
import CreateLanguage from '../Language/CreateLanguage';
import CreateFamily from '../Family/CreateFamily';
import CreateReference from '../Reference/CreateReference';
import CreateExperience from '../Experence/CreateExperience';
import CreateAddress from '../Address/CreateAddress';
import CreateEducation from '../Education/CreateEducation';
import EmployeeServiceResourceName from '../../Auth/Resource/EmployeeServiceResourceName';
import EditEmployee from '../EditEmployee';
import ToolbarComponent from '../../Training/ToolbarComponent';
import { useNavigate } from "react-router-dom";


const tabComponents = [
  { label: 'Personal', component: EditEmployee, resource: EmployeeServiceResourceName.UPDATE_EMPLOYEE },
  { label: 'Skill', component: CreateSkillofEmployee, resource: EmployeeServiceResourceName.GET_ALL_SKILLS },
  { label: 'Training', component: CreateTraining, resource: EmployeeServiceResourceName.ADD_TRAINING },
  { label: 'Language', component: CreateLanguage, resource: EmployeeServiceResourceName.ADD_LANGUAGE },
  { label: 'Family', component: CreateFamily, resource: EmployeeServiceResourceName.ADD_FAMILY },
  { label: 'Reference', component: CreateReference, resource: EmployeeServiceResourceName.ADD_REFERENCE },
  { label: 'Experience', component: CreateExperience, resource: EmployeeServiceResourceName.ADD_EXPERIENCE },
  { label: 'Address', component: CreateAddress, resource: EmployeeServiceResourceName.ADD_ADDRESS },
  { label: 'Education', component: CreateEducation, resource: EmployeeServiceResourceName.ADD_EDUCATION },
];

const EditDetails = () => {
  const location = useLocation();
  const [id, setId] = useState(location.state?.id || null);
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 0);

  const navigate = useNavigate();


//   useEffect(() => {
//     if (location.state?.id) {
//       handleIdReceived(location.state.id);
//     }
//   }, [location.state]);


  useEffect(() => {
    if (location.state?.id) {
      handleIdReceived(location.state.id);
    }
  }, [location.state]);

  const handleTabChange = (event, newValue) => {
    // Allow tab change only if `id` is available or tab is the first one (Personal tab)
    if (id || newValue === 0) {
      setActiveTab(newValue);
    }
  };

  const handleIdReceived = (newId) => {
    setId(newId);
  };

  const { component: ActiveComponent, resource } = tabComponents[activeTab];
  const handleIconClick = () => {
    navigate(`/employee/list`);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Box m="20px">
      <Header subtitle="Update Employee Information" />
      <ToolbarComponent mainIconType="search" onMainIconClick={handleIconClick} refreshPage={refreshPage} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Employee information tabs"
        >
          {tabComponents.map((tab, index) => (
            <Tab 
              key={index} 
              label={tab.label} 
              disabled={!id && index !== 0} 
            />
          ))}
        </Tabs>
      </Box>
      <Box p={3}>
        <RoleProtectedRoute requiredResourceName={resource}>
          <ActiveComponent id={id} onIdReceive={handleIdReceived} />
        </RoleProtectedRoute>
      </Box>
    </Box>
  );
};

export default EditDetails;
