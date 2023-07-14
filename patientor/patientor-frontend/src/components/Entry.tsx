import { Diagnosis, Entry } from "../types";
import { useEffect, useState } from "react";
import diagnosisService from '../services/diagnosis'

interface Props {
  entries: Entry[]
}

const EntryView = ({entries}: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {

    const fetchDiagnoses = async () => {
      const diagnoseslist = await diagnosisService.getAll();
      setDiagnoses(diagnoseslist);
    };
    void fetchDiagnoses ();
  }, []);

  const getDiagnosisDefinition = (code: string) => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : "Unknown";
  };

  if (!entries[0])
  return (
    <div>
      No entries
    </div>
  )

  if (entries[0].diagnosisCodes)
  return (
    <div>
      {Object.values(entries).map((entry: Entry) => (
        <div key={entry.id}>
          {entry.date}    {entry.description}
          {entry.diagnosisCodes!.map(code => (
            <li key={code}>{code} - {getDiagnosisDefinition(code)}</li>
          ))}
        </div>
       ))}
    </div>
  )

  return (
    <div>
      {Object.values(entries).map((entry: Entry) => (
        <div key={entry.id}>
          {entry.date}    {entry.description}
        </div>
       ))}
    </div>
  )
}

export default EntryView;