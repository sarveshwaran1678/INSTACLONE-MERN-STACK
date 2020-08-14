import React, { useEffect, useState } from "react";

import { Image, Transformation, Placeholder } from "cloudinary-react";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import { postComment, getAllComments } from "../UserFeedComponents/APICalls";
import ModalComments from "../UserFeedComponents/ModalComments";
import { removePost } from "./APICalls";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function ProfilePostModal({
  myOwnPage,
  post,
  profile,
  showModal,
  setShowModal,
  updateAssets,
}) {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  // const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    dispComments();
  }, [showModal]);
  const dispComments = () => {
    if (showModal === true) {
      getComments();
    }
  };

  // const Confirm = () => (
  //     <div>
  //         <div className='d-flex flex-row bd-highlight mb-3 justify-content-around align-items-center'>
  //             <div>
  //                 <i className='fas fa-check  fa-lg  mr-3 text-success'></i>
  //                 <span
  //                     style={{
  //                         fontFamily: 'Montserrat',
  //                         fontWeight: '500',
  //                     }}>
  //                     Yes
  //                 </span>
  //             </div>

  //             <div>
  //                 <i className='fas fa-times  fa-lg  mr-3 text-success'></i>
  //                 <span
  //                     style={{
  //                         fontFamily: 'Montserrat',
  //                         fontWeight: '500',
  //                     }}>
  //                     No
  //                 </span>
  //             </div>
  //         </div>
  //     </div>
  // );

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

    getComments();
    console.log("test");
  };

  const deletePost = async (picId) => {
    await removePost(userId, token, picId)
      .then((res) => {
        // console.log(res.data);
        // console.log("Delete Succesfully");
        updateAssets();
      })
      .catch((err) => {
        console.log("Not able to delete");
        console.log("ERR:", { ...err }.response);
      });
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
                  backgroundSize: "contain",

                  backgroundPosition: "center center",
                  backgroundImage: `url(${post.pictureUrl})`,
                }
              : `${post.filter}` === "grayscale"
              ? {
                  filter: "grayscale(1)",
                  backgroundSize: "contain",

                  backgroundPosition: "center center",
                  backgroundImage: `url(${post.pictureUrl})`,
                }
              : `${post.filter}` === "saturate"
              ? {
                  filter: "saturate(2)",
                  backgroundSize: "contain",

                  backgroundPosition: "center center",
                  backgroundImage: `url(${post.pictureUrl})`,
                }
              : `${post.filter}` === "blue"
              ? {
                  filter: "contrast(0.7) saturate(1.5)",
                  backgroundSize: "contain",

                  backgroundPosition: "center center",
                  backgroundImage: `url(${post.pictureUrl})`,
                }
              : `${post.filter}` === "x"
              ? {
                  filter: "saturate(1.6) hue-rotate(15deg)",
                  backgroundSize: "contain",

                  backgroundPosition: "center center",
                  backgroundImage: `url(${post.pictureUrl})`,
                }
              : `${post.filter}` === "y"
              ? {
                  filter: "hue-rotate(-20deg)",
                  backgroundSize: "contain",

                  backgroundPosition: "center center",
                  backgroundImage: `url(${post.pictureUrl})`,
                }
              : {
                  backgroundSize: "contain",

                  backgroundPosition: "center center",
                  backgroundImage: `url(${post.pictureUrl})`,
                }
          }
        ></div>
        <div className="col-md-5 col-lg-5 col-xl-5 col-sm-12 pr-0">
          <div className="d-flex justify-content-between m-2">
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
            <div className="text-right ">
              {myOwnPage ? (
                <i
                  class="fas fa-trash fa-lg m-2 text-danger"
                  data-dismiss="modal"
                  onClick={() => {
                    deletePost(post._id);
                  }}
                />
              ) : null}
              <i
                class="fas fa-times fa-lg m-2 "
                data-dismiss="modal"
                onClick={() => {
                  setShowModal(false);
                }}
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
      <div
        class="modal fade"
        id="confirm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="text-right m-2"
          style={{ position: "absolute", right: "0" }}
        >
          <i
            class="fas fa-times fa-lg"
            data-dismiss="modal"
            style={{ color: "white" }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePostModal;
