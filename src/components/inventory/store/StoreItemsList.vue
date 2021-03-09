<template>
  <div class="stores">
    <div class="header">
      <div v-for="(head, index) in headers" :key="index">
        {{ head }}
      </div>
    </div>
    <div class="items_list">
      <div class="item" v-for="item in filteredItems" :key="item.id">
        <div>{{ item.name }}</div>
        <div>{{ item.category }}</div>
        <div>{{ item.unit_price_display }}</div>
        <div>{{ item.pack_size }}</div>
        <div>{{ item.unit_measure }}</div>
        <div>{{ item.min_stock }}</div>
        <div>
          <v-btn @click="$emit('update', item)" class="action" small icon>
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
  props: {
    search: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      headers: [
        'Item Name',
        'Category',
        'Unit Price',
        'Pack size',
        'Measurement',
        'Min Stock',
        '',
      ],
    };
  },
  computed: {
    ...mapGetters('inventory', ['storeItems']),

    filteredItems() {
      return this.search ? this.storeItems
        .filter((item) => item.name.toLowerCase()
          .match(this.search.toLowerCase())) : this.storeItems;
    },
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
      color: $black;

      > div {
        width: 100%;
        height: 100%;
        text-align: left;
        font-weight: bold;
        padding-left: 15px;
        display: flex;
        align-items: center;
      }
    }

    .items_list {
      max-height: calc(100vh - 144px);
      width: 100%;
      display: grid;
      flex-direction: column;
      overflow: auto;

      .item:hover {
        background-color: $light-grey;
      }

      > div {
        height: 40px;
        display: grid;
        grid-template-columns: 20% 20% 10% 20% 10% 10% 10%;

        > div {
          width: 100%;
          height: 100%;
          border: 1px solid $light-grey;
          display: flex;
          text-align: left;
          align-items: center;
          overflow: hidden;
          padding-left: 15px;
        }

        > div:first-child {
          justify-content: left;
          padding-left: 5px;
        }

        > div:last-child {
          display: flex;
          align-items: center;
          justify-content: right;
          text-align: right;

          .action {
            margin: auto;
          }
        }
      }
    }
  }
</style>
