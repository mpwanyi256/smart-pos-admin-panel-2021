<template>
    <div class="sections">
        <div v-for="i in 5" :key="i">
            ORDER 1
        </div>
    </div>
</template>
<script>
export default {
  name: 'Sections',
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .sections {
        width: 100%;
        height: calc(100vh - 52px);
        display: flex;
        flex-direction: column;
        gap: 1px;
        overflow-x: hidden;
        overflow-y: auto;

        >div {
            height: 52px;
            width: 100%;
            overflow: hidden;
            background-color: $blue;
            color: $white;
            display: flex;
            justify-content: left;
            align-items: center;
            cursor: pointer;
            padding-left: 5px;
        }
    }
</style>
