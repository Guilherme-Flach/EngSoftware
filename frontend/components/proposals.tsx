import { useEffect, useState } from "react";
import ProposalType from "./proposal";
import { fetchOpenProposals } from "../helpers/proposals";
import IProposal from "../types/IProposal";

const Proposals = ({
  refetch,
}: {
  refetch: boolean;
}) => {
  const [proposals, setProposals] = useState<IProposal[]>([]);

  async function fetchProposals() {
    return fetchOpenProposals()
  }

  useEffect(() => {
    async function fetch() {
      const data: IProposal = await fetchProposals();
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


  function updateSelf(i: number, newSelf: IProposal) {
    setProposals((prevProposals) => {
      const newProposals = [...prevProposals];
      newProposals[i] = newSelf;
      return newProposals;
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
            index={i}
            updateSelf={updateSelf}
          ></ProposalType >
        ))}
    </>
  );
};

export default Proposals;
