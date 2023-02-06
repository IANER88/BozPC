<template>
  <div class="system">
    <div v-html="Icon.Course.system" @click.stop="hide" />
    <transition name="el-zoom-in-top">
      <div class="content" :style="`width:${size}px`" v-show="show" ref="dom" @click.stop>
        <slot />
        <div class="author" v-if="author">
          <div>字数统计: {{ len }}</div>
          <div>创建于: {{ create }}</div>
          <div>更新于: {{ update }}</div>
          <div>编辑者: {{ name }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Fun',
  data() {
    return {
      show: false,
    }
  },
  props: {
    size: {
      default: 256
    },
    author: {
      default: true,
    },
    len: {

    },
    create: {

    },
    update: {

    },
    name:{
      
    }
  },
  mounted() {
    window.addEventListener("click", () => {
      this.show = false
    })
  },
  methods: {
    hide() {
      this.show = !this.show
    }
  }
}
</script>
<style scoped lang="less">
.system {
  position: relative;
  height: 100%;

  >div {
    &:first-child {
      display: flex;
      height: 100%;
      align-items: center;
      cursor: pointer;
    }
  }
}

.content {
  top: 40px;
  position: absolute;
  right: -25px;
  background: var(--tint-color);
  border: 1px solid var(--tint-solid);
  border-radius: 5px;
  flex-direction: column;
  box-shadow: 0 0 30px rgb(0 0 0 / 10%);
  z-index: 1000;

  >div {
    padding: 15px;

    &:not(:first-child) {
      border-top: 1px solid var(--tint-solid);
    }
  }

  /deep/i {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .author {
    flex-direction: column;
    align-items: flex-start;
    font-size: 13px;
    gap: 10px;
    display: flex;
    line-height: 13px;
    width: 100%;
    padding: 15px;
    color: #8a8f8d;
    border-top: 1px solid var(--tint-solid);
  }
}
</style>