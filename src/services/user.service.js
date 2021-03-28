import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8000/api/v1/';

class UserService {
    async getListPosts() {
        return await axios.get(API_URL + 'posts', {headers: authHeader()});
    }
}

export default new UserService();