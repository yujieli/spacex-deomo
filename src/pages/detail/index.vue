<template>
  <a-layout>
    <a-layout-header
      :style="{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        background: '#FFFFFF',
      }"
    >
      <a-button type="primary" @click="goBack">返回</a-button>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-card hoverable>
        <template #cover v-if="!showYoutubeVideo">
          <img
            alt="example"
            :src="launchDetail?.links?.patch?.large || '/img/default_img.png'"
          />
        </template>
        <div v-show="showYoutubeVideo" id="player"></div>
        <a-card-meta :title="formattedDate(launchDetail?.date_utc)">
          <template #description>{{ launchDetail?.name }}</template>
        </a-card-meta>
        <a-card-meta>
          <template #description>{{ launchDetail?.details }}</template>
        </a-card-meta>
      </a-card>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      SpaceX-Demo
    </a-layout-footer>
  </a-layout>
</template>

<script>
import httpHelper from "@/utils/httpHelper";
import utils from "@/utils/utils";
import YouTubePlayer from "youtube-player";

const spaceXQueryUrl = "https://api.spacexdata.com/v5/launches/";

export default {
  name: "DetailPage",
  components: {},
  created: function () {
    this.loadData();
  },
  data() {
    return {
      launchDetail: {},
      showYoutubeVideo: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;

      httpHelper.getRequest(
        spaceXQueryUrl + this.$route.query.launchId,
        null,
        (res) => {
          if (res.status == 200) {
            _this.launchDetail = res.data;

            //是否有Youtube图片
            _this.showYoutubeVideo = res.data?.links?.youtube_id != null;
            console.log(
              `youtube_id:${res.data?.links?.youtube_id}-${
                res.data?.links?.youtube_id != null
              }-${_this.showYoutubeVideo}`
            );
            _this.initPlayer();
          }
        },
        (err) => {
          console.log("query error:", err);
        }
      );
    },
    initPlayer() {
      YouTubePlayer("player", {
        videoId: this.launchDetail.links.youtube_id,
      });
    },
    formattedDate(dateString) {
      return utils.formatDate(dateString);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
