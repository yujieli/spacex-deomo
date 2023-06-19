<template>
  <a ref="listContainer">
    <a-layout>
      <a-layout-header
        :style="{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          background: '#FFFFFF',
        }"
      >
        <SearchBar @onSearch="onSearch" @reset="reset"></SearchBar>
      </a-layout-header>
      <a-layout-content
        :style="{ padding: '0 50px', marginTop: '64px' }"
        ref="loadMoreContainer"
      >
        <div
          :style="{ background: '#fff', padding: '24px', minHeight: '380px' }"
        >
          <a-list :grid="{ gutter: 16, column: 2 }" :data-source="list">
            <template #renderItem="{ item }">
              <a-list-item>
                <ListItem :item="item"></ListItem>
              </a-list-item>
            </template>
          </a-list>
          <div v-if="isLoading" :style="{ textAlign: 'center' }">加载中...</div>
          <div v-if="!isLoadingMore" :style="{ textAlign: 'center' }">
            没有更多数据
          </div>
        </div>
      </a-layout-content>
      <a-back-top />
      <a-layout-footer :style="{ textAlign: 'center' }">
        SpaceX-Demo
      </a-layout-footer>
    </a-layout>
  </a>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import ListItem from "@/components/ListItem.vue";
import httpHelper from "@/utils/httpHelper";

const spaceXQueryUrl = "https://api.spacexdata.com/v5/launches/query";
const pageSize = 12;

export default {
  name: "HomePage",
  components: {
    SearchBar,
    ListItem,
  },
  created: function () {
    this.loadData();
  },
  data() {
    return {
      queryParams: {
        query: {},
        options: {
          limit: pageSize, //每页12个
          sort: {
            date_unix: "desc", //默认按时间倒序排列
          },
        },
      },
      list: [],
      isLoadingMore: true, // 是否还有更多数据
      isLoading: false, //是否正在加载数据
      currentPage: 1, // 当前页码
      scrollHeight: 0, // 滚动容器高度
      scrollTop: 0, // 滚动条顶部距离
    };
  },
  mounted() {
    // 获取滚动容器高度
    this.scrollHeight = window.innerHeight - 100; // this.$refs.listContainer.scrollHeight;

    // 监听滚动事件
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    // 移除滚动事件监听
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    onSearch(e) {
      //组合搜索参数
      if (e?.keyword) {
        this.queryParams.query["$text"] = { $search: e.keyword };
      } else {
        delete this.queryParams.query["$text"];
      }
      if (e?.startDate && e?.endDate) {
        this.queryParams.query["date_utc"] = {
          $gte: e.startDate,
          $lte: e.endDate,
        };
      }
      if (e?.status && e?.status != "all") {
        this.queryParams.query["success"] =
          e?.status === "success" ? true : false;
      } else if (e?.status == "all") {
        delete this.queryParams?.query?.success;
      }
      if (e?.sort) {
        this.queryParams.options["sort"] = {
          date_unix: e.sort,
        };
      }

      //重置页数
      this.currentPage = 1;

      this.list = [];
      this.loadData();
    },
    reset() {
      this.queryParams = {
        query: {},
        options: {
          limit: pageSize, //每页12个
          sort: {
            date_unix: "desc", //默认按时间倒序排列
          },
        },
      };

      this.list = [];
      this.loadData();
    },
    loadData() {
      let _this = this;

      this.queryParams["options"]["offset"] = (this.currentPage - 1) * pageSize;

      httpHelper.postRequest(
        spaceXQueryUrl,
        this.queryParams,
        (res) => {
          _this.isLoading = false;
          if (res.status == 200) {
            //判断是否还有更多
            this.isLoadingMore =
              res.data?.docs?.length >= pageSize ? true : false;
            res.data?.docs.map((mapItem) => {
              _this.list.push(mapItem);
            });
          } else {
            //没有更多
            this.isLoadingMore = false;
          }
        },
        (err) => {
          console.log("query error:", err);
          this.isLoadingMore = false;
        }
      );
    },
    handleScroll() {
      // 获取滚动条位置
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      // 检查是否到达页面底部
      if (
        this.scrollTop + window.innerHeight >= this.scrollHeight &&
        this.isLoadingMore &&
        !this.isLoading
      ) {
        this.isLoading = true;
        console.log("load more...", this.scrollHeight);
        this.currentPage++;
        this.loadData();
      }
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
