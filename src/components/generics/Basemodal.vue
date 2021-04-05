<template>
    <v-dialog v-model="dialog" :width="size ? size : 500" persistent>
        <v-card class="modal_content">
            <v-card-title class="black--text">
                <slot name="action" />
                {{ title ? title : '' }}
                <v-spacer></v-spacer>
                <v-btn icon color="black" @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <slot></slot>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
  name: 'Basemodal',
  props: {
    size: {
      type: Number,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      dialog: true,
    };
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

.modal_content {
  ::-webkit-scrollbar{
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
      background: $blue;
      border-radius: 1ex;
      -webkit-border-radius: 1ex;
      -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
  }

  ::-webkit-scrollbar-corner {
      background: #000;
  }
}
</style>
