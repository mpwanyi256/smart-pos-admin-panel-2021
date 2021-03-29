<template>
    <div :class="['base-check', checkType]">
        <input
            :id="id"
            :name="name"
            :value="value"
            :checked="value"
            :disabled="disabled"
            v-bind="$attrs"
            :class="inputCheckbox"
            type="checkbox"
            v-on="listeners"
            @change="$emit('input', $event.target.checked)"
        />
        <label
            :for="id"
            :class="labelType"
        >
            <template v-if="!hasCustomSlot">
                <template v-if="checkType == 'default'">
                    <div :class="['label-wrapper', radioOrder]">
                        <span class="checkmark" />
                        <span v-if="hasDefaultSlot" class="label">
                            <slot />
                        </span>
                    </div>
                </template>
                <template v-else-if="checkType == 'button'">
                    <div
                        :class="[
                            'check-button',
                            buttonSize,
                            buttonWidth,
                            ('color-' + buttonColor),
                            ('checked-' + buttonCheckedColor),
                            buttonVariant
                        ]"
                    >
                        <i v-if="buttonWithCheck == true" class="material-icons btn-check">check</i>
                        <span>
                            <slot />
                        </span>
                    </div>
                </template>
                <template v-else>
                    <slot />
                </template>
            </template>
            <slot v-else name="custom" />
        </label>
    </div>
</template>

<script>
let counter = 0;

export default {
  name: 'BaseCheckBox',

  inheritAttrs: false,

  props: {
    id: {
      type: [String, Number],
      default() {
        // eslint-disable-next-line no-plusplus
        return `checkbox-${counter++}`;
      },
    },

    name: {
      type: String,
      required: false,
    },

    value: {
      type: Boolean,
      required: false,
    },

    checked: {
      type: Boolean,
      required: false,
    },

    actualValue: {
      type: [String, Number],
      default() {
        // eslint-disable-next-line no-plusplus
        return `checkbox-${counter++}`;
      },
    },

    inputCheckbox: {
      type: String,
      default: 'hidden',
      required: false,
    },

    // button-first, label-first
    radioOrder: {
      type: String,
      required: false,
    },

    // default, button, switch
    checkType: {
      type: String,
      default: 'default',
      required: false,
    },

    // checkType="button"

    // default, small, medium, large
    buttonSize: {
      type: String,
      default: 'default',
      required: false,
    },

    buttonWidth: {
      type: String,
      required: false,
    },

    // regular, blue, green, red, yellow
    buttonColor: {
      type: String,
      default: 'default',
      required: false,
    },

    // true, false
    buttonWithCheck: {
      type: Boolean,
      default: false,
      required: false,
    },

    // green, red, blue, yellow
    buttonCheckedColor: {
      type: String,
      default: 'default',
      required: false,
    },

    // transparent, borderless, colored-border
    // Usage: :buttonVariant="['transparent', 'borderless']"
    //        buttonVariant="borderless"
    buttonVariant: {
      type: [Array, String, Object],
      required: false,
    },

    // checkType="slider"

    disabled: {
      type: Boolean,
    },

    // for Issue filters
    labelType: {
      type: String,
      default: '',
      required: false,
    },
  },

  computed: {
    hasCustomSlot() {
      return !!this.$slots.custom;
    },

    hasDefaultSlot() {
      return !!this.$slots.default;
    },

    listeners() {
      const { ...listeners } = this.$listeners;
      delete listeners.input;
      return listeners;
    },
  },
};
</script>

