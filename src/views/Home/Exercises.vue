<template>
  <div class="content-box">

    <div v-if="isLoading || firstLoad">
      <page-loading-ring/>
    </div>

    <div v-else>

      <button class="btn btn-primary add-btn" v-on:click="add"> <font-awesome-icon icon="plus"/> Add exercise </button>

      <empty-message-block :show="exercises === undefined || exercises.length === 0" resource="exercises"/>

      <div class="items">

        <div class="item" v-for="exercise in exercises" :key="exercise.id">

          <div class="info">

            <h3> {{ exercise.name }} </h3>

            <div class="description">
              {{ exercise.description }}
            </div>
          </div>

          <div class="control">
            <font-awesome-icon v-if="exercise.url" class='view' icon="video" size="lg" v-on:click="showDetails(exercise)"/>
            <font-awesome-icon class='edit' icon="pen" size="lg" v-on:click="edit(exercise)"/>
            <font-awesome-icon class='remove' icon="trash-alt" size="lg" v-on:click="remove(exercise.id)"/>
          </div>

        </div>

        <paginator @paginate="paginate" v-bind="paginator"/>
      </div>

      <!-- MODALS -->
      <v-dialog/>

      <modal class="force-scroll-modal" name="add-exercise-modal" :width=800 :height="'auto'" :adaptive=true :scrollable=true>

        <div class="modal-from">
          <exercise-form v-bind="this.exercise" @created="hide" @updated="hide"/>
        </div>
      </modal>

      <modal class="force-scroll-modal" name="exercise-details-modal" :width=800 :height="'auto'" :adaptive=true :scrollable=true>
        <div>
          <iframe class="video" :src="this.url"></iframe>
        </div>
      </modal>

    </div>

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';
import ExerciseForm from "@/components/Forms/ExerciseForm";
import EmptyMessageBlock from "@/components/EmptyMessageBlock";
import Paginator from "@/components/Paginator";
import PageLoadingRing from "@/components/PageLoadingRing";

export default {
  name: 'Exercises',
  components: {
    ExerciseForm,
    EmptyMessageBlock,
    Paginator,
    PageLoadingRing,
  },
  data() {
    return {
      exercise: null,
      url: null,
      firstLoad: true,
    }
  },
  computed: {
    ...mapState('exercises', [
      'exercises', 'paginator', 'isLoading'
    ])
  },
  methods: {
    ...mapActions('exercises', [
        'fetchAll', 'delete'
    ]),
    add() {
      this.exercise = null;
      this.show();
    },
    edit(exercise) {
      this.exercise = exercise;
      this.show();
    },
    remove(id) {
      this.$modal.show('dialog', {
        title: 'WARNING',
        text: 'You are going to delete an exercise. Are you sure you want to do this?',
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
    show () {
      this.$modal.show('add-exercise-modal');
    },
    hide () {
      this.$modal.hide('add-exercise-modal');
    },
    showDetails(exercise) {
      this.url = exercise.url;
      this.$modal.show('exercise-details-modal');
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
  .video {
    width: 100%;
    height: 550px;
  }
</style>