import styled from 'styled-components';


export const MainHeader = styled.div`
    width: 100%;
    background-color: #ff6f00;
    color: #fafafa;
    font-weight: bold;
    text-align: center;
    padding: 7px 0px;
    font-size: 25px;
`

export const WelcomeHeader = styled.div`
    width: 100%;
    background-color: #e65100;
    color: #ffffff;
    font-weight: bold;
    text-align: right;
    padding: 7px 15px;
    font-size: 18px;
`

export const LogoutButton = styled.button`
    background-color: #b71c1c;
    color: #fafafa;
    border: none;

    font-size: 14px;
    padding: 5px 10px;
    border-radius: 8px;
    max-width: 63%;

    &:hover {
        filter: brightness(1.2);
    }

    &:active {
        filter: brightness(0.8);
    }

`