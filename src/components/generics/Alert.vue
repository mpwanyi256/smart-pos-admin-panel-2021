<template>
    <div
        ref="alert"
        :class="['base-alert alert', status, (background ? ('bg-' + background) : '')]"
        @click="$emit('click')"
    >
        <i
            v-if="icon"
            class="material-icons"
        >
            <v-icon>{{ `mdi-${icon}` }}</v-icon>
        </i>
        <div class="message">
            <slot />
        </div>
        <i
            v-if="iconExt"
            :class="'mdi mdi-' + iconExt"
        ></i>

    </div>
</template>

<script>
export default {
  name: 'Alert',

  props: {
    icon: {
      type: String,
      required: false,
    },

    iconExt: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      required: false,
    },

    background: {
      type: String,
      required: false,
    },
  },

  mounted() {
    this.$refs.alert.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'start',
    });
  },
};
</script>

<style scoped lang="scss">
    @import '@/styles/pos/variables.scss';
    @import '@/styles/pos/mixins.scss';

    .alert {
        padding: 10px 12px;
        border-radius: 4px;
        border: 1px solid $light-gray;
        background: white;
        display: flex;
        align-items: flex-start;
        color: $black;
        box-shadow: $elevation-default;

        i {
            font-size: 18px;
        }

        i + .message {
            padding-left: 16px;
        }

        .message {
            flex: 1;
            align-self: center;
            text-align: left;

            &,
            * {
                font-size: 14px;
            }

            * {
                color: inherit;
            }

            a {
                text-decoration: underline;
            }

            span {
                font-weight: inherit;
            }
        }

        &.bg-blue,
        &.info {
            border-color: $blue;

            i {
                color: $blue;
            }
        }

        &.bg-red,
        &.error {
            border-color: $red;
            color: $red;
        }

        &.bg-yellow,
        &.warning,
        &.pending {
            border-color: $yellow;

            i {
                color: $yellow;
            }
        }

        &.bg-green,
        &.success {
            border-color: $green;

            i {
                color: $green;
            }
        }

        &.bg-orange {
            border-color: $orange;

            i {
                color: $orange;
            }
        }

        &.bg-violet {
            border-color: $violet;

            i {
                color: $violet;
            }
        }

        &.bg-gray {
            border-color: $gray;

            i {
                color: $darkest-gray;
            }
        }
    }
</style>
