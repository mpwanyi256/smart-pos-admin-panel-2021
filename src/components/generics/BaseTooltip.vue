<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
        <v-btn icon :class="color ? color : 'black--text'" dark
          v-bind="attrs" v-on="on" @click="$emit('button')">
          <v-icon>{{ `mdi-${icon}` }}</v-icon>
        </v-btn>
        </template>
        <span>{{ message }}</span>
    </v-tooltip>
</template>
<script>
export default {
  name: 'BaseTooltip',
  props: {
    message: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    float: {
      type: String,
      required: false,
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';
    .create_menu_item_icon {
      background-color: $black-text;
    }
</style>
