<template>
    <Basemodal
      :title="`Create new client`"
      :size="1020" @close="$emit('close')">
        <div class="create_client">
          <CreateNewClient @add="$emit('reload')" />
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import CreateNewClient from '@/components/pos/manage/CreateNewClient.vue';

export default {
  name: 'NewClient',
  components: {
    Basemodal,
    CreateNewClient,
  },
};
</script>
<style scoped>
    .create_client {
        min-height: 300px;
        /* display: flex; */
        width: 100%;
    }
</style>
