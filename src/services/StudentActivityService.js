import ApiRequestService from '@/services/ApiRequestService';

export default class StudentActivityService extends ApiRequestService {
    static createActivity(data) {
        return this.postRequest('exam/start-activity', data);
    }
}
