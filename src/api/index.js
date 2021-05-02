import axios from 'axios';

export default {
  async smart(path, params) {
    return axios.post(path, params)
      .then((response) => response.data)
      .catch(() => {
        if (path.localeCompare('auth/')) {
          this.$store.dispatch('auth/setLoading', false);
        }
      });
  },
};
