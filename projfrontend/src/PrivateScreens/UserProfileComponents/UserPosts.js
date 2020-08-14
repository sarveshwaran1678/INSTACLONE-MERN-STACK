import React, { useState } from "react";
import "../../userfeed.css";

import UploadPicModal from "../../AuthScreens/UploadPicModal";
import ProfilePostModal from "./ProfilePostModal";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserPosts({ posts, myOwnPage, profile, updateAssets }) {
  const [content, setContent] = useState(undefined);
  const [next, setNext] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleNext = () => {
    setNext(!next);
  };
  const reset = () => {
    setContent(undefined);
    setNext(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleFile = (e) => {
    setContent(e.target.result);
  };
  const handleChangeFile = (file) => {
    let fileData = new FileReader();
    // fileData.onloadstart = () => {
    //     return;
    // };
    fileData.onloadend = handleFile;
    fileData.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center">
        <i class="fas fa-th fa-lg mr-2"></i>
        <span style={{ fontWeight: "500" }}>POST'S</span>
      </div>
      <hr className="mt-2" style={{ borderTop: "1px solid rgba(0,0,0,.1)" }} />
      {posts.length !== 0 ? (
        <div className="row mt-4">
          {posts.map((post) => (
            <React.Fragment>
              <div
                className="col-6 col-md-4 mb-3 d-none d-sm-block"
                style={{ height: "200px" }}
              >
                <div
                  className="w-100 h-100"
                  onClick={() => {
                    setShowModal(true);
                  }}
                  data-toggle="modal"
                  data-target={`#exampleModal${post._id}`}
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
              </div>

              <div
                className="col-6 col-md-4 mb-3 d-sm-none"
                style={{ height: "100px" }}
                onClick={() => {
                  setShowModal(true);
                }}
                data-toggle="modal"
                data-target={`#exampleModal${post._id}`}
              >
                <div
                  className="w-100 h-100"
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
              </div>

              <div
                class="modal fade bd-example-modal-lg "
                id={`exampleModal${post._id}`}
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
                    style={{
                      border: "none",
                      borderRadius: "0",
                    }}
                  >
                    <div className="modal-body py-0">
                      <ProfilePostModal
                        className=""
                        myOwnPage={myOwnPage}
                        post={post}
                        profile={profile}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        updateAssets={updateAssets}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : myOwnPage ? (
        <div className="mx-auto text-center mt-4 mb-5">
          <i class="fas fa-camera-retro fa-4x ml-2 mr-3  mb-2"></i>

          <h3 className="mb-3">Share Photos</h3>
          <h5 className="mb-5">Share photos with your friends & family !</h5>
          <label htmlFor="file1">
            <h6 className="text-primary" style={{ cursor: "pointer" }}>
              Share your first photo
            </h6>
          </label>
          <input
            id="file1"
            name="file"
            type="file"
            data-toggle="modal"
            data-target="#upload"
            accept="image/*"
            onClick={(event) => {
              reset();
              event.target.value = "";
            }}
            onChange={(event) => {
              setContent(event.target.value.files[0]);
              handleChangeFile(event.target.files[0]);
            }}
            style={{ display: "none" }}
          />
        </div>
      ) : null}
      {/* Modal */}

      <div
        class="modal fade bd-example-modal-lg "
        id="upload"
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
        <div
          class="modal-dialog modal-lg modal-dialog-centered "
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
            {content !== undefined ? (
              <div className="modal-body p-0">
                <UploadPicModal
                  src1={content}
                  handleNext={handleNext}
                  next={next}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* ModalClosed */}
    </div>
  );
}

export default UserPosts;
