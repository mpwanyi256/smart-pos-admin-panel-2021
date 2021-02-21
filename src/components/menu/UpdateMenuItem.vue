<template>
    <Basemodal :title="'Update menu item'" @close="$emit('close')">
        <h1>Update Item</h1>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';

export default {
  name: 'UpdateMenuItem',
  components: {
    Basemodal,
  },
};
</script>
