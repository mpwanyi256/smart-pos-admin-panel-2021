import { mapActions } from 'vuex';

export default {
  name: 'EmailMixin',
  data() {
    return {
      sendingEmail: false,
    };
  },
  methods: {
    ...mapActions('mail', ['sendEmail']),

    sendClientBookingConfirmation(booking) {
      this.sendingEmail = true;
      this.sendEmail({
        send_booking_confirmation: 1,
        ...booking,
      }).then(() => {
        this.sendingEmail = false;
      }).catch((e) => {
        console.error('error', e);
        this.sendingEmail = false;
      });
    },
  },
};
