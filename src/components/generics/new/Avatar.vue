<template>
    <div
        :class="['avatar', size, {'availability-icon': displayStatus}]"
        :style="'width:' + customSize + 'px;' + 'height:' + customSize + 'px;'"
        v-on="$listeners"
    >
        <img
            v-if="avatarSrc"
            :src="avatarSrc"
            alt="Avatar icon"
            draggable="false"
        >
        <img
            v-else
            src="@/images/default-avatar.png"
            alt="Default avatar icon"
            draggable="false"
        />

        <div
            v-if="displayStatus"
            class="availability-container"
        >
            <div
                class="indicator"
                :class="{ 'online': isOnline, 'offline': !isOnline }"
            >
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Avatar',

  props: {
    src: {
      type: String,
      required: true,
    },

    customSize: {
      type: [String, Number],
      default: '32',
      required: false,
    },

    size: {
      type: String,
      default: '',
      required: false,
    },
    displayStatus: {
      type: Boolean,
      required: false,
    },
    isOnline: {
      type: Boolean,
      required: false,
    },
  },

  data() {
    return {
      avatarSrc: '',
    };
  },

  watch: {
    src: {
      handler(src) {
        const value = src.split('http');
        if (value.length > 2) {
          this.avatarSrc = `http${value[2]}`;
        } else {
          this.avatarSrc = src;
        }

        const testerImage = new Image();
        testerImage.onerror = () => {
          this.avatarSrc = '';
        };
        testerImage.src = this.avatarSrc;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/pos.scss';

    .avatar {
        // @include user-select(none);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: $white;
        border-radius: 50%;
        overflow: hidden;

        img {
            height: 100%;
        }

        &.tiny {
            width: 16px !important;
            height: 16px !important;
        }

        &.small {
            width: 24px !important;
            height: 24px !important;
        }

        &.medium {
            width: 40px !important;
            height: 40px !important;
        }

        &.large {
            width: 48px !important;
            height: 48px !important;
        }

        &.x-large {
            width: 56px !important;
            height: 56px !important;
        }

        &.xx-large {
            width: 64px !important;
            height: 64px !important;
        }

        &.xxx-large {
            width: 72px !important;
            height: 72px !important;
        }
    }

    .availability-icon {
        position: relative;
        overflow: unset;

        img {
            width: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
    }

    .availability-container {
        position: absolute;
        top: 0;
        left: 0;
        width: inherit;
        height: inherit;
        z-index: 1;
        border-radius: 50%;

        .indicator {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 12px;
            width: 12px;
            border-radius: 12px;

            &.offline {
                background: $quaternary;
            }

            &.online {
                background: $success;
            }
        }
    }
</style>
