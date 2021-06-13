<template>
    <div class="access_conrols">
        <Table>
            <template slot="header">
                <tr>
                    <th>
                        <BaseTextfield
                          v-model="search" placeholder="Search ..." />
                    </th>
                    <th>STATUS</th>
                </tr>
            </template>
            <template slot="body">
                <tr v-for="(setting, i) in filteredControls" :key="i">
                    <td>
                      <p>
                        <strong>
                          {{ setting.title.toUpperCase() }} | {{ setting.set_code }}
                        </strong>
                      </p>
                      <p>
                        {{ setting.description }}
                      </p>
                    </td>
                    <td>
                      <v-btn
                        @click="toggleAction(!setting.status, setting.id)"
                        :disabled="loading"
                        :color="setting.status ? 'green' : 'red'"
                        dark
                      >
                        {{ setting.status ? 'YES' : 'NO' }}
                      </v-btn>
                    </td>
                </tr>
            </template>
        </Table>
    </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AccessControls',
  components: {
    Table,
    BaseTextfield,
  },
  data() {
    return {
      search: '',
      loading: false,
    };
  },
  computed: {
    ...mapGetters('settings', ['controls']),

    filteredControls() {
      return this.controls.filter((Setting) => Setting.description.toLowerCase()
        .match(this.search.toLowerCase()));
    },
  },
  methods: {
    ...mapActions('settings', ['fetch', 'post']),

    async getAccessControls() {
      await this.fetch({ get_access_controls: 'all' });
    },

    async toggleAction(status, settingId) {
      this.loading = true;
      const filter = {
        update_access_setting: settingId,
        status: status ? 'YES' : 'NO',
      };
      await this.post(filter);
      await this.getAccessControls();
      this.loading = false;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.access_conrols {
  height: calc(100vh - 52px);
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  color: $black;
}

.description {
  padding-right: 5px;
}

.search_field {
  width: 350px;
}
</style>
