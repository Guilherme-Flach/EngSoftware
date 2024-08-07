import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import Ideas from "../components/ideas";
import { AuthContext } from "../contexts/AuthContext";
import {
  WelcomeHeader,
  LogoutButton,
} from "../components/styled/Header.styled";
import {
  Container,
  IdeasContainer,
} from "../components/styled/Sections.styled";
import {
  SortSelector,
  SortButton,
} from "../components/styled/SortSelector.styled";
import { MdHourglassBottom, MdThumbDown, MdThumbUp } from "react-icons/md";
import { ideaSorting } from "../helpers/ideas";
import { NewIdea } from "../components/newIdea";

const Home: NextPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [sorting, _setSorting] = useState<ideaSorting>(ideaSorting.latest);

  const [refetch, setRefetch] = useState(false);

  // function for logging the user out
  async function endSession() {
    const response = await logout();

    if (response === true) location.reload();
  }

  return (
    <Container>
      <Head>
        <title>Ideas</title>
        <meta name="description" content="gamer ideas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WelcomeHeader>
        Logado como {user?.username} ({user?.email}){" "}
        <LogoutButton onClick={endSession}>Sair</LogoutButton>
      </WelcomeHeader>
      <SortSelector>
      <SortButton
          selected={sorting == ideaSorting.latest}
          onClick={() => {
            _setSorting(ideaSorting.latest);
          }}
        >
          {" "}
          <MdHourglassBottom></MdHourglassBottom>
          <span>Mais Recentes</span>
        </SortButton>

        <SortButton
          selected={sorting == ideaSorting.best}
          onClick={() => {
            _setSorting(ideaSorting.best);
          }}
        >
          <MdThumbUp></MdThumbUp>
          <span>Melhores</span>
        </SortButton>

        <SortButton
          selected={sorting == ideaSorting.worst}
          onClick={() => {
            _setSorting(ideaSorting.worst);
          }}
        >
          <MdThumbDown></MdThumbDown>
          <span>Piores</span>
        </SortButton>

      </SortSelector>

      <NewIdea setRefetch={setRefetch}></NewIdea>

      <IdeasContainer>
        <Ideas sorting={sorting} refetch={refetch}></Ideas>
      </IdeasContainer>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
