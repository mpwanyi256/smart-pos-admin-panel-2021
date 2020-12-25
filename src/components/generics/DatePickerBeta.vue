<template>
    <div>
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          max-width="100%"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormattedMomentjs"
              dense
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
  },
  data: () => ({
    date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    menu1: false,
  }),
  watch: {
    date() {
      this.$emit('picked', this.date);
    },
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format('yyyy-MM-DD') : '';
    },
  },
  mounted() {
    this.$emit('picked', this.date);
  },
};
</script>
