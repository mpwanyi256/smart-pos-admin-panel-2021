<template>
    <div class="skeleton-loader">
        <!-- Loading 4 BaseLoading components
            This displays 4 loading components vertically
        -->
        <BaseLoading
            v-for="i in 6"
            :key="i"
            class="loading-item"
        />
    </div>
</template>
<script>
import BaseLoading from '@/components/generics/BaseLoading.vue';

export default {
  name: 'LoadingKds',
  components: {
    BaseLoading,
  },
};
</script>
<style scoped lang="scss">
    .skeleton-loader {
        padding: 8px;
        width: 100%;
        grid-template-rows: repeat(6, 108px);
        display: grid;
        row-gap: 8px;
    }
</style>
