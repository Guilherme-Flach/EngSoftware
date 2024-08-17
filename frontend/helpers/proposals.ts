import axios from "./axios";

export const createProposal = (requestId: number, price: number) =>
  axios.post(`http://localhost:3001/proposals/new`, { requestId, price });

export const fetchOpenProposals = () =>
  axios.get(`http://localhost:3001/proposals/open`);

export const acceptProposal = (proposalId: number) =>
  axios.post(`http://localhost:3001/proposals/accept`, { proposalId });
