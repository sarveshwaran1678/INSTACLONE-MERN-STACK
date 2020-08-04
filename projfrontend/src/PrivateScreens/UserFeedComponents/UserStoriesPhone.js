import React from "react";
import post from "../../Images/mayank.jpg";

function UserStoriesPhone() {
  return (
    <div
      className="container d-sm-block d-md-none d-lg-none"
      style={{
        display: "flex",
        scrollBehavior: "smooth",
        overflowX: "scroll",
        whiteSpace: "nowrap",
      }}
    >
      <img
        src={post}
        style={{ borderRadius: "50%" }}
        height={60}
        className="m-3"
      />{" "}
      <img
        src={post}
        style={{ borderRadius: "50%" }}
        height={60}
        className="m-3"
      />{" "}
      <img
        src={post}
        style={{ borderRadius: "50%" }}
        height={60}
        className="m-3"
      />{" "}
      <img
        src={post}
        style={{ borderRadius: "50%" }}
        height={60}
        className="m-3"
      />{" "}
      <img
        src={post}
        style={{ borderRadius: "50%" }}
        height={60}
        className="m-3"
      />{" "}
    </div>
  );
}

export default UserStoriesPhone;
