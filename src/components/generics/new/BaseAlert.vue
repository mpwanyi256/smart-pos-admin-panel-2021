<template>
    <div class="alert_div"
        :class="[{ warning : type == 'default' },
            { warning : !type }, { success : type == 'success' },
            { error : type == 'error' }
        ]"
    >
        <p class="message">
            {{ message }}
        </p>
    </div>
</template>
<script>
export default {
  name: 'BaseAlert',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../../styles/constants.scss';

    .alert_div {
        height: 50px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: $shadow;
        border: 1px solid $border-color;
        color: $black;
        font-size: 18px;
        font-weight: bold;
    }

    .error {
        background-color: $red;
        color: $white;
    }

    .success {
        background-color: $green;
        color: $white;
    }

    .warning {
        background-color: $light-orange;
        color: $white;
    }
</style>
