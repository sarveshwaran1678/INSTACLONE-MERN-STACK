import React, { useState } from "react";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import { postStory } from "./APICalls";

function UploadStoryModal({ src }) {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  const [filter, setFilter] = useState("original");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("picturePath", src);
    formData.append("filter", filter);

    await postStory(userId, token, formData)
      .then((res) => {
        console.log(res.data);
        console.log("Succesfully uploaded story");
      })
      .catch((err) => {
        console.log("Not able to post story");
        console.log("ERR:", { ...err }.response);
      });
  };

  return (
    <div>
      <div>
        <div class="d-flex justify-content-between m-3 text-left">
          <div class="text-right">
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
        <div class="d-flex justify-content-around my-3 ">
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
    </div>
  );
}

export default UploadStoryModal;
