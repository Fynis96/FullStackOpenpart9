interface inputValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): inputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (weight: number, height: number) => {
  const value: number = weight / ((height / 100) ** 2);
  if (value <= 18.4) {
    return 'Underweight (Unhealthy)';
  }
  else if (value >= 18.5 && value <= 24.9) {
    return 'Normal Range (Healthy)';
  }
  else if (value >= 25 && value <= 29.9) {
    return 'Overweight (Pre-obese)';
  } 
  else if (value >= 30) {
    return 'Obese (Unhealthy)';
  }
  else {
    return 'Invalid range';
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}