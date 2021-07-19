<template>
    <Basemodal
        :title="`Enter item quantity`"
        :size="400" @close="$emit('close')">
        <div class="item_quantity_entry">
            <BaseTextfield
                ref="quantityInput"
                v-model="quantity"
                :preset="quantity"
                inputType="number"
                placeholder="Quantity"
            />
                <v-btn :disabled="parseInt(quantity, 10) <= 0"
                  small @click="$emit('add', quantity)">
                    Add Item
                </v-btn>
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';

export default {
  name: 'ItemQuantity',
  components: {
    Basemodal,
    BaseTextfield,
  },
  data() {
    return {
      quantity: 1,
    };
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.item_quantity_entry {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 16px;
    justify-content: center;
    align-items: center;
}

</style>
