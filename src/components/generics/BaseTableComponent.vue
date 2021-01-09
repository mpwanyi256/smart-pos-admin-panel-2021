<template>
    <v-card class="base_table_card">
        <v-card-title>
          <v-btn v-if="add"
            small
            @click="$emit('add')"
            class="mt-2 ml-2 green--text darken-4">
            <v-icon left color="green darken-4">mdi-plus</v-icon>
            Add new item
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="data.length > 0"
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
            <template v-slot:item.action="item">
                <v-btn small @click="$emit('view', item)">
                  <v-icon left>mdi-pencil</v-icon>
                  details
                </v-btn>
            </template>
            <template v-slot:item.delete="item">
                <v-btn small @click="$emit('delete', item)">
                  <v-icon left>mdi-delete</v-icon>
                  delete
                </v-btn>
            </template>
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
    add: {
      type: Boolean,
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
