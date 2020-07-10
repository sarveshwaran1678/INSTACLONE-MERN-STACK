var mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
var validator = require('validator');
const { functions } = require('lodash');
const { ObjectId } = mongoose.Schema;

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
        otpFlag: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: String,
            trim: true,
        },
        // otpTimeout: {
        //     type: String,
        //     default: '',
        // },
        updateNotification: [
            {
                UserId: {
                    type: ObjectId,
                    ref: 'User',
                },
                updatedFieldName: String,
                updateNotificationTime: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
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
// userSchema
//     .virtual('otp')
//     .set(function (otp) {
//         this._otp = otp;
//         console.log('Otp', this._otp);
//         this.otpFlag = true;
//         setTimeout(() => {
//             this.otpFlag = false;
//             console.log('AFTER TIMEOUT', this.otpFlag);
//         }, 6000);
//     })
//     .get(function () {
//         return this._otp;
//     });
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
    otpTimer: function () {
        console.log(this.otpFlag);
        setTimeout(() => {
            return (this.otpFlag = false);
        }, 10000);
    },
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },
};

module.exports = mongoose.model('User', userSchema);
