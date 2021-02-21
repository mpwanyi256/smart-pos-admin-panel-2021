<template>
    <div class="menu_item">
        <div class="item_name">
            {{ menuItem.name }}
        </div>
        <div class="item_price">
            {{ menuItem.price }}
        </div>
        <div class="item_action">
            <v-btn icon small class="update_button"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn small dark @click="$emit('changeStatus', menuItem)"
                :color="isHidden ? 'red darken-3' : 'green darken-3'">
                <v-icon>mdi-eye</v-icon>
                {{ isHidden ? 'Show item' : 'Hide item' }}
            </v-btn>
        </div>
    </div>
</template>
<script>

export default {
  name: 'MenuItem',
  props: {
    menuItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isHidden() {
      // eslint-disable-next-line eqeqeq
      return this.menuItem ? this.menuItem.status == 1 : false;
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

    .menu_item {
        height: 60px;
        background-color: $white;
        border: 0.5px solid $light-grey;
        display: grid;
        grid-template-columns: 50% 10% 40%;
        justify-content: left;
        align-items: center;
        text-align: left;
        padding-left: 15px;
        color: $black-text;
        size: 14px;

        .item_name {
            padding-right: 15px;
            max-lines: 1;
            line-height: 1.5;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 100%;
            white-space: nowrap;
        }

        .item_action {
            display: inline-flex;
            justify-content: right;
            gap: 5px;

            .recipe_button {
                background-color: $light-grey;
            }

            .update_button {
                background-color: $dark-grey;
                color: $white !important;
                padding: 3px;
            }
        }
    }

    .menu_item:hover {
        border: 1px solid $border-color;
        cursor: pointer;
        color: $black;
    }

</style>
