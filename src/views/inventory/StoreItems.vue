<template>
  <div class="inv_main">
    <div class="header_section">
      <div class="title">Store Items</div>
      <div class="options">
        <div><v-text-field dense outlined label="Search" /> </div>
        <div>
          <BaseTooltip @button="downloadModal = true"
          message="Create Item" icon="plus" />
        </div>
      </div>
    </div>
    <div class="items_list">
      <StoreItemsList />
    </div>
  </div>
</template>
<script>
import BaseTooltip from '@/components/generics/BaseTooltip.vue';
import StoreItemsList from '@/components/inventory/store/StoreItemsList.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'InventoryStoreItems',
  components: {
    BaseTooltip,
    StoreItemsList,
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  methods: {
    ...mapActions('inventory', ['getStoreItems']),
  },
  async created() {
    await this.getStoreItems({ company_id: this.user.company_id });
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

.inv_main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header_section {
    height: 52px;
    background-color: $white;
    padding-left: 16px;
    border-bottom: 1px solid $light-grey;
    display: grid;
    grid-template-columns: 60% 40%;

    .options {
      display: inline-flex;
      justify-content: center;
      gap: 5px;
      padding-top: 5px;
      // direction: rtl;
    }
  }
}
</style>
