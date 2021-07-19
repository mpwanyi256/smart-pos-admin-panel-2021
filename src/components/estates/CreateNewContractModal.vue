<template>
  <Basemodal
    title="Create new tenant contract"
    :size="800" @close="$emit('close')"
  >
    <div class="new_contract">
      <NewTenantContract @close="$emit('close')" />
      <!-- <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab v-for="item in tabs" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <div class="tab_div">
              <NewTenantContract @close="$emit('close')" />
            </div>
          </v-tab-item>
          <v-tab-item>
            <div class="tab_div">
              <h1>New</h1>
            </div>
          </v-tab-item>
        </v-tabs-items> -->
    </div>
  </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import NewTenantContract from '@/components/estates/contracts/NewTenantContract.vue';

export default {
  name: 'CreateNewContractModal',
  components: {
    Basemodal,
    NewTenantContract,
  },
  data() {
    return {
      tabs: ['New client', 'Existing client'],
      tab: null,
    };
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.new_contract {
  min-height: 300px;
  display: flex;
  flex-direction: column;
}

.tab_div {
  min-height: 350px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid $border_color;
}
</style>
