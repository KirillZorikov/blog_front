import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8000/api/v1/';

class UserService {
    async getListPosts() {
        return await axios.get(API_URL + 'posts', {headers: authHeader()});
    }
    async getPost(id, ordering, filtering) {
        let params = ordering ? {ordering: ordering.toString()}: {}
        params = Object.assign({}, params, filtering ? filtering: {})
        return await axios.get(API_URL + `posts/${id}`, {
            headers: authHeader(),
            params: params,
        });
    }
    async getListGroups(ordering=['-posts_count', 'title']) {
        return await axios.get(API_URL + 'groups', {
            headers: authHeader(),
            params: {ordering: ordering.toString()},
        });
    }
    async getListTags() {
        return await axios.get(API_URL + 'tags', {headers: authHeader()});
    }
    async getAuthorInfo(username) {
        return await axios.get(API_URL + `users/${username}`, {headers: authHeader()});
    }
}

export default new UserService();