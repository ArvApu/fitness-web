<template>
  <form id='room-create-form' @submit.prevent="handle">

    <alerts :errors="errors"/>

    <div class='form-group'>
      <label> User </label>
      <v-select required @search="fetchUsers" :appendToBody="true" :filterable="false" :options="users" label="last_name" :reduce="user => user.id" v-model="userId">
        <template #search="{attributes, events}">
          <input class="vs__search" :required="!userId" v-bind="attributes" v-on="events"/>
        </template>
        <li slot="list-footer" class="pagination">
          <button class="btn btn-secondary" @click.prevent="prevPage()" :disabled="!hasPrevPage">Prev</button>
          <button class="btn btn-secondary" @click.prevent="nextPage()" :disabled="!hasNextPage">Next</button>
        </li>
      </v-select>
    </div>

    <div class='form-group'>
      <label for="name"> Name </label>
      <input required class='form-input' type="text" id="name" name="name" v-model="name">
    </div>

    <form-submit-button label="Add room" :processing="this.$store.state.users.isLoading"/>

  </form>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: 'RoomForm',
  data() {
    return {
      search: null,
      name: null,
      userId: null,
    }
  },
  computed: {
    ...mapState('rooms', [
      'errors'
    ]),
    ...mapState('users', [
      'users', 'paginator'
    ]),
    hasNextPage () {
      return Boolean(this.paginator.currentPage < this.paginator.lastPage);
    },
    hasPrevPage () {
      return Boolean(this.paginator.currentPage >= this.paginator.lastPage);
    }
  },
  methods: {
    handle() {
      this.$store.dispatch('rooms/create', {
        name: this.name,
        users: [
          this.userId // TODO: select users from list
        ]
      }).then(() => {
        this.$emit('created')
      });
    },
    fetchUsers(search, loading) {
      loading(true);
      this.search = !search.length ? null : search;
      this.$store.dispatch('users/fetchAll', {
        page: 1, search: search
      }).finally(() => loading(false))
    },
    nextPage() {
      this.$store.dispatch('users/fetchAll', {
        page: this.paginator.currentPage + 1, search: this.search
      });
    },
    prevPage() {
      this.$store.dispatch('users/fetchAll', {
        page: this.paginator.currentPage - 1, search: this.search
      });
    }
  },
  created() {
    this.$store.dispatch('rooms/clearErrors');
    this.$store.dispatch('users/fetchAll', {page: 1});
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  margin: .25rem .25rem 0;
}

.pagination button {
  flex-grow: 1;
}

.pagination button:disabled {
  cursor: default;
}
</style>