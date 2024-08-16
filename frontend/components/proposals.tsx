import { useContext, useEffect, useState } from "react";
import { deleteRequest, fetchAllRequests, fetchClientRequests, fetchRescuerRequests, requestSorting } from "../helpers/requests";
import RequestType from "./request";
import IRequest from "../types/IRequest";
import { AuthContext } from "../contexts/AuthContext";

const Proposals = ({
  sorting,
  refetch,
  proposalsType: proposalsType,
}: {
  sorting: requestSorting;
  refetch: boolean;
  proposalsType: string;
}) => {
  const [proposals, setProposals] = useState<IRequest[]>([]);
  const { user } = useContext(AuthContext);

  async function fetchproposals() {
    if (user?.accountType == "GUINCHEIRO") {
      return fetchRescuerRequests(proposalsType)
    } else {
      return fetchClientRequests(proposalsType);

    }
  }

  useEffect(() => {
    async function fetch() {
      const data: IRequest = await fetchRequests();
      if (!data) return;
      setProposals(data);
    }
    fetch();
  }, [sorting, refetch]); //re-fetch every time sorting updates

  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await fetchRequests();
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

  function updateSelf(i: number, newSelf: IRequest) {
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
        proposals.map((request, i) => (
          < RequestType
            key={request.rescueRequestId}
            self={request}
            deleteSelf={DeleteRequest}
            index={i}
            updateSelf={updateSelf}
          ></RequestType >
        ))}
    </>
  );
};

export default Proposals;
