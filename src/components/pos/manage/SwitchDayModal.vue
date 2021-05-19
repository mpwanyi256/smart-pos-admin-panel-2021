<template>
    <Basemodal
      :title="`Switch day`"
      :size="700" @close="$emit('close')">
        <div class="day_switch">
            <h1>{{ `Switch Day ${selectedDate}` }}</h1>
            <DatePickerBeta
              message="Select date"
              @picked="selectedDate = $event"
            />
            <h3 class="err_message">{{ message }}</h3>
            <div>
                <v-btn
                    :disabled="!selectedDate"
                    block
                    @click="$emit('switch', selectedDate)"
                >
                    Open day
                </v-btn>
            </div>
            <LinearLoader v-if="loading" class="mt-2" />
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';
import LinearLoader from '@/components/generics/Loading.vue';

export default {
  name: 'SwitchDayModal',
  props: {
    message: {
      type: String,
      required: false,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Basemodal,
    DatePickerBeta,
    LinearLoader,
  },
  data() {
    return {
      selectedDate: '',
    };
  },
};
</script>
<style scoped lang="scss">
.day_switch {
    height: 300px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 25px;
    text-align: center;

    .err_message {
        color: red;
    }
}
</style>
