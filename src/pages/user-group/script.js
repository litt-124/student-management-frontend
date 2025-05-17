
import { defineComponent } from 'vue';
import PopupComponent from '@/components/popup/PopupView.vue';
import UserGroupService from '@/services/UserGroupService.js';
import SnippetsService from '@/services/SnippetsService.js';
import StorageService, { LANGUAGE_KEY } from '@/services/StorageService.js';
import { EventBus } from '@/eventBus.js';
import UserService from "../../services/UserService.js";

export default defineComponent({
    components: { PopupComponent },
    data() {
        const snippets = SnippetsService.getSnippetsByNamespaceAndLanguage('UserGroup', StorageService.getFromStorage(LANGUAGE_KEY) || 'en') ?? {};
        return {
            groupSnippet: snippets,
            groups: [],
            groupName: '',
            groupDescription: '',
            editingId: null,
            nameIsValid: true,
            searchText: '',
            showPopup: false,
            showDeletePopup: false,
            toDeleteGroup: null,
            serverItemsLength: 0,
            selectedUserId: null,
            users: [],
            selectedMembers: [],
            serverOptions: {
                page: 1,
                rowsPerPage: 25,
                sortBy: 'id',
                sortType: 'desc'
            },
            headers: [
                { text: snippets.name, value: 'name', sortable: true },
                { text: snippets.description, value: 'description', sortable: false },
                { text: snippets.actions, value: 'actions' }
            ]
        };
    },
    computed: {
        popupTitle() {
            return this.editingId ? this.groupSnippet.editGroup : this.groupSnippet.addGroup;
        }
    },
    mounted() {
        this.loadFromServer(this.serverOptions);
        this.loadUsers();
    },
    methods: {
        async loadUsers() {
            const { users } = await UserService.getUserList(0, 100);
            this.users = users.map(u => ({
                ...u,
                id: u.id,
                fullName: `${u.firstName} ${u.lastName}`
            }));
        },
        async loadFromServer(options) {
            this.serverOptions = { ...options };
            const { userGroups, count } = await UserGroupService.getGroupList(0, 100, this.searchText.trim());
            this.groups = userGroups;
            this.serverItemsLength = count;
        },
        searchGroups() {
            this.loadFromServer(this.serverOptions);
        },
        toggleAddPopup() {
            this.editingId = null;
            this.groupName = '';
            this.selectedMembers = [];
            this.groupDescription = '';
            this.selectedUserId = null;
            this.nameIsValid = true;
            this.showPopup = true;
        },
        async editGroup(item) {
            const group = await UserGroupService.getGroupById(item.id);
            console.log(group);
            this.editingId = group._id;
            this.groupName = group.name;
            this.selectedMembers = group.members || [];
            this.groupDescription = group.description;
            this.selectedUserId = group.userId || null;
            this.showPopup = true;
        },
        closePopup() {
            this.showPopup = false;
            this.editingId = null;
        },
        async saveGroup() {
            this.nameIsValid = !!this.groupName.trim();
            if (!this.nameIsValid) return;
            const payload = {
                name: this.groupName,
                description: this.groupDescription,
                userId: this.selectedUserId || null,
                members: this.selectedMembers.map(u => u.id)
            };

            try {
                if (this.editingId) {
                    await UserGroupService.updateGroup(this.editingId, payload);
                } else {
                    await UserGroupService.createGroup(payload);
                }

                this.closePopup();
                this.loadFromServer(this.serverOptions);
                EventBus.emit('show-notification', { type: 'success' });

            } catch (e) {
                EventBus.emit('show-notification', { type: 'error', content: e.message });
            }
        },
        prepareDelete(item) {
            this.toDeleteGroup = item;
            this.showDeletePopup = true;
        },
        cancelDelete() {
            this.showDeletePopup = false;
        },
        async confirmDelete() {
            try {
                await UserGroupService.deleteGroup(this.toDeleteGroup.id);
                this.groups = this.groups.filter(g => g.id !== this.toDeleteGroup.id);
                this.serverItemsLength--;
                this.cancelDelete();
                EventBus.emit('show-notification', { type: 'success' });
            } catch (e) {
                EventBus.emit('show-notification', { type: 'error', content: e.message });
            }
        }
    }
});