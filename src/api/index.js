/* eslint-disable no-return-await */
import axios from 'axios';

export default {
  async auth(payload) {
    const params = new FormData();
    params.append('username', payload.username);
    params.append('password', payload.password);
    return await axios.post('auth/', params)
      .then((response) => response.data).catch((err) => err);
  },
  async authId(payload) {
    const params = new FormData();
    params.append('auth_by_id', payload);
    return await axios.post('auth/', params)
      .then((response) => response.data).catch((err) => err);
  },
  async smart(path, params) {
    return await axios.post(path, params)
      .then((response) => response.data).catch((err) => err);
  },
  async update(path, payload) {
    return await axios.patch(path, payload)
      .then((response) => response.data).catch((err) => err);
  },
};
