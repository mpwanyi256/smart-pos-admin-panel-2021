<template>
    <div class="find_bill">
        <div class="header_nav">
            <h3>Items sold</h3>
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
                <v-btn small @click="findBill">Search</v-btn>
            </div>
        </div>
    </div>
</template>
<script>
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    DatePickerBeta,
  },
  data() {
    return {
      menuItems: [{ id: 0, name: 'Select item' }],
      menuItemSelected: 0,
      departments: [
        { id: 0, name: 'ALL' },
      ],
      departmentSelected: 0,
    };
  },
  computed: {
    menuItemsFiltered() {
      return this.menuItems.filter((Item) => Item.display === this.departmentSelected);
    },
  },
  methods: {
    ...mapActions('sales', ['getMenuItems', 'getDepartments']),
    async fetchMenuItems() {
      const filters = { item_id: this.menuItemSelected };
      const menuItems = await this.getMenuItems(filters);
      if (!menuItems.error) this.menuItems = [{ id: 0, name: 'Select item' }, ...menuItems.data];
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
