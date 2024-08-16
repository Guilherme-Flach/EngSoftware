import axios from "./axios";

export const createProposal = (requestId: number, price: number) =>
  axios.post(`http://localhost:3001/proposals/new`, { requestId, price });
