<template>
    <div class="properties">
        <div class="header_div">
            <div>
                <slot name="title-actions" />
                <h1>{{ title }}</h1>
            </div>
            <div>
                <slot name="header-actions" />
            </div>
        </div>
        <div class="clients_list">
            <slot name="body" />
        </div>

    </div>
</template>
<script>

export default {
  name: 'PageTemplate',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
    };
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .properties {
        height: calc(100vh - 52px);
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        color: $black;
        font-size: 13px !important;
        border-left: 0.3px solid $border-color;

        .header_div {
            height: 56px;
            width: 100%;
            // display: grid;
            // grid-template-columns: 40% 60%;
            display: inline-flex;
            background-color: $white;
            color: $black;
            border-bottom: 0.3px solid $border-color;

            > div {
                display: inline-flex;
                align-items: center;
                gap: 15px;
                padding-left: 15px;
                width: 100%;
                text-align: right;
            }

            >div:last-child {
                text-align: right;
            }
        }
    }

    ::v-deep .v-text-field__details {
        display: none;
        height: 0;
    }

</style>
