import React, { useEffect, useState } from "react";
//import post from "../../Images/mayank.jpg";

import { Image, Transformation, Placeholder } from "cloudinary-react";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import { follow } from "./APICalls";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserInfo({ myOwn, userDetails, postCount, getAnotherUser }) {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  const [followBtnText, setFollowBtnText] = useState("");

  useEffect(() => {
    myOwn
      ? setFollowBtnText("")
      : userDetails.followers.includes(userId)
      ? setFollowBtnText("UnFollow")
      : !userDetails.isPrivate
      ? setFollowBtnText("Follow")
      : userDetails.followRequestPending.includes(userId)
      ? setFollowBtnText("Remove Follow Request")
      : setFollowBtnText("Send Follow Request");
  }, []);

  const followToggle = async () => {
    await follow(userId, userDetails.id, token)
      .then(async (res) => {
        console.log(res.data.message);

        await getAnotherUser();

        myOwn
          ? setFollowBtnText("")
          : userDetails.followers.includes(userId)
          ? setFollowBtnText("UnFollow")
          : !userDetails.isPrivate
          ? setFollowBtnText("Follow")
          : userDetails.followRequestPending.includes(userId)
          ? setFollowBtnText("Remove Follow Request")
          : setFollowBtnText("Send Follow Request");
      })
      .catch((err) => {
        console.log("Not able to change follow request");
        console.log("ERR:", { ...err }.response);
      });
  };

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
          {myOwn ? null : (
            <button
              type="button"
              class="btn btn-primary px-5"
              onClick={() => followToggle()}
            >
              {followBtnText}
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
