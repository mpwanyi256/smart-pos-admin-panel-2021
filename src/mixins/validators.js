export default {
  name: 'validators',
  methods: {
    isEmail(str) {
      if (!str) return false;
      const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      return str.match(pattern);
    },
  },
};
