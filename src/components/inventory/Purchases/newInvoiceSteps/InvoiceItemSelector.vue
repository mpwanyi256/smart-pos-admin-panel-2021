<template>
    <div class="item_selector">
        <Table class="items_select_table">
            <template slot="header">
                <tr>
                    <th>
                        <v-select
                            :items="mappings"
                            item-value="id"
                            v-model="itemIdSelected"
                            item-text="item_name"
                            dense outlined
                        />
                    </th>
                    <th>
                        <v-text-field
                            dense outlined
                            v-model.trim="packs"
                            label="Packs received"
                            type="number" min="1"
                        />
                    </th>
                    <th>
                        <v-text-field
                          :disabled="true"
                          dense outlined
                          v-model.trim="packSize"
                          :label="measure ? `Pack (${measure})` : 'Pack size'"
                        />
                    </th>
                    <th>
                        <v-text-field
                            dense outlined
                            v-model.trim="unitPrice"
                            label="Unit price"
                            type="number"
                        />
                    </th>
                    <th>
                        <v-text-field
                            dense outlined :disabled="true"
                            v-model.trim="totalQuantity"
                            :label="measure ? `Total ${measure}` : 'Total'"
                        />
                    </th>
                    <th>
                        <v-text-field
                            :disabled="true"
                            dense outlined
                            v-model.trim="totalItemAmount" label="Amount"
                        />
                    </th>
                    <th>
                        <v-btn @click="addItemToInvoice">
                            <v-icon left>mdi-plus</v-icon>
                            Add
                        </v-btn>
                    </th>
                </tr>
            </template>
        </Table>
    </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';

export default {
  name: 'InvoiceItemSelector',
  props: {
    mappings: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: {
    Table,
  },
  data() {
    return {
      itemIdSelected: null,
      packSize: '',
      unitPrice: '',
      packs: '',
      totalItemAmount: '',
      measure: '',
      totalQuantity: '',
      itemToAdd: null,
    };
  },
  watch: {
    itemIdSelected(val) {
      if (val) this.setItemSelected(val);
    },
    unitPrice() {
      this.computeCalculas();
    },
    packs() {
      this.computeCalculas();
    },
  },
  methods: {
    setItemSelected(itemId) {
      const itemPicked = this.mappings.find((Item) => Item.id === itemId);
      if (!itemPicked) return;
      this.packSize = itemPicked.pack_size;
      this.unitPrice = itemPicked.unit_price;
      this.packs = 1;
      this.measure = itemPicked.measurement;
      this.itemToAdd = itemPicked;
      // console.log('Picked', itemPicked);
      this.computeCalculas();
    },

    computeCalculas() {
      this.totalItemAmount = (this.packs * this.unitPrice);
      this.totalQuantity = (this.packSize * this.packs);
    },

    addItemToInvoice() {
      const item = {
        store_item_id: this.itemToAdd.store_item_id,
        pack_size: this.packSize,
        packs_received: this.packs,
        quantity: this.totalQuantity,
        unit_price: this.unitPrice,
        item_cost: (this.packs * this.unitPrice),
        name: this.itemToAdd.item_name,
      };
      console.log('Add item', item);
      this.$emit('add', item);
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.item_selector {
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    color: $black;
    background-color: $border-color;
}

tr th {
    background-color: $border-color !important;
    border-bottom: 0.5px solid $dark-grey;
    justify-content: center;
}

</style>
