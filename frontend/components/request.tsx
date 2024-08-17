import { AuthContext } from "../contexts/AuthContext";
import { findRequest } from "../helpers/requests";
import RequestType from "../types/IRequest";
import { StyledRequest, RequestTitle, RequestText, RequestButtonsWrapper, VoteButton, RequestUser, DeleteButton } from "./styled/Request.styled";
import { useContext, useState } from "react";
import { NewProposal } from "./newProposal";

const Request = ({ self, deleteSelf, index, updateSelf }: Props) => {
  const { user } = useContext(AuthContext);
  const [isProposed, setProposed] = useState<boolean | undefined>();
  const [refetch, setRefetch] = useState(false);
  const [isFinished, setFinished] = useState<boolean | undefined>();
  const date = new Date(self.creationDate);

  return (
    <StyledRequest>
      <RequestTitle>{self.location}</RequestTitle>

      <RequestText>Problema: {self.problem}</RequestText>

      <RequestText><i>Telefone:{self.customer.account.phoneNumber}</i></RequestText>

      <RequestText><i>Email:{self.customer.account.email}</i></RequestText>

      <RequestText><i>{date.toLocaleString()}</i></RequestText>

      {/* Is from the same user */}
      {(user?.email == self.customer.account.email) &&
        // Is still open
        (!self.isFinished) &&
        <DeleteButton onClick={() => deleteSelf(index, self.rescueRequestId)}>
          Deletar
        </DeleteButton>}
      {self.isFinished && <i>Finalizado.</i>}
      {(user?.accountType == "GUINCHEIRO") && (!self.isFinished) &&
        <NewProposal setRefetch={setRefetch} requestId={self.rescueRequestId}></NewProposal>
      }
    </StyledRequest>
  );
};

interface Props {
  self: RequestType;
  deleteSelf: (i: number, id: number) => void;
  index: number;
  updateSelf: (i: number, self: RequestType) => void;
}

export default Request;
