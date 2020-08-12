import React, { useEffect } from "react";

import { Image, Transformation, Placeholder } from "cloudinary-react";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import { follow } from "./APICalls";
import { Link } from "react-router-dom";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserInfo({ myOwn, userDetails, postCount, message, handleFollow }) {
  return (
    <div className="row mb-3">
      <div class="col-md-1"></div>
      <div class="col-md-3">
        <Image
          className="profile align-items-center"
          cloudName={CloudName}
          loading="lazy"
          publicId={userDetails.profilePicPath}
        >
          <Transformation
            width="140"
            height="140"
            radius="50"
            gravity="auto"
            crop="fill"
            quality="auto"
            flags={["preserve_transparency"]}
          />
          <Placeholder type="pixelate" />
        </Image>
      </div>
      <div className="col-md-6">
        <div class="d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center">
          <div class=" bd-highlight mr-5" style={{ fontWeight: "700" }}>
            {userDetails.username}
          </div>
          {myOwn ? (
            <Link to="/settings">
              <button
                type="button"
                class="btn px-2"
                style={{ border: "1px solid black" }}
              >
                Edit Profile
              </button>
            </Link>
          ) : (
            <button
              type="button"
              class="btn btn-primary pl-4 pr-2"
              onClick={handleFollow}
            >
              {message}
              <i
                class={
                  message === "Follow" || message === "Send Follow Request"
                    ? "fas fa-user-plus  ml-3"
                    : "fas fa-user-times  ml-3"
                }
              />
            </button>
          )}
        </div>
        <div class="d-flex flex-row bd-highlight mb-3 justify-content-between align-items-center">
          <div class=" bd-highlight" style={{ fontWeight: "500" }}>
            {postCount} posts
          </div>
          <div class=" bd-highlight" style={{ fontWeight: "500" }}>
            {userDetails.followers.length} followers
          </div>
          <div class=" bd-highlight" style={{ fontWeight: "500" }}>
            {userDetails.followings.length} following
          </div>
        </div>
        <p style={{ fontWeight: "500" }} className="mb-1">
          {userDetails.name}
        </p>
        <p style={{ fontWeight: "500" }}>{userDetails.bio}</p>
      </div>
    </div>
  );
}

export default UserInfo;
