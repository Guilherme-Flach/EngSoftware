import { useContext, useEffect, useState } from "react";
import { deleteRequest, fetchAllRequests, fetchClientRequests, fetchRescuerRequests, requestSorting } from "../helpers/requests";
import RequestType from "./request";
import IRequest from "../types/IRequest";
import { AuthContext } from "../contexts/AuthContext";

const Requests = ({
  sorting,
  refetch,
  requestsType: requestsType,
}: {
  sorting: requestSorting;
  refetch: boolean;
  requestsType: string;
}) => {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const { user } = useContext(AuthContext);

  async function fetchRequests() {
    console.log(user?.accountType)
    if (user?.accountType == "GUINCHEIRO") {
      return fetchRescuerRequests(requestsType)
    } else {
      return fetchClientRequests(requestsType);

    }
  }

  useEffect(() => {
    async function fetch() {
      const data: IRequest = await fetchRequests();
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
