const axios = require('axios');
const BackendUrl = process.env.REACT_APP_BACKEND;

export const forgetPassEmail = ({ email }) => {
    return axios({
        method: "post",
        url: `${BackendUrl}/password/sendOtp`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        data: {
            email
        }
    })
}

export const optChecker = ({ userOtp, userEmail }) => {
    return axios({
        method: "post",
        url: `${BackendUrl}/password/otpCheck`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        data: {
            userOtp,
            userEmail
        }
    })
}

export const confirmNewPass = ({ newPassword, confirmNewPassword, email }) => {
    return axios({
        method: "put",
        url: `${BackendUrl}/password/resetPassword`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        data: {
            newPassword,
            confirmNewPassword,
            email
        }
    })
}

