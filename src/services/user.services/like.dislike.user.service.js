import axios from "axios";
import authHeader from "../auth-header";

const API_URL = 'http://127.0.0.1:8000/api/v1/';

class LikeDislikeUserService {
    async likeComment(post_id, comment_id) {
        return await axios.post(API_URL + `posts/${post_id}/comments/${comment_id}/like`, {},
            {headers: authHeader()});
    }
    async dislikeComment(post_id, comment_id) {
        return await axios.post(API_URL + `posts/${post_id}/comments/${comment_id}/dislike`, {},
            {headers: authHeader()});
    }
    async likePost(id) {
        return await axios.post(API_URL + `posts/${id}/like`, {},
            {headers: authHeader()});
    }
    async dislikePost(id) {
        return await axios.post(API_URL + `posts/${id}/dislike`, {},
            {headers: authHeader()});
    }
}

export default new LikeDislikeUserService();