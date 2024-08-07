import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { LoginButton, LoginButtonsContainer, LoginContainer, LoginErrorMessage, LoginField, LoginFieldsContainer } from "../components/styled/Login.styled";
import { Container, ImageLogoText, ImageLogo } from "../components/styled/Sections.styled";

const Login: NextPage = () => {
  const { login, createAccount } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isCreatingNewAccount, setIsCreatingNewAccount] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    //create account
    if (isCreatingNewAccount) {
      const response = await createAccount(username, email, password);
      if (typeof response === "string") {
        //api returned an error
        setError(response);
        return;
      }

      // === true just in case response is a weird error object that evaluates to true
      if (response === true) Router.push("/");
      else setError("Não foi possível criar sua conta");
      return;
    }

    //log the user in
    const success = await login(username, password);
    if (success) Router.push("/");
    else setError("Login inválido!");
  }

  return (
    <Container>
      <Head>
        <title>Ideas - Login</title>
        <meta name="description" content="gamer ideas login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginContainer>
        <ImageLogo></ImageLogo>
        <LoginFieldsContainer>
          {isCreatingNewAccount && (
            <LoginField
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          )}
          <LoginField
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nome de Usuário"
          />
          <LoginField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
        </LoginFieldsContainer>
        <LoginButtonsContainer>
          <LoginButton onClick={submit}>{isCreatingNewAccount
              ? "Criar conta"
              : "Login"}</LoginButton>
          <LoginButton onClick={() => {setIsCreatingNewAccount(!isCreatingNewAccount); setError("");}}>
            {isCreatingNewAccount
              ? "Fazer login em uma conta existente"
              : "Criar uma conta em vez disso"}
          </LoginButton>
        </LoginButtonsContainer>
        <LoginErrorMessage>{error}</LoginErrorMessage>
      </LoginContainer>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
