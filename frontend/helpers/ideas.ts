import axios from "./axios";

export const fetchIdeas = (sorting: ideaSorting) =>
  axios.get(`http://localhost:3001/ideas/${sorting}`);

export const deleteIdea = (id: string | number) =>
  axios.delete(`http://localhost:3001/ideas/${id}`);

export const findIdea = (id: string | number) =>
  axios.get(`http://localhost:3001/ideas/find/${id}`);

export const createIdea = (title: string, text: string) =>
  axios.post(`http://localhost:3001/ideas/create`, { title, text });

export enum ideaSorting {
  worst = "worst",
  best = "best",
  latest = "latest",
}
