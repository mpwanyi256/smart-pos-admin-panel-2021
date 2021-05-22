<template>
    <Basemodal
      :title="`Pick room to create booking`"
      :size="1020" @close="$emit('close')">
        <div class="rooms_view">
            <div class="rooms">
                <div class="room"
                v-for="room in propertyRooms"
                :key="`room-${room.id}`"
                @click="$emit('picked', room)">
                    {{ room.name }}
                </div>
            </div>
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';

export default {
  name: 'SelectRoom',
  components: {
    Basemodal,
  },
  props: {
    rooms: {
      type: Array,
      required: true,
    },
  },
  computed: {
    propertyRooms() {
      return this.rooms.filter((room) => room.id > 0);
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.rooms_view {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 5px;

    .rooms {
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;
        color: $black;

        .room {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            border: 0.5px solid $border-color;
            border-radius: 5px;
            cursor: pointer;
            margin: 2px;
        }

        .room:hover {
            background-color: $border-color;
        }
    }
}
</style>
