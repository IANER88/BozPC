<template>
  <main id="box">
    <header>
      <h4>{{ title }}</h4>
    </header>
    <div class="main-box">
      <slot />
    </div>
  </main>
</template>
<script>
export default {
  name: 'FuYong',
  data() {
    return {}
  },
  props: ["title"]
}
</script>
<style scoped lang="less">
#box {
  header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--tint-solid);
  }
}
</style>