<template>
  <Live title="动态" :info="info" />
</template>
<script>
import Live from './Live.vue';
export default {
  name: 'Dynamic',
  data() {
    return {
      info: []
    }
  },
  async mounted() {
    const { data } = await this.Fetch.Home.Dynamic({
      method: "patch",
    })
    this.info = data.info
  },
  components: { Live }
}
</script>
<style scoped lang="less">

</style>