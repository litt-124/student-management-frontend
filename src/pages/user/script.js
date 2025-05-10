import {defineComponent, ref} from "vue";
import PopupComponent from '@/components/popup/PopupView.vue';
import CustomSelect from '@/components/custom-select/custom-select.vue';
import SnippetsService from "@/services/SnippetsService.js";
import StorageService, {LANGUAGE_KEY} from "@/services/StorageService.js";
import UserService from "@/services/UserService.js";
import {DataEmitterService} from "@/services/DataEmiterService.js";
import {EventBus} from "@/eventBus.js";

export default defineComponent({
    components: {
        PopupComponent,
        CustomSelect
    },
    data() {
        const snippets = SnippetsService.getSnippetsByNamespaceAndLanguage('User', StorageService.getFromStorage(LANGUAGE_KEY) || 'en')?? {}
        console.log(snippets);
        return {
            userSnippet: snippets ,
            isPasswordVisible: false,
            submitted: false,
            showError: false,
            showAddPopup: false,
            showDeletePopup: false,
            firstNameIsValid: true,
            lastNameIsValid: true,
            selectedTypeIsValid: true,
            userNameIsValid: true,
            emailIsValid: true,
            passwordIsValid: true,
            searchText: '',
            toDeleteUser: '',
            options: [
                {value: 'admin', label: 'Admin'},
                {value: 'student', label: 'Student'},
                {value: 'teacher', label: 'Teacher'},
            ],
            headers: [
                {text: snippets.type, value: "type", sortable: true},
                {text: snippets.firstName, value: "firstName", sortable: true},
                {text: snippets.lastName, value: "lastName", sortable: true},
                {text: snippets.email, value: "email", sortable: true},
                {text: snippets.username, value: "username", sortable: true},
                {text: snippets.actions, value: "actions",}
            ],
            users: [],
            serverOptions: {
                page: 1,
                rowsPerPage: 25,
                sortBy: 'id',
                sortType: 'desc',
            },
            loading: false,
            serverItemsLength: 10,
        };
    },

    mounted() {
        this.loadFromServer(this.serverOptions);
    },
    methods: {

        deleteReject() {
            this.showDeletePopup = false;
        },
        async deleteConfirm() {
            try {
                const deletedUser = await UserService.deleteUser(this.toDeleteUser.id);
                if (deletedUser) {
                    this.users = this.users.filter(user => user.id !== this.toDeleteUser.id);
                    this.serverItemsLength--;
                    this.showDeletePopup = false;
                }
                EventBus.emit('show-notification', { type: "success"});

            }catch (error){
                EventBus.emit('show-notification', {content: error, type: "error"});

            }

        },

        searchUser() {
            this.loadFromServer(this.serverOptions);
        },

        async loadFromServer(options) {
            // Update serverOptions with new pagination options
            this.serverOptions = {...options};
            // Fetch data from server using pagination options
            this.loading = true;
            try {
                const {users, totalCount} = await this.getTableData();
                console.log(users)
                this.users = users;
                this.serverItemsLength = totalCount; // Update total server items
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                this.loading = false;
            }
        },

        toggleAddUserPopup() {
            this.initiateFormValues()
            this.showAddPopup = !this.showAddPopup;
        },

        editItem(user) {
            this.$router.push('/user-details/' + user.id);
            DataEmitterService.$emit('user-details', JSON.stringify(user));
        },


        deleteItem(item) {
            this.toDeleteUser = item;
            this.showDeletePopup = !this.showDeletePopup;
        },

        handleSelectedOption(option) {
            if (option && option.value) {
                this.selectedType = option.value;
            }
        },

        initiateFormValues() {
            this.firstName = '';
            this.lastName = '';
            this.selectedType = '';
            this.email = ' ';
            this.userName = '';
            this.password = '';
            // Set validation states
            this.firstNameIsValid = true;
            this.lastNameIsValid = true;
            this.selectedTypeIsValid = true;
            this.emailIsValid = true;
            this.userNameIsValid = true;
            this.passwordIsValid = true;
        },

        async addUser() {
            this.firstNameIsValid = this.validateName(this.firstName);
            this.lastNameIsValid = this.validateName(this.lastName);
            this.selectedTypeIsValid = this.validateType(this.selectedType);
            this.userNameIsValid = this.validateUserName(this.userName);
            this.emailIsValid = this.validateEmail(this.email);
            this.passwordIsValid = this.validatePassword(this.password);

            if (!this.firstNameIsValid || !this.lastNameIsValid || !this.selectedTypeIsValid || !this.userNameIsValid || !this.emailIsValid || !this.passwordIsValid) {
                return;
            }

            this.submitted = true;
            this.showError = false;

            const data = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                username: this.userName,
                active: true,
                type: this.selectedType,
            };
            try {
                const isUserAdded = await UserService.addUser(data);

                if (isUserAdded) {
                    this.submitted = false;
                    this.showError = false;
                    this.toggleAddUserPopup();
                    this.loadFromServer(this.serverOptions);
                    EventBus.emit('show-notification', {type: "success"});

                } else {
                    this.submitted = false;
                    this.showError = true;
                }
            } catch (error) {
                EventBus.emit('show-notification', {content: error, type: "error"});
            }
        },

        async getTableData() {
            if (!this.serverOptions) {
                return
            }
            const {page, rowsPerPage, sortBy, sortType} = this.serverOptions;
            const startIndex = (page - 1) * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;

            // Simulate fetching data from server (replace with actual API call)
            const {users, totalCount} = await UserService.getUserList(startIndex, endIndex, this.searchText.trim());

            return {users, totalCount};
        },

        showPassword() {
            this.isPasswordVisible = !this.isPasswordVisible;
        },

        validateEmail: function (v) {

            if (!v) {
                return false;
            }

            return !!v.match(/^.*.{1,}@.*.{1,}\..*.{1,}/);
        },

        validatePassword: function (v) {
            if (!v) {
                return false;
            }
            return (v && v.length > 6);
        },
        validateName: function (v) {
            return !!v && v.trim().length > 0;
        },

        validateType: function (v) {
            return !!v && v.trim().length > 0;
        },

        validateUserName: function (v) {
          return true;
        },
    },
});
