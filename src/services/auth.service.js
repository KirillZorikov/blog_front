import axios from 'axios';
import authHeader from "../services/auth-header";
import {constants} from '../constants'

const API_URL = constants.API_URL + 'auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', {
                username: user.username,
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'signup', user);
    }

    changePassword(user) {
        return axios.patch(API_URL + 'change_password', {
            old_password: user.oldPassword,
            password2: user.password2,
            password: user.password
        }, {headers: authHeader()});
    }
}

export default new AuthService();