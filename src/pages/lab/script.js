import { defineComponent } from 'vue';
import LabService from '@/services/LabService.js';
import PopupComponent from '@/components/popup/PopupView.vue';
import SnippetsService from '@/services/SnippetsService.js';
import StorageService, { LANGUAGE_KEY } from '@/services/StorageService.js';
import { EventBus } from '@/eventBus.js';

export default defineComponent({
    components: {
        PopupComponent
    },
    data() {
        const snippets = SnippetsService.getSnippetsByNamespaceAndLanguage('Lab', StorageService.getFromStorage(LANGUAGE_KEY) || 'en') ?? {};
        return {
            labSnippet: snippets,
            searchText: '',
            labs: [],
            labName: '',
            nameIsValid: true,
            showAddPopup: false,
            showDeletePopup: false,
            toDeleteLab: null,
            labId: null,
            serverItemsLength: 0,
            serverOptions: {
                page: 1,
                rowsPerPage: 25,
                sortBy: 'id',
                sortType: 'desc',
            },
            headers: [
                { text: snippets.name, value: 'name', sortable: true },
                { text: snippets.actions, value: 'actions' }
            ]
        };
    },
    mounted() {
        this.loadFromServer(this.serverOptions);
    },
    methods: {
        async loadFromServer(options) {
            this.serverOptions = { ...options };
            try {
                const { labs, count } = await LabService.getLabList(0, 100, this.searchText.trim());
                this.labs = labs;
                this.serverItemsLength = count;
            } catch (error) {
                EventBus.emit('show-notification', { type: 'error', content: error.message });
            }
        },

        toggleAddLabPopup() {
            this.labId = null;
            this.labName = '';
            this.nameIsValid = true;
            this.showAddPopup = !this.showAddPopup;
        },

        async addLab() {
            this.nameIsValid = !!this.labName.trim();
            if (!this.nameIsValid) return;

            try {
                if (this.labId) {
                    await LabService.updateLab(this.labId, { name: this.labName });
                } else {
                    await LabService.createLab({ name: this.labName });
                }

                this.toggleAddLabPopup();
                this.loadFromServer(this.serverOptions);
                EventBus.emit('show-notification', { type: 'success' });
            } catch (e) {
                EventBus.emit('show-notification', { type: 'error', content: e.message });
            }
        },
        async editItem(item) {
            try {
                const lab = await LabService.getLabById(item.id);
                this.labName = lab.name;
                this.labId = lab._id;
                this.showAddPopup = true;
            } catch (e) {
                EventBus.emit('show-notification', { type: 'error', content: e.message });
            }
        },
        deleteItem(lab) {
            this.toDeleteLab = lab;
            this.showDeletePopup = true;
        },

        deleteReject() {
            this.showDeletePopup = false;
        },

        async deleteConfirm() {
            try {
                console.log(this);
                await LabService.deleteLab(this.toDeleteLab.id);
                this.labs = this.labs.filter(lab => lab.id !== this.toDeleteLab.id);
                this.serverItemsLength--;
                this.showDeletePopup = false;
                EventBus.emit('show-notification', { type: 'success' });
            } catch (e) {
                EventBus.emit('show-notification', { type: 'error', content: e.message });
            }
        },

        searchLab() {
            this.loadFromServer(this.serverOptions);
        }
    }
});