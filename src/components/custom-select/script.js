export default {
    props: {
        options: {
            type: Array,
            required: true
        },
        value: {
            type: Object,
            default: null
        },
        selectedTypeIsValid:{
            type: Boolean,
            default: true
        },
        placeholder: {
            type: String,
            default: "Select an option"
        }
    },
    watch: {
        value(newValue) {
            this.selectedOption = newValue;
        }
    },
    data() {
        return {
            selectedOption: this.value,
            isOpen: false
        };
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        selectOption(option) {
            this.selectedOption = option;
            this.isOpen = false;
            if(this.$emit){
                this.$emit('selected', option);
            }
        },
        closeDropdown(event) {
            if (!this.$refs.CustomSelect.contains(event.target)) {
                this.isOpen = false;
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.closeDropdown);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.closeDropdown);
    }
};