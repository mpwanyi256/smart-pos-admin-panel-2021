<template>
    <div class="kot_order">
        <div class="kot_head" :class="columnClass">
            <div>
            {{ `${kot.table_name} #${kot.kot_id} (${kot.waiter})` }}
            </div>
            <div class="text-right">
                <BaseTooltip
                    v-if="allowItemsCheckoout"
                    @button="markAllItemsReady"
                    message="Mark all items as ready"
                    icon="thumb-up"
                    color="green"
                    :class="columnClass"
                />
            </div>
        </div>
        <div class="kots_list">
            <KotItem
                v-for="item in runnungOrders"
                :key="`kot-${item.id}`"
                :menuItem="item"
                :showPreparationTime="isReadyColumn"
                @mark-as-served="markItemAsServed($event)"
            />
        </div>

        <ConfirmModal
            v-if="markItemServed && selectedKOT"
            :title="`${selectedKOT.name} is ready to serve?`"
            @close="markItemServed = false"
            @yes="performItemCheckout"
        />
        <ConfirmModal
            v-if="checkoutAllItems"
            :title="`Are you sure all items are ready?`"
            @close="checkoutAllItems = false"
            @yes="performAllItemsCheckout"
        />
    </div>
</template>
<script>
import BaseTooltip from '@/components/generics/BaseTooltip.vue';
import KotItem from '@/components/kds/kotItem.vue';
import ConfirmModal from '@/components/generics/ConfirmModal.vue';
import { mapActions } from 'vuex';

export default {
  name: 'KOTOrder',
  props: {
    kot: {
      type: Object,
      required: true,
    },
    column: {
      type: String,
      required: true,
    },
    columnClass: {
      type: String,
      required: true,
    },
  },
  components: {
    BaseTooltip,
    KotItem,
    ConfirmModal,
  },
  data() {
    return {
      selectedKOT: null,
      markItemServed: false,
      checkoutAllItems: false,
    };
  },
  computed: {
    isReadyColumn() {
      return this.column === 'Ready';
    },
    allowItemsCheckoout() {
      return !!['New orders', 'Running Late', 'Delayed'].includes(this.column);
    },
    headerColor() {
      let notColor;
      if (this.column === 'New orders') {
        notColor = 'just_in';
      } else if (this.column === 'Running Late') {
        notColor = 'delaying';
      } else if (this.column === 'Running Late') {
        notColor = 'ready';
      } else {
        notColor = 'delayed';
      }

      return notColor;
    },

    runnungOrders() {
      const pendingServe = this.kot.items.filter((KOT) => KOT.status === 0);
      const readyToPickUp = this.kot.items.filter((KOT) => KOT.status === 1);
      return ['New orders', 'Running Late', 'Delayed'].includes(this.column) ? pendingServe : readyToPickUp;
    },
  },
  methods: {
    ...mapActions('kds', ['queryKds']),

    performAllItemsCheckout() {
      this.queryKds({
        checkout_all_items: this.kot.kot_id,
        time_in: this.kot.items[0].time,
        date: this.kot.date,
      }).then((res) => {
        if (!res.error) {
          this.checkoutAllItems = false;
          this.$emit('reload');
        }
      }).catch((e) => {
        console.error('Error checking out item', e);
      });
    },

    markAllItemsReady() {
      this.checkoutAllItems = true;
    },

    markItemAsServed(kot) {
      if (!this.allowItemsCheckoout) return;
      this.selectedKOT = kot;
      this.markItemServed = true;
    },
    performItemCheckout() {
      this.queryKds({
        checkout_item: this.selectedKOT.id,
        time_in: this.selectedKOT.time,
        date: this.selectedKOT.date,
      }).then((res) => {
        if (!res.error) {
          this.markItemServed = false;
          this.selectedKOT = false;
          this.$emit('reload');
        }
      }).catch((e) => {
        console.error('Error checking out item', e);
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

.kot_order {
    height: auto;
    width: 100%;
    background-color: $white;
    color: $black;
    border: 0.5px solid $border-color;
    display: flex;
    flex-direction: column;
    border-radius: 15px;

    .just_in {
        background-color: $white;
        color: $black;
    }

    .delaying {
        background-color: $orange;
        color: $black;
    }

    .delayed {
        background-color: $red;
        color: $white !important;
    }

    .kot_head {
        display: grid;
        grid-template-columns: 80% 20%;
        gap: 0;
        height: 50px;
        // margin-bottom: 5px;
        // background-color: $header;
        // color: $black-text;
        // margin-bottom: 5px;
        font-size: large;

        >div {
            width: 100%;
            display: flex;
            justify-content: left;
            align-items: center;
            padding-left: 10px;
            flex-direction: row;
            gap: 5px;
        }

        >div:last-child {
            direction: rtl;
            padding-right: 5px;
        }

    }

    .kots_list {
        height: 100%;
    }

    .just_in {
        background-color: $blue !important;
        color: $white;
    }

    .delaying {
        background-color: $orange !important;
        color: $white;
    }

    .delayed {
        background-color: $red !important;
        color: $white !important;
    }

    .ready {
        background-color: $green !important;
        color: $white !important;
    }
}
</style>
