<template>
  <button type="submit" :disabled='processing' class="flex-center form-input btn btn-primary">
    <loading-ring :show="processing"/>
    <span>{{label}}</span>
  </button>
</template>

<script>

import LoadingRing from "@/components/LoadingRing";

export default {
  name: 'FormSubmitButton',
  components: {
    LoadingRing
  },
  props: {
    label: {
      type: String,
      default() { return 'Submit'; }
    },
    processing: {
      type: Boolean,
      default() { return false; }
    }
  }
}
</script>