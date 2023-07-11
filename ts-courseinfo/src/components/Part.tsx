import { PartProps } from "../types";

const Part = (part: PartProps) => {
  switch (part.part.kind) {
    case "basic":
      return (
        <div>
          <h3>{part.part.name} {part.part.exerciseCount}</h3>
          <p> {part.part.description}</p>
        </div>
      )
      break;
    case "background":
      return (
        <div>
          <h3>{part.part.name} {part.part.exerciseCount}</h3>
          <p> {part.part.description}</p>
          <p>submit to {part.part.backgroundMaterial}</p>
        </div>
      )
      break;
    case "group":
      return (
        <div>
          <h3>{part.part.name} {part.part.exerciseCount}</h3>
          <p> group projects: {part.part.groupProjectCount}</p>
        </div>
      )
      break;
    case "special":
      return (
        <div>
          <h3>{part.part.name} {part.part.exerciseCount}</h3>
          <p> {part.part.description}</p>
          required skills: {part.part.requirements.map((str, i ) => <p key={i}>{str}</p>)}
        </div>
      )
    default:
      return <div> default </div>
  }
};

export default Part;