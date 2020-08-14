import React, { useState, useEffect } from "react";
import post from "../../Images/mayank.jpg";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import { toggleFollowRequest } from "./APICalls";
import { getOwnUser } from "../UserFeedComponents/APICalls";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function RequestsPendingModal() {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  //let pendingRequest = isAuthenticated().user.followRequestPending;

  const [pendingRequest, setPendingRequest] = useState([]);
  const [userDetails, setUserDetails] = useState({})

  const [status, setStatus] = useState("");

  useEffect(async() => {
    await getUserDetails();
    await userDetails()
  }, []);

  const getUserDetails = async () => {
    await getOwnUser(userId, token)
      .then((res) => {
        const data = res.data;

        setPendingRequest(data.followRequestPending);
      })
      .catch((err) => {
        console.log("Not able to get followPendingRequest ");
        console.log("ERR:", { ...err }.response);
      });
  };

  const updateRequest = async (anotherUserId) => {
    await toggleFollowRequest(userId, anotherUserId, token, status)
      .then((res) => {})
      .catch((err) => {
        console.log("Not able to update pending request");
        console.log("ERR:", { ...err }.response.data);
      });
  };

   const getAnotherUser = async (anotherUserId) => {
    await getAnotherUserDetails(anotherUserId, userId, token)
      .then((res) => {
        const data = res.data;

        setUserDetails({
          id: data._id,
          username: data.username,
          profilePicPath: data.profilePicPath,
         
        });
      })
      .catch((err) => {
        console.log("Not able to other user details for pending request");
        console.log("ERR:", { ...err }.response);
      });

  return (
    <div classname="container">
      <div className="d-flex flex-row bd-highlight mb-3 justify-content-between align-items-center m-2">
        <div>
          <span style={{ fontWeight: "700" }}>Follow Request's</span>
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
      <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
        <div className="d-flex flex-row bd-highlight justify-content-between align-items-center m-3">
          <div>
            {pendingRequest.map((request)=>)}
            <img
              src={post}
              height={50}
              width={50}
              style={{ borderRadius: "50%", cursor: "pointer" }}
              data-dismiss="modal"
            />
            <span
              className="ml-2 "
              style={{ fontWeight: "500", cursor: "pointer" }}
              data-dismiss="modal"
            >
              Username
            </span>
          </div>
          <div>
            <i
              class="fas fa-check fa-lg text-success mr-3"
              data-dismiss="modal"
              style={{ cursor: "pointer" }}
            />

            <i
              class="fas fa-times fa-lg text-danger "
              data-dismiss="modal"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default RequestsPendingModal;
