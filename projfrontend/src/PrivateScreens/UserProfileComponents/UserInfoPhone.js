import React, { useState, useEffect } from "react";

import { Image, Transformation, Placeholder } from "cloudinary-react";

import { Link } from "react-router-dom";
import RequestsPendingModal from "./RequestsPendingModal";
import FollowTableModal from "./FollowTableModal";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserInfoPhone({ myOwn, userDetails, message, handleFollow }) {
  return (
    <div className="row d-md-none ">
      <div className="col-8">
        <div className="d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center">
          <div className=" bd-highlight mr-5" style={{ fontWeight: "700" }}>
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
      <div className="col-4 mt-2">
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
        <div className="d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center d-md-none">
          <div
            class=" bd-highlight mr-3"
            style={{ fontWeight: "500" }}
            data-toggle="modal"
            data-target={`#followTablePhone`}
          >
            {userDetails.followers.length} followers
          </div>
          <div
            class=" bd-highlight"
            style={{ fontWeight: "500" }}
            data-toggle="modal"
            data-target={`#followTablePhone`}
          >
            {userDetails.followings.length} following
          </div>
        </div>
      </div>

      {myOwn ? (
        <div className="d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center d-md-none">
          <Link to="/settings">
            <button
              type="button"
              class="btn btn-primary px-2 ml-3"
              style={{ border: "1px solid black" }}
            >
              Edit Profile
            </button>
          </Link>

          <div>
            <i
              class="far fa-bell fa-lg ml-5"
              data-toggle="modal"
              data-target={`#requestPhone`}
            />
          </div>
        </div>
      ) : (
        <div className="d-md-none text-left" style={{ paddingLeft: "15px" }}>
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
        </div>
      )}
      <div
        class="modal fade bd-example-modal-sm"
        id={`requestPhone`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-sm modal-dialog-centered"
          role="document"
        >
          <div
            class="modal-content "
            style={{
              border: "none",
              borderRadius: "0",
            }}
          >
            <div className="modal-body py-0">
              <RequestsPendingModal />
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade bd-example-modal-sm"
        id={`followTablePhone`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-sm modal-dialog-centered"
          role="document"
        >
          <div
            class="modal-content "
            style={{
              border: "none",
              borderRadius: "0",
            }}
          >
            <div className="modal-body py-0">
              <FollowTableModal followings={userDetails.followings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoPhone;
