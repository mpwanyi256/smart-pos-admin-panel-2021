<template>
    <div class="find_bill">
        <div class="header_nav">
            <h3 class="mt-2">Items sold</h3>
            <v-spacer></v-spacer>
            <v-btn text :to="{ name: 'overview' }">
                <v-icon left>mdi-arrow-left</v-icon>
                Home
            </v-btn>
        </div>
        <div class="search_filter">
            <div class="bill_no">
                <v-select
                    outlined
                    label="Department"
                    v-model="departmentSelected" dense
                    item-text="name"
                    item-value="id"
                    :items="departments"
                />
            </div>
            <div class="bill_no">
                <v-select
                    outlined
                    label="Select item"
                    v-model="menuItemSelected" dense
                    item-text="name"
                    item-value="id"
                    :items="departmentSelected ==0 ? menuItems : menuItemsFiltered"
                />
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
          <BaseTableComponent :headers="tableHeaders" :data="itemsSoldFetch" />
        </div>
    </div>
</template>
<script>
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import BaseTableComponent from '@/components/generics/BaseTableComponent.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    DatePickerBeta,
    LinearLoader,
    BaseTableComponent,
  },
  data() {
    return {
      menuItems: [{ id: 0, name: 'All items' }],
      menuItemSelected: 0,
      departments: [
        { id: 0, name: 'ALL' },
      ],
      departmentSelected: 0,
      dateFrom: '',
      dateTo: '',
      itemsSoldFetch: [],
      tableHeaders: [
        {
          text: 'MENU ITEM', value: 'item_name', sortable: true, align: 'start',
        },
        {
          text: 'UNIT PRICE', value: 'item_price', sortable: false, align: 'start',
        },
        {
          text: 'QUANTITY', value: 'quantity_sold', sortable: false, align: 'start',
        },
        {
          text: 'AMOUNT', value: 'amount_sold', sortable: false, align: 'start',
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
    menuItemsFiltered() {
      return this.menuItems.filter((Item) => Item.display === this.departmentSelected);
    },
  },
  methods: {
    ...mapActions('sales', ['getMenuItems', 'getDepartments', 'fetchItemsSold']),

    async fetchSales() {
      if (this.loading) return;
      const filters = {
        department: this.departmentSelected,
        menu_item: this.menuItemSelected,
        date_from: this.dateFrom,
        date_to: this.dateTo,
        company_id: localStorage.getItem('smart_company_id'),
      };
      const ItemsSold = await this.fetchItemsSold(filters);
      if (!ItemsSold.error) {
        this.itemsSoldFetch = ItemsSold.data.map((Sale) => ({
          item_id: Sale.item_id,
          item_name: Sale.item_name.toUpperCase(),
          item_price: Sale.item_price,
          amount_sold: Sale.amount_sold,
          quantity_sold: Sale.quantity_sold,
          cancelled: Sale.settlement[0].amount,
          cash: Sale.settlement[1].amount,
          cheque: Sale.settlement[2].amount,
          company: Sale.settlement[3].amount,
          eft: Sale.settlement[4].amount,
          mobile: Sale.settlement[5].amount,
          nc: Sale.settlement[6].amount,
          split: Sale.settlement[8].amount,
          visa: Sale.settlement[9].amount,
        }));
      }
    },

    async fetchMenuItems() {
      const filters = { item_id: this.menuItemSelected };
      const menuItems = await this.getMenuItems(filters);
      if (!menuItems.error) this.menuItems = [{ id: 0, name: 'All Items' }, ...menuItems.data];
    },

    async fetchMenuDepartments() {
      const departments = await this.getDepartments();
      if (!departments.error) {
        this.departments = [
          { id: 0, name: 'ALL' },
          ...departments.data,
        ];
      }
    },

    setDateFrom(dateSelected) {
      this.dateFrom = dateSelected;
    },

    setDateTo(dateSelected) {
      this.dateTo = dateSelected;
    },
  },
  mounted() {
    this.fetchMenuDepartments();
    this.fetchMenuItems();
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
