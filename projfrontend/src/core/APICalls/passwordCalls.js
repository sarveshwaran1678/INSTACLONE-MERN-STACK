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