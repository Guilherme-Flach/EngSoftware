import styled, { ThemedStyledFunction } from "styled-components";

// quick bodge to make typescript stop complaining selected is not a prop attribute
interface SortButtonProps {
    selected? : boolean
    
}

export const SortSelector = styled.div`
    background-color: rgba(0,0,0,0.2);
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: left;
`

export const SortButton = styled.button<SortButtonProps>`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin: 9px 9px;

    padding: 5px 9px;
    border-radius: 20px;
    border: none;

    background-color: ${props => props.selected ? "#bf360c" : "#ff3d00" };

    &:hover {
        filter: brightness(2);
        cursor: pointer;
    }

    &:active {
        filter: brightness(0.7);
    }
`