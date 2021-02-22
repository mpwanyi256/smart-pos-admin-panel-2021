<template>
    <div class="menu_item" :class="{ 'hidden' : isHidden }">
        <div class="item_name">
            {{ menuItem.name }}
        </div>
        <div class="item_price">
            {{ menuItem.category }}
        </div>
        <div class="item_price">
            {{ menuItem.price_display }}
        </div>
        <div class="item_action">
            <v-btn small dark @click="$emit('changeStatus', menuItem)"
                class="toggle_hide_button"
                :color="isHidden ? 'red darken-3' : 'green darken-3'">
                {{ isHidden ? 'Show' : 'Hide' }}
            </v-btn>
            <v-btn icon small class="update_button"
                @click="$emit('update', menuItem)"
            >
                <v-icon>mdi-pencil</v-icon>
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
        min-height: 50px;
        background-color: $white;
        border: 0.5px solid $light-grey;
        display: grid;
        grid-template-columns: 50% 20% 20% 10%;
        justify-content: left;
        align-items: center;
        padding-left: 15px;
        padding-right: 15px;
        color: $black-text;
        size: 14px;

        .item_name, .item_price {
            padding-right: 15px;
            max-lines: 1;
            line-height: 1.5;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 100%;
            white-space: nowrap;
            text-align: left;
        }

        .item_action {
            display: inline-flex;
            justify-content: right;
            direction: rtl;
            gap: 5px;

            .recipe_button {
                background-color: $light-grey;
            }

            .update_button {
                background-color: $dark-grey;
                color: $white !important;
                padding: 3px;
            }

            .toggle_hide_button {
                width: 50px;
            }
        }
    }

    .menu_item:hover {
        border: 1px solid $border-color;
        cursor: pointer;
        color: $black;
    }

    .hidden {
        background-color: rgb(248, 198, 198);
        color: $black;
    }

</style>
