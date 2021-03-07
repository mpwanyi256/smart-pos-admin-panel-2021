<template>
  <div class="stores">
    <div class="header">
      <div v-for="(head, index) in headers" :key="index">
        {{ head }}
      </div>
    </div>
    <div class="items_list">
      <div class="item" v-for="item in storeItems" :key="item.id">
        <div>{{ item.name }}</div>
        <div>{{ item.category }}</div>
        <div>{{ item.unit_price }}</div>
        <div>{{ item.unit_measure }}</div>
        <div>{{ item.pack_size }}</div>
        <div>{{ item.min_stock }}</div>
        <div>
          <v-btn small icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'StoreItemsList',
  data() {
    return {
      headers: [
        'Item Name',
        'Category',
        'Unit Price',
        'Measurement',
        'Pack size',
        'Min Stock',
        '',
      ],
    };
  },
  computed: {
    ...mapGetters('inventory', ['storeItems']),
  },
};
</script>
<style scoped lang="scss">
@import '../../../styles/constants.scss';

  .stores {
    height: calc(100vh - 104px);
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .header {
      height: 40px;
      width: 100%;
      display: grid;
      grid-template-columns: 20% 20% 10% 20% 10% 10% 10%;

      > div {
        width: 100%;
        height: 100%;
        border: 1px solid $light-grey;
        text-align: left;
      }
    }

    .items_list {
      height: calc(100vh - 144px);
      width: 100%;
      display: grid;
      flex-direction: column;
      overflow: auto;

      > div {
        height: 40px;
        display: grid;
        grid-template-columns: 20% 20% 10% 20% 10% 10% 10%;

        > div {
          width: 100%;
          height: 100%;
          border: 1px solid $light-grey;
          display: flex;
          justify-content: center;
          text-align: left;
          overflow: hidden;
        }

        > div:first-child {
          justify-content: left;
          padding-left: 5px;
        }
      }
    }
  }
</style>
