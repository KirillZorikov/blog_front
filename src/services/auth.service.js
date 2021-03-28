import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = "http://127.0.0.1:8000/api/v1/auth/";

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', {
                username: user.username,
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
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password
        });
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