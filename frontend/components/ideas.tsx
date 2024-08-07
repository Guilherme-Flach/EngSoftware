import { useEffect, useState } from "react";
import { deleteIdea, fetchIdeas, ideaSorting } from "../helpers/ideas";
import TIdea from "../types/Idea";
import IdeaType from "./idea";

const Ideas = ({
  sorting,
  refetch,
}: {
  sorting: ideaSorting;
  refetch: boolean;
}) => {
  const [ideas, setIdeas] = useState<TIdea[]>([]);

  useEffect(() => {
    async function fetch() {
      const { data } = await fetchIdeas(sorting);
      if (!data) return;
      setIdeas(data);
    }
    fetch();
  }, [sorting, refetch]); //re-fetch every time sorting updates

  function DeleteIdea(i: number, id: number) {
    deleteIdea(id);
    setIdeas((prevIdeas) => {
      const newIdeas = [...prevIdeas];
      newIdeas.splice(i, 1);
      return newIdeas;
    });
  }

  function updateSelf(i: number, newSelf: TIdea) {
    setIdeas((prevIdeas) => {
      const newIdeas = [...prevIdeas];
      newIdeas[i] = newSelf;
      return newIdeas;
    });
  }

  return (
    <>
      {refetch ? "" : ""}
      {ideas.length &&
        ideas.map((idea, i) => (
          <IdeaType
            key={idea.ideaData.id}
            self={idea}
            deleteSelf={DeleteIdea}
            index={i}
            updateSelf={updateSelf}
          ></IdeaType>
        ))}
    </>
  );
};

export default Ideas;
