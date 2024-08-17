import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: rgb(13, 13, 16);

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-around;
  height: 91.7vh;
`;

export const RequestsContainerParent = styled.div`
  width: 90%;
  flex: 1;
  border-radius: 6px;
  background-color: rgba(0,0,0,0.3);

  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: space-around;
  padding: 10px;
  height: 30vh;
  overflow-y: auto;
`;

export const RequestsContainerTitle = styled.div`
  width: 100%;
  color: #f0f0f0;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  align-self: flex-start;
`;


export const RequestsContainer = styled.div`
  width: 45%;
  min-width: 300px;
  height: 100%;
  border-radius: 6px;
  background-color: rgba(0,0,0,0.3);

  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  overflow-y: auto;
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
    background-color: #eeeeee;
    border-radius: 10px;
    padding: 20px;
    font-family: "Coolvetica";
    font-weight: bold;
    font-size: 3.5rem;
    color: rgb(32,32,32);
    box-shadow: none;
    border: none;

    &:hover {
        filter: brightness(1.4);
        cursor: pointer;
    }

    &:active {
        filter: brightness(0.7);
    }
`

export const ImageLogoText = styled.img.attrs((props) => ({
  src: "/iguinchologo_text.png",
}))`
  height:7vh;
  margin-top: -10px;
`;

export const ImageLogo = styled.img.attrs((props) => ({
  src: "/iguinchologo.png",
}))`
  height: 200px;
`;
