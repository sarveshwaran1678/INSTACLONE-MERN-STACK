import React, { useEffect, useState } from "react";
//import post from "../../Images/mayank.jpg";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import { Image, Transformation, Placeholder } from "cloudinary-react";
import { Link } from "react-router-dom";
import { getAnotherUserDetails } from "../UserFeedComponents/APICalls";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function FollowTableModal({ followings, heading }) {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    //console.log("followings", followings);
    followings.map((anotherUserId) => {
      getAnotherUser(anotherUserId);
    });
  }, []);

  const getAnotherUser = async (anotherUserId) => {
    await getAnotherUserDetails(anotherUserId, userId, token)
      .then((res) => {
        const data = res.data;

        setUserDetails([
          ...userDetails,
          {
            id: data._id,
            username: data.username,
            profilePicPath: data.profilePicPath,
          },
        ]);
      })
      .catch((err) => {
        console.log("Not able to other user details for follow modal");
        console.log("ERR:", { ...err }.response);
      });
  };

  return (
    <div classname="container">
      <div className="d-flex flex-row bd-highlight mb-3 justify-content-between align-items-center m-2">
        <div>
          <span style={{ fontWeight: "700" }}>{heading}</span>
        </div>
        <div>
          <i
            class="fas fa-times fa-lg"
            data-dismiss="modal"
            style={{ color: "black" }}
          />
        </div>
      </div>
      <hr />
      <div
        style={{
          minHeight: "300px",
          maxHeight: "300px",
          overflowY: "scroll",
        }}
      >
        {userDetails.map((user) => (
          <div className="d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center mx-auto">
            <Link
              to={`/profile/${user.id}`}
              target="_blank"
              className="text-dark"
            >
              <Image
                className="profile align-items-center"
                cloudName={CloudName}
                loading="lazy"
                publicId={user.profilePicPath}
              >
                <Transformation
                  width="50"
                  height="50"
                  radius="max"
                  gravity="auto"
                  crop="fill"
                  quality="auto"
                  flags={["preserve_transparency"]}
                />
                <Placeholder type="pixelate" />
              </Image>

              <span
                className="mx-3 "
                style={{ fontWeight: "500", cursor: "pointer" }}
              >
                {user.username}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FollowTableModal;
