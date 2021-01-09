<template>
    <div class="main-login">
        <v-container>
            <v-row>
                <v-col cols="12" xs="12" sm="10" offset-sm="1" md="6" offset-md="3"
                lg="6" offset-lg="3" xl="6" offset-xl="3">
                    <v-card max-width="auto">
                      <v-img src="@/assets/404.png" />
                        <v-form @submit.prevent="loginUser" class="mt-3">
                        <v-card-text>
                            <div class="text-center mb-3">
                                <h4>Smart Client POS</h4>
                                <p class="grey--text mt-2">
                                  Opps!.. please check your network connection
                                </p>
                            </div>
                            <v-btn type="submit" block class="btn-login">Try again</v-btn>
                        </v-card-text>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>

export default {
  name: 'ErrorPage',

  methods: {
    async loginUser() {
      this.$router.push({ name: 'login' });
    },

  },

};
</script>
<style scoped lang="scss">
  .btn-login {
    background-color: white!important;
    color: black;
    border: 1px solid #3d3d3d;
  }

  .main-login {
      height: 100vh;
      width: 100vw;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: #f2f2f7;
  }
</style>
