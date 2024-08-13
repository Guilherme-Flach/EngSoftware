import styled from 'styled-components';

export const LoginContainer = styled.div`
    background-color: rgb(32,32,32);

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    /* border: 1px solid red; */
    border-radius: 20px;
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
    margin-bottom: 10px;
    border-radius: 2px;
    line-height: 20px;
    padding: 5px;
    box-shadow: none;
    border: 3px solid #131313;
    font-size: 20px;

    background-color: rgba(0,0,0,0);
    color: rgb(200, 195, 188);

    &:focus {
        outline: 3px solid #16131b;
    }
`

export const AccountTypeField = styled.select`
    width: 330px;
    margin-bottom: 10px;
    border-radius: 2px;
    line-height: 20px;
    padding: 5px;
    box-shadow: none;
    border: 3px solid #131313;
    font-size: 20px;

    background-color: rgba(0,0,0,0);
    color: rgb(203, 203, 203);

    &:focus {
        outline: 3px solid #16131b;
    }
`

export const AccountTypeOption = styled.option`
    width: 330px;
    border: 3px solid #131313;
    font-size: 20px;

    background-color:rgb(255, 255, 255, 0);
    color: rgba(20,20,20,255);
`

export const LoginButtonsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-flow: row-reverse;
    justify-content: space-between;
    align-items: center;
`

export const LoginButton = styled.button`
    background-color: #c7c7c7;
    color: #181818;
    border: none;

    font-size: 14px;
    padding: 6px 23px;
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
    color: #7a0303;
`