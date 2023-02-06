<template>
  <Live title="历史记录" :info="info" />
</template>
<script>
import Live from './Live.vue';
export default {
  name: 'History',
  data() {
    return {
      info: {}
    }
  },
  components: { Live },
  async mounted() {
    const { data } = await this.Fetch.Home.History({
      method: "post",
      number: 1,
    })
    this.info = data.info
  }
}
</script>