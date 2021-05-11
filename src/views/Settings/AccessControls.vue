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
                          {{ setting.title }}
                        </strong>
                      </p>
                      <p>
                        {{ setting.description }}
                      </p>
                    </td>
                    <td>
                      <BaseSwitch
                        :status="setting.status"
                        @change="toggleAction($event, setting)"
                      />
                    </td>
                </tr>
            </template>
        </Table>
    </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import BaseSwitch from '@/components/generics/BaseSwitch.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AccessControls',
  components: {
    Table,
    BaseTextfield,
    BaseSwitch,
  },
  data() {
    return {
      search: '',
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
    ...mapActions('settings', ['fetch']),

    descriptionDisplay(desc) {
      return desc.replaceAll('<P>', '').replaceAll('</P>', '').replaceAll('<p>')
        .replaceAll('</p>')
        .split('<br>');
    },

    async getAccessControls() {
      await this.fetch({ get_access_controls: 'all' });
    },

    async toggleAction(status, setting) {
      const filter = {
        update_access_setting: setting.id,
        status: status ? 'YES' : 'NO',
      };
      await this.fetch(filter);
      await this.getAccessControls();
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
