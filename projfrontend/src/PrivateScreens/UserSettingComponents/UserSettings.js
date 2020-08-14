import React, { useEffect, useState } from "react";

import ChangePassword from "./ChangePassword";
import Navbar from "../../AuthScreens/Navbar";
import EditProfile from "./EditProfile";
import MakePrivate from "./MakePrivate";
import { getOwnUser } from "../UserFeedComponents/APICalls";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";

function UserSettings() {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  const [userDetails, setUserDetails] = useState({
    username: "",
    name: "",
    profilePicUrl: "",
    bio: "",
    isPrivate: false,
  });

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    await getOwnUser(userId, token)
      .then((res) => {
        const data = res.data;

        setUserDetails({
          username: data.username,
          name: data.name,
          profilePicUrl: data.profilePicUrl,
          bio: data.bio,
          isPrivate: data.isPrivate,
        });
      })
      .catch((err) => {
        console.log("Not able to own user details for profile screen");
        console.log("ERR:", { ...err }.response);
      });
  };
  return (
    <div>
      <Navbar />
      <div className="row mt-5"></div>
      <div className="row mt-2"></div>
      <div className="row align-items-center mx-0 mt-5">
        <div className="col-2"></div>
        <div
          class="col-md-3 col-12 d-none d-md-block "
          style={{
            minHeight: "70.12vh",
            borderRadius: "5px",
          }}
        >
          <div
            class="nav flex-column nav-pills py-4"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              class="nav-link active mb-3"
              id="v-pills-home-tab"
              data-toggle="pill"
              href="#v-pills-home"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="true"
            >
              Edit Profile
            </a>
            <a
              class="nav-link mb-3"
              id="v-pills-profile-tab"
              data-toggle="pill"
              href="#v-pills-profile"
              role="tab"
              aria-controls="v-pills-profile"
              aria-selected="false"
            >
              Change Password
            </a>
            <a
              class="nav-link mb-3"
              id="v-pills-messages-tab"
              data-toggle="pill"
              href="#v-pills-messages"
              role="tab"
              aria-controls="v-pills-messages"
              aria-selected="false"
            >
              Privacy & Security
            </a>
          </div>
        </div>

        <div
          class="col-12 d-md-none"
          style={{
            borderRadius: "5px",
            marginTop: "-10px",
          }}
        >
          <div
            class="nav nav-pills d-flex justify-content-center align-items-center"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              class="nav-link active mb-3"
              id="v-pills-home-tab"
              data-toggle="pill"
              href="#v-pills-home"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="true"
            >
              <i class="fas fa-user-edit fa-lg  mr-2 mt-2"></i>
            </a>
            <a
              class="nav-link mb-3"
              id="v-pills-profile-tab"
              data-toggle="pill"
              href="#v-pills-profile"
              role="tab"
              aria-controls="v-pills-profile"
              aria-selected="false"
            >
              <i class="fas fa-user-lock fa-lg  mr-2 mt-2"></i>
            </a>
            <a
              class="nav-link mb-3"
              id="v-pills-messages-tab"
              data-toggle="pill"
              href="#v-pills-messages"
              role="tab"
              aria-controls="v-pills-messages"
              aria-selected="false"
            >
              <i class="fas fa-user-shield fa-lg  mr-2 mt-2"></i>
            </a>
          </div>
        </div>

        <div
          class="col-md-5 col-12 "
          style={{
            borderRadius: "5px",
            background:
              "linear-gradient( 135deg,#0099ff 0%, transparent 10%, transparent 75%, #0099ff 95% )",
          }}
        >
          <div className="tab-content" id="v-pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <EditProfile
                username={userDetails.username}
                name={userDetails.name}
                bio={userDetails.bio}
                profilePicUrl={userDetails.profilePicUrl}
              />
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <ChangePassword />
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-messages"
              role="tabpanel"
              aria-labelledby="v-pills-messages-tab"
            >
              <MakePrivate isPrivateAccount={userDetails.isPrivate} />
            </div>

            <h6
              class="text-right"
              style={{
                color: "black",
                fontWeight: "600",
              }}
            >
              Don't Share Your Password !
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
