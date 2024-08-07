import type { AppProps } from "next/app";
import { AuthContextProvider } from "../contexts/AuthContext";
import { GlobalStyles } from "../components/styled/GlobalStyles";
import { MainHeader } from "../components/styled/Header.styled";
import { Footer } from "../components/styled/Footer.styled";
import { ImageLogoText } from "../components/styled/Sections.styled";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <>
        <GlobalStyles></GlobalStyles>
        <MainHeader><ImageLogoText></ImageLogoText></MainHeader>
        <Component {...pageProps} />
        <Footer>Lidea Inc. 2021</Footer>
      </>
    </AuthContextProvider>
  );
}

export default MyApp;
