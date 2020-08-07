import React, { useEffect, useState } from "react";
import { Image, Transformation, Placeholder } from "cloudinary-react";

import { getAnotherUserDetails } from "./APICalls";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserStoriesPhone({ story, index }) {
  const [userName, setUserName] = useState("");
  const [picPath, setPicPath] = useState(story.picturePath);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const anotherUserId = story.UserId;
    const id = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    await getAnotherUserDetails(anotherUserId, id, token)
      .then((res) => {
        setUserName(res.data.username);
      })
      .catch(() => {
        console.log("Not able to get Username for stories");
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
      <div className="d-md-none d-lg-none justify-content-center align-items-center">
        <div
          data-toggle="modal"
          data-target={`#exampleModalPhone${index}`}
          onClick={() => setShowModal(true)}
        >
          <figure className="text-center">
            <Image
              className="m-2"
              cloudName={CloudName}
              loading="lazy"
              publicId={picPath}
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
            <figcaption>{userName}</figcaption>
          </figure>
        </div>
      </div>
      <div
        class="modal fade bd-example-modal-lg"
        id={`exampleModalPhone${index}`}
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
                class=" d-md-none"
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

export default UserStoriesPhone;

// <div className='justify-content-center align-items-center'>
//   <figure className='text-center'>
//     <img
//       className='profile mt-3 mr-3'
//       src={post}
//       style={{
//         borderRadius: '50% ',
//         height: '70px',
//         width: '70px',
//       }}
//     />
//   </figure>
// </div>
