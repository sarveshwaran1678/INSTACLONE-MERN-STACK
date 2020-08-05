const axios = require("axios");
const BackendUrl = process.env.REACT_APP_BACKEND;

export const getOwnUser = (userId, token) => {
  return axios({
    method: "get",
    url: `${BackendUrl}/user/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAnotherUserDetails = (anotherUserId) => {
  return axios({
    method: "get",
    url: `${BackendUrl}/anotherUser/${anotherUserId}`,
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};

export const getAllFollowingStories = (userId, token) => {
  return axios({
    method: "get",
    url: `${BackendUrl}/picture/getAllFollowingsStories/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
