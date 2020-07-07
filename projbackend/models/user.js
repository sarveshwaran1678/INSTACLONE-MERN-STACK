var mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
var validator = require('validator');

var userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            maxlength: 20,
            minlength: 5,
            trim: true,
            unique: true,
        },
        name: {
            type: String,
            maxlength: 32,
            required: true,
            trim: true,
            minlength: 5,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid');
                }
            },
        },
        bio: {
            type: String,
            trim: true,
            maxlength: 100,
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
            default: 'InstaClone/8c65398a-3357-4a3a-b7ad-a234e2afabb9',
        },
        profilePicUrl: {
            type: String,
            default:
                'http://res.cloudinary.com/gonfreak/image/upload/v1594153662/InstaClone/8c65398a-3357-4a3a-b7ad-a234e2afabb9.jpg',
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
