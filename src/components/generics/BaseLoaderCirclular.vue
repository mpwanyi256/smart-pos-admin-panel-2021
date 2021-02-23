<template>
    <div class="circular_load">
        <v-progress-circular
            :size="70"
            :width="7"
            class="load"
            indeterminate>
        </v-progress-circular>
    </div>
</template>
<script>
export default {
  name: 'BaseLoaderCirclular',
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';
    .circular_load {
        width: inherit;
        height: inherit;
        // min-height: 300px;
        display: flex;

        .load {
          color: $blue !important;
          margin: auto;
        }
    }
</style>
