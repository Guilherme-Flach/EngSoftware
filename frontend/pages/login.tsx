import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { LoginButton, LoginButtonsContainer, LoginContainer, LoginErrorMessage, LoginField, AccountTypeField, LoginFieldsContainer, AccountTypeOption } from "../components/styled/Login.styled";
import { Container, ImageLogoText, ImageLogo } from "../components/styled/Sections.styled";

const Login: NextPage = () => {
  const { login, createAccount } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountType, setAccountType] = useState("GUINCHEIRO");

  const [isCreatingNewAccount, setIsCreatingNewAccount] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    //create account
    if (isCreatingNewAccount) {
      const response = await createAccount(username, email, phoneNumber, password, accountType);
      if (typeof response === "string") {
        //api returned an error
        setError(response);
        return;
      }

      Router.push("/");
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
        <title>iGuincho - Login</title>
        <meta name="description" content="iguincho" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginContainer>
        <ImageLogo></ImageLogo>
        <LoginFieldsContainer>
          {isCreatingNewAccount && (
            <><LoginField
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email" />
              <LoginField
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Telefone" /></>
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
          {isCreatingNewAccount && (
            <AccountTypeField
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}>
              <AccountTypeOption
                value="GUINCHEIRO">Guincheiro
              </AccountTypeOption>
              <AccountTypeOption
                value="CLIENTE">Cliente
              </AccountTypeOption>
            </AccountTypeField>
          )}
        </LoginFieldsContainer>
        <LoginButtonsContainer>
          <LoginButton onClick={submit}>{isCreatingNewAccount
            ? "Criar conta"
            : "Login"}</LoginButton>
          <LoginButton onClick={() => { setIsCreatingNewAccount(!isCreatingNewAccount); setError(""); }}>
            {isCreatingNewAccount
              ? "Fazer login em uma conta existente"
              : "Criar uma conta"}
          </LoginButton>
        </LoginButtonsContainer>
        <LoginErrorMessage>{error}</LoginErrorMessage>
      </LoginContainer>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId: token, accountType: accountType } = parseCookies(ctx);

  if (token) {
    if (accountType == "GUINCHEIRO") {
      return {
        redirect: {
          destination: "/guincheiro",
          permanent: false,
        },
      };
    } else if (accountType == "CLIENTE") {
      return {
        redirect: {
          destination: "/cliente",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};

export default Login;
