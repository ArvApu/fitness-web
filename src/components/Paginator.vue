<template>
  <div class="paginator" v-show="total > perPage">

    <div v-on:click="goPrev()"> Prev </div>
    <div> {{ currentPage }} </div>
    <div v-on:click="goNext()"> Next </div>

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
  .paginator div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 35px;
    margin: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background: var(--secondary-color);
    color: white;
    font-size: 13px;
  }
  .paginator div:hover {
    background: #1a1c21;
  }
  .paginator div:nth-child(2):hover {
    background: var(--secondary-color);
  }
  .paginator div:nth-child(2) {
    cursor: default;
  }

  @media only screen and (max-width: 1220px) {
    .paginator {
      justify-content: center;
    }
  }

</style>