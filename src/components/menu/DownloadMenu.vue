<template>
    <Basemodal :title="''" :size="700" @close="$emit('close')">
        <div class="download_pane">
            <BaseLoaderCirclular v-show="loading" />
            <div class="d_button">
                <v-btn @click="downloadCSV" block large class="btn_download">
                    <v-icon left>mdi-cloud-download</v-icon>
                    {{ `Download ${menuItems.length} items` }}
                </v-btn>
            </div>
        </div>
    </Basemodal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseLoaderCirclular from '@/components/generics/BaseLoaderCirclular.vue';
import DownloadCSVMixin from '@/mixins/DownloadCSVMixin';

export default {
  name: 'DownloadMenu',
  mixins: [DownloadCSVMixin],
  components: {
    Basemodal,
    BaseLoaderCirclular,
  },
  data() {
    return {
      menuItems: [],
    //   loading: false,
    };
  },
  computed: {
    ...mapGetters('menu', 'loading'),
  },
  methods: {
    ...mapActions('menu', ['getMenuItems']),

    downloadCSV() {
      this.download(this.menuItems, 'Menu items');
    },
  },
  async created() {
    // this.loading = true;
    const menu = await this.getMenuItems({ department_id: 'download' });
    if (!menu.error) this.menuItems = menu.data;
    // this.loading = false;
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

    .download_pane {
        width: 100%;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        padding: 16px;

        .btn_download {
            background-color: $blue !important;
            color: $white;
        }
    }
</style>
