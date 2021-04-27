<template>
    <Basemodal
        title="Add Waiter"
        :size="700" @close="$emit('close')">
        <v-slot name="action">
          <BaseTextfield v-model.trim="search" />
        </v-slot>
        <div class="waiters">
            <div class="waiters_list">
              <div
                v-for="i in waiters"
                :key="i"
                class="waiter_card"
                :class="i.user_name == order.waiter ? 'is_selected' : ''"
                @click="addWaiterToOrder(i.id)">
                <p>{{ i.user_name }}</p>
              </div>
            </div>
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import { mapActions } from 'vuex';

export default {
  name: 'WaitersModal',
  components: {
    Basemodal,
    BaseTextfield,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      search: '',
      users: [],
    };
  },
  computed: {
    waiters() {
      return this.users.filter((User) => User.user_role === 3 && User.is_active === 1
              && User.user_name.toLowerCase().match(this.search.toLowerCase()));
    },
  },
  async created() {
    await this.fetchEmployees();
  },
  methods: {
    ...mapActions('pos', ['updateOrder']),

    async fetchEmployees() {
      const employees = await this.updateOrder({ fetch_users: 'all' });
      if (!employees.error) this.users = employees.data;
    },

    async addWaiterToOrder(waiterId) {
      const addWaiter = await this.updateOrder({
        add_waiter: waiterId,
        order_id: this.order.order_id,
      });
      if (!addWaiter.error) {
        this.$eventBus.$emit('reload-order');
        this.$emit('close');
      }
    },

  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.waiters {
  height: 340px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  .waiters_list {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    gap: 5px;

    .is_selected, .is_selected:hover {
      background-color: $accent-color;
      color: $white;
    }

    >div {
      height: 70px;
      display: flex;
      justify-content: center;
      justify-items: center;
      align-items: center;
      border: 1px solid $border-color;
      overflow: hidden;
      padding: 15px;
      text-align: center;
      cursor: pointer;
    }

    >div:hover {
      background-color: $border-color;
    }

  }

}
</style>
