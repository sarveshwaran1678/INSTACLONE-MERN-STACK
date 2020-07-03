const User = require("../models/user")
const Order = require("../models/order")


exports.getUserById = (req, res, next, id) => {
    User.findById(id, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User Not found in DB"
            })
        }
        req.profile = user;
        next();
    })
}

//for user to get his details
exports.getUser = (req, res) => {

    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined

    return res.json(req.profile)
}

//for users to update their detail
exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },//req.body will have values from frontend to be updated
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Not authorized to update a user"
                })
            }
            user.salt = undefined
            user.encry_password = undefined
            user.createdAt = undefined;
            user.updatedAt = undefined
            res.json(user)
        }
    )
}
exports.followToggle = (req, res) => {

}
// exports.getAllUsers=(req,res)=>{
//     User.find((err,user)=>{
//         if(err||!user)
//         {
//             return res.status(400).json({
//                 error:"User not found / DB error"
//             })
//         }
//         return res.json(user)
//     })
// }


exports. = (req, res) => {



