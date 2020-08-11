import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Image, Transformation, Placeholder } from "cloudinary-react";

//import post from "../../Images/mayank.jpg";
import UploadStoryModal from "./UploadStoryModal";

const CloudName = process.env.REACT_APP_CLOUDNAME;

export default function UserProfileStories({ myOwn, stories, updateAssets }) {
  const [story, setStory] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const LargeFile = () => (
    <div>
      <span
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          color: "#a2acba",
        }}
      >
        File Size Should Be Less Than 5Mb!
      </span>
      <i className="fas fa-times ml-3 text-success"></i>
    </div>
  );
  const reset = () => {
    setStory(undefined);
  };
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(story);
  //   };
  const handleFile = (e) => {
    setStory(e.target.result);
  };
  const handleChangeFile = (file) => {
    if (file.size > 5000000) {
      toast(<LargeFile />);
    } else {
      let fileData = new FileReader();
      fileData.onloadend = handleFile;
      fileData.readAsDataURL(file);
    }
  };
  const StoryModal = ({ picPath }) => {
    return (
      <div>
        <Image
          className="m-1 d-block w-100 "
          cloudName={CloudName}
          loading="lazy"
          publicId={picPath}
        >
          <Transformation
            gravity="auto"
            crop="fill"
            quality="auto"
            flags={["preserve_transparency"]}
          />
          <Placeholder type="pixelate" />
        </Image>
      </div>
    );
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div
        className="container d-flex flex-row bd-highlight  justify-content-start align-items-center"
        style={{
          scrollBehavior: "smooth",
          overflowX: "scroll",
          whiteSpace: "nowrap",
        }}
      >
        {myOwn ? (
          <React.Fragment>
            <div className="justify-content-center align-items-center">
              <label htmlFor="file">
                <div
                  className="d-flex text-center align-items-center justify-content-center align-middle mr-3 mt-3"
                  style={{
                    borderRadius: "50% ",
                    height: "70px",
                    width: "70px",
                    background: "#DAE0E2",
                  }}
                >
                  <i class="fas fa-plus fa-lg" style={{ color: "#45CE30" }}></i>
                </div>
              </label>
              <input
                id="file"
                name="file"
                type="file"
                data-toggle="modal"
                data-target="#uploadStory"
                accept="image/*"
                onClick={(event) => {
                  reset();
                  event.target.value = "";
                }}
                onChange={(event) => {
                  handleChangeFile(event.target.files[0]);
                }}
                style={{ display: "none" }}
              />
            </div>

            <div
              class="modal fade bd-example-modal-lg "
              id="uploadStory"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                }}
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
                  {story !== undefined ? (
                    <div class="modal-body p-0">
                      <UploadStoryModal
                        src={story}
                        updateAssets={updateAssets}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : null}

        {stories.map((story) => (
          <React.Fragment>
            <div
              className="justify-content-center align-items-center"
              data-toggle="modal"
              data-target={`#userStory${story._id}`}
              onClick={() => setShowModal(true)}
            >
              <figure className="text-center">
                <Image
                  className="profile mt-3 mx-3 "
                  cloudName={CloudName}
                  loading="lazy"
                  publicId={story.picturePath}
                >
                  <Transformation
                    width="75"
                    height="75"
                    radius="max"
                    gravity="auto"
                    crop="fill"
                    quality="auto"
                    flags={["preserve_transparency"]}
                  />
                  <Placeholder type="pixelate" />
                </Image>
              </figure>
            </div>

            <div
              class="modal fade bd-example-modal-lg"
              id={`userStory${story._id}`}
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
                    background: "transparent",
                    border: "none",
                    borderRadius: "0",
                  }}
                >
                  <div class="modal-body p-0 w-100">
                    <div
                      class=""
                      data-dismiss="modal"
                      onClick={() => setShowModal(false)}
                    >
                      {showModal ? (
                        <StoryModal picPath={story.picturePath} />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
}
