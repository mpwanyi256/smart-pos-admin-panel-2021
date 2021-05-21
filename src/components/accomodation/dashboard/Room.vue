<template>
    <div class="unit_item">
        <p class="unit_name">{{ room.name }}
            <span class="float-right unit_price">
                {{ roomPricing }} {{ room.currency }}
            </span>
        </p>
        <div class="occupy_status">
            <div>
                <v-btn
                    small
                    @click="bookRoom = true"
                >
                    BOOK ROOM
                </v-btn>
            </div>
            <div>
                <v-btn
                    small
                    class="float-right btn_view_booking"
                    @click="$emit('viewRoomBookings', room)"
                >
                    View Bookings
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'Room',
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      bookRoom: false,
      viewBooking: false,
    };
  },
  computed: {
    roomPricing() {
      return this.room.daily_rate_display;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.btn_view_booking {
    background-color: $accent!important;
    color: $white;
}

.unit_item {
    min-height: 80px;
    border: 0.5px solid $border-color;
    box-shadow: $elevation-low;
    display: flex;
    flex-direction: column;
    padding: 15px;
    color: $black;

    .unit_name {
        font-weight: bold;

        .unit_price {
            color: $accent-color;
        }
    }

    p {
        font-size: 16px;
    }

    .occupy_status {
        display: grid;
        grid-template-columns: 50% 50%;

        >div {
            .client_name {
                color: $grey;
                line-height: 1.5;
                margin: 0;
                top: 0;
                bottom: 0;
            }

            .depature_date {
                color: $gray-60;
                line-height: 1.5;
                margin: 0;
                top: 0;
                bottom: 0;
                font-size: 14px;
            }
        }
    }
}

</style>
