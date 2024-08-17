import { AuthContext } from "../contexts/AuthContext";
import { acceptProposal } from "../helpers/proposals";
import { findRequest } from "../helpers/requests";
import ProposalType from "../types/IProposal";
import { StyledRequest, RequestTitle, RequestText, AcceptButton } from "./styled/Request.styled";
import { useContext, useState } from "react";

const Proposal = ({ self, index, updateSelf }: Props) => {
  const { user } = useContext(AuthContext);
  const [refetch, setRefetch] = useState(false);
  const [isFinished, setFinished] = useState<boolean | undefined>();
  async function accept() {
    await acceptProposal(self.rescueProposalId);
    const { data: updatedSelf } = await findRequest(self.rescueRequest.rescueRequestId);
    updateSelf(index, updatedSelf);
  }

  return (
    <StyledRequest>
      <RequestTitle>{self.rescuer.account.username}</RequestTitle>

      <RequestText><i>Telefone:{self.rescuer.account.phoneNumber}</i></RequestText>
      <RequestText><i>Email:{self.rescuer.account.email}</i></RequestText>

      <RequestText>Problema: {self.rescueRequest.problem}</RequestText>

      <RequestText>Preço: {self.price.toFixed(2)}</RequestText>

      <AcceptButton onClick={() => accept()}>
        Aceitar
      </AcceptButton>
    </StyledRequest >
  );
};

interface Props {
  self: ProposalType;
  index: number;
  updateSelf: (i: number, self: ProposalType) => void;
}

export default Proposal;
