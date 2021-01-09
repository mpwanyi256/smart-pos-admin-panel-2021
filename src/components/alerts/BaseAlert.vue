<template>
    <div class="alert">
      <div class="message text-center font-weight-light">
        {{ message }}
      </div>
      <div>
      <v-btn icon @click="closeAlert" color="error"><v-icon>mdi-delete</v-icon></v-btn>
      </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'BaseAlert',
  props: {
    message: {
      type: String,
    },
  },

  methods: {
    ...mapActions('auth', ['clearError']),

    closeAlert() {
      this.clearError();
    },
  },
};
</script>
<style scoped lang="scss">
  .alert {
    border: .1px solid #ccc!important;
    width: 100%;
    color: #000;
    display: grid;
    grid-template-columns: 90% 10%;
    overflow-x: hidden;
    height: auto;
    padding: 5px;
    margin-top: 10px!important;
    border-left: 2px solid red;
  }

</style>
