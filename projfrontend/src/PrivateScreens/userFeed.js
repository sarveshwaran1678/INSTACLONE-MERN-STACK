import React, { useEffect, useState } from "react";
import Navbar from "../AuthScreens/Navbar";
import UserStoriesPhone from "./UserFeedComponents/UserStoriesPhone";
import UserStories from "./UserFeedComponents/UserStories";
import Card from "./UserFeedComponents/Card";
import ProfileDetails from "./UserFeedComponents/ProfileDetails";
import { getAllFollowingStories } from "./UserFeedComponents/APICalls";
import { isAuthenticated } from "../AuthScreens/APICalls/signCalls";

function UserFeed() {
  const [stories, setStories] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getStories();
  }, []);

  const getStories = async () => {
    const id = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    await getAllFollowingStories(id, token)
      .then((res) => {
        //console.log(res.data);
        setStories(res.data);
      })
      .catch((err) => {
        console.log({ ...err }.response.data);
      });
  };

  return (
    <div>
      <Navbar />
      <div
        className="container d-md-none d-lg-none"
        style={{
          display: "flex",
          scrollBehavior: "smooth",
          overflowX: "scroll",
          whiteSpace: "nowrap",
        }}
      >
        {stories.map((story) => (
          <UserStoriesPhone story={story} key={story._id} />
        ))}
      </div>
      <div className="row" style={{ margin: "0 0" }}>
        <div className="col-md-1 col-lg-2 col-xl-2" />
        <div
          className="col-md-6 col-lg-5 col-xl-5"
          style={{ paddingRight: "0", paddingLeft: "0" }}
        >
          <Card />
        </div>
        <div
          className="col-lg-4 col-md-5 col-xl-4 d-lg-block d-md-block d-none"
          style={{ maxWidth: "350px" }}
        >
          <div className="User" style={{ marginTop: "5vh" }}>
            <ProfileDetails />
          </div>

          <div className="mt-5 ml-3" style={{ fontWeight: "500" }}>
            Stories
          </div>
          <div
            className="Stories mt-1"
            style={{
              height: "50vh",
              border: "1px solid black",
              overflowY: "scroll",
              overflowX: "hidden",
              borderRadius: "10px",
            }}
          >
            {stories.map((story) => (
              <UserStories story={story} key={story._id} />
            ))}
          </div>
        </div>
        <div className="col-lg-2" />
      </div>
    </div>
  );
}

export default UserFeed;
