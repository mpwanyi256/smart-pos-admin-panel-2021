<template>
    <div class="table"
        :class="hasOrder ? 'hasOrder' : ''"
        @click="$emit('order', table)"
    >
        {{ table.name }}<br>
        <small v-if="table.order.order_number">
            #{{ table.order.order_number }}
        </small>
    </div>
</template>
<script>
export default {
  name: 'TableComponent',
  props: {
    table: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hasOrder() {
      return this.table.order.id > 0;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.table {
    background-color: $white;
    border: 1px solid $border-color;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70px;
    margin: 5px;
    cursor: pointer;
  }

  .hasOrder {
      background-color: $blue !important;
      color: $white;
  }

</style>
