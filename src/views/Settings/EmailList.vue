<template>
    <div class="emails">
        <Table>
            <template slot="header">
                <tr>
                    <th>
                        <BaseTextfield v-model="search" placeholder="Search" />
                    </th>
                    <th>
                      <v-btn
                        class="float-right"
                        @click="addMail = true">
                          <v-icon left>
                              mdi-plus
                          </v-icon>
                          Add email
                      </v-btn>
                    </th>
                </tr>
            </template>
            <template slot="body">
                <tr v-for="(email, i) in filteredEmails" :key="i">
                    <td class="section_name"
                        @click="updateEmail(email)"
                    >
                        {{ email.email }}
                    </td>
                    <td>
                        <BaseSwitch
                            class="float-right"
                            :status="email.is_active"
                            color="green"
                            @change="updateEmailStatus($event, email.id)"
                        />
                    </td>
                </tr>
            </template>
        </Table>
        <SingleFieldUpdateModal
          v-if="addMail"
          placeholder="Add new Email address"
          @close="addMail = false"
          @save="addEmail($event)"
        />
        <SingleFieldUpdateModal
          v-if="editMail && selectedEmail"
          :preset="selectedEmail.email"
          placeholder="Update email address"
          @close="editMail = false"
          @save="updateEmailAddress($event)"
        />
    </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';
import BaseSwitch from '@/components/generics/BaseSwitch.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import SingleFieldUpdateModal from '@/components/generics/new/SingleFieldUpdateModal.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EmailList',
  components: {
    Table,
    BaseTextfield,
    BaseSwitch,
    SingleFieldUpdateModal,
  },
  data() {
    return {
      mails: [],
      addMail: false,
      search: '',
      selectedEmail: null,
      editMail: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),

    filteredEmails() {
      return this.mails.filter((mail) => mail.email
        .toLowercase().match(this.search.toLowercase));
    },
  },
  created() {
    this.fetchEmails();
  },
  methods: {
    ...mapActions('settings', ['post']),

    updateEmailAddress(newUpdate) {
      this.post({
        update_email_address: newUpdate,
        email_id: this.selectedEmail.id,
      }).then(() => {
        this.fetchEmails();
      });
      this.editMail = false;
    },

    updateEmail(email) {
      this.selectedEmail = email;
      this.editMail = true;
    },

    fetchEmails() {
      this.post({
        fetch_mail_list: this.user.company_id,
      }).then((response) => {
        this.mails = response.data;
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
