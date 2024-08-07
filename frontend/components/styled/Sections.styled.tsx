import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: rgb(34, 36, 38);

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-around;
  min-height: 85vh;
`;

export const IdeasContainer = styled.div`
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

export const ImageLogoText = styled.img.attrs((props) => ({
  src: "/lidealogo_text.png",
}))`
  height: 64px;
`;

export const ImageLogo = styled.img.attrs((props) => ({
  src: "/lidealogo.png",
}))`
  height: 200px;
`;
