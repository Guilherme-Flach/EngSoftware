import { createContext, useEffect, useState } from "react";
import { parseCookies, destroyCookie } from "nookies";
import axios from "../helpers/axios";

export const AuthContext = createContext({} as AuthContextValue);

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [user, setUser] = useState<User | null>(null);

  function setUserInfo() {
    const { username, email } = parseCookies(undefined);
    //there is no need to get the userId token and verify it exists
    //because thats handled in getServerSideProps in SSR

    setUser({
      username,
      email,
    });
  }

  useEffect(() => {
    setUserInfo();
  }, []);

  //use this to submit the login form
  async function login(username: string, password: string) {
    try {
      await axios.post("/login", { username, password });
    } catch (error) {
      return false;
    }

    setUserInfo();
    return true;
  }

  async function logout() {
    try {
      destroyCookie(undefined, "username");
      destroyCookie(undefined, "email");
      destroyCookie(undefined, "userId");
    } catch (error) {
      return false;
    }
    return true;
  } 

  async function createAccount(
    username: string,
    email: string,
    password: string
  ): Promise<string | boolean> {
    try {
      await axios.post("/users/create", { username, password, email });
      return await login(username, password);
    } catch (error: any) {
      return (error.response.data as string) || ""; //axios error payload
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, createAccount, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

interface User {
  username: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  createAccount: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean | string>;
  logout: () => Promise<boolean>;
}
