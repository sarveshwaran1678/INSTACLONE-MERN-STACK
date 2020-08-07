import React, { Component } from "react";
import post from "../../Images/mayankPost.jpg";
import user from "../../Images/sarvesh.jpg";
import ModalComments from "./ModalComments";
import { Image, Transformation } from "cloudinary-react";

function Modal() {
  return (
    <div>
      <div className="row ">
        <div
          className="col-md-7 col-lg-7 col-xl-7 col-sm-12"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundImage: `url(http://res.cloudinary.com/gonfreak/image/upload/v1596714906/InstaClone/a4cd47d7-3a99-4993-8417-bff4cfb5de5f.jpg)`,
          }}
        ></div>
        <div className="col-md-5 col-lg-5 col-xl-5 col-sm-12 pr-0">
          <div class="text-right">
            <i class="fas fa-times fa-lg m-2 " data-dismiss="modal" />
          </div>

          <img
            src={user}
            style={{ borderRadius: "50%" }}
            height={50}
            width={50}
          />

          <span style={{ fontWeight: "500" }}> Sasuke Uchiha</span>
          <hr />
          <div
            className="Comments mt-2"
            style={{
              overflowY: "scroll",
              overflowX: "hidden",
              borderRadius: "10px",
              height: "30vh",
            }}
          >
            <ModalComments />
            <ModalComments />
            <ModalComments />
          </div>
          <hr />

          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Add a Comment"
              style={{ border: "1px solid grey" }}
            />
            <div class="input-group-append" style={{ border: "none" }}>
              <span
                class="input-group-text"
                id="basic-addon2"
                style={{
                  border: "none",
                  fontWeight: "500",
                  color: "blue",
                }}
              >
                Post
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
