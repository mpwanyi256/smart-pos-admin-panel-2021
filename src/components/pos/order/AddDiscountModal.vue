<template>
    <Basemodal
        :title="`Add discount`"
        :size="700" @close="$emit('close')">
        <div class="discount_area">
            {{ runningOrder }}
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AddDiscountModal',
  components: {
    Basemodal,
  },
  computed: {
    ...mapGetters('pos', ['runningOrder']),
  },
};
</script>
