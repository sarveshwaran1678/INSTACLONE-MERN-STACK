const User = require("../models/user");

const Post = require("../models/post");

const formidable = require("formidable");
const _ = require("lodash");

var fs = require("fs");
const { v4: uuidv4 } = require("uuid");
var cloudinary = require("cloudinary").v2;

exports.getPictureById = async (req, res, next, id) => {
  await Post.findById(id)
    .populate("user")
    .exec((err, picture) => {
      if (err) {
        return res.status(400).json({
          error: "Picture not found",
        });
      }
      req.picture = picture;
      next();
    });
};

exports.getAnotherPictureById = async (req, res, next, id) => {
  await Post.findById(id)
    .populate("user")
    .exec((err, picture) => {
      if (err) {
        return res.status(400).json({
          error: "Picture not found",
        });
      }
      req.anotherPicture = picture;
      next();
    });
};

exports.getPicture = (req, res) => {
  res.json(req.picture);
};

exports.getAnotherUserPicture = (req, res) => {
  res.json(req.anotherPicture);

  //return res.json(req.anotherPicture);
};

//Uploading Post
exports.uploadPost = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, function (error, fields, file) {
    const path = file.picturePath.path;
    const uniqueFilename = uuidv4();
    const picture = new Post(fields);

    if (path.match(/\.(jpg|jpeg|png)$/) && file.picturePath.size < 5000000) {
      cloudinary.uploader.upload(
        path,
        {
          public_id: `InstaClone/${uniqueFilename}`,
          tags: `InstaClone`,
        }, // directory and tags are optional

        async function (err, image) {
          if (err) return res.send(err);
          console.log("file uploaded to Cloudinary");
          picture.UserId = req.profile._id;
          picture.picturePath = image.public_id;
          picture.pictureUrl = image.url;
          await picture.save((err, picture) => {
            if (err) {
              res.status(400).json({
                error: err,
              });
            }
            return res.json(picture);
          });
        }
      );
    } else {
      return res.json({
        error: "Invalid File Type",
      });
    }
  });
};

//Deleting Post
exports.removePicture = (req, res, next) => {
  if (toString(req.profile._id) == toString(req.picture.UserId)) {
    let picture = req.picture;
    cloudinary.uploader.destroy(picture.picturePath, function (result) {});
    picture.remove((err, deletedpicture) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete picture",
        });
      }
      next();
    });
  } else {
    return res.status(400).json({
      err: "Not authorized to remove picture",
    });
  }
};

//Update the Picture Caption
exports.updateCaption = async (req, res) => {
  if (toString(req.profile._id) == toString(req.picture.UserId)) {
    await Post.findByIdAndUpdate(
      { _id: req.picture._id },
      { $set: { caption: req.body.caption } }, //req.body will have values from frontend to be updated
      { new: true, runValidators: true },
      (err, picture) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        res.json(picture);
      }
    );
  } else {
    return res.status(400).json({
      err: "Not authorized to remove comment",
    });
  }
};

//Like and Unlike
exports.likePicture = (req, res) => {
  let user = req.profile;
  let picture = req.picture;
  const username = user.username;
  if (picture.likesFromUserId.includes(user._id)) {
    Post.findByIdAndUpdate(
      { _id: req.picture._id },
      { $pull: { likesFromUserId: req.profile._id } },
      { new: true, useFindAndModify: false },
      (err, picture) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        res.json(
          //message: "Post was unliked by: " + username,
          picture
        );
      }
    );
  } else {
    let { _id, username } = req.profile;
    const pushNotification = {
      _id,
      updatedFieldName: username + " liked your photo",
    };
    //Logic for like
    Post.findByIdAndUpdate(
      { _id: req.picture._id },
      { $push: { likesFromUserId: req.profile._id } },
      { new: true, useFindAndModify: false },
      (err, picture) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        //Notification Logic
        User.findByIdAndUpdate(
          { _id: req.picture.UserId },
          { $push: { updateNotification: pushNotification } },
          { new: true, runValidators: true },
          (err, user) => {
            if (err) {
              return res.json({
                msg: "error",
              });
            }
            //console.log("Done");
          }
        );
        res.json(
          //message: "Post was liked by: " + username,
          picture
        );
      }
    );
  }
};

//Uploading Story
exports.uploadStory = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, function (error, fields, file) {
    const path = file.picturePath.path;
    const uniqueFilename = uuidv4();
    const picture = new Post(fields);

    if (path.match(/\.(jpg|jpeg|png)$/) && file.picturePath.size < 5000000) {
      cloudinary.uploader.upload(
        path,
        {
          public_id: `InstaClone/${uniqueFilename}`,
          tags: `InstaClone`,
        }, // directory and tags are optional

        async function (err, image) {
          if (err) return res.send(err);
          console.log("file uploaded to Cloudinary");
          picture.isStory = true;
          picture.UserId = req.profile._id;
          picture.picturePath = image.public_id;
          picture.pictureUrl = image.url;
          await picture.save((err, picture) => {
            if (err) {
              res.status(400).json({
                error: err,
              });
            }
            return res.json(picture);
          });
        }
      );
    } else {
      return res.json({
        error: "Invalid File Type",
      });
    }
  });
};

