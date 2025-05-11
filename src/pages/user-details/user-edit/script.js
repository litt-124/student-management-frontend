
import {DataEmitterService} from "@/services/DataEmiterService.js";
import CustomSelect from '@/components/custom-select/CustomSelect.vue';
import SnippetsService from "@/services/SnippetsService.js";
import StorageService, {LANGUAGE_KEY} from "@/services/StorageService.js";

export default {
    name: 'Main',
    saveEventHandled: false,
    components: {
        CustomSelect
    },
    props: {
        user: {
            type: Object,
            default: () => ({
                firstName: '',
                lastName: '',
                email: '',
                type: ''
            })
        }
    },
    data() {
        const snippets = SnippetsService.getSnippetsByNamespaceAndLanguage('User', StorageService.getFromStorage(LANGUAGE_KEY) || 'de')
        DataEmitterService.$emit('showLoader', false);
        return {
            userSnippet: snippets ?? {},
            options: [
                {value: 'admin', label: 'Admin'},
                {value: 'student', label: 'Student'},
                {value: 'teacher', label: 'Teacher'},
            ],
            firstNameIsValid: true,
            lastNameIsValid: true,
            selectedTypeIsValid: true,
            emailIsValid: true,
            passwordIsValid: true,
        };
    },

    methods: {
        handleSelectedOption(option) {
            if (option && option.value) {
                this.user.type = option.value;
                this.sendUserDataToParent();
            }
        },

        sendUserDataToParent() {
            this.firstNameIsValid = this.validateName(this.user.firstName);
            this.lastNameIsValid = this.validateName(this.user.lastName);
            this.emailIsValid = this.validateEmail(this.user.email);

            if (!this.firstNameIsValid || !this.lastNameIsValid || !this.selectedTypeIsValid  || !this.emailIsValid || !this.passwordIsValid) {
                this.$emit('updated-user-data', null);

                return;
            }
            this.$emit('updated-user-data', this.user);
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

        validatePhoneNumber: function (v) {
            if (!v) {
                return false;
            }
            return !!v.match(/^\+?[1-9]\d{1,14}$/);
        },
    },
};