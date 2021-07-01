<template>
    <div class="client"
      @click="$emit('select', client)"
    >
        <Avatar src="" />
        <div class="client_info">
          <p>{{ client.full_name }}</p>
          <p class="client_info_section">
            <span>
              <v-icon small>mdi-map-marker</v-icon>
            </span>
            {{ `${client.address} ${client.contact}` }}
          </p>
        </div>
    </div>
</template>
<script>
import Avatar from '@/components/generics/new/Avatar.vue';

export default {
  name: 'Client',
  components: {
    Avatar,
  },
  props: {
    client: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.client {
    display: flex;
    align-content: center;
    gap: 15px;
    height: 64px;
    width: 100%;
    border-bottom: 1px solid $border_color;
    padding: 8px;

  .client_info {
    display: flex;
    flex-direction: column;
    gap: 0;

    p {
      color: $black;
      line-height: 1.5;
      padding: 0;
      margin: 0;
      font-size: 16px;
      font-weight: bold;
    }

    .client_info_section {
      font-size: 14px !important;
      color: $grey !important;
      font-weight: normal;
    }
  }
}

.client:hover {
  cursor: pointer;
  background-color: $border_color;
}
</style>