//get all your stories
exports.getAllYourStories = async (req, res) => {
  await Post.find({ UserId: req.profile._id, isStory: true }).exec(
    (err, posts) => {
      if (err) {
        return res.status(500).json(err);
      }
      posts.map((pic) => {
        if (Date.now() - pic.createdAt >= 600000) {
          pic.remove((err, deletedpicture) => {
            if (err) {
              console.log("failed");
            }
            console.log(deletedpicture);
            cloudinary.uploader.destroy(deletedpicture.picturePath, function (
              result
            ) {
              console.log("deleted from cloud");
            });
          });
        }
      });
    }
  );

  await Post.find({ UserId: req.profile._id, isStory: true }).exec(
    (err, posts) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(201).json(posts);
    }
  );
};

//get all other stories
exports.getAllAnotherStory = async (req, res) => {
  let user = req.profile;
  let anotherUser = req.anotherProfile;

  if (anotherUser.isPrivate) {
    if (anotherUser.followers.includes(user._id)) {
      await Post.find({ UserId: anotherUser._id, isStory: true })
        .sort("updatedAt")
        .then((posts) => {
          posts.map((pic) => {
            if (Date.now() - pic.createdAt >= 600000) {
              pic.remove((err, deletedpicture) => {
                if (err) {
                  console.log("failed");
                }
                console.log(deletedpicture);
                cloudinary.uploader.destroy(
                  deletedpicture.picturePath,
                  function (result) {
                    //console.log("deleted from cloud");
                  }
                );
              });
            }
          });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });

      await Post.find({ UserId: anotherUser._id, isStory: true })
        .sort("updatedAt")
        .then((posts) => {
          return res.status(201).json(posts);
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    } else {
      return res.status(401).json({
        message: "Private Account",
      });
    }
  } else {
    await Post.find({ UserId: anotherUser._id, isStory: true })
      .sort("updatedAt")
      .then((posts) => {
        posts.map((pic) => {
          if (Date.now() - pic.createdAt >= 600000) {
            pic.remove((err, deletedpicture) => {
              if (err) {
                console.log("failed");
              }
              //console.log(deletedpicture);
              cloudinary.uploader.destroy(deletedpicture.picturePath, function (
                result
              ) {
                //console.log("deleted from cloud");
              });
            });
          }
        });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });

    await Post.find({ UserId: anotherUser._id, isStory: true })
      .sort("updatedAt")
      .then((posts) => {
        return res.status(201).json(posts);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
};

//get all your followings stories
exports.getAllFollowingStory = async (req, res) => {
  let followings = req.profile.followings;

  await Post.find({ UserId: { $in: followings }, isStory: true })
    .sort({ createdAt: 1 })
    .exec((err, posts) => {
      if (err) {
        return res.status(500).send(err);
      }
      posts.map((pic) => {
        if (Date.now() - pic.createdAt >= 12 * 60 * 60 * 1000) {
          pic.remove((err, deletedpicture) => {
            if (err) {
              console.log("failed");
            }
            //console.log(deletedpicture);
            cloudinary.uploader.destroy(deletedpicture.picturePath, function (
              result
            ) {
              //console.log("deleted from cloud");
            });
          });
        }
      });
    });

  await Post.find({ UserId: { $in: followings }, isStory: true })
    .sort({ createdAt: 1 })
    .exec((err, posts) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(posts);
    });
};
//get all of your post
exports.getAllYourPost = async (req, res) => {
  await Post.find({ UserId: req.profile._id, isStory: false })
    .sort("updatedAt")
    .then((posts) => {
      return res.status(201).json(posts);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

//get all other user posts
exports.getAllAnotherPost = async (req, res) => {
  let user = req.profile;
  let anotherUser = req.anotherProfile;

  if (anotherUser.isPrivate) {
    if (anotherUser.followers.includes(user._id)) {
      await Post.find({ UserId: anotherUser._id, isStory: false })
        .sort("updatedAt")
        .then((posts) => {
          return res.status(201).json(posts);
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    } else {
      return res.status(401).json({
        message: "Private Account",
      });
    }
  } else {
    await Post.find({ UserId: anotherUser._id, isStory: false })
      .sort("updatedAt")
      .then((posts) => {
        return res.status(201).json(posts);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
};

exports.removeStory = async (req, res) => {
  if (toString(req.profile._id) == toString(req.picture.UserId)) {
    let story = req.picture;
    cloudinary.uploader.destroy(story.picturePath, function (result) {});
    story.remove((err, deletedStory) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete story",
        });
      }
    });
  } else {
    return res.status(400).json({
      err: "Not authorized to remove story",
    });
  }
};
