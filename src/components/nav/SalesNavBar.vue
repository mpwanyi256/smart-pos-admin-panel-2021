<template>
    <div class="nav_section">
        <div>
            <p>Quick links</p>
        </div>
        <div v-for="(link, i) in links" :key="i" @click="gotToPage(link)"
            class="link" :class="{ 'active': isActivePath(link.path) }">
            <v-icon>{{ link.icon }}</v-icon>
            <div class="name">{{ link.name }}</div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'SalesNavBar',
  data() {
    return {
      links: [
        { name: 'Dashboard', icon: 'mdi-home', path: 'overview' },
        { name: 'Sales', icon: 'mdi-sale', path: 'salessammary' },
        { name: 'Find A Bill', icon: 'mdi-magnify', path: 'findbill' },
        { name: 'Menu Items', icon: 'mdi-book', path: 'salessammary' },
        { name: 'Menu Item Sales', icon: 'mdi-cart', path: 'itemwisesale' },
      ],
    };
  },
  computed: {
    activePath() {
      return this.$route.name;
    },
  },
  methods: {
    gotToPage(link) {
      console.log(link);
      this.$router.push({ name: link.path });
    },
    isActivePath(path) {
      // eslint-disable-next-line eqeqeq
      return path == this.activePath;
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

    .nav_section {
        width: 100%;
        height: 100%;
        background-color: $white;
        margin: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding-right: 150px;
        padding-top: 10px;
        padding-left: 10px;
        font-size: 14px;

        > div {
            height: 36px;
            width: 100%;
            line-height: 1.5;
            display: inline-flex;
            flex-direction: row;
            gap: 3px;
            border-radius: 5px;
            justify-content: left;
            align-items: center;
            text-align: center;
            cursor: pointer;
            padding-left: 15px;
            margin-bottom: 5px;
        }

        .active {
          background-color: #dbdbdb;
        }

        > div:hover {
            border: 1px solid #7e8182;
        }
    }
</style>
