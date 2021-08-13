<template>
    <Basemodal
      title="Cloud backups"
      :size="600" @close="$emit('close')">
        <div class="data_sync">
            <h3>Select duration</h3>
            <div class="duration_period">
                <DatePickerBeta
                    message="From"
                    @picked="dateFrom = $event"
                />
                <DatePickerBeta
                    message="To"
                    @picked="dateTo = $event"
                    :min="dateTo"
                />
            </div>
            <div class="duration_period mt-3">
                <div class="error_alert">
                    {{ orders[0] }}
                </div>
                <div class="error_alert">
                    <v-btn @click="syncData" small class="float-right">
                        <v-icon left>mdi-cloud</v-icon>
                        Sync data
                    </v-btn>
                </div>
            </div>
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';
import CloudMixin from '@/mixins/CloudMixin';

export default {
  name: 'SyncDataModal',
  mixins: [CloudMixin],
  components: {
    Basemodal,
    DatePickerBeta,
  },
};
</script>
<style scoped lang="scss">
.data_sync {
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-height: 200px;
    padding: 16px;

    .duration_period {
      display: grid;
      grid-template-columns: 49% 49%;
      gap: 15px;
    }
}
</style>
