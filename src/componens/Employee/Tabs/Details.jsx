import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
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
import ViewEmployee from '../ViewEmployee';

const tabComponents = [
  { label: 'Personal', component: ViewEmployee, resource: EmployeeServiceResourceName.GET_EMPLOYEE_BY_EMPLOYEE_ID },
  { label: 'Skill', component: CreateSkillofEmployee, resource: EmployeeServiceResourceName.GET_ALL_SKILLS },
  { label: 'Training', component: CreateTraining, resource: EmployeeServiceResourceName.ADD_TRAINING },
  { label: 'Language', component: CreateLanguage, resource: EmployeeServiceResourceName.ADD_LANGUAGE },
  { label: 'Family', component: CreateFamily, resource: EmployeeServiceResourceName.ADD_FAMILY },
  { label: 'Reference', component: CreateReference, resource: EmployeeServiceResourceName.ADD_REFERENCE },
  { label: 'Experience', component: CreateExperience, resource: EmployeeServiceResourceName.ADD_EXPERIENCE },
  { label: 'Address', component: CreateAddress, resource: EmployeeServiceResourceName.ADD_ADDRESS },
  { label: 'Education', component: CreateEducation, resource: EmployeeServiceResourceName.ADD_EDUCATION },
];

const Details = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [id, setId] = useState(null);

  const handleTabChange = (event, newValue) => {
    if (id || newValue === 0) {
      setActiveTab(newValue);
    }
  };

  const handleIdReceived = (newId) => {
    setId(newId);
  };

  const { component: ActiveComponent, resource } = tabComponents[activeTab];

  return (
    <Box m="20px">
      <Header subtitle="Fill More Information about Employer" />
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

export default Details;