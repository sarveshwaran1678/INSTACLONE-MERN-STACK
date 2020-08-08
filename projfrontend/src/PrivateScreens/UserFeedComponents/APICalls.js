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

export const getAnotherUserDetails = (anotherUserId, userId, token) => {
  return axios({
    method: "get",
    url: `${BackendUrl}/anotherUser/${userId}/${anotherUserId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

export const getUserFeed = (userId, token) => {
  return axios({
    method: "get",
    url: `${BackendUrl}/getFeed/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllComments = (userId, picId, token) => {
  return axios({
    method: "get",
    url: `${BackendUrl}/comment/getAllCommentsByPost/${userId}/${picId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postLike = (userId, picId, token) => {
  return axios({
    method: "put",
    url: `${BackendUrl}/picture/like/${userId}/${picId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postComment = (userId, picId, token, commentBody) => {
  return axios({
    method: "post",
    url: `${BackendUrl}/comment/createComment/${userId}/${picId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      commentBody,
    },
  });
};

export const getAllReplies = (userId, commentId, token) => {
  return axios({
    method: "get",
    url: `${BackendUrl}/reply/getAllReplyByCommentId/${userId}/${commentId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postReply = (userId, commentId, token, replyBody) => {
  return axios({
    method: "post",
    url: `${BackendUrl}/reply/createReply/${userId}/${commentId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      replyBody,
    },
  });
};
