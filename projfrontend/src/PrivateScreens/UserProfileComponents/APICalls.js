const axios = require("axios");
const BackendUrl = process.env.REACT_APP_BACKEND;

export const postStory = (userId, token, formData) => {
  return axios({
    method: "post",
    url: `${BackendUrl}/picture/uploadStory/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

export const getAllYourPost = (userId, token) => {
  return axios({
    method: "get",
    url: `${BackendUrl}/picture/getYourAllPost/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllAnotherPost = (anotherUserId, userId, token) => {
  return axios({
    method: "get",
    url: `${BackendUrl}/picture/getAnotherAllPost/${userId}/${anotherUserId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
