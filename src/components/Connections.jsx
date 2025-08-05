import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connetions", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-2xl font-bold">
        No Connections Found
      </h1>
    );

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="font-bold text-3xl mt-2">Connections</h1>
      <div className="flex flex-col items-center w-1/2 mb-20">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
