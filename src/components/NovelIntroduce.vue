<template>
  <div class="novel-introduce">
    <div class="poster">
      <img v-lazy="'static/imgs/test.png'" />
    </div>
    <div class="introduce">
      <p class="intro-title">{{info.title}}</p>
      <p>作者：{{info.author}}</p>
      <p>标签：<span v-for="(tag, index) in info.tags" :key="index" class="novel-tag">{{tag.value}}</span></p>
      <p>状态：{{info.state.value}}</p>
      <p>点击量：{{info.click}}</p>
      <p>简介：{{info.introduce}}</p>
      <span class="common-button view">查看详情</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NovelIntroduce',
  props: ['info'],
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="less">
.novel-introduce {
  position: relative;
  padding: 10px;
  width: 294px;
  height: 170px;
  display: inline-block;
  margin: 5px;
  border: 1px solid #798eab;
  border-radius: 3px;
}
.introduce {
  position: absolute;
  font-size: 14px;
  margin-left: 10px;
  width: 200px;
  height: 170px;
}
.novel-introduce > div{
  display: inline-block;
}
.poster {
  width: 100px;
  height: 150px;
  img {
    width: 100px;
    height: 150px;
    border: 1px dotted #98989F;
  }
}
.view {
  position: absolute;
  bottom: 10px;
  right: 30px;
  font-size: 13px;
  padding: 2px 10px;
}
.intro-title {
  font-weight: bold;
}
</style>
