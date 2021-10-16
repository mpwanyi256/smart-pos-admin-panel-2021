<template>
    <div class="employee_card"
        :class="isSelected ? 'is_selected' : ''"
        @click="$emit('picked', employee)"
    >
        <Avatar class="x-large" src="" />
        <div class="employee_info">
            <p class="employee_name">{{ employee.full_name }}</p>
            <p class="employee_position">{{ employee.position }}</p>
        </div>
    </div>
</template>
<script>
import Avatar from '@/components/generics/new/Avatar.vue';

export default {
  name: 'EmployeeCard',
  components: {
    Avatar,
  },
  props: {
    employee: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.employee_card {
    min-height: 180px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid $border-color;
    border-radius: 5px;
    padding: 0px;
    overflow: hidden;

    .employee_info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0;
        padding: 0;

        p {
            top: 0;
            bottom: 0;
            margin: 0;
            display: block;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
        }

        .employee_name {
            color: $black;
            font-size: 14px;
        }

        .employee_position {
            color: $grey;
            font-size: 12px;
            text-transform: lowercase;
        }
    }
}

.is_selected, .is_selected:hover {
    background-color: $accent-color;

    .employee_info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0;
        padding: 0;

        p {
            top: 0;
            bottom: 0;
            margin: 0;
            display: block;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
        }

        .employee_name {
            color: $white;
            font-size: 14px;
        }

        .employee_position {
            color: $white;
            font-size: 12px;
            text-transform: lowercase;
        }
    }
}

.employee_card:hover {
    background-color: $border-color;
}
</style>
