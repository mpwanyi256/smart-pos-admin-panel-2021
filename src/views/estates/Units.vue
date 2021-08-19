<template>
    <PageTemplate title="Property Units">
      <template slot="header-actions">
        <BaseTextfield v-model="search" placeholder="Search" />
        <v-btn fab small @click="createUnit = true">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <template slot="body">
        <Table>
            <template slot="header">
                <tr>
                <th>#</th>
                <th>Unit name</th>
                <th>Monthly rate</th>
                <th>Currency</th>
                <th>Property name</th>
                <th>Landlord</th>
                <th>Is occupied</th>
                <th>&nbsp;</th>
                </tr>
            </template>
            <template slot="body">
                <tr v-for="(unit, i) in units" :key="`propertyUnit${unit.unit_id}`">
                    <td>{{ ++i }}</td>
                    <td>{{ unit.unit_name }}</td>
                    <td>{{ unit.monthly_rate }}</td>
                    <td>{{ unit.currency }}</td>
                    <td>{{ unit.property_name }}</td>
                    <td>{{ unit.landlord }}</td>
                    <td>{{ unit.is_occupied ? 'YES' : 'NO' }}</td>
                    <td>
                        <v-btn icon small
                            @click="updateUnitDetails(unit)"
                        >
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </Table>
        <CreateUnit
            v-if="createUnit"
            @close="createUnit = false"
            @reload="reloadUnits"
        />
        <UpdateUnitModal
            v-if="updateUnit && selectedUnit"
            :unit="selectedUnit"
            @reload="reloadUnits"
            @close="updateUnit = false"
        />
      </template>
    </PageTemplate>
</template>
<script>
import { mapActions } from 'vuex';
import PageTemplate from '@/views/estates/PageTemplate.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import Table from '@/components/generics/new/Table.vue';
import CreateUnit from '@/components/estates/CreateUnit.vue';
import UpdateUnitModal from '@/components/estates/UpdateUnitModal.vue';

export default {
  name: 'EstateUnits',

  components: {
    PageTemplate,
    BaseTextfield,
    Table,
    CreateUnit,
    UpdateUnitModal,
  },

  data() {
    return {
      search: '',
      createUnit: false,
      updateUnit: false,
      selectedUnit: null,
      units: [],
    };
  },

  created() {
    this.$nextTick(async () => {
      await this.fetchUnits();
    });
  },

  methods: {
    ...mapActions('estates', ['post']),

    updateUnitDetails(unit) {
      this.selectedUnit = unit;
      this.updateUnit = true;
    },

    async reloadUnits() {
      await this.fetchUnits();
      this.updateUnit = false;
    },

    async fetchUnits() {
      const UNITS = await this.post({ fetch_units: 'all' }).catch(() => []);
      if (UNITS.data) this.units = UNITS.data;
    },

  },
};
</script>
