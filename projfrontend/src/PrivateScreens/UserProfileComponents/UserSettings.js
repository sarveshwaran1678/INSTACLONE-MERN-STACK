import React from "react";

import ChangePassword from "./ChangePassword";
import Navbar from "../../AuthScreens/Navbar";
import EditProfile from "./EditProfile";
import MakePrivate from "./MakePrivate";

function UserSettings() {
  return (
    <div>
      <Navbar />

      <div class="row align-items-center mx-0 mt-5">
        <div class="col-2"></div>
        <div
          class="col-md-3 col-12 d-none d-md-block "
          style={{
            border: "1px solid grey",
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
            <a
              class="nav-link mb-3"
              id="v-pills-settings-tab"
              data-toggle="pill"
              href="#v-pills-settings"
              role="tab"
              aria-controls="v-pills-settings"
              aria-selected="false"
            >
              Settings
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
            border: "1px solid grey",
            borderRadius: "5px",
            background:
              "linear-gradient( 135deg, transparent 0%, transparent 75%, #0099ff 95% )",
          }}
        >
          <div class="tab-content" id="v-pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <EditProfile />
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
              <MakePrivate />
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
