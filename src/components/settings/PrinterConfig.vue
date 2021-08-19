<template>
    <Basemodal
        :title="`${department.name} Printer config`"
        :size="500" @close="$emit('close')"
    >
        <div class="new_table">
            <p class="grey--text">Printer name or IP address</p>
            <BaseTextfield
              v-model="printerAddress"
              placeholder="Printer name or IP address"
            />
            <p class="grey--text mt-3">Connection type</p>
            <v-select
              dense :items="connectionTypes"
              v-model="connectionType"
              label="Connection type"
              outlined
              item-text="name"
              item-value="id"
            />
            <v-btn
              class="float-right mt-3"
              :disabled="!printerAddress.length && !connectionType.length"
              @click="addConfig"
            >
              Save
            </v-btn>
        </div>
    </Basemodal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';

export default {
  name: 'PrinterConfig',
  components: {
    Basemodal,
    BaseTextfield,
  },
  props: {
    department: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      printerAddress: '',
      connectionType: 1,
      connectionTypes: [
        { id: 1, name: 'IP Address' },
        { id: 2, name: 'USB' },
      ],
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  methods: {
    ...mapActions('settings', ['post']),

    addConfig() {
      const config = {
        address: this.printerAddress,
        connection_type: this.connectionType,
        add_printer_config: this.department.id,
        company_id: this.user.company_id,
      };
      this.post(config)
        .then(() => {
          this.$emit('reload');
        }).catch((e) => {
          console.error('Error adding printer config', e);
        });
    },
  },
};
</script>
<style scoped lang="scss">
.new_table {
    min-height: 50px;
    padding: 15px;
    overflow: hidden;
}
</style>
