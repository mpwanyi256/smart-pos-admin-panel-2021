<template>
    <div class="real_estates">
        <NavBar />
        <div class="estates_home">
            <div class="link_pane">
                <SalesNavBar :title="'Real estates'" :links="links" />
            </div>
            <div class="link_views">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from '@/components/nav/Navbar.vue';
import SalesNavBar from '@/components/nav/SalesNavBar.vue';

export default {
  name: 'RealEstatesHome',
  components: {
    NavBar,
    SalesNavBar,
  },
  data() {
    return {
      links: [
        { name: 'Tenants', icon: 'mdi-account-group', path: 'tenants' },
        { name: 'Properties', icon: 'mdi-home-city-outline', path: 'properties' },
        { name: 'Landlords', icon: 'mdi-account-group', path: 'landlords' },
        { name: 'Units', icon: 'mdi-home-variant-outline', path: 'units' },
        { name: 'Contracts', icon: 'mdi-book', path: 'contracts' },
      ],
    };
  },
};
</script>
<style lang="scss">
@import '../../styles/constants.scss';

.real_estates {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: $white;
    font-size: 14px;
    font-family: $font-style !important;

    ::-webkit-scrollbar{
        width: 5px;
        height: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background: $scrollbar-color;
        border-radius: 1ex;
        -webkit-border-radius: 1ex;
    }

    ::-webkit-scrollbar-corner {
        background: #000;
    }

    .estates_home {
        overflow: hidden;
        top: 0;
        bottom: 0;
        height: calc(100vh - 52px);
        display: grid;

        .link_pane {
            overflow-x: hidden;
        }

        @media only screen and (max-width: 1200px) {
        grid-template-columns: 20% 80%;
        }

        @media only screen and (min-width: 1600px) {
        grid-template-columns: 20% 80%;
        }

        @media only screen and (max-width: 1600px) {
        grid-template-columns: 30% 70%;
        }

        .link_views {
        background-color: $white;
        height: calc(100vh - 52px);
        overflow: auto;
        }

        > div {
            height: calc(100vh - 52px);
            width: 100%;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            color: $black;
            font-size: 13px !important;
        }
    }
}

</style>
