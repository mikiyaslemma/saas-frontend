import React, { createContext, useContext, useState, useEffect } from 'react';
import { listAssessment, listEmployees } from '../Services/apiData';

const IdContext = createContext();

export const useIds = () => {
  return useContext(IdContext);
};

export const IdProvider = ({ children, isLoggedIn }) => {
  const [employeeIdMap, setEmployeeIdMap] = useState({});
  const [employeeIds, setEmployeeIds] = useState([]);
  const [assessmentWeightIds, setAssessmentWeightIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Component mounted');
    
    const fetchIds = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Fetching employees...');
        const employeeResponse = await listEmployees();
        console.log('Employee Response:', employeeResponse);

        if (!employeeResponse.data) {
          console.error('No data received from employees');
          throw new Error('No data received from employees');
        }

        const employeeIds = employeeResponse.data.map(item => item.employeeId);
        setEmployeeIds(employeeIds);
        console.log('Employee IDs:', employeeIds);

        const employeeIdMap = {};
        employeeResponse.data.forEach(item => {
          employeeIdMap[item.employeeId] = item.id;
        });
        setEmployeeIdMap(employeeIdMap);
        console.log('Employee ID Map:', employeeIdMap);

        console.log('Fetching assessments...');
        const assessmentResponse = await listAssessment();
        console.log('Assessment Response:', assessmentResponse);

        if (!assessmentResponse.data) {
          console.error('No data received from assessments');
          throw new Error('No data received from assessments');
        }

        const assessmentWeightIds = assessmentResponse.data.map(item => item.id);
        setAssessmentWeightIds(assessmentWeightIds);
        console.log('Assessment Weight IDs:', assessmentWeightIds);
      } catch (error) {
        console.error('Error fetching IDs:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!isLoggedIn) {
      fetchIds();
    }
  }, [!isLoggedIn]);

  return (
    <IdContext.Provider value={{ employeeIdMap, employeeIds, assessmentWeightIds, loading, error }}>
      {children}
    </IdContext.Provider>
  );
};