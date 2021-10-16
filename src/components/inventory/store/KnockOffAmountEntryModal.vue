<template>
  <Basemodal :title="selected_store_item.name" :size="500" @close="$emit('close')">
    <div class="knock_off_entry">
        <div class="frm_entry">
            <p>Knock off in {{ selected_store_item.unit_measure.toLowerCase() }}</p>
            <BaseTextfield v-model="knockOffQuantity"
              :placeholder="`Enter ${selected_store_item.unit_measure}`" />
              <v-btn
                :disabled="!knockOffQuantity"
                block small class="mt-4 btn_add_knockoff"
                @click="$emit('add', knockOffQuantity)">
                Add item
              </v-btn>
        </div>
      </div>

  </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';

export default {
  name: 'KnockOffAmountEntryModal',
  props: {
    selected_store_item: {
      type: Object,
      required: true,
    },
  },
  components: {
    Basemodal,
    BaseTextfield,
  },
  data() {
    return {
      knockOffQuantity: '',
    };
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';
.knock_off_entry {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 15px;
      justify-content: center;
      align-items: center;
      text-align: center;

        .btn_add_knockoff {
            background-color: $blue !important;
            color: $white;
        }
    }
</style>
