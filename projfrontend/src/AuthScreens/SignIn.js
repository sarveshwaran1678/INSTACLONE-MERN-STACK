import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "../style.css";

import insta from "../Images/insta.gif";
import { signIn, authenticate } from "./APICalls/signCalls";

const SignIn = () => {
  const [mode, setMode] = useState("password");
  const [didRedirect, setDidRedirect] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const ShowError = () => (
    <div>
      <i className="fas fa-times fa-lg ml-3 mr-3 text-danger"></i>
      <span
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          color: "#a2acba",
        }}
      >
        {errMsg}
      </span>
    </div>
  );

  const Notify = () => {
    if (showToast === true) {
      toast(<ShowError />);
    }
  };
  const onSubmit = async (values, onSubmit) => {
    await signIn(values)
      .then((res) => {
        authenticate(res.data, () => {
          setDidRedirect(true);
        });
      })
      .catch((err) => {
        setErrMsg({ ...err }.response.data.msg);
        setShowToast(true);
      });

    onSubmit.resetForm();
    setShowToast(false);
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div className="row text-center">
      <ToastContainer />
      {Notify()}
      <div
        class="col-md-5 col-lg-6 d-none d-md-block d-lg-block text-lg-right"
        style={{
          marginTop: "7.5vh",
          zIndex: "-10",
        }}
      >
        <img src={insta} height={600} />
      </div>
      <div className="col-1 col-md-2 col-lg-1 col-sm-3" />
      <div
        class="col-md-4 col-sm-7 col-lg-4 text-center col-10 "
        style={{
          borderRadius: "30px",
          borderLeft: "1px solid #1BCA9B",
          borderTop: "1px solid #1BCA9B",
          marginTop: "8.5vh",
          minWidth: "300px",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ marginTop: "4.5vh" }}>
          I
          <h4
            style={{
              textTransform: "uppercase",
              display: "inline-block",
            }}
          >
            nsta
          </h4>
          C
          <h4
            style={{
              textTransform: "uppercase",
              display: "inline-block",
            }}
          >
            lone
          </h4>
        </h2>
        <h4 style={{ marginTop: "5vh", fontWeight: 600 }}>Welcome Back!</h4>
        <h6 style={{ marginTop: "1vh", marginBottom: "7.5vh" }}>
          Log in to your existing account
        </h6>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {() => (
            <Form>
              <div className="input-group mb-4 ">
                <div className="input-group-prepend">
                  <span class="input-group-text">
                    <i class="far fa-envelope text-primary"></i>
                  </span>
                </div>

                <Field
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  style={{
                    backgroundcolor: "white",
                  }}
                />

                <div className="input-group-append ">
                  <span class="input-group-text post-text"></span>
                </div>
              </div>

              {/* Password */}

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-lock text-primary"></i>
                  </span>
                </div>

                <Field
                  className="form-control"
                  type={mode}
                  name="password"
                  placeholder="Enter Your Password"
                />
                {
                  <div className="input-group-append">
                    <span class="input-group-text">
                      {mode === "text" ? (
                        <i
                          class="fas fa-eye-slash "
                          onClick={() =>
                            setMode(mode === "text" ? "password" : "text")
                          }
                        ></i>
                      ) : (
                        <i
                          class="fas fa-eye "
                          onClick={() =>
                            setMode(mode === "text" ? "password" : "text")
                          }
                        ></i>
                      )}
                    </span>
                  </div>
                }
              </div>
              <Link to="/forgotpassword">
                <h6
                  class="text-right"
                  style={{
                    marginTop: "2vh",
                    color: "blue",
                  }}
                >
                  Forgot Password?
                </h6>
              </Link>
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <button
                  class="signIn "
                  type="submit"
                  style={{
                    marginTop: "3vh",
                    textAlign: "center",
                  }}
                >
                  Login
                </button>
              </div>
              <h6
                style={{
                  marginTop: "10vh",
                  textAlign: "center",
                }}
              >
                Don't have an account?
                <Link
                  style={{
                    color: "blue",
                    display: "inline-block",
                  }}
                  // style={currentTab(history, '/signup')}
                  className="nav-link"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </h6>
            </Form>
          )}
        </Formik>
      </div>
      {performRedirect()}
      <div className=" col-lg-1 col-sm-2 col-1 "></div>

      <div className="d-none d-md-block fixed-bottom" style={{ zIndex: "-1" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fill-opacity="0.5"
            d="M0,32L40,58.7C80,85,160,139,240,176C320,213,400,235,480,250.7C560,267,640,277,720,266.7C800,256,880,224,960,213.3C1040,203,1120,213,1200,186.7C1280,160,1360,96,1400,64L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
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
};

export default SignIn;
