<template>
  <div class="main-page">
    <h2>{{ userSnippet.mainPageTitle }}</h2>
    <form class="form">
      <div class="form-field">
        <label class="form-label body4" for="firstName"> {{ userSnippet.firstName }}</label>
        <input
            id="firstName"
            class="form-control body4"
            :class="{ 'has-error': !firstNameIsValid }"
            type="text"
            v-model="user.firstName"
            @change="sendUserDataToParent"
            placeholder=""/>
      </div>
      <div class="form-field">
        <label class="form-label body4" for="lastName"> {{ userSnippet.lastName }}</label>
        <input
            id="lastName"
            class="form-control body4"
            :class="{ 'has-error': !lastNameIsValid}"
            type="text"
            v-model="user.lastName"
            @change="sendUserDataToParent"
            placeholder=""/>
      </div>
      <div class="form-field type">
        <label class="form-label body4" for="lastName"> {{ userSnippet.type }}</label>
        <CustomSelect
            :options="options"
            :selectedTypeIsValid="selectedTypeIsValid"
            :value="{label: user.type, value: user.type}"
            @selected="handleSelectedOption"
        />
      </div>
      <div class="form-field">
        <div class="form-field">
          <label class="form-label body4" for="email"> {{ userSnippet.email }}</label>
          <input
              id="email"
              class="form-control body4"
              :class="{ 'has-error': !emailIsValid}"
              type="text"
              v-model="user.email"
              @change="sendUserDataToParent"
              placeholder=""/>
        </div>
      </div>

      <div class="form-group">
        <div class="form-field password-form-field">
          <label class="form-label body4" for="password">{{ userSnippet.password }}</label>
          <input id="password"
                 class="form-control body4"
                 :class="{ 'has-error': !passwordIsValid }"
                 :type="'text'"
                 @change="sendUserDataToParent"
                 v-model="user.password"
                 placeholder=""/>
        </div>
      </div>

    </form>
  </div>
</template>
<script>
import script from './script.js';

export default {
  ...script,
};
</script>

<style lang="scss">
@import '@/styles/components/user/user-details-edit.scss';
</style>