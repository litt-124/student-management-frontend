import SnippetsService from "@/services/SnippetsService.js";
import StorageService, { LANGUAGE_KEY } from "@/services/StorageService.js";

export default {
    name: 'ExamQuestions',
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
            questions: this.exam.questions || []
        };
    },
    methods: {
        addQuestion() {
            this.questions.push({
                title: '',
                type: 'text',
                answerOptions: [],
                attachments: []
            });
        },
        removeQuestion(index) {
            this.questions.splice(index, 1);
        },
        addOption(qIndex) {
            this.questions[qIndex].answerOptions.push('');
        },
        removeOption(qIndex, oIndex) {
            this.questions[qIndex].answerOptions.splice(oIndex, 1);
        },
        handleFileUpload(event, qIndex) {
            const files = Array.from(event.target.files);

            if (!this.questions[qIndex].attachments) {
                this.questions[qIndex].attachments = [];
            }
            console.log('pushh')
            this.questions[qIndex].attachments.push(...files);
        },

        removeAttachment(qIndex, aIndex) {
            this.questions[qIndex].attachments.splice(aIndex, 1);
        }
    }
};