import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UploadPicModal from "./UploadPicModal";
import { isAuthenticated } from "./APICalls/signCalls";

function MobileNavbar() {
  const id = isAuthenticated().user._id;

  const [content, setContent] = useState(undefined);
  const [next, setNext] = useState(false);
  const ShowUpload = () => (
    <div>
      <i className="fas fa-times fa-lg ml-3 mr-3 text-danger"></i>
      <span
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          color: "#a2acba",
        }}
      >
        Uploaded Successfully
      </span>
    </div>
  );
  const handleNext = () => {
    setNext(!next);
  };
  const reset = () => {
    setContent(undefined);
    setNext(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    toast(<ShowUpload />);
  };
  const handleFile = (e) => {
    setContent(e.target.result);
  };
  const handleChangeFile = (file) => {
    if (file.name.match(/\.(jpg|jpeg|png)$/)) {
      let fileData = new FileReader();
      fileData.onloadend = handleFile;
      fileData.readAsDataURL(file);
    } else {
      console.log("wrong file");
    }
  };

  return (
    <div class="fixed-bottom d-md-none ">
      <ToastContainer className="d-none d-md-block" />
      <div
        class="d-flex justify-content-around fixed-bottom d-md-none p-3 mb-0"
        style={{ background: "white" }}
      >
        <div>
          <Link
            to="/userfeed"
            style={{ color: "black", textDecoration: "none" }}
          >
            <i class="fas fa-home fa-lg" style={{ color: "#262626" }}></i>
          </Link>
        </div>
        <div>
          <i class="fab fa-sistrix fa-lg" style={{ color: "#262626" }}></i>
        </div>
        <div>
          <label htmlFor="file1">
            <i
              class="fas fa-plus-circle fa-lg"
              style={{ color: "#262626" }}
            ></i>
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

        <div>
          <i class="far fa-heart fa-lg" style={{ color: "#262626" }}></i>
        </div>

        <div>
          <Link to={`/profile/${id}`} style={{ color: "black" }}>
            <i
              class="far fa-user-circle fa-lg"
              style={{ color: "#262626" }}
            ></i>
          </Link>
        </div>
      </div>
      <div
        class="modal fade bd-example-modal-lg "
        id="upload"
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
            <div class="modal-body p-0">
              {content != undefined ? (
                <UploadPicModal
                  src1={content}
                  handleSubmit={handleSubmit}
                  handleNext={handleNext}
                  next={next}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
