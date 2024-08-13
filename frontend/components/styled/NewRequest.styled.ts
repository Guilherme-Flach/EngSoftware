import styled from "styled-components";

export const StyledNewRequest = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(32,32,32);
  color: #f0f0f0;

  margin: 20px;
  padding: 5px 0 0 0;
  border-radius: 10px;
  max-width: 300px;
  width: 100%;
  font-size: 20px;
  font-weight: bold;

  input,
  button {
    outline: none;
    border: none;
    width: 100%;
    text-align: center;
    color: #f0f0f0;
    background-color: rgba(0,0,0,0);
  }

  input {
    margin-bottom: 10px;
    min-height: 30px;
  }

  input:nth-child(3) {
    height: 50px;
  }

  button {
    margin-top: 10px;
    background-color: #fafafa;
    color: #010101;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 16px;
    padding: 10px;
    font-weight: bold;
  }

  button:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }
`;
