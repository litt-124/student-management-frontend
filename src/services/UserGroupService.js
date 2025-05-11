import ApiRequestService from '@/services/ApiRequestService';

export default class UserGroupService extends ApiRequestService {

    static getGroupList(offset, limit, searchText = '') {
        const url = `user-group/list?offset=${offset}&limit=${limit}&searchText=${searchText}`;
        return this.getRequest(url, {}, true);
    }

    static getGroupById(id) {
        return this.getRequest(`user-group/detail/${id}`);
    }

    static createGroup(data) {
        return this.postRequest('user-group/add', data, {}, true);
    }

    static updateGroup(id, data) {
        return this.putRequest(`user-group/update/${id}`, data, {}, true);
    }

    static deleteGroup(id) {
        return this.deleteRequest(`user-group/delete/${id}`);
    }
}
