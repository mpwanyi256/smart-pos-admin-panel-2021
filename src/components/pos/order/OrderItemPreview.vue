<template>
    <div class="order_item">
        <div class="item_name_display">
          <p>{{ orderItem.name.toUpperCase() }}
            <br>
              <span class="item_amount">
                {{ orderItem.amount }}
              </span>
          </p>
        </div>
        <div class="update_options">
            <div class="input_field">
                <template v-if="addNote && isPending">
                    <input type="text" v-model="itemNotes"
                    class="search_field" placeholder="Add note" />
                    <v-btn small @click="saveNote">Save</v-btn>
                </template>
                <template v-else>
                    <small
                      v-if="orderItem.notes"
                      @click="addNote = !addNote" class="notes"
                    >
                      <span>
                        Notes:
                      </span>
                      {{ orderItem.notes }}
                    </small>
                </template>
            </div>
            <div class="options">
                <BaseTooltip
                  v-if="isPending"
                  @button="$emit('delete', orderItem.id)"
                  message="Delete item"
                  icon="delete"
                />
                <BaseTooltip
                  v-if="!isPending"
                  message="Shift item"
                  icon="sale"
                />
                <BaseTooltip
                  v-if="isPending"
                  @button="addNote = !addNote"
                  message="Add notes"
                  icon="note"
                />
                <BaseTooltip
                  v-if="!isPending"
                  @button="cancelOrderItem = true"
                  color="blue"
                  message="Cancel item"
                  icon="delete"
                />
            </div>
            <ConfirmModal
              v-if="cancelOrderItem"
              :requireReason="true"
              @close="cancelOrderItem = false"
              @yes="$emit('candelOrder', orderItem)"
            />
        </div>
    </div>
</template>
<script>
import BaseTooltip from '@/components/generics/BaseTooltip.vue';
import ConfirmModal from '@/components/generics/ConfirmModal.vue';
import { mapActions } from 'vuex';

export default {
  name: 'OrderItemPreview',
  props: {
    orderItem: {
      type: Object,
      required: true,
    },
  },
  components: {
    BaseTooltip,
    ConfirmModal,
  },
  data() {
    return {
      addNote: false,
      itemNotes: '',
      confirmAction: false,
      cancelOrderItem: false,
    };
  },
  computed: {
    isPending() {
      return this.orderItem.status === '0';
    },
  },
  methods: {
    ...mapActions('pos', ['updateRunningOrder']),

    saveNote() {
      const filter = {
        add_item_note: this.itemNotes,
        item_id: this.orderItem.id,
      };
      this.$emit('note', filter);
      this.addNote = false;
    },
  },

  created() {
    this.itemNotes = this.orderItem.notes;
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .order_item {
        min-height: 130px;
        background-color: $white;
        border: 1px solid $border-color;
        border-radius: 5px;
        box-shadow: $elevation-low;
        padding: 10px;
        display: flex;
        flex-direction: column;

        .item_name_display {
          display: flex;
          width: 100%;
          justify-content: left;
          color: $black;

          p {
              color: $black;
              font-size: 16px;
              width: 100%;
              .item_amount {
                color: $accent-color;
                font-weight: bold;
                text-align: right;
              }
          }
        }

        .update_options {
            display: grid;
            grid-template-columns: 80% 20%;

            .input_field {
                display: flex;
                flex-direction: row;
                gap: 5px;
                align-items: center;

                .notes {
                    color: $black;
                    background-color: $border-color;
                    padding: 0px 5px 0px 5px;
                    border-radius: 5px;
                    text-transform: uppercase;
                    cursor: pointer;
                }

                .search_field {
                    height: 35px;
                    border: 1px solid $white;
                    background-color: $white;
                    border-radius: 5px;
                    margin-right: 10px;
                    direction: ltr;
                    padding-left: 5px;
                    padding-right: 5px;
                    box-shadow: $elevation-default;
                }
            }

            .options {
                display: flex;
                flex-direction: row;
                direction: rtl;
                gap: 10px;
            }
        }
    }
</style>
