<template>
  <div>
      <p>
        Sorry, it looks like we couldn't find what you're looking for.
        <br />
        Click the button below to go back.
      </p>
      <button v-on:click="onBackButton">Return to the app</button>
    </div>
</template>

<script>

export default {
  name: 'NotFound',
  methods: {
    onBackButton() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
  /* TODO: styles for this page here */
</style>