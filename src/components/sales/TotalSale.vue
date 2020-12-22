<template>
    <div class="panel-item">
        <template v-if="companyInfo">
            <div class="total-sale">
                {{ companyInfo.company_name }}
            </div>
            <div class="sale-value display-1 text-center">
                {{ `${companyInfo.total_sale} ${companyInfo.company_currency}` }}
            </div>
            <h6 class="text-center">
                <v-icon small color="black">mdi-calendar</v-icon>
                {{ companyInfo.day_open_display }}
            </h6>
            <h6 class="text-center days-left">
                {{ `${companyInfo.days_left }`}} Days left
            </h6>
        </template>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TotalSale',
  computed: {
    ...mapGetters('auth', ['user']),
    companyInfo() {
      return this.user ? this.user.company_info : null;
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';
    .panel-sales {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        font-family: $font-style;
        font-size: 1em;
        line-height: 1.47059;
        overflow: auto!important;

        .panel-item {
            min-height: 33.3%!important;
            max-height: 33.3%!important;
            background-color: $white;
            color: $grey;
            box-shadow: $shadow;
            font-family: inherit;
            display: flex;
            flex-direction: column;
            gap: 10px;

            h6 {
                color: $black;
                padding: 5px;
                font-weight: bold;
                font-size: 16px;
                line-height: 1.5!important;
            }

            .days-left {
                color: $red;
            }

            .total-sale {
                font-size: 16px;
                line-height: 1.5;
                padding: 10px;
                font-weight: 300;
                border-bottom: 0.5px solid $light-grey;
                color: $white!important;
                background-color: $dark-grey;
                font-weight: bold;
            }

            .view-sales-btn {
                padding: 10px;
            }
        }

        .pending {
            min-height: 150px;
            border: 1px solid $light-grey;
            padding-top: 5px;

            .header {
                background-color: $dark-grey;
                padding: 10px;
                color: $white;
                text-align: left;
                font-weight: bold;
            }
        }
    }
</style>
