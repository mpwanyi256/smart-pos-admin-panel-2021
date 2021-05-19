<template>
    <Basemodal
        :title="`Sales report ${selectedDate}`"
        :size="1200" @close="$emit('close')"
        :fullscreen="true"
        >
        <template slot="action">
          <div ref="salesReport" class="report-actions">
            <BaseTooltip
              class="pdf"
              @button="printReport"
              color="red"
              message="Print"
              icon="printer"
            />
            <DatePickerBeta
              message="Select date"
              @picked="selectedDate = $event"
            />
          </div>
        </template>
        <div ref="salesReport" class="sales_report">
          <LinearLoader v-if="loading" />
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
                v-for="(dep, i) in report.department_item_sales"
                :key="i"
                :info="dep"
              />
              <OrdersList
                :orders="report.orders"
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
import OrdersList from '@/components/Reports/OrdersList.vue';
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import { mapActions } from 'vuex';

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
    OrdersList,
  },
  data() {
    return {
      selectedDate: null,
      report: {},
      loading: false,
    };
  },
  computed: {
    // ...mapGetters('reports', ['loading']),
  },
  watch: {
    async selectedDate(val) {
      this.loading = true;
      if (val) await this.fetchReport();
      this.$refs.salesReport.scrollTo(0, 0);
      // this.$el.querySelector('.sales_report').scroll(0, 0);
    },
  },
  methods: {
    ...mapActions('reports', ['getReport']),

    printReport() {
      const divToPrint = this.$refs.salesReport;
      const newWin = window.open('', 'Print-Window');
      newWin.document.open();
      newWin.document.write(`<html><style>@page{size: auto;margin: 0mm;}</style><body onload="window.print(true)">${divToPrint.innerHTML}</body></html>`);
      newWin.document.close();

      setTimeout(() => {
        divToPrint.innerHTML = '';
      }, 10);
      this.$emit('close');
    },

    async fetchReport() {
      const Report = await this.getReport({
        get_daily_report: this.selectedDate,
      });
      if (!Report.error) this.report = Report.data;
      this.loading = false;
    },
  },
  async created() {
    this.selectedDate = this.date;
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
    min-height: 100%;
    background-color: $white;
    overflow: auto;
    background-color: $body-bg;
    font-family: $font-style;
    scroll-behavior: smooth;

    h3 {
      margin: 10px;
    }
  }
</style>
