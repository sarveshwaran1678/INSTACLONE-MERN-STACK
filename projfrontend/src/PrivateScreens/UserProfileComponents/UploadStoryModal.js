import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import { postStory } from "./APICalls";

function UploadStoryModal({ src, updateAssets }) {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  const [phase, setPhase] = useState();
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
    formData.append("picturePath", src);
    formData.append("filter", filter);

    setPhase(0);
    await postStory(userId, token, formData)
      .then((res) => {
        setPhase(1);

        // console.log(res.data);
        // console.log('Succesfully uploaded story');
      })
      .catch((err) => {
        setPhase(2);

        console.log("Not able to post story");
        console.log("ERR:", { ...err }.response);
      });
    setPhase();
    updateAssets();
  };

  return (
    <div>
      <ToastContainer limit={1} />
      {Notify()}

      <div className="d-flex justify-content-between m-3 text-left">
        <div className="text-right">
          <i
            class="fas fa-times fa-lg mr-2 d-md-inline text-dark"
            data-dismiss="modal"
            style={{ cursor: "pointer" }}
          ></i>
        </div>
        <div style={{ fontWeight: 500 }}>New Story</div>

        <div
          className="text-primary"
          style={{ fontWeight: 500, cursor: "pointer" }}
          onClick={(e) => handleSubmit(e)}
          data-dismiss="modal"
        >
          Post
        </div>
      </div>

      <img
        src={src}
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
            src={src}
            className="w-100"
            style={{ filter: "sepia(1)" }}
            onClick={() => setFilter("sepia")}
          />
        </div>
        <div className="mr-2">
          <img
            src={src}
            className="w-100"
            style={{ filter: "grayscale(1)" }}
            onClick={() => setFilter("grayscale")}
          />
        </div>
        <div className="mr-2">
          <img
            src={src}
            className="w-100"
            style={{ filter: "saturate(2)" }}
            onClick={() => setFilter("saturate")}
          />
        </div>
        <div className="mr-2">
          <img
            src={src}
            className="w-100"
            style={{
              filter: "contrast(0.7) saturate(1.5)",
            }}
            onClick={() => setFilter("blue")}
          />
        </div>
        <div className="mr-2">
          <img
            src={src}
            className="w-100"
            style={{
              filter: "saturate(1.6) hue-rotate(15deg)",
            }}
            onClick={() => setFilter("x")}
          />
        </div>
        <div className="mr-2">
          <img
            src={src}
            className="w-100"
            style={{ filter: "hue-rotate(-20deg)" }}
            onClick={() => setFilter("y")}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadStoryModal;
