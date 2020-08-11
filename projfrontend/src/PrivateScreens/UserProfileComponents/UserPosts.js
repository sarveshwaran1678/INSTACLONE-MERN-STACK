import React from "react";
//import post from "../../Images/mayank.jpg";

import { Image, Transformation, Placeholder } from "cloudinary-react";

import "../../userfeed.css";
import Modal from "../UserFeedComponents/Modal";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserPosts({ posts }) {
  return (
    <div className="container mx-auto">
      <div className="text-center">
        <i class="fas fa-th fa-lg mr-2"></i>
        <span style={{ fontWeight: "500" }}>POST'S</span>
      </div>

      <div className="row mt-4">
        {posts.map((post) => (
          <React.Fragment>
            <div className="col-4 mb-3">
              <Image
                className="m-2"
                cloudName={CloudName}
                loading="lazy"
                publicId={post.picturePath}
                style={
                  `${post.filter}` === "sepia"
                    ? { filter: "sepia(1)" }
                    : `${post.filter}` === "grayscale"
                    ? { filter: "grayscale(1)" }
                    : `${post.filter}` === "saturate"
                    ? { filter: "saturate(2)" }
                    : `${post.filter}` === "blue"
                    ? { filter: "contrast(0.7) saturate(1.5)" }
                    : `${post.filter}` === "x"
                    ? { filter: "saturate(1.6) hue-rotate(15deg)" }
                    : `${post.filter}` === "y"
                    ? { filter: "hue-rotate(-20deg)" }
                    : {}
                }
                data-toggle="modal"
                data-target={`#exampleModal${post._id}`}
              >
                <Transformation
                  width="100"
                  height="100"
                  gravity="auto"
                  crop="fill"
                  quality="auto"
                  flags={["preserve_transparency"]}
                />
                <Placeholder type="pixelate" />
              </Image>
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
                class="modal-dialog modal-lg"
                role="document"
                style={{
                  width: "100%",
                  maxWidth: "800px",
                }}
              >
                <div class="modal-content ">
                  <div class="modal-body ">
                    <Modal className="" />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default UserPosts;
