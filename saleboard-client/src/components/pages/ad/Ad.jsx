import { useParams } from "react-router-dom";

export const Ad = () => {
  const { id } = useParams();

  return (
    <div>
      <p>{id}</p>
    </div>
  );
};
