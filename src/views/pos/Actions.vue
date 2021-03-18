<template>
    <div class="actions_pane">
        <div class="action_item" v-for="(action, i) in actions" :key="i">
            <v-icon class="icon">{{ action.icon }}</v-icon>
            <p>{{ action.name }}</p>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Actions',
  data() {
    return {
      actions: [
        { name: 'Confirm', icon: 'mdi-thumb-up' },
        { name: 'Bill', icon: 'mdi-note' },
        { name: 'Settle', icon: 'mdi-credit-card' },
        { name: 'Discount', icon: 'mdi-sale' },
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
        padding-right: 10px;
        padding-top: 10px;

        > div {
            height: 80px;
            width: 100%;
            background-color: $white;
            display: flex;
            gap: 10px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: $black;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 100%;
            border: 1px solid $bg_color;
            cursor: pointer;
            border-radius: 5px;
            box-shadow: $elevation-default;

            .icon {
              color: $black;
            }
        }

        > div:hover {
          background-color: $blue;
          color: $white;
          .icon {
            color: $white;
          }
        }
    }
</style>
