import React, { useEffect, useState } from "react";
import { Image, Transformation, Placeholder } from "cloudinary-react";

import { getAnotherUserDetails } from "./APICalls";
import StoryModalPhone from "./StoryModalPhone";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserStoriesPhone({ story }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const anotherUserId = story.UserId;
    await getAnotherUserDetails(anotherUserId)
      .then((res) => {
        setUserName(res.data.username);
      })
      .catch(() => {
        console.log("Not able to get Username for stories");
      });
  };

  return (
    <div className="d-md-none d-lg-none">
      <div data-toggle="modal" data-target="#exampleModal2">
        <Image
          className="m-2"
          cloudName={CloudName}
          loading="lazy"
          publicId={story.picturePath}
        >
          <Transformation
            height="65"
            width="65"
            gravity="face"
            crop="fill"
            radius="max"
          />
          <Placeholder type="pixelate" />
        </Image>
        <div>{userName}</div>
      </div>
      <div
        class="modal fade bd-example-modal-lg "
        id="exampleModal2"
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
              <StoryModalPhone />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStoriesPhone;
