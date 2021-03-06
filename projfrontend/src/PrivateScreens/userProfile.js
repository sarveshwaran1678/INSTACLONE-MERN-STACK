import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import post from "../Images/mayank.jpg";
import Navbar from "../AuthScreens/Navbar";
import UserInfo from "./UserProfileComponents/UserInfo";
import UserPosts from "./UserProfileComponents/UserPosts";
import UserInfoPhone from "./UserProfileComponents/UserInfoPhone";
import UserProfileStories from "./UserProfileComponents/UserProfileStories";
import { isAuthenticated } from "../AuthScreens/APICalls/signCalls";
import {
  getOwnUser,
  getAnotherUserDetails,
} from "./UserFeedComponents/APICalls";
import {
  getAllYourPost,
  getAllAnotherPost,
  getAllYourStories,
  getAllAnotherStories,
  toggleFollow,
} from "./UserProfileComponents/APICalls";

function UserProfile({ match }) {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  let anotherUserId = match.params.userId;

  useEffect(() => {
    //anotherUserId = match.params.userId;
    render();
  }, [match.params.userId]);

  const render = () => {
    if (userId === anotherUserId) {
      //console.log("hiiii");
      setMyOwnPage(true);
      getUserDetails();
      getOwnPost();
      getOwnStories();
      setIsAllowedToShow(true);
    } else {
      getAnotherUser();
    }
  };

  const [myOwnPage, setMyOwnPage] = useState(false);

  const [userDetails, setUserDetails] = useState({
    id: "",
    username: "",
    name: "",
    profilePicPath: "",
    followings: [],
    followers: [],
    isPrivate: false,
    followRequestPending: "",
    bio: "",
  });

  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);

  const [isAllowedToShow, setIsAllowedToShow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    render();
  }, [isAllowedToShow]);

  const handleFollow = async () => {
    await toggleFollow(userId, anotherUserId, token)
      .then((res) => {
        if (message === "Follow") {
          setMessage("Unfollow");
        } else if (message === "Unfollow") {
          setMessage("Follow");
        } else if (message === "Send Follow Request") {
          setMessage("Cancel Follow Request");
        } else if (message === "Cancel Follow Request") {
          setMessage("Send Follow Request");
        }
      })
      .catch((err) => {
        console.log("Not able to toggle follow");
        console.log("ERR:", { ...err }.response);
      });
  };
  const getUserDetails = async () => {
    await getOwnUser(userId, token)
      .then((res) => {
        const data = res.data;

        setUserDetails({
          id: data._id,
          username: data.username,
          name: data.name,
          profilePicPath: data.profilePicPath,
          bio: data.bio,
          isPrivate: data.isPrivate,
          followings: data.followings,
          followRequestPending: data.followRequestPending,
          followers: data.followers,
        });
      })
      .catch((err) => {
        console.log("Not able to own user details for profile screen");
        console.log("ERR:", { ...err }.response);
      });
  };

  const getOwnPost = async () => {
    await getAllYourPost(userId, token)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("Not able to own posts for profile screen");
        console.log("ERR:", { ...err }.response);
      });
  };

  const getOwnStories = async () => {
    await getAllYourStories(userId, token)
      .then((res) => {
        setStories(res.data);
      })
      .catch((err) => {
        console.log("Not able to own stories for profile screen");
        console.log("ERR:", { ...err }.response);
      });
  };

  const getAnotherUser = async () => {
    await getAnotherUserDetails(anotherUserId, userId, token)
      .then((res) => {
        const data = res.data;

        setUserDetails({
          id: data._id,
          username: data.username,
          name: data.name,
          profilePicPath: data.profilePicPath,
          bio: data.bio,
          isPrivate: data.isPrivate,
          followings: data.followings,
          followers: data.followers,
          followRequestPending: data.followRequestPending,
        });
      })
      .catch((err) => {
        console.log("Not able to other user details for profile screen");
        console.log("ERR:", { ...err }.response);
      });

    if (!userDetails.isPrivate || userDetails.followers.includes(userId))
      setIsAllowedToShow(true);
    if (userDetails.isPrivate) {
      if (userDetails.followers.includes(userId)) {
        getAnotherStories();
        //console.log("HII");
        getAnothersPost();
        setMessage("Unfollow");
      } else if (userDetails.followRequestPending.includes(userId)) {
        setMessage("Cancel Follow Request");
      } else {
        setMessage("Send Follow Request");
      }
    } else if (!userDetails.isPrivate) {
      //console.log("HII");
      //console.log(userDetails);
      getAnothersPost();
      if (userDetails.followers.includes(userId)) {
        setMessage("Unfollow");
        getAnotherStories();
      } else {
        setMessage("Follow");
      }
    }
  };

  const getAnothersPost = async () => {
    await getAllAnotherPost(anotherUserId, userId, token)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("Not able to other user posts for profile screen");
        console.log("ERR:", { ...err }.response);
      });
  };

  const getAnotherStories = async () => {
    await getAllAnotherStories(userId, anotherUserId, token)
      .then((res) => {
        setStories(res.data);
      })
      .catch((err) => {
        console.log("Not able to get another user stories for profile screen");
        console.log("ERR:", { ...err }.response);
      });
  };

  const updateAssets = () => {
    //console.log("abc");
    if (match.params.userId.toString() == userId.toString()) {
      getOwnPost();
      getOwnStories();
    } else if (
      isAllowedToShow &&
      match.params.userId.toString() != userId.toString()
    ) {
      getAnothersPost();
      getAnotherStories();
    }
  };

  if (userDetails.id.length === 0) {
    return (
      <div className="text-center" style={{ marginTop: "50vh" }}>
        <h4>
          Loading...
          <i className="fas fa-spinner fa-spin fa-lg  ml-3 text-success"></i>
        </h4>
      </div>
    );
  } else {
    //make follow toggle for button there
    return (
      <div>
        <Navbar />
        <div className="row mt-5"></div>
        <div className="container mt-5">
          <div className="d-none d-md-block">
            <UserInfo
              myOwn={myOwnPage}
              userDetails={userDetails}
              postCount={posts.length}
              message={message}
              handleFollow={handleFollow}
            />
          </div>

          {/* Phone */}

          <UserInfoPhone
            myOwn={myOwnPage}
            userDetails={userDetails}
            postCount={posts.length}
            message={message}
            handleFollow={handleFollow}
          />

          {/* Story */}
          {isAllowedToShow ? (
            <UserProfileStories
              myOwn={myOwnPage}
              stories={stories}
              updateAssets={updateAssets}
            />
          ) : null}
          <hr
            className="mt-0"
            style={{ borderTop: "1px solid rgba(0,0,0,.1)" }}
          />
          {
            //show only when myown ,isNotPrivate,otheruserFollowers contain my Id
          }
        </div>
        {isAllowedToShow ? (
          <UserPosts
            posts={posts}
            myOwnPage={myOwnPage}
            profile={{
              profilePicPath: userDetails.profilePicPath,
              username: userDetails.username,
            }}
            updateAssets={updateAssets}
          />
        ) : null}
      </div>
    );
  }
}

export default UserProfile;
