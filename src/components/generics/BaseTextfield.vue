<template>
  <div class="text_field">
    <input :type="inputType ? inputType : 'text'"
    :disabled="disabled"
    v-model="input_text"
    class="search_field"
    :placeholder="placeholder ? placeholder : 'Search'" />
  </div>
</template>
<script>
export default {
  name: 'BaseTextfield',
  props: {
    inputType: {
      type: String,
      required: false,
    },
    preset: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      input_text: '',
    };
  },
  watch: {
    input_text(val) {
      this.$emit('input', val.trim());
    },
  },
  created() {
    if (this.preset) {
      this.input_text = this.preset;
    }
  },
};
</script>
<style lang="scss">
@import '@/styles/constants.scss';

  .search_field, .search_field:focus {
    height: 40px;
    width: 100%;
    border: 1px solid $white;
    background-color: $white;
    border-radius: 5px;
    margin-right: 10px;
    direction: ltr;
    padding-left: 5px;
    padding-right: 5px;
    // box-shadow: $elevation-default;
    border: 0.5px solid rgba(148, 148, 148, 0.87);
    font-size: 14px;
  }
</style>
