<template>
  <div class="empty-data-box">
    {{ text }}
  </div>
</template>

<script>

export default {
  name: 'Empty',
  props: {
    text: {
      type: String,
      default() { return 'No data.'; }
    }
  }
}
</script>

<style scoped>
.empty-data-box {
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  margin-top: 200px;
}
</style>