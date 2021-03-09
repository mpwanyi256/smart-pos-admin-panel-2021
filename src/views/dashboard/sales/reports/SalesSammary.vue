<template>
    <div class="find_bill">
        <div class="header_nav">
            <h3 class="mt-2">Fetch Sales summary</h3>
            <v-spacer></v-spacer>
            <v-btn text :to="{ name: 'overview' }">
                <v-icon left>mdi-arrow-left</v-icon>
                Home
            </v-btn>
        </div>
        <div class="search_filter">
            <div class="bill_no">
                <h3>Filter sales</h3>
            </div>
            <div class="bill_no">
                <DatePickerBeta @picked="setDateFrom" :message="'From'" />
            </div>
            <div class="bill_no">
                <DatePickerBeta @picked="setDateTo" :message="'To'" />
            </div>
            <div class="bill_no">
                <v-btn small @click="fetchSales">Search</v-btn>
            </div>
        </div>
        <div class="orders_table">
          <LinearLoader v-if="loading" />
          <BaseTableComponent :headers="tableHeaders" :data="sales" />
        </div>
    </div>
</template>
<script>
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import BaseTableComponent from '@/components/generics/BaseTableComponent.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SalesOverview',
  components: {
    DatePickerBeta,
    LinearLoader,
    BaseTableComponent,
  },
  data() {
    return {
      dateFrom: '',
      dateTo: '',
      sales: [],
      tableHeaders: [
        {
          text: 'DATE', value: 'date', sortable: true, align: 'start',
        },
        {
          text: 'CASH', value: 'cash', sortable: false, align: 'start',
        },
        {
          text: 'VISA', value: 'visa', sortable: false, align: 'start',
        },
        {
          text: 'Mo. Money', value: 'mobile', sortable: false, align: 'start',
        },
        {
          text: 'COMPANY', value: 'company', sortable: false, align: 'start',
        },
        {
          text: 'CHEQUE', value: 'cheque', sortable: false, align: 'start',
        },
        {
          text: 'NC', value: 'nc', sortable: false, align: 'start',
        },
        {
          text: 'CANCELLED', value: 'cancelled', sortable: false, align: 'start',
        },
      ],
    };
  },
  computed: {
    ...mapGetters('sales', ['loading']),
  },
  methods: {
    ...mapActions('sales', ['fetchSalesSummary']),

    setDateFrom(dateSelected) {
      this.dateFrom = dateSelected;
    },

    setDateTo(dateSelected) {
      this.dateTo = dateSelected;
    },

    async fetchSales() {
      if (this.loading) return;
      const filters = {
        from: this.dateFrom,
        to: this.dateTo,
      };
      const SALES = await this.fetchSalesSummary(filters);
      if (!SALES.error) {
        this.sales = SALES.data.map((Sale) => ({
          date: Sale.day,
          cancelled: Sale.settlement[0].amount,
          cash: Sale.settlement[1].amount,
          cheque: Sale.settlement[2].amount,
          company: Sale.settlement[3].amount,
          mobile: Sale.settlement[5].amount,
          nc: Sale.settlement[6].amount,
          visa: Sale.settlement[8].amount,
        }));
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../../../styles/constants.scss';

    .find_bill {
        background-color: $white;
        font-family: $font-style;
        min-height: 100%;
        border-left: 0.5px solid $border-color;

        .header_nav {
            height: 56px;
            width: 100%;
            padding: 5px;
            border-bottom: 0.5px solid $border-color;
            display: inline-flex;
            // justify-content: center;
        }

        .search_filter {
            height: 100px;
            width: 100%;
            padding: 5px;
            border-bottom: 0.5px solid $border-color;
            display: inline-flex;
            flex-direction: row;
            justify-content: center;
            justify-items: center;

            > div {
                height: 100%;
                overflow: hidden;
                padding: 5px;
                width: 100%;
                justify-content: center;
                justify-self: center;
                margin-top: 20px;

                .frm_input {
                    height: 30px;
                }
            }
        }
    }
</style>
