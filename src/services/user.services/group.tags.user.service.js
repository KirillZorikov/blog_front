import axios from "axios";
import authHeader from "../auth-header";
import {constants} from '../../constants'

const API_URL = constants.API_URL;

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
    async getTag(slug) {
        return await axios.get(API_URL + `tags/${slug}`, {headers: authHeader()});
    }
}

export default new GroupTagsUserService();