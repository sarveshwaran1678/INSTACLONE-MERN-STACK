import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { uploadPost } from "../PrivateScreens/UserProfileComponents/APICalls";
import { isAuthenticated } from "./APICalls/signCalls";

function UploadPicModal({ src1, handleNext, next }) {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  const [phase, setPhase] = useState();
  const [caption, setCaption] = useState("");
  const [filter, setFilter] = useState("original");

  const toastId = React.useRef(null);
  const dismiss = () => toast.dismiss(toastId.current);
  const Uploading = () => (
    <div>
      <span
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          color: "#a2acba",
        }}
      >
        Uploading
      </span>
      <i className="fas fa-spinner fa-spin fa-lg  ml-3 text-success"></i>
    </div>
  );

  const Uploaded = () => (
    <div>
      <span
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
        }}
      >
        Uploaded Successfully
      </span>
      <i className="fas fa-check  fa-lg  ml-3 text-success"></i>
    </div>
  );

  const Failed = () => (
    <div>
      <span
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
        }}
      >
        Upload Failed
      </span>
      <i className="fas fa-check  fa-lg  ml-3 text-success"></i>
    </div>
  );

  const Notify = () => {
    if (phase === 0) {
      toast(<Uploading />, {
        autoClose: false,
      });
    } else if (phase === 1) {
      dismiss();
      toast(<Uploaded />);
    } else if (phase === 2) {
      dismiss();
      toast(<Failed />);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("picturePath", src1);
    formData.append("filter", filter);
    formData.append("caption", caption);

    setPhase(0);
    await uploadPost(userId, token, formData)
      .then((res) => {
        setPhase(1);

        // console.log(res.data);
        // console.log("Succesfully uploaded post");
      })
      .catch((err) => {
        setPhase(2);

        console.log("Not able to upload post");
        console.log("ERR:", { ...err }.response);
      });
    setPhase();
  };

  //post call here
  return (
    <div>
      <ToastContainer limit={1} />
      {Notify()}
      {next === false ? (
        <div>
          <div className="d-flex justify-content-between m-3 text-left">
            <div className="text-right">
              <i
                class="fas fa-times fa-lg mr-2 d-md-inline text-dark"
                data-dismiss="modal"
                style={{ cursor: "pointer" }}
              ></i>
            </div>
            <div style={{ fontWeight: 500 }}>New Post</div>

            <div
              className="text-primary"
              style={{ fontWeight: 500, cursor: "pointer" }}
              onClick={handleNext}
            >
              Next
            </div>
          </div>

          <img
            src={src1}
            className="w-100 "
            style={
              filter === "sepia"
                ? { filter: "sepia(1)" }
                : filter === "grayscale"
                ? { filter: "grayscale(1)" }
                : filter === "saturate"
                ? { filter: "saturate(2)" }
                : filter === "blue"
                ? { filter: "contrast(0.7) saturate(1.5)" }
                : filter === "x"
                ? { filter: "saturate(1.6) hue-rotate(15deg)" }
                : filter === "y"
                ? { filter: "hue-rotate(-20deg)" }
                : {}
            }
          />
          <div className="d-flex justify-content-around my-3 ">
            <div className="ml-2 mr-2">
              <img
                src={src1}
                className="w-100"
                style={{ filter: "sepia(1)" }}
                onClick={() => setFilter("sepia")}
              />
            </div>
            <div className="mr-2">
              <img
                src={src1}
                className="w-100"
                style={{ filter: "grayscale(1)" }}
                onClick={() => setFilter("grayscale")}
              />
            </div>
            <div className="mr-2">
              <img
                src={src1}
                className="w-100"
                style={{ filter: "saturate(2)" }}
                onClick={() => setFilter("saturate")}
              />
            </div>
            <div className="mr-2">
              <img
                src={src1}
                className="w-100"
                style={{
                  filter: "contrast(0.7) saturate(1.5)",
                }}
                onClick={() => setFilter("blue")}
              />
            </div>
            <div className="mr-2">
              <img
                src={src1}
                className="w-100"
                style={{
                  filter: "saturate(1.6) hue-rotate(15deg)",
                }}
                onClick={() => setFilter("x")}
              />
            </div>
            <div className="mr-2">
              <img
                src={src1}
                className="w-100"
                style={{ filter: "hue-rotate(-20deg)" }}
                onClick={() => setFilter("y")}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between m-3 text-left">
            <div>
              <i
                class="fas fa-angle-left fa-lg m-2 d-md-inline text-left"
                onClick={handleNext}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div style={{ fontWeight: 500 }}>New Post</div>

            <div
              className="text-primary"
              style={{ fontWeight: 500, cursor: "pointer" }}
              onClick={handleSubmit}
              data-dismiss="modal"
            >
              Post
            </div>
          </div>
          <hr className="m-0" />

          <img
            src={src1}
            className="w-100 "
            style={
              filter === "sepia"
                ? { filter: "sepia(1)" }
                : filter === "grayscale"
                ? { filter: "grayscale(1)" }
                : filter === "saturate"
                ? { filter: "saturate(2)" }
                : filter === "blue"
                ? { filter: "contrast(0.7) saturate(1.5)" }
                : filter === "x"
                ? {
                    filter: "saturate(1.6) hue-rotate(15deg)",
                  }
                : filter === "y"
                ? { filter: "hue-rotate(-20deg)" }
                : {}
            }
          />
          <div className="container">
            <input
              type="text"
              class="form-control my-2"
              placeholder="Add Caption......."
              value={caption}
              style={{ border: "1px solid grey" }}
              onChange={(e) => {
                e.preventDefault();
                setCaption(e.target.value);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadPicModal;
