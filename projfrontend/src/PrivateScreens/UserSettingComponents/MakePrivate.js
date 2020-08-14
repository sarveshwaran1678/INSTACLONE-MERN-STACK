import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import { toggleIsPrivate } from "./APICalls";

import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import { getOwnUser } from "../UserFeedComponents/APICalls";

function MakePrivate() {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  const [isPrivate, setIsPrivate] = useState();
  const toastId = React.useRef(null);
  const dismiss = () => toast.dismiss(toastId.current);

  const [errMsg, setErrMsg] = useState("");

  const [phase, setPhase] = useState();
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    await getOwnUser(userId, token)
      .then((res) => {
        const data = res.data;

        setIsPrivate(data.isPrivate);
      })
      .catch((err) => {
        console.log("Not able to own user details for profile screen");
        console.log("ERR:", { ...err }.response);
      });
  };

  const Uploading = () => (
    <div>
      <span
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          color: "#a2acba",
        }}
      >
        Updating
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
        Updated Successfully
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
        {errMsg.length !== 0 ? errMsg : "Updation Failed"}
      </span>
      <i className="fas fa-times  fa-lg  ml-3 text-success"></i>
    </div>
  );

  const handleIsPrivate = async () => {
    //console.log(isPrivateAccount);
    setPhase(0);
    await toggleIsPrivate(userId, token)
      .then(async (res) => {
        //console.log(res.data);
        await setIsPrivate(res.data);
        setPhase(1);
      })
      .catch((err) => {
        console.log("Error in changing isPrivate");
        setPhase(2);
        setErrMsg({ ...err }.response.data.error);
      });
    setPhase();
  };

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

  return (
    <div style={{ minHeight: "66vh" }} className="text-center">
      <ToastContainer />
      {Notify()}
      <h4 style={{ fontWeight: "700", paddingTop: "3.5vh" }}>
        Manage Your Profile
      </h4>
      <div className="text-left">
        <i
          class={
            !isPrivate
              ? "far fa-circle fa-lg text-danger mr-2 mt-2"
              : "far fa-dot-circle fa-lg text-success mr-2 mt-2"
          }
          onClick={() => handleIsPrivate()}
        ></i>
        <span style={{ fontWeight: "600", letterSpacing: "0.5px" }}>
          {isPrivate ? "Make Your Account Public" : "Make Your Account Private"}
        </span>

        <p
          style={{ fontWeight: "600", letterSpacing: "0.5px" }}
          className="my-3"
        >
          When your account is private, only people you approve can see your
          photos and videos on Instagram. Your existing followers won't be
          affected.
        </p>
      </div>
      <div className="d-none d-md-block fixed-bottom text-center mb-1">
        <h6 style={{ color: "#2C3335" }}>
          <i class="far fa-copyright"></i> 2020 InstaClone Inspired By :
          <span
            style={{
              color: "purple",
            }}
          >
            Instagram
          </span>
        </h6>
      </div>
    </div>
  );
}

export default MakePrivate;
