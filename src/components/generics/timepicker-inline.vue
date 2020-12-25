<template>
    <v-menu ref="menu1" v-model="menu1"
        :close-on-content-click="false" :nudge-right="40" :return-value.sync="time"
        transition="scale-transition"
        offset-y max-width="290px" min-width="290px">
        <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="timeSelected"
            label="End Time"
            readonly v-bind="attrs" v-on="on"></v-text-field>
        </template>
        <v-time-picker :min="startTime" v-if="menu1" format="ampm" v-model="timeSelected" full-width
        @click:minute="$refs.menu.save(time)">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.menu1.save(time)">OK</v-btn>
        </v-time-picker>
    </v-menu>
</template>

<script>
export default {
  name: 'TimePicker',
  data() {
    return {
      time: null,
      menu1: false,
      timeSelected: null,
    };
  },

  watch: {
    timeSelected(newVal) {
      this.saveTime(newVal);
    },
  },

  methods: {
    saveTime() {
      this.$emit('time', this.timeSelected);
    },
  },
};
</script>
