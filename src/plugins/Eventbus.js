import Vue from 'vue';

const EventBus = new Vue();

EventBus.$on('i-got-clicked', (orderId) => {
  console.log(`Fetch order info ${orderId} `);
});

export default EventBus;
