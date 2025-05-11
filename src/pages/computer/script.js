
import { defineComponent } from 'vue';
import PopupComponent from '@/components/popup/PopupView.vue';
import LabService from '@/services/LabService.js';
import ComputerService from '@/services/ComputerService.js';
import SnippetsService from '@/services/SnippetsService.js';
import StorageService, { LANGUAGE_KEY } from '@/services/StorageService.js';
import { EventBus } from '@/eventBus.js';

export default defineComponent({
    components: { PopupComponent },
    data() {
        const snippets = SnippetsService.getSnippetsByNamespaceAndLanguage('Computer', StorageService.getFromStorage(LANGUAGE_KEY) || 'en') ?? {};
        return {
            computerSnippet: snippets,
            searchText: '',
            computers: [],
            labs: [],
            selectedLabId: null,
            computerName: '',
            computerIp: '',
            editingId: null,
            nameIsValid: true,
            ipIsValid: true,
            showPopup: false,
            showDeletePopup: false,
            toDeleteComputer: null,
            serverItemsLength: 0,
            serverOptions: {
                page: 1,
                rowsPerPage: 25,
                sortBy: 'id',
                sortType: 'desc'
            },
            headers: [
                { text: snippets.name, value: 'name', sortable: true },
                { text: snippets.ipAddress, value: 'ipAddress', sortable: true },
                { text: snippets.lab, value: 'labName', sortable: false },
                { text: snippets.actions, value: 'actions' }
            ]
        };
    },
    mounted() {
        this.loadLabs();
        this.loadFromServer(this.serverOptions);
    },
    computed: {
        popupTitle() {
            return this.editingId ? this.computerSnippet.editComputer : this.computerSnippet.addComputer;
        }
    },
    methods: {
        async loadFromServer(options) {
            this.serverOptions = { ...options };
            const { computers, count } = await ComputerService.getComputerList(0, 100, this.searchText.trim());
            this.computers = computers;
            this.serverItemsLength = count;
        },
        async loadLabs() {
            const { labs } = await LabService.getLabList(0, 100);
            this.labs = labs;
        },
        searchComputer() {
            this.loadFromServer(this.serverOptions);
        },
        toggleAddComputerPopup() {
            this.editingId = null;
            this.computerName = '';
            this.computerIp = '';
            this.selectedLabId = null;
            this.nameIsValid = true;
            this.ipIsValid = true;
            this.showPopup = true;
        },
        async editComputer(item) {
            const comp = await ComputerService.getComputerById(item.id);
            this.editingId = comp._id;
            this.computerName = comp.name;
            this.computerIp = comp.ipAddress;
            this.selectedLabId = comp.labId || null;
            this.showPopup = true;
        },
        closePopup() {
            this.showPopup = false;
            this.editingId = null;
        },
        async saveComputer() {
            this.nameIsValid = !!this.computerName.trim();
            this.ipIsValid = !!this.computerIp.trim();
            if (!this.nameIsValid || !this.ipIsValid) return;
            try {
                if (this.editingId) {
                    await ComputerService.updateComputer(this.editingId, {
                        name: this.computerName,
                        ipAddress: this.computerIp,
                        labId: this.selectedLabId || null
                    });
                } else {
                    await ComputerService.createComputer({
                        name: this.computerName,
                        ipAddress: this.computerIp,
                        labId: this.selectedLabId || null
                    });
                }
                this.closePopup();
                this.loadFromServer(this.serverOptions);
                EventBus.emit('show-notification', { type: 'success' });
            } catch (e) {
                EventBus.emit('show-notification', { type: 'error', content: e.message });
            }
        },
        prepareDelete(item) {
            this.toDeleteComputer = item;
            this.showDeletePopup = true;
        },
        cancelDelete() {
            this.showDeletePopup = false;
        },
        async confirmDelete() {
            try {
                await ComputerService.deleteComputer(this.toDeleteComputer.id);
                this.computers = this.computers.filter(c => c.id !== this.toDeleteComputer.id);
                this.serverItemsLength--;
                this.cancelDelete();
                EventBus.emit('show-notification', { type: 'success' });
            } catch (e) {
                EventBus.emit('show-notification', { type: 'error', content: e.message });
            }
        }
    }
});