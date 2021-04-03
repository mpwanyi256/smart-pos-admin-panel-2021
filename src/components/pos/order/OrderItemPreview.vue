<template>
    <div class="order_item">
        <p>{{ orderItem.name }}</p>
        <div class="update_options">
            <div class="input_field">
                <template v-if="addNote && isPending">
                    <input type="text" v-model="itemNotes"
                    class="search_field" placeholder="Add note" />
                    <v-btn small @click="saveNote">Save</v-btn>
                </template>
                <template v-else>
                    <p @click="addNote = !addNote" class="notes">{{ orderItem.notes }}</p>
                </template>
            </div>
            <div class="options">
                <BaseTooltip @button="deleteItem" message="Delete item" icon="delete" />
                <BaseTooltip message="Discount item" icon="sale" />
                <BaseTooltip v-if="isPending" @button="addNote = !addNote"
                message="Add notes" icon="note" />
            </div>
            <ConfirmModal
              v-if="confirmAction"
              @close="confirmAction = false"
              @yes="$emit('delete', orderItem.id)"
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
    };
  },
  computed: {
    isPending() {
      return this.orderItem.status === '0';
    },
  },
  methods: {
    ...mapActions('pos', ['updateRunningOrder']),

    async deleteItem() {
      this.confirmAction = true;
    },

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
        min-height: 100px;
        background-color: $white;
        border: 1px solid $border-color;
        border-radius: 5px;
        box-shadow: $elevation-low;
        padding: 10px;

        p {
            color: $black;
            font-size: 16px;
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
                    color: $red-hover;
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
