/* eslint-disable no-unused-vars */
import firebase from 'firebase/app';
import API from '@/api';

const PATH = 'backups/';

export default {
  namespaced: true,
  actions: {
    async fetchData({ commit }, payload) {
      const frm = new FormData();
      const comapnyId = localStorage.getItem('smart_company_id');
      const params = Object.keys(payload);
      frm.append('company_id', comapnyId);
      params.forEach((par) => {
        frm.append(par, payload[par]);
      });
      return API.smart(PATH, frm);
    },

    async pushToCloud({ commit }, payload) {
      const COLLECTION = firebase.firestore().collection(payload.collection);
      const batch = firebase.firestore().batch();
      const dataToWrite = payload.data;

      dataToWrite.forEach((item) => {
        const itemRef = COLLECTION.doc(item.key);
        batch.set(itemRef, item.data);
      });

      return batch.commit();
    },
  },
};
