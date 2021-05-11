<template>
    <v-switch
        v-model="data"
        :color="data ? color ? color : 'green' : 'primary'"
        hide-details
    />
</template>
<script>
export default {
  name: 'BaseSwitch',
  props: {
    status: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      data: false,
    };
  },
  watch: {
    data(val) {
      if (val !== this.status) this.$emit('change', val);
    },
  },
  created() {
    this.data = this.status;
  },
};
</script>
