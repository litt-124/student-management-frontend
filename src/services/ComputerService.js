import ApiRequestService from '@/services/ApiRequestService';

export default class ComputerService extends ApiRequestService {

    static getComputerList(offset, limit, searchText = '') {
        const url = `computer/list?offset=${offset}&limit=${limit}&searchText=${searchText}`;
        return this.getRequest(url, {}, true);
    }

    static getComputerById(id) {
        return this.getRequest(`computer/detail/${id}`, {}, true);
    }

    static createComputer(data) {
        return this.postRequest('computer/add', data, {}, true);
    }

    static updateComputer(id, data) {
        return this.putRequest(`computer/update/${id}`, data, {}, true);
    }

    static deleteComputer(id) {
        return this.deleteRequest(`computer/delete/${id}`);
    }
}
