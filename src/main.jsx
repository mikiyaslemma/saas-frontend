import React from 'react'
import ReactDOM from 'react-dom/client'
// import Layout from './App.jsx'

import './index.css'
import { Route, Router, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ListEmployee from './componens/Employee/ListEmployee.jsx';
import CreateEmployee from './componens/Employee/CreateEmployee.jsx';
import EditEmployee from './componens/Employee/EditEmployee.jsx';
import SkillAction from './componens/Employee/Skill/SkillAction.jsx';
import EditSkill from './componens/Employee/Skill/EditSkill.jsx';
import CreateTraining from './componens/Employee/Training/CreateTraining.jsx';
import TrainingAction from './componens/Employee/Training/TrainingAction.jsx';
import EditTranining from './componens/Employee/Training/EditTranining.jsx';
import CreateLanguage from './componens/Employee/Language/CreateLanguage.jsx';
import LanguageAction from './componens/Employee/Language/LanguageAction.jsx';
import EditLanguage from './componens/Employee/Language/EditLanguage.jsx';
import CreateFamily from './componens/Employee/Family/CreateFamily.jsx';
import FamilyAction from './componens/Employee/Family/FamilyAction.jsx';
import EditFamily from './componens/Employee/Family/EditFamily.jsx';
import CreateReference from './componens/Employee/Reference/CreateReference.jsx';
import ReferenceAction from './componens/Employee/Reference/ReferenceAction.jsx';
import EditReference from './componens/Employee/Reference/EditReference.jsx';
import CreateExperience from './componens/Employee/Experence/CreateExperience.jsx';
import CreateAddress from './componens/Employee/Address/CreateAddress.jsx';
import AddressAction from './componens/Employee/Address/AddressAction.jsx';
import EditAddress from './componens/Employee/Address/EditAddress.jsx';
import ExperenceAction from './componens/Employee/Experence/ExperenceAction.jsx';
import EditExperence from './componens/Employee/Experence/EditExperence.jsx';
import CreateEducation from './componens/Employee/Education/CreateEducation.jsx';
import EducationAction from './componens/Employee/Education/EducationAction.jsx';
import EditEducation from './componens/Employee/Education/EditEducation.jsx';
import { IdProvider } from './IdContext';
import SearchEmployee from './componens/Employee/SearchEmployee.jsx';

import ListRecruitment from './componens/Recruitment/ListRecruitment.jsx';
import EditRecruitment from './componens/Recruitment/EditRecruitment.jsx';
import MoreAboutRecruiment from './componens/Recruitment/MoreAboutRecruiment.jsx';
import EditRecruitmentbyapprove from './componens/Recruitment/EditRecruitmentbyapprove.jsx';
import CreateAdvertisment from './componens/Recruitment/Advertisement/CreateAdvertisment.jsx';
import ListAdvertisment from './componens/Recruitment/Advertisement/ListAdvertisment.jsx';
import EditAdvertisement from './componens/Recruitment/Advertisement/EditAdvertisement.jsx';
import CreateAssessementWeight from './componens/Recruitment/AssessementWeight/CreateAssessementWeight.jsx';
import CreateApplicant from './componens/Recruitment/Applicant/CreateApplicant.jsx';
import CreateShortListCriterial from './componens/Recruitment/ShortListCriterial/CreateShortListCriterial.jsx';
import ListAssessementWeight from './componens/Recruitment/AssessementWeight/ListAssessementWeight.jsx';
import EditAssessementWeight from './componens/Recruitment/AssessementWeight/EditAssessementWeight.jsx';
import ListApplicant from './componens/Recruitment/Applicant/ListApplicant.jsx';
import EditApplicant from './componens/Recruitment/Applicant/EditApplicant.jsx';
import ListShortListCriterial from './componens/Recruitment/ShortListCriterial/ListShortListCriterial.jsx';
import EditShortListCriterial from './componens/Recruitment/ShortListCriterial/EditShortListCriterial.jsx';
import MoreAboutApplicant from './componens/Recruitment/Applicant/MoreAboutApplicant/MoreAboutApplicant.jsx';
import CreateApplicantCertificate from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantTraining/CreateApplicantCertificate.jsx';
import ListApplicantCertificate from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantTraining/ListApplicantCertificate.jsx';
import EditApplicantCertificate from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantTraining/EditApplicantCertificate.jsx';
import CreateApplicantEducation from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantEducation/CreateApplicantEducation.jsx';
import ListApplicantEducation from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantEducation/ListApplicantEducation.jsx';
import EditApplicantEducation from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantEducation/EditApplicantEducation.jsx';
import CreateApplicantLanguage from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantLanguage/CreateApplicantLanguage.jsx';
import ListApplicantLanguage from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantLanguage/ListApplicantLanguage.jsx';
import EditApplicantLanguage from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantLanguage/EditApplicantLanguage.jsx';
import CreateApplicantReference from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantReference/CreateApplicantReference.jsx';
import ListApplicantReference from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantReference/ListApplicantReference.jsx';
import EditApplicantReference from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantReference/EditApplicantReference.jsx';
import CreateApplicantExperience from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantExperience/CreateApplicantExperience.jsx';
import ListApplicantExperience from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantExperience/ListApplicantExperience.jsx';
import EditApplicantExperience from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantExperience/EditApplicantExperience.jsx';
import CreateExamResult from './componens/Recruitment/Applicant/ExamResultOfApplicant/CreateExamResult.jsx';
import ListExamResult from './componens/Recruitment/Applicant/ExamResultOfApplicant/ListExamResult.jsx';
import EditExamResult from './componens/Recruitment/Applicant/ExamResultOfApplicant/EditExamResult.jsx';

import CreateRecruitment from './componens/Recruitment/CreateRecruitment.jsx';
import AdvertisementExists from './componens/AdvertisementExists .jsx';
import AssessimentError from './componens/Recruitment/AssessementWeight/AssessimentError.jsx';
import ShortListCriterialError from './componens/Recruitment/ShortListCriterial/ShortListCriterialError.jsx';
import NotFound from './NotFound.jsx';
import ApplicantExamResultAlreadyCreated from './componens/Recruitment/Applicant/ExamResultOfApplicant/ApplicantExamResultAlreadyCreated.jsx';
import CreateListLangauge from './componens/Employee/LanguageName/CreateListLangauge.jsx';
import CreateTitleName from './componens/Employee/TitleName/CreateTitleName.jsx';
import CreatetrainingCourse from './componens/Training/CreatetrainingCourse.jsx';
import ListTrainingCourse from './componens/Training/ListTrainingCourse.jsx';
import UpdateTrainingCourse from './componens/Training/UpdateTrainingCourse.jsx';
import CreateTrainingInstitution from './componens/Training/Training Institution/CreateTrainingInstitution.jsx';
import ListTrainingInstution from './componens/Training/Training Institution/ListTrainingInstution.jsx';
import UpdateTrainingInstution from './componens/Training/Training Institution/UpdateTrainingInstution.jsx';
import CreateAnnualTrainingRequest from './componens/Training/AnnualTrainingRequest/CreateAnnualTrainingRequest.jsx';
import ListAnnualTrainingRequest from './componens/Training/AnnualTrainingRequest/ListAnnualTrainingRequest.jsx';
import EditAnnualTrainingRequest from './componens/Training/AnnualTrainingRequest/EditAnnualTrainingRequest.jsx';
import AnnualTrainingRequestApprovance from './componens/Training/AnnualTrainingRequest/AnnualTrainingRequestApprovance.jsx';
import CreateTrainingparticipant from './componens/Training/Training participant/CreateTrainingparticipant.jsx';
import ListTrainingParticipant from './componens/Training/Training participant/ListTrainingParticipant.jsx';
import CreatePreService from './componens/Training/PreServiceCourse/CreatePreServiceCourse.jsx';
import CreatePreServiceCourse from './componens/Training/PreServiceCourse/CreatePreServiceCourse.jsx';
import ListOfPresServiceCourse from './componens/Training/PreServiceCourse/ListOfPresServiceCourse.jsx';
import UpdatePreServiceCourse from './componens/Training/PreServiceCourse/UpdatePreServiceCourse.jsx';
import CreatePreServiceTraining from './componens/Training/PreServiceTraining/CreatePreServiceTraining.jsx';
import ListOfPreserviceTraining from './componens/Training/PreServiceTraining/ListOfPreserviceTraining.jsx';
import UpdatePreServiceTraining from './componens/Training/PreServiceTraining/UpdatePreServiceTraining.jsx';
import CreatePreServiceTraineeResult from './componens/Training/PreServiceTraineeResult/CreatePreServiceTraineeResult.jsx';
import CoursesForTrainee from './componens/Training/PreServiceTraining/CoursesForTrainee.jsx';
import ListPreCourseTraineeResult from './componens/Training/PreServiceTraineeResult/ListPreCourseTraineeResult.jsx';
import UpdatePreServiceCourseTraineeResult from './componens/Training/PreServiceTraineeResult/UpdatePreServiceCourseTraineeResult.jsx';
import CreateUniversity from './componens/Training/University/CreateUniversity.jsx';
import ListOfUniversity from './componens/Training/University/ListOfUniversity.jsx';
import UpdateUniversity from './componens/Training/University/UpdateUniversity.jsx';
import CreateInternshipStudents from './componens/Training/Student/CreateInternshipStudents.jsx';
import ListInternshipStudents from './componens/Training/Student/ListInternshipStudents.jsx';
import UpdateInternshipStudents from './componens/Training/Student/UpdateInternshipStudents.jsx';
import AssignDepartement from './componens/Training/Student/AssignDepartement.jsx';
import InternStudentStatus from './componens/Training/Student/InternStudentStatus.jsx';
import CreateInterbshipPayment from './componens/Training/InternshipPayment/CreateInterbshipPayment.jsx';
import ListInternshipPayment from './componens/Training/InternshipPayment/ListInternshipPayment.jsx';
import UpdateInternPayment from './componens/Training/InternshipPayment/UpdateInternPayment.jsx';
import CreateEducationOpportunity from './componens/Training/Education Opportunity/CreateEducationOpportunity.jsx';
import ListEducationOpportunity from './componens/Training/Education Opportunity/ListEducationOpportunity.jsx';
import UpdateEductionOpportunity from './componens/Training/Education Opportunity/UpdateEductionOpportunity.jsx';
import TrainingStatus from './componens/Training/AnnualTrainingRequest/TrainingStatus.jsx';
import UpdateTrainingParticipants from './componens/Training/Training participant/UpdateTrainingParticipants.jsx';
import CreateAnnualTrainingPlan from './componens/Training/AnnualTrainingPlan/CreateAnnualTrainingPlan.jsx';
import ListOfAnnualTrainingPlan from './componens/Training/AnnualTrainingPlan/ListOfAnnualTrainingPlan.jsx';
import UpdateAnnualTrainingPlan from './componens/Training/AnnualTrainingPlan/UpdateAnnualTrainingPlan.jsx';
import CreateSkillofEmployee from './componens/Employee/Skill/CreateSkillofEmployee.jsx';
import CreateNeedRequest from './componens/Planning/NeedRequest/CreateNeedRequest.jsx';
import Dashboard from './componens/Dashboard/Dashboard.jsx';
import App from './App.jsx';
import AppLogin from './componens/Auth/AppLogin.jsx';
import ProtectedRoute from './componens/Auth/ProtectedRoute.jsx';
import { AuthProvider } from './componens/Auth/AuthContext.jsx';
import AppLogout from './componens/Auth/AppLogout.jsx';
import AccessDenied from './componens/Auth/AccessDenied.jsx';
import RoleProtectedRoute from './componens/Auth/RoleProtectedRoute .jsx';
import EmployeeServiceResourceName from './componens/Auth/Resource/EmployeeServiceResourceName.js';
import RecruitmentServiceResourceName from './componens/Auth/Resource/RecruitmentServiceResourceName.js';
import TrainingServiceResourceName from './componens/Auth/Resource/TrainingServiceResourceName.js';
import DeleteEmployee from './componens/Employee/DeleteEmployee.jsx';
import SkillDelete from './componens/Employee/Skill/SkillDelete.jsx';
import DeleteTraining from './componens/Employee/Training/DeleteTraining.jsx';
import DeleteLanguage from './componens/Employee/Language/DeleteLanguage.jsx';
import DeleteFamily from './componens/Employee/Family/DeleteFamily.jsx';
import DeleteReference from './componens/Employee/Reference/DeleteReference.jsx';
import DeleteAddress from './componens/Employee/Address/DeleteAddress.jsx';
import DeleteEducation from './componens/Employee/Education/DeleteEducation.jsx';
import DeleteExperience from './componens/Employee/Experence/DeleteExperience.jsx';
import DeleteRecruitment from './componens/Recruitment/DeleteRecruitment.jsx';
import DeleteShortListCriterial from './componens/Recruitment/ShortListCriterial/DeleteShortListCriterial.jsx';
import DeleteAssessementWeight from './componens/Recruitment/AssessementWeight/DeleteAssessementWeight.jsx';
import DeleteApplicant from './componens/Recruitment/Applicant/DeleteApplicant.jsx';
import DeleteApplicantExamResult from './componens/Recruitment/Applicant/ExamResultOfApplicant/DeleteApplicantExamResult.jsx';
import DeleteAdvertisment from './componens/Recruitment/Advertisement/DeleteAdvertisment.jsx';
import DeleteApplicantEducation from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantEducation/DeleteApplicantEducation.jsx';
import DeleteApplicantExperience from './componens/Recruitment/Applicant/MoreAboutApplicant/ApplicantExperience/DeleteApplicantExperience.jsx';
import ViewEmployee from './componens/Employee/ViewEmployee.jsx';
import DeleteEducationOpportunity from './componens/Training/Education Opportunity/DeleteEducationOpportunity.jsx';
import DeleteInternPayment from './componens/Training/InternshipPayment/DeleteInternPayment.jsx';
import DeleteInternStudent from './componens/Training/Student/DeleteInternStudent.jsx';
import DeleteUniversity from './componens/Training/University/DeleteUniversity.jsx';


import AddEmployee from './componens/Employee/Tabs/AddEmployee.jsx';
import EditDetails from './componens/Employee/Tabs/EditDetails.jsx';
import Details from './componens/Employee/Tabs/Details.jsx';





//Training 

const router = createBrowserRouter(
  
  createRoutesFromElements(
    <Route>

         <Route path="/login" element={<AppLogin />} />
         <Route path="/denied-access" element={<AccessDenied />} />


  
         <Route  path="/" element={   <ProtectedRoute>  <App /> </ProtectedRoute>} >
         
         <Route path="logout" element={<AppLogout />} />



    

      <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      

      <Route path="employee/">

       <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.ADD_EMPLOYEE}/>}>
            <Route path="create" element={<CreateEmployee />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.GET_EMPLOYEE_BY_EMPLOYEE_ID}/>}>
            <Route path="detailsMore" element={<ViewEmployee />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.GET_ALL_EMPLOYEES}/>}>
            <Route path="list" element={<ListEmployee />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.UPDATE_EMPLOYEE}/>}>
            <Route path="edit" element={<EditEmployee />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.DELETE_EMPLOYEE}/>}>
            <Route path="delete" element={<DeleteEmployee />} /> 
      </Route>

      <Route path="addEmployee" element={<AddEmployee />} />

      <Route path="editDetails" element={<EditDetails />} />
      <Route path="details" element={<Details />} />




     

      <Route path="search" element={<SearchEmployee />} />
      <Route path="userlanguage" element={<CreateListLangauge />} />
      <Route path="titlename" element={<CreateTitleName />} />


      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.GET_ALL_SKILLS}/>}>
            <Route path="SkillAction" element={<SkillAction />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.ADD_SKILL}/>}>
            <Route path="SkillofEmployee" element={<CreateSkillofEmployee />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.GET_ALL_SKILLS}/>}>
            <Route path="SkillAction" element={<SkillAction />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.DELETE_SKILL}/>}>
            <Route path="deleteSkill" element={<SkillDelete />} /> 
      </Route>

      
      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.UPDATE_SKILL}/>}>
            <Route path="editskill" element={<EditSkill />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.ADD_TRAINING}/>}>
            <Route path="CreateTraining" element={<CreateTraining />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.GET_ALL_TRAININGS}/>}>
            <Route path="trainingAction" element={<TrainingAction />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.UPDATE_TRAINING}/>}>
      <Route path="editTranining" element={<EditTranining />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.DELETE_TRAINING}/>}>
            <Route path="deleteTraining" element={<DeleteTraining />} /> 
      </Route>

      
      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.ADD_LANGUAGE}/>}>
      <Route path="createLanguage" element={<CreateLanguage />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.GET_ALL_LANGUAGES}/>}>
      <Route path="languageAction" element={<LanguageAction />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.UPDATE_LANGUAGE}/>}>
      <Route path="EditLanguage" element={<EditLanguage />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.DELETE_LANGUAGE}/>}>
            <Route path="deleteLanguage" element={<DeleteLanguage />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.ADD_FAMILY}/>}>
      <Route path="createFamily" element={<CreateFamily />} />
      </Route>
      
      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.GET_ALL_FAMILIES}/>}>
      <Route path="familyAction" element={<FamilyAction />} />
      </Route>
       
      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.UPDATE_FAMILY}/>}>
      <Route path="editFamily" element={<EditFamily />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.DELETE_FAMILY}/>}>
            <Route path="deleteFamily" element={<DeleteFamily />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.ADD_REFERENCE}/>}>
      <Route path="createReference" element={<CreateReference />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.GET_ALL_REFERENCES}/>}>
      <Route path="referenceAction" element={<ReferenceAction />} />
      </Route>
      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.UPDATE_REFERENCE}/>}>
      <Route path="editreference" element={<EditReference />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.DELETE_REFERENCE}/>}>
            <Route path="deleteReference" element={<DeleteReference />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.ADD_EXPERIENCE}/>}>
      <Route path="createExperence" element={<CreateExperience />} />
      </Route>
      
      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.GET_ALL_EXPERIENCES}/>}>
      <Route path="experenceAction" element={<ExperenceAction />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.UPDATE_EXPERIENCE}/>}>
      <Route path="editexperence" element={<EditExperence/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.DELETE_EXPERIENCE}/>}>
            <Route path="deleteExperience" element={<DeleteExperience />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.ADD_ADDRESS}/>}>
      <Route path="createAddress" element={<CreateAddress />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.GET_ALL_ADDRESSES}/>}>
      <Route path="addressAction" element={<AddressAction />} />
      </Route>
      
      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.UPDATE_ADDRESS}/>}>
      <Route path="EditAddress" element={<EditAddress/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.DELETE_ADDRESS}/>}>
            <Route path="deleteAddress" element={<DeleteAddress />} /> 
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.ADD_EDUCATION}/>}>
      <Route path="createeducation" element={<CreateEducation/>} />
      </Route>
      
      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.GET_ALL_EDUCATIONS}/>}>
      <Route path="educationAction" element={<EducationAction/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.UPDATE_EDUCATION}/>}>
      <Route path="editEducation" element={<EditEducation/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={EmployeeServiceResourceName.DELETE_EDUCATION}/>}>
            <Route path="deleteEducation" element={<DeleteEducation />} /> 
      </Route>

      
      </Route>

      <Route path="recruitment/">
      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.ADD_RECRUITMENT}/>}>
          <Route path="create" element={<CreateRecruitment />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.GET_ALL_RECRUITMENTS}/>}>
        <Route path="list" element={<ListRecruitment />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.UPDATE_RECRUITMENT}/>}>
      <Route path="edit" element={<EditRecruitment />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.DELETE_RECRUITMENT}/>}>
            <Route path="delete" element={<DeleteRecruitment />} /> 
      </Route>
  
       <Route path="advertisementexists" element={<AdvertisementExists />} />
       <Route path="assessmenterror" element={<AssessimentError />} />

       
      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.APPROVE_RECRUITMENT}/>}>
      <Route path="editApprovance" element={<EditRecruitmentbyapprove />} />
      </Route>

       <Route path="more" element={<MoreAboutRecruiment />} />

       <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.ADD_ADVERTISEMENT}/>}>
       <Route path="createadvertisement" element={<CreateAdvertisment />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.GET_ALL_ADVERTISEMENTS}/>}>
      <Route path="listadvertisement" element={<ListAdvertisment />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.REMOVE_ADVERTISEMENT_MEDIA_TYPE}/>}>
      <Route path="deleteAdvertisement" element={<DeleteAdvertisment />} />
      </Route>

      
      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.UPDATE_ADVERTISEMENT}/>}>
      <Route path="editadverisement" element={<EditAdvertisement />} />
      </Route>
      
      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.ADD_ASSESSMENT_WEIGHT}/>}>
      <Route path="assessement" element={<CreateAssessementWeight />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.GET_ALL_ASSESSMENT_WEIGHTS}/>}>
      <Route path="listassessment" element={<ListAssessementWeight />} />
      </Route>
      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.UPDATE_ASSESSMENT_WEIGHT}/>}>
      <Route path="editassessement" element={<EditAssessementWeight />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.DELETE_ASSESSMENT_WEIGHT}/>}>
      <Route path="deleteAssesigmentWeight" element={<DeleteAssessementWeight />} />
      </Route>

       <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.ADD_APPLICANT}/>}>
       <Route path="application" element={<CreateApplicant />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.GET_ALL_APPLICANTS}/>}>
       <Route path="listapplicant" element={< ListApplicant/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.GET_ALL_APPLICANTS}/>}>
       <Route path="listapplicant" element={< ListApplicant/>} />
      </Route>
      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.UPDATE_APPLICANT}/>}>
      <Route path="editapplicant" element={< EditApplicant/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.DELETE_APPLICANT}/>}>
       <Route path="deleteApplicant" element={< DeleteApplicant/>} />
      </Route>

       <Route path="moreaboutapplicant" element={< MoreAboutApplicant/>} />
      
       <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.ADD_TRAINING}/>}>
       <Route path="applicantcertificate" element={< CreateApplicantCertificate/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.ADD_TRAINING}/>}>
       <Route path="applicantcertificate" element={< CreateApplicantCertificate/>} />
      </Route>
      
      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.GET_ALL_TRAININGS}/>}>
      <Route path="listapplicantCertificate" element={< ListApplicantCertificate/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.UPDATE_TRAINING}/>}>
      <Route path="editapplicantCertificate" element={< EditApplicantCertificate/>} />
      </Route>


       <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.ADD_EDUCATION}/>}>
       <Route path="createapplicantEducation" element={< CreateApplicantEducation/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.GET_ALL_EDUCATIONS}/>}>
      <Route path="listapplicantEducation" element={< ListApplicantEducation/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.UPDATE_EDUCATION}/>}>
      <Route path="editapplicantEducation" element={< EditApplicantEducation/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.DELETE_EDUCATION}/>}>
      <Route path="deleteapplicantEducation" element={< DeleteApplicantEducation/>} />
      </Route>


       <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.ADD_LANGUAGE}/>}>
       <Route path="applicantLanguage" element={< CreateApplicantLanguage/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.GET_ALL_LANGUAGES}/>}>
      <Route path="listapplicantLaguage" element={< ListApplicantLanguage/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.GET_ALL_LANGUAGES}/>}>
      <Route path="editapplicantLangage" element={< EditApplicantLanguage/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.ADD_REFERENCE}/>}>
      <Route path="applicantRefernce" element={< CreateApplicantReference/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.GET_ALL_REFERENCES}/>}>
      <Route path="listapplicantReference" element={< ListApplicantReference/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.UPDATE_REFERENCE}/>}>
      <Route path="editapplicantReference" element={< EditApplicantReference/>} />
      </Route>


       <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.ADD_EXPERIENCE}/>}>
       <Route path="applicantExperence" element={< CreateApplicantExperience/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.GET_ALL_EXPERIENCES}/>}>
      <Route path="listapplicantExperence" element={<ListApplicantExperience/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.GET_ALL_EXPERIENCES}/>}>
      <Route path="listapplicantExperence" element={<ListApplicantExperience/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.DELETE_EXPERIENCE}/>}>
      <Route path="deleteapplicantExperience" element={< DeleteApplicantExperience/>} />
      </Route>


       <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.ADD_EXAM_RESULT}/>}>
       <Route path="examResult" element={< CreateExamResult/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.GET_ALL_EXAM_RESULTS}/>}>
      <Route path="listexamresult" element={<ListExamResult/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.UPDATE_EXAM_RESULT}/>}>
      <Route path="editExamresult" element={<EditExamResult/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.DELETE_EXAM_RESULT}/>}>
      <Route path="deleteApplicantExamResult" element={<DeleteApplicantExamResult/>} />
      </Route>


       <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.ADD_SHORTLIST_CRITERIA}/>}>
       <Route path="criterial" element={<CreateShortListCriterial />} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.GET_ALL_SHORTLIST_CRITERIA}/>}>
      <Route path="listcriterial" element={< ListShortListCriterial/>} />
      </Route>

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.UPDATE_SHORTLIST_CRITERIA}/>}>
      <Route path="editcriterial" element={< EditShortListCriterial/>} />
      </Route> 

      <Route element={<RoleProtectedRoute requiredResourceName={RecruitmentServiceResourceName.DELETE_SHORTLIST_CRITERIA}/>}>
      <Route path="deleteCriterial" element={< DeleteShortListCriterial/>} />
      </Route>
      

       <Route path="shortListCriterialError" element={< ShortListCriterialError/>} />
       <Route path="examresultexist" element={< ApplicantExamResultAlreadyCreated/>} />
  
      </Route>
       

        <Route path="training/">
         
        <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.ADD_TRAINING_COURSE}/>}>
            <Route path="trainingCourse" element={< CreatetrainingCourse/>} />
        </Route>

        <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.GET_ALL_TRAININGS}/>}>
        <Route path="listtrainingCourse" element={< ListTrainingCourse/>} />
        </Route>

        <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.UPDATE_TRAINING}/>}>
        <Route path="updateTrainingCourse" element={< UpdateTrainingCourse/>} />
        </Route>

        <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.ADD_INSTITUTION}/>}>
        <Route path="trainingInstution" element={< CreateTrainingInstitution/>} />
        </Route>

        <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.GET_ALL_INSTITUTIONS}/>}>
        <Route path="ListTrainingInstution" element={< ListTrainingInstution/>} />
        </Route>

        <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.UPDATE_INSTITUTION}/>}>
        <Route path="updateTrainingInstution" element={< UpdateTrainingInstution/>} />
        </Route>
        


          <Route path="annualTrainingRequest" element={< CreateAnnualTrainingRequest/>} />
          <Route path="listAnnualTrainingRequest" element={< ListAnnualTrainingRequest/>} />
          <Route path="updateAnnualTrainingRequest" element={< EditAnnualTrainingRequest/>} />
          
          <Route path="trainingStatus" element={< TrainingStatus/>} />
          <Route path="trainingparticipant" element={< CreateTrainingparticipant/>} />
          <Route path="listTriningParticipant" element={< ListTrainingParticipant/>} />
          <Route path="updateTrainingParticipants" element={< UpdateTrainingParticipants/>} />

          
          <Route path="annualPlan" element={< CreateAnnualTrainingPlan/>} />
          <Route path="listannualTraininPlan" element={< ListOfAnnualTrainingPlan/>} />
          <Route path="updateAnnualTrainingPlan" element={< UpdateAnnualTrainingPlan/>} />





          <Route path="preserviceCourses" element={< CreatePreServiceCourse/>} />
          <Route path="listpreserviceCourses" element={< ListOfPresServiceCourse/>} />
          <Route path="updatepreserviceCourses" element={< UpdatePreServiceCourse/>} />

          <Route path="preserviceTraining" element={< CreatePreServiceTraining/>} />
          <Route path="listPreserviceTraining" element={< ListOfPreserviceTraining/>} />
          <Route path="updatepreserviceTraining" element={< UpdatePreServiceTraining/>} />
          <Route path="coursesOfTrainee" element={< CoursesForTrainee/>} />


          <Route path="preserviceTraineeResult" element={< CreatePreServiceTraineeResult/>} />
          <Route path="listPreCourseTraineeResult" element={< ListPreCourseTraineeResult/>} />
          <Route path="updatePreTraineeCourseResult" element={< UpdatePreServiceCourseTraineeResult/>} />

          
          <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.ADD_UNIVERSITY}/>}>
          <Route path="university" element={< CreateUniversity/>} />
         </Route> 

         <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.GET_ALL_UNIVERSITIES}/>}>
         <Route path="listUiversity" element={< ListOfUniversity/>} />
         </Route> 
         <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.UPDATE_UNIVERSITY}/>}>
         <Route path="updateUniversity" element={< UpdateUniversity/>} />
         </Route> 

         <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.UPDATE_UNIVERSITY}/>}>
         <Route path="deleteUniversity" element={< DeleteUniversity/>} />
         </Route> 

           
          <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.ADD_INTERNSHIP_STUDENT}/>}>
          <Route path="internstudent" element={< CreateInternshipStudents/>} /> 
         </Route> 
         <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.GET_ALL_INTERNSHIP_STUDENTS}/>}>
         <Route path="listInternstudent" element={< ListInternshipStudents/>} />
         </Route> 
         <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName. UPDATE_INTERNSHIP_STUDENT}/>}>
         <Route path="updateInternstudent" element={< UpdateInternshipStudents/>} />
         </Route> 
         <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName. ASSIGN_DEPARTMENT_TO_INTERNSHIP_STUDENT}/>}>
         <Route path="assigndepartement" element={< AssignDepartement/>} />
         </Route> 

         <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName. ASSIGN_STATUS_TO_INTERNSHIP_STUDENT}/>}>
         <Route path="internstudentStatus" element={< InternStudentStatus/>} />
         </Route> 

         <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.   DELETE_INTERNSHIP_STUDENT}/>}>
         <Route path="deleteInternstudent" element={< DeleteInternStudent/>} />
         </Route> 
          

          <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.ADD_INTERNSHIP_PAYMENT}/>}>
          <Route path="createInternPayment" element={< CreateInterbshipPayment/>} />  
         </Route>
         <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.GET_ALL_INTERNSHIP_PAYMENTS}/>}>
         <Route path="listInternPayement" element={< ListInternshipPayment/>} />
         </Route>
         <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.UPDATE_INTERNSHIP_PAYMENT}/>}>
         <Route path="updateInternPayement" element={< UpdateInternPayment/>} />
         </Route>

         <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.DELETE_INTERNSHIP_PAYMENT}/>}>
         <Route path="deleteIntenpayment" element={< DeleteInternPayment/>} />
         </Route>


          <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.ADD_EDUCATION_OPPORTUNITY}/>}>
          <Route path="educationOpportunity" element={< CreateEducationOpportunity/>} />  
         </Route>

         <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.GET_ALL_EDUCATION_OPPORTUNITIES}/>}>
         <Route path="listeducationOpportunity" element={< ListEducationOpportunity/>} />  
         </Route>

         <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.UPDATE_EDUCATION_OPPORTUNITY}/>}>
         <Route path="updateeducationOpportunity" element={< UpdateEductionOpportunity/>} />  
         </Route>

         <Route element={<RoleProtectedRoute requiredResourceName={TrainingServiceResourceName.DELETE_EDUCATION_OPPORTUNITY}/>}>
         <Route path="deleteEducationOpportunity" element={< DeleteEducationOpportunity/>} />  
         </Route>

         </Route>  

         <Route path="planning/">
           <Route path="needRequest" element={< CreateNeedRequest/>} />  
         </Route>

      <Route path='*' element={<NotFound/>} />
    </Route>

    </Route>
    
  )

)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <IdProvider> {/* Wrap your application with the IdProvider */}
      <RouterProvider router={router} />
    </IdProvider>
    </AuthProvider>
  </React.StrictMode>
);

