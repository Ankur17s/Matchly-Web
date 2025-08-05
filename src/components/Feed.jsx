import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    if (feedData) return;
    getFeed();
  }, []);

  if (!feedData) return;
  if (feedData.length <= 0)
    return (
      <h1 className="flex justify-center my-10 text-2xl font-bold">
        No New Person Found!
      </h1>
    );

  return (
    feedData && (
      <div className="flex justify-center my-10">
        <UserCard data={feedData[0]} />
      </div>
    )
  );
};

export default Feed;
