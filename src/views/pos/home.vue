<template>
    <div class="pos_home">
        <NavBar />
        <div class="sales_view">
            <Orders />
            <MenuSection />
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
import Orders from '@/components/pos/Orders.vue';
import MenuSection from '@/views/pos/MenuSection.vue';

export default {
  name: 'SmartSalesHome',
  components: {
    NavBar,
    Orders,
    MenuSection,
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .pos_home {
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        background-color: $bg_color;
        font-size: 14px;
        scrollbar-width: thin;
        ::-webkit-scrollbar{
          width: 8px;
        }

        ::-webkit-scrollbar-thumb {
            background: $scrollbar-color;
            -webkit-border-radius: 1ex;
            -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
        }

        ::-webkit-scrollbar-corner {
            background: #000;
        }

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
