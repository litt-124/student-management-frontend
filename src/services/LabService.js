import ApiRequestService from '@/services/ApiRequestService'

export default class LabService extends ApiRequestService {

    static getLabList(offset, limit, searchText = '') {
        const labUrl = `lab/list?offset=${offset}&limit=${limit}&searchText=${searchText}`;
        return this.getRequest(labUrl, {}, true);
    }

    static createLab(data) {
        return this.postRequest('lab/add', data, {}, true);
    }
    static getLabById(id) {
        return this.getRequest(`lab/detail/${id}`, {}, true);
    }
    static updateLab(id, data) {
        return this.putRequest(`lab/update/${id}`, data, {}, true);
    }

    static deleteLab(id) {
        return this.deleteRequest(`lab/delete/${id}`);
    }
}
