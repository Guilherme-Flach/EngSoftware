import axios from "./axios";

export const createProposal = (price: number) =>
  axios.post(`http://localhost:3001/proposals/new`, { price });
