<template>
    <div class="add_ons">
        <div v-for="i in 15" :key="i">
            Ice cubes
        </div>
    </div>
</template>
<script>
export default {
  name: 'AddOns',
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

.add_ons {
    display: inline-flex;
    flex-direction: row;
    gap: 10px;
    overflow-y: hidden;
    overflow-x: auto;
    align-items: center;
    font-size: medium;
    padding: 10px;

    >div {
        min-width: 100px;
        border-radius: 15px;
        border: 1px solid $blue;
        padding: 0 5px 0 5px;
    }
}
</style>
