<template>

  <div class="account">

    <alerts :errors="errors"/>

    <form id='user-form' @submit.prevent="handle">

      <h2> User information </h2>

      <div class="form-group">
        <label for="first_name">First name</label>
        <input class="form-input" v-model="user.first_name" id="first_name" type="text" placeholder="First name"/>
      </div>

      <div class="form-group">
        <label for="last_name">Last name</label>
        <input class="form-input" v-model="user.last_name" id="last_name" type="text" placeholder="Last name"/>
      </div>

      <div class="form-group">
        <label for="birthday-u">Birthday</label>
        <flat-pickr v-model="user.birthday" :config="config" id="birthday-u" class="form-input" placeholder="Birthday"/>
      </div>

      <div class="form-group" v-if="user.role === 'user'">
        <label for="weight">Weight (kg)</label>
        <input class="form-input" v-model="user.weight" id="weight" type="text" placeholder="Weight"/>
      </div>

      <div class="form-group" v-if="user.role === 'user'">
        <label for="height">Height (cm)</label>
        <input class="form-input" v-model="user.height" id="height" type="text" placeholder="Height"/>
      </div>

      <div v-if="user.role === 'trainer'">

        <h2> Trainer information </h2>

        <div class="form-group">
          <label for="experience">Years of experience</label>
          <input class="form-input" v-model="user.experience" id="experience" type="number" placeholder="Experience"/>
        </div>

        <div class="form-group">
          <label for="about">About you</label>
          <textarea class='form-input-textarea' id="about" name="about" v-model="user.about" />
        </div>
      </div>

      <form-submit-button label="Submit" :processing="isLoading"/>
    </form>

  </div>

</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import {mapActions, mapState} from "vuex";

export default {
  name: 'Account',
  components: {
    flatPickr,
  },
  computed: {
    ...mapState('profile',[
        'errors'
    ]),
  },
  data() {
    return {
      isLoading: false,
      user: {
        first_name: this.$store.state.auth.user.first_name,
        last_name: this.$store.state.auth.user.last_name,
        birthday: this.$store.state.auth.user.birthday,
        weight: this.$store.state.auth.user.weight,
        height: this.$store.state.auth.user.height,
        experience: this.$store.state.auth.user.experience,
        about: this.$store.state.auth.user.about,
        role: this.$store.state.auth.user.role,
      },
      config: {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        locale: {
          firstDayOfWeek: 1,
        },
      },
    }
  },
  methods: {
    ...mapActions('profile',[
      'update', 'clearErrors'
    ]),
    handle() {
      this.isLoading = true;
      Object.keys(this.user).forEach((k) => this.user[k] == null && delete this.user[k]);
      this.update(this.user).then(() => {
        this.clearErrors();
      }).finally(() => {
        this.isLoading = false;
      });
    }
  },
  beforeRouteLeave (to, from, next) {
    this.clearErrors();
    next();
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