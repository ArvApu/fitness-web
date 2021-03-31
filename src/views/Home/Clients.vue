<template>
  <div class="content-box">

    <div v-if="isLoading || firstLoad">
      <page-loading-ring/>
    </div>

    <div v-else>

      <button class="btn btn-primary" v-on:click="show"> <font-awesome-icon icon="plus"/> Invite client </button>

      <empty-message-block :show="(users === undefined || users.length === 0)" resource="clients"/>

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
            <font-awesome-icon v-if="client.role === 'user'" class='view' icon="eye" size="lg" v-on:click="view(client)"/>
            <font-awesome-icon v-if="$store.state.auth.user.role === 'admin'" class='edit' icon="pen" size="lg" v-on:click="edit(client)"/>
            <font-awesome-icon v-if="client.role === 'user'" class='remove' icon="trash-alt" size="lg" v-on:click="remove(client.id)"/>
          </div>

        </div>

        <paginator @paginate="paginate" v-bind="paginator"/>
      </div>

      <!-- MODALS -->
      <v-dialog/>

      <modal class="force-scroll-modal" name="invite-user-modal" :width=800 :height="'auto'" :adaptive=true :scrollable=true>
        <div class="modal-from">
          <user-invite-form @invited="hide"/>
        </div>
      </modal>

      <modal class="force-scroll-modal" name="update-user-modal" :width=800 :height="'auto'" :adaptive=true :scrollable=true>
        <div class="modal-from">
          <user-update-form :user="client" @updated="hideEdit"/>
        </div>
      </modal>

    </div>

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';
import UserInviteForm from "@/components/Forms/UserInviteForm";
import UserUpdateForm from "@/components/Forms/UserUpdateForm";
import EmptyMessageBlock from "@/components/EmptyMessageBlock";
import Paginator from "@/components/Paginator";
import PageLoadingRing from "@/components/PageLoadingRing";

export default {
  name: 'Clients',
  components: {
    UserInviteForm,
    UserUpdateForm,
    EmptyMessageBlock,
    Paginator,
    PageLoadingRing,
  },
  data() {
    return {
      client: null,
      firstLoad: true,
    }
  },
  computed: {
    ...mapState('users', [
      'users', 'paginator', 'isLoading'
    ])
  },
  methods: {
    ...mapActions('users', [
      'fetchAll', 'delete', 'update'
    ]),
    show () {
      this.$modal.show('invite-user-modal');
    },
    hide () {
      this.$modal.hide('invite-user-modal');
    },
    view(client) {
      this.$store.commit('auth/SET_CLIENT_ID', client.id);
      this.$store.commit('auth/SET_CLIENT_NAME', client.full_name);
      this.$router.push({ name: 'Client'});
    },
    edit(client) {
      this.client = client;
      this.$modal.show('update-user-modal');
    },
    hideEdit() {
      this.$modal.hide('update-user-modal');
    },
    remove(id) {
      this.$modal.show('dialog', {
        title: 'WARNING',
        text: 'You are going to delete a user. Are you sure you want to do this?',
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog');
            }
          },
          {
            title: 'Yes',
            handler: () => {
              this.$modal.hide('dialog');
              this.delete(id);
            }
          },
        ]
      })
    },
    paginate(page) {
      this.fetchAll({page: page})
    }
  },
  created() {
    this.fetchAll({page: this.paginator.currentPage}).finally(() => {
      this.firstLoad = false;
    });
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