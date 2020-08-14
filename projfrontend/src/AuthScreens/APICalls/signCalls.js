const axios = require('axios');
const BackendUrl = process.env.REACT_APP_BACKEND;

export const signIn = ({ email, password }) => {
    return axios({
        method: 'post',
        url: `${BackendUrl}/signin`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        data: {
            email,
            password,
        },
    });
};

export const signUp = ({ name, username, email, password }) => {
    return axios({
        method: 'post',
        url: `${BackendUrl}/signup`,
        data: {
            name,
            username,
            email,
            password,
        },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};

export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();

        return axios({
            method: 'get',
            url: `${BackendUrl}/signout`,
        });
    }
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

export const getAllUsers = (userId, token) => {
    return axios({
        method: 'get',
        url: `${BackendUrl}/searchUsers/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
