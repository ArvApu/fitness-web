
<template>

  <div>
    <ul v-if="errors && errors.length > 0" class="alert alert-danger">
      <li v-for="error of errors" v-bind:key="error">
        {{error}}
      </li>
    </ul>

    <ul v-if="alerts && alerts.length > 0" class="alert alert-success">
      <li v-for="alert of alerts" v-bind:key="alert">
        {{alert}}
      </li>
    </ul>

  </div>

</template>

<script>
export default {
  name: 'Alerts',
  props: {
    errors: Array,
    alerts: Array,
  },
}
</script>

<style scoped>
  .alert {
    position: relative;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: .25rem;
  }

  .alert-success {
    color: #155724;
    background-color: #bbded6;
    border-color: #c3e6cb;
  }

  .alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
</style>