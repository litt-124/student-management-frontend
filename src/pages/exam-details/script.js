import {DataEmitterService} from "@/services/DataEmiterService.js";
import ExamService from "@/services/ExamService.js";
import {useStore} from 'vuex';
import ExamEdit from "@/pages/exam-details/exam-edit/ExamEdit.vue"
import ExamQuestions from "@/pages/exam-details/exam-questions/ExamQuestions.vue"
import ExamAnswers from "@/pages/exam-details/exam-answers/ExamAnswers.vue"
import {isProxy, toRaw} from "vue";
import SnippetsService from "@/services/SnippetsService.js";
import StorageService, {LANGUAGE_KEY} from "@/services/StorageService.js";
import {EventBus} from "@/eventBus.js";

export default {
    name: 'ExamDetails',
    store: '',
    isSaved: false,
    showMain: false,
    showQuestions: false,
    showAnswers: false,
    computed: {
        examDataToShow() {
            return this.updatedExamData ? this.updatedExamData : this.selectedExam
        },
    },
    data() {
        const snippets = SnippetsService.getSnippetsByNamespaceAndLanguage('Exam', StorageService.getFromStorage(LANGUAGE_KEY) || 'de')

        return {
            examSnippet: snippets ?? {},
            selectedExam: '',
            showMain: true,
            showQuestions: false,
            updatedExamData: ''
        }
    },

    components: {
        ExamEdit,ExamQuestions,ExamAnswers
    },

    async mounted() {
        this.store = useStore();

        await this.getExamApi();
        DataEmitterService.$on('get-exam-data', this.getExamApi);
    },
    methods: {
        showComponent(componentName) {
            this.showMain = componentName === 'Main';
            this.showQuestions = componentName === 'Questions';
            this.showAnswers = componentName === 'Answers';

        },
        async getExamApi() {
            this.selectedExam = await ExamService.getExamById(this.$route.params.id);

        },

        storeUpdatedExamData(data) {
            this.updatedExamData = data;
        },

        async save() {
            this.isSaved = true;
            const exam = this.updatedExamData ? this.updatedExamData : this.selectedExam;

            await this.updateExam(exam);

        },

        async updateExam(newExam) {
            if (!this.isSaved) {
                return;
            }
            const formData = new FormData();

            Object.entries(newExam).forEach(([key, value]) => {
                if (key !== 'questions') {
                    formData.append(key, value ?? '');
                }
            });

            const questionsCopy = newExam.questions.map((q, qIndex) => {
                const metadataOnly = q.attachments?.map((file, fIndex) => ({
                    placeholderField: `file_q${qIndex}_${fIndex}`,
                    name: file.name,
                    type: file.type,
                    size: file.size
                })) || [];

                return {
                    ...q,
                    attachments: metadataOnly
                };
            });
            formData.append('questions', JSON.stringify(questionsCopy));


            newExam.questions.forEach((q, qIndex) => {
                q.attachments?.forEach((file, fIndex) => {
                    if (file && file.name && file.size && file.type) {
                        formData.append(`file_q${qIndex}_${fIndex}`, file);
                    }
                });
            });


            try {
                await ExamService.updateExam(this.$route.params.id, formData, true);
                EventBus.emit('show-notification', { type: "success" });
            } catch (error) {
                EventBus.emit('show-notification', { content: error, type: "error" });
            }
            this.isSaved = false;

        },

    }
};