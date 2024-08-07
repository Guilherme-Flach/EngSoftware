import axios from "axios";
import Router from "next/router";
export const URL = process.env.API_URL || "http://localhost:3001";

const instance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const statusCode = error?.response?.status;
    // redirect unauthorized user to login page, uncomment later
    if (statusCode === 401) Router.push("/login");
    throw error;
  }
);

export default instance;
