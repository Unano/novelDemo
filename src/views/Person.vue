<template>
  <div>
    <div class="header">
      <span class="novel-tab" v-for="(tab, index) in tabs" :key="index"
      :class="{'selected': tabIndex === index}" @click="changeTab(index)">{{tab}}</span>
    </div>
    <div v-if="tabIndex === 0">
      <p class="section-name">金币：{{reader.icons}}</p>
      <div class="favorate">
        <p class="section-name">我的收藏：</p>
        <div>
          <poster v-if="reader.favorate.length > 0" v-for="(item, index) in reader.favorate" :info="item" :key="index">
            <span slot="btn" class="btns">
              <span class="common-button">取消收藏</span>
            </span>
          </poster>
        </div>
      </div>
    </div>
    <div v-if="tabIndex === 1 && !createNovel">
      <span class="section-name">我的文章：</span>
      <div class="my-works">
        <poster v-if="author.works.length > 0" v-for="(work, index) in author.works" :info="work" :key="index">
          <span slot="btn" class="btns">
            <span class="common-button">编辑</span>
            <span class="common-button" @click="deleteNovel(work.id)">删除</span>
          </span>
        </poster>
      </div>
      <div class="create-novel">
        <span class="common-button" @click="create">创建文章</span>
      </div>
    </div>
    <div v-if="tabIndex === 1 && createNovel">
      <form class="create-book">
        <p class="common-input">
          <label>书名：</label>
          <input type="text" v-model="addNovelData.title" placeholder="请输入不包含特殊字符的字符串"/>
        </p>
        <p class="common-input">
          <label>文案：</label>
          <textarea v-model="addNovelData.introduce"></textarea>
        </p>
        <p class="common-input">
          <label>标签：</label>
          <select v-model="addNovelData.tags">
            <option>请选择</option>
            <option value="1">标签2</option>
            <option value="2">标签3</option>
          </select>
        </p>
        <p class="common-input">
          <label>完结状态：</label>
          <select v-model="addNovelData.state">
            <option>请选择</option>
            <option value="0">已完结</option>
            <option value="1">连载中</option>
          </select>
        </p>
        <p>
          <span class="common-button" @click="addNovel">保存</span>
          <span class="common-button" @click="back">返回</span>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import Poster from '@/components/Poster'
import { getcookie } from '@/util/cookie'

export default {
  data () {
    return {
      tabs: ['读者', '作者'],
      tabIndex: 0,
      createNovel: false,
      addNovelData: {
        title: '',
        introduce: '',
        tags: '',
        author: '',
        state: ''
      },
      user: '',
      reader: {},
      author: {}
    }
  },
  components: {
    Poster
  },
  created () {
    this.user = this.getcookie().userName
    this.getUserInfo()
  },
  methods: {
    getcookie: getcookie,
    getUserInfo () {
      let params = {
        user: this.user
      }
      this.axios.get('/users/personal', { params: params }).then(response => {
        let res = response.data
        if (res.status === '0') {
          let data = res.result
          this.reader = data.reader
          this.author = data.author
          console.log(res.result, '查看获取的值')
        }
      })
    },
    changeTab (index) {
      this.tabIndex = index
      // if (index === 0) {
      //   this.createNovel = false
      // }
    },
    create () {
      this.createNovel = true
    },
    // 添加小说
    addNovel () {
      console.log(this.addNovelData, '看看当前的值')
      let params = this.addNovelData
      params.author = this.user
      this.axios.post('/novels/createNovel', params).then((res) => {
        let data = res.data
        if (data.status === '0') {
          this.getUserInfo()
          alert('保存成功')
        } else {
          alert(data.msg)
        }
      })
    },
    // 删除小说
    deleteNovel (id) {
      let params = {
        id: id,
        author: this.user
      }
      this.axios.post('/novels/deleteNovel', params).then(res => {
        let data = res.data
        if (data.status === '0') {
          this.getUserInfo()
          alert('删除成功')
        } else {
          alert(data.msg)
        }
      })
    },
    back () {
      this.createNovel = false
    }
  }
}
</script>

<style scoped lang="less">
  .header {
    margin-top: 30px;
    border-bottom: 1px solid #376098;
  }
  .create-book {
    padding: 20px;
  }
  .common-input {
    margin: 10px 0;
  }
  .btns {
    display: inline-block;
    width: 100%;
    .common-button {
      padding: 2px 12px;
    }
  }
  .create-novel {
    margin: 20px 0 20px 15px;
  }
  .my-works {
    padding: 10px;
  }
  .section-name {
    display: block;
    margin: 20px 0 0 15px;
    font-size: 16px;
    font-weight: 600;
  }
</style>
