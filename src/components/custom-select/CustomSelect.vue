<template>
  <div class="custom-select form-control body4" :class="{'has-error': !selectedTypeIsValid}" ref="CustomSelect" @click="toggleDropdown">
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
import script from './script.js';

export default {
  ...script,
};
</script>

<style scoped>

.custom-select {
  position: relative;
  width: 200px;
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
  font-size: 15px;
}

.options {
  position: absolute;
  z-index: 9;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.options li {
  padding: 15px;
  cursor: pointer;
}

.options li:hover {
  background-color: #f0f0f0;
}

</style>
