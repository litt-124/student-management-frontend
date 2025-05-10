import { ref, computed, onMounted, onUnmounted } from 'vue';
import {EventBus} from '@/eventBus';

export default {
    name: "PopupNotification",
    setup() {
        const icons = {
            success: '#icon-success',
            error: '#icon-error',
            info: '#icon-important',
        };
        const titles = {
            success: 'Success',
            error: 'Failure ',
            info: 'Info',
        };
        const shown = ref(false);
        const content = ref('');
        const type = ref('');
        const autoClose = ref(true); // Default behavior is to auto-close

        const iconHref = computed(() => icons[type.value]);
        const title = computed(() => titles[type.value]);

        const togglePopup = () => {
            shown.value = !shown.value;
        };

        const showNotification = (notificationData) => {
            type.value = notificationData.type;
            content.value = notificationData.content;
            autoClose.value = notificationData.autoClose !== undefined ? notificationData.autoClose : true;

            if (notificationData.title) {
                titles[type.value] = notificationData.title; // Make sure this updates the computed title correctly
            }
            shown.value = true;

            if (autoClose.value) {
                // Automatically close the notification after 3 seconds if autoClose is true
                setTimeout(() => {
                    if (shown.value) { // Check if it's still shown before hiding
                        shown.value = false;
                    }
                }, 3000);
            }
        };

        // Function to hide the notification
        const closeNotification = () => {
            shown.value = false;
        };


        onMounted(() => {
            EventBus.on('show-notification', showNotification);
            EventBus.on('close-notification', closeNotification);
        });

        onUnmounted(() => {
            EventBus.off('show-notification', showNotification);
            EventBus.off('close-notification', closeNotification);
        });

        return {shown, title, content, iconHref, togglePopup};
    },
};