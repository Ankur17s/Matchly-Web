import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../redux/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-2xl font-bold">
        No Requests Found
      </h1>
    );

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="font-bold text-3xl mt-2">Connections Requests</h1>
      <div className="flex flex-col items-center w-full sm:w-1/2 mb-20">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="card card-side bg-base-300 shadow-xl my-4 h-56 w-full"
            >
              <figure>
                <img
                  src={photoUrl}
                  className="h-full w-44 object-cover"
                  alt="photo"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold text-2xl">
                  {firstName + " " + lastName}
                </h2>
                <div className="flex gap-3">
                  <span>{age}</span>
                  <span className="capitalize">{gender}</span>
                </div>
                <p>{about}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary mx-4"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
