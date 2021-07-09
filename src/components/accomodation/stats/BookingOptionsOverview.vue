<template>
    <div class="booking_options">
        <h3>Booking options</h3>

        <div class="booking_list">
            <Table>
                <slot name="body">
                    <tr v-for="method in bookings" :key="method.id">
                        <td>{{ method.name.toUpperCase() }}</td>
                        <td>{{ method.count_display }}</td>
                    </tr>
                </slot>
            </Table>
        </div>
    </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';

export default {
  name: 'BookingOptionsOverview',
  props: {
    bookings: {
      type: Array,
      required: true,
    },
  },
  components: {
    Table,
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.booking_options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    overflow-x: hidden;

    .booking_list {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        overflow-x: hidden;
    }
}

</style>
