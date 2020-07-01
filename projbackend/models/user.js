var mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

var userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            maxlength: 20,
            trim: true,
            unique: true,
        },
        name: {
            type: String,
            maxlength: 32,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        bio: {
            type: String,
            trim: true,
        },
        encry_password: {
            type: String,
            required: true,
        },
        salt: String,
        isPrivate: {
            type: Boolean,
            default: false,
        },
        profilePicPath: {
            type: String,
            default: '../assets/profile-pic.jpg',
        },
        followings: {
            type: Array,
            default: [],
        },
        followers: {
            type: Array,
            default: [],
        },
        followRequestPending: {
            type: Array,
            default: [],
        },
        followRequestSent: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    securePassword: function (plainpassword) {
        if (!plainpassword) return '';
        try {
            return crypto
                .createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },

    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },
};

module.exports = mongoose.model('User', userSchema);
