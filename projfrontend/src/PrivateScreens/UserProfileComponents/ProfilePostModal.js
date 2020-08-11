import React, { useEffect, useState } from "react";

import { Image, Transformation, Placeholder } from "cloudinary-react";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import { postComment, getAllComments } from "../UserFeedComponents/APICalls";
import ModalComments from "../UserFeedComponents/ModalComments";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function ProfilePostModal({ myOwnPage, post, profile }) {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    await getAllComments(userId, post._id, token)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log("Not able to get Comments from profile Modal");
        console.log("ERR:", { ...err }.response);
      });
  };

  const sendComment = async () => {
    await postComment(userId, post._id, token, newComment)
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
            `${post.filter}` === "sepia"
              ? {
                  filter: "sepia(1)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundImage: `url(${post.pictureUrl})`,
                }
              : `${post.filter}` === "grayscale"
              ? {
                  filter: "grayscale(1)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundImage: `url(${post.pictureUrl})`,
                }
              : `${post.filter}` === "saturate"
              ? {
                  filter: "saturate(2)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundImage: `url(${post.pictureUrl})`,
                }
              : `${post.filter}` === "blue"
              ? {
                  filter: "contrast(0.7) saturate(1.5)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundImage: `url(${post.pictureUrl})`,
                }
              : `${post.filter}` === "x"
              ? {
                  filter: "saturate(1.6) hue-rotate(15deg)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundImage: `url(${post.pictureUrl})`,
                }
              : `${post.filter}` === "y"
              ? {
                  filter: "hue-rotate(-20deg)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundImage: `url(${post.pictureUrl})`,
                }
              : {
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundImage: `url(${post.pictureUrl})`,
                }
          }
        ></div>
        <div className="col-md-5 col-lg-5 col-xl-5 col-sm-12 pr-0">
          <div class="d-flex justify-content-between m-2">
            <div>
              <Image
                className="mr-2 mt-0"
                cloudName={CloudName}
                loading="lazy"
                publicId={profile.profilePicPath}
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
                {profile.username}
              </span>
            </div>
            <div class="text-right ">
              {myOwnPage ? (
                <i class="fas fa-trash fa-lg m-2 text-danger" />
              ) : null}
              <i class="fas fa-times fa-lg m-2 " data-dismiss="modal" />
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
            {comments.length === 0 ? (
              <div>Be the first one to comment !</div>
            ) : (
              comments.map((comment) => (
                <ModalComments
                  key={comment._id}
                  comment={comment}
                  getComments={getComments}
                  postId={post._id}
                />
              ))
            )}
          </div>
          {/* {comments.length === 0 ? (
                        <div>Be the first one to comment !</div>
                    ) : null} */}
          <hr className="mb-0" />

          <div class="input-group mb-3">
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

export default ProfilePostModal;
