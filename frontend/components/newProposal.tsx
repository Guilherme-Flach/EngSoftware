import { Dispatch, SetStateAction, useState } from "react";
import { createRequest } from "../helpers/requests";
import { StyledNewProposal } from "./styled/NewProposal.styled";
import CurrencyInput from "react-currency-input-field";
import { createProposal } from "../helpers/proposals";

export const NewProposal = ({
  setRefetch,
}: {
  setRefetch: Dispatch<SetStateAction<boolean>>;
}) => {
  const [price, setPrice] = useState<string | number>();

  function onSubmit() {
    if (!isNaN(Number(price)) && Number(price) > 0) {
      createProposal(Number(price));
    }
    setRefetch((prev) => !prev);
  }

  return (
    <StyledNewProposal>
      <CurrencyInput
        id="input-example"
        name="input-price"
        decimalsLimit={2}
        prefix="R$ "
        placeholder="Valor a cobrar"
        value={price}
        onValueChange={(value, name, values) => setPrice(value)}
      />
      <button onClick={onSubmit}>Fazer Proposta</button>
    </StyledNewProposal>
  );
};
