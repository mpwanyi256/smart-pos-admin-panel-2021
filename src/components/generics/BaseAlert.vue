<template>
    <v-alert dense text :type="alert">
      <p class="alert_message">{{ message }}</p>
    </v-alert>
</template>
<script>
export default {
  name: 'BaseAlert',
  props: {
    alert: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
  .alert_message {
    font-weight: normal;
    font-size: 14px;
  }
</style>
