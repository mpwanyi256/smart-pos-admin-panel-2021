<template>
    <div class="sections_and_tables">
        <Table>
          <template slot="header">
              <tr>
                  <th>
                      <BaseTextfield v-model="search" placeholder="Search" />
                  </th>
                  <th>TABLES</th>
                  <th>IS HIDDEN</th>
                  <th>
                    <v-btn @click="addNewSection = true">
                        <v-icon left>
                            mdi-plus
                        </v-icon>
                        Add section
                    </v-btn>
                  </th>
              </tr>
          </template>
          <template slot="body">
              <tr v-for="(section, i) in filteredSections" :key="i">
                  <td class="section_name"
                    @click="updateSectionName(section)"
                  >
                      {{ section.name }}
                  </td>
                  <td>
                    <v-btn small text
                          @click="viewSectionTables(section)"
                      >
                          View tables
                      </v-btn>
                  </td>
                  <td>
                    <BaseSwitch
                      :status="section.hidden"
                      color="red"
                      @change="updateSectionStatus($event, section)"
                    />
                  </td>
                  <td>
                    &nbsp;
                  </td>
              </tr>
          </template>
        </Table>
        <SectionTablesModal
          v-if="viewTables && selectedSection"
          :section="selectedSection"
          :sections="sections"
          @updateTableStatus="updateTableStatus"
          @newTable="addTable"
          @UpdateTableName="updateTableName"
          @close="viewTables = false"
        />
        <SingleFieldUpdateModal
          v-if="selectedSection && showUpdateSectionName"
          placeholder="Update section name"
          :preset="selectedSection.name"
          @close="showUpdateSectionName = false"
          @save="saveNewSectionName($event)"
        />
        <SingleFieldUpdateModal
          v-if="addNewSection"
          placeholder="section name"
          @close="addNewSection = false"
          @save="addSection($event)"
        />
    </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';
import BaseSwitch from '@/components/generics/BaseSwitch.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import SectionTablesModal from '@/components/settings/SectionTablesModal.vue';
import SingleFieldUpdateModal from '@/components/generics/new/SingleFieldUpdateModal.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SectionsAndTables',
  components: {
    Table,
    BaseSwitch,
    BaseTextfield,
    SectionTablesModal,
    SingleFieldUpdateModal,
  },
  data() {
    return {
      sections: [],
      search: '',
      viewTables: false,
      selectedSection: null,
      showUpdateSectionName: false,
      addNewSection: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),

    filteredSections() {
      return this.sections.filter((Section) => Section.name.toLowerCase()
        .match(this.search.toLowerCase()));
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
    ...mapActions('settings', ['post']),

    addSection(name) {
      this.post({
        add_section: name.toUpperCase(),
        company_id: this.user.company_id,
      })
        .then(() => {
          this.fetchTables();
        });
      this.addNewSection = false;
    },

    saveNewSectionName(newName) {
      this.post({
        update_section_name: newName.toUpperCase(),
        section_id: this.selectedSection.id,
      })
        .then(() => {
          this.fetchTables();
        });
      this.showUpdateSectionName = false;
    },

    viewSectionTables(section) {
      this.selectedSection = section;
      this.viewTables = true;
    },

    updateSectionName(section) {
      this.selectedSection = section;
      this.showUpdateSectionName = true;
    },

    updateTableName(filter) {
      this.post(filter)
        .then(() => {
          this.fetchTables();
        });
    },

    addTable(newTable) {
      this.post({
        ...newTable,
        add_new_table: this.user.company_id,
      })
        .then(() => {
          this.fetchTables();
        });
    },

    updateTableStatus(table) {
      const filter = {
        update_table_status: table.table_id,
        status: table.status ? 1 : 0,
      };
      this.post(filter)
        .then(() => {
          this.fetchTables();
        });
    },

    updateSectionStatus(status, section) {
      const filter = {
        update_section_status: section.id,
        status: status ? 1 : 0,
      };
      this.post(filter)
        .then(() => {
          this.fetchTables();
        });
    },

    async fetchTables() {
      const Sections = await this.updateOrder(
        {
          get_setup_sections: this.user.company_id,
          day_open: this.dayOpen,
        },
      );
      if (!Sections.error) this.sections = Sections.data;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.section_name {
  cursor: pointer;
}

.section_name:hover {
  font-weight: bold;
  color: $accent;
}

.sections_and_tables {
    height: calc(100vh - 52px);
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    color: $black;
    font-size: 13px !important;
}

</style>
