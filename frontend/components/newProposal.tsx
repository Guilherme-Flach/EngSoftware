import { Dispatch, SetStateAction, useState } from "react";
import { createRequest } from "../helpers/requests";
import { StyledNewProposal } from "./styled/NewProposal.styled";
import CurrencyInput, { cleanValue } from "react-currency-input-field";
import { createProposal } from "../helpers/proposals";

export const NewProposal = ({
  setRefetch, requestId
}: {
  setRefetch: Dispatch<SetStateAction<boolean>>,
  requestId: number
}) => {
  const [price, setPrice] = useState<string | number>();
  function onSubmit() {
    if (!isNaN(Number(price)) && Number(price) > 0) {
      createProposal(requestId, Number(price));
    }
    setRefetch((prev) => !prev);
  }

  return (
    <StyledNewProposal>
      <CurrencyInput
        id="input-example"
        name="input-price"
        prefix="R$ "
        placeholder="Valor a cobrar"
        value={price}
        allowDecimals={true}
        onValueChange={(value, name, values) => setPrice(value)}
        decimalScale={2}
        decimalsLimit={2}
      />
      <button onClick={onSubmit}>Fazer Proposta</button>
    </StyledNewProposal>
  );
};


export default NewProposal;
