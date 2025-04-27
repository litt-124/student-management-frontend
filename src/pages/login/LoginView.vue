<template>
  <div class='login-page'>
    <div class='login-container'>
      <div class='login-container-inner'>
        <h1 class='title'>
          {{loginSnippet.loginTitle}}
        </h1>

        <div class="description body4">{{loginSnippet.loginToAccount}}</div>

        <p v-if='showError' class='error-text body4'>
          {{loginSnippet.loginError}}
        </p>

        <form
          class="form"
          @submit.prevent='login'
        >

          <div class="row no-margin">
            <div class="col-12">
              <div class="form-group">
                                  <label class="form-label body4" for="email">{{loginSnippet.email}}</label>
                  <input
                    id="email"
                    @input="forceLowercase"
                    class="form-control body4"
                    :class="{ 'has-error': !emailIsValid }"
                    type="text"
                    v-model="email"
                    placeholder=""/>
                </div>
            </div>
          </div>

          <div class="row no-margin">
            <div class="col-12">
              <div class="form-group password-form-group">
                                  <label class="form-label body4" for="password">{{loginSnippet.password}}</label>

                  <input id="password"
                         class="form-control body4"
                         :class="{ 'has-error': !passwordIsValid }"
                         :type="isPasswordVisible ? 'text' : 'password'"
                         v-model="password"
                         placeholder=""/>

                  <div class="show-password-icon" @click="showPassword">
                    <svg v-if="!isPasswordVisible" xmlns="http://www.w3.org/2000/svg" width="21.553" height="14.023" viewBox="0 0 21.553 14.023">
                      <path
                        d="M10.78,25.31c6.368,0,10.772-5.345,10.772-7.012S17.14,11.286,10.78,11.286C4.46,11.286,0,16.623,0,18.3S4.492,25.31,10.78,25.31Zm0-2.417A4.541,4.541,0,0,1,6.328,18.3a4.45,4.45,0,1,1,8.9,0A4.534,4.534,0,0,1,10.78,22.893Zm0-2.937A1.663,1.663,0,1,0,9.159,18.3,1.648,1.648,0,0,0,10.78,19.956Z"
                        transform="translate(0 -11.286)" fill="#a8a8a8"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="21.131" height="14.026" viewBox="0 0 21.131 14.026">
                      <path
                        d="M16.584,24.469a.592.592,0,0,0,1.014-.415.6.6,0,0,0-.177-.422L4.57,10.789a.592.592,0,0,0-.422-.169.611.611,0,0,0-.591.584.567.567,0,0,0,.169.422Zm.722-2.174c2.412-1.559,3.825-3.587,3.825-4.486,0-1.559-4.263-6.529-10.562-6.529a11.641,11.641,0,0,0-3.649.591l2,2a4.136,4.136,0,0,1,1.644-.338,4.259,4.259,0,0,1,4.294,4.278,3.753,3.753,0,0,1-.361,1.636Zm-6.736,2.043a11.845,11.845,0,0,0,3.925-.668l-2.036-2.035a4.085,4.085,0,0,1-1.89.453,4.3,4.3,0,0,1-4.3-4.278,4.236,4.236,0,0,1,.453-1.92L4.048,13.2C1.513,14.761,0,16.888,0,17.81,0,19.362,4.34,24.339,10.569,24.339Zm2.443-6.69a2.432,2.432,0,0,0-2.443-2.435c-.1,0-.2.008-.292.015L13,17.948C13,17.856,13.012,17.748,13.012,17.649Zm-4.893-.015a2.457,2.457,0,0,0,2.458,2.443c.108,0,.207-.008.315-.015L8.134,17.3C8.127,17.41,8.119,17.526,8.119,17.633Z"
                        transform="translate(0 -10.62)" fill="#a8a8a8"/>
                    </svg>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="button button-primary">{{loginSnippet.login}}</button>

        </form>

      </div>

    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/components/login/login.scss';
</style>

<script>
import script from './script.js';

export default {
  ...script,
};
</script>