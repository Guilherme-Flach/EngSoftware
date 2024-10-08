import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from 'next/navigation'
import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  Container,
  IndexHelpMeContainer,
  IndexHelpMeButton,
} from "../components/styled/Sections.styled";

const Home: NextPage = () => {
  const { user, logout } = useContext(AuthContext);

  const [refetch, setRefetch] = useState(false);

  const router = useRouter()

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

      <IndexHelpMeContainer>
        <IndexHelpMeButton
          onClick={() => {
            router.push("/login");
          }}>
          SOCORRO!
        </IndexHelpMeButton>
      </IndexHelpMeContainer>

    </Container >
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId: token, accountType: accountType } = parseCookies(ctx);

  if (!token) {
    return {
      props: {},
    };
  }

  if (accountType == "GUINCHEIRO") {
    return {
      redirect: {
        destination: "/guincheiro",
        permanent: false,
      },
    };
  }

  if (accountType == "CLIENTE") {
    return {
      redirect: {
        destination: "/cliente",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Home;
