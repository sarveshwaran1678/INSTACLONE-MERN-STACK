import React from "react";
import { Link } from "react-router-dom";

import { signout } from "./APICalls/signCalls";

function Navbar() {
  return (
    <div style={{ borderBottom: "1px solid black", borderRadius: "5px" }}>
      <div class="container " style={{ paddingRight: "0" }}>
        <nav class="navbar navbar-expand-lg ">
          <span class="navbar-brand" href="#">
            <Link to="/userfeed">
              <i class="fab fa-instagram fa-lg mr-2 d-none d-md-inline text-dark">
                {" "}
              </i>
            </Link>
            <Link to="/profile">
              <i class="far fas fa-user-astronaut fa-lg  mr-2 d-md-none text-dark"></i>
            </Link>
            <Link to="/userfeed">
              <span
                style={{ fontWeight: "500" }}
                class="d-none d-md-inline-block d-lg-inline-block text-dark"
              >
                InstaClone
              </span>
            </Link>
          </span>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active ">
              <form class="form-inline  my-lg-0">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{
                    border: "1px solid black",
                    borderRadius: "5px",
                    width: "200px",
                  }}
                />
              </form>
            </li>
          </ul>
          <span>
            <i class="far fa-bell fa-lg ml-2 mr-3"></i>
            <Link to="/signin">
              <i
                class="far fas fa-sign-out-alt fa-lg d-md-none mr-1"
                onClick={() =>
                  signout(() => {
                    console.log("Signed out Successfully");
                  })
                }
              ></i>
            </Link>
            <span class="dropleft d-none d-md-inline mt-5">
              <span
                class=" dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-user-astronaut fa-lg"></i>
              </span>
              <div
                class="dropdown-menu  mt-3"
                aria-labelledby="dropdownMenuButton"
              >
                <Link to="/profile">
                  <a
                    class="dropdown-item text-dark"
                    href="#"
                    style={{
                      fontWeight: "500",
                      letterSpacing: "0.75px",
                    }}
                  >
                    <i class="fas fa-user-circle mr-2 text-dark"></i>
                    Profile
                  </a>
                </Link>
                <a
                  class="dropdown-item"
                  href="#"
                  style={{
                    fontWeight: "500",
                    letterSpacing: "0.75px",
                  }}
                >
                  <i class="fas fa-cog mr-2"></i>Setting
                </a>
                <hr style={{ margin: "0" }} />
                <a
                  class="dropdown-item"
                  href="/signin"
                  onClick={() =>
                    signout(() => {
                      console.log("Signed out Successfully");
                    })
                  }
                  style={{
                    fontWeight: "500",
                    letterSpacing: "0.75px",
                  }}
                >
                  <i class="fas fa-sign-out-alt  mr-2" />
                  Log Out
                </a>
              </div>
            </span>
          </span>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
