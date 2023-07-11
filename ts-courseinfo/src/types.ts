export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface CourseParts {
  courseParts: CoursePart[];
}

export type CourseName = {
  courseName: string;
}
