import {DataEmitterService} from '@/services/DataEmiterService'
import AuthenticationService from "@/services/AuthenticationService.js";
import UserService from "@/services/UserService.js";
import StorageService, {LANGUAGE_KEY} from "@/services/StorageService.js";
import SnippetsService from "@/services/SnippetsService.js";
import {watch} from "vue";

export default {

    data() {
        const snippets = SnippetsService.getSnippetsByNamespaceAndLanguage('Header', StorageService.getFromStorage(LANGUAGE_KEY) || 'de')
        return {
            name: 'Header',
            headerSnippet: snippets ?? {},
            showLoader: false,
            isUserAdmin: false,
            isMenuOpen: false, // Menu visibility flag
            windowWidth: window.innerWidth, // From max-width 1124, the dashboard filter buttons are not visible
            subscription: null,
        }
    },
    computed: {
        isDashboard() {
            return this.$route.path.includes('dashboard');
        },
        isNarrowScreen() {
            return this.windowWidth <= 1124;
        },

    },
    methods: {
        updateWindowWidth() {
            this.windowWidth = window.innerWidth; // Update window width on resize
        },
        async logout() {
            try {
                await AuthenticationService.logOut();
            } catch (error) {
                console.error('Authentication error:', error);
            }
        },

        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        handleClickOutside(event) {
            if (this.isMenuOpen && (!event.target.closest('.f_dropdown-menu'))) {
                this.isMenuOpen = false;
            }
        },
    },
    async created() {
        this.updateWindowWidth();
        window.addEventListener('resize', this.updateWindowWidth);
        window.addEventListener('click', this.handleClickOutside);
        this.isUserAdmin = await UserService.isUserAdmin();

        let loader;
        DataEmitterService.$on('showLoader', data => {
            clearTimeout(loader);
            loader = setTimeout(() => {
                this.showLoader = data;
            }, 500)
        })

    },
    mounted() {

    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateWindowWidth);
        window.addEventListener('click', this.handleClickOutside);
        //this.subscription();
    },
};


