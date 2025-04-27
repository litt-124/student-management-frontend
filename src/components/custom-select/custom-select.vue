<template>
  <div class="custom-select form-control body4" :class="{'has-error': !selectedRoleIsValid}" ref="customSelect" @click="toggleDropdown">
    <div class="selected-option">{{ selectedOption ? selectedOption.label ? selectedOption.label : selectedOption : placeholder }}</div>
    <div class="arrow-icon" :class="{ 'arrow-up': isOpen, 'arrow-down': !isOpen }">
      <transition  name="fade">
      <i class="fas" :class="isOpen ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
    </transition>

  </div>
    <transition  name="fade">
    <ul class="options" v-if="isOpen" @click.stop>
      <li v-for="(option, index) in options" :key="index" @click="selectOption(option)" >
        {{ option.label }}
      </li>
    </ul>
    </transition>
  </div>
</template>

<script>
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
    selectedRoleIsValid:{
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
      if (!this.$refs.customSelect.contains(event.target)) {
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
</script>

<style scoped>

.custom-select {
  position: relative;
  width: 200px; /* Adjust as needed */
  cursor: pointer;
}

.selected-option {
  border-radius: 4px;
  background-color: #fff;
  text-transform: capitalize!important;
}

.arrow-icon {
  transition: .3s ease-in-out;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
}

.arrow-up i,
.arrow-down i {
  font-size: 10px; /* Adjust as needed */
}

.options {
  position: absolute;
  z-index: 9;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.options li {
  padding: 15px;
  cursor: pointer;
}

.options li:hover {
  background-color: #f0f0f0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
