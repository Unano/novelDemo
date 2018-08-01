<template>
  <div class="poster">
    <div class="poster-img">
       <img v-lazy="'static/imgs/test.png'" />
    </div>
    <div class="footer" >
      <slot name="btn"></slot>
      <span class="title">《{{info.title}}》</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['info'],
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="less">
.poster {
  position: relative;
  display: inline-block;
  width: 130px;
  height: 190px;
  padding: 5px;
  margin: 8px 3px 0 0;
  margin-left: 8px;
  border: 1px solid #2c5894;
  border-radius: 3px;
  &:hover .btns {
    display: inline-block;
  }
  &:hover .title {
    display: none;
  }
}

.title {
  display: inline-block;
}
.btns {
  display: none;
}
.poster-img {
  width: 100%;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
  }
}
.footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 29px;
    border-top: 1px solid #253852;
    text-align: center;
    padding: 5px 0;
}
</style>
