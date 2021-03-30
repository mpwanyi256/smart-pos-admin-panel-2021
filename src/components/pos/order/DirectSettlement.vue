<template>
    <div class="direct_settle">
        <div class="option">
            <h2>Cash</h2>
            <v-switch class="switch-toggle" value="red" hide-details
            ></v-switch>
        </div>
    </div>
</template>
<script>

export default {
  name: 'DirectSettlement',
  data() {
    return {
      ex11: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'red darken-3', 'indigo darken-3', 'orange darken-3'],
    };
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .direct_settle {
        display: inline-flex;
        flex-direction: column;
        width: 100%;

        > div {
            height: 50px;
            width: 100%;
            display: grid;
            grid-template-columns: 60% 40%;
            border: 1px solid $blue;
            justify-content: center;
            align-items: center;

            .switch-toggle {
                color: $blue;
            }
        }
    }
</style>
