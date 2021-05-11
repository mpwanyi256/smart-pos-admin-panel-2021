<template>
    <div class="accomodation">
        <NavBar />
        <div class="accomodation_area">
            <div class="routes_area">

            </div>
            <PropertiesList />
        </div>
    </div>
</template>
<script>
import NavBar from '@/components/nav/Navbar.vue';
import PropertiesList from '@/components/accomodation/PropertiesList.vue';

export default {
  name: 'Accomodation',
  components: {
    NavBar,
    PropertiesList,
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

.accomodation {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: $bg_color;
    font-size: 14px;
    font-family: $font-style;

    // scrollbar-width: thin;
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

    .accomodation_area {
        width: 100vw;
        height: calc(100vh - 52px);
        margin: 0;
        background-color: $body-bg;
        display: flex;
        flex-direction: column;
        font-family: $font-style !important;
        overflow: hidden;

        .routes_area {
            display: flex;
            height: calc(100vh - 104px);
        }
    }
}

</style>
