<template>
  <div class="main">
    <Header />
    <router-view class="contain"/>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'Main',
  data () {
    return {

    }
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped lang="less">
.main {
  width: 100vw;
}
.contain {
  width: 85vw;
  // min-width: 1000px;
  margin: 0 auto;
}
</style>
