import ExamService from '@/services/ExamService';
import SnippetsService from '@/services/SnippetsService';
import StorageService, { LANGUAGE_KEY } from '@/services/StorageService';

export default {
    name: 'UserDashboard',
    data() {
        const snippet = SnippetsService.getSnippetsByNamespaceAndLanguage('HomePage', StorageService.getFromStorage(LANGUAGE_KEY) || 'en');
        return {
            snippet: snippet ?? {},
            upcomingExams: [],
            loading: true
        };
    },
    async mounted() {
        this.loading = true;
        try {
            const data = await ExamService.getMyUpcomingExams();
            this.upcomingExams = data.exams??[];
        } catch (e) {
            console.error('Failed to load upcoming exams', e);
        } finally {
            this.loading = false;
        }
    },
    methods: {
        formatDateTime(datetime) {
            const d = new Date(datetime);
            return d.toLocaleString();
        }
    }
};