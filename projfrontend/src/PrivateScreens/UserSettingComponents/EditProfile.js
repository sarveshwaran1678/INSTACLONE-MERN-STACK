import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

import { ToastContainer, toast } from "react-toastify";

import * as Yup from "yup";

import { putProfilePic, updateUser } from "./APICalls";
import { isAuthenticated } from "../../AuthScreens/APICalls/signCalls";

function EditProfile({ username, name, bio, profilePicUrl }) {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  const [content, setContent] = useState(undefined);
  const [phase, setPhase] = useState();

  const initialValues = {
    username: username,
    fullName: name,
    bio: bio,
  };

  const toastId = React.useRef(null);
  const dismiss = () => toast.dismiss(toastId.current);
  const Uploading = () => (
    <div>
      <span
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          color: "#a2acba",
        }}
      >
        Uploading
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
        Uploaded Successfully
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
        Upload Failed
      </span>
      <i className="fas fa-times  fa-lg  ml-3 text-success"></i>
    </div>
  );

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
  const LargeFile = () => (
    <div>
      <span
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          color: "#a2acba",
        }}
      >
        File Size Should Be Less Than 5Mb!
      </span>
      <i className="fas fa-times ml-3 text-success"></i>
    </div>
  );

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(5, "Too Short!").max(15, "Too Long!"),
    fullName: Yup.string().min(5, "Too Short!").max(25, "Too Long!"),
    bio: Yup.string().min(5, "Too Short!").max(101, "Too Long!"),
  });

  const onSubmit = async (values, onSubmit) => {
    console.log(content);

    let picFormData = new FormData();
    picFormData.append("profilePicPath", content);
    setPhase(0);

    await putProfilePic(userId, token, picFormData)
      .then((res) => {
        setPhase(1);
        console.log(res.data);
        console.log("Profile Pic updated succesfully");
      })
      .catch((err) => {
        setPhase(2);

        console.log("Not able to update profile pic");
        console.log("ERR:", { ...err }.response);
      });
    setPhase();

    let userFormData = new FormData();
    userFormData.append("username", values.username);
    userFormData.append("name", values.fullName);
    userFormData.append("bio", values.bio);

    await updateUser(userId, token, userFormData)
      .then((res) => {
        console.log(res.data);
        console.log("userData updated succesfully");
      })
      .catch((err) => {
        console.log("Not able to update profile details");
        console.log("ERR:", { ...err }.response);
      });

    onSubmit.resetForm();
  };
  const handleFile = (e) => {
    //const cont = e.target.result;
    setContent(e.target.result);
    //console.log('file content', content);
  };
  const handleChangeFile = (file) => {
    if (file.size > 5000000) {
      toast(<LargeFile />);
    } else {
      let fileData = new FileReader();
      fileData.onloadend = handleFile;
      fileData.readAsDataURL(file);
    }
  };
  return (
    <div class="row text-center" style={{ minHeight: "66vh" }}>
      <ToastContainer />
      {Notify()}
      <div
        class="col-md-9 text-center col-sm-6 col-12 mx-auto"
        style={{
          marginTop: "3.5vh",
          minWidth: "300px",
          maxWidth: "400px",
        }}
      >
        <h4 style={{ fontWeight: "700" }}>Manage Your Profile</h4>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, values, setFieldValue }) => (
            <Form>
              <div className="text-left my-4">
                <img
                  src={content === undefined ? `${profilePicUrl}` : content}
                  style={{ borderRadius: "50%" }}
                  height={60}
                  width={60}
                />
                <span className="ml-2" style={{ fontWeight: "500" }}>
                  {username}
                </span>
              </div>

              <div class="custom-file mb-3">
                <label for="customFile"></label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) => {
                    handleChangeFile(event.target.files[0]);
                  }}
                  className="custom-file-input"
                />
                <label class="custom-file-label" for="customFile">
                  Upload Profile Photo
                </label>
              </div>

              <div class="input-group mb-3">
                {errors.username || !values.username ? (
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-user text-primary"></i>
                    </span>
                  </div>
                ) : (
                  <div class="input-group-prepend">
                    <span class="input-group-text  ">
                      <i class="fas fa-lock-user text-success"></i>
                    </span>
                  </div>
                )}

                <Field
                  className="form-control"
                  type="text"
                  name="username"
                  placeholder="Enter New Username"
                />

                {values.username.length === 0 ? (
                  <div class="input-group-append ">
                    <span class="input-group-text"></span>
                  </div>
                ) : values.username.length > 0 && errors.username ? (
                  <div class="input-group-append ">
                    <span class="input-group-text text-danger">
                      <i class="fas fa-times  "></i>
                    </span>
                  </div>
                ) : (
                  <div class="input-group-append ">
                    <span class="input-group-text text-success ">
                      <i class="fas fa-check"></i>
                    </span>
                  </div>
                )}
              </div>

              <div class="input-group mb-3">
                {errors.fullName || !values.fullName ? (
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-lock text-primary"></i>
                    </span>
                  </div>
                ) : (
                  <div class="input-group-prepend">
                    <span class="input-group-text  ">
                      <i class="fas fa-lock-open text-success"></i>
                    </span>
                  </div>
                )}

                <Field
                  className="form-control"
                  type="text"
                  name="fullName"
                  placeholder="Enter New FullName"
                />

                {values.fullName.length === 0 ? (
                  <div class="input-group-append ">
                    <span class="input-group-text"></span>
                  </div>
                ) : values.fullName.length > 0 && errors.fullName ? (
                  <div class="input-group-append ">
                    <span class="input-group-text text-danger">
                      <i class="fas fa-times  "></i>
                    </span>
                  </div>
                ) : (
                  <div class="input-group-append ">
                    <span class="input-group-text text-success ">
                      <i class="fas fa-check"></i>
                    </span>
                  </div>
                )}
              </div>

              <div class="input-group mb-3">
                {errors.bio || !values.bio ? (
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-lock text-primary"></i>
                    </span>
                  </div>
                ) : (
                  <div class="input-group-prepend">
                    <span class="input-group-text  ">
                      <i class="fas fa-lock-open text-success"></i>
                    </span>
                  </div>
                )}

                <Field
                  className="form-control"
                  type="text"
                  name="bio"
                  placeholder="Update Your Bio"
                />
                {values.bio.length === 0 ? (
                  <div class="input-group-append ">
                    <span class="input-group-text"></span>
                  </div>
                ) : values.bio.length > 0 && errors.bio ? (
                  <div class="input-group-append ">
                    <span class="input-group-text text-danger">
                      <i class="fas fa-times  "></i>
                    </span>
                  </div>
                ) : (
                  <div class="input-group-append ">
                    <span class="input-group-text text-success ">
                      <i class="fas fa-check"></i>
                    </span>
                  </div>
                )}
              </div>
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <button
                  class="signIn px-5"
                  type="submit"
                  style={{
                    marginTop: "3vh",
                    textAlign: "center",
                  }}
                >
                  Update Profile
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div class="fixed-bottom text-center mb-1">
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

export default EditProfile;
