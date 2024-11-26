import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import RoleProtectedRoute from '../Auth/RoleProtectedRoute ';
import CreateAdvertisment from './Advertisement/CreateAdvertisment';
import CreateApplicant from './Applicant/CreateApplicant';
import CreateAssessementWeight from './AssessementWeight/CreateAssessementWeight';
import CreateShortListCriterial from './ShortListCriterial/CreateShortListCriterial';
import RecruitmentServiceResourceName from '../Auth/Resource/RecruitmentServiceResourceName';

const tabComponents = [
  { label: 'Advertisement', component: CreateAdvertisment, resource: RecruitmentServiceResourceName.ADD_ADVERTISEMENT },
  { label: 'Applicant', component: CreateApplicant, resource: RecruitmentServiceResourceName.ADD_APPLICANT },
  { label: 'Assessment Weight', component: CreateAssessementWeight, resource: RecruitmentServiceResourceName.ADD_ASSESSMENT_WEIGHT },
  { label: 'Criteria', component: CreateShortListCriterial, resource: RecruitmentServiceResourceName.ADD_SHORTLIST_CRITERIA },
];

const MoreAboutRecruitment = () => {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();
  const recruitmentId = location?.state?.id;

  const handleTabChange = (event, tabIndex) => {
    setActiveTab(tabIndex);
  };

  const { component: ActiveComponent, resource } = tabComponents[activeTab];

  return (
    <Box m="20px">
      <Header subtitle="Details of Recruitment" />
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        {tabComponents.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Box p={3}>
        <RoleProtectedRoute requiredResourceName={resource}>
          <ActiveComponent recruitmentId={recruitmentId} />
        </RoleProtectedRoute>
      </Box>
    </Box>
  );
};

export default MoreAboutRecruitment;
