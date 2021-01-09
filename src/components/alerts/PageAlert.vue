<template>
  <div>
    <v-alert v-show="message"
      v-model="alert"
      color="red"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-twitter"
    >
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'PageAlert',

  props: {
    message: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      alert: true,
    };
  },
};
</script>
