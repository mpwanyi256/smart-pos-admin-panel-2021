<template>
    <Basemodal
      :title="`Actions`"
      :size="700" @close="$emit('close')">
      <div class="manager_actions">
          <div class="actions_list">
            <div class="action"
                v-for="(action, i) in actions"
                :key="i"
                @click="$emit('action', action.action)"
            >
                {{ action.name }}
            </div>
          </div>
      </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';

export default {
  name: 'ManagerActions',
  components: {
    Basemodal,
  },
  data() {
    return {
      actions: [
        { name: 'View Sales Report', action: 'sales' },
        { name: 'Send email', action: 'email' },
        { name: 'Open new day', action: 'open' },
        { name: 'Extend License', action: 'license' },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.manager_actions {
  display: flex;
  flex-direction: column;
  gap: 15px;

  .actions_list {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 10px;
        padding-bottom: 15px;

        .action {
            height: 50px;
            min-width: 100px;
            background-color: $white;
            color: $black;
            box-shadow: $elevation-low;
            display: flex;
            justify-content: center;
            padding: 10px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
        }

    }

  }

</style>
