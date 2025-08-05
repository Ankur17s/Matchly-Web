import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../redux/feedSlice";

const UserCard = ({ data }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    about,
    age = "",
    gender = "",
  } = data;
  const dispatch = useDispatch();

  const handleConnectionRequest = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName} </h2>
        <h2 className="card-title capitalize">{age + " " + gender} </h2>
        <p>{about}</p>
        <div className="card-actions justify-center my-4 gap-5">
          <button
            className="btn btn-primary"
            onClick={() => handleConnectionRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleConnectionRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
