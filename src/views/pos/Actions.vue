<template>
    <div class="actions_pane">
        <div class="action_item"
          v-for="(action, i) in actions" :key="i"
          @click="listen(action.name)"
        >
            <v-icon class="icon">{{ action.icon }}</v-icon>
            <p>{{ action.name }}</p>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Actions',
  data() {
    return {
      actions: [
        { name: 'Confirm', icon: 'mdi-thumb-up' },
        { name: 'Bill', icon: 'mdi-note' },
        { name: 'Settle', icon: 'mdi-credit-card' },
        { name: 'Discount', icon: 'mdi-sale' },
      ],
    };
  },
  computed: {
    ...mapGetters('pos', ['runningOrder']),

    orderId() {
      return this.runningOrder ? this.runningOrder.order_id : null;
    },
  },
  methods: {
    ...mapActions('pos', ['addOrderItem']),

    listen(action) {
      switch (action) {
        case 'Confirm':
          this.confirmOrder();
          break;
        default:
          console.log('Invalid action', this.orderId);
          break;
      }
    },

    async confirmOrder() {
      const params = {
        confirm_order: this.orderId,
      };
      const addItem = await this.addOrderItem(params);
      if (addItem.error) console.info(addItem.message);
      else this.$eventBus.$emit('fetch-items');
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .actions_pane {
        height: calc(100% - 52px);
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: top;
        align-items: center;
        padding-right: 10px;
        padding-top: 10px;
        padding-left: 5px;

        > div {
            height: 80px;
            width: 100%;
            background-color: $white;
            display: flex;
            gap: 10px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: $black;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 100%;
            border: 1px solid $bg_color;
            cursor: pointer;
            border-radius: 5px;
            box-shadow: $elevation-default;

            .icon {
              color: $black;
            }
        }

        > div:hover {
          background-color: $blue;
          color: $white;
          .icon {
            color: $white;
          }
        }
    }
</style>
