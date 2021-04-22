import axios from "axios";
import authHeader from "../auth-header";

const API_URL = 'http://127.0.0.1:8000/api/v1/';

class GroupTagsUserService {
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
}

export default new GroupTagsUserService();