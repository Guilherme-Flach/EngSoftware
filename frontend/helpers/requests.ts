
import axios from "./axios";

export const fetchClientRequests = (type: string) =>
  axios.get(`http://localhost:3001/requests/own/${type}`);

export const fetchRescuerRequests = (type: string) =>
  axios.get(`http://localhost:3001/requests/guincheiro/${type}`);

export const fetchAllRequests = () =>
  axios.get(`http://localhost:3001/requests/all`);

export const deleteRequest = (id: string | number) =>
  axios.delete(`http://localhost:3001/requests/${id}`);

export const findRequest = (id: string | number) =>
  axios.get(`http://localhost:3001/requests/find/${id}`);

export const createRequest = (problem: string, location: string) =>
  axios.post(`http://localhost:3001/requests/create`, { problem, location });

export enum requestSorting {
  latest = "latest",
}
