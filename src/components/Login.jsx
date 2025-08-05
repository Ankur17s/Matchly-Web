import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          email: emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Something Went Wrong");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    const res = await axios.post(
      BASE_URL + "/signup",
      {
        firstName,
        lastName,
        email: emailId,
        password,
      },
      { withCredentials: true }
    );

    dispatch(addUser(res.data.data));
    navigate("/profile");
  };
  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          {!isLoginForm && (
            <>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Email Id</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center mt-3">
            <button
              className="btn btn-primary w-full"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              Submit
            </button>
          </div>
          <p className="text-center my-2">
            {isLoginForm
              ? "Dont have an Account? "
              : "Already have an Account? "}
            <span
              className="text-blue-300 cursor-pointer hover:underline"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm ? " SignUp " : "Login "} here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
