
import SnippetsService from '@/services/SnippetsService';
import StorageService, {LANGUAGE_KEY} from '@/services/StorageService';
export default {
    data() {
        const snippets = SnippetsService.getSnippetsByNamespaceAndLanguage('HomePage', StorageService.getFromStorage(LANGUAGE_KEY) || 'en')
        return {
            homePageSnippet: snippets ?? {},
        };
    },

    methods: {

    },


};
