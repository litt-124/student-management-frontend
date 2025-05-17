import ApiRequestService from '@/services/ApiRequestService';

export default class ExamService extends ApiRequestService {

    static getExamList(offset, limit, searchText = '') {
        const url = `exam/list?offset=${offset}&limit=${limit}&searchText=${searchText}`;
        return this.getRequest(url);
    }

    static getExamById(id) {
        return this.getRequest(`exam/detail/${id}`);
    }

    static createExam(data) {
        return this.postRequest('exam/add', data);
    }

    static updateExam(id, data) {
        const headers =  { 'Content-Type': 'multipart/form-data' } ;

        return this.putRequest(`exam/update/${id}`, data,headers);
    }

    static deleteExam(id) {
        return this.deleteRequest(`exam/delete/${id}`);
    }
}
