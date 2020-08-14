import React, { useState, useEffect } from "react";
import { Image, Transformation, Placeholder } from "cloudinary-react";
import { getAnotherUserDetails } from "./APICalls";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import { Link } from "react-router-dom";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserSuggestions({ id }) {
  const [userDetails, setUserDetails] = useState({
    username: "",
    profilePicPath: "",
  });

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const anotherUserId = id;
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    await getAnotherUserDetails(anotherUserId, userId, token)
      .then((res) => {
        setUserDetails({
          username: res.data.username,
          profilePicPath: res.data.profilePicPath,
        });
      })
      .catch((err) => {
        console.log("Not able to get details for suggestions");
        console.log("ERR:", { ...err }.response);
      });
  };

  return (
    <React.Fragment>
      <div
        className="row ml-0 mt-1 "
        style={{ overflowY: "visible", fontWeight: "500" }}
      >
        <div className="col-3 text-right" style={{ paddingRight: "0" }}>
          <Image
            className="m-1"
            cloudName={CloudName}
            loading="lazy"
            publicId={userDetails.profilePicPath}
          >
            <Transformation
              radius="max"
              height="55"
              width="55"
              gravity="auto"
              crop="fill"
              quality="auto"
              background="white"
              flags={["preserve_transparency"]}
            />
            <Placeholder type="pixelate" />
          </Image>
        </div>
        <div
          className="col-7 text-left mt-3 ml-1"
          style={{ paddingRight: "0" }}
        >
          <Link className="text-dark" to={`/profile/${id}`}>
            <span>{userDetails.username}</span>
          </Link>
          <br />
          {/*<div className='d-flex justify-content-between'>
                        <div> 21 followers</div>
                        <div className='text-primary'>Follow</div>
    </div>*/}
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserSuggestions;
