<template>
    <div class="company text-center">
        <div class="name">
            {{ company.company_name }}
        </div>
        <div class="address">
            {{ company.company_location }}
        </div>
        <div class="address">
            TIN {{ company.company_tin }}
        </div>
        <div class="address">
            {{ company.company_mobile }}
        </div>
        <hr class="grey ligteh-3">
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CompanyInfo',
  computed: {
    ...mapGetters('auth', ['user']),
    company() {
      return this.user ? this.user.company_info : null;
    },
  },
};
</script>
<style scoped lang="scss">
    .company {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .name {
          font-size: x-large;
          font-weight: bold;
          color: black;
      }

      .address {
          font-size: large;
          color: #3c3c3c;
      }
    }
</style>
