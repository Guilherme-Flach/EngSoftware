import styled from 'styled-components';

export const LoginContainer = styled.div`
    background-color: rgba(24, 26, 27, 0.92);;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    /* border: 1px solid red; */
    border-radius: 5px;

    padding: 20px 10px;
`

export const LoginFieldsContainer = styled.div`
    margin-top: 15px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

    padding: 10px;

    margin-bottom: 10px;
`

export const LoginField = styled.input`
    width: 330px;
    margin-bottom: -2px;
    border-radius: 2px;
    line-height: 20px;
    padding: 5px;
    box-shadow: none;
    border: 3px solid #fff59d;
    font-size: 20px;

    background-color: rgba(0,0,0,0);
    color: rgb(200, 195, 188);

    &:focus {
        outline: 3px solid #f57f17;
    }
`

export const LoginButtonsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-flow: row-reverse;
    justify-content: space-between;
    align-items: center;
`

export const LoginButton = styled.button`
    background-color: #ffc107;
    color: #000;
    border: none;

    font-size: 14px;
    padding: 10px 23px;
    margin-bottom: 5px;
    border-radius: 8px;
    max-width: 63%;

    &:hover {
        filter: brightness(1.2);
        cursor: pointer;
    }

    &:active {
        filter: brightness(0.8);
    }

`
export const LoginErrorMessage = styled.div`
    margin-top: 15px;
    font-weight: bold;
    color: #F00;
`