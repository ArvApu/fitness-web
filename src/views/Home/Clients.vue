<template>
  <div class="content-box">

    <div>

      <button class="btn btn-primary" v-on:click="show"> <font-awesome-icon icon="plus"/> Invite client </button>

      <empty-message-block :show="users === undefined || users.length === 0" resource="clients"/>

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

      <!-- MODALS -->
      <v-dialog/>

      <modal class="force-scroll-modal" name="invite-user-modal" :width=800 :height="'auto'" :adaptive=true :scrollable=true>
        <div class="modal-from">
          <user-invite-form @invited="hide"/>
        </div>
      </modal>

    </div>

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';
import UserInviteForm from "@/components/Forms/UserInviteForm";
import EmptyMessageBlock from "@/components/EmptyMessageBlock";

export default {
  name: 'Clients',
  components: {
    UserInviteForm,
    EmptyMessageBlock
  },
  computed: {
    ...mapState('users', [
      'users'
    ])
  },
  methods: {
    ...mapActions('users', [
      'fetchAll'
    ]),
    show () {
      this.$modal.show('invite-user-modal');
    },
    hide () {
      this.$modal.hide('invite-user-modal');
    },
    view(id) {
      this.$store.commit('auth/SET_CLIENT_ID', id);
      this.$router.push({ name: 'Statistics'});
    }
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