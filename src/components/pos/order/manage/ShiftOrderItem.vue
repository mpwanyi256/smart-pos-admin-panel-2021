<template>
    <Basemodal
        :title="`Select table to shift item`"
        :size="700" @close="$emit('close')">
        <div class="shift_order_item">
          <BaseTextfield placeholder="Search for a table" v-model.trim="search" />
          <div class="tables_list">
            <div
              class="table_item"
              v-for="table in filteredTables" :key="table.id"
              @click="$emit('shift', table)"
            >
              {{ table.name.toUpperCase() }}
            </div>
          </div>
        </div>
    </Basemodal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';

export default {
  name: 'ShiftOrderItem',
  components: {
    Basemodal,
    BaseTextfield,
  },
  data() {
    return {
      tables: [],
      search: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('pos', ['runningOrder']),

    runnigTable() {
      return this.runningOrder.table_id;
    },

    filteredTables() {
      return this.tables.filter((Table) => Table.id !== this.runnigTable && Table.name
        .toLowerCase().match(this.search.toLowerCase()));
    },

    dayOpen() {
      return this.user && this.user.company_info ? this.user.company_info.day_open : null;
    },
  },
  async created() {
    await this.fetchTables();
  },
  methods: {
    ...mapActions('pos', ['updateOrder']),

    async fetchTables() {
      const Sections = await this.updateOrder(
        {
          get_setup_sections: this.user.company_id,
          day_open: this.dayOpen,
        },
      );
      if (!Sections.error) {
        this.tables = Sections.data.map((Section) => Section.tables).flat();
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

  .shift_order_item {
    display: flex;
    flex-direction: column;
    height: 500px;
    overflow: hidden;
    background-color: $white;

    .tables_list {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
      border-top: 1px solid $border-color;

      .table_item {
        height: 80px;
        background-color: $white;
        width: 100%;
        color: $black;
        border-bottom: 1px solid $border-color;
        padding: 15px;
        cursor: pointer;
      }

      .table_item:hover {
        background-color: $header;
      }
    }

  }
</style>
