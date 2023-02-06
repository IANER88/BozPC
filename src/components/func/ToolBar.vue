<template>
  <div class="toolbar">
    <div class="toolbar-show">
      <svg class="ne-icon-symbol" aria-hidden="true">
        <use xlink:href="#ne-collapsed"/>
      </svg>
      <div class="tip">
        展开
      </div>
    </div>
    <div class="item">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {}
  },
}
</script>
<style scoped lang="less">

</style>