import styled from "styled-components";

export const StyledIdea = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;

  background-color: #fff9c4;
  border-radius: 5px;
  margin-top: 10px;
  height: 500px;
  padding: 0px 20px 20px 20px;

  width: 300px;
`;

export const IdeaTitle = styled.p`
  font-weight: bold;
  text-align: center;
  margin-bottom: 0px;
`;

export const IdeaUser = styled.p`
  font-style: italic;
  font-weight: lighter;
  text-align: center;

  margin-top: 0px;
  margin-bottom: 5px
`;


export const IdeaText = styled.p`
  flex:1;
  text-align: justify;
`;

export const IdeaVoteCount = styled.p`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  padding: 0px 5px;

  overflow: hidden;
  margin-bottom: 0px;
  margin-top: 5px;  
  span {
    line-height: 20px;
    vertical-align: middle;
    margin-top: -2px;
    margin-left: 3px;
    margin-right: 3px;
  }
  
`;

export const IdeaButtonsWrapper = styled.p`
  height: 15px;
`;

export const VoteButton = styled.button`
  border: 2px solid #ffab00;
  background-color: #ffe0b2;
  padding: 7px 12px;
  border-radius: 7px;
  margin: 3px;

  &:hover {
        filter: brightness(1.4);
        cursor: pointer;
    }

    &:active {
        filter: brightness(0.7);
    }
  
`;

export const DeleteButton = styled.button`
  background-color: #b71c1c;
  color: #fdfdfd;
  padding: 7px 12px;
  border-radius: 7px;
  border:none;

  margin-bottom: 50px;

  &:hover {
        filter: brightness(1.2);
        cursor: pointer;
  }

  &:active {
      filter: brightness(0.7);
  }
`;