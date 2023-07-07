import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight: number | undefined = Number(req.query.weight);
  const height: number | undefined = Number(req.query.height);
  const bmi = calculateBmi(weight, height);
  res.json({ weight: weight, height: height, bmi: bmi})
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})