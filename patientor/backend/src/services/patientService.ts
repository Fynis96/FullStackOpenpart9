import patients from '../../data/patients';
import { NonConfidentialPatientInfo, Patient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonConfidentialPatientInfo = (): NonConfidentialPatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
  getNonConfidentialPatientInfo
};