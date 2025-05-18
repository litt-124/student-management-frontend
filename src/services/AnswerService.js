import ApiRequestService from '@/services/ApiRequestService';

export default class AnswerService extends ApiRequestService {
    static submitAnswers(formData) {
        return this.postRequest('exam/submit-answers', formData);
    }
    static getStudentAnswers(examId, userId) {
        return this.getRequest(`exam/${examId}/answers/${userId}`);
    }
}
