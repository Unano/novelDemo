<template>
  <div>
    <div class="tabs">
      <span v-for="(tab, index) in tabs" :key="index" class="novel-tab"
      :class="{'selected': tabIndex === index}" @click="selectTab(index)">{{tab}}</span>
    </div>
    <div class="top">
      <div class="search-input">
        <input type="text" @keyup.enter="search" v-model="searchStr" placeholder="请输入作者名或作品名进行搜索"/>
      </div>
      <div class="sort">
        <span @click="sortList">按热度排序：<span>{{this.sort ? '升序' : '降序'}}</span></span>
      </div>
    </div>
    <div class="tags">
      <p v-for="(tag, index) in tags" :key="index">
        <span v-if="index === '1'">时期：</span>
        <span v-if="index === '2'">题材：</span>
        <span v-if="index === '3'">结局：</span>
        <span v-for="(item, index) in tag" :key="index" class="novel-tag" :class="{'selected': index === '0'}" :data-tag="item">{{item}}</span>
      </p>
    </div>
    <div class="list">
      <novel-introduce v-for="(novel, index) in novelsInfo" :key="index" :info="novel"/>
    </div>
  </div>
</template>

<script>
import NovelIntroduce from '@/components/NovelIntroduce'

export default {
  name: 'Home',
  data () {
    return {
      tabs: ['全部', '已完结', '连载中'],
      tags: {},
      novelsInfo: [],
      pageNum: 1,
      sort: false,
      searchStr: '',
      selectedtags: [],
      tabIndex: 0
    }
  },
  mounted () {
    this.getTags()
    this.getList()
  },
  components: {
    NovelIntroduce
  },
  methods: {
    // 取得标签数据
    getTags () {
      this.axios.get('/tags').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.tags = res.result.data[0]
        } else {
          alert(res.msg)
        }
      })
    },
    // 取得列表数据
    getList () {
      let params = {
        pageNum: this.pageNum,
        pageSize: 5,
        sort: this.sort ? 1 : -1,
        search: this.searchStr,
        tags: this.selectedtags
      }
      this.axios.get('/novels', {params: params}).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.novelsInfo = res.result.data
        } else {
          alert(res.msg)
        }
      })
    },
    // 将列表进行排序
    sortList () {
      this.sort = !this.sort
      this.getList()
    },

    search () {
      this.getList()
    },
    selectTab (index) {
      this.tabIndex = index
    }
  }
}
</script>

<style scoped lang="less">
.tabs {
  margin-top: 30px;
}
.top {
  position: relative;
  padding: 10px 0;
  border-top: 1px solid #376098;
}
.tags {
  margin-top: 18px;
  padding-bottom: 10px;
  span {
    margin: 4px 2px;
    font-size: 14px;
  }
}
.search-input {
  position: absolute;
  right: 150px;
}
.sort {
  position: absolute;
  right: 18px;
  top: 15px;
  display: inline-block;
  font-size: 13px;
  cursor: pointer;
}

</style>
