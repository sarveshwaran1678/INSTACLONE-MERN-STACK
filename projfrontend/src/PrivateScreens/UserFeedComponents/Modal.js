import React, { useEffect, useState } from "react";

import ModalComments from "./ModalComments";
import { Image, Transformation, Placeholder } from "cloudinary-react";
import { postComment } from "./APICalls";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import { Link } from "react-router-dom";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function Modal({
  id,
  toggleModal,
  ImgURL,
  profilePic,
  picUsername,
  comments,
  getComments,
  postId,
  filter,
}) {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  const [newComment, setNewComment] = useState("");

  const sendComment = async () => {
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

  return (
    <div>
      <div className="row ">
        <div
          className="col-md-7 col-lg-7 col-xl-7 col-sm-12"
          style={
            `${filter}` === "sepia"
              ? {
                  filter: "sepia(1)",
                  backgroundSize: "contain",

                  backgroundPosition: "center center",
                  backgroundImage: `url(${ImgURL})`,
                }
              : `${filter}` === "grayscale"
              ? {
                  filter: "grayscale(1)",
                  backgroundSize: "contain",

                  backgroundPosition: "center center",
                  backgroundImage: `url(${ImgURL})`,
                }
              : `${filter}` === "saturate"
              ? {
                  filter: "saturate(2)",
                  backgroundSize: "contain",

                  backgroundPosition: "center center",
                  backgroundImage: `url(${ImgURL})`,
                }
              : `${filter}` === "blue"
              ? {
                  filter: "contrast(0.7) saturate(1.5)",
                  backgroundSize: "contain",

                  backgroundPosition: "center center",
                  backgroundImage: `url(${ImgURL})`,
                }
              : `${filter}` === "x"
              ? {
                  filter: "saturate(1.6) hue-rotate(15deg)",
                  backgroundSize: "contain",

                  backgroundPosition: "center center",
                  backgroundImage: `url(${ImgURL})`,
                }
              : `${filter}` === "y"
              ? {
                  filter: "hue-rotate(-20deg)",
                  backgroundSize: "contain",

                  backgroundPosition: "center center",
                  backgroundImage: `url(${ImgURL})`,
                }
              : {
                  backgroundSize: "contain",

                  backgroundPosition: "center center",
                  backgroundImage: `url(${ImgURL})`,
                }
          }
        ></div>
        <div className="col-md-5 col-lg-5 col-xl-5 col-sm-12 pr-0">
          <div className="d-flex justify-content-between m-2">
            <div>
              <Link className="text-dark" to={`/profile/${id}`}>
                <Image
                  className="mr-2 mt-0"
                  cloudName={CloudName}
                  loading="lazy"
                  style={{ filter: `${filter}` }}
                  publicId={profilePic}
                >
                  <Transformation
                    width="45"
                    height="45"
                    radius="max"
                    gravity="auto"
                    crop="fill"
                    quality="auto"
                    flags={["preserve_transparency"]}
                  />
                  <Placeholder type="pixelate" />
                </Image>

                <span
                  className="vertical-align-center"
                  style={{ fontWeight: "500" }}
                >
                  {picUsername}
                </span>
              </Link>
            </div>
            <div className="text-right ">
              <i
                class="fas fa-times fa-lg m-2 "
                data-dismiss="modal"
                onClick={() => toggleModal}
              />
            </div>
          </div>

          <hr className="m-0" />
          <div
            className="Comments mt-2"
            style={{
              overflowY: "scroll",
              overflowX: "hidden",
              borderRadius: "10px",
              height: "30vh",
            }}
          >
            {comments === undefined
              ? null
              : comments.map((comment) => (
                  <ModalComments
                    key={comment._id}
                    comment={comment}
                    getComments={getComments}
                    postId={postId}
                  />
                ))}
          </div>

          <hr className="mb-0" />

          <div className="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Add a Comment"
              style={{ border: "1px solid grey" }}
              value={newComment}
              onChange={(e) => {
                e.preventDefault();
                setNewComment(e.target.value);
              }}
            />
            <div className="input-group-append" style={{ border: "none" }}>
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

export default Modal;
