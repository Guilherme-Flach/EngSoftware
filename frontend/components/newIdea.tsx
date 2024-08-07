import { Dispatch, SetStateAction, useState } from "react";
import { createIdea } from "../helpers/ideas";
import { StyledNewIdea } from "./styled/NewIdea.styled";

export const NewIdea = ({
  setRefetch,
}: {
  setRefetch: Dispatch<SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  function onSubmit() {
    createIdea(title, text);
    setRefetch((prev) => !prev);
  }

  return (
    <StyledNewIdea>
      <p>Alguma idea?</p>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={300}
      />
      <button onClick={onSubmit}>Compartilhar</button>
    </StyledNewIdea>
  );
};
