<template>
    <PageTemplate title="Landlords">
      <template slot="header-actions">
          <BaseTextfield v-model="search" placeholder="Search" />
          <v-btn fab small @click="openCreate">
              <v-icon>mdi-plus</v-icon>
          </v-btn>
      </template>
      <template slot="body">
        <Table>
          <template slot="header">
            <tr>
              <th>#</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>&nbsp;</th>
            </tr>
          </template>
          <template slot="body">
            <tr v-for="landlord in filteredLandlords" :key="`landlord${landlord.id}`">
              <td>{{ landlord.id }}</td>
              <td>{{ landlord.first_name }}</td>
              <td>{{ landlord.last_name }}</td>
              <td>{{ landlord.email }}</td>
              <td>{{ landlord.contact }}</td>
              <td>
                <v-btn small icon @click="updateInfo(landlord)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </Table>

        <CreateLandlord
          v-if="createLandlord"
          @close="createLandlord = false"
          @reload="refetchLandLords"
        />
        <UpdateLandlord
          v-if="updateLandlord && selectedLandlord"
          :landlord="selectedLandlord"
          @close="updateLandlord = false"
          @reload="refetchLandLords"
        />
      </template>
    </PageTemplate>
</template>
<script>
import { mapActions } from 'vuex';
import PageTemplate from '@/views/estates/PageTemplate.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import Table from '@/components/generics/new/Table.vue';
import CreateLandlord from '@/components/estates/CreateLandlord.vue';
import UpdateLandlord from '@/components/estates/UpdateLandlord.vue';

export default {
  name: 'Landloads',

  components: {
    PageTemplate,
    BaseTextfield,
    Table,
    CreateLandlord,
    UpdateLandlord,
  },
  data() {
    return {
      createLandlord: false,
      search: '',
      landlords: [],
      selectedLandlord: null,
      updateLandlord: false,
    };
  },
  computed: {
    filteredLandlords() {
      return this.landlords.filter(
        (Landlord) => Landlord.first_name.toLowerCase().match(this.search.toLowerCase())
        || Landlord.last_name.toLowerCase().match(this.search.toLowerCase())
        || Landlord.email.toLowerCase().match(this.search.toLowerCase()),
      );
    },
  },
  async created() {
    await this.fetchLandLords();
  },
  methods: {
    ...mapActions('estates', ['post']),

    async updateInfo(landlord) {
      this.selectedLandlord = landlord;
      this.updateLandlord = true;
    },

    async refetchLandLords() {
      this.createLandlord = false;
      this.updateLandlord = false;
      await this.fetchLandLords();
    },

    async fetchLandLords() {
      const LANDLORDS = await this.post({ fetch_landlords: 'all' }).catch(() => []);
      if (LANDLORDS.data) this.landlords = LANDLORDS.data;
    },

    openCreate() {
      this.createLandlord = true;
    },
  },
};
</script>
