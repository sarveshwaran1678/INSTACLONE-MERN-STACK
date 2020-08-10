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
