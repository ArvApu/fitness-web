<template>
  <div v-if="show" class="empty-message-box">
    List <span v-if="resource"> of {{ resource }} </span> is empty.
  </div>
</template>

<script>
export default {
  name: 'EmptyMessageBlock',
  props: {
    show: Boolean,
    resource: String
  }
}
</script>

<style scoped>
  .empty-message-box {
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 35px;
    margin-top: 300px;
  }

  span {
    white-space: pre;
  }

  @media only screen and (max-width: 500px) {
    .empty-message-box {
      margin-top: 250px;
      font-size: 30px;
    }
  }

  @media only screen and (max-width: 450px) {
    .empty-message-box {
      font-size: 25px;
    }
  }

  @media only screen and (max-width: 400px) {
    .empty-message-box {
      margin-top: 200px;
      font-size: 20px;
    }
  }

  @media only screen and (max-width: 300px) {
    .empty-message-box {
      font-size: 15px;
    }
  }
</style>