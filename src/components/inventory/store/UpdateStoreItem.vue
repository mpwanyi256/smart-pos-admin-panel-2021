<template>
  <Basemodal :title="item.name" :size="700" @close="$emit('close')">
    <div class="update_area">
        <div class="frm_entry">
          <div class="label">Item Name</div>
          <div class="entry_update">
            <v-text-field outlined dense v-model="name"></v-text-field>
          </div>
        </div>
        <div class="frm_entry">
          <div class="label">Unit measure</div>
          <div class="entry_update">
            <v-text-field outlined dense v-model="unit_measure"></v-text-field>
          </div>
        </div>
        <div class="frm_entry">
          <div class="label">Pack size</div>
          <div class="entry_update">
            <v-text-field outlined dense v-model="pack_size"></v-text-field>
          </div>
        </div>
        <div class="frm_entry">
          <div class="label">Price per pack</div>
          <div class="entry_update">
            <v-text-field outlined dense v-model="unit_price"></v-text-field>
          </div>
        </div>
        <div class="frm_entry">
          <div class="label">Min stock</div>
          <div class="entry_update">
            <v-text-field outlined dense hint="Min stock in packs" v-model="min_stock"/>
          </div>
        </div>
        <div class="frm_entry">
          <div class="label">&nbsp;</div>
          <div class="entry_update">
            <v-btn large>Normal</v-btn>
          </div>
        </div>
    </div>
  </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';

export default {
  name: 'UpdateStoreItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    Basemodal,
  },
  data() {
    return {
      name: '',
      min_stock: '',
      pack_size: '',
      unit_measure: '',
      unit_price: '',
    };
  },
  created() {
    this.name = this.item.name;
    this.min_stock = this.item.min_stock;
    this.pack_size = this.item.pack_size;
    this.unit_measure = this.item.unit_measure;
    this.unit_price = this.item.unit_price;
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

  .update_area {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 0;
    min-height: 300px;

    .frm_entry {
      display: grid;
      grid-template-columns: 30% 70%;
      align-items: center;
      height: 50px;
      // border-top: 1px solid $light-grey;
      // border-bottom: 1px solid $light-grey;
      font-size: 16px;
      color: $black;
    }
  }
</style>
