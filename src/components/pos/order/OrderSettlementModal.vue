<template>
    <Basemodal
        :title="`Settle order`"
        :size="600" @close="$emit('close')">
        <div class="settle">
            <v-tabs class="tab-head" v-model="tab" color="basil" grow>
            <v-tab class="tab-item"
                v-for="(item, index) in options"
                :key="item"
                :class="isActiveTab(index) ? 'active' : ''"
            >
                {{ item.name }}
            </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <DirectSettlement />
                </v-tab-item>
            </v-tabs-items>
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import DirectSettlement from '@/components/pos/order/DirectSettlement.vue';

export default {
  name: 'OrderSettlementModal',
  components: {
    Basemodal,
    DirectSettlement,
  },
  data() {
    return {
      options: [
        { name: 'Direct' },
        { name: 'Split' },
        { name: 'Other' },
      ],
      tab: 0,
    };
  },
  methods: {
    isActiveTab(tabIndex) {
      return tabIndex === this.tab;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .settle {
        height: 350px;
        background-color: $white;

        .tab-head {
            background-color: $white;

            .active {
                background-color: $blue;
                color: $white;
                border-bottom: 1px solid $white !important;
            }
        }
    }
</style>
