<template>
    <div class="accounting">
        <NavBar />
        <div class="view_area">
            <div class="accounts_pane">
                <AccountingNavPane />
            </div>
            <div class="route_views">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from '@/components/nav/Navbar.vue';
import AccountingNavPane from '@/components/accounting/nav/NavPane.vue';

export default {
  name: 'Accounting',
  components: {
    NavBar,
    AccountingNavPane,
  },
  mounted() {
    window.scroll(0, 0);
  },
};
</script>
<style scoped lang="scss">
@import '../../../styles/constants.scss';
    .accounting {
        height: 100vh;
        width: 100vw;
        background-color: $body-bg;
        font-family: $font-style;
        font-weight: 300;

        .view_area {
            height: 100%;
            margin-top: 52px;
            width: 100%;
            display: grid;
            grid-template-columns: 30% 70%;
            overflow: auto;
            scroll-behavior: smooth;

            .accounts_pane {
                display: flex;
                background-color: $white;
                border-right: 1px solid $border-color;
            }

            > div {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
