<template>
    <v-card class="base_table_card">
        <v-card-title v-if="data.length > 0">
          <v-spacer></v-spacer>
          <v-btn
            small
            @click="exportToExcel"
            class="mt-2 ml-2 green--text darken-4">
            <v-icon left color="green darken-4">mdi-file-excel</v-icon>
            {{ `Export ${data.length} items to csv` }}
          </v-btn>
          <!--
          <v-text-field dense v-model="searchText"
          placeholder="Search" width="300" single-line /> -->
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="data"
            :items-per-page="6"
            class="elevation-0"
        >
            <slot></slot>
        </v-data-table>
    </v-card>
</template>
<script>
import ExcelExportMixin from '@/mixins/excelMixin';

export default {
  name: 'BaseTableComponent',
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  mixins: [ExcelExportMixin],
  data() {
    return {
      searchText: '',
    };
  },
  methods: {
    exportToExcel() {
      this.exportDataToExcel(this.data, 'data_export_smart_pos');
    },
  },
};
</script>
