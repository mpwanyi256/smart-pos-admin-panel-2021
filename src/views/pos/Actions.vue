<template>
    <div class="actions_pane">
        <div class="action_item" v-for="(action, i) in actions" :key="i">
            {{ action.name }}
        </div>
    </div>
</template>
<script>
export default {
  name: 'Actions',
  data() {
    return {
      actions: [
        { name: 'Confirm' },
        { name: 'Bill' },
        { name: 'Settle' },
        { name: 'Discount' },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .actions_pane {
        height: calc(100% - 52px);
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: top;
        align-items: center;
        // padding: 15px;

        > div {
            height: 50px;
            width: 100%;
            background-color: $white;
            display: flex;
            justify-content: center;
            align-items: center;
            color: $black-text;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 100%;
            border: 1px solid $black-text;        }
    }
</style>
