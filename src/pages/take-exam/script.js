import ExamService from '@/services/ExamService';
import AnswerService from '@/services/AnswerService';
import StudentActivityService from '@/services/StudentActivityService';

export default {
    name: 'TakeExamView',
    data() {
        return {
            exam: {},
            answers: {},
            studentActivityId: null
        };
    },
    async mounted() {
        const examId = this.$route.params.id;
        this.exam = await ExamService.getExamById(examId);

// Create student activity
        const activity = await StudentActivityService.createActivity({ examId });
        this.studentActivityId = activity._id;

// 🛡️ Prepare answer objects for each question
        this.exam.questions.forEach(q => {
            this.answers[q._id] = {
                value: '',
                attachments: []
            };
        });
console.log(this.answers)
        this.loading = false;
    },
    methods: {
        handleFileUpload(event, questionId) {
            const files = Array.from(event.target.files);
            this.answers[questionId].attachments = files;
        },

        async submitAnswers() {
            const formData = new FormData();
            const answerList = [];

            Object.entries(this.answers).forEach(([questionId, answer], index) => {
                answerList.push({
                    questionId,
                    value: answer.value,
                    attachmentKeys: answer.attachments.map((_, i) => `file_q${index}_${i}`)
                });

                answer.attachments.forEach((file, fIndex) => {
                    formData.append(`file_q${index}_${fIndex}`, file);
                });
            });

            formData.append('answers', JSON.stringify(answerList));
            formData.append('examId', this.exam._id);
            formData.append('studentActivityId', this.studentActivityId);

            await AnswerService.submitAnswers(formData);
            this.$router.push('/home-page');
        }
    }
};