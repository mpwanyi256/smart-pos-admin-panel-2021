<template>
  <Basemodal :title="supplier.name" :size="1000"
    @close="$emit('close')">
    <div class="supplier_mappings">
        <div class="mappings">
            <SupplierItemMappings
              :mappings="mappings"
              @reload="fetchMappings"
            />
        </div>
        <div class="add_mapping">
            <AddStoreItemToMapping
              :storeItems="storeItems"
              :supplier="supplier"
              @reload="fetchMappings"
            />
        </div>
    </div>
  </Basemodal>
</template>
<script>
import AddStoreItemToMapping from '@/components/inventory/suppliers/AddStoreItemToMapping.vue';
import SupplierItemMappings from '@/components/inventory/suppliers/SupplierItemMappings.vue';
import Basemodal from '@/components/generics/Basemodal.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SupplierItemMapping',
  props: {
    supplier: {
      type: Object,
      required: true,
    },
  },
  components: {
    Basemodal,
    AddStoreItemToMapping,
    SupplierItemMappings,
  },
  data() {
    return {
      mappings: [],
    };
  },
  computed: {
    ...mapGetters('inventory', ['storeItems']),
    ...mapGetters('auth', ['user']),
  },
  methods: {
    ...mapActions('inventory', ['getStoreItems', 'updateItem']),

    async fetchMappings() {
      const Mappings = await this.updateItem({ fetch_supplier_mapping: this.supplier.id });
      if (!Mappings.error) this.mappings = Mappings.data;
    },
  },
  async created() {
    this.fetchMappings();
    await this.getStoreItems({ company_id: this.user.company_id });
  },
};

</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .supplier_mappings {
      height: 500px;
      display: grid;
      grid-template-columns: 50% 50%;
      margin: 0;
      top: 0;
      bottom: 0;
      overflow: hidden;

      >div {
        display: flex;
        flex-direction: column;
      }

      .mappings {
          overflow: auto;
      }

      .add_mapping {
        background-color: $light-grey;
        overflow: auto;
      }
    }
</style>
