<template>
  <div class="system">
    <div v-html="Icon.Course.system" @click.stop="hide()" />
    <transition name="el-zoom-in-top">
      <div class="content" v-show="show" @click.stop>
        <solt />
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Popover',
  data() {
    return {
      show: false,
    }
  },
  methods: {
    hide() {
      this.show = !this.show
    },
  }
}
</script>
<style scoped lang="less">

</style>