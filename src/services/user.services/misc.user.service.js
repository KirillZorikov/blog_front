import axios from "axios";
import authHeader from "../auth-header";

const API_URL = 'http://127.0.0.1:8000/api/v1/';

class MiscUserService {
    async getAuthorInfo(username) {
        return await axios.get(API_URL + `users/${username}`, {headers: authHeader()});
    }
    async getImage(link) {
        const config = {responseType: 'blob'};
        let fileName = link.split('/').pop();
        if (!fileName) {
            return '';
        }
        return await axios.get(link, config);
    }
    async addComment(post_id, text, parent_id) {
        return await axios.post(API_URL + `posts/${post_id}/comments`,
            {parent: parent_id, text: text},
            {headers: authHeader()});
    }
    async getListComment(post_id) {
        return await axios.get(API_URL + `posts/${post_id}/comments`,{headers: authHeader()});
    }
}

export default new MiscUserService();