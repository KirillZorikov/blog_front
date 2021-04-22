import axios from "axios";
import authHeader from "../auth-header";

const API_URL = 'http://127.0.0.1:8000/api/v1/';

class FollowUserService {
    async getListFollowingPosts(page) {
        let params = page ? {page: page} : {};
        return await axios.get(API_URL + `posts/follow`, {
            headers: authHeader(),
            params: params,
        });
    }
    async getListFollow(username) {
        return await axios.get(API_URL + `follow`, {headers: authHeader()});
    }
    async addFollow(username) {
        return await axios.post(API_URL + `follow`, {author: username}, {headers: authHeader()});
    }
    async deleteFollow(username) {
        return await axios.delete(API_URL + `follow/${username}`, {headers: authHeader()});
    }
}

export default new FollowUserService();