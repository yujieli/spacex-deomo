<template>
  <a-card hoverable>
    <template #cover>
      <img
        alt="example"
        :src="item?.links?.patch?.large || '/img/default_img.png'"
      />
    </template>
    <a-card-meta :title="formattedDate(item?.date_utc)">
      <template #description>{{ item?.name }}</template>
    </a-card-meta>
    <a-card-meta>
      <template #description
        ><a-button
          type="primary"
          :style="{ marginTop: '20px' }"
          @click="goToDetail"
          >查看详情-{{ getYoutubeTips() }}</a-button
        ></template
      >
    </a-card-meta>
  </a-card>
</template>

<script>
import utils from "@/utils/utils";

export default {
  name: "ListItem",
  props: {
    item: {},
  },
  methods: {
    getYoutubeTips() {
      if (this.item && this.item.links && this.item.links.youtube_id != null) {
        return "有Youtube视频";
      }
      return "无Youtube视频";
    },
    goToDetail() {
      this.$router.push({ path: "/detail", query: { launchId: this.item.id } });
    },
    formattedDate(dateString) {
      return utils.formatDate(dateString);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
