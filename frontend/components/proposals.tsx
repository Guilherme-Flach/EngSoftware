import { useContext, useEffect, useState } from "react";
import { deleteRequest, fetchAllRequests, fetchClientRequests, fetchRescuerRequests, requestSorting } from "../helpers/requests";
import ProposalType from "./proposal";
import IRequest from "../types/IRequest";
import { fetchOpenProposals } from "../helpers/proposals";
import IProposal from "../types/IProposal";
import { AuthContext } from "../contexts/AuthContext";

const Proposals = ({
  refetch,
}: {
  refetch: boolean;
}) => {
  const [proposals, setProposals] = useState<IProposal[]>([]);
  const { user } = useContext(AuthContext);

  async function fetchProposals() {
    return fetchOpenProposals()
    console.log(user?.accountType)
    if (user?.accountType == "CLIENTE") {
    } else {
      //return fetchClientRequests(proposalsType);
    }
  }

  useEffect(() => {
    async function fetch() {
      const data: IRequest = await fetchProposals();
      if (!data) return;
      setProposals(data);
    }
    fetch();
  }, [refetch]); //re-fetch every time sorting updates

  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await fetchProposals();
      if (!data) return;
      setProposals(data);
    }, 2500);

    return () => clearInterval(interval);
  }, []);


  function DeleteRequest(i: number, id: number) {
    deleteRequest(id);
    setProposals((prevProposals) => {
      const newRequests = [...prevProposals];
      newRequests.splice(i, 1);
      return newRequests;
    });
  }

  function updateSelf(i: number, newSelf: IProposal) {
    setProposals((prevProposals) => {
      const newRequests = [...prevProposals];
      newRequests[i] = newSelf;
      return newRequests;
    });
  }

  return (
    <>
      {refetch ? "" : ""}
      {proposals.length &&
        proposals.map((proposal, i) => (
          <ProposalType
            key={proposal.rescueProposalId}
            self={proposal}
            deleteSelf={DeleteRequest}
            index={i}
            updateSelf={updateSelf}
          ></ProposalType >
        ))}
    </>
  );
};

export default Proposals;
