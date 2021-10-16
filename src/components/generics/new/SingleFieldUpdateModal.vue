<template>
    <Basemodal
        :title="placeholder"
        :size="500" @close="$emit('close')"
    >
        <div class="from_update">
            <BaseTextfield
                v-model="input"
                :preset="input"
                :placeholder="placeholder"
            />
            <v-btn
                class="float-right mt-3"
                :disabled="!input.length"
                @click="$emit('save', input)"
            >
                Save
            </v-btn>
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';

export default {
  name: 'SingleFieldUpdateModal',
  components: {
    Basemodal,
    BaseTextfield,
  },
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    preset: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      input: '',
    };
  },
  created() {
    this.input = this.preset;
  },
};
</script>
<style scoped lang="scss">
.from_update {
    min-height: 50px;
    padding: 15px;
    overflow: hidden;
}
</style>
