<template>
    <div class="stats_card">
        <div class="icon_place">
            <v-btn large fab dark :class="stat.color">
                <v-icon>{{ `mdi-${stat.icon}` }}</v-icon>
            </v-btn>
        </div>
        <div class="description">
            <h3>{{ stat.value }}</h3>
            <p>{{ stat.header }}</p>
        </div>
    </div>
</template>
<script>
export default {
  name: 'StatsCard',
  props: {
    stat: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .stats_card {
        width: 100%;
        height: 100%;
        border: 1px solid $border-color;
        background-color: $white;
        box-shadow: $elevation-mid;
        display: grid;
        grid-template-columns: 40% 60%;
        align-items: center;
        overflow: hidden;

        >div:first-child {
            display: flex;
            padding-left: 5px;
            // justify-content: center;
            // align-items: center;
        }

        > div:last-child {
            p {
                color: $grey;
                font-weight: 300;
                line-height: 1.5;
                top: 0;
                font-size: 16px;
            }
            h3 {
                font-size: 18px;
            }
        }
    }
</style>
