import React, { useEffect } from "react";

import { Image, Transformation, Placeholder } from "cloudinary-react";

import { Link } from "react-router-dom";
import RequestsPendingModal from "./RequestsPendingModal";
import FollowTableModal from "./FollowTableModal";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserInfo({ myOwn, userDetails, postCount, message, handleFollow }) {
  return (
    <div className="row mb-3">
      <div className="col-md-1"></div>
      <div className="col-md-3">
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
        <div className="d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center">
          <div className=" bd-highlight mr-5" style={{ fontWeight: "700" }}>
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
          {myOwn && userDetails.isPrivate ? (
            <div>
              <i
                class="far fa-bell fa-lg ml-5"
                data-toggle="modal"
                data-target={`#request`}
              />
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-row bd-highlight mb-3 justify-content-between align-items-center">
          <div className=" bd-highlight" style={{ fontWeight: "500" }}>
            {postCount} posts
          </div>
          <div
            class=" bd-highlight"
            style={{ fontWeight: "500", cursor: "pointer" }}
            data-toggle="modal"
            data-target={`#followTable2`}
          >
            {userDetails.followers.length} followers
          </div>
          <div
            class=" bd-highlight"
            style={{ fontWeight: "500", cursor: "pointer" }}
            data-toggle="modal"
            data-target={`#followTable`}
          >
            {userDetails.followings.length} following
          </div>
        </div>
        <p style={{ fontWeight: "500" }} className="mb-1">
          {userDetails.name}
        </p>
        <p style={{ fontWeight: "500" }}>{userDetails.bio}</p>
      </div>
      <div
        class="modal fade bd-example-modal-sm"
        id={`request`}
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
        id={`followTable`}
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
              <FollowTableModal
                followings={userDetails.followings}
                heading={"Following"}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade bd-example-modal-sm"
        id={`followTable2`}
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
              <FollowTableModal
                followings={userDetails.followers}
                heading={"Followers"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
