import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import Requests from "../components/requests";
import { AuthContext } from "../contexts/AuthContext";
import {
  WelcomeHeader,
  LogoutButton,
} from "../components/styled/Header.styled";
import {
  Container,
  RequestsContainer,
  RequestsContainerParent,
  RequestsContainerTitle,
} from "../components/styled/Sections.styled";
import { requestSorting } from "../helpers/requests";
import { NewRequest } from "../components/newRequest";

const Home: NextPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [sorting, _setSorting] = useState<requestSorting>(requestSorting.latest);

  const [refetch, setRefetch] = useState(false);

  // function for logging the user out
  async function endSession() {
    const response = await logout();

    if (response === true) location.reload();
  }

  return (
    <Container>
      <Head>
        <title>iGuincho</title>
        <meta name="description" content="iguincho" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WelcomeHeader>
        Logado como Guincheiro: {user?.username} ({user?.email}){" "}
        <LogoutButton onClick={endSession}>Sair</LogoutButton>
      </WelcomeHeader>

      <RequestsContainerParent>
        <RequestsContainer>
          <RequestsContainerTitle>Pedidos de Serviço</RequestsContainerTitle>
          <Requests sorting={sorting} refetch={refetch} requestsType="open"></Requests>
        </RequestsContainer>
        <RequestsContainer>
          <RequestsContainerTitle>Seviços realizados</RequestsContainerTitle>
          <Requests sorting={sorting} refetch={refetch} requestsType="active"></Requests>
        </RequestsContainer>
      </RequestsContainerParent>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId: token } = parseCookies(ctx);

  if (!token) {
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

export default Home;
