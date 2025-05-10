import AuthenticationService from '@/services/AuthenticationService';

import SnippetsService from '@/services/SnippetsService';
import StorageService, {LANGUAGE_KEY} from '@/services/StorageService';
import {EventBus} from "@/eventBus.js";

export default {
    data() {
        const snippets = SnippetsService.getSnippetsByNamespaceAndLanguage('Login', StorageService.getFromStorage(LANGUAGE_KEY) || 'en')

        return {
            loginSnippet: snippets ?? {},
            isPasswordVisible: false,
            emailIsValid: true,
            passwordIsValid: true,
            submitted: false,
            showError: false,
            isEmailFocused: false,
            isPasswordFocused: false,
        };
    },

    methods: {
        async login() {
            this.emailIsValid = this.validateEmail(this.email);
            this.passwordIsValid = this.validatePassword(this.password);

            if (this.emailIsValid !== true || this.passwordIsValid !== true) {
                return;
            }

            this.submitted = true;
            this.showError = false;

            const authenticationData = {
                email: this.email,
                password: this.password,
            };
            try {
                const isAuthenticated = await AuthenticationService.signIn(authenticationData);

                if (isAuthenticated) {
                    this.submitted = false;
                    this.showError = false;
                    await this.$router.push('/home-page');
                    this.$store.dispatch('user/fetchIsUserAdmin');
                } else {
                    this.submitted = false;
                    this.showError = true;
                }
            } catch (error) {
                EventBus.emit('show-notification', {
                    type: 'error',
                    content: error,
                });
            }
        },

        showPassword() {
            this.isPasswordVisible = !this.isPasswordVisible;
        },
        forceLowercase(event) {
            event.target.value = event.target.value.toLowerCase();
            this.email = event.target.value;
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

    },

    setup() {
        const email = '';
        const password = '';

        return {
            email,
            password,
        };
    },
};
