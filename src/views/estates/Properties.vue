<template>
    <div class="properties">
        <div class="header_div">
            <div>
                <h1>Properties</h1>
            </div>
            <div>
                <BaseTextfield v-model="search" placeholder="Search" />
                <v-btn fab small @click="addProperty = true">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </div>
        </div>
        <div class="clients_list">
            <Table>
                <template slot="header">
                  <tr>
                      <th>#</th>
                      <th>Property name</th>
                      <th>Address</th>
                      <th>Company</th>
                      <th>&nbsp;</th>
                  </tr>
                </template>
                <template slot="body">
                    <tr v-for="(property, i) in filteredProperties" :key="`client-info-${i}`">
                        <td>{{ ++i }}</td>
                        <td>
                            {{ property.name }}
                        </td>
                        <td>{{ property.address }}</td>
                        <td>{{ property.company_name }}</td>
                        <td>
                            <v-btn fab x-small @click="updatePropertyInfo(property)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </Table>
        </div>

        <CreateProperty
          v-if="addProperty"
          @close="addProperty = false"
          @reload="fetchProperties"
        />

        <UpdateProperty
            v-if="selectedProperty && updateProptery"
            :property="selectedProperty"
            @close="updateProptery = false"
            @reload="fetchProperties"
        />

    </div>
</template>
<script>
import { mapActions } from 'vuex';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import CreateProperty from '@/components/accomodation/manage/CreateProperty.vue';
import UpdateProperty from '@/components/accomodation/manage/UpdateProperty.vue';
import Table from '@/components/generics/new/Table.vue';

export default {
  name: 'Properties',
  components: {
    BaseTextfield,
    Table,
    CreateProperty,
    UpdateProperty,
  },
  data() {
    return {
      properties: [],
      search: '',
      addProperty: false,
      selectedProperty: null,
      updateProptery: false,
    };
  },
  computed: {
    filteredProperties() {
      return this.properties.filter((property) => property.name.toLowerCase()
        .match(this.search.toLowerCase()));
    },
  },
  created() {
    this.$nextTick(async () => {
      await this.fetchProperties();
    });
  },
  methods: {
    ...mapActions('estates', ['post']),

    updatePropertyInfo(property) {
      this.selectedProperty = property;
      this.updateProptery = true;
    },

    async fetchProperties() {
      const PROPERTIES = await this.post({
        get_properties: 'all',
      }).catch((e) => {
        console.info('Error fetching properties', e);
        return null;
      });

      if (PROPERTIES && !PROPERTIES.error) this.properties = PROPERTIES.data;
    },

  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .properties {
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
            border-bottom: 1px solid $border-color;

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
    }

</style>
