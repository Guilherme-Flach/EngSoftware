import { useEffect, useState } from "react";
import { deleteRequest, fetchAllRequests, fetchOwnRequests, requestSorting } from "../helpers/requests";
import RequestType from "./request";
import IRequest from "../types/IRequest";

const Requests = ({
  sorting,
  refetch,
  accountType,
}: {
  sorting: requestSorting;
  refetch: boolean;
  accountType: string;
}) => {
  const [requests, setRequests] = useState<IRequest[]>([]);

  async function fetchRequests() {
    if (accountType == "GUINCHEIRO") {
      return fetchAllRequests();
    } else if (accountType == "CLIENTE") {
      return fetchOwnRequests();
    }

    //default
    fetchOwnRequests();
  }

  useEffect(() => {
    async function fetch() {
      const { data } = await fetchRequests();
      if (!data) return;
      setRequests(data);
    }
    fetch();
  }, [sorting, refetch]); //re-fetch every time sorting updates

  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await fetchRequests();
      if (!data) return;
      setRequests(data);
    }, 2500);

    return () => clearInterval(interval);
  }, []);


  function DeleteRequest(i: number, id: number) {
    deleteRequest(id);
    setRequests((prevRequests) => {
      const newRequests = [...prevRequests];
      newRequests.splice(i, 1);
      return newRequests;
    });
  }

  function updateSelf(i: number, newSelf: IRequest) {
    setRequests((prevRequests) => {
      const newRequests = [...prevRequests];
      newRequests[i] = newSelf;
      return newRequests;
    });
  }

  return (
    <>
      {refetch ? "" : ""}
      {requests.length &&
        requests.map((request, i) => (
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

export default Requests;
