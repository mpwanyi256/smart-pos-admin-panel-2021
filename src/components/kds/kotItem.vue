<template>
    <div class="kot_item"
        @click="$emit('mark-as-served', menuItem)"
    >
        <div class="item_name">
            <div class="item_name_pane">
                <div>
                    <p>
                        <span>
                            <v-btn icon>
                                {{ menuItem.quantity }}
                            </v-btn>
                        </span>
                        {{ menuItem.name.toUpperCase() }}
                    </p>
                </div>
                <div>
                    <small v-if="!showPreparationTime">
                        {{ timeGone }}
                    </small>
                    <!-- <small v-else>
                        {{ menuItem.preparation_time }}min
                    </small> -->
                </div>
            </div>
            <p v-if="menuItem.notes"
            class="notes">Notes: {{ menuItem.notes }}</p>
        </div>
        <!-- TO DO :: implement Addons -->
        <AddOns v-if="false" />
    </div>
</template>
<script>
import AddOns from '@/components/generics/AddOns.vue';

export default {
  name: 'KotItem',
  props: {
    showPreparationTime: {
      type: Boolean,
      required: true,
    },
    menuItem: {
      type: Object,
      required: true,
    },
  },
  components: {
    AddOns,
  },
  computed: {
    timeGone() {
      const minutes = this.menuItem.minutes_gone;
      return minutes > 0 ? `${minutes} mins` : 'Now';
    },
    minutesGone() {
      return this.menuItem.minutes_gone;
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

.kot_item {
  min-height: 50px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: large;
  border-bottom: 1px solid $border-color;
  justify-content: center;
  font-family: $font-style;

  .just_in {
    background-color: $white;
    color: $black;
  }

  .delaying {
    background-color: $orange;
    color: $black;
  }

  .delayed {
    background-color: $red;
    color: $white !important;
  }

    .item_name {
        padding-left: 5px;

        .item_name_pane {
            display: grid;
            grid-template-columns: 70% 30%;
            font-weight: 400;

            >div:last-child {
              direction: rtl;
              padding-right: 5px;
            }
        }

        .notes {
            color: $grey;
            font-size: medium;
        }
    }

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
}

.kot_item:hover {
    background-color: $light-grey;
    color: $black-text;
    cursor: pointer;
}

</style>
