import React, { useEffect, useState } from "react";

import { Image, Transformation, Placeholder } from "cloudinary-react";

import {
  getAnotherUserDetails,
  getAllComments,
  postLike,
  postComment,
} from "./APICalls";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";

//import post from "../../Images/mayankPost.jpg";
import Modal from "./Modal";

const CloudName = process.env.REACT_APP_CLOUDNAME;
const userId = isAuthenticated().user._id;
const token = isAuthenticated().token;

function Card({ feed }) {
  const [feedDetails, setFeedDetails] = useState({
    ImgPath: feed.picturePath,
    caption: feed.caption,
    //likeCount: feed.likesFromUserId.length,
    comments: [],
    commentCount: 0,
  });

  const [likeState, setLikeState] = useState({
    likeCount: feed.likesFromUserId.length,
    isLikedByUser: feed.likesFromUserId.includes(userId),
  });

  const [otherUserDetails, setOtherUserDetails] = useState({
    userName: "",
    profilePic: "",
  });

  const [newComment, setNewComment] = useState("");

  const [timeBefore, setTimeBefore] = useState("");

  useEffect(() => {
    getDetails();
    getTimeDiff();
    getComments();
  }, []);

  const getTimeDiff = () => {
    var milliseconds = new Date() - new Date(feed.createdAt);

    var hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;

    setTimeBefore(hour < 1 ? `${minute} minutes ago` : `${hour} hours ago`);
  };

  const getDetails = async () => {
    const anotherUserId = feed.UserId;

    await getAnotherUserDetails(anotherUserId, userId, token)
      .then((res) => {
        setOtherUserDetails({
          userName: res.data.username,
          profilePic: res.data.profilePicPath,
        });
      })
      .catch(() => {
        console.log("Not able to get Username for stories");
      });
  };

  const getComments = async () => {
    const postId = feed._id;

    await getAllComments(userId, postId, token)
      .then((res) => {
        setFeedDetails({
          ...feedDetails,
          comments: res.data,
          commentCount: res.data.length,
        });
      })
      .catch((err) => {
        console.log("Not able to get Comments");
        console.log("ERR:", { ...err }.response);
      });
  };

  const isLiked = async () => {
    const postId = feed._id;

    await postLike(userId, postId, token)
      .then((res) => {
        setLikeState({
          likeCount: res.data.likesFromUserId.length,
          isLikedByUser: res.data.likesFromUserId.includes(userId),
        });
        // console.log(likeState.isLikedByUser);
        // console.log(res.data.likesFromUserId);
      })
      .catch((err) => {
        console.log("Not able to post like");
        console.log("ERR:", { ...err }.response);
      });
  };

  const sendComment = async () => {
    //if (newComment.length == 0) return;
    console.log(newComment);

    const postId = feed._id;
    await postComment(userId, postId, token, newComment)
      .then((res) => {})
      .catch((err) => {
        console.log("Not able to post comment");
        console.log("ERR:", { ...err }.response);
      });
    setNewComment("");
    console.log(newComment);
  };

  return (
    <div className="mt-5" style={{ fontWeight: "500" }}>
      <div class="card">
        <div>
          <Image
            className="m-3"
            cloudName={CloudName}
            loading="lazy"
            publicId={otherUserDetails.profilePic}
          >
            <Transformation
              width="45"
              height="45"
              radius="max"
              gravity="face"
              crop="fill"
            />
            <Placeholder type="pixelate" />
          </Image>
          <span className="" style={{ fontWeight: "600" }}>
            {otherUserDetails.userName}
          </span>
        </div>

        <Image
          className="card-img-top"
          cloudName={CloudName}
          loading="lazy"
          publicId={feedDetails.ImgPath}
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <Transformation gravity="face" crop="fill" />
          <Placeholder type="pixelate" />
        </Image>

        <div class="card-body">
          <h5 class="card-title">
            <i
              class={
                likeState.isLikedByUser
                  ? "fas fa-heart fa-lg mr-4 text-danger"
                  : "far fa-heart fa-lg mr-4 text-danger"
              }
              onClick={() => isLiked()}
            ></i>
            <i
              class="far fa-comment fa-lg"
              style={{
                color: "#28a745",
              }}
            ></i>
          </h5>

          <p class="card-text">{likeState.likeCount} likes</p>
          <p class="card-text">{feedDetails.caption}</p>
          {feedDetails.commentCount != 0 ? (
            <p>
              <a
                class="card-text"
                href=""
                data-toggle="modal"
                data-target="#exampleModal"
                style={{ textDecoration: "none" }}
              >
                View all {feedDetails.commentCount} comments
              </a>
            </p>
          ) : null}

          <p class="card-text">{timeBefore}</p>
          {/* Modal */}
          <div
            class="modal fade bd-example-modal-lg "
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-lg modal-dialog-centered"
              role="document"
              style={{
                width: "100%",
                maxWidth: "800px",
              }}
            >
              <div class="modal-content ">
                <div class="modal-body py-0">
                  <Modal className="" />
                </div>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder={newComment.length === 0 ? "Add a Comment" : " "}
              style={{ border: "1px solid grey" }}
              onChange={(e) => {
                e.preventDefault();
                setNewComment(e.target.value);
              }}
            />
            <div class="input-group-append" style={{ border: "none" }}>
              <a style={{ cursor: "pointer" }}>
                {" "}
                <span
                  class="input-group-text"
                  id="basic-addon2"
                  style={{
                    border: "none",
                    fontWeight: "500",
                    color: "blue",
                  }}
                  onClick={() =>
                    newComment.length == 0 ? null : sendComment()
                  }
                >
                  Post
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
