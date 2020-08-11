import React, { useState, useEffect } from "react";

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
} from "./UserProfileComponents/APICalls";

function UserProfile({ match }) {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  const [myOwnPage, setMyOwnPage] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "",
    name: "",
    profilePicPath: "",
    followings: [],
    followers: [],
    isPrivate: false,
    bio: "",
  });

  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);

  const [isAllowedToShow, setIsAllowedToShow] = useState(false);

  useEffect(() => {
    if (match.params.userId.toString() == userId.toString()) {
      setMyOwnPage(true);
      getUserDetails();
      getOwnPost();
      getOwnStories();
      setIsAllowedToShow(true);
      //getUser

      //for post count get it here and loop (which will give us post count)
      //or can get it there and count which wont give us post count
    } else {
      //getAnotherUser
      getAnotherUser();
      //getAnotherPost();
    }
  }, []);

  useEffect(() => {
    if (
      isAllowedToShow &&
      match.params.userId.toString() != userId.toString()
    ) {
      getAnothersPost();
      getAnotherStories();
    }
  }, [isAllowedToShow]);

  const getUserDetails = async () => {
    await getOwnUser(userId, token)
      .then((res) => {
        const data = res.data;

        setUserDetails({
          username: data.username,
          name: data.name,
          profilePicPath: data.profilePicPath,
          bio: data.bio,
          isPrivate: data.isPrivate,
          followings: data.followings,
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
    await getAnotherUserDetails(match.params.userId, userId, token)
      .then((res) => {
        const data = res.data;

        setUserDetails({
          username: data.username,
          name: data.name,
          profilePicPath: data.profilePicPath,
          bio: data.bio,
          isPrivate: data.isPrivate,
          followings: data.followings,
          followers: data.followers,
        });
      })
      .catch((err) => {
        console.log("Not able to other user details for profile screen");
        console.log("ERR:", { ...err }.response);
      });

    if (!userDetails.isPrivate || userDetails.followers.includes(userId))
      setIsAllowedToShow(true);
  };

  const getAnothersPost = async () => {
    await getAllAnotherPost(match.params.userId, userId, token)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("Not able to other user posts for profile screen");
        console.log("ERR:", { ...err }.response);
      });
  };

  const getAnotherStories = async () => {
    await getAllAnotherStories(userId, match.params.userId, token)
      .then((res) => {
        setStories(res.data);
      })
      .catch((err) => {
        console.log("Not able to another stories for profile screen");
        console.log("ERR:", { ...err }.response);
      });
  };

  const updateAssets = () => {
    console.log("abc");
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

  //make follow toggle for button there
  return (
    <div>
      <Navbar />
      <div className="row mt-5"></div>
      <div class="container mt-5">
        <div className="d-none d-md-block">
          <UserInfo
            myOwn={myOwnPage}
            userDetails={userDetails}
            postCount={posts.length}
          />
        </div>

        {/* Phone */}

        <UserInfoPhone
          myOwn={myOwnPage}
          userDetails={userDetails}
          postCount={posts.length}
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
        />
      ) : null}
    </div>
  );
}

export default UserProfile;
