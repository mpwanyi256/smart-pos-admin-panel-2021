<template>
    <label class="switch">
        <input
            :id="id"
            v-model="inputValue"
            v-bind="$attrs"
            type="checkbox"
            v-on="listeners"
            @change="$emit('change', $event.target.checked)"
        >
        <span class="slider"></span>
    </label>
</template>

<script>
/* eslint-disable no-plusplus */
let counter = 0;

export default {
  name: 'ToggleSwitch',

  inheritAttrs: false,

  props: {
    id: {
      type: [Number, String],
      default() {
        return `switch-${counter++}`;
      },
    },

    value: {
      type: Boolean,
      required: false,
    },
  },

  computed: {
    listeners() {
      const { ...listeners } = this.$listeners;
      delete listeners.input;
      return listeners;
    },

    inputValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/constants.scss';

    .switch {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 24px;
    }

    input {
        display: none;
    }

    input {
        display: none;

        &[disabled] + .slider {
            background: $white;
        }

        &[disabled]:checked + .slider {
            background: $white;
        }

        &:checked + .slider {
            background: $white;
        }

        &:checked + .slider:before {
            transform: translateX(23px);
            box-shadow: $elevation-low;
        }
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: $blue;
        border-radius: 50px;
        transition-duration: .2s;

        &::before {
            position: absolute;
            content: "";
            left: 4px;
            bottom: 4px;
            background: $blue;
            border-radius: 50%;
            transition-duration: .4s;
        }
    }
</style>
