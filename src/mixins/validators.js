import validator from 'validator';

export default {
  name: 'validators',
  methods: {
    isEmail(str) {
      return validator.isEmail(str);
    },
  },
};
