import axios from "axios";
import authHeader from "../auth-header";

const API_URL = 'http://127.0.0.1:8000/api/v1/';

class PostUserService {
    async getListPosts(params) {
        if (params.ordering && !params.ordering.includes('pub_date')) {
            params.ordering = `${params.ordering},-pub_date`;
        }
        return await axios.get(API_URL + `posts`, {
            headers: authHeader(),
            params: params
        });
    }
    async getListPostsByUser(username, page) {
        let params = page ? {page: page} : {};
        return await axios.get(API_URL + `${username}`, {
            headers: authHeader(),
            params: params,
        });
    }
    async getPost(id) {
        return await axios.get(API_URL + `posts/${id}`, {headers: authHeader()});
    }
    async deletePost(id) {
        return await axios.delete(API_URL + `posts/${id}`, {headers: authHeader()});
    }
    async addPost(data) {
        return await axios.post(API_URL + `posts`, data, {headers: authHeader()});
    }
    async updatePost(id, data) {
        return await axios.patch(API_URL + `posts/${id}`, data, {headers: authHeader()});
    }
}

export default new PostUserService();