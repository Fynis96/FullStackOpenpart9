import { CourseParts } from "../types";
import Part from "./Part";

const Content = (props: CourseParts) => {
  return (
    <div>
      {props.courseParts.map((part, i) => 
        <Part key={i} part={part} />
      )}
    </div>
  );
};

export default Content;