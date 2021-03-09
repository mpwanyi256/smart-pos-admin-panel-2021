<template>
  <Basemodal :title="item.name" :size="700" @close="$emit('close')">
    <div class="update_area">
        <h1>{{ item.name }}</h1>
        {{ item }}
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
};
</script>
<style scoped>
  .update_area {
    padding: 15px;
  }
</style>
