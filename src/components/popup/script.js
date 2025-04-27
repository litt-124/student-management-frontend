import {EventBus} from "@/eventBus";
import SnippetsService from "@/services/SnippetsService.js";
import StorageService, {LANGUAGE_KEY} from "@/services/StorageService.js";

export default {
    props: {
        isVisible: Boolean,
        title: String,
        icon: String,
        classList: {
            type: Array,
            default: () => [],
        },
        fasIcon: String,
        shareLink: {
            type: String,
            default: null,
        },
    },
    data() {
        const snippets = SnippetsService.getSnippetsByNamespaceAndLanguage('Popup', StorageService.getFromStorage(LANGUAGE_KEY) || 'de')

        return {
            snippet: snippets ?? {},

        }
    },
    methods: {
        copyShareLink() {
            if (this.shareLink) {
                navigator.clipboard.writeText(this.shareLink).then(() => {
                    EventBus.emit('show-notification', {
                        content: this.snippet.copiedSuccessfully,
                        type: "success"
                    });
                }).catch(err => {
                    console.error('Failed to copy the link:', err);
                });
            }
        }
    }
};