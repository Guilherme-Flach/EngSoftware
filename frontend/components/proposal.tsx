import { AuthContext } from "../contexts/AuthContext";
import { castVote as proposeService } from "../helpers/votes";
import { findRequest } from "../helpers/requests";
import ProposalType from "../types/IProposal";
import { StyledRequest, RequestTitle, RequestText, RequestButtonsWrapper, VoteButton, RequestUser, DeleteButton, AcceptButton } from "./styled/Request.styled";
import { useContext, useState } from "react";
import { NewProposal } from "./newProposal";

const Proposal = ({ self, index, updateSelf }: Props) => {
  const { user } = useContext(AuthContext);
  const [isProposed, setProposed] = useState<boolean | undefined>();
  const [refetch, setRefetch] = useState(false);
  const [isFinished, setFinished] = useState<boolean | undefined>();
  async function Propose(type: boolean) {
    if (type === isProposed) return;

    //cast vote and then update self with up to date data
    await proposeService(type, self.rescueRequestId);
    const { data: updatedSelf } = await findRequest(self.rescueRequestId);
    updateSelf(index, updatedSelf);
    setProposed(type);
  }

  return (
    <StyledRequest>
      <RequestText>Problema: {self.problem}</RequestText>

      <RequestText>Usuário: {self.rescuer.account.username}</RequestText>

      <RequestText>Preço: {self.price}</RequestText>

      {/* Is from the same user */}
      {
        <AcceptButton onClick={() => console.log(self.rescueProposalId)}>
          Aceitar
        </AcceptButton>
      }
    </StyledRequest >
  );
};

interface Props {
  self: ProposalType;
  deleteSelf: (i: number, id: number) => void;
  index: number;
  updateSelf: (i: number, self: ProposalType) => void;
}

export default Proposal;
