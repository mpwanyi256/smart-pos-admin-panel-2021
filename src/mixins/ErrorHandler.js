export default {
  name: 'ErrorHandler',
  watch: {
    error() {
      setTimeout(() => {
        this.error = '';
      }, 5000);
    },
  },
};
