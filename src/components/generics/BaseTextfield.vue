<template>
  <div class="text_field">
    <input type="text"
    v-model="input_text"
    class="search_field" :placeholder="placeholder ? placeholder.toLowerCase() : 'Search'" />
  </div>
</template>
<script>
export default {
  name: 'BaseTextfield',
  props: {
    placeholder: {
      type: String,
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
};
</script>
<style lang="scss">
@import '@/styles/constants.scss';

  .search_field, .search_field:focus {
    height: 35px;
    width: 100%;
    border: 1px solid $white;
    background-color: $white;
    border-radius: 5px;
    margin-right: 10px;
    direction: ltr;
    padding-left: 5px;
    padding-right: 5px;
    box-shadow: $elevation-default;
  }
</style>
