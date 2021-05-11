<template>
    <Basemodal
        :title="`Sales report ${selectedDate}`"
        :size="1200" @close="$emit('close')">
        <template slot="action">
          <div class="report-actions">
            <BaseTooltip
              class="pdf"
              @button="shiftItem = true"
              color="red"
              message="Download pdf"
              icon="file-pdf-box"
            />
            <DatePickerBeta
              message="Select date"
              @picked="selectedDate = $event"
            />
          </div>
          <!-- <v-btn icon class="red--text darken 3 ml-2">
            <v-icon>mdi-file-pdf-box</v-icon>
          </v-btn> -->
        </template>
        <div class="sales_report">
          <template v-if="loading">
            <LinearLoader />
          </template>
          <template v-else>
              <h3>Sales settlements</h3>
              <PaymentSettlements
                :data="report.payments"
              />
              <h3>Other settlements</h3>
              <PaymentSettlements
                :data="report.other_payments"
              />
              <h3>Departmentwise Sales</h3>
              <PaymentSettlements
                :data="report.department_settlements"
              />
              <DepartmentSale
                v-for="(dep, i) in departmentItemSales"
                :key="i"
                :info="dep"
              />
          </template>
        </div>
    </Basemodal>
</template>
<script>
import BaseTooltip from '@/components/generics/BaseTooltip.vue';
import Basemodal from '@/components/generics/Basemodal.vue';
import PaymentSettlements from '@/components/Reports/generics/PaymentSettlements.vue';
import DepartmentSale from '@/components/Reports/generics/DepartmentSales.vue';
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SalesReport',
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  components: {
    Basemodal,
    PaymentSettlements,
    DepartmentSale,
    DatePickerBeta,
    LinearLoader,
    BaseTooltip,
  },
  data() {
    return {
      selectedDate: null,
      report: null,
      departmentItemSales: [
        {
          name: 'Bar',
          sales: [
            {
              name: 'Gordons 1Ltr', quantity: 4, unit_price: '30,000', amount: '120,000',
            },
            {
              name: 'Chardony 1Ltr', quantity: 4, unit_price: '30,000', amount: '120,000',
            },
            {
              name: 'Coffee 1Ltr', quantity: 4, unit_price: '30,000', amount: '120,000',
            },
            {
              name: 'Total', quantity: '', unit_price: '', amount: '360,000',
            },
          ],
        },
        {
          name: 'Kitchen',
          sales: [
            {
              name: 'Goat ribs', quantity: 2, unit_price: '40,000', amount: '80,000',
            },
            {
              name: 'Chicken', quantity: 4, unit_price: '20,000', amount: '80,000',
            },
            {
              name: 'Vegetable rice', quantity: 1, unit_price: '30,000', amount: '30,000',
            },
            {
              name: 'Total', quantity: '', unit_price: '', amount: '360,000',
            },
          ],
        },
        {
          name: 'Accomodation',
          sales: [
            {
              name: 'Room 1', quantity: 2, unit_price: '40,000', amount: '80,000',
            },
            {
              name: 'Room 5', quantity: 4, unit_price: '20,000', amount: '80,000',
            },
            {
              name: 'Room 7', quantity: 1, unit_price: '30,000', amount: '30,000',
            },
            {
              name: 'Room 5', quantity: 4, unit_price: '20,000', amount: '80,000',
            },
            {
              name: 'Room 7', quantity: 1, unit_price: '30,000', amount: '30,000',
            },
            {
              name: 'Total', quantity: '', unit_price: '', amount: '360,000',
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters('reports', ['loading']),
  },
  watch: {
    async selectedDate(val) {
      if (val) await this.fetchReport();
    },
  },
  methods: {
    ...mapActions('reports', ['getReport']),

    async fetchReport() {
      const Report = await this.getReport({
        get_daily_report: this.selectedDate,
      });
      if (!Report.error) this.report = Report.data;
    },
  },
  async mounted() {
    this.selectedDate = this.date;
    await this.fetchReport();
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

  .report-actions {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .sales_report {
    height: 90vh;
    background-color: $white;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 25px;
    background-color: $body-bg;
    font-family: $font-style;

    h3 {
      margin: 10px;
    }
  }
</style>
