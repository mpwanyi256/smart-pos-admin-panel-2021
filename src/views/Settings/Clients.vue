<template>
    <div class="clients">
        <div class="header_div">
            <div>
                <h1>Clients</h1>
            </div>
            <div>
                <BaseTextfield v-model="search" placeholder="Search" />
                <v-btn fab small @click="createClient = true">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </div>
        </div>
        <div class="clients_list">
            <Table>
                <template slot="header">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Tin</th>
                        <th>&nbsp;</th>
                    </tr>
                </template>
                <template slot="body">
                    <tr v-for="(client, i) in filteredClients" :key="`client-info-${i}`">
                        <td>{{ ++i }}</td>
                        <td>
                            <div class="user_avatar">
                                <Avatar src="" />
                                {{ client.full_name }}
                            </div>
                        </td>
                        <td>{{ client.email }}</td>
                        <td>{{ client.contact }}</td>
                        <td>{{ client.address }}</td>
                        <td>{{ client.tin }}</td>
                        <td>
                            <v-btn fab x-small @click="updateInfo(client)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </Table>
        </div>
        <NewClient
          v-if="createClient"
          @close="createClient = false"
          @reload="fetchClients"
        />
        <UpdateClientInfo
          v-if="updateClientInfo && selectedClient"
          :client="selectedClient"
          @close="updateClientInfo = false"
          @reload="fetchClients"
        />
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import Table from '@/components/generics/new/Table.vue';
import Avatar from '@/components/generics/new/Avatar.vue';
import NewClient from '@/components/pos/manage/NewClient.vue';
import UpdateClientInfo from '@/components/pos/manage/UpdateClientInfo.vue';

export default {
  name: 'Clients',
  components: {
    BaseTextfield,
    Table,
    Avatar,
    NewClient,
    UpdateClientInfo,
  },
  data() {
    return {
      clients: [],
      search: '',
      createClient: false,
      selectedClient: null,
      updateClientInfo: false,
    };
  },
  computed: {
    filteredClients() {
      return this.clients.filter((C) => C.full_name
        .toLowerCase().match(this.search.toLowerCase()));
    },
  },
  async created() {
    await this.fetchClients();
  },
  methods: {
    ...mapActions('sales', ['getClients', 'addClientInfo']),

    updateInfo(client) {
      this.selectedClient = client;
      this.updateClientInfo = true;
    },

    async fetchClients() {
      const posClients = await this.getClients('all');
      if (!posClients.error) this.clients = posClients.data;
      this.createClient = false;
      this.updateClientInfo = false;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.clients {
  height: calc(100vh - 52px);
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  color: $black;
  font-size: 13px !important;
  border-left: 0.3px solid $border-color;

  .header_div {
    height: 56px;
    width: 100%;
    display: grid;
    grid-template-columns: 70% 30%;
    background-color: $white;
    color: $black;
    border-bottom: 0.3px solid $border-color;

    > div {
        display: inline-flex;
        align-items: center;
        gap: 15px;
        padding-left: 15px;
        width: 100%;
    }

    >div:last-child {
        text-align: right;
        width: 100%;
    }
  }

  .clients_list {
    height: calc(100vh - 106px);
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    color: $black;
    font-size: 13px !important;
    background-color: $white;
  }
}

.user_avatar {
  display: flex;
  align-items: center;
  gap: 10px;
}

</style>
