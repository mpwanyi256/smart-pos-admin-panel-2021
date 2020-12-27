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
            <h6 :class="companyInfo.days_left > 10 ? 'days-okay' : 'days-left'" class="text-center">
                {{ `${companyInfo.days_left }`}} Days left
                <br>
                <div class="options">
                    <div>
                        <v-btn small block class="mr-1" :to="{ name: 'itemwisesale' }">
                            <v-icon>mdi-cart</v-icon>
                            Items
                        </v-btn>
                    </div>
                    <div>
                        <v-btn small block class="ml-1" :to="{ name: 'findbill' }">
                            <v-icon>mdi-magnify</v-icon>
                            bill
                        </v-btn>
                    </div>
                    <div>
                        <v-btn small block class="ml-1" :to="{ name: 'salessammary' }">
                            <v-icon>mdi-book</v-icon>
                            Sales
                        </v-btn>
                    </div>
                </div>
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
        overflow: auto;

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

                .options {
                    width: 100%;
                    padding-right: 5px;
                    display: inline-flex;
                    flex-direction: row;
                    gap: 5px;
                    margin-top: 5px;
                    > div {
                        width: 100%;
                    }
                    // grid-template-columns: 50% 50%;
                    // margin-top: 10px;
                }
            }

            .days-left {
                color: $red;
            }

            .days-okay {
                color: green;
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
