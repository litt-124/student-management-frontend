
import AnswerService from '@/services/AnswerService';
import UserGroupService from '@/services/UserGroupService';
import SnippetsService from '@/services/SnippetsService';
import StorageService, { LANGUAGE_KEY } from '@/services/StorageService';

export default {
    name: 'ExamReviewView',
    props: {
        exam: {
            type: Object,
            required: true
        }
    },
    data() {
        const snippet = SnippetsService.getSnippetsByNamespaceAndLanguage('Exam', StorageService.getFromStorage(LANGUAGE_KEY) || 'en');
        return {
            snippet: snippet ?? {},
            selectedStudentId: '',
            studentList: [],
            studentAnswers: []
        };
    },
    async mounted() {
        if (this.exam.userGroupId) {
            const group = await UserGroupService.getGroupById(this.exam.userGroupId);
            console.log(group)
            this.studentList = group.members || [];
        }
    },
    methods: {
        async loadStudentAnswers() {
            if (!this.selectedStudentId) return;
            this.studentAnswers = await AnswerService.getStudentAnswers(this.exam._id, this.selectedStudentId);
        }
    }
};