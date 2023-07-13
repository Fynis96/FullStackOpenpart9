import { useState, useEffect } from 'react';
import { DiaryEntry, NewDiaryEntry, DiaryProps } from './types';
import { getAllDiaries, createDiary, ping } from './services/diaryService';
import Notification from './components/Notification';

const DiaryForm = (props: DiaryProps) => {
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    const newDiary: NewDiaryEntry = ({
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    });
    try{
    createDiary(newDiary).then(data => {
      props.setDiaries(props.diaries.concat(data));
    });
    } catch (error: unknown) {
      let errorMessage = 'Something bad happened.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      props.setMessage(errorMessage);
    }
    setNewDate('');
    setNewVisibility('');
    setNewWeather('');
    setNewComment('');
  }

  return (
    <div>
      <form onSubmit={diaryCreation}>
        <div>
          date:
          <input
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </div>
        <div>
          visibility:
          <input
            value={newVisibility}
            onChange={(event) => setNewVisibility(event.target.value)}
          />
        </div>
        <div>
          weather:
          <input
            value={newWeather}
            onChange={(event) => setNewWeather(event.target.value)}
          />
        </div>
        <div>
          comment:
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    ping();
    getAllDiaries().then(data => {
      setDiaries(data);
    })
    
  }, []);

  return (
    <div>
      <Notification message={errorMessage} />
      <DiaryForm setDiaries={setDiaries} diaries={diaries} setMessage={setErrorMessage} />
      <ul>
        {diaries.map(diary => 
          <li key={diary.id}>{diary.comment}</li>)}
      </ul>
    </div>
  );
};

export default App;