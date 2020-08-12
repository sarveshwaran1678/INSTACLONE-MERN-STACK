const axios = require("axios");
const BackendUrl = process.env.REACT_APP_BACKEND;

export const putProfilePic = (userId, token, formData) => {
  return axios({
    method: "put",
    url: `${BackendUrl}/user/updateProfilePhoto/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

export const updateUser = (userId, token, formData) => {
  return axios({
    method: "put",
    url: `${BackendUrl}/user/updateUser/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

export const putPassword = (userId, token, oldPassword, newPassword) => {
  return axios({
    method: "put",
    url: `${BackendUrl}/user/updatePassword/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      oldPassword,
      newPassword,
    },
  });
};
