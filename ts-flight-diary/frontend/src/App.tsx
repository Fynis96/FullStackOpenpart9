import { useState, useEffect } from 'react';
import { DiaryEntry, NewDiaryEntry, DiaryProps } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';
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
    createDiary(newDiary)
      .then(data => {
        props.setDiaries(props.diaries.concat(data));
      }).catch(error => {
        if (error.response) {
          console.log(error.response);
          props.setMessage(error.response.data)
          setTimeout(() => {
            props.setMessage('');
          }, 5000);
        }
      });
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
          great          <input type="radio" name="visibility"
            onChange={() => setNewVisibility('great')} />
          good         <input type="radio" name="visibility"
            onChange={() => setNewVisibility('good')} />
          ok          <input type="radio" name="visibility"
            onChange={() => setNewVisibility('ok')} />
          poor          <input type="radio" name="visibility"
            onChange={() => setNewVisibility('poor')} />      
        </div>
        <div>
          weather:
          sunny       <input type="radio" name="weather"
            onChange={() => setNewWeather('sunny')} />
          rainy        <input type="radio" name="weather"
            onChange={() => setNewWeather('rainy')} />
          cloudy          <input type="radio" name="weather"
            onChange={() => setNewWeather('cloudy')} />
          stormy         <input type="radio" name="weather"
            onChange={() => setNewWeather('stormy')} />     
          windy         <input type="radio" name="weather"
            onChange={() => setNewWeather('windy')} />    
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
          <li key={diary.id}>
            <p><b>{diary.date}</b></p>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
            <p>comment: {diary.comment}</p>
          </li>)}
      </ul>
    </div>
  );
};

export default App;