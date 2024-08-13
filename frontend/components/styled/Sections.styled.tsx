import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: rgb(13, 13, 16);

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-around;
  height: 86.5vh;
`;

export const RequestsContainer = styled.div`
  width: 80%;
  flex: 1;
  border-radius: 6px;
  background-color: rgba(0,0,0,0.3);

  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: space-around;
  padding: 10px;
`;

export const IndexHelpMeContainer = styled.div`
    margin-top: 15px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

    padding: 10px;

    margin-bottom: 10px;
`

export const IndexHelpMeButton = styled.button`
    margin-top: 15px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

    padding: 10px;

    margin-bottom: 10px;
`

export const ImageLogoText = styled.img.attrs((props) => ({
  src: "/iguinchologo_text.png",
}))`
  height:10vh;
`;

export const ImageLogo = styled.img.attrs((props) => ({
  src: "/iguinchologo.png",
}))`
  height: 200px;
`;
