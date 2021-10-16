<template>
    <div>
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          max-width="100%"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              class="picker_field"
              :value="computedDateFormattedMomentjs"
              dense :disabled="disabled"
              :label="message"
              readonly outlined
              v-bind="attrs"
              v-on="on"
              @click:clear="date = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date" no-title
            @change="menu1 = false"
            :min="min"
            :max="max"
          ></v-date-picker>
        </v-menu>
    </div>
</template>
<script>
import moment from 'moment';
import { format, parseISO } from 'date-fns';

export default {
  name: 'DatePickerBeta',
  props: {
    message: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    min: {
      type: String,
      required: false,
      // eslint-disable-next-line consistent-return
      validate: (val) => {
        if (val) return new Date(val);
        return '';
      },
    },
    max: {
      type: String,
      required: false,
      // eslint-disable-next-line consistent-return
      validate: (val) => {
        if (val) return new Date(val);
        return '';
      },
    },
  },
  data: () => ({
    date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    menu1: false,
  }),
  watch: {
    date() {
      this.$emit('picked', this.date);
    },
    min(val) {
      if (val) this.date = format(parseISO(new Date(val).toISOString()), 'yyyy-MM-dd');
    },
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format('yyyy-MM-DD') : '';
    },
  },
  mounted() {
    if (this.min) this.date = format(parseISO(new Date(this.min).toISOString()), 'yyyy-MM-dd');
    this.$emit('picked', this.date);
  },
};
</script>
<style scoped>
  .picker_field {
    max-height: 35px !important;
  }
</style>
