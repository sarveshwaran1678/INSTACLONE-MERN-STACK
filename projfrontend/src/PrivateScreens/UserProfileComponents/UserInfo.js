import React from "react";

function UserInfo({ myOwn }) {
  return (
    <div>
      <div class="d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center">
        <div class=" bd-highlight mr-5" style={{ fontWeight: "700" }}>
          Rajender Singh
        </div>
        {myOwn ? null : (
          <button type="button" class="btn btn-primary px-5">
            Follow
          </button>
        )}
      </div>
      <div class="d-flex flex-row bd-highlight mb-3 justify-content-between align-items-center">
        <div class=" bd-highlight" style={{ fontWeight: "500" }}>
          1,250 posts
        </div>
        <div class=" bd-highlight" style={{ fontWeight: "500" }}>
          1000 followers
        </div>
        <div class=" bd-highlight" style={{ fontWeight: "500" }}>
          210 following
        </div>
      </div>

      <p style={{ fontWeight: "500" }}>
        Rajender Web Developer & Competetive Coder
      </p>
      {myOwn ? (
        <div class="d-flex flex-row bd-highlight mb-3 justify-content-around align-items-center">
          <div class=" bd-highlight" style={{ fontWeight: "500" }}>
            210 followRequestSent
          </div>
          <div class=" bd-highlight" style={{ fontWeight: "500" }}>
            210 followRequest Pending
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserInfo;
