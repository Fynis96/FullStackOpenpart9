import {  Patient } from "../types";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiBaseUrl } from "../constants";
import EntryView from "./Entry";

const PatientView = () => {

  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/patients/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };

    fetchPatient();
  }, [id]);

  if (patient) {
    return (
      <div>
        <h2>{patient.name}</h2>
        <div>
          <ul>
            <li>ssn: {patient.ssn}</li>
            <li>gender: {patient.gender}</li>
            <li>dob: {patient.dateOfBirth}</li>
            <li>occupation: {patient.occupation}</li>
          </ul>
          <h2>entries</h2>
          <EntryView entries={patient.entries} />
          <ul>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      no patient found
    </div>
  )

}

export default PatientView;