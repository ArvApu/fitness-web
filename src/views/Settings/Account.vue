<template>

  <div class="account">

    <alerts :errors="errors"/>

    <form id='account-form' @submit.prevent="handle">

      <h2> Account information </h2>

      <div class="form-group">
        <label for="first_name">First name</label>
        <input class="form-input" v-model="user.first_name" id="first_name" type="text" placeholder="First name"/>
      </div>

      <div class="form-group">
        <label for="last_name">Last name</label>
        <input class="form-input" v-model="user.last_name" id="last_name" type="text" placeholder="Last name"/>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input class="form-input" v-model="user.email" id="email" type="email" placeholder="Email"/>
      </div>

      <form-submit-button label="Submit"/>
    </form>

    <form id='user-form' @submit.prevent="handle" v-if="user.role === 'trainer'">

      <h2> User information </h2>

      <div class="form-group">
        <label for="weight">Weight</label>
        <input class="form-input" v-model="user.weight" id="weight" type="number" placeholder="Weight"/>
      </div>

      <div class="form-group">
        <label for="birthday-u">Birthday</label>
        <flat-pickr v-model="user.birthday" :config="config" id="birthday-u" class="form-input" placeholder="Date only"/>
      </div>

      <form-submit-button label="Submit"/>
    </form>


    <form id='trainer-form' @submit.prevent="handle" v-if="user.role === 'trainer'">

      <h2> Trainer information </h2>

      <div class="form-group">
        <label for="experience">Years of experience</label>
        <input class="form-input" v-model="user.experience" id="experience" type="number" placeholder="Experience"/>
      </div>

      <div  class="form-group">
        <label for="about">About you</label>
        <textarea class='form-input-textarea' id="about" name="about" v-model="user.about" />
      </div>

      <div class="form-group">
        <label for="birthday">Birthday</label>
        <flat-pickr v-model="user.birthday" :config="config" id="birthday" class="form-input" placeholder="Date only"/>
      </div>

      <form-submit-button label="Submit"/>
    </form>
  </div>

</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'Account',
  components: {
    flatPickr,
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      config: {
        altInput: true,
        altFormat: "Y-m-d",
        dateFormat: "Y-m-d H:i:S",
        locale: {
          firstDayOfWeek: 1,
        },
      },
    }
  },
  methods: {
    handle() {

    }
  }
}
</script>

<style scoped>
.account {
  margin: 0 80px;
}

@media only screen and (max-width: 500px) {
  .account {
    margin: 0;
  }
}
</style>