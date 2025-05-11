import {DataEmitterService} from "@/services/DataEmiterService.js";
import UserService from "@/services/UserService.js";
import {useStore} from 'vuex';
import UserEdit from "@/pages/user-details/user-edit/UserEdit.vue"
import {isProxy, toRaw} from "vue";
import SnippetsService from "@/services/SnippetsService.js";
import StorageService, {LANGUAGE_KEY} from "@/services/StorageService.js";
import {EventBus} from "@/eventBus.js";

export default {
    name: 'UserDetails',
    store: '',
    isSaved: false,
    showMain: false,
    computed: {
        userDataToShow() {
            return this.updatedUserData ? this.updatedUserData : this.selectedUser
        },
    },
    data() {
        const snippets = SnippetsService.getSnippetsByNamespaceAndLanguage('User', StorageService.getFromStorage(LANGUAGE_KEY) || 'de')

        return {
            userSnippet: snippets ?? {},
            selectedUser: '',
            showMain: true,
            updatedUserData: ''
        }
    },

    components: {
        UserEdit
    },

    async mounted() {
        this.store = useStore();

        await this.getUserApi();
        DataEmitterService.$on('get-user-data', this.getUserApi);
    },
    methods: {
        showComponent(componentName) {
            switch (componentName) {
                case 'Main':
                    this.showMain = true;
                    break;
            }
        },
        async getUserApi() {
            this.selectedUser = await UserService.getUserById(this.$route.params.id);

        },

        storeUpdatedUserData(data) {
            this.updatedUserData = data;
        },

        async save() {
            this.isSaved = true;
            const user = this.updatedUserData ? this.updatedUserData : this.selectedUser;

            await this.updateUser(user);

        },

        async updateUser(newUser) {
            if (!this.isSaved) {
                return;
            }
            try {
                await UserService.updateUser(this.$route.params.id, newUser);
                EventBus.emit('show-notification', { type: "success"});

            } catch (error) {
                EventBus.emit('show-notification', {content: error, type: "error"});

            }
            this.isSaved = false;
        },

    }
};