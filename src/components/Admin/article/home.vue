<template>
  <main id="main-box">
    <main class="init">
      <div class="echarts" />
    </main>
  </main>
</template>
<script>
import Eaharts from '@/assets/js/Echarts';
export default {
  name: '',
  data() {
    return {}
  },
  mounted() {
    // Eaharts.Article.home(".init")
    // console.log(Eaharts);
  }
}
</script>
<style scoped lang="less">
.init {
  width: 70%;
  height: 500px;
}
</style>