import React, { useState, useEffect } from "react";

import { Image, Transformation, Placeholder } from "cloudinary-react";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import { follow } from "./APICalls";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserInfoPhone({ myOwn, userDetails, getAnotherUser }) {
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
      .then((res) => {
        console.log(res.data.message);
        getAnotherUser();
      })
      .catch((err) => {
        console.log("Not able to change follow request");
        console.log("ERR:", { ...err }.response);
      });
  };

  return (
    <div class="row d-md-none ">
      <div className="col-8">
        <div class="d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center">
          <div class=" bd-highlight mr-5" style={{ fontWeight: "700" }}>
            {userDetails.username}
          </div>
        </div>
        <p style={{ fontWeight: "500" }} className="mb-1">
          {userDetails.name}
        </p>
        <p style={{ fontWeight: "500" }} className="mb-1">
          {userDetails.bio}
        </p>
      </div>
      <div class="col-4 mt-2">
        <Image
          className="profile align-items-center"
          cloudName={CloudName}
          loading="lazy"
          publicId={userDetails.profilePicPath}
        >
          <Transformation
            width="100"
            height="100"
            radius="50"
            gravity="auto"
            crop="fill"
            quality="auto"
            flags={["preserve_transparency"]}
          />
          <Placeholder type="pixelate" />
        </Image>
      </div>
      <div className="col-12">
        <div class="d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center d-md-none">
          <div class=" bd-highlight mr-3" style={{ fontWeight: "500" }}>
            {userDetails.followers.length} followers
          </div>
          <div class=" bd-highlight" style={{ fontWeight: "500" }}>
            {userDetails.followings.length} following
          </div>
        </div>
      </div>

      <div className="d-md-none text-left" style={{ paddingLeft: "15px" }}>
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
    </div>
  );
}

export default UserInfoPhone;
