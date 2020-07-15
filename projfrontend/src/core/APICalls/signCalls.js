import { create } from 'apisauce';
const BackendUrl = process.env.REACT_APP_BACKEND;

const apiClient = create({
    baseURL: BackendUrl,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export const signIn = ({ email, password }) => {
    apiClient
        .post('/signin', {
            email,
            password,
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const signUp = ({ name, username, email, password }) => {
    apiClient
        .post('/signin', {
            username,
            name,
            email,
            password,
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
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
