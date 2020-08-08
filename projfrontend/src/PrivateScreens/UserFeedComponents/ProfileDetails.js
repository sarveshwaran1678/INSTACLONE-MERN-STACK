import React, { useEffect, useState } from "react";
//import post from "../../Images/sarvesh.jpg";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import { getOwnUser } from "./APICalls";
import {
  Image,
  Transformation,
  CloudinaryContext,
  Placeholder,
} from "cloudinary-react";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function ProfileDetails() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    name: "",
    profilePicPath: "",
  });

  const getDetails = async () => {
    const id = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    //console.log("ID", id);

    await getOwnUser(id, token)
      .then((res) => {
        //console.log(res);
        const data = res.data;

        setUserDetails({
          ...userDetails,
          username: data.username,
          name: data.name,
          profilePicPath: data.profilePicPath,
        });
      })
      .catch((err) => {
        console.log("ERR:", { ...err }.response);
      });
  };

  useEffect(() => {
    //console.log("CloudName", CloudName);
    getDetails();
  }, []);

  return (
    <div
      className="row ml-2 mb-2 "
      style={{ overflowY: "visible", fontWeight: "500" }}
    >
      <div className="col-3 text-right" style={{ paddingRight: "0" }}>
        <Image
          cloudName={CloudName}
          loading="lazy"
          publicId={userDetails.profilePicPath}
        >
          <Transformation
            height="75"
            width="75"
            gravity="face"
            crop="fill"
            radius="max"
          />
          <Placeholder type="pixelate" />
        </Image>
        {/*  <img src={post} style={{ borderRadius: "50%" }} height={50} />*/}
      </div>
      <div className="col-7 text-left mt-2">
        <span>{userDetails.username}</span>
        <br />
        <span>{userDetails.name}</span>
      </div>
    </div>
  );
}

export default ProfileDetails;
