<template>
    <div class="supplier" :class="isSelected ? 'selected': '' " @click="$emit('pick', supplier)">
        <Avatar class="medium" src="" @click="$emit('pick', supplier)" />
        <div class="supplier_info" @click="$emit('pick', supplier)">
            <p class="name">{{ supplier.name }}</p>
            <p class="contact">
                <span>
                    <v-icon small :class="isSelected ? 'selected': '' ">
                        mdi-phone
                    </v-icon>
                </span>
                {{ supplier.contact }}
                <template v-if="supplier.email">
                <span>
                    <v-icon small :class="isSelected ? 'selected': '' ">
                        mdi-email
                    </v-icon>
                </span>
                {{ supplier.email }}
                </template>
            </p>
        </div>
    </div>
</template>
<script>
import Avatar from '@/components/generics/new/Avatar.vue';

export default {
  name: 'Supplier',

  components: {
    Avatar,
  },

  props: {
    supplier: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/constants.scss';

    .selected, .selected:hover {
        background-color: $accent !important;
        color: $white !important;

        .supplier_info {
            p {
                color: $white !important;
            }
        }
    }

    .supplier {
        width: 100%;
        min-height: 30px;
        display: grid;
        grid-template-columns: 10% 90%;
        column-gap: 15px;
        border: 1px solid $light-grey;
        align-items: center;
        padding: 8px 4px;
        cursor: pointer;

        .supplier_info {
            height: 100%;
            display: flex;
            flex-direction: column;
            column-gap: 10px;

            p {
                line-height: 1.5;
                margin: 0;
                top: 0;
                bottom: 0;
            }

            .name {
                font-size: 16px;
                color: $darkest-gray;
            }

            .contact {
                color: $dark-grey;
            }
        }
    }

    .supplier:hover {
        background-color: $light-gray;
    }
</style>
