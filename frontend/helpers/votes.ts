import axios from "./axios";

export const castVote = (voteType: boolean, ideaId: number) => {
  return axios.post("/votes/cast", {
    voteType,
    ideaId,
  });
};
