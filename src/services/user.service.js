import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8000/api/v1/';

class UserService {
    async getListPosts(ordering, page, filtering) {
        if (!ordering.includes('pub_date')) {
            ordering = [ordering, '-pub_date'];
        }
        let params = ordering ? {ordering: ordering.toString()} : {};
        params = Object.assign({}, params, filtering ? filtering : {});
        params = Object.assign({}, params, page ? {page: page} : {});
        return await axios.get(API_URL + `posts`, {
            headers: authHeader(),
            params: params,
        });
    }

    async getPost(id) {
        return await axios.get(API_URL + `posts/${id}`, {headers: authHeader()});
    }

    async getListGroups(ordering = ['-posts_count', 'title']) {
        return await axios.get(API_URL + 'groups', {
            headers: authHeader(),
            params: {ordering: ordering.toString()},
        });
    }

    async getGroup(slug) {
        return await axios.get(API_URL + `groups/${slug}`, {headers: authHeader()});
    }

    async getListTags() {
        return await axios.get(API_URL + 'tags', {headers: authHeader()});
    }

    async getAuthorInfo(username) {
        return await axios.get(API_URL + `users/${username}`, {headers: authHeader()});
    }
}

export default new UserService();