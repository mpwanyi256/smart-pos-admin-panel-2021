<template>
    <div class="emails">
        <Table>
            <template slot="header">
                <tr>
                    <th>Printer Address</th>
                    <th>Connection type</th>
                    <th>
                      <v-btn
                        class="float-right"
                        @click="addMail = true">
                          <v-icon left>
                              mdi-plus
                          </v-icon>
                          Add printer
                      </v-btn>
                    </th>
                </tr>
            </template>
            <template slot="body">
                <tr v-for="(printer, i) in printers" :key="i">
                    <td
                      class="update"
                      @click="updatePrinterAddress(printer)"
                    >{{ printer.address }}</td>
                    <td>{{ printer.connection_type }}</td>
                    <td>
                        <v-btn icon class="float-right"
                            @click="deletePrinter(printer)"
                        >
                            <v-icon class="red--text darken--3">mdi-delete</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </Table>
        <SingleFieldUpdateModal
          v-if="selectedPrinter && editPrinter"
          placeholder="Update printer address"
          :preset="selectedPrinter.address"
          @close="editPrinter = false"
          @save="updateAddress($event)"
        />
        <!-- <SingleFieldUpdateModal
          v-if="editMail && selectedEmail"
          :preset="selectedEmail.email"
          placeholder="Update email address"
          @close="editMail = false"
          @save="updateEmailAddress($event)"
        /> -->
    </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';
// import BaseSwitch from '@/components/generics/BaseSwitch.vue';
// import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import SingleFieldUpdateModal from '@/components/generics/new/SingleFieldUpdateModal.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Printers',
  components: {
    Table,
    // BaseTextfield,
    // BaseSwitch,
    SingleFieldUpdateModal,
  },
  data() {
    return {
      printers: [],
      editPrinter: false,
      selectedPrinter: null,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  created() {
    this.fetchPrinters();
  },
  methods: {
    ...mapActions('settings', ['post']),

    updateAddress(address) {
      this.post({
        update_printer_address: address,
        printer_id: this.selectedPrinter.id,
      }).then(() => {
        this.fetchPrinters();
      });
      this.editPrinter = false;
    },

    updatePrinterAddress(printer) {
      this.selectedPrinter = printer;
      this.editPrinter = true;
    },

    deletePrinter(printer) {
      this.post({
        drop_printer: printer.id,
      }).then(() => {
        this.fetchPrinters();
      });
    },

    fetchPrinters() {
      this.post({
        fetch_printers_list: this.user.company_id,
      }).then((response) => {
        this.printers = response.data;
      });
    },

    addEmail(mail) {
      this.post({
        add_new_email: mail,
        company_id: this.user.company_id,
      }).then(() => {
        this.fetchEmails();
      });
      this.addMail = false;
    },

    updateEmailStatus(status, emailId) {
      this.post({
        update_mail_status: status ? 0 : 1,
        email_id: emailId,
      }).then(() => {
        this.fetchEmails();
      });
    },
  },
};
</script>
<style scoped>
.update {
  cursor: pointer;
}
</style>
