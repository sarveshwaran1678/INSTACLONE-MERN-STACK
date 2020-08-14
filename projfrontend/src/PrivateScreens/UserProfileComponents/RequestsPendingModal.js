import React, { useState, useEffect } from "react";
import post from "../../Images/mayank.jpg";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";
import { toggleFollowRequest } from "./APICalls";
import {
  getOwnUser,
  getAnotherUserDetails,
} from "../UserFeedComponents/APICalls";

const CloudName = process.env.REACT_APP_CLOUDNAME;

function RequestsPendingModal() {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  //let pendingRequest = isAuthenticated().user.followRequestPending;

  const [showData, setShowData] = useState(false);
  const [userDetails, setUserDetails] = useState([]);

  //const [status, setStatus] = useState('');

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    await getOwnUser(userId, token)
      .then((res) => {
        const data = res.data;
        console.log("Data", data.followRequestPending);
        //setPendingRequest(data.followRequestPending);

        data.followRequestPending.map(async (anotherUserId) => {
          console.log("userDetails before", userDetails);

          await getAnotherUserDetails(anotherUserId, userId, token)
            .then((res) => {
              const data = res.data;
              userDetails.push({
                id: data._id,
                username: data.username,
                profilePicPath: data.profilePicPath,
              });
              setUserDetails(userDetails);
            })
            .catch((err) => {
              console.log("Not able to other user details for pending request");
              console.log("ERR:", { ...err }.response);
            });
          console.log("userDetails after", userDetails);
        });
      })
      .catch((err) => {
        console.log("Not able to get followPendingRequest ");
        console.log("ERR:", { ...err }.response);
      });
    await setShowData(true);
  };

  const updateRequest = async (anotherUserId, status) => {
    await toggleFollowRequest(userId, anotherUserId, token, status)
      .then((res) => {})
      .catch((err) => {
        console.log("Not able to update pending request");
        console.log("ERR:", { ...err }.response.data);
      });
  };

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
        <div className="d-flex flex-row bd-highlight justify-content-between align-items-center mx-3 my-1">
          {console.log(userDetails)}
          {showData ? (
            <React.Fragment>
              {userDetails.map((user) => (
                <React.Fragment>
                  <div>
                    <img
                      src={post}
                      height={50}
                      width={50}
                      style={{
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      data-dismiss="modal"
                    />
                    <span
                      className="ml-2 "
                      style={{ fontWeight: "500", cursor: "pointer" }}
                      data-dismiss="modal"
                    >
                      {user.username}
                    </span>
                  </div>
                  <div>
                    <i
                      class="fas fa-check fa-lg text-success mr-3"
                      data-dismiss="modal"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        console.log("tikked");
                      }}
                    />

                    <i
                      class="fas fa-times fa-lg text-danger "
                      data-dismiss="modal"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        console.log("crossed");
                      }}
                    />
                  </div>
                </React.Fragment>
              ))}
            </React.Fragment>
          ) : (
            <div>No pending Request</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestsPendingModal;
