<template>
  <div class="content-box">

    <div>

      <button class="btn btn-primary"> <font-awesome-icon icon="plus"/> Invite client </button>

      <div class="items">

        <div class="item" v-for="client in users" :key="client.id">

          <div class="info">

            <h3> {{ client.first_name }} {{ client.last_name }}</h3>

            <div class="description">
              <span><b>Email:</b> {{ client.email }}</span>
              <span><b>Last login at:</b> {{ client.last_login_at }}</span>
            </div>

          </div>

          <div class="control">
            <font-awesome-icon class='view' icon="eye" size="lg" v-on:click="view(client.id)"/>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';

export default {
  name: 'Clients',
  computed: {
    ...mapState('users', [
      'users'
    ])
  },
  methods: {
    ...mapActions('users', [
      'fetchAll'
    ])
  },
  created() {
    this.fetchAll()
  }
}
</script>

<style scoped>

  @import '../../assets/css/items.css';

  .item .info .description {
    display: flex;
    flex-direction: column;
    font-size: small;
  }

</style>