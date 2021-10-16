<template>
    <Basemodal :size="500" :title="modalTitle" @close="$emit('close')">
        <!-- <div class="text-center title pa-2">
            {{ `Are you sure you want to cancel ${orderItem.name.toUpperCase()}?` }}
        </div> -->
        <div class="mt-3 reason">
            <v-textarea outlined
                v-model.trim="cancellationReason"
                :hint="hint" height="10"
                placeholder="Please add reason for cancellation"
            />
        </div>
        <div class="confirmations">
            <v-btn :disabled="cancellationReason.length < 3" block dark
                @click="cancelItem"
                :class="cancellationReason.length < 3 ? '' : 'green darken-3 mr-1'">
                <v-icon left>mdi-check</v-icon>
                CANCEL ITEM
            </v-btn>
            <v-btn @click="$emit('close')" block dark class="red darken-3 ml-1">
                <v-icon left>mdi-cancel</v-icon>
                CANCEL ACTION
            </v-btn>
        </div>
    </Basemodal>
</template>
<script>
import { mapGetters } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';

export default {
  name: 'CancelOrderItemModal',
  components: {
    Basemodal,
  },
  props: {
    orderItem: {
      type: Object,
      reuired: true,
    },
  },
  data() {
    return {
      hint: `Cancelling this item will delete settlement details.
        You will have to resettle this order`,
      cancellationReason: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    modalTitle() {
      return `Cancel ${this.orderItem.name}`;
    },
  },
  methods: {
    cancelItem() {
      const data = {
        reason: this.cancellationReason.toUpperCase(),
        // item_id: this.orderItem.id,
        cancelled_by: this.user.id,
        ...this.orderItem,
      };
      this.$emit('cancelItem', data);
    },
  },
};
</script>
<style scoped>
    .confirmations {
        display: grid;
        grid-template-columns: 50% 50%;
        width: 100%;
        padding: 16px;
    }
    .reason {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 16px;
    }
</style>
