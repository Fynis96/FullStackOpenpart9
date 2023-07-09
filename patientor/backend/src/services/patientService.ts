import patients from '../../data/patients';
import { NewPatient, NonConfidentialPatientInfo, Patient } from '../types';
import { v1 as uuid } from 'uuid';

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

const addPatient = ( patient: NewPatient ): Patient => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonConfidentialPatientInfo,
  addPatient
};