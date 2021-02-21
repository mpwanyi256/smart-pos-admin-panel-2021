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
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  computed: {
    activePath() {
      return this.$route.name;
    },
  },
  methods: {
    gotToPage(link) {
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
        background-color: inherit;
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

        > div:first-child {
            border-radius: 0;
            // background-color: #f3f2f2;
            font-weight: bold;
            font-size: 16px;
        }

        .active {
          background-color: #dbdbdb;
        }

        > div:hover {
            border: 1px solid #7e8182;
        }

        > div:first-child:hover {
            border: none;
        }
    }
</style>
