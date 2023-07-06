interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  targetNumber: number;
  average: number;
}

interface parsedValues {
  value1: number[];
  value2: number;
}

//args[0] && args[1] aren't needed. args[args.length - 1] is the target number
const parseArgument = (args: string[]): parsedValues => {
  const arguments: string[] = [...args];
  const slicedArg: string[] = arguments.slice(2);
  const numArgs: number[] = slicedArg.map(a => Number(a))

  const value2: number = numArgs.pop();
  const value1: number[] = [...numArgs];

  return {
    value1,
    value2
  };
}

const exerciseCalculator = (exerciseAmounts: number[], target: number): Result => {
  const periodLength = exerciseAmounts.length;
  const trainingDays = exerciseAmounts.filter(a => a > 0).length;
  const average = exerciseAmounts.reduce((p, c) => p + c, 0) / periodLength;
  const targetNumber = target;
  const success = average >= targetNumber ? true : false;
  const rating = success == true ? 3 : success == false && average + 1 < targetNumber ? 2 : 1;
  const ratingDescription = rating == 3 ? 'Perfect' : rating == 2 ? 'Could be better' : 'Needs improvement!';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    targetNumber,
    average
  }
}

try {
  const { value1, value2 } = parseArgument(process.argv);
  console.log(exerciseCalculator(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}