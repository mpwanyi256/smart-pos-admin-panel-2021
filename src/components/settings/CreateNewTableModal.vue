<template>
    <Basemodal
        :title="`Add new table in ${section.name.toLowerCase()}`"
        :size="500" @close="$emit('close')"
    >
        <div class="new_table">
            <BaseTextfield v-model="tableName" placeholder="Table name" />
            <v-btn
                class="float-right mt-3"
                :disabled="!tableName.length"
                @click="$emit('add', tableName)"
            >
                Add table
            </v-btn>
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';

export default {
  name: 'CreateNewTableModal',
  components: {
    Basemodal,
    BaseTextfield,
  },
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tableName: '',
    };
  },
};
</script>
<style scoped lang="scss">
.new_table {
    min-height: 50px;
    padding: 15px;
    overflow: hidden;
}
</style>
