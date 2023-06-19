<template>
  <a-space>
    搜索：
    <a-input v-model:value="keyword" placeholder="" />
    時間：
    <a-range-picker @calendarChange="dateRangeChange" />
    發射狀態：
    <a-select ref="select" v-model:value="status" style="width: 120px">
      <a-select-option value="all">全部</a-select-option>
      <a-select-option value="success">是</a-select-option>
      <a-select-option value="fail">否</a-select-option>
    </a-select>
    排序：
    <a-select ref="select" v-model:value="sort" style="width: 180px">
      <a-select-option value="desc">發射時間由近到遠</a-select-option>
      <a-select-option value="asc">發射時間由遠到近</a-select-option>
    </a-select>
    <a-button type="primary" @click="search">搜索</a-button>
    <!-- <a-button type="primary" @click="reset">重置</a-button> -->
  </a-space>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      keyword: "",
      startDate: "",
      endDate: "",
      status: "all",
      sort: "desc",
    };
  },
  methods: {
    //选中日期
    dateRangeChange(e, dateString) {
      this.startDate = dateString[0];
      if (dateString.length == 2) {
        this.endDate = dateString[1];
      }
    },
    //开始搜索
    search() {
      const pms = {
        keyword: this.keyword,
        startDate: this.startDate,
        endDate: this.endDate,
        status: this.status,
        sort: this.sort,
      };

      this.$emit("onSearch", pms);
    },
    reset(){
      this.$emit("reset");
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
