<template>
  <div class="pagination" v-if="pageCount > 1">
    <ul>
      <li class="previous" :class="{disable: currentPage === 1}" @click="previousPage"><span></span></li>
      <li :class="{'current-page': currentPage === 1}" @click="changePage(1)"><span>1</span></li>
      <li class="more" v-if="showPrevMore" @click="morePages(0)"><span>...</span></li>
      <li v-for="(num, index) in pageArr" :key="index"  @click="changePage(num)"
      :class="{'current-page': currentPage === num}"><span>{{num}}</span>
      </li>
      <li class="more" v-if="showNextMore" @click="morePages(1)"><span>...</span></li>
      <li :class="{'current-page': currentPage === pageCount}" @click="changePage(pageCount)"><span>{{pageCount}}</span></li>
      <li class="next" :class="{disable: currentPage === pageCount}" @click="nextPage"><span></span></li>
      <li class="jump"><input type="text" v-model="insertPageNum"/><span class="btn" @click="changePage(parseInt(insertPageNum))">跳转</span></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['info'],
  data () {
    return {
      // count: 23, // 总的数据条数
      currentPage: 1, // 当前页数
      pageSize: 9, // 每页数据条数
      pageCount: 0, // 总的页数
      pageCenterNum: 5, // 正中间部分显示的页数（为奇数）
      pageArr: [], // 正中间部分页数的数组
      startArr: [], // 开始的数组
      endArr: [], // 结束的数组
      halfLen: 0, // pageArr长度的一半
      insertPageNum: ''
    }
  },
  watch: {
    info: {
      handler: function () {
        this.init()
      },
      deep: true // 深度观察
    }
  },
  computed: {
    showPrevMore () { // 显示左边的省略号
      return this.pageArr[0] - 1 > 1
    },
    showNextMore () { // 显示右边的省略号
      let i = this.pageArr.length - 1
      return this.pageArr[i] + 1 < this.pageCount
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      this.count = this.info.count
      console.log(this.count, '子组件的总条数是多少？')
      this.pageCount = Math.ceil(this.count / this.pageSize)
      if (this.pageCount > 1 && this.pageCount <= this.pageCenterNum + 2) {
        let i = 1
        let arr = []
        for (i; i <= this.pageCount; i++) {
          arr.push(i)
        }
        let centerArr = arr.slice(1, -1)
        this.pageArr = centerArr
      }
      if (this.pageCount > this.pageCenterNum + 2) {
        let i = 2
        let startArr = []
        for (i; i <= this.pageCenterNum + 1; i++) {
          startArr.push(i)
        }
        this.pageArr = startArr
        this.startArr = startArr
        let j = this.pageCount - 1
        let endArr = []
        for (j; j >= this.pageCount - this.pageCenterNum; j--) {
          endArr.unshift(j)
        }
        this.endArr = endArr
      }
      this.halfLen = Math.floor(this.pageCenterNum / 2)
    },
    // 改变页数
    changePage (num) {
      if (num >= 1 && num <= this.pageCount) {
        this.currentPage = num
        if (this.pageCount > this.pageCenterNum + 2) {
          this.changePageArr()
        }
        this.$emit('change', this.currentPage)
      } else {
        alert('请输入正确的页数')
      }
      this.insertPageNum = ''
    },
    // 点击省略号的上下翻页
    morePages (direction) {
      if (direction) { // 向下翻页
        this.currentPage += this.pageCenterNum
        if (this.currentPage > this.pageCount) {
          this.currentPage = this.pageCount
        }
      } else { // 向下翻页
        this.currentPage -= this.pageCenterNum
        if (this.currentPage < 1) {
          this.currentPage = 1
        }
      }
      this.changePageArr()
    },
    changePageArr () {
      let arr = []
      let start = this.currentPage - this.halfLen
      let end = this.currentPage + this.halfLen
      let i = start
      for (i; i <= end; i++) {
        arr.push(i)
      }
      let tooSmall = arr.some((item) => item <= 1)
      let tooLarge = arr.some((item) => item >= this.pageCount)
      tooSmall && (arr = this.startArr)
      tooLarge && (arr = this.endArr)
      this.pageArr = arr
    },
    // 上下翻页
    previousPage () {
      if (this.currentPage > 1) {
        this.currentPage--
        this.changePage(this.currentPage)
      }
    },
    nextPage () {
      if (this.currentPage < this.pageCount) {
        this.currentPage++
        this.changePage(this.currentPage)
      }
    }
  }
}
</script>

<style scoped lang="less">
.pagination {
  text-align: center;
  user-select: none;
}
li {
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  border: 1px solid #a9a9a9;
  border-radius: 2px;
  margin: 0 2px;
  text-align: center;
  cursor: pointer;
}
.more {
  border: none;
}
.current-page {
  color: #fff;
  border: 1px solid #538ddc;
  background-color: #538ddc;
}
.disable {
  cursor: not-allowed;
}
.previous {
  span {
    &:after {
      content: '<'
    }
  }
}
.next {
  span {
    &:after {
      content: '>'
    }
  }
}
.jump {
  width: 92px;
  border: none;
  padding-left: 20px;
  input {
    border: 1px solid #a9a9a9;
    width: 38px;
    height: 20px;
    vertical-align: middle;
    line-height: 20px;
    padding-left: 5px;
    margin-right: 2px;
    font-size: 15px;
    border-radius: 2px;
  }
  .btn {
    font-size: 15px;
    padding: 2px 4px;
    border-radius: 2px;
    background-color: #538ddc;
    color: #fff;
  }
}
</style>
