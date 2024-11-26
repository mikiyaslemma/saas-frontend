import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from '../../../Header';
import RoleProtectedRoute from '../../../Auth/RoleProtectedRoute ';
import CreateApplicantCertificate from './ApplicantTraining/CreateApplicantCertificate';
import CreateApplicantEducation from './ApplicantEducation/CreateApplicantEducation';
import CreateApplicantLanguage from './ApplicantLanguage/CreateApplicantLanguage';
import CreateApplicantReference from './ApplicantReference/CreateApplicantReference';
import CreateApplicantExperience from './ApplicantExperience/CreateApplicantExperience';
import RecruitmentServiceResourceName from '../../../Auth/Resource/RecruitmentServiceResourceName';

const tabComponents = [
  { label: 'Education', component: CreateApplicantEducation, resource: RecruitmentServiceResourceName.ADD_EDUCATION },
  { label: 'Training', component: CreateApplicantCertificate, resource: RecruitmentServiceResourceName.ADD_TRAINING },
  { label: 'Reference', component: CreateApplicantReference, resource: RecruitmentServiceResourceName.ADD_REFERENCE },
  { label: 'Language', component: CreateApplicantLanguage, resource: RecruitmentServiceResourceName.ADD_LANGUAGE },
  { label: 'Experience', component: CreateApplicantExperience, resource: RecruitmentServiceResourceName.ADD_EXPERIENCE },
];

const MoreAboutApplicant = () => {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();
  const { recruitmentId } = location.state;
  const applicantId = location?.state?.id;

  const handleTabChange = (event, tabIndex) => {
    setActiveTab(tabIndex);
  };

  const { component: ActiveComponent, resource } = tabComponents[activeTab];

  return (
    <Box m="20px">
      <Header subtitle="More about applicant" />
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        {tabComponents.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Box p={3}>
        <RoleProtectedRoute requiredResourceName={resource}>
          <ActiveComponent applicantId={applicantId} recruitmentId={recruitmentId} />
        </RoleProtectedRoute>
      </Box>
    </Box>
  );
};

export default MoreAboutApplicant;
