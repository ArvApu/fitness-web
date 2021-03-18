<template>
  <div class="paginator" v-show="total > perPage">

    <button v-on:click="goPrev()"> Prev </button>
    <button> {{ currentPage }} </button>
    <button v-on:click="goNext()"> Next </button>

  </div>
</template>

<script>
export default {
  name: 'Paginator',
  props: {
    currentPage: Number,
    lastPage: Number,
    total: Number,
    perPage: Number,
  },
  methods: {
    goPrev() {
      if(this.currentPage <= 1) {
        return;
      }
      this.paginate(this.currentPage - 1);
    },
    goNext() {
      if(this.currentPage >= this.lastPage) {
        return;
      }
      this.paginate(this.currentPage + 1);
    },
    paginate(page) {
      this.$emit('paginate', page);
    }
  }
}
</script>

<style scoped>
  .paginator{
    width: 100%;
    display: flex;
  }
</style>