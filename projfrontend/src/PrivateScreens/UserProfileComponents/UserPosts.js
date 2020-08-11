import React from "react";
import post from "../../Images/mayank.jpg";

import "../../userfeed.css";
import Modal from "../UserFeedComponents/Modal";
function UserPosts({ myOwn }) {
  return (
    <div className="container mx-auto">
      <div className="text-center">
        <i class="fas fa-th fa-lg mr-2"></i>
        <span style={{ fontWeight: "500" }}>POST'S</span>
      </div>

      <div className="row mt-4">
        <div className="col-4 mb-3">
          <img
            src={post}
            width="100%"
            data-toggle="modal"
            data-target="#exampleModal"
          />
        </div>

        <div className="col-4 mb-3">
          <img
            src={post}
            width="100%"
            data-toggle="modal"
            data-target="#exampleModal"
          />
        </div>
        <div className="col-4 mb-3">
          <img
            src={post}
            width="100%"
            data-toggle="modal"
            data-target="#exampleModal"
          />
        </div>
        <div className="col-4 mb-3">
          <img
            src={post}
            width="100%"
            data-toggle="modal"
            data-target="#exampleModal"
          />
        </div>

        <div className="col-4 mb-3">
          <img
            src={post}
            width="100%"
            data-toggle="modal"
            data-target="#exampleModal"
          />
        </div>
        <div className="col-4 mb-3">
          <img
            src={post}
            width="100%"
            data-toggle="modal"
            data-target="#exampleModal"
          />
        </div>
        <div
          class="modal fade bd-example-modal-lg "
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-lg"
            role="document"
            style={{
              width: "100%",
              maxWidth: "800px",
            }}
          >
            <div class="modal-content ">
              <div class="modal-body ">
                <Modal className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPosts;
