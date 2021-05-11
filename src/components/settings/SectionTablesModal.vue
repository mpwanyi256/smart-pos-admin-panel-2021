<template>
    <Basemodal
    :title="`Tables under ${section.name.toLowerCase()}`"
    :size="800" @close="$emit('close')">
        <div class="tables">
            <Table>
                <template slot="header">
                <tr>
                    <th>
                        <BaseTextfield v-model="search" placeholder="Search" />
                    </th>
                    <th>
                        <v-btn
                            class="float-right"
                            @click="openCreateTableModal = true"
                        >
                            <v-icon left>
                                mdi-plus
                            </v-icon>
                            Add table
                        </v-btn>
                    </th>
                </tr>
            </template>
            <template slot="body">
                <tr v-for="(table, i) in selectedSection" :key="i">
                    <td class="table_name"
                      @click="updateTableName(table)"
                    >
                        {{ table.name }}
                    </td>
                    <td>
                      <BaseSwitch class="float-right"
                        :status="table.hidden"
                        color="red"
                        @change="$emit('updateTableStatus', { status: $event, table_id: table.id })"
                      />
                    </td>
                </tr>
            </template>
            </Table>
            <CreateNewTableModal
                v-if="openCreateTableModal"
                :section="section"
                @add="addTable"
                @close="openCreateTableModal = false"
            />
            <SingleFieldUpdateModal
              v-if="selectedTable && updateName"
              placeholder="Update table name"
              :preset="selectedTable.name"
              @close="updateName = false"
              @save="saveUpdate($event)"
            />
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseSwitch from '@/components/generics/BaseSwitch.vue';
import Table from '@/components/generics/new/Table.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import CreateNewTableModal from '@/components/settings/CreateNewTableModal.vue';
import SingleFieldUpdateModal from '@/components/generics/new/SingleFieldUpdateModal.vue';

export default {
  name: 'SectionTablesModal',
  components: {
    Basemodal,
    Table,
    BaseTextfield,
    BaseSwitch,
    CreateNewTableModal,
    SingleFieldUpdateModal,
  },
  props: {
    section: {
      type: Object,
      required: true,
    },
    sections: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: '',
      openCreateTableModal: false,
      selectedTable: null,
      updateName: '',
    };
  },
  computed: {
    selectedSection() {
      return this.sections.filter((Section) => Section.id === this.section.id)[0]
        .tables.filter((table) => table.name.toLowerCase()
          .match(this.search.toLowerCase()));
    },
  },
  methods: {
    saveUpdate(newUpdate) {
      const filter = {
        update_table_name: newUpdate.toUpperCase(),
        table_id: this.selectedTable.id,
        section_id: this.section.id,
      };
      this.$emit('UpdateTableName', filter);
      this.updateName = false;
    },

    updateTableName(table) {
      this.selectedTable = table;
      this.updateName = true;
    },

    addTable(tableName) {
      this.openCreateTableModal = false;
      this.$emit('newTable', {
        name: tableName.toUpperCase(),
        section: this.section.id,
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.table_name {
  cursor: pointer;
}

.table_name:hover {
  font-weight: bold;
  color: $accent;
}

.tables {
  height: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  color: $black;
  font-size: 14px !important;
}

</style>
