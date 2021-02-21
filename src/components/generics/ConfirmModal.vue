<template>
    <Basemodal @close="$emit('close')"
        :title=" title ? title : 'Are you sure you want to delete item?'" :size="500">
        <div class="confirm_options">
            <div class="confirm_no text-center" @click="$emit('close')">
                <p>NO</p>
            </div>
            <div class="confirm_yes text-center" @click="$emit('yes')">
                <p>YES</p>
            </div>
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';

export default {
  name: 'ConfirmModal',
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  components: {
    Basemodal,
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

    .confirm_options {
        display: inline-flex;
        flex-direction: row;
        gap: 5px;
        width: 100%;
        padding: 5px;
        justify-items: center;
        height: inherit;
        overflow: hidden;

        > div {
            height: 56px;
            width: 100%;
            justify-content: center;
            font-family: $font-style;
            font-size: 18px;
            justify-items: center;
            border-radius: 5px;
            cursor: pointer;
            color: $white;

            p {
                margin-top: 18px;
            }
        }

        .confirm_yes {
            background-color: $green;
        }

        .confirm_no {
            background-color: $red;
        }
    }
</style>
