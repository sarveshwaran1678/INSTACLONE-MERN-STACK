const axios = require('axios');
const BackendUrl = process.env.REACT_APP_BACKEND;


// const apiClient = create({
//     baseURL: BackendUrl,
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//     },
// });

export const signIn = ({ email, password }) => {
    return axios({
        method: "post",
        url: `${BackendUrl}/signin`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: {
            email,
            password
        }
    })
        .then(res => {
            console.log(res);
            return (res)
        })
        .catch(err => console.error(err));
};

export const signUp = ({ name, username, email, password }) => {
    return axios({
        method: "post",
        url: `${BackendUrl}/signup`,
        data: {
            name,
            username,
            email,
            password
        },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
    // .then(res => {
    //     console.log(res);
    //     return (res)
    // })
    // .catch(err => {
    //     console.log("Error:", err)
    //     return (err)
    // });
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};
