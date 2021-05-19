<template>
    <div class="units_main">
        <div class="property_info">
            <h3>
                Bookings
                <span><br>
                    <small>
                        {{ property.name }}
                    </small>
                </span>
            </h3>
        </div>

        <BaseTextfield v-model="search" placeholder="Search for a room" />

        <div class="units_list">
           <div>
            <Room
                v-for="room in roomsFiltered"
                :key="room.id"
                :room="room"
            />
           </div>
        </div>
    </div>
</template>
<script>
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import Room from '@/components/accomodation/dashboard/Room.vue';

export default {
  name: 'Bookings',
  components: {
    BaseTextfield,
    Room,
  },
  props: {
    property: {
      type: Object,
      required: true,
    },
    rooms: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: '',
      addUnit: false,
    };
  },
  computed: {
    propertyId() {
      return this.property.id;
    },
    roomsFiltered() {
      return this.rooms.filter((room) => room.name.toLowerCase().match(this.search.toLowerCase()));
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.units_main {
    display: flex;
    width: 100%;
    flex-direction: column;
    height: calc(100vh - 114px);
    overflow: hidden;
    // border: 0.5px solid $border-color;
    border-radius: 5px;
    box-shadow: $elevation-low;
    color: $white;

    .property_info {
        border-radius: 5px 5px 0 0;
        display: grid;
        grid-template-columns: 70% 30%;
        width: 100%;
        background-color: $tertiary;
        // border: 0.5px solid $border-color;
        height: 65px;
        justify-content: center;
        padding: 10px;
        font-weight: 200;
        color: $white;

        h3 {
            top: 0;
            bottom: 0;
            line-height: 1.5;
            font-size: 16px;
            text-transform: capitalize;

            span {
                font-size: 14px;
                text-transform: lowercase;
            }
        }

        .property_actions {
            display: flex;
            flex-direction: row;
            direction: rtl;
            gap: 10px;
        }
    }

    .units_list {
        color: $black;
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: calc(100vh - 219px);
        overflow-y: auto;
    }
}
</style>
