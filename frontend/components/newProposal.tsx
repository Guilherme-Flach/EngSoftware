import { Dispatch, SetStateAction, useState } from "react";
import { createRequest } from "../helpers/requests";
import { StyledNewRequest } from "./styled/NewRequest.styled";

export const NewRequest = ({
  setRefetch,
}: {
  setRefetch: Dispatch<SetStateAction<boolean>>;
}) => {
  const [problem, setProblem] = useState("");
  const [location, setLocation] = useState("");

  function onSubmit() {
    createRequest(problem, location);
    setRefetch((prev) => !prev);
  }

  return (
    <StyledNewRequest>
      <p>Tenho um problema!</p>
      <input
        type="text"
        placeholder="Localização atual"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        maxLength={300}
      />
      <input
        type="text"
        placeholder="Descrição do Problema"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
      />
      <button onClick={onSubmit}>Socorro!</button>
    </StyledNewRequest>
  );
};