<style lang="scss" scoped>
    @import '@/styles/pos/variables.scss';
    @import '@/styles/pos/mixins.scss';

    .base-check {
        display: inline-block;

        input[type=checkbox] {
            display: none;

            &[disabled] {
                &,
                & + label {
                    cursor: not-allowed;
                    opacity: 0.2;
                }
            }
        }

        .visible {
            display: inline-block;
        }
    }

    .default {
        label {
            display: flex;
            align-items: center;
            cursor: pointer;
            width: 100%;

            span {
                font-size: 14px;
            }

            .label-wrapper {
                width: 100%;
                display: inline-flex;
                align-items: center;

                .label {
                    // display: flex;
                    // align-items: center;
                    flex: 1;
                    align-self: center;
                }

                &,
                &.checkmark-first {
                    .checkmark + .label {
                        padding-left: 12px;
                    }
                }

                &.label-first {
                    .checkmark {
                        order: 2;
                    }

                    .label {
                        order: 1;
                        padding-left: 0;
                        padding-right: 12px;
                    }
                }
            }

            &.dropdown {
                padding: 8px 16px;
            }
        }

        .checkmark {
            position: relative;
            @include width-height(20px);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: $white;
            border: 2px solid $gray;
            border-radius: 4px;
            transition-duration: .2s;

            &::after {
                content: "";
                position: absolute;
                display: none;
            }
        }

        .checkmark::after {
            left: 5px;
            top: 1px;
            width: 6px;
            height: 12px;
            border: solid white;
            border-width: 0 2px 2px 0;
            @include rotate(45deg);
        }

        input[type=checkbox]:hover + label {
            .checkmark {
                background: $light-gray;
            }
        }

        input[type=checkbox]:checked + label {
            .checkmark {
                background: $blue;
                border-color: $blue;

                &::after {
                    display: block;
                }
            }
        }

        input[type=checkbox][disabled] + label {
            .checkmark {
                background: $lightest-gray;

                &:hover {
                    border-color: $light-gray;
                }
            }
        }

        input[type=checkbox][disabled]:checked + label {
            .checkmark {
                background: $blue-disabled;
                border-color: $blue-disabled;

                &:hover {
                    border-color: $blue-disabled;
                }
            }
        }
    }

    .button {
        label {
            cursor: pointer;
        }

        .check-button {
            @include user-select(none);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-transform: uppercase;
            color: $black;
            background: $white;
            border: 1px solid $light-gray;
            border-radius: 4px;
            text-decoration: none;
            font-size: 16px;
            transition-duration: .2s;

            &:hover {
                background: $lightest-gray;
            }

            .btn-check {
                font-size: inherit;
                margin-left: -4px;
                display: none;
            }

            span {
                font-size: inherit;
            }

            &.rounded {
                border-radius: 20px;
            }

            &.disable-uppercase {
                p,
                span {
                    text-transform: initial;
                }
            }

            &.default {
                height: 36px;
                padding: 0 16px;

                @media #{$tablet} {
                    padding: 0 8px;
                    height: 32px;
                    font-size: 14px;
                }

                &.compact {
                    padding: 0 12px;

                    @media #{$tablet} {
                        padding: 0 6px;
                    }
                }
            }

            &.small,
            &.medium {
                height: 28px;
                padding: 0 12px;
                font-size: 14px;

                @media #{$tablet} {
                    padding: 0 8px;
                    height: 24px;
                    font-size: 14px;
                }
            }

            &.large {
                height: 44px;
                padding: 0 16px;

                @media #{$tablet} {
                    height: 40px;
                    font-size: 14px;
                }
            }

            &.block {
                width: 100%;
            }

            &.capitalize {
                text-transform: initial;
            }

            &.color-blue {
                color: $accent-color;

                &:hover {
                    background: $blue-hover-semifilled;
                    border-color: $blue;
                }

                &.colored-border {
                    border: 1px solid $blue;
                }
            }

            &.color-red {
                color: $red;

                &:hover {
                    background: $red-hover-semifilled;
                    border-color: $red;
                }

                &.colored-border {
                    border: 1px solid $red;
                }
            }

            &.color-green {
                color: $green;

                &:hover {
                    background: $green-hover-semifilled;
                    border-color: $green;
                }

                &.colored-border {
                    border: 1px solid $green;
                }
            }

            &.color-yellow {
                color: $yellow;

                &:hover {
                    background: $yellow-hover-semifilled;
                    border-color: $yellow;
                }

                &.colored-border {
                    border: 1px solid $yellow;
                }
            }

            &.borderless,
            &.border-less {
                border: 0;
            }

            &.transparent {
                background: none;
            }
        }

        input[type=checkbox]:checked + label {
            .check-button {
                &,
                &.checked-blue,
                &.color-blue {
                    color: $white;
                    background: $accent-color;
                    border-color: $accent-color;
                    box-shadow: $elevation-blue-default;
                }

                &.checked-green,
                &.color-green {
                    background: $green;
                    border-color: $green;
                    box-shadow: $elevation-green-default;
                }

                &.checked-red,
                &.color-red {
                    background: $red;
                    border-color: $red;
                    box-shadow: $elevation-red-default;
                }

                &.checked-yellow,
                &.color-yellow {
                    background: $yellow;
                    border-color: $yellow;
                    box-shadow: $elevation-yellow-default;
                }
            }

            .btn-check {
                display: block;
            }

            .btn-check + span {
                padding-left: 8px;
            }
        }

        input[type=checkbox][disabled] + label {
            .check-button {
                background: $lightest-gray;
                color: $gray;

                &.color-blue {
                    color: $blue-disabled;
                    background: $white;

                    &.colored-border {
                        border-color: $blue-disabled;
                    }
                }

                &.color-red {
                    color: $red-disabled;
                    background: $white;

                    &.colored-border {
                        border-color: $red-disabled;
                    }
                }

                &.color-green {
                    color: $green-disabled;
                    background: $white;

                    &.colored-border {
                        border-color: $green-disabled;
                    }
                }

                &.color-yellow {
                    color: $yellow-disabled;
                    background: $white;

                    &.colored-border {
                        border-color: $yellow-disabled;
                    }
                }

                &.transparent {
                    background: none;
                }
            }
        }

        input[type=checkbox][disabled]:checked + label {
            .check-button {
                color: $white;

                &,
                &.checked-blue,
                &.color-blue {
                    background: $blue-disabled;
                    border-color: $blue-disabled;
                    box-shadow: none;
                }

                &.checked-green,
                &.color-green {
                    background: $green-disabled;
                    border-color: $green-disabled;
                    box-shadow: none;
                }

                &.checked-red,
                &.color-red {
                    background: $red-disabled;
                    border-color: $red-disabled;
                    box-shadow: none;
                }

                &.checked-yellow,
                &.color-yellow {
                    background: $yellow-disabled;
                    border-color: $yellow-disabled;
                    box-shadow: none;
                }
            }
        }
    }

</style>
