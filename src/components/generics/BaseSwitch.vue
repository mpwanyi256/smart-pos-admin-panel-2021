<template>
    <v-switch
        v-model="status"
        :color="status ? color ? color : 'green' : 'primary'"
        :disabled="disabled"
        :label="label"
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
    disabled: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    color: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
      default: () => '',
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
