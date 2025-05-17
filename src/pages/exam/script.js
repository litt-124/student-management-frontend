import ExamService from '@/services/ExamService';
import PopupComponent from '@/components/popup/PopupView.vue';
import SnippetsService from '@/services/SnippetsService';
import StorageService, { LANGUAGE_KEY } from '@/services/StorageService';
import { EventBus } from '@/eventBus.js';
import UserService from '@/services/UserService';
import LabService from '@/services/LabService';
import UserGroupService from '@/services/UserGroupService';
import {DataEmitterService} from "../../services/DataEmiterService.js";

export default {
    components: { PopupComponent },
    data() {
        const snippet = SnippetsService.getSnippetsByNamespaceAndLanguage('Exam', StorageService.getFromStorage(LANGUAGE_KEY) || 'en');
        return {
            snippet,
            exams: [],
            users: [],
            labs: [],
            userGroups: [],
            searchText: '',
            totalCount: 0,
            showDeletePopup: false,
            showAddPopup: false,
            toDeleteExam: null,
            form: {
                title: '',
                userGroupId: null,
                userId: null,
                labId: null,
                status: 'draft',
                startTime: '',
                endTime: ''
            },
            serverOptions: {
                page: 1,
                rowsPerPage: 25,
                sortBy: 'startTime',
                sortType: 'desc'
            },
            headers: [
                { text: snippet.title, value: 'title' },
                { text: snippet.status, value: 'status' },
                { text: snippet.startTime, value: 'startTime' },
                { text: snippet.endTime, value: 'endTime' },
                { text: snippet.actions, value: 'actions' }
            ]
        };
    },
    mounted() {
        this.loadFromServer(this.serverOptions);
        this.loadUsers();
        this.loadLabs();
        this.loadGroups();
    },
    methods: {
        async loadFromServer(options) {
            const { exams, count } = await ExamService.getExamList(0, 100, this.searchText.trim());
            this.exams = exams;
            this.totalCount = count;
        },
        async loadUsers() {
            const { users } = await UserService.getUserList(0, 100);
            this.users = users;
        },
        async loadLabs() {
            const { labs } = await LabService.getLabList(0, 100);
            this.labs = labs;
        },
        async loadGroups() {
            const { userGroups } = await UserGroupService.getGroupList(0, 100);
            this.userGroups = userGroups;
        },
        search() {
            this.loadFromServer(this.serverOptions);
        },
        toggleAddPopup() {
            this.form = {
                title: '',
                userGroupId: null,
                userId: null,
                labId: null,
                status: 'draft',
                startTime: '',
                endTime: ''
            };
            this.showAddPopup = true;
        },
        closeAddPopup() {
            this.showAddPopup = false;
        },
        async submitAddExam() {
            try {
                await ExamService.createExam({ ...this.form });
                this.closeAddPopup();
                this.loadFromServer(this.serverOptions);
                EventBus.emit('show-notification', { type: 'success' });
            } catch (error) {
                EventBus.emit('show-notification', { type: 'error', content: error.message });
            }
        },
        editExam(exam) {
            this.$router.push('/exam-details/' + exam.id);
            console.log(exam)
            DataEmitterService.$emit('exam-details', JSON.stringify(exam));
        },
        prepareDelete(item) {
            this.toDeleteExam = item;
            this.showDeletePopup = true;
        },
        cancelDelete() {
            this.showDeletePopup = false;
        },
        async confirmDelete() {
            try {
                await ExamService.deleteExam(this.toDeleteExam.id);
                this.exams = this.exams.filter(e => e.id !== this.toDeleteExam.id);
                this.totalCount--;
                this.cancelDelete();
                EventBus.emit('show-notification', { type: 'success' });
            } catch (error) {
                EventBus.emit('show-notification', { type: 'error', content: error.message });
            }
        }
    }
};