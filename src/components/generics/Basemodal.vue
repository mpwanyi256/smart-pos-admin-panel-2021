<template>
    <v-dialog v-model="dialog" :width="size ? size : 500" persistent>
        <v-card>
            <v-card-title class="black--text">
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
