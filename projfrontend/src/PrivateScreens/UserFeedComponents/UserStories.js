import React, { useEffect, useState } from "react";
import { Image, Transformation, Placeholder } from "cloudinary-react";

import { getAnotherUserDetails } from "./APICalls";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserStories({ story, index }) {
  const [userName, setUserName] = useState("");
  const [timeBefore, setTimeBefore] = useState("");
  const [picPath, setPicPath] = useState(story.picturePath);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getDetails();
    getTimeDiff();
  }, []);

  const getTimeDiff = () => {
    var milliseconds = new Date() - new Date(story.createdAt);

    var hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;

    setTimeBefore(hour < 1 ? `${minute} minutes ago` : `${hour} hours ago`);
  };

  const getDetails = async () => {
    const anotherUserId = story.UserId;
    const id = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    await getAnotherUserDetails(anotherUserId, id, token)
      .then((res) => {
        setUserName(res.data.username);
      })
      .catch((err) => {
        console.log("Not able to get Username for stories");
        console.log("ERR:", { ...err }.response);
      });
  };

  const StoryModal = ({ picPath }) => {
    return (
      <Image
        className="m-1 d-block w-100"
        cloudName={CloudName}
        loading="lazy"
        publicId={picPath}
      >
        <Transformation gravity="face" crop="fill" />
        <Placeholder type="pixelate" />
      </Image>
    );
  };

  return (
    <React.Fragment>
      <div
        className="row ml-0 mt-2 "
        data-toggle="modal"
        data-target={`#exampleModal${index}`}
        style={{ overflowY: "visible", fontWeight: "500" }}
        onClick={() => setShowModal(true)}
      >
        <div className="col-3 text-right" style={{ paddingRight: "0" }}>
          <Image
            className="m-1"
            cloudName={CloudName}
            loading="lazy"
            publicId={picPath}
          >
            <Transformation
              height="70"
              width="70"
              gravity="face"
              crop="fill"
              radius="max"
            />
            <Placeholder type="pixelate" />
          </Image>
        </div>
        <div className="col-7 text-left mt-3 ml-2">
          <span>{userName}</span>
          <br />
          <span>{timeBefore}</span>
        </div>
      </div>
      <div
        class="modal fade bd-example-modal-lg"
        id={`exampleModal${index}`}
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
              <div
                class="d-none d-md-block"
                data-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                {showModal ? <StoryModal picPath={picPath} /> : null}
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserStories;
