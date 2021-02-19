import axios from 'axios';
// import router from '../router';

export default {
  async smart(path, params) {
    return axios.post(path, params)
      .then((response) => response.data)
      .catch(() => {
        // router.push({ name: 'error', params: err });
        if (path.localeCompare('auth/')) {
          this.$store.dispatch('auth/setLoading', false);
        }
      });
  },
};
