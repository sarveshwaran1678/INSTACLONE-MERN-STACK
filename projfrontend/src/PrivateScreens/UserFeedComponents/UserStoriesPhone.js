import React from "react";
import post from "../../Images/mayank.jpg";

function UserStoriesPhone() {
  return (
    <div>
      <img
        src={post}
        style={{ borderRadius: "50%" }}
        height={60}
        className="m-2"
      />
      <div>Naruto </div>
    </div>
  );
}

export default UserStoriesPhone;
