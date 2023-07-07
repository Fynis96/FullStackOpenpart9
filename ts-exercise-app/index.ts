import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight: number | undefined = Number(req.query.weight);
  const height: number | undefined = Number(req.query.height);
  const bmi = calculateBmi(weight, height);
  res.json({ weight: weight, height: height, bmi: bmi});
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises, targetNumber } = req.body;

  if ( !daily_exercises || !Array.isArray(daily_exercises)) {
    return res.status(400).send({ error: 'parameters missing'});
  }
  if ( !targetNumber || isNaN(Number(targetNumber)) ) {
    return res.status(400).send({ error: 'malformatted parameters'});
  }

  const result = exerciseCalculator(daily_exercises as [number], Number(targetNumber));
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});