import { DataEmitterService } from "@/services/DataEmiterService.js";
import SnippetsService from "@/services/SnippetsService.js";
import StorageService, { LANGUAGE_KEY } from "@/services/StorageService.js";
import UserService from "@/services/UserService.js";
import LabService from "@/services/LabService.js";
import UserGroupService from "@/services/UserGroupService.js";

export default {
    name: 'ExamEdit',
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
            users: [],
            labs: [],
            userGroups: []
        };
    },
    async mounted() {
        DataEmitterService.$emit('showLoader', true);
        await this.loadUsers();
        await this.loadLabs();
        await this.loadGroups();
        DataEmitterService.$emit('showLoader', false);
    },
    methods: {
        async loadUsers() {
            try {
                const { users } = await UserService.getUserList(0, 100);
                this.users = users;
            } catch (e) {
                console.error('Failed to load users', e);
            }
        },
        async loadLabs() {
            try {
                const { labs } = await LabService.getLabList(0, 100);
                this.labs = labs;
            } catch (e) {
                console.error('Failed to load labs', e);
            }
        },
        async loadGroups() {
            try {
                const { userGroups } = await UserGroupService.getGroupList(0, 100);
                this.userGroups = userGroups;
            } catch (e) {
                console.error('Failed to load groups', e);
            }
        },
        formattedDate(datetime) {
            if (!datetime) return '';
            const date = new Date(datetime);
            const iso = date.toISOString(); // "2025-05-29T12:16:00.000Z"
            return iso.slice(0, 16); // keep only "2025-05-29T12:16"
        }
    }
};
