<template>
    <div class="sales_home">
        <NavBar />
        <div class="sales_view">
            <Sections />
            <div class="menu">
                Menu Area
            </div>
            <div class="selected_order">
                Selected Order
            </div>
            <div class="actions">
                Actions
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from '@/components/nav/Navbar.vue';
import Sections from '@/components/pos/sections/sections.vue';

export default {
  name: 'SmartSalesHome',
  components: {
    NavBar,
    Sections,
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .sales_home {
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        background-color: $bg_color;

        .sales_view {
            height: calc(100vh - 52px);
            display: grid;
            grid-template-columns: 15% 50% 25% 10%;

            >div {
                height: calc(100vh - 52px);
                width: 100%;
            }
        }
    }
</style>
