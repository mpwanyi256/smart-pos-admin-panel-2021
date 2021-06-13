<template>
    <div class="actions_pane">
      <template
          v-for="(action, i) in actions">
        <div :key="i" class="action_item"
          @click="listen(action.name)"
          v-if="isAllowedAction(action.name)"
        >
            <v-icon class="icon">{{ action.icon }}</v-icon>
            <p class="name">{{ action.name }}
            </p>
        </div>
      </template>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ControlsMixin from '@/mixins/ControlsMixin';

export default {
  name: 'Actions',
  mixins: [ControlsMixin],
  data() {
    return {
      actions: [
        { name: 'Confirm', icon: 'mdi-thumb-up', allow: true },
        { name: 'Bill', icon: 'mdi-note', allow: this.waiterCanPrintBill },
        { name: 'Settle', icon: 'mdi-credit-card', allow: true },
        { name: 'Discount', icon: 'mdi-sale', allow: true },
      ],
    };
  },
  computed: {
    ...mapGetters('pos', ['runningOrder', 'runningOrderId']),
    ...mapGetters('auth', ['user']),

    companyType() {
      return this.user ? this.user.company_info.business_type : 0;
    },

    orderId() {
      return this.runningOrder ? this.runningOrder.order_id : null;
    },
  },
  created() {
    if (this.companyType === 1) {
      this.actions.unshift(
        { name: 'Waiter', icon: 'mdi-account' },
      );
    }
  },
  methods: {
    ...mapActions('pos', ['addOrderItem']),

    isAllowedAction(action) {
      let allowed = false;
      switch (action) {
        case 'Bill':
          allowed = this.userCanPrintBill;
          break;
        case 'Waiter':
          allowed = this.allowAddWaiter;
          break;
        case 'Settle':
          allowed = this.allowSettleBill;
          break;
        case 'Discount':
          allowed = this.userCanDiscount;
          break;
        default:
          allowed = true;
          break;
      }
      return allowed;
    },

    listen(action) {
      this.$eventBus.$emit('fetch-orders');
      switch (action) {
        case 'Confirm':
          this.confirmOrder();
          break;
        case 'Bill':
          this.$eventBus.$emit('print-bill');
          break;
        case 'Discount':
          this.$emit('discount');
          break;
        case 'Settle':
          this.$eventBus.$emit('settle-bill');
          break;
        case 'Waiter':
          this.$eventBus.$emit('add-waiter');
          break;
        default:
          console.log('Invalid action');
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
@import '@/styles/constants.scss';

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
            height: 60px;
            width: 100%;
            background-color: $white;
            display: flex;
            gap: 10px;
            padding-left: 5px;
            align-items: center;
            color: $black;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 100%;
            border: 1px solid $bg_color;
            cursor: pointer;
            border-radius: 5px;

            .icon {
              color: $gray-25;
            }

            .name {
              margin: 0px;
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
