import { Patient } from "../types";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiBaseUrl } from "../constants";

const PatientView = () => {

  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  //TODO: Move axios call into services/patients.ts
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
            <li>{patient.ssn}</li>
            <li>{patient.gender}</li>
            <li>{patient.dateOfBirth}</li>
            <li>{patient.occupation}</li>
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