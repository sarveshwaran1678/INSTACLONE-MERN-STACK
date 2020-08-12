import React, { useEffect, useState, createContext } from "react";
import { Image, Transformation, Placeholder } from "cloudinary-react";
import {
  getAnotherUserDetails,
  getAllComments,
  postLike,
  postComment,
} from "./APICalls";

import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function Card({ feed }) {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  const [feedDetails, setFeedDetails] = useState({
    id: feed._id,
    ImgPath: feed.picturePath,
    caption: feed.caption,
    ImgURL: feed.pictureUrl,
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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getDetails();
    getTimeDiff();
    getComments();
  }, []);

  const getTimeDiff = () => {
    let milliseconds = new Date() - new Date(feed.createdAt);

    let hour, minute, seconds, days;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    days = hour / 24;

    setTimeBefore(
      hour >= 24
        ? `${Math.trunc(days)} day(s) ago`
        : hour < 1
        ? `${minute} minutes ago`
        : `${hour} hours ago`
    );
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
      .catch((err) => {
        console.log("Not able to get Username for stories");
        console.log("ERR:", { ...err }.response);
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

    const postId = feed._id;
    await postComment(userId, postId, token, newComment)
      .then((res) => {
        setNewComment("");
      })
      .catch((err) => {
        console.log("Not able to post comment");
        console.log("ERR:", { ...err }.response);
      });

    await getComments();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className=" mb-5" style={{ fontWeight: "500" }}>
      <div className="mt-5 d-none d-md-block"></div>
      <div class="card">
        <Link to={`/profile/${feed.UserId}`} className="text-dark">
          <Image
            className="m-2"
            cloudName={CloudName}
            loading="lazy"
            publicId={otherUserDetails.profilePic}
            style={
              `${feed.filter}` === "sepia"
                ? { filter: "sepia(1)" }
                : `${feed.filter}` === "grayscale"
                ? { filter: "grayscale(1)" }
                : `${feed.filter}` === "saturate"
                ? { filter: "saturate(2)" }
                : `${feed.filter}` === "blue"
                ? { filter: "contrast(0.7) saturate(1.5)" }
                : `${feed.filter}` === "x"
                ? { filter: "saturate(1.6) hue-rotate(15deg)" }
                : `${feed.filter}` === "y"
                ? { filter: "hue-rotate(-20deg)" }
                : {}
            }
          >
            <Transformation
              width="40"
              height="40"
              radius="max"
              gravity="auto"
              crop="fill"
              quality="auto"
              flags={["preserve_transparency"]}
            />
            <Placeholder type="pixelate" />
          </Image>
          <span className="" style={{ fontWeight: "600" }}>
            {otherUserDetails.userName}
          </span>
        </Link>

        <Image
          className="card-img-top"
          cloudName={CloudName}
          loading="lazy"
          style={
            `${feed.filter}` === "sepia"
              ? { filter: "sepia(1)" }
              : `${feed.filter}` === "grayscale"
              ? { filter: "grayscale(1)" }
              : `${feed.filter}` === "saturate"
              ? { filter: "saturate(2)" }
              : `${feed.filter}` === "blue"
              ? { filter: "contrast(0.7) saturate(1.5)" }
              : `${feed.filter}` === "x"
              ? { filter: "saturate(1.6) hue-rotate(15deg)" }
              : `${feed.filter}` === "y"
              ? { filter: "hue-rotate(-20deg)" }
              : {}
          }
          publicId={feedDetails.ImgPath}
          data-toggle="modal"
          data-target={`#exampleModal${feedDetails.id}`}
          onClick={() => setShowModal(true)}
        >
          <Transformation
            gravity="auto"
            crop="fill"
            quality="auto"
            flags={["preserve_transparency"]}
          />
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
              data-toggle="modal"
              data-target={`#exampleModal${feedDetails.id}`}
              onClick={() => setShowModal(true)}
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
                data-target={`#exampleModal${feedDetails.id}`}
                style={{ textDecoration: "none" }}
                onClick={() => setShowModal(true)}
              >
                View all {feedDetails.commentCount} comments
              </a>
            </p>
          ) : null}

          <p class="card-text">{timeBefore}</p>
          {/* Modal */}
          <div
            class="modal fade bd-example-modal-lg "
            id={`exampleModal${feedDetails.id}`}
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
              <div
                class="modal-content "
                style={{ border: "none", borderRadius: "0" }}
              >
                <div class="modal-body py-0">
                  {showModal ? (
                    <Modal
                      toggleModal={toggleModal}
                      ImgURL={feedDetails.ImgURL}
                      profilePic={otherUserDetails.profilePic}
                      picUsername={otherUserDetails.userName}
                      comments={feedDetails.comments}
                      getComments={getComments}
                      postId={feedDetails.id}
                      filter={feed.filter}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Add a Comment"
              value={newComment}
              style={{ border: "1px solid grey" }}
              onChange={(e) => {
                e.preventDefault();
                setNewComment(e.target.value);
              }}
            />
            <div class="input-group-append" style={{ border: "none" }}>
              <span
                class="input-group-text"
                id="basic-addon2"
                style={{
                  border: "none",
                  fontWeight: "500",
                  color: "blue",
                  cursor: "pointer",
                }}
                onClick={() => (newComment.length == 0 ? null : sendComment())}
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

export default Card;
