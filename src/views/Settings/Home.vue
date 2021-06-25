<template>
    <div class="pos_settings">
        <NavBar />
        <div class="settings_nav_pane">
            <div class="link_pane">
                <SalesNavBar :title="'Settings'" :links="links" />
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
  name: 'Settings',
  components: {
    NavBar,
    SalesNavBar,
  },
  data() {
    return {
      links: [
        { name: 'Access controls', icon: 'mdi-security', path: 'access_controls' },
        { name: 'Company settings', icon: 'mdi-domain', path: 'company_settings' },
        { name: 'Department Sections', icon: 'mdi-blur', path: 'company_departments' },
        { name: 'Employees', icon: 'mdi-account-group-outline', path: 'company_employees' },
        { name: 'Sections and tables', icon: 'mdi-table-arrow-right', path: 'sections_and_tables' },
        { name: 'Printer settings', icon: 'mdi-printer', path: 'printer_settings' },
        { name: 'Email list', icon: 'mdi-email', path: 'company_mail_list' },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

.pos_settings {
  width: 100vw;
  height: 100vh;
  margin: 0;
  background-color: $body-bg;
  display: flex;
  flex-direction: column;
  font-family: $font-style !important;

    ::-webkit-scrollbar{
        width: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background: $scrollbar-color;
        border-radius: 1ex;
        -webkit-border-radius: 1ex;
    }

    ::-webkit-scrollbar-corner {
        background: #000;
    }

    .settings_nav_pane {
        overflow: hidden;
        top: 0;
        bottom: 0;
        height: calc(100vh - 52px);
        display: grid;

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

        .link_pane {
            background-color: inherit;
        }

    }
}

</style>
