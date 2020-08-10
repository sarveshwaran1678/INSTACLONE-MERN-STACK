import React from "react";

import post from "../Images/mayank.jpg";
import Navbar from "../AuthScreens/Navbar";
import UserInfo from "./UserProfileComponents/UserInfo";
import UserPosts from "./UserProfileComponents/UserPosts";
import UserInfoPhone from "./UserProfileComponents/UserInfoPhone";
import UserStories from "./UserProfileComponents/UserStories";

function UserProfile() {
  return (
    <div>
      <Navbar />
      <div class="container my-5">
        <div className="d-none d-md-block">
          <div class="row mb-3">
            <div class="col-md-1"></div>
            <div class="col-md-3">
              <img
                className="profile align-items-center"
                src={post}
                style={{
                  borderRadius: "50% ",
                  height: "140px",
                  width: "140px",
                }}
              />
            </div>
            <div className="col-md-6">
              <UserInfo />
            </div>
          </div>
        </div>
        {/* Phone */}
        <div class="row d-md-none">
          <div className="col-8">
            <UserInfoPhone />
          </div>
          <div class="col-2 mt-2">
            <img
              className="profile align-items-center"
              src={post}
              style={{
                borderRadius: "50% ",
                height: "100px",
                width: "100px",
              }}
            />
          </div>
        </div>

        <div class="d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center d-md-none">
          <div class=" bd-highlight mr-3" style={{ fontWeight: "500" }}>
            1000 followers
          </div>
          <div class=" bd-highlight" style={{ fontWeight: "500" }}>
            210 following
          </div>
        </div>
        <div className="d-md-none text-left">
          <button type="button" class="btn btn-primary px-5">
            Follow
          </button>
        </div>

        {/* Story */}
        <UserStories />

        <hr
          className="mt-0"
          style={{ borderTop: "1.75px solid rgba(0,0,0,.1)" }}
        />

        <UserPosts />
      </div>
    </div>
  );
}

export default UserProfile;