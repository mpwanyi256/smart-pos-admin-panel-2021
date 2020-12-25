<template>
    <div>
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted"
              :label="message"
              dense
              hint="yy/mm/dd"
              persistent-hint
              prepend-icon="mdi-event"
              v-bind="attrs"
              @blur="date = parseDate(dateFormatted)"
              v-on="on" outlined
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
    </div>
</template>
<script>
// import moment from 'moment';

export default {
  name: 'InlineDatePicker',

  props: {
    message: {
      type: String,
      required: true,
    },
  },

  data: (vm) => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
      this.$emit('picked', this.formatDate(this.date));
    },
  },

  created() {
    this.$emit('picked', this.formatDate(this.date));
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${year}-${month}-${day}`;

      // const dateArray = date.split('-');
      // return `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split('-');
      return `${year}-${month}-${day}`; // `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
  },
};
</script>
